document.addEventListener("DOMContentLoaded", () => {
  let dialog = document.querySelector("#addbook-dialog");
  let addbtn = document.querySelector("#addbtn");
  let addbookform = document.querySelector("#addbook-form");
  let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

  addbtn.addEventListener("click", (e) => {
    dialog.showModal();
  });

  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  console.log("Jellooo");

  function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    displayBook();
    saveToLocalStorage();
    console.log(myLibrary);
  }

  addbookform.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let hasRead = document.querySelector("#book-hasRead").checked;

    addBookToLibrary(title, author, pages, hasRead);
    dialog.close();
    addbookform.reset();
  });

  function displayBook() {
    const bookContainer = document.querySelector(".bookcard-container");
    bookContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.innerHTML = `
        <h4>${book.title}</h3>
        <div class="bookcard-content"> 
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p id="hasRead-label">Has Read: ${book.hasRead ? "Yes" : "No"}</p>
        </div>
        <div class="bookcard-btn-container">
        <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" >
</div>
        <div class="bookbtn">
          <button id="remove-btn" onclick="removeBook(${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
        </div>
        </div>
      `;
      bookContainer.appendChild(bookCard);

      let switchtoggle = bookCard.querySelector("#flexSwitchCheckChecked");
      let hasReadlabel = bookCard.querySelector("#hasRead-label");

      switchtoggle.checked = book.hasRead;

      switchtoggle.addEventListener("change", (e) => {
        e.preventDefault();
        if (switchtoggle.checked) {
          hasReadlabel.textContent = "Has Read: Yes";
          myLibrary[index].hasRead = true;
        } else {
          hasReadlabel.textContent = "Has Read: No";
          myLibrary[index].hasRead = false;
        }
        saveToLocalStorage();
      });
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }

  window.removeBook = function (index) {
    myLibrary.splice(index, 1);
    displayBook();
    saveToLocalStorage();
  };

  displayBook();
});
