const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Attendance = require('../models/Attendance');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/stats', auth, authorize('admin'), async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalTeachers = await User.countDocuments({ role: 'teacher', isActive: true });
    const totalParents = await User.countDocuments({ role: 'parent', isActive: true });
    const totalClasses = await User.distinct('class', { role: 'student' });
    
    // Calculate attendance rate (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const totalAttendanceRecords = await Attendance.countDocuments({
      date: { $gte: thirtyDaysAgo }
    });
    
    const presentRecords = await Attendance.countDocuments({
      date: { $gte: thirtyDaysAgo },
      status: 'present'
    });
    
    const attendanceRate = totalAttendanceRecords > 0 
      ? Math.round((presentRecords / totalAttendanceRecords) * 100)
      : 0;

    // Get recent activities
    const recentUsers = await User.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name role email createdAt');

    const recentActivities = recentUsers.map(user => ({
      user: user.name,
      action: `New ${user.role} registered`,
      time: formatTimeAgo(user.createdAt),
      type: user.role
    }));

    // Get pending approvals
    const pendingUsers = await User.find({ isActive: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name role email createdAt');

    const pendingApprovals = pendingUsers.map(user => ({
      id: user._id,
      name: user.name,
      type: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Registration`,
      date: user.createdAt.toISOString().split('T')[0]
    }));

    res.json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalParents,
        totalClasses: totalClasses.length,
        attendanceRate,
        recentActivities,
        pendingApprovals
      }
    });
  } catch (error) {
    console.error('Get stats error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with filtering
// @access  Private (Admin only)
router.get('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search } = req.query;
    
    // Build filter
    const filter = {};
    if (role && role !== 'all') filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/users
// @desc    Create a new user
// @access  Private (Admin only)
router.post('/users', auth, authorize('admin'), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'teacher', 'parent', 'admin']).withMessage('Invalid role'),
  body('class').optional().trim(),
  body('rollNumber').optional().trim(),
  body('phone').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, password, role, class: studentClass, rollNumber, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user object based on role
    const userData = {
      name,
      email,
      password,
      role,
      isActive: true
    };

    // Add role-specific fields
    if (role === 'student') {
      userData.class = studentClass;
      userData.rollNumber = rollNumber;
    } else if (role === 'teacher') {
      userData.assignedClasses = [];
      userData.subjects = [];
    } else if (role === 'parent') {
      userData.children = [];
    }

    if (phone) userData.phone = phone;

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Create user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin only)
router.put('/users/:id', auth, authorize('admin'), [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('role').optional().isIn(['student', 'teacher', 'parent', 'admin']),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updates = req.body;
    
    // Don't allow password update through this endpoint
    delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user (soft delete - deactivate)
// @access  Private (Admin only)
router.delete('/users/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow admin to delete themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    // Soft delete - deactivate account
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/users/:id/approve
// @desc    Approve user registration
// @access  Private (Admin only)
router.put('/users/:id/approve', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'User is already active'
      });
    }

    user.isActive = true;
    await user.save();

    res.json({
      success: true,
      message: 'User approved successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Approve user error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/classes
// @desc    Get all classes with statistics
// @access  Private (Admin only)
router.get('/classes', auth, authorize('admin'), async (req, res) => {
  try {
    const classes = await User.aggregate([
      { $match: { role: 'student', isActive: true } },
      { $group: { _id: '$class', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Get teacher assignments for each class
    const classDetails = await Promise.all(classes.map(async (classInfo) => {
      const teachers = await User.find({
        role: 'teacher',
        assignedClasses: classInfo._id,
        isActive: true
      }).select('name subjects email');

      return {
        name: classInfo._id,
        students: classInfo.count,
        teachers: teachers
      };
    }));

    res.json({
      success: true,
      data: classDetails
    });
  } catch (error) {
    console.error('Get classes error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/reports
// @desc    Generate various reports
// @access  Private (Admin only)
router.get('/reports', auth, authorize('admin'), async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    
    let reportData = {};

    switch (type) {
      case 'attendance':
        const attendanceFilter = {};
        if (startDate && endDate) {
          attendanceFilter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          };
        }
        
        const attendanceStats = await Attendance.aggregate([
          { $match: attendanceFilter },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          }
        ]);
        
        reportData = {
          title: 'Attendance Report',
          data: attendanceStats,
          generated: new Date().toISOString()
        };
        break;

      case 'users':
        const userStats = await User.aggregate([
          { $match: { isActive: true } },
          {
            $group: {
              _id: '$role',
              count: { $sum: 1 }
            }
          }
        ]);
        
        reportData = {
          title: 'User Statistics',
          data: userStats,
          generated: new Date().toISOString()
        };
        break;

      case 'courses':
        const courseStats = await Course.aggregate([
          {
            $group: {
              _id: '$class',
              totalCourses: { $sum: 1 },
              totalLessons: { $sum: '$totalLessons' }
            }
          }
        ]);
        
        reportData = {
          title: 'Course Statistics',
          data: courseStats,
          generated: new Date().toISOString()
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      data: reportData
    });
  } catch (error) {
    console.error('Generate reports error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Helper function to format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  }
}

module.exports = router;
