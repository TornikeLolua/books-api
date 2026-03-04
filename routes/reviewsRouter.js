const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/', reviewsController.createReview);
router.get('/:id', reviewsController.getReviewById);

module.exports = router;