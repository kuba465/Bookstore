$(function () {
//     showModal('to tylko test');
});

function showModal(msg) {
    //set correct type of modal
    var modal = $('#modalWindow');
    var modalTitle = modal.find('.modal-title');
    var modalBody = modal.find('.modal-body');

    modalTitle.html('UWAGA');
    modalBody.html(msg);

    modal.modal('show');
}

function loadingBooksFromDB() {
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/book",
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        for (var i = 0; i < result.success.length; i++) {
            addBook(result.success[i]);
            addBookToEditSelect(result.success[i]);
        }
        addAuthorToSelectListOfBook('#author_id');
    }).fail(function (err) {
        showModal(err);
    });
}

//function adding book to list
function addBook(newBook) {
    //pamiętaj że tutaj w stringu nie ma apostrofa(') tylko ` żeby można było stworzyć dynamicznego stringa
    var book = `<li class="list-group-item">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span class="bookTitle">${newBook.title} - ${newBook.author.name} ${newBook.author.surname}</span>
                                <button data-id="${newBook.id}" class="btn btn-danger pull-right btn-xs btn-book-remove"><i class="fa fa-trash"></i>
                                    </button>
                                <button data-id="${newBook.id}" class="btn btn-primary pull-right btn-xs btn-book-show-description"><i class="fa fa-info-circle"></i>
                                    </button>
                            </div>
                            <div class="panel-body book-description">${newBook.description}</div>
                        </div>
                    </li>`;
    var list = $('#booksList');
    list.append(book);
}

//function adding book to 'edit book' select list
function addBookToEditSelect(newElement) {
    var edit = $('#bookEditSelect');
    edit.append('<option value="' + newElement.id + '">' + newElement.title + '</option>');
}

//function adding book to 'add' or 'edit' book select list
//parameter is id of select
function addAuthorToSelectListOfBook(listId) {
    var list = $(listId);
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/author",
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        for (var i = 0; i < result.success.length; i++) {
            list.append('<option value="' + result.success[i].id + '">' + result.success[i].name + ' ' + result.success[i].surname + '</option>');
        }
    }).fail(function (err) {
        showModal(err);
    });
}

function addBookToDb(list) {
    var title = list.find('#title');
    var authorId = list.find('#author_id');
    var description = list.find('#description');
    if (title.val().length == 0 || description.val().length == 0) {
        return false;
    }

    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/book",
        data: {
            title: title.val(),
            author_id: authorId.val(),
            description: description.val()
        },
        type: 'POST',
        dataType: 'json'
    }).done(function (result) {
        //add book to list
        addBook(result.success[0]);
        addBookToEditSelect(result.success[0]);
        title.val('');
        authorId.val('');
        description.val('');
    }).fail(function (err) {
        showModal(err);
    });
}

function descriptionOfBookByButtonClick() {
    var bookId = $(this).data('id');
    var divWithDescription = $(this).parent().parent().find('.book-description');
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/book/" + bookId,
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        divWithDescription.text(result.success[0].description).toggle();
    }).fail(function (err) {
        showModal(err);
    });
}

function removeBookFromDbAndList() {
    var bookId = $(this).data('id');
    var bookToDelete = $(this).closest('li');
    var optionInSelectToDelete = $('#bookEditSelect').find('option[value="' + $(this).data('id') + '"]');
    optionInSelectToDelete.remove();
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/book/" + bookId,
        type: 'DELETE'
    }).done(function (result) {
        bookToDelete.remove();
    }).fail(function (err) {
        showModal(err);
    });
}


//function adding author to list
function addAuthor(newAuthor) {
    var author = `<li class="list-group-item">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span class="authorTitle">${newAuthor.name} ${newAuthor.surname}</span>
                                <button data-id="${newAuthor.id}" class="btn btn-danger pull-right btn-xs btn-author-remove"><i class="fa fa-trash"></i>
                                    </button>
                                <button data-id="${newAuthor.id}" class="btn btn-primary pull-right btn-xs btn-author-books"><i class="fa fa-book"></i>
                                    </button>
                            </div>
                            <ul class="authorBooksList"></ul>
                        </div>
                    </li>`;
    var list = $('#authorsList');
    list.append(author);
}

//function adding author to select list
function addAuthorToEditSelect(newElement) {
    var edit = $('#authorEditSelect');
    edit.append('<option value="' + newElement.id + '">' + newElement.name + ' ' + newElement.surname + '</option>');
}

function removeAuthorFromDbAndList() {
    var authorId = $(this).data('id');
    var authorToDelete = $(this).closest('li');
    var optionInSelectToDelete = $('#authorEditSelect').find('option[value="' + $(this).data('id') + '"]');
    optionInSelectToDelete.remove();
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/author/" + authorId,
        type: 'DELETE'
    }).done(function (result) {
        authorToDelete.remove();
    }).fail(function (err) {
        showModal(err);
    });
}

function addAuthorToDb(list) {
    var name = list.find('#name');
    var surname = list.find('#surname');
    if (name.val().length == 0 || surname.val().length == 0) {
        return false;
    }

    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/author",
        data: {
            name: name.val(),
            surname: surname.val()
        },
        type: 'POST',
        dataType: 'json'
    }).done(function (result) {
        //add author to list
        addAuthor(result.success[0]);
        addAuthorToEditSelect(result.success[0]);
        name.val('');
        surname.val('');
    }).fail(function (err) {
        showModal(err);
    });
}

function loadingAuthorsFromDb() {
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/author",
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        for (var i = 0; i < result.success.length; i++) {
            addAuthor(result.success[i]);
            addAuthorToEditSelect(result.success[i]);
        }
    }).fail(function (err) {
        showModal(err);
    });
}

function showAuthorsBookFromButtonClick() {
    var authorId = $(this).data('id');
    var ulWithBooks = $(this).parent().parent().find('.authorBooksList');
    ulWithBooks.text('');
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/author/" + authorId,
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        ulWithBooks.toggle();
        for (var i = 0; i < result.success[0].books.length; i++) {
            ulWithBooks.append(`<li>${result.success[0].books[i].title}</li>`);
        }
    }).fail(function (err) {
        showModal(err);
    });
}