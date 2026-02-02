const myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = Number(pages)
    this.readStatus = Boolean(readStatus)
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus)
    myLibrary.push(newBook)
}

document.creat