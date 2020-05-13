
function Book(id, title, description, numberOfPages, read, image) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.numberOfPages = numberOfPages;
  this.read = read;
  this.image = image;
}

function removeBook(id, library) {
  const index = library.findIndex((ele) => ele.id == id);
  return [...library.slice(0, index), ...library.slice(index + 1)];
}

function addBookToLibrary(book, library) {
  return [book, ...library];
}

export { Book, removeBook, addBookToLibrary };
