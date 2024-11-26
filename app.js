
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const usersRoutes = require('./routes/usersRoutes');

// URL з файлу .env
const mongoDBURI = process.env.MONGO_URI;

// Підключення до MongoDB
async function connectDB() {
  try {
    await mongoose.connect(mongoDBURI); // Видалено застарілі опції
    console.log('Successfully connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/authors', authorsRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/users', usersRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Server is running on port 5000');
});

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

