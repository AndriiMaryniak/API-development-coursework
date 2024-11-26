const Category = require('../models/Category');

// Отримати всі категорії
const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
};

// Додати нову категорію
const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ category });
};

// Видалити категорію
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(200).json({ msg: `Category with id ${id} deleted` });
};

module.exports = { getAllCategories, createCategory, deleteCategory };
