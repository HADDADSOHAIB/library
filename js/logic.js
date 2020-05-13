/* eslint-disable no-unused-vars, func-names */
function Book(id, title, description, author, numberOfPages, read, image) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
  this.image = image;
}

Book.prototype.updateStatus = function () {
  this.read = !this.read;
};

function removeBook(id, library) {
  const index = library.findIndex((ele) => ele.id === parseInt(id, 10));
  return [...library.slice(0, index), ...library.slice(index + 1)];
}

function addBookToLibrary(book, library) {
  return [book, ...library];
}

/* eslint-enable no-unused-vars, func-names */