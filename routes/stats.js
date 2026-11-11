
const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const Student = require('../models/Student');

// GET /api/stats
router.get('/', requireAuth, async (req, res) => {
  try {

    const stats = await Student.aggregate([

      // 1. Only include students with an assigned creator
      {
        $match: {
          createdBy: { $type: 'objectId' }
        }
      },

      // 2. Group students according to their creator
      {
        $group: {
          _id: '$createdBy',
          totalStudents: { $sum: 1 }
        }
      },

      // 3. Get the user information
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },

      // 4. Convert the user array into an object
      {
        $unwind: '$user'
      },

      // 5. Select only the fields we need
      {
        $project: {
          _id: 0,
          email: '$user.email',
          role: '$user.role',
          totalStudents: 1
        }
      },

      // 6. Sort from highest to lowest
      {
        $sort: {
          totalStudents: -1
        }
      },

      // 7. Display only the top 10 users
      {
        $limit: 10
      }

    ]);

    res.json(stats);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
