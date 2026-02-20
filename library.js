const library = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = (read) ? "read" : "not read yet";

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const aBook = new Book(title, author, pages, read);
  library.push(aBook);
}

function displayLibrary() {
  const book_list = document.querySelector(".book-list");

  library.forEach(book => {
    const book_card = document.createElement("div");
    book_card.classList.add("book-card");
    book_card.textContent = book.info();
    book_list.appendChild(book_card);
  });
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
      newBookFormData.get("read"),
    );

    newBookModal.close();
  })
}

handleNewBookSubmission();

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false); // Sample 
addBookToLibrary("Merlin's Ring", "H. Warner Munn", 384, true);

displayLibrary();