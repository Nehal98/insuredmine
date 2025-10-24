const express = require('express');
const User = require('../models/user');
const Policy = require('../models/policy');
const router = express.Router();

router.get('/policy/:name', async (req, res) => {
  const user = await User.findOne({ firstname: req.params.name });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const policies = await Policy.find({ user_id: user._id });
  res.json(policies);
});

module.exports = router;
