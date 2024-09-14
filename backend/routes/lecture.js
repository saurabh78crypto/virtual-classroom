const express = require('express');
const router = express.Router();
const { addLecture, getLectures } = require('../controllers/lectureController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:sessionId/lectures', authMiddleware, addLecture);
router.get('/:sessionId/lectures', authMiddleware, getLectures);

module.exports = router;

