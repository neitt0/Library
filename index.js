const mainArticles = document.querySelector(".shelves");
const addBookBtn = document.querySelector(".addBookBtn");
const addBookDialog = document.querySelector(".addBookDialog");
const dialogSubmit = document.querySelector(".dialogSubmit");
const dialogCancel = document.querySelector(".dialogCancel");
const dialogForm = document.querySelector(".addBookDialog form");
const shelves = document.querySelector(".shelves");

let delBookBtn;

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

dialogCancel.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close();
});

dialogSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let data = new FormData(document.querySelector(".addBookDialog form"));
  let newBook = new Book();

  for (let [key, value] of data) {
    newBook[key] = value;
  }
  bookList.push(newBook);

  addBookDialog.close();
  dialogForm.reset();
  displayBooks();
});

displayBooks();

const theHobbit = new Book(
  "The Hobbit",
  "J. R. R. Tolkien",
  288,
  false,
  "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_DpWeblab_.jpg"
);
bookList.push(theHobbit);
displayBooks();

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
      if (typeof book[prop] == "function") {
        continue;
      } else if (prop == "imgUrl") {
        let img = document.createElement("img");
        img.src = book[prop];
        tempDiv.appendChild(img);
        continue;
      }

      let p = document.createElement("p");
      p.innerText = book[prop];
      tempDiv.appendChild(p);
    }
    let delBtn = document.createElement("button");
    delBtn.classList.add("deleteBook");
    delBtn.innerText = "delete";
    tempDiv.append(delBtn);

    mainArticles.appendChild(tempDiv);
  }

  delBookBtn = document.querySelectorAll(".deleteBook");
  for (let i = 0; i < delBookBtn.length; i++) {
    delBookBtn[i].addEventListener("click", () => {
      bookList.splice(i, 1);
      delBookBtn[i].parentElement.remove();

      displayBooks();

      console.log(bookList);
      console.log(delBookBtn);
    });
  }
}
