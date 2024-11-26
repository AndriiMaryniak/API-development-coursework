const Book = require('../models/Book');

// Отримати всі книги
const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json({ books });
};

// Додати нову книгу
const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ book });
};

// Видалити книгу
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(200).json({ msg: `Book with id ${id} deleted` });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete book', error: err.message });
  }
};

// Отримати опис книги
const getBookDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(200).json({ description: book.description });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch book description', error: err.message });
  }
};

module.exports = { getAllBooks, createBook, deleteBook, getBookDescription };
