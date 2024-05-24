const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookContainer = document.querySelector("#bookContainer");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
    <div class="book-card">
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Has Read: ${book.hasRead ? "Yes" : "No"}</p>
    <div class="bookbtn">
    <button onclick="removeBook(${index})">Remove</button>
    <svg class="checkbox-icon" viewBox="0 0 24 24" onclick="toggleReadStatus(${index})">
        <!-- Replace this path with your SVG icon code -->
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l-4-4 1.41-1.41L9 14.17l7.59-7.59L18 9l-9 9z"></path>
    </svg>
    </div
    
</div>
`;
    bookContainer.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].hasRead = !myLibrary[index].hasRead;
  displayBooks();
}

const newBookBtn = document.querySelector("#newBookBtn");
const newBookDialog = document.querySelector("#newBookDialog");
const closeDialogBtn = document.querySelector("#closeDialog");
const bookForm = document.querySelector("#bookForm");

newBookBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  newBookDialog.close();
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const hasRead = document.querySelector("#hasRead").checked;
  addBookToLibrary(title, author, pages, hasRead);
  newBookDialog.close();
  bookForm.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  320,
  true
);
