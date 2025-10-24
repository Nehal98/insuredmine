const express = require('express');
const Policy = require('../models/policy');
const router = express.Router();

router.get('/aggregate', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      // Group policies by user_id and count them
      {
        $group: {
          _id: '$user_id',
          totalPolicies: { $sum: 1 },
          policies: { $push: '$policy_number' }  // optional: list all policy numbers
        }
      },
      // Join with User collection to get user details
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      // Flatten the userDetails array
      {
        $unwind: '$userDetails'
      },
      // Shape the final output
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$userDetails.firstname',
          email: '$userDetails.email',
          totalPolicies: 1,
          policies: 1
        }
      }
    ]);
    
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
