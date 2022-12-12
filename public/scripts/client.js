/*
* Client side Javascript
*/

$(document).ready(function() {

  $('.tweet-submission').on('submit', postTweets);
  loadTweets();

  // Stretch project for scroll button. Missing logic to hide it when clicked.Keeps registering scroll back up and then redisplaying.
  $('.scroll-top-button, .error').hide();
  $('.nav-button, .scroll-top-button').on('click', focusTextArea);

  // Ideally add logic to stop scroll being registered, preventDefault?Conditional?TBC
  $(window).on('scroll', function() {
    $('.scroll-top-button').fadeIn();
  });

  if ($('.new-tweet').is(':visible')) {
    $('#new-tweet-content').focus();
  }

});

//HELPER FUNCTIONS----------------------------------------------------------------------------------------------------------------------------
/**
 * Prevents cross site scripting
 * @param {*} str The content being submitted
 * @returns A string that allows the tweet to be submitted without consequence
 */
let crossSiteScripting = function(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

/**
 * Returns HTML text using key value pairs to populate each individual tweet in the log
 * @param {*} tweet The tweet object
 * @returns HTML text to be inserted into the HTML article
 */
const createTweetElement = function(tweet) {
  return `
  <article>
    <header class ='tweet-header'> 
      <img class ='log-avatar' src='${tweet.user.avatars}'> 
        <span class="log-username">${tweet.user.name}</span> 
        <span class="handle">${tweet.user.handle}</span> 
    </header>
    
    <main class="tweet-content">
      <strong>${crossSiteScripting(tweet.content.text)}</strong>
    </main>

    <footer class="tweet-footer">
      <span class="days-ago">${timeago.format(tweet.created_at)}</span> 
      <i id="log-footer-flags" class="fa-solid fa-flag"></i>
      <i id="log-footer-flags" class="fa-solid fa-retweet"></i>
      <i id="log-footer-flags" class="fa-solid fa-heart"></i> 
    </footer>

  </article>
  `;
};


/**
 * Takes in an array of objects and parses each tweet through the createElement function
 * @param {*} tweets The array of tweet objects
 */
const renderTweets = function(tweets) {
  const $container = $('.log-container');
  $container.empty(); // To empty container so its starting with a fresh slate each time
  for (let tweet of tweets) {
    $container.prepend(createTweetElement(tweet)); // Prepend for reverse order
  }
};


/**
 * Sending tweets to server and blocking redirect
 * @param {*} event In this case, on Click
 */
const postTweets = function(event) {
  event.preventDefault();

  const inputData = $('#new-tweet-content').val();
  if (inputData === "" || inputData === null) {
    $('.error').slideUp('fast');
    $('.error').html(`<strong>You got nothing to say?</strong>`).slideDown('fast');
  } else if (inputData.length > 140) {
    $('.error').slideUp('fast');
    $('.error').html(`<strong>Ok now you're saying too much.</strong>`).slideDown('fast');
  } else {
    $('.error').slideUp('fast');
    const form = $(this).serialize();
    $.post('/tweets', form)
      .then(() => {
        $('#new-tweet-content').val('');
        $('.counter').html('140');
        loadTweets(); // To add the new tweet to the top of the page after clicking submit
      })
      .catch((e) => {
        $('.error').slideUp('fast');
        $('.error').html(`<strong>Server POST Error: ${e}.</strong>`).slideDown('fast');
      });
  }
};

/**
 * loadTweets shows all tweets when home page is loaded. Called in document ready below
 */
const loadTweets = function() {
  $.get('/tweets')
    .then(tweets => {
      renderTweets(tweets); // Accessing and rendering the array of objects to be parsed and displayed
    })
    .catch((e) => {
      $('.error').slideUp('fast');
      $('.error').html(`<strong>Server GET Error: ${e}.</strong>`).slideDown('fast');
    });
};


/**
 * STRETCH -Current bug that hides scroll button once button is clicked. TBC.
 */
const focusTextArea = function() {
  $('#new-tweet-content').focus();
  let position = $('.new-tweet').offset().top;
  let navHeight = $('nav').outerHeight();
  let headerHeight = $('header').outerHeight();
  $('html').animate({
    scrollTop: position - navHeight - headerHeight
  }, '1000');
};





