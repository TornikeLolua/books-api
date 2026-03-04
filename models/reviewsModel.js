const db = require('./db');

function createReview({ reviewer, rating, book_id, comment }) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO reviews (reviewer, rating, book_id, comment) VALUES (?, ?, ?, ?)',
      [reviewer, rating, book_id, comment],
      function (err) {
        if (err) reject(err);
        else resolve({ lastInsertRowid: this.lastID });
      }
    );
  });
}

function getReviewById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM reviews WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

module.exports = { createReview, getReviewById };