
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = {
      'notes': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      'videos': ['video/mp4', 'video/webm', 'video/avi'],
      'assignments': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      'quizzes': ['application/pdf', 'text/plain']
    };

    const fileType = req.body.type || 'notes';
    const allowedMimes = allowedTypes[fileType] || allowedTypes['notes'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for this upload type'), false);
    }
  }
});

// @route   POST /api/teacher/upload
// @desc    Upload study materials
// @access  Private (Teacher only)
router.post('/upload', auth, authorize('teacher'), upload.single('file'), [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type').isIn(['notes', 'videos', 'assignments', 'quizzes']).withMessage('Invalid type'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('description').optional().trim()
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

    const { title, type, subject, class: className, description } = req.body;

    const assignment = new Assignment({
      title,
      description,
      type,
      subject,
      class: className,
      teacher: req.user._id,
      status: 'published'
    });

    // Add file information if file was uploaded
    if (req.file) {
      assignment.fileUrl = `/uploads/${req.file.filename}`;
      assignment.fileName = req.file.originalname;
      assignment.fileSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
      assignment.fileType = req.file.mimetype;
    }

    // Add type-specific fields
    if (type === 'videos' && req.body.duration) {
      assignment.duration = req.body.duration;
    } else if (type === 'quizzes' && req.body.questions) {
      assignment.questions = parseInt(req.body.questions);
    } else if (type === 'assignments' && req.body.dueDate) {
      assignment.dueDate = new Date(req.body.dueDate);
    }

    await assignment.save();

    res.status(201).json({
      success: true,
      message: 'Material uploaded successfully',
      data: assignment
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during upload'
    });
  }
});

// @route   GET /api/teacher/materials
// @desc    Get teacher's uploaded materials
// @access  Private (Teacher only)
router.get('/materials', auth, authorize('teacher'), async (req, res) => {
  try {
    const { class: className, type, subject } = req.query;
    
    // Build filter
    const filter = { teacher: req.user._id };
    if (className) filter.class = className;
    if (type && type !== 'all') filter.type = type;
    if (subject && subject !== 'all') filter.subject = subject;

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

// @route   PUT /api/teacher/materials/:id
// @desc    Update material
// @access  Private (Teacher only)
router.put('/materials/:id', auth, authorize('teacher'), [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('status').optional().isIn(['draft', 'published', 'archived'])
], async (req, res) => {
  try {
    const material = await Assignment.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Check if teacher owns this material
    if (material.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this material'
      });
    }

    const updates = req.body;
    const updatedMaterial = await Assignment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Material updated successfully',
      data: updatedMaterial
    });
  } catch (error) {
    console.error('Update material error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/teacher/materials/:id
// @desc    Delete material
// @access  Private (Teacher only)
router.delete('/materials/:id', auth, authorize('teacher'), async (req, res) => {
  try {
    const material = await Assignment.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Check if teacher owns this material
    if (material.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this material'
      });
    }

    await Assignment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Material deleted successfully'
    });
  } catch (error) {
    console.error('Delete material error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/teacher/courses
// @desc    Create a new course
// @access  Private (Teacher only)
router.post('/courses', auth, authorize('teacher'), [
  body('name').trim().notEmpty().withMessage('Course name is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('description').optional().trim()
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

    const { name, subject, class: className, description } = req.body;

    const course = new Course({
      title: name,
      subject,
      class: className,
      teacher: req.user._id,
      description,
      status: 'draft'
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/teacher/courses
// @desc    Get teacher's courses
// @access  Private (Teacher only)
router.get('/courses', auth, authorize('teacher'), async (req, res) => {
  try {
    const { class: className } = req.query;
    
    const filter = { teacher: req.user._id };
    if (className) filter.class = className;

    const courses = await Course.find(filter)
      .populate('teacher', 'name email')
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

module.exports = router;
