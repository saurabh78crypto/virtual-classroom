const express = require('express');
const router = express.Router();
const { addSession, getAllSessions } = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:classId/sessions', authMiddleware, addSession);
router.get('/:classId/sessions', authMiddleware, getAllSessions);

module.exports = router;
