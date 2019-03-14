
$(document).ready(function(){
    //these will be clickable buttons at top of page
    var topics = ['fall', 'bike', 'skate', 'family', 'dog', 'pool', 'food', 'boat'];

    function buttonArray(){
        $('#buttonsRowAppending').empty();

        for ( var i=0; i < topics.length; i++) {
            // creat the buttons here
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsRowAppending').append(a);
        }
    }
    buttonArray();

// for the buttons
    $(document).on('click', '.expression', function() {

        var fail = $(this).html();
        console.log(fail);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fail + "&api_key=scHFOTlr5QbpLqi7BYJlSZqjewWlg0a8&limit=9&offset=0&rating=PG&lang=en"
        console.log(queryURL);
        $.ajax({url: queryURL,
             method: 'GET'})
             .done(function(response) {
                 var results = response.data;
                $('#giffyView').empty();
                //dumping old gifs then grabbing new data
                for (var i=0; i < results.length; i++) {
                    var imageDiv = $('<div>');
                    var imgView = results[i].images.fixed_height.url;
                    // console.log(imgView);  
                    // once images are showing up we will build the grid for the div.
                    var zapImage = $('<img>').attr("src", 'still').attr('data-animate', imgView).attr('data-still', 'still');
                    zapImage.attr('data-state', 'still');
                    $('#giffyView').prepend(zapImage);
                    zapImage.on('click', 'playGif');
                    
                    // pulling the rating
                        var rating = results[i].rating;
                            // console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#giffyView').prepend(displayRated);
                }
             });

             function playGif() { 
                var state = $(this).attr('data-state');
                console.log(state);
             if ( state == 'still'){
                 $(this).attr('src', $(this).data('animate'));
                 $(this).attr('data-state', 'animate');
             } else {
                 $(this).attr('src', $(this).data('still'));
                 $(this).attr('data-state', 'still');
                }

            } //on click
    })
}); // document ready


