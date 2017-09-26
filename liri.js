//require all of packages and files
var request = require("request")
var twitterKeys = require("./keys.js")
console.log(twitterKeys)
var spotifyKeys = require("./spotifykeys.js")
console.log(spotifyKeys)
var twitter = require("twitter")
var SpotifyWebApi  = require("spotify-web-api-node")
var fs = require("fs")

//string input concat
var userInput = "";
if (process.argv.length > 3) {
    for (a=3; a < process.argv.length; a++) {
        userInput += (process.argv[a] + "+")
    }
}

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

var song = userInput;
console.log(song)

function getSpotify (input) {
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant()
        .then(function(data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.searchTracks(input)
                .then(function(data) {
                    console.log("Artist Name: " + data.body.tracks.items[0].artists[0].name, 
                        "\nSong Name: " + data.body.tracks.items[0].name,
                        "\nPreview Link: ", data.body.tracks.items[0].preview_url,
                        "\nAlbum: " + data.body.tracks.items[0].album.name
                )    
        })
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
        }, function(err) {
            console.log('Something went wrong when retrieving an access token', err);
});
}


//need functions to call for each case

//make case statement for each command

function cases (argument) {
    switch (argument) {
        case "my-tweets": 
        case "-t":
            getTweets(); 
            break;
        case "-s":
        case "spotify-this-song":
            getSpotify(song)
            console.log("Spotify")
            break;
        default:
            console.log("No Input")
    
    }
}
cases(process.argv[2]);