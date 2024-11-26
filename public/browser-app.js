let token = '';

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  const authMessage = document.getElementById('auth-message');
  const errorMessage = document.getElementById('error-message');

  if (response.ok) {
    authMessage.textContent = 'Registration successful!';
    authMessage.className = '';
    errorMessage.textContent = '';
  } else {
    authMessage.textContent = '';
    errorMessage.textContent = data.msg || 'Error during registration';
  }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  const authMessage = document.getElementById('auth-message');
  const errorMessage = document.getElementById('error-message');

  if (response.ok) {
    token = data.token;
    authMessage.textContent = 'Login successful!';
    authMessage.className = '';
    errorMessage.textContent = '';
  } else {
    authMessage.textContent = '';
    errorMessage.textContent = data.msg || 'Login failed';
  }
});

async function fetchBooks() {
  const response = await fetch('/api/v1/books');
  const data = await response.json();
  const booksList = document.getElementById('books-list');
  const errorMessage = document.getElementById('error-message');

  if (response.ok) {
    booksList.innerHTML = data.books.map(
      (book) => `
        <li>
          ${book.title} by ${book.author} - ${book.category} ($${book.price})
          <button onclick="readDescription('${book._id}')">Read Description</button>
          <button onclick="deleteBook('${book._id}')">Delete</button>
        </li>`
    ).join('');
  } else {
    booksList.innerHTML = `<li class="error">${data.msg || 'Failed to fetch books'}</li>`;
    errorMessage.textContent = data.msg || 'Failed to fetch books';
  }
}

async function deleteBook(bookId) {
  const response = await fetch(`/api/v1/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.msg);
    fetchBooks();
  } else {
    alert(data.msg || 'Failed to delete book');
  }
}

// Функція для отримання опису книги
async function readDescription(bookId) {
  const response = await fetch(`/api/v1/books/${bookId}/description`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  if (response.ok) {
    alert(`Description: ${data.description}`);
  } else {
    alert(data.msg || 'Failed to fetch description');
  }
}

document.getElementById('add-book-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const category = document.getElementById('book-category').value;
  const price = document.getElementById('book-price').value;
  const description = document.getElementById('book-description').value;

  const response = await fetch('/api/v1/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, author, category, price, description })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Book added successfully!');
    fetchBooks();
  } else {
    alert(data.msg || 'Failed to add book');
  }
});

// Оновлена функція для отримання авторів із книг
async function fetchAuthorsFromBooks() {
  const response = await fetch('/api/v1/authors/from-books');
  const data = await response.json();
  const authorsList = document.getElementById('authors-list');
  const errorMessage = document.getElementById('error-message');

  if (response.ok) {
    authorsList.innerHTML = data.authors.map(author => `<li>${author}</li>`).join('');
  } else {
    authorsList.innerHTML = `<li class="error">Error: ${data.msg}</li>`;
    errorMessage.textContent = data.msg || 'Failed to fetch authors from books';
  }
}

async function fetchAuthors() {
  const response = await fetch('/api/v1/authors');
  const data = await response.json();
  const authorsList = document.getElementById('authors-list');
  const errorMessage = document.getElementById('error-message');

  if (response.ok) {
    authorsList.innerHTML = data.authors.map(author => `<li>${author.name}</li>`).join('');
  } else {
    authorsList.innerHTML = `<li class="error">Error: ${data.msg}</li>`;
    errorMessage.textContent = data.msg || 'Failed to fetch authors';
  }
}

document.getElementById('show-authors-from-books').addEventListener('click', fetchAuthorsFromBooks);
