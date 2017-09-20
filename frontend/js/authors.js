$(function () {

    //loading authors from db
    $.ajax({
        url: "http://localhost/Bookstore/rest/rest.php/author",
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        for (var i = 0; i < result.success.length; i++) {
            addAuthor(result.success[i]);
            addElementToSelect(result.success[i]);
        }
    }).fail(function (xhr, status, err) {
        showModal(err);
    });

    //add author to db
    var addForm = $('#authorAdd');
    addForm.on('submit', function (e) {
        e.preventDefault();
        var name = addForm.find('#name').val();
        var surname = addForm.find('#surname').val();
        if (name.length == 0 || surname.length == 0) {
            return false;
        }

        $.ajax({
            url: "http://localhost/Bookstore/rest/rest.php/author",
            data: {
                name: name,
                surname: surname
            },
            type: 'POST',
            dataType: 'json'
        }).done(function (result) {
            //add author to list
            addAuthor(result.success[0]);
            addElementToSelect(result.success[0]);
        }).fail(function (err) {
            showModal(err);
        })
    });

    //remove author from list and db
    var listOfAuthors = $('#authorsList');
    listOfAuthors.on('click', '.btn-author-remove', function () {
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
    });

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

    //function adding author to list
    function addAuthor(newAuthor) {
        var author = `<li class="list-group-item">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span class="authorTitle">${newAuthor.name} ${newAuthor.surname}</span>
                                <button data-id="${newAuthor.id}" class="btn btn-danger pull-right btn-xs btn-author-remove"><i class="fa fa-trash"></i>
                                    </button>
                            </div>
                        </div>
                    </li>`;
        var list = $('#authorsList');
        list.append(author);
    }

    //function adding author to select list
    function addElementToSelect(newElement) {
        var edit = $('#authorEditSelect');
        edit.append('<option value="' + newElement.id + '">' + newElement.name + ' ' + newElement.surname + '</option>');
    }
});