const Session = require('../models/Session');

// Add Session to Specific Class
exports.addSession = async (req, res) => {
  const { name } = req.body;
  try {
    const newSession = new Session({ name, classId: req.params.classId });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All the Sessions of a Specific Class
exports.getAllSessions = async (req, res) => {
  const { classId } = req.params;
  try {
    const sessions = await Session.find({ classId });
    if (!sessions) {
      return res.status(404).json({ message: 'No sessions found for this class' });
    }
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};