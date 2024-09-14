const Class = require('../models/Class');

// Create Class
exports.createClass = async (req, res) => {
  const { name } = req.body;
  
  try {
    const newClass = new Class({ name, instructor: req.user._id });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('instructor');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Class By Id
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.classId).populate('instructor');
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
