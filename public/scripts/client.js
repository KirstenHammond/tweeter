/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let noHack = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//CREATE AND RENDER TWEET ELEMENT------------------------------------------------------------------------------
//Returns HTML text using key value pairs in each individual tweet
const createTweetElement = function (tweet) {
  return `
  <article>
    <header class ='tweet-header'> 
      <img src='${tweet.user.avatars}'> 
        <span class="log-username">${tweet.user.name}</span> 
        <span class="handle">${tweet.user.handle}</span> 
    </header>
    
    <main class="tweet-content">
      <strong>${noHack(tweet.content.text)}</strong>
    </main>

    <footer class="tweet-footer">
      <span class="days-ago">${timeago.format(tweet.created_at)}</span> 
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i> 
    </footer>

  </article>
  `;
};

//Takes in an array of objects and parses each tweet through the createElement function
const renderTweets = function (tweets) {
  $(document).ready(function () {
    $('.log-container').empty(); //to empty container so its starting with a fresh slate each time
    for (let tweet of tweets) {
      $('.log-container').prepend(createTweetElement(tweet));//Calling createTweetElement against each object in the array and appending the log-container with each html script
    }
  })

}


//OVERRIDE SUBMIT FORM USING AJAX-----------------------------------------------------------------

$(document).ready(function () {

  $('.error').hide();
  //Sending tweets to server and blocking redirect
  $('.tweet-submission').submit(function (event) {
    event.preventDefault();

    const inputData = $('#tweet-text').val();
    if (inputData === "" || inputData === null) {
      $('.error').slideUp('fast');
      $('.error').html("Please enter text into the field!").slideDown('fast');
    } else if (inputData.length > 140) {
      $('.error').slideUp('fast');
      $('.error').html("Tweet character limit is 140!").slideDown('fast');
    } else {
      $('.error').slideUp('fast');
      const form = $(this).serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: form,
        success: function () {
          $('#tweet-text').val('');
          loadTweets(); //to add the new tweet to the top of the page after clicking submit
        }
      });
    };
  })

  //Fetching the tweets and rendering them when the page is first loaded. Think of this as seperate to the request above.
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (tweets) {
        renderTweets(tweets);
      })

  }
  loadTweets(); //without this, the home page is blank and then when button is pressed all tweets appear

})
