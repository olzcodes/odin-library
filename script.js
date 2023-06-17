const formContainerEl = document.querySelector(".form-container");
const inputTitleEl = document.querySelector("#title");
const inputAuthorEl = document.querySelector("#author");
const inputPagesEl = document.querySelector("#pages");
const inputCategoryEl = document.querySelector("#category");
const inputCompletedEl = document.querySelector("#completed");
const saveButtonEl = document.querySelector("#btn-save");
const formDrawerEl = document.querySelector(".form-drawer");
const btnPlusEl = document.querySelector("#btn-plus");
const btnMinusEl = document.querySelector("#btn-minus");

const mainEl = document.querySelector("main");
const tableBodyEl = document.querySelector(".table-body");

let myLibrary = [
  {
    title: "The Lord of the Poops",
    author: "Unknown",
    pages: "580",
    category: "Adventure",
    completed: false,
    bookId: 5,
  },
  {
    title: "101 Ways to Poop",
    author: "Unknown",
    pages: "75",
    category: "Self-help",
    completed: false,
    bookId: 6,
  },
  {
    title: "Anthology of Poop",
    author: "Unknown",
    pages: "214",
    category: "History",
    completed: false,
    bookId: 7,
  },
  {
    title: "Return of the Poop",
    author: "Unknown",
    pages: "587",
    category: "Adventure",
    completed: false,
    bookId: 8,
  },
  {
    title: "2023: A Poop Odyssey",
    author: "Unknown",
    pages: "69",
    category: "Sci-Fi",
    completed: false,
    bookId: 9,
  },
  {
    title: "200 Recipes for Giant Poops",
    author: "Unknown",
    pages: "250",
    category: "Cooking",
    completed: false,
    bookId: 10,
  },
  {
    title: "Everything About Poop",
    author: "Unknown",
    pages: "12",
    category: "Self-help",
    completed: true,
    bookId: 1,
  },
  {
    title: "Poop For Dummies",
    author: "Unknown",
    pages: "6",
    category: "Self-help",
    completed: true,
    bookId: 2,
  },
  {
    title: "Poop For Dummies - Part 2",
    author: "Unknown",
    pages: "8",
    category: "Self-help",
    completed: true,
    bookId: 3,
  },
  {
    title: "The Wonderful World of Poop",
    author: "Unknown",
    pages: "32",
    category: "Fiction",
    completed: true,
    bookId: 4,
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
  newBook.bookId = new Date().getTime();
  myLibrary.unshift(newBook);
  console.log(newBook);
  console.log(newBook.info());
  console.log(myLibrary);
  displayAllBooks();
  removeButtonHandler();
  completedToggleHandler();
};

const displayAllBooks = function () {
  tableBodyEl.innerHTML = ``;
  for (book of myLibrary) {
    title = book.title;
    author = book.author;
    pages = book.pages;
    category = book.category;
    book.completed ? (readStatus = "Read") : (readStatus = "Unread");
    book.completed ? (cssClass = "read") : (cssClass = "unread");
    bookId = book.bookId;
    tableBodyEl.innerHTML += `
    <tr class="${cssClass}">
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
        <div class="completed-toggle ${cssClass}" data-book-id="${bookId}">
          ${readStatus}
        </div>
      </td>
      <td class="td-remove">
        <div class="remove-button" data-book-id="${bookId}">
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

const findBookIndex = function (bookId) {
  for (book of myLibrary) {
    if (book.bookId == bookId) {
      return myLibrary.indexOf(book);
    }
  }
};

const removeBookFromLibrary = function (bookId, button) {
  let bookIndex = findBookIndex(bookId);
  const confirmedByUser = confirm(
    `Remove '${myLibrary[bookIndex].title}' by ${myLibrary[bookIndex].author}?`
  );
  if (!confirmedByUser) return;
  myLibrary.splice(bookIndex, 1);
  button.parentNode.parentNode.remove();
};

const removeButtonHandler = function () {
  const removeButtonNodeList = document.querySelectorAll(".remove-button");
  removeButtonNodeList.forEach((button) =>
    button.addEventListener("click", function () {
      removeBookFromLibrary(button.dataset.bookId, button);
    })
  );
};

removeButtonHandler();

const toggleStatus = function (bookId, toggle) {
  let bookIndex = findBookIndex(bookId);
  if (myLibrary[bookIndex].completed) {
    myLibrary[bookIndex].completed = false;
    toggle.textContent = "Unread";
    toggle.classList.remove("read");
    toggle.parentNode.parentNode.classList.remove("read");
  } else {
    myLibrary[bookIndex].completed = true;
    toggle.textContent = "Read";
    toggle.classList.add("read");
    toggle.parentNode.parentNode.classList.add("read");
  }
};

const completedToggleHandler = function () {
  const completedToggleNodeList =
    document.querySelectorAll(".completed-toggle");
  completedToggleNodeList.forEach((toggle) =>
    toggle.addEventListener("click", function () {
      toggleStatus(toggle.dataset.bookId, toggle);
    })
  );
};

completedToggleHandler();

const showForm = function () {
  btnPlusEl.addEventListener("click", function () {
    formContainerEl.classList.remove("hidden");
    formContainerEl.classList.add("visible");
    btnPlusEl.classList.add("hidden");
    btnPlusEl.classList.remove("visible");
    btnMinusEl.classList.remove("hidden");
    btnMinusEl.classList.add("visible");
    formDrawerEl.style.borderTop = "none";
  });
};

showForm();

const hideForm = function () {
  btnMinusEl.addEventListener("click", function () {
    formContainerEl.classList.add("hidden");
    formContainerEl.classList.remove("visible");
    btnMinusEl.classList.add("hidden");
    btnMinusEl.classList.remove("visible");
    btnPlusEl.classList.remove("hidden");
    btnPlusEl.classList.add("visible");
    formDrawerEl.style.borderTop = "2px solid springgreen";
  });
};

hideForm();
