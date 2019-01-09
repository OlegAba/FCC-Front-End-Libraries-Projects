const backgroundColors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
                          '#e74c3c', '#9b59b6', '#FB6964', '#342224',
                          "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentColorIndex = null;

function getNewColor() {
  let randomIndex = null;

  do {
    randomIndex = Math.floor(Math.random() * (backgroundColors.length));
  } while (randomIndex == currentColorIndex);

  currentColorIndex = randomIndex;

  return backgroundColors[randomIndex];
}

let quoteData = [];

function getQuoteData() {

  const numberOfPosts = '5';
  const apiURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" + numberOfPosts;

  return $.ajax({
    url: apiURL,
    success: function(data) {
      data.forEach(function(element) {

        let text = element.content;
        text = text.replace("<p>", "“");
        text = text.replace(/ *?<\/p>/, "”");

        const author = '— ' + element.title;

        const textAndAuthor = text + ' ' + author;

        const twitterSubjectLength = '#Design Quote'.split('').length;
        const twitterCharLimit = 280;

        if ((textAndAuthor.split('').length + twitterSubjectLength) < twitterCharLimit) {
          element.content = text;
          element.title = author;
          quoteData.push(element);
        }
      });
    },
    error: function(request, status, errorThrown) {
      console.log("API call failed...");
      console.log("Status: " + status);
      console.log("Error: " + errorThrown);
    },
    cache: false
  });
}

$(document).ready(function() {

  $.fn.newQuote = function() {
    $("#quote-box").fadeOut('slow', function() {

      const currentQuoteData = quoteData.shift();

      const text = currentQuoteData.content;
      const author = currentQuoteData.title;

      $("#text").html(text);
      $("#author").html(author);

      const displayedText = document.querySelector("#text").innerText;
      const displayedAuthor = document.querySelector("#author").innerText;
      const displayedTextAndAuthor = displayedText + ' ' + displayedAuthor;

      const tweetURL = "https://twitter.com/intent/tweet?hashtags=DesignQuotes&text=" + encodeURIComponent(displayedTextAndAuthor);
      $("#tweet-quote").attr("href", tweetURL);

      const mailToURL = "mailto:?subject=Design Quote&body=" + displayedTextAndAuthor;
      $("#email-quote").attr("href", mailToURL);

      $('#quote-box').fadeIn('slow');
      $('#main').animate({backgroundColor: getNewColor()}, 'slow');
    });
  }

  $('#new-quote').on('click', function() {
    $().newQuote();

    if (quoteData.length <= 5) {
      getQuoteData();
    }
  });

  getQuoteData().then(() => {
    $().newQuote();
  });

});
