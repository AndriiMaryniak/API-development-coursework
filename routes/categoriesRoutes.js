const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, deleteCategory } = require('../controllers/categoriesController');

// Маршрути для категорій
router.route('/').get(getAllCategories).post(createCategory);
router.route('/:id').delete(deleteCategory);

module.exports = router;