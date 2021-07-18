document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("addbook");
    const searchBook = document.getElementById("searchform");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });
    searchBook.addEventListener("submit", function (event) {
        event.preventDefault();
        searchData();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();

});