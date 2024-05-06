const mainArticles = document.querySelector(".shelves");

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

const theHobbit = new Book(
  "The Hobbit",
  "J. R. R. Tolkien",
  288,
  false,
  "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_DpWeblab_.jpg"
);
bookList.push(theHobbit);
console.log(bookList);

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

    mainArticles.appendChild(tempDiv);
  }
}

displayBooks();
