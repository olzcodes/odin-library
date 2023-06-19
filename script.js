const h1El = document.querySelector("h1");
const formContainerEl = document.querySelector(".form-container");
const addBookformEl = document.querySelector("#add-book");
const inputTitleEl = document.querySelector("#title");
const inputAuthorEl = document.querySelector("#author");
const inputPagesEl = document.querySelector("#pages");
const inputCategoryEl = document.querySelector("#category");
const inputCompletedEl = document.querySelector("#completed");
const saveButtonEl = document.querySelector("#btn-save");
const formDrawerEl = document.querySelector(".form-drawer");
const btnPlus = document.querySelector("#btn-plus");
const btnMinus = document.querySelector("#btn-minus");

const mainEl = document.querySelector("main");
const tableBodyEl = document.querySelector(".table-body");

let editMode = false;
let editBookId = 0;

const btnShowAllBooks = document.querySelector(".btn-all");
const btnShowReadBooks = document.querySelector(".btn-read");
const btnShowUnreadBooks = document.querySelector(".btn-unread");
let filtering = "showAll";

let poopLibrary = [
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
    title: "The Wonderful World of Poop",
    author: "Unknown",
    pages: "32",
    category: "Fiction",
    completed: true,
    bookId: 4,
  },
];

let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
if (!myLibrary) myLibrary = poopLibrary;

const saveToLocalStorage = function () {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

function Book(title, author, pages, category, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.category = category;
  this.completed = completed;
}

Book.prototype.info = function () {
  return `'${this.title}' by ${this.author}, ${this.pages} pages`;
};

let newBook = {};

const createNewBook = function () {
  const title = capitalize(inputTitleEl.value) || "-";
  const author = capitalize(inputAuthorEl.value) || "-";
  const pages = Math.abs(parseInt(inputPagesEl.value)) || "-";
  const category = capitalize(inputCategoryEl.value) || "-";
  const completed = inputCompletedEl.checked;

  addBookformEl.reset();

  newBook = new Book(title, author, pages, category, completed);
};

const editBook = function () {
  let bookIndex = findBookIndex(editBookId);
  myLibrary[bookIndex].title = capitalize(inputTitleEl.value) || "-";
  myLibrary[bookIndex].author = capitalize(inputAuthorEl.value) || "-";
  myLibrary[bookIndex].pages = Math.abs(parseInt(inputPagesEl.value)) || "-";
  myLibrary[bookIndex].category = capitalize(inputCategoryEl.value) || "-";
  myLibrary[bookIndex].completed = inputCompletedEl.checked;

  addBookformEl.reset();

  saveToLocalStorage();
  displayAllBooks();
  loadTableEventHandlers();
};

const addBookToLibrary = function () {
  createNewBook();
  newBook.bookId = new Date().getTime();
  myLibrary.unshift(newBook);

  saveToLocalStorage();
  console.log(newBook.info());
  displayAllBooks();
  loadTableEventHandlers();
};

const displayAllBooks = function () {
  tableBodyEl.innerHTML = ``;
  for (book of myLibrary) {
    if (filtering === "showReadOnly" && !book.completed) continue;
    if (filtering === "showUnreadOnly" && book.completed) continue;
    title = book.title;
    author = book.author;
    pages = book.pages;
    category = book.category;
    book.completed ? (readStatus = "Read") : (readStatus = "Unread");
    book.completed ? (cssClass = "read") : (cssClass = "unread");
    bookId = book.bookId;
    tableBodyEl.innerHTML += `
    <tr class="${cssClass}" data-book-id="${bookId}">
      <td class="td-remove">
        <div class="remove-button" data-book-id="${bookId}">
          x
        </div>
      </td>
      <td class="td-completed">
        <div class="completed-toggle ${cssClass}" data-book-id="${bookId}">
          ${readStatus}
        </div>
      </td>
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
    </tr>
    `;
  }
};

displayAllBooks();

const saveButtonHandler = function () {
  saveButtonEl.addEventListener("click", function (e) {
    if (!inputTitleEl.value || !inputAuthorEl.value) return;
    e.preventDefault();
    if (editMode === true) {
      editMode = false;
      editBook();
    } else {
      addBookToLibrary();
    }
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
  saveToLocalStorage();
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
    saveToLocalStorage();
    toggle.textContent = "Unread";
    toggle.classList.remove("read");
    toggle.parentNode.parentNode.classList.remove("read");
  } else {
    myLibrary[bookIndex].completed = true;
    saveToLocalStorage();
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

const showForm = function (inputFocus) {
  formContainerEl.classList.remove("hidden");
  formContainerEl.classList.add("visible");
  btnPlus.classList.add("hidden");
  btnPlus.classList.remove("visible");
  btnMinus.classList.remove("hidden");
  btnMinus.classList.add("visible");
  formDrawerEl.style.borderTop = "none";
  inputFocus.focus();
};

const showFormHandler = function () {
  btnPlus.addEventListener("click", function () {
    showForm(inputTitleEl);
  });
};

showFormHandler();

const hideForm = function () {
  btnMinus.addEventListener("click", function () {
    formContainerEl.classList.add("hidden");
    formContainerEl.classList.remove("visible");
    btnMinus.classList.add("hidden");
    btnMinus.classList.remove("visible");
    btnPlus.classList.remove("hidden");
    btnPlus.classList.add("visible");
    formDrawerEl.style.borderTop = "2px solid springgreen";
  });
};

hideForm();

const capitalize = function (string) {
  if (!string) return;
  const words = string.split(" ");
  let newString = [];
  for (word of words) {
    if (!word[0]) continue;
    newString.push(word[0].toUpperCase() + word.slice(1));
  }
  newString = newString.join(" ");
  return newString;
};

const loadBookDataIntoForm = function (bookId) {
  let bookIndex = findBookIndex(bookId);
  inputTitleEl.value = myLibrary[bookIndex].title;
  inputAuthorEl.value = myLibrary[bookIndex].author;
  inputPagesEl.value = myLibrary[bookIndex].pages;
  inputCategoryEl.value = myLibrary[bookIndex].category;
  myLibrary[bookIndex].completed
    ? (inputCompletedEl.checked = true)
    : (inputCompletedEl.checked = false);
};

const tdClickHandler = function () {
  const tdTitleNodeList = document.querySelectorAll(".td-title");
  const tdAuthorNodeList = document.querySelectorAll(".td-author");
  const tdPagesNodeList = document.querySelectorAll(".td-pages");
  const tdCategoryNodeList = document.querySelectorAll(".td-category");
  const tdNodeLists = [
    tdTitleNodeList,
    tdAuthorNodeList,
    tdPagesNodeList,
    tdCategoryNodeList,
  ];
  const inputFields = [
    inputTitleEl,
    inputAuthorEl,
    inputPagesEl,
    inputCategoryEl,
  ];

  for (
    let tdNodeListIndex = 0;
    tdNodeListIndex < tdNodeLists.length;
    tdNodeListIndex++
  ) {
    tdNodeLists[tdNodeListIndex].forEach((td) =>
      td.addEventListener("click", function () {
        loadBookDataIntoForm(td.parentNode.dataset.bookId);
        showForm(inputFields[tdNodeListIndex]);
        editMode = true;
        editBookId = td.parentNode.dataset.bookId;
      })
    );
  }
};

tdClickHandler();

const showAllBooks = function () {
  btnShowAllBooks.addEventListener("click", function () {
    btnShowAllBooks.classList.add("pressed");
    btnShowReadBooks.classList.remove("pressed");
    btnShowUnreadBooks.classList.remove("pressed");
    filtering = "showAll";
    displayAllBooks();
    loadTableEventHandlers();
  });
};

showAllBooks();

const showReadBooks = function () {
  btnShowReadBooks.addEventListener("click", function () {
    btnShowAllBooks.classList.remove("pressed");
    btnShowReadBooks.classList.add("pressed");
    btnShowUnreadBooks.classList.remove("pressed");
    filtering = "showReadOnly";
    displayAllBooks();
    loadTableEventHandlers();
  });
};

showReadBooks();

const showUnreadBooks = function () {
  btnShowUnreadBooks.addEventListener("click", function () {
    btnShowAllBooks.classList.remove("pressed");
    btnShowReadBooks.classList.remove("pressed");
    btnShowUnreadBooks.classList.add("pressed");
    filtering = "showUnreadOnly";
    displayAllBooks();
    loadTableEventHandlers();
  });
};

showUnreadBooks();

const loadTableEventHandlers = function () {
  removeButtonHandler();
  completedToggleHandler();
  tdClickHandler();
};

const toggleColor = function () {
  h1El.addEventListener("click", function () {
    document.documentElement.className === "springgreen"
      ? (document.documentElement.className = "chartreuse")
      : (document.documentElement.className = "springgreen");
  });
};

toggleColor();
