const express = require('express');
const router = express.Router();
const {
  getDeals,
  createDeal,
  updateDeal,
  deleteDeal
} = require('../controllers/dealController');

router.route('/')
  .get(getDeals)
  .post(createDeal);

router.route('/:id')
  .put(updateDeal)
  .delete(deleteDeal);

module.exports = router;