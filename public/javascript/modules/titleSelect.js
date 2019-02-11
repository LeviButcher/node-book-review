// function to call api with search term provided and return html list of results

function getBooks(term) {
  const resultsReturned = 5;
  if (!term)
    return new Promise((resolve, reject) => {
      reject("No term provided");
    });
  const booksURL = `https://www.googleapis.com/books/v1/volumes?q=${term}+intitle&maxResults=${resultsReturned}&orderBy=relevance`;
  return (
    fetch(booksURL, { method: "GET" })
      .then(res => {
        return res.json();
      })
      // HOT object destructuring
      .then(({ items: books }) => {
        if (!books) return "";
        return books
          .map(book => {
            return `<p>${book.volumeInfo.title}</p>`;
          })
          .join("");
      })
  );
}

// function to set up a on change listener on a element passed in passing in the new value to the api then adding html to the dom
exports.titleSelect = element => {
  console.log(element);
  if (!element) return;
  textChangeListener(element);
  selectTitleListener(element);
};

function textChangeListener(element) {
  element.addEventListener("input", e => {
    const { value } = e.target;
    const bookList = document.querySelector(".book-title-list");
    if (value.length < 4) {
      bookList.innerHTML = "";
      return;
    }
    getBooks(value)
      .then(booksHTML => {
        console.log("hello");
        bookList.innerHTML = booksHTML;
      })
      .catch(msg => {
        console.log(msg);
        bookList.innerHTML = "";
      });
  });
}

// Listen to key down and up event on element
// Add selected class to current p tag
// on enter take selected p tag and add it to input element

function selectTitleListener(element) {
  if (!element) return;
  const [enter, up, down] = [13, 38, 40];
  // -1 to make the first time down is hit easier
  let index = -1;
  element.addEventListener("keydown", e => {
    const bookTitles = document.querySelectorAll(".book-title-list > p");
    const length = bookTitles.length;
    if (!bookTitles) return;
    bookTitles.forEach(titleEle => {
      titleEle.classList.remove("selected-title");
    });
    if (e.keyCode === enter) {
      console.dir(element);
      element.value = bookTitles[index].innerText;
      const bookList = document.querySelector(".book-title-list");
      bookList.innerHTML = "";
    } else if (e.keyCode === down) {
      console.log(index);
      index = (index + 1) % length;
      bookTitles[index].classList.add("selected-title");
    } else if (e.keyCode === up) {
      index--;
      if (index < 0) index = length - 1;
      bookTitles[index].classList.add("selected-title");
    }
  });
}
