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

function displayBooks() {
    const display = document.querySelector('#library-display');
    display.innerHTML = "";

    myLibrary.forEach((book) =>{ 
        const card = document.createElement('div');
        card.classList.add('book-card');

        const titleElement = document.createElement('h2');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `By: ${book.author}`;

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `${book.pages} pages`;

        const readStatusElement = document.createElement('p');
        readStatusElement.textContent = book.readStatus ? "Read" : "Not Read";

        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(pagesElement);
        card.appendChild(readStatusElement);

        display.appendChild(card);})
}

// 1. Add some test data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

// 2. Run the display function
displayBooks();