const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    replies: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String },
    }]
  }],
});

module.exports = mongoose.model('Lecture', LectureSchema);
