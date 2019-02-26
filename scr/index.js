const bookList = new BookList ()

fetchBooks()
  .then(books => bookList.createBooks(books))
