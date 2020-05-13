import { Book, removeBook, addBookToLibrary } from './logic.js';

let myLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));

if(!myLibrary){
myLibrary = [
  new Book(2, 'Game Of Thrones', 'A nice book', 100, false, 'https://m.media-amazon.com/images/I/51GlEGbfXQL._SY346_.jpg'),
  new Book(1, 'The Witcher', 'A nice book', 150, false, 'https://m.media-amazon.com/images/I/51GlEGbfXQL._SY346_.jpg'),
];
window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

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
        <button data-id='${id}' class='update-status' id='status-update'>Change read status</button>
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
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    if (document.querySelector(`#book-${id}`)) {
      document.querySelector(`#book-${id}`).parentElement.removeChild(document.querySelector(`#book-${id}`));
    }
  });
});

Array.from(document.querySelectorAll('.update-status')).map(el => {
  el.addEventListener('click', function (){ 
    const { id } = this.dataset;
    const index = myLibrary.findIndex((ele) => ele.id == id);
    myLibrary[index].read = !myLibrary[index].read;
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    window.location.assign('/');
  });
});

if (document.querySelector('#new-book')) {
  document.querySelector('#new-book').addEventListener('click', (e) => {
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let image = document.querySelector('#image').value;
    let description = document.querySelector('#description').value;
    let author = document.querySelector('#author').value;
    let numPages = document.querySelector('#numpages').value;
    let read = document.querySelector('#read').checked;
    let book = new Book(myLibrary[0].id+1, title, description, numPages, read, image);
    myLibrary = addBookToLibrary(book, myLibrary);
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    window.location.assign('/');
  });
}
