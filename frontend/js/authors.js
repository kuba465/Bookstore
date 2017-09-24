$(function () {

    loadingAuthorsFromDb();

    //add author to db
    var addForm = $('#authorAdd');
    addForm.on('submit', function (e) {
        e.preventDefault();
        addAuthorToDb(addForm);
    });

    //remove author from list and db
    var listOfAuthors = $('#authorsList');
    listOfAuthors.on('click', '.btn-author-remove', removeAuthorFromDbAndList);

    //show books of author
    listOfAuthors.on('click', '.btn-author-books', showAuthorsBookFromButtonClick);

    //show and fill form of author edit and edit author
    var select = $('#authorEditSelect');
    select.on('click', $('option'), function () {
        var authorId = $(this).val();
        var editForm = $(this).next('#authorEdit');
        var name = editForm.find('input#name');
        var surname = editForm.find('input#surname');

        //getting author of authorId
        $.ajax({
            url: "http://localhost/Bookstore/rest/rest.php/author/" + authorId,
            type: 'GET',
            dataType: 'json'
        }).done(function (result) {
            editForm.css('display', 'block');
            name.val(result.success[0].name);
            surname.val(result.success[0].surname);
        }).fail(function (err) {
            showModal(err);
        });

        //edit author by change datas
        editForm.on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: "http://localhost/Bookstore/rest/rest.php/author/" + authorId,
                type: 'PATCH',
                data: {
                    name: name.val(),
                    surname: surname.val()
                },
                dataType: 'json'
            }).done(function (result) {
                editForm.css('display', 'none');
                listOfAuthors.find('button[data-id=' + authorId + '].btn-author-remove').prev().text(result.success[0].name + ' ' + result.success[0].surname);
            }).fail(function (xhr, status, err) {
                showModal([xhr, status, err]);
            });
        });
    });

});