import { Book, removeBook, addBookToLibrary } from './logic.js';

// let newLibrary = [...myLibrary];
let myLibrary = [
  new Book(1, 'Game Of Thrones', 'A nice book', 100, false, 'https://m.media-amazon.com/images/I/51GlEGbfXQL._SY346_.jpg'),
  new Book(2, 'The Witcher', 'A nice book', 150, false, 'https://m.media-amazon.com/images/I/51GlEGbfXQL._SY346_.jpg'),
];
//--------------

const book = ({
  id, title, description, numberOfPages, read, image
}) => `
  <div id='book-${id}' class="col mb-4">
    <div class="card h-100">
      <img src="${image}" class="card-img-top" alt="image of book">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <small>Pages: ${numberOfPages}</small>
        <small>${read ? 'Already read' : 'not read yet'}</small>
        <button>Change read status</button>
        <button data-id='${id}' class='remove-book'>Remove book</button>
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
    if (document.querySelector(`#book-${id}`)) {
      document.querySelector(`#book-${id}`).parentElement.removeChild(document.querySelector(`#book-${id}`));
    }
  });
});

if (document.querySelector('#new-book')) {
  document.querySelector('#new-book').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
  });
}
