const NOT_READ_BOOK_ID = "notread";
const FINISHED_READ_BOOK_ID = "readed";
const BOOK_ITEMID = "itemId";

function makeBook(name, writer, years, isFinished) {
    const textTitle = document.createElement("p");
    textTitle.innerText = name;
    textTitle.setAttribute('class', 'bold mt-sm book-name')
    const textWriter = document.createElement("p");
    textWriter.innerText = writer;
    textWriter.classList.add('mt-sm', 'writer-name')
    const textYear = document.createElement("p");
    textYear.classList.add('year');
    textYear.innerText = years;
    textYear.classList.add('bold')

    const icon = document.createElement("span");
    icon.classList.add("iconify", "book-icon", "item-center", "mt-sm");
    icon.setAttribute("data-icon", "bi:book");
    icon.setAttribute("data-inline", "false");

    const container = document.createElement("div");
    container.setAttribute('class', 'box  b-rad-rounded-md text-white text-center')

    container.append(createRemoveButton())
    container.append(textTitle);
    container.append(icon)
    container.append(textWriter);
    container.append(textYear);
    if (isFinished === true) {
        container.classList.add('secondary-color')
        container.append(createUncheckButton());

    } else {
        container.classList.add('primary-color')
        container.append(createCheckButton());
    }

    return container
}

function addBook() {
    const notReadBookList = document.getElementById(NOT_READ_BOOK_ID);
    const finishedBookList = document.getElementById(FINISHED_READ_BOOK_ID);
    const name = document.getElementById('bookname').value;
    const writer = document.getElementById('writer').value;
    const years = document.getElementById('years').value;
    const isFinished = document.getElementById('readcheck').checked;
    const book = makeBook(name, writer, years, isFinished);
    const bookObject = composeBookObject(name, writer, years, isFinished);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    if (isFinished === true) {
        finishedBookList.append(book)
    } else {
        notReadBookList.append(book)
    }
    updateDataToStorage();
    clearForm();
}

function addBookToCompleted(taskElement) {
    const bookTitle = taskElement.querySelector(".box > .book-name").innerText;
    const bookWriter = taskElement.querySelector(".box > .writer-name").innerText;
    const bookYear = taskElement.querySelector(".box > .year").innerText;

    const newBook = makeBook(bookTitle, bookWriter, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = true;
    newBook[BOOK_ITEMID] = book.id;
    const listCompleted = document.getElementById(FINISHED_READ_BOOK_ID);
    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();

}

function addBookToUncompleted(taskElement) {
    const bookTitle = taskElement.querySelector(".box > .book-name").innerText;
    const bookWriter = taskElement.querySelector(".box > .writer-name").innerText;
    const bookYear = taskElement.querySelector(".box > .year").innerText;

    const newBook = makeBook(bookTitle, bookWriter, bookYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = false;
    newBook[BOOK_ITEMID] = book.id;
    const listUncompleted = document.getElementById(NOT_READ_BOOK_ID);
    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();

}

function searchData() {
    const finishedBooksContainer = document.getElementById(FINISHED_READ_BOOK_ID);
    const unfinishBooksContainer = document.getElementById(NOT_READ_BOOK_ID);
    const keywordsearch = document.getElementById('booksearch').value;

    finishedBooksContainer.innerHTML = '';
    unfinishBooksContainer.innerHTML = '';

    const filteredData = books.filter((book) => book.title.toLowerCase().includes(keywordsearch.toLowerCase()));
    filteredData.forEach(data => {
        const bookContainer = makeBook(data.title, data.author, data.year, data.isComplete);
        bookContainer[BOOK_ITEMID] = data.id;
        if (data.isComplete === true) {
            finishedBooksContainer.append(bookContainer);
        } else {
            unfinishBooksContainer.append(bookContainer);
        }
    });
}

function removeBook(taskElement) {
    const deleteconfirm = window.confirm("Apakah kamu yakin ingin mengahapus buku ini?");
    if (deleteconfirm) {
        const container = taskElement.parentElement;

        const bookPosition = findBookIndex(container[BOOK_ITEMID]);

        books.splice(bookPosition, 1)
        container.remove();
        updateDataToStorage();

    }

}

function createButton(buttonTypeClass, text, eventListener) {
    const button = document.createElement("button");
    button.setAttribute('class', buttonTypeClass);
    button.innerHTML = text;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const bookPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    books.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();

}

function createCheckButton() {
    return createButton("secondary-color text-white submit bold b-rad-rounded item-center", "Selesai Dibaca", function (event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function createUncheckButton() {
    return createButton("primary-color text-white submit bold b-rad-rounded item-center", "Selesai Dibaca", function (event) {
        addBookToUncompleted(event.target.parentElement);
    });
}

function createRemoveButton() {
    return createButton("close-icon-container", `<span class="iconify close-icon" data-icon="bi:x" data-inline="false"></span>`, function (event) {
        removeBook(event.currentTarget);
    });
}

function clearForm() {
    document.getElementById('bookname').value = '';
    document.getElementById('writer').value = '';
    document.getElementById('years').value = '';
    document.getElementById('readcheck').checked = false;
}