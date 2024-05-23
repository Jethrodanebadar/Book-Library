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
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Has Read: ${book.hasRead ? 'Yes' : 'No'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
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
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 320, true);
