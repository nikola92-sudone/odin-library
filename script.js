const myLibrary = [];

function interface() {
    const dialog = document.querySelector('#dialog');
    const openButton = document.querySelector('#add-book-btn'); 
    const closeButton = document.querySelector('#close-button');
    const form = document.querySelector('#book-form');

    openButton.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const readStatus = document.querySelector('#readStatus').checked;

        // Process data
        addBookToLibrary(title, author, pages, readStatus);
        displayBooks();

        // Reset and hide
        form.reset();
        dialog.close();
    });
}

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


interface();
