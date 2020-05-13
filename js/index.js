import { myLibrary } from './logic.js';

const book = ({id, title, description, numberOfPages, read, image}) => `
  <div id='book' class="col mb-4">
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

document.querySelectorAll('.remove-book');

const render = () => {
  myLibrary.map(el => document.querySelector('#shelf').insertAdjacentHTML('afterbegin', book(el)));
};



render();