const reviewsModel = require('../models/reviewsModel');

async function createReview(req, res) {
  const { reviewer, rating, book_id, comment } = req.body;
  const result = await reviewsModel.createReview({ reviewer, rating, book_id, comment });
  const newId = result.lastInsertRowid;

  res.status(201)
    .set('Location', `/api/v1/reviews/${newId}`)
    .json({
      status: 201,
      message: 'Created',
      links: {
        by_review_id: `/api/v1/reviews/${newId}`,
        by_book_id: `/api/v1/reviews?book_id=${book_id}`,
      },
      review: { id: newId, reviewer, rating, book_id, comment },
    });
}

async function getReviewById(req, res) {
  const { id } = req.params;
  const review = await reviewsModel.getReviewById(id);

  if (!review) {
    return res.status(404).json({ status: 404, message: 'A review with that ID was not found' });
  }

  res.json(review);
}

module.exports = { createReview, getReviewById };