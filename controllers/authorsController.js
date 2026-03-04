const authorsModel = require('../models/authorsModel');

async function getAllAuthors(req, res) {
  const authors = await authorsModel.getAllAuthors();
  res.json(authors);
}

async function getAuthorById(req, res) {
  const { id } = req.params;
  const author = await authorsModel.getAuthorById(id);

  if (!author) {
    return res.status(404).json({ status: 404, message: 'An author with that ID was not found' });
  }

  const books = await authorsModel.getBooksByAuthorId(id);
  const booksWithLinks = books.map(book => ({
    ...book,
    link: `/api/v1/books/${book.id}`
  }));

  res.json({ ...author, books: booksWithLinks });
}

module.exports = { getAllAuthors, getAuthorById };