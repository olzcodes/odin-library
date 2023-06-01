let myLibrary = [];

function Book(title, author, pages, category, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.category = category;
  this.completed = completed;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, completed: ${this.completed}`;
};

let newBook = {};

const createNewBook = function () {
  const title = prompt("Please enter TITLE");
  const author = prompt("Please enter AUTHOR");
  const pages = prompt("Please enter PAGES");
  const category = prompt("Please enter CATEGORY");
  const completed = false;

  newBook = new Book(title, author, pages, category, completed);
};

createNewBook();

function addBookToLibrary() {
  myLibrary.push(newBook);
}

console.log(newBook);
console.log(newBook.info());

addBookToLibrary();

console.log(myLibrary);
