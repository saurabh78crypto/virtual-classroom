const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClassById } = require('../controllers/classController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createClass);
router.get('/', getClasses);
router.get('/:classId', getClassById);

module.exports = router;
