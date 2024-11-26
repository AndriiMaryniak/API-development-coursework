const express = require('express');
const router = express.Router();
const { getAllAuthors, createAuthor, deleteAuthor, getAuthorsFromBooks } = require('../controllers/authorsController');

// Маршрути для авторів
router.route('/').get(getAllAuthors).post(createAuthor);
router.route('/from-books').get(getAuthorsFromBooks); // Новий маршрут
router.route('/:id').delete(deleteAuthor);

module.exports = router;
