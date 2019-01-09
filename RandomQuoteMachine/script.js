const backgroundColors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
                          '#e74c3c', '#9b59b6', '#FB6964', '#342224',
                          "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentColorIndex = Math.floor(Math.random() * (backgroundColors.length));

function getNewColor() {
  let randomIndex = null;

  do {
    randomIndex = Math.floor(Math.random() * (backgroundColors.length));
  } while (randomIndex == currentColorIndex);

  return backgroundColors[randomIndex];
}

$(document).ready(function() {

  $.fn.getNewQuote = function() {
    // https://quotesondesign.com/api-v4-0/
    const apiURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=5"

    $.ajax( {
      url: apiURL,
      success: function(data) {

        let text = null;
        let author = null;

        for (let index = 0; index < data.length; index++) {

          let post = data[index];

          text = post.content;
          text = text.replace("<p>", "“");
          // Check if space is before and remove it3
          text = text.replace("<\/p>\n", "”");

          author = '— ' + post.title;

          let textAndAuthor = text + ' ' + author;

          let twitterSubjectLength = '#Design Quote'.split('').length;
          let twitterCharLimit = 280;
          if ((textAndAuthor.split('').length + twitterSubjectLength) < twitterCharLimit) {
            break;
          }
        }

        $("#text").html(text);
        $("#author").html(author);

        let displayedText = document.querySelector("#text").innerText;
        let displayedAuthor = document.querySelector("#author").innerText;
        let displayedTextAndAuthor = displayedText + ' ' + displayedAuthor;

        let tweetURL = "https://twitter.com/intent/tweet?hashtags=DesignQuotes&text=" + encodeURIComponent(displayedTextAndAuthor);
        $("#tweet-quote").attr("href", tweetURL);

        let mailToURL = "mailto:?subject=Design Quote&body=" + displayedTextAndAuthor;
        $("#email-btn").attr("href", mailToURL);

        $('#quote-box').fadeIn();
      },
      cache: false
    });
  };

  $('#new-quote').on('click', function(getNewQuote) {
    $('#quote-box').fadeOut();
    getNewQuote.preventDefault();
    $('#main').animate({backgroundColor: getNewColor()}, 'slow');
    $().getNewQuote();
  });

  $('#main').animate({backgroundColor: backgroundColors[currentColorIndex]}, 'slow');
  $().getNewQuote()
});
