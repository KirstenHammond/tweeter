/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* 
Used for setting up createTweetElement

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}; */

//Hardcoded for now until AJAX connetion made
const dataArray = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
      <strong>${tweet.content.text}</strong>
    </main>

    <footer class="tweet-footer">
      <span class="days-ago">${tweet.created_at}</span> 
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i> 
    </footer>

  </article>
  `;
};

const renderTweets = function(tweets) {

  $(document).ready(function () {
    for (let tweet of tweets) {
      $('.log-container').append(createTweetElement(tweet));//Calling createTweetElement against each object in the array and appending the log-container with each html script
    }
  })

}

renderTweets(dataArray); 
