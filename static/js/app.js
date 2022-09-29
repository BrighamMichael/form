let row_id_counter = 0;

let add_blank_row = function(e){
    row_id_counter = row_id_counter + 1;
    $( ".upload-body" ).append( `
        <tr class="data-row">
            <form method="GET" id="form` + row_id_counter + `" data-id="form` + row_id_counter + `"></form>
            <td class='name'>
                <input type="text" name="row_name" form="form` + row_id_counter + `" placeholder='insert random name' />
            </td>
            <td class='file'>
                <input class='file-input' type="text" name="row_file" form="form` + row_id_counter + `" placeholder='upload file' />
                <span class="file-button-container"><button class="upload-button"><i class="fa-solid fa-file-arrow-up"></i></button></span>
            </td>
            <td class='time'>
                <input type="number" name="row_name" form="form` + row_id_counter + `" placeholder='hours'/>
            </td>
            <td class='replicate'>
                <input type="number" name="row_name" form="form` + row_id_counter + `" placeholder='replicate' />
            </td>
            <td class='description'>
                <input type="text" name="row_name" form="form` + row_id_counter + `" placeholder='insert description' />
            </td>
            <td class='remove'>
                <button class='remove-button'><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
            ` );
        /*alert("form" + row_id_counter)*/
  };

$(".upload-table").on("click", "tfoot > tr > th", add_blank_row)

let num_rows = $('.data-row').length

$(".upload-table").on("click", ".remove-button", function() {
    $(this).closest(".data-row").remove();
    num_rows = $('.data-row').length

    if (num_rows < 1) {
        add_blank_row()
    }
        
});

let check_file_input = function(e){
    if ($(this).val().length > 0) {
        $(this).closest('td').children('.file-button-container').children().remove();
        $(this).closest('td').children('.file-button-container').append('<button class="clear-button"><i class="fa-solid fa-circle-xmark"></i></button>');
    } else {
        $(this).closest('td').children('.file-button-container').children().remove();
        $(this).closest('td').children('.file-button-container').append('<button class="upload-button"><i class="fa-solid fa-file-arrow-up"></i></button>');
    }
}

$(".upload-table").on("click", ".clear-button", function(e) {
    $(this).closest('td').find('input').val('');
    $(this).replaceWith('<button class="upload-button"><i class="fa-solid fa-file-arrow-up"></i></button>')
});

$(".upload-table").on('change', ".file-input", check_file_input)

$("tfoot > tr > th").hover(function() {
    $(this).css("background-color", "#1e5069");
}, function() {
    $(this).css("background-color", "#173D50");
});

$(".sub-container").on("click", ".reset", function(e) {
    $('.data-row').each(function(idx){
        $(this).remove()
    });
    num_rows = $('.data-row').length
    if (num_rows < 1) {
        add_blank_row()
    }
});        

$(".sub-container").on("click", ".submit", function(e) {
    let valid_form = true;
    let data_rows = new Array();
    $('.data-row').each(function(idx){
        data_rows[idx] = $(this).find('form').attr('id')
    });

    let form_collection_results = new Array();

    for (var idx = 0; idx < data_rows.length; idx++) {
        let current_row = data_rows[idx]
        let x = $('#'+current_row).serializeArray();

        let current_form_results = new Array()
        $.each(x, function(idx, field){
            current_form_results[idx] = (field.name + ":" + field.value + " ");
            if (field.value == '') {
                valid_form = false;
            };
        });

        form_collection_results[idx] = current_form_results;
    }

    if (valid_form == true) {
        alert(form_collection_results)
    } else {
        alert('Empty fields!')
    }
    
});

    

/*
$("button").click(function(){
  var x = $("form").serializeArray();
  $.each(x, function(i, field){
    $("#results").append(field.name + ":" + field.value + " ");
  });
});
*/