const express = require('express');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/student/courses
// @desc    Get student's courses
// @access  Private (Student only)
router.get('/courses', auth, authorize('student'), async (req, res) => {
  try {
    const studentClass = req.user.class;
    
    const courses = await Course.find({ 
      class: studentClass,
      status: 'active'
    })
    .populate('teacher', 'name email')
    .populate('enrolledStudents.student', 'name rollNumber')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/student/materials
// @desc    Get study materials for student's class
// @access  Private (Student only)
router.get('/materials', auth, authorize('student'), async (req, res) => {
  try {
    const { type, subject, search } = req.query;
    const studentClass = req.user.class;
    
    // Build filter
    const filter = { 
      class: studentClass,
      status: 'published'
    };
    
    if (type && type !== 'all') filter.type = type;
    if (subject && subject !== 'all') filter.subject = subject;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const materials = await Assignment.find(filter)
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: materials
    });
  } catch (error) {
    console.error('Get materials error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/student/assignments
// @desc    Get student's assignments
// @access  Private (Student only)
router.get('/assignments', auth, authorize('student'), async (req, res) => {
  try {
    const studentClass = req.user.class;
    
    const assignments = await Assignment.find({ 
      class: studentClass,
      type: 'assignments',
      status: 'published'
    })
    .populate('teacher', 'name email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.error('Get assignments error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/student/assignments/:id/submit
// @desc    Submit assignment
// @access  Private (Student only)
router.post('/assignments/:id/submit', auth, authorize('student'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check if student belongs to the assignment class
    if (assignment.class !== req.user.class) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to submit this assignment'
      });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user._id.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Assignment already submitted'
      });
    }

    // Add submission
    assignment.submissions.push({
      student: req.user._id,
      submittedAt: new Date(),
      status: 'submitted'
    });

    await assignment.save();

    res.json({
      success: true,
      message: 'Assignment submitted successfully',
      data: assignment
    });
  } catch (error) {
    console.error('Submit assignment error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/student/attendance
// @desc    Get student's attendance
// @access  Private (Student only)
router.get('/attendance', auth, authorize('student'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const studentClass = req.user.class;
    
    // Build filter
    const filter = { 
      student: req.user._id,
      class: studentClass
    };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(filter)
      .populate('teacher', 'name')
      .sort({ date: -1 });

    // Calculate statistics
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'present').length;
    const absentDays = attendance.filter(a => a.status === 'absent').length;
    const lateDays = attendance.filter(a => a.status === 'late').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    res.json({
      success: true,
      data: {
        attendance,
        statistics: {
          totalDays,
          presentDays,
          absentDays,
          lateDays,
          attendancePercentage
        }
      }
    });
  } catch (error) {
    console.error('Get attendance error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/student/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private (Student only)
router.post('/courses/:id/enroll', auth, authorize('student'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if student belongs to the course class
    if (course.class !== req.user.class) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to enroll in this course'
      });
    }

    // Check if already enrolled
    const existingEnrollment = course.enrolledStudents.find(
      student => student.student.toString() === req.user._id.toString()
    );

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Add enrollment
    course.enrolledStudents.push({
      student: req.user._id,
      enrolledAt: new Date(),
      progress: 0
    });

    await course.save();

    res.json({
      success: true,
      message: 'Enrolled successfully',
      data: course
    });
  } catch (error) {
    console.error('Enroll course error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
