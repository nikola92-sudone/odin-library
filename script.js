const myLibrary = [];

// --- 1. THE CONSTRUCTOR ---
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.readStatus = Boolean(readStatus);
    this.id = crypto.randomUUID();
}

// --- 2. THE PROTOTYPE (The "Read" Switch) ---
// This lives on the blueprint so every book can use it
Book.prototype.toggleRead = function() {
    this.readStatus = !this.readStatus;
};

// --- 3. THE DATA LOGIC ---
function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
}

// --- 4. THE UI CONTROLLER ---
function interface() {
    const dialog = document.querySelector('#dialog');
    const openButton = document.querySelector('#add-book-btn'); 
    const closeButton = document.querySelector('#close-button');
    const form = document.querySelector('#book-form');

    openButton.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the page refresh!
        
        // Grab values from the HTML inputs
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const readStatus = document.querySelector('#readStatus').checked;

        addBookToLibrary(title, author, pages, readStatus);
        displayBooks(); // Refresh the screen

        form.reset();
        dialog.close();
    });
}

// --- 5. THE RENDERER ---
function displayBooks() {
    const display = document.querySelector('#library-display');
    display.innerHTML = ""; // Clear the shelf before re-drawing

    myLibrary.forEach((book) => { 
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.setAttribute('data-id', book.id);

        const titleElement = document.createElement('h2');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `By: ${book.author}`;

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `${book.pages} pages`;

        const readStatusElement = document.createElement('p');
        readStatusElement.textContent = book.readStatus ? "Status: Read" : "Status: Not Read";

        // REMOVE BUTTON
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove Book";
        removeButton.addEventListener('click', () => {
            const index = myLibrary.findIndex(item => item.id === book.id);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        // TOGGLE READ BUTTON
        const toggleButton = document.createElement('button');
        toggleButton.textContent = "Change Read Status";
        toggleButton.addEventListener('click', () => {
            book.toggleRead(); // Use the prototype function
            displayBooks();    // Refresh the text on screen
        });

        // Assemble and Append
        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(pagesElement);
        card.appendChild(readStatusElement);
        card.appendChild(toggleButton);
        card.appendChild(removeButton);

        display.appendChild(card);
    });
}

// Initialize the app
interface();