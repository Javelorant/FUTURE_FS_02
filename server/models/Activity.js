const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Call', 'Email', 'Meeting', 'Task', 'Note'],
    default: 'Call'
  },
  date: {
    type: String,
    required: [true, 'Please add a date']
  },
  relatedTo: {
    type: String,
    required: [true, 'Please add related contact or deal'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);