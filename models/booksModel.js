const db = require('./db');

const PAGE_SIZE = 10;

function getAllBooks(format, page) {
  const offset = page * PAGE_SIZE;
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM books WHERE format = ? LIMIT ? OFFSET ?',
      [format, PAGE_SIZE, offset],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

function getBookById(id) {
  return new Promise((resolve, reject) => {
    db.get(`
      SELECT books.*, publishers.publisher AS publisher
      FROM books
      JOIN publishers ON books.publisher_id = publishers.id
      WHERE books.id = ?
    `, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function getAuthorsByBookId(bookId) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT authors.name, authored.author_id
      FROM books
      JOIN authored ON books.id = authored.book_id
      JOIN authors ON authored.author_id = authors.id
      WHERE books.id = ?
    `, [bookId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { getAllBooks, getBookById, getAuthorsByBookId };