

function Book() {
  // the constructor...
}

function removeBook(id, library) {
  const index = library.findIndex((ele) => ele.id == id);
  return [...library.slice(0, index), ...library.slice(index + 1)];
}

function addBookToLibrary(book, library) {
  return [book, ...library];
}

export { removeBook }; 
