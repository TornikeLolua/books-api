const db = require('./db');

function getAllAuthors() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM authors', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getAuthorById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM authors WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function getBooksByAuthorId(authorId) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT books.id, books.title
      FROM authors
      JOIN authored ON authors.id = authored.author_id
      JOIN books ON authored.book_id = books.id
      WHERE authors.id = ?
    `, [authorId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { getAllAuthors, getAuthorById, getBooksByAuthorId };