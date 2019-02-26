const BOOKS_URL = "http://localhost:3000/books"
const USERS_URL = "http://localhost:3000/users"

function fetchBooks(){
  return fetch(BOOKS_URL)
    .then (res => res.json())
}

function fetchUsers(){
  return fetch(USERS_URL)
    .then (res => res.json())
}

function fetchBook(id){
  const url = BOOKS_URL + '/' + `${id}`
  return fetch(url)
    .then (res => res.json())
}

function fetchUser(id){
  const url = USERS_URL + '/' + `${id}`
  return fetch(url)
    .then (res => res.json())
}
