//require all of packages and files
var request = require("request")
var twitterKeys = require("./keys.js")
console.log(twitterKeys)
var spotifyKeys = require("./spotifykeys.js")
console.log(spotifyKeys)
var twitter = require("twitter")
var SpotifyWebApi  = require("spotify-web-api-node")
var fs = require("fs")

//Twitter, Spotify, Request
var myTwitter = new twitter(twitterKeys);

function getTweets () {
myTwitter.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      console.log("Twitter Data\n", tweets[0].text);
      for (i=0; i < tweets.length; i++) {
          tweets[i].text
          console.log("\n", tweets[i].created_at)
          console.log(tweets[i].text)
      }
    }
    else {
        console.log("not working")
    }
});
};

//Spotify

var spotifyApi = new SpotifyWebApi(spotifyKeys)

var song = process.argv[3];

function getSpotify (song) {
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant()
        .then(function(data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
        }, function(err) {
            console.log('Something went wrong when retrieving an access token', err);
});

}


//movie-this

//do-what-it-says

//need functions to call for each case

//make case statement for each command

function cases (argument) {
    switch (argument) {
        case "my-tweets": 
        case "-t":
            getTweets(); 
            break;
        case "-s":
            getSpotify()
            console.log("Spotify")
            break;
        default:
            console.log("No Input")
    
    }
}
cases(process.argv[2]);