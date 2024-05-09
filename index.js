const mainArticles = document.querySelector(".shelves");
const addBookBtn = document.querySelector(".addBookBtn");
const addBookDialog = document.querySelector(".addBookDialog");
const dialogSubmit = document.querySelector(".dialogSubmit");
const dialogCancel = document.querySelector(".dialogCancel");
const dialogForm = document.querySelector(".addBookDialog form");
const shelves = document.querySelector(".shelves");

let delBookBtn;
let readBookBtn;

// Initialize list
const bookList = [
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    pages: 195,
    readStatus: true,
    imgUrl:
      "https://m.media-amazon.com/images/I/61z7RDG3OIL._AC_UF1000,1000_QL80_.jpg",
  },
];

addBookBtn.addEventListener("click", (e) => {
  addBookDialog.showModal();
});

// Cancel without submitting button
dialogCancel.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close();
});

// Submit button
dialogSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // Get data through FormData
  let data = new FormData(document.querySelector(".addBookDialog form"));
  let newBook = new Book();

  // iterate through FormData using key/value pair
  for (let [key, value] of data) {
    newBook[key] = value;
  }
  bookList.push(newBook);

  addBookDialog.close();
  dialogForm.reset();
  displayBooks();
});

// Initialize book display
displayBooks();

const theHobbit = new Book(
  "The Hobbit",
  "J. R. R. Tolkien",
  288,
  false,
  "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_DpWeblab_.jpg"
);
bookList.push(theHobbit);
// Updates book display
displayBooks();

// Change pages > int and readstatus > bool when working with it
function Book(title, author, pages, readStatus, imgUrl) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.imgUrl = imgUrl;

  this.info = function () {
    return `infos about this book`;
  };
}

function displayBooks() {
  mainArticles.innerHTML = "";
  for (let book of bookList) {
    let tempDiv = document.createElement("div");

    for (let prop in book) {
      // unique props
      if (typeof book[prop] == "function") {
        continue;
      } else if (prop == "imgUrl") {
        let img = document.createElement("img");
        img.src = book[prop];
        tempDiv.appendChild(img);
        continue;
      }

      // everything else goes into p
      let p = document.createElement("p");
      p.innerText = book[prop];
      tempDiv.appendChild(p);
    }
    let delBtn = document.createElement("button");
    delBtn.classList.add("deleteBook");
    delBtn.innerText = "delete";
    tempDiv.append(delBtn);

    let readBtn = document.createElement("button");
    readBtn.classList.add("changeReadStat");
    readBtn.innerText = "read";
    tempDiv.append(readBtn);

    mainArticles.appendChild(tempDiv);
  }

  // Delete and Read book buttons
  delBookBtn = document.querySelectorAll(".deleteBook");
  readBookBtn = document.querySelectorAll(".changeReadStat");
  // Used for i loop to target with the DOM and the main array
  for (let i = 0; i < bookList.length; i++) {
    delBookBtn[i].addEventListener("click", () => {
      bookList.splice(i, 1);
      delBookBtn[i].parentElement.remove();

      // Updates the list so iteration targets the correct element and object properties
      return displayBooks();
    });

    readBookBtn[i].addEventListener("click", () => {
      // Converts string to boolean
      console.log(Boolean(bookList[i].readStatus));
      if (typeof bookList[i].readStatus !== "boolean") {
        bookList[i].readStatus = !bookList[i].readStatus;
      }
      bookList[i].readStatus = !bookList[i].readStatus;

      return displayBooks();
    });
  }
}
