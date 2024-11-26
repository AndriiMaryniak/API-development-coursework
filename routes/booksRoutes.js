const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, deleteBook, getBookDescription } = require('../controllers/booksController');

// Маршрути для книг
router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').delete(deleteBook);
router.route('/:id/description').get(getBookDescription); // Новий маршрут для опису книги

module.exports = router;
