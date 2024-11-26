const Book = require('../models/Book');

// Отримати всіх авторів із книг
const getAuthorsFromBooks = async (req, res) => {
  try {
    // Знаходимо всі книги та отримуємо унікальні імена авторів
    const books = await Book.find();
    const uniqueAuthors = [...new Set(books.map(book => book.author))];
    res.status(200).json({ authors: uniqueAuthors });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch authors', error: err.message });
  }
};

// Існуючі методи
const getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.status(200).json({ authors });
};

const createAuthor = async (req, res) => {
  const author = await Author.create(req.body);
  res.status(201).json({ author });
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  await Author.findByIdAndDelete(id);
  res.status(200).json({ msg: `Author with id ${id} deleted` });
};

module.exports = { getAllAuthors, createAuthor, deleteAuthor, getAuthorsFromBooks };
