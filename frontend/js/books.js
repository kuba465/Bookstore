$(function () {

    //loading books from db
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/book",
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        for (var i = 0; i < result.success.length; i++) {
            addBook(result.success[i]);
            addElementToSelect(result.success[i]);
        }
    }).fail(function (xhr, status, err) {
        showModal(err);
    });

    //show description of book by button click
    var listOfBook = $('#booksList');
    listOfBook.on('click', '.btn-book-show-description', function () {
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
    });

    //add book to db
    var addForm = $('#bookAdd');
    addForm.on('submit', function (e) {
        e.preventDefault();
        var title = addForm.find('#title').val();
        var description = addForm.find('#description').val();
        if (title.length == 0 || description.length == 0) {
            return false;
        }

        $.ajax({
            url: "http://localhost/Bookstore/rest/rest.php/book",
            data: {
                title: title,
                description: description
            },
            type: 'POST',
            dataType: 'json'
        }).done(function (result) {
            //add book to list
            addBook(result.success[0]);
            addElementToSelect(result.success[0]);
        }).fail(function (xhr, status, err) {
            showModal(err);
        })
    });

    //remove book from list and db
    listOfBook.on('click', '.btn-book-remove', function () {
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
    });

    //show and fill form of book edit and edit book
    var select = $('#bookEditSelect');
    select.on('click', $('option'), function () {
        var bookId = $(this).val();
        var editForm = $(this).next('#bookEdit');
        var title = editForm.find('input#title');
        var description = editForm.find('textarea#description');

        //getting book of bookId
        $.ajax({
            url: "http://localhost/Bookstore/rest/rest.php/book/" + bookId,
            type: 'GET',
            dataType: 'json'
        }).done(function (result) {
            editForm.css('display', 'block');
            title.val(result.success[0].title);
            description.val(result.success[0].description);
        }).fail(function (err) {
            showModal(err);
        });

        //edit book by change datas
        editForm.on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: "http://localhost/Bookstore/rest/rest.php/book/" + bookId,
                type: 'PATCH',
                data: {
                    title: title.val(),
                    description: description.val()
                },
                dataType: 'json'
            }).done(function (result) {
                editForm.css('display', 'none');
                listOfBook.find('button[data-id=' + bookId + '].btn-book-remove').prev().text(result.success[0].title);
            }).fail(function (xhr, status, err) {
                showModal([xhr, status, err]);
            });
        });
    });

    //function adding book to list
    function addBook(newBook) {
        //pamiętaj że tutaj w stringu nie ma apostrofa(') tylko ` żeby można było stworzyć dynamicznego stringa
        var book = `<li class="list-group-item">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span class="bookTitle">${newBook.title}</span>
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


    //function adding book to select list
    function addElementToSelect(newElement) {
        var edit = $('#bookEditSelect');
        edit.append('<option value="' + newElement.id + '">' + newElement.title + '</option>');
    }
});