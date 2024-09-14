const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const classRoutes = require('./routes/class');
const unitRoutes = require('./routes/unit');
const sessionRoutes = require('./routes/session');
const lectureRoutes = require('./routes/lecture');
const commentRoutes = require('./routes/comment');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
