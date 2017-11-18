var tKeys = require("./keys.js");

console.log("--------------------------");
console.log(tKeys);
console.log("--------------------------");

var userInput = process.argv[2];

var Spotify = require("node-spotify-api");

var request = require("request");

// My-Tweets
switch (userInput) {
    case "my-tweets":
        getTwitter(tKeys);
        break;
    case "spotify-this-song":
        getSpotify();
        break;
    case "movie-this":
        getOMDB();
        break;
    case "do-what-it-says":
        getCommand();
        break;
    default: 

}


  });

function getTwitter(tKeys) {

    var Twitter = require("twitter");

    var client = new Twitter({
        consumer_key: tKeys.consumer_key,
        consumer_secret: tKeys.consumer_secret,
        access_token_key: tKeys.access_token_key,
        access_token_secret: tKeys.access_token_secret
    });

client.get("statuses/user_timeline", function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }

    tweets.forEach(function(t) {
        console.log(t);
    });
};