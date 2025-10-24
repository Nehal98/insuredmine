// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import routes
const uploadRoutes = require('./routes/upload');
const searchRoutes = require('./routes/search');
const aggregateRoutes = require('./routes/aggregate');
const scheduleRoutes = require('./routes/schedule');

// Middlewares
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', searchRoutes);
app.use('/api', aggregateRoutes);
app.use('/api', scheduleRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Import and start CPU monitor
const monitorCPU = require('./utils/cpuMonitor');
// monitorCPU();
