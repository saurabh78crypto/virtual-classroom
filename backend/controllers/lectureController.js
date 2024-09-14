const Lecture = require('../models/Lecture');

// Add Lecture to Session
exports.addLecture = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newLecture = new Lecture({ title, content, sessionId: req.params.sessionId });
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Lectures for a Session
exports.getLectures = async (req, res) => {
  try {
    console.log(req.params);
    const lectures = await Lecture.find({ sessionId: req.params.sessionId });
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}