/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Ensuring strings that are passed into textarea are not harmful

let noHack = function (str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

//CREATE AND RENDER TWEET ELEMENT------------------------------------------------------------------------------
//Returns HTML text using key value pairs in each individual tweet
const createTweetElement = function (tweet) {
  return `
  <article>
    <header class ='tweet-header'> 
      <img class ='log-avatar' src='${tweet.user.avatars}'> 
        <span class="log-username">${tweet.user.name}</span> 
        <span class="handle">${tweet.user.handle}</span> 
    </header>
    
    <main class="tweet-content">
      <strong>${noHack(tweet.content.text)}</strong>
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

// Takes in an array of objects and parses each tweet through the createElement function
const renderTweets = function (tweets) {
  $(document).ready(function () {
    $('.log-container').empty(); // To empty container so its starting with a fresh slate each time
    for (let tweet of tweets) {
      $('.log-container').prepend(createTweetElement(tweet)); // Prepend for reverse order
    }
  })

}

// Moved this function to be global in an attempt to solve bug that hides scroll button once button is clicked. TBC. 
const focusTextArea = function () {
  $('#new-tweet-content').focus();
  let position = $('.new-tweet').offset().top;
  let navHeight = $('nav').outerHeight();
  let headerHeight = $('header').outerHeight();
  $('html').animate({
    scrollTop: position - navHeight - headerHeight
  }, '1000');
}

//OVERRIDE SUBMIT FORM USING AJAX-----------------------------------------------------------------

$(document).ready(function () {

  // Stretch project for scroll button. Missing logic to hide it when clicked.Keeps registering scroll back up and then redisplaying.
  $('.scroll-top-button').hide();

  $(window).scroll(function () {
    $('.scroll-top-button').fadeIn();
  })

  $('.nav-button, .scroll-top-button').click(function () {
    focusTextArea();
    // Ideally add logic to stop scroll being registered, preventDefault?Conditional?TBC
  })


  $('.error').hide();

  // Sending tweets to server and blocking redirect
  $('.tweet-submission').submit(function (event) {
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
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: form,
        success: function () {
          $('#new-tweet-content').val(''); // Resetting the textarea to clear entered text after submission
          loadTweets(); // To add the new tweet to the top of the page after clicking submit
        }
      });
    };
  })

  // Fetching the tweets and rendering them when the page is first loaded. Think of this as seperate to the request above.
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (tweets) {
        renderTweets(tweets); // Accessing and rendering the array of objects to be parsed and displayed
      })

  }

  loadTweets(); // Without this, the home page is blank and then when submit button is pressed all tweets appear at once

})
