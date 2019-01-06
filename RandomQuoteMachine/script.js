// https://quotesondesign.com/api-v4-0/


var newQuote = "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice"
var newAuthor = "Gabriel García Márquez"

$(document).ready(function() {

  // $('#new-quote').click(function() {
  //
  //   $('#text').fadeOut();
  //   $('#author').fadeOut();
  //
  //   $('#text').html(newQuote);
  //   $('#author').html(newAuthor);
  //
  //   $('#text').fadeIn();
  //   $('#author').fadeIn();
  //
  // });

  //http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1

  $('#new-quote').on('click', function(e) {
    e.preventDefault();
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      datatype: 'jsonp',
      success: function(data) {
        let post = data.shift(); // The data is an array of posts. Grab the first one.
        let text = post.content;
        text = text.replace("<p>", "");
        text = text.replace("</p>", "");
        let author = post.title;

        $("#text").html(text);
        $("#author").html(author);
      },
      cache: false
    });
  });

});
