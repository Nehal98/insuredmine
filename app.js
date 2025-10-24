const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/upload');
const searchRoutes = require('./routes/search');
const aggregateRoutes = require('./routes/aggregate');
const scheduleRoutes = require('./routes/schedule');

mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', searchRoutes);
app.use('/api', aggregateRoutes);
app.use('/api', scheduleRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
