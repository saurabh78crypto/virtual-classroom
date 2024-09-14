const express = require('express');
const router = express.Router();
const { addUnit, getUnits } = require('../controllers/unitController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:classId/units', authMiddleware, addUnit);
router.get('/:classId', authMiddleware, getUnits);

module.exports = router;
