
$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/home/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
                                                    <tr>
                                                        <td>${person.firstName}</td>
                                                        <td>${person.lastName}</td>
                                                        <td>${person.age}</td>
                                                        <td><button class="btn btn-success" data-id="${person.id}" data-first-name="${person.firstName}" data-last-name="${person.lastName}" data-age="${person.age}" id="edit">Edit</button></td>
                                                        <td><button class="btn btn-danger" data-id="${person.id}" id="delete">Delete</button></td>
                                                    </tr>`);
            });
        });
    }

    $("table").on('click', '#edit', function () {
        const id = $(this).data('id');
        const firstName = $(this).data('first-name');
        const lastName = $(this).data('last-name');
        const age = $(this).data('age');
        $("#fname").val(firstName);
        $("#lname").val(lastName);
        $("#a").val(age);
        $("#id").val(id);
        console.log(firstName);
        $("#modal").modal();

        

    });
    $("#save-button").on('click', function () {
        const newFirstName=$(".first-name").val() ;
         const newLastName=$(".last-name").val();
         const  newAge=$(".age").val();
        const id=$(".id").val();
        $.post('/home/edit', { firstName:newFirstName, lastName:newLastName, age:newAge, id:id }, function () {
            $("#modal").modal('hide');
            loadPeople();
        })
    });

    $("table").on('click', '#delete', function () {
        const id = $(this).data('id');
        console.log(id);
        $.post('/home/delete', { id }, function () {
            loadPeople();
        });


    });

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });
})