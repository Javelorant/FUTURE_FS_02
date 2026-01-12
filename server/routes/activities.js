const express = require('express');
const router = express.Router();
const {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');

router.route('/')
  .get(getActivities)
  .post(createActivity);

router.route('/:id')
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;