$(function () {

    loadingBooksFromDB();

    //show description of book by button click
    var listOfBook = $('#booksList');
    listOfBook.on('click', '.btn-book-show-description', descriptionOfBookByButtonClick);

    //add book to db
    var addForm = $('#bookAdd');
    addForm.on('submit', function (e) {
        e.preventDefault();
        addBookToDb(addForm);
    });

    //remove book from list and db
    listOfBook.on('click', '.btn-book-remove', removeBookFromDbAndList);

    //show and fill form of book edit and edit book
    var select = $('#bookEditSelect');
    var editForm = select.next('#bookEdit');
    var authors = editForm.find('select#author_id_edit');
    var listOfAuthors = addAuthorToSelectListOfBook(authors);
    select.on('click', $('option'), function () {
        var bookId = $(this).val();
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
            console.log(result.success[0].author.id);
            authors.val(listOfAuthors);
//            select.val(result.success[0].author).prop('selected', true);
            //niestety nie umiem sobie poradzić z tym żeby autor automatycznie sam się uzupełniał...
            description.val(result.success[0].description);
        }).fail(function (err) {
            showModal(err);
        });
//        edit book by change datas
        editForm.on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: "http://localhost/Bookstore/rest/rest.php/book/" + bookId,
                type: 'PATCH',
                data: {
                    title: title.val(),
                    author_id: authors.val(),
                    description: description.val()
                },
                dataType: 'json'
            }).done(function (result) {
                editForm.css('display', 'none');
                console.log(result.success);
                listOfBook.find('button[data-id=' + bookId + '].btn-book-remove').prev().text(result.success[0].title + ' - ' + result.success[0].author.name + ' ' + result.success[0].author.surname);
            }).fail(function (xhr, status, err) {
                showModal([xhr, status, err]);
            });
        });
    });
});