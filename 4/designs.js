//load the DOM and start
$(function () {

    // add an listener when user clicks on sumbit
    $('#sizePicker').submit(function (e) {
        $('#pixelCanvas').children().remove(); // reset the colors
        e.preventDefault(); //prevent default action to happed when click sumbit
        makeGrid();  // call makeGrid() to draw
    });

    function makeGrid() {
        const col = $('#inputHeight').val(); //get the number of rows
        const row = $('#inputWeight').val(); //get the numbers of columns 
        for (let i = 0; i < col; i++) {
            $('#pixelCanvas').append('<tr></tr>'); // append table row to our table
            // go throw our number of col to draw cells 
            for (let o = 0; o < row; o++) {
                $('tr:last').append('<td></td>'); //get last tr and append td to it
            }
        }
        //make a delegation to each cell
        $('tr').on('click', 'td', function (evt) {
            let color = $('#colorPicker').val(); //get the value of color which selected by the user
            $(evt.target).css("backgroundColor", color); // our current cell we can also use $(this) instead of $(e.target)
        });
    }
});