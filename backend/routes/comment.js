const express = require('express');
const router = express.Router();
const { addComment, addReply } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/lecture/:lectureId/comment', authMiddleware, addComment);
router.post('/lecture/:lectureId/comment/:commentId/reply', authMiddleware, addReply);

module.exports = router;
