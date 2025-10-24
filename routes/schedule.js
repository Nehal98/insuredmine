const express = require('express');
const nodeCron = require('node-cron');
const Message = require('../models/message');
const router = express.Router();

// POST /api/schedule
// Body params: message, day (cron-like or day string), time ('HH:mm')
router.post('/schedule', async (req, res) => {
  try {
    const { message, day, time } = req.body;
    if (!message || !day || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Save message in DB
    await Message.create({ message, day, time });

    // Schedule cron job
    const [hour, minute] = time.split(':');
    // Example: `${minute} ${hour} * * ${day}` for node-cron format
    // You might adjust 'day' to match cron weekdays like 0-6 or day names
    const cronExpression = `${minute} ${hour} * * ${day}`;

    nodeCron.schedule(cronExpression, async () => {
      await Message.create({ message, day, time, createdAt: new Date() });
      console.log(`Scheduled message inserted at ${time} on day ${day}`);
    });

    res.json({ message: 'Message scheduled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
