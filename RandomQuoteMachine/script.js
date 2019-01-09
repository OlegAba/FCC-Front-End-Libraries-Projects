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

let quoteData = [];

function getQuoteData() {

  const numberOfQuotes = '5';
  const apiURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=" + numberOfQuotes;

  return $.ajax({
    url: apiURL,
    success: function(data) {
      data.forEach(function(element) {

        let text = element.content;
        text = text.replace("<p>", "“");
        text = text.replace(/ *?<\/p>/, "”");
        console.log(text);

        let author = '— ' + element.title;

        let textAndAuthor = text + ' ' + author;

        let twitterSubjectLength = '#Design Quote'.split('').length;
        let twitterCharLimit = 280;

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

      let currentQuoteData = quoteData.shift();

      let text = currentQuoteData.content;
      let author = currentQuoteData.title;

      $("#text").html(text);
      $("#author").html(author);

      let displayedText = document.querySelector("#text").innerText;
      let displayedAuthor = document.querySelector("#author").innerText;
      let displayedTextAndAuthor = displayedText + ' ' + displayedAuthor;

      let tweetURL = "https://twitter.com/intent/tweet?hashtags=DesignQuotes&text=" + encodeURIComponent(displayedTextAndAuthor);
      $("#tweet-quote").attr("href", tweetURL);

      let mailToURL = "mailto:?subject=Design Quote&body=" + displayedTextAndAuthor;
      $("#email-btn").attr("href", mailToURL);

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
