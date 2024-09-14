const Lecture = require('../models/Lecture');

// Add Comment to Lecture
exports.addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const lecture = await Lecture.findById(req.params.lectureId);
    lecture.comments.push({ userId: req.user.id, text });
    await lecture.save();
    res.status(201).json(lecture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Reply to Comment
exports.addReply = async (req, res) => {
  const { commentId, text } = req.body;
  try {
    const lecture = await Lecture.findById(req.params.lectureId);
    const comment = lecture.comments.id(commentId);
    comment.replies.push({ userId: req.user.id, text });
    await lecture.save();
    res.status(201).json(lecture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
