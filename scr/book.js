class Book {
  constructor(book){
    this.id = book.id
    this.title = book.title
    this.description = book.description
    this.img_url = book.img_url
    this.users = book.users
  }

  bookEl(){
    const bookEl = document.createElement('li')
    bookEl.setAttribute("book-id",this.id)
    bookEl.innerHTML = `
      <h2>${this.title}</h2>

    `
    const bookNameEl = bookEl.querySelector('h2')
    bookNameEl.addEventListener('click', this.showBookInfo.bind(this))

    return bookEl
  }

  bookInfoEl(){
    const bookInfoEl = document.createElement('div')
    const userNames = this.getUserList().join(', ')
    bookInfoEl.innerHTML = `
      <h2>${this.title}</h2>
      <img src=${this.img_url}>
      <p>${this.description}</p>
      <h3>Who liked it: ${userNames}</h3>
      <button book-id=${this.id}>${this.checkUserLiked()? "Unlike" : "Like" }</button>
    `
    const likeBtn = bookInfoEl.querySelector('button')
    likeBtn.addEventListener('click',this.likeBook.bind(this))
    return bookInfoEl
  }

  getUserList(){
    const userNames = []
    for (const user of this.users){
      userNames.push(user.username)
    }
    return userNames
  }

  showBookInfo(){
    const showEl = document.querySelector('div#show-panel')
    showEl.innerHTML = ''
    const bookInfoEl = this.bookInfoEl()
    showEl.appendChild(bookInfoEl)
  }

  checkUserLiked(){
    const currentUser = {id: 1, username: "pouros"}
    const exist = this.users.filter((user) => user.id === currentUser.id && user.username === currentUser.username)
    return !!exist.length
  }

  likeBook(){
    const currentUser = {id: 1, username: "pouros"}
    let likedUsers
    if (this.checkUserLiked()) {
      likedUsers = this.users.filter((user) => user.id !== currentUser.id)
    } else {
      likedUsers = this.users.slice()
      likedUsers.push(currentUser)
    }

    const options = {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          users: likedUsers
      })
      }

    const url = BOOKS_URL + '/' + `${this.id}`
    console.log(options.body)

    fetch (url, options)
     .then (res => res.json())
     .then (book => {this.users.splice(0); this.users = [...book.users]})
     .then (() => {this.showBookInfo()})
  }

}


class BookList {
  constructor(){
    this.books = []
    this.bookListEl = document.querySelector('ul#list')
  }

  createBook(book){
    const bookInstance = new Book (book)
    this.bookListEl.appendChild(bookInstance.bookEl())
    this.books.push(bookInstance)
  }

  createBooks(books){
    books.forEach(book => {
      this.createBook(book)
    })
  }
}
