const backgroundColors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentColorIndex = Math.floor(Math.random() * (backgroundColors.length));

function getNewColor() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * (backgroundColors.length));
  } while (randomIndex == currentColorIndex);

  return backgroundColors[randomIndex];
}

$(document).ready(function() {

  $.fn.getNewQuote = function() {
    // https://quotesondesign.com/api-v4-0/
    const apiURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"

    // TODO: Get new quote if quote exceeds a certain amount of character
    // TODO: Create next quote variable that is intialized when first quote is recieved. This way there is no delay when next quote button is clicked
    // TODO: Append quotes in before and after text
    $.ajax( {
      url: apiURL,
      success: function(data) {
        let post = data.shift();
        let text = post.content;
        text = text.replace("<p>", "“");
        text = text.replace("<\/p>\n", "”");
        let author = '— ' + post.title;

        $("#text").html(text);
        $("#author").html(author);

        $('#quote-box').fadeIn();
      },
      cache: false
    });
  };

  $('#new-quote').on('click', function(getNewQuote) {
    $('#quote-box').fadeOut()
    getNewQuote.preventDefault();
    $('#main').animate({backgroundColor: getNewColor()}, 'slow');
    $().getNewQuote();
  });

  $('#main').animate({backgroundColor: backgroundColors[currentColorIndex]}, 'slow');
  $().getNewQuote()
});
