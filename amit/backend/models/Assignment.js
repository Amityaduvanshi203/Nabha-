const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['notes', 'videos', 'assignments', 'quizzes'],
    required: [true, 'Assignment type is required']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  class: {
    type: String,
    required: [true, 'Class is required']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // File information
  fileUrl: {
    type: String
  },
  fileName: {
    type: String
  },
  fileSize: {
    type: String
  },
  fileType: {
    type: String
  },
  // Type specific fields
  duration: {
    type: String // For videos
  },
  questions: {
    type: Number // For quizzes
  },
  dueDate: {
    type: Date
  },
  // Status and metadata
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  // Submissions
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    fileUrl: String,
    fileName: String,
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    feedback: String,
    status: {
      type: String,
      enum: ['submitted', 'graded', 'late'],
      default: 'submitted'
    }
  }],
  // Statistics
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  attempts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
