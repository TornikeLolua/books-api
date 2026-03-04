const booksModel = require('../models/booksModel');

async function getAllBooks(req, res) {
  const format = req.query.format || 'hardcover';
  const page = parseInt(req.query.page) || 0;
  const books = await booksModel.getAllBooks(format, page);
  res.json(books);
}

async function getBookById(req, res) {
  const { id } = req.params;
  const book = await booksModel.getBookById(id);

  if (!book) {
    return res.status(404).json({ status: 404, message: 'A book with that ID was not found' });
  }

  const authors = await booksModel.getAuthorsByBookId(id);
  const authorsWithLinks = authors.map(author => ({
    ...author,
    link: `/api/v1/authors/${author.author_id}`
  }));

  res.json({ ...book, authors: authorsWithLinks });
}

module.exports = { getAllBooks, getBookById };