const express = require('express');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/parent/children
// @desc    Get parent's children
// @access  Private (Parent only)
router.get('/children', auth, authorize('parent'), async (req, res) => {
  try {
    const parent = await User.findById(req.user._id)
      .populate({
        path: 'children.studentId',
        select: 'name email rollNumber class phone'
      });

    res.json({
      success: true,
      data: parent.children
    });
  } catch (error) {
    console.error('Get children error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/parent/child/:id/progress
// @desc    Get child's academic progress
// @access  Private (Parent only)
router.get('/child/:id/progress', auth, authorize('parent'), async (req, res) => {
  try {
    // Verify that this child belongs to the parent
    const parent = await User.findById(req.user._id);
    const childRelation = parent.children.find(
      child => child.studentId.toString() === req.params.id
    );

    if (!childRelation) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this child\'s progress'
      });
    }

    const child = await User.findById(req.params.id);
    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    // Get child's courses
    const courses = await Course.find({ 
      class: child.class,
      status: 'active'
    })
    .populate('teacher', 'name email')
    .populate({
      path: 'enrolledStudents',
      match: { student: req.params.id }
    });

    // Get child's assignments
    const assignments = await Assignment.find({ 
      class: child.class,
      status: 'published'
    })
    .populate('teacher', 'name email')
    .populate({
      path: 'submissions.student',
      match: { _id: req.params.id }
    });

    // Get child's attendance
    const attendance = await Attendance.find({ 
      student: req.params.id 
    })
    .sort({ date: -1 })
    .limit(100); // Last 100 records

    // Calculate attendance statistics
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'present').length;
    const absentDays = attendance.filter(a => a.status === 'absent').length;
    const lateDays = attendance.filter(a => a.status === 'late').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    // Calculate subject-wise progress
    const subjectProgress = {};
    courses.forEach(course => {
      const enrollment = course.enrolledStudents.find(
        en => en.student && en.student._id.toString() === req.params.id
      );
      
      if (enrollment) {
        subjectProgress[course.subject] = {
          progress: enrollment.progress || 0,
          totalLessons: course.totalLessons,
          teacher: course.teacher.name,
          courseName: course.title
        };
      }
    });

    // Get assignment statistics
    const submittedAssignments = assignments.filter(assignment => 
      assignment.submissions.some(sub => sub.student && sub.student._id.toString() === req.params.id)
    ).length;

    const totalAssignments = assignments.filter(a => a.type === 'assignments').length;

    res.json({
      success: true,
      data: {
        child: {
          id: child._id,
          name: child.name,
          rollNumber: child.rollNumber,
          class: child.class,
          email: child.email
        },
        courses: courses.map(course => ({
          id: course._id,
          title: course.title,
          subject: course.subject,
          teacher: course.teacher.name,
          totalLessons: course.totalLessons,
          progress: course.enrolledStudents.find(en => 
            en.student && en.student._id.toString() === req.params.id
          )?.progress || 0
        })),
        assignments: {
          total: totalAssignments,
          submitted: submittedAssignments,
          pending: totalAssignments - submittedAssignments
        },
        attendance: {
          records: attendance,
          statistics: {
            totalDays,
            presentDays,
            absentDays,
            lateDays,
            attendancePercentage
          }
        },
        subjectProgress
      }
    });
  } catch (error) {
    console.error('Get child progress error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/parent/child/:id/attendance
// @desc    Get child's attendance details
// @access  Private (Parent only)
router.get('/child/:id/attendance', auth, authorize('parent'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Verify that this child belongs to the parent
    const parent = await User.findById(req.user._id);
    const childRelation = parent.children.find(
      child => child.studentId.toString() === req.params.id
    );

    if (!childRelation) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this child\'s attendance'
      });
    }

    // Build filter
    const filter = { student: req.params.id };
    
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(filter)
      .populate('teacher', 'name')
      .sort({ date: -1 });

    // Calculate monthly breakdown
    const monthlyBreakdown = {};
    attendance.forEach(record => {
      const month = record.date.toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyBreakdown[month]) {
        monthlyBreakdown[month] = {
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          holiday: 0
        };
      }
      
      monthlyBreakdown[month].total++;
      monthlyBreakdown[month][record.status]++;
    });

    // Calculate subject-wise attendance
    const subjectWise = {};
    attendance.forEach(record => {
      if (!subjectWise[record.subject]) {
        subjectWise[record.subject] = {
          total: 0,
          present: 0,
          absent: 0,
          late: 0
        };
      }
      
      subjectWise[record.subject].total++;
      if (record.status === 'present' || record.status === 'late') {
        subjectWise[record.subject].present++;
      } else if (record.status === 'absent') {
        subjectWise[record.subject].absent++;
      } else if (record.status === 'late') {
        subjectWise[record.subject].late++;
      }
    });

    res.json({
      success: true,
      data: {
        attendance,
        monthlyBreakdown,
        subjectWise
      }
    });
  } catch (error) {
    console.error('Get child attendance error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/parent/child/:id/grades
// @desc    Get child's grades and performance
// @access  Private (Parent only)
router.get('/child/:id/grades', auth, authorize('parent'), async (req, res) => {
  try {
    // Verify that this child belongs to the parent
    const parent = await User.findById(req.user._id);
    const childRelation = parent.children.find(
      child => child.studentId.toString() === req.params.id
    );

    if (!childRelation) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this child\'s grades'
      });
    }

    const child = await User.findById(req.params.id);
    
    // Get assignments with submissions and grades
    const assignments = await Assignment.find({ 
      class: child.class,
      status: 'published'
    })
    .populate('teacher', 'name email')
    .populate({
      path: 'submissions.student',
      match: { _id: req.params.id }
    });

    // Filter assignments with grades
    const gradedAssignments = assignments.map(assignment => {
      const submission = assignment.submissions.find(
        sub => sub.student && sub.student._id.toString() === req.params.id
      );
      
      return {
        id: assignment._id,
        title: assignment.title,
        subject: assignment.subject,
        type: assignment.type,
        teacher: assignment.teacher.name,
        submittedAt: submission?.submittedAt,
        score: submission?.score,
        feedback: submission?.feedback,
        status: submission?.status || 'not_submitted'
      };
    });

    // Calculate subject-wise performance
    const subjectPerformance = {};
    gradedAssignments.forEach(assignment => {
      if (assignment.score !== undefined) {
        if (!subjectPerformance[assignment.subject]) {
          subjectPerformance[assignment.subject] = {
            scores: [],
            average: 0,
            count: 0
          };
        }
        subjectPerformance[assignment.subject].scores.push(assignment.score);
        subjectPerformance[assignment.subject].count++;
      }
    });

    // Calculate averages
    Object.keys(subjectPerformance).forEach(subject => {
      const scores = subjectPerformance[subject].scores;
      subjectPerformance[subject].average = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
    });

    res.json({
      success: true,
      data: {
        child: {
          id: child._id,
          name: child.name,
          class: child.class
        },
        assignments: gradedAssignments,
        subjectPerformance
      }
    });
  } catch (error) {
    console.error('Get child grades error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
