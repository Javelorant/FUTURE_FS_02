const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a deal title'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company'],
    trim: true
  },
  value: {
    type: Number,
    required: [true, 'Please add a deal value'],
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'Prospecting'
  },
  closeDate: {
    type: String,
    required: [true, 'Please add a close date']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Deal', dealSchema);