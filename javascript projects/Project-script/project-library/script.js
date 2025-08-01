const myLibrary = [];

function Book(author, title, pages, read) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.Read = function () {
  this.read = !this.read;
};

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
}

function displayLibrary() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = '';

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="read">Read</button>
      <button class="remove-book">Remove</button>
    `;

    libraryContainer.appendChild(bookCard);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

function ReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.Read();
  }
}


const newBookBtn = document.getElementById('mainbtn');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => {
  bookForm.style.display = 'flex';
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = Number(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  addBookToLibrary(author, title, pages, read);
  displayLibrary();

  bookForm.reset();
  bookForm.style.display = 'none';
});

const libraryContainer = document.getElementById('library-container');

libraryContainer.addEventListener('click', (e) => {
  const bookId = e.target.parentElement.dataset.id;
  if (e.target.classList.contains('remove-book')) {
    removeBook(bookId);
    displayLibrary();
  } else if (e.target.classList.contains('read')) {
    ReadStatus(bookId);
    displayLibrary();
  }
});


addBookToLibrary("George Orwell", "1984", 328, true);
addBookToLibrary("Harper Lee", "To Kill a Mockingbird", 281, false);
displayLibrary();
