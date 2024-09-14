const Unit = require('../models/Unit');

// Add Unit to Class
exports.addUnit = async (req, res) => {
  const { name } = req.body;
  console.log(req.body.name);
  console.log(req.params);
  try {
    const newUnit = new Unit({ name, classId: req.params.classId });
    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Units (Books) for a specific class
exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find({ classId: req.params.classId });
    if (!units || units.length === 0) {
      return res.status(404).json({ message: 'No units found for this class' });
    }
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
