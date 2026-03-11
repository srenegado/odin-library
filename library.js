const library = [];

class Book {

  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  info() {
    const readInfo = (this.read) ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readInfo}`;
  }
  
  toggleReadStatus() {
    this.read = !(this.read);
  }
}
 
function addBookToLibrary(title, author, pages, read) {
  const aBook = new Book(title, author, pages, read);
  library.push(aBook);
}

function displayLibrary() {
  const bookList = document.querySelector(".book-list");

  library.forEach(book => {
    const bookCard = document.createElement("div");
    const removeBookButton = document.createElement("button");
    const toggleReadButton = document.createElement("button");
    const bookCardButtons = document.createElement("div");
    const bookCardDescription = document.createElement("span");

    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;

    bookCardDescription.textContent = book.info();

    bookCardButtons.classList.add("book-card-buttons");

    toggleReadButton.classList.add("toggle-read-button");
    toggleReadButton.textContent = "Change read status";

    removeBookButton.classList.add("remove-book-button");
    removeBookButton.textContent = "Remove";

    bookCardButtons.appendChild(toggleReadButton);
    bookCardButtons.appendChild(removeBookButton);
    bookCard.appendChild(bookCardDescription);
    bookCard.appendChild(bookCardButtons);
    bookList.appendChild(bookCard);
  });
}

function clearBooksOnDisplay() {
  const bookList = document.querySelector(".book-list");

  while(bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}

function handleNewBookSubmission() {
  const newBookButton = document.querySelector(".new-book-button");
  const newBookModal = document.querySelector(".new-book-modal");
  const addBookButton = document.querySelector(".add-book-button");
  
  newBookButton.addEventListener("click", () => {
    newBookModal.showModal();
  })

  addBookButton.addEventListener("click", (e) => {
    e.preventDefault(); // No server to submit to

    const newBookForm = document.querySelector(".new-book-form");
    const newBookFormData = new FormData(newBookForm, addBookButton);

    addBookToLibrary(
      newBookFormData.get("title"),
      newBookFormData.get("author"),
      Number(newBookFormData.get("pages")),
      newBookFormData.get("read") === "true"
    );

    // Have to close manually because of e.preventDefault()
    newBookModal.close(); 

    clearBooksOnDisplay();
    displayLibrary();
    handleBookRemoval();
    handleToggleReadStatus();
  })
}

function handleBookRemoval() {
  const removeBookButtons = document.querySelectorAll(".remove-book-button");

  removeBookButtons.forEach((removeBookButton) => {
    removeBookButton.addEventListener("click", () => {
      const bookCard = removeBookButton.parentElement.parentElement;
      const bookToRemoveIndex = library.findIndex((book) => book.id == bookCard.dataset.id);
      
      library.splice(bookToRemoveIndex, 1);
      bookCard.remove();
    });
  });
}

function handleToggleReadStatus() {
  const toggleReadButtons = document.querySelectorAll(".toggle-read-button");

  toggleReadButtons.forEach((toggleReadButton) => {
    toggleReadButton.addEventListener("click", () => {
      const bookCard = toggleReadButton.parentElement.parentElement;
      const bookToUpdate = library.find((book) => book.id == bookCard.dataset.id);
    
      bookToUpdate.toggleReadStatus();
      bookCard.firstChild.textContent = bookToUpdate.info();
    });
  });
}

handleNewBookSubmission();