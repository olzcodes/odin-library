const saveButtonEl = document.querySelector("#btn-save");
const mainEl = document.querySelector("main");
const tableBodyEl = document.querySelector(".table-body");

const inputTitleEl = document.querySelector("#title");
const inputAuthorEl = document.querySelector("#author");
const inputPagesEl = document.querySelector("#pages");
const inputCategoryEl = document.querySelector("#category");
const inputCompletedEl = document.querySelector("#completed");

let myLibrary = [
  {
    title: "Everything About Poop",
    author: "Unknown",
    pages: "12",
    category: "Self-help",
    completed: true,
  },
  {
    title: "Poop For Dummies",
    author: "Unknown",
    pages: "6",
    category: "Self-help",
    completed: true,
  },
  {
    title: "Poop For Dummies - Part 2",
    author: "Unknown",
    pages: "8",
    category: "Self-help",
    completed: true,
  },
  {
    title: "The Wonderful World of Poop",
    author: "Unknown",
    pages: "32",
    category: "Fiction",
    completed: true,
  },
  {
    title: "The Lord of the Poops",
    author: "Unknown",
    pages: "580",
    category: "Adventure",
    completed: false,
  },
  {
    title: "101 Ways to Poop",
    author: "Unknown",
    pages: "75",
    category: "Self-help",
    completed: false,
  },
  {
    title: "Anthology of Poop",
    author: "Unknown",
    pages: "214",
    category: "History",
    completed: false,
  },
  {
    title: "Return of the Poop",
    author: "Unknown",
    pages: "587",
    category: "Adventure",
    completed: false,
  },
  {
    title: "2023: A Poop Odyssey",
    author: "Unknown",
    pages: "69",
    category: "Sci-Fi",
    completed: false,
  },
  {
    title: "200 Recipes for Giant Poops",
    author: "Unknown",
    pages: "250",
    category: "Cooking",
    completed: false,
  },
];

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
  const title = inputTitleEl.value;
  const author = inputAuthorEl.value;
  const pages = inputPagesEl.value;
  const category = inputCategoryEl.value;
  const completed = inputCompletedEl.checked;

  newBook = new Book(title, author, pages, category, completed);
};

const addBookToLibrary = function () {
  createNewBook();
  myLibrary.push(newBook);
  console.log(newBook);
  console.log(newBook.info());
  console.log(myLibrary);
  displayAllBooks();
};

const displayAllBooks = function () {
  tableBodyEl.innerHTML = ``;
  for (book of myLibrary) {
    title = book.title;
    author = book.author;
    pages = book.pages;
    category = book.category;
    completed = book.completed;
    book_id = myLibrary.indexOf(book);
    tableBodyEl.innerHTML += `
    <tr>
    <td class="td-title">
        ${title}
      </td>
      <td class="td-author">
        ${author}
      </td>
      <td class="td-pages">
        ${pages}
      </td>
      <td class="td-category">
        ${category}
      </td>
      <td class="td-completed">
        ${completed}
      </td>
      <td class="td-remove">
      <div class="remove-button" data-book_id="${book_id}">
        x
      </div>
      </td>
    </tr>
    `;
  }
};

displayAllBooks();

const saveButtonHandler = function () {
  saveButtonEl.addEventListener("click", function () {
    addBookToLibrary();
  });
};

saveButtonHandler();

const removeBookFromLibrary = function (book_id) {
  myLibrary.splice(book_id, 1);
  displayAllBooks();
  removeButtonHandler();
};

const removeButtonHandler = function () {
  const removeButtonNodeList = document.querySelectorAll(".remove-button");
  removeButtonNodeList.forEach((button) =>
    button.addEventListener("click", function () {
      removeBookFromLibrary(button.dataset.book_id);
    })
  );
};

removeButtonHandler();
