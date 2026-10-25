require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/user-directory';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully!');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });