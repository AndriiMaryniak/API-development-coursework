const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Завантажуємо конфігураційний файл .env
dotenv.config();

// Ініціалізація додатку Express
const app = express();

// Середовище для підтримки JSON-тіл запитів
app.use(express.json());

// Додавання CORS для підтримки запитів з інших джерел
app.use(cors());

// Підключення до MongoDB за допомогою актуальної URI
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://andrewmarynyak0:40074012Qq@cluster0.cbeqj.mongodb.net/myLibraryDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Моделі та контролери
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/auth', userRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


