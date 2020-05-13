/* eslint-disable no-undef, func-names */
let myLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));

if (!myLibrary) {
  myLibrary = [
    new Book(2, 'Game Of Thrones', 'A nice book', 'George Martin', 100, false, 'https://m.media-amazon.com/images/I/51GlEGbfXQL._SY346_.jpg'),
    new Book(1, 'The Witcher', 'A nice book', 'The witcher', 150, false, 'https://m.media-amazon.com/images/I/51GlEGbfXQL._SY346_.jpg'),
  ];
  window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

const book = ({
  id, title, description, numberOfPages, read, image, author,
}) => `
  <div id='book-${id}' class="col mb-4">
    <div class="card h-100">
      <img src="${image}" class="card-img-top" alt="image of book">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <div>
          <small>author: ${author}</small>
        </div>
        <div>
          <small>Pages: ${numberOfPages}</small>, <small>${read ? 'Already read' : 'not read yet'}</small>
        </div>
        
        <button data-id='${id}' class='btn btn-block btn-primary update-status' id='status-update'>Change read status</button>
        <button data-id='${id}' class='btn btn-block btn-danger remove-book'>Remove book</button>
      </div>
    </div>
  </div>`;

const render = () => {
  myLibrary.map(el => document.querySelector('#shelf').insertAdjacentHTML('afterbegin', book(el)));
};

if (document.querySelector('#shelf')) {
  render();
}

Array.from(document.querySelectorAll('.remove-book')).map(el => {
  el.addEventListener('click', function () {
    const { id } = this.dataset;
    myLibrary = removeBook(id, myLibrary);
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    if (document.querySelector(`#book-${id}`)) {
      document.querySelector(`#book-${id}`).parentElement.removeChild(document.querySelector(`#book-${id}`));
    }
  });
  return '';
});

Array.from(document.querySelectorAll('.update-status')).map(el => {
  el.addEventListener('click', function () {
    const { id } = this.dataset;
    const index = myLibrary.findIndex((ele) => ele.id === parseInt(id, 10));
    myLibrary[index].read = !myLibrary[index].read;
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    window.location.assign('/');
  });
  return '';
});

if (document.querySelector('#new-book')) {
  document.querySelector('#new-book').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const image = document.querySelector('#image').value;
    const description = document.querySelector('#description').value;
    const author = document.querySelector('#author').value;
    const numPages = document.querySelector('#numpages').value;
    const read = document.querySelector('#read').checked;
    const book = new Book(myLibrary[0].id + 1, title, description, author, numPages, read, image);
    myLibrary = addBookToLibrary(book, myLibrary);
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    window.location.assign('/');
  });
}

/* eslint-enable no-undef, func-names */
