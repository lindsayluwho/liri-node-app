//set up all of the packages that are required
var keys = require("./keys.js");
var inquirer = require("inquirer");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

//initial prompt for what the program should do
inquirer.prompt([{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}]).then(function(action) {
    switch (action.action) {
        case "my-tweets":
            //function that completes the action selected;
            myTweets();
            break;

        case "spotify-this-song":
            //function that requests song name or searches for the default;
            spotifyThisSong();
            break;

        case "movie-this":
            //function that scrapes OMDB via request and outputs movie info or default;
            movieThis();
            break;

        case "do-what-it-says":
            //function that reads random.txt and and runs spotifyThisSong for "I Want It That Way";
            doWhatItSays();
            break;
    }

    function myTweets() {
        //grabs the last 20 tweets and displays in terminal
        //doesn't seem to throw errors but isn't printing tweets either ¯\_(ツ)_/¯

        var client = new Twitter({
			    consumer_key: keys.consumer_key,
			    consumer_secret: keys.consumer_secret,
			    access_token_key: keys.access_token_key,
			    access_token_secret: keys.access_token_secret,
				});

        var params = {screen_name: 'lindsay83390941'};
				client.get('statuses/user_timeline', params, function(error, tweets, response) {
				  if (!error) {
				    console.log(tweets);
				  }
				  else if (error){
				  	console.error(err);
				  }
				});
    };

    function spotifyThisSong() {
        //inquirer prompt to ask for which song user wants to look up
        inquirer.prompt([
        	{
        		type: "input",
        		name: "song",
        		message: "Which song would you like to look up?"
        	}]).then(function(request){

        		var spotify = new Spotify({
							  id: "76d05061e1424470979ad305c06c7a28",
							  secret: "57664e1d82de4db78821d9e330481b3d"
							});

        		//Grabs and displays the artist, song, preview link, and album of the specified song. Defaults to "The Sign" by Ace of Base.
        		if (request){
        			var songRequested = request.song;
							spotify.search({ type: 'track', query: songRequested, limit: 1 })
							  .then(function(response) {
							  	console.log(JSON.stringify(response.tracks.items, null, 2));
							   //  var artist = response.tracks.items.album.artists.name;
							  	// var song = response.tracks.items.name;
							  	// var link = response.tracks.href;
							  	// var album = response.tracks.items.album.name;
							   //  console.log(`Artist: ${artist}
							   //  	Song: ${song}
							   //  	Album: ${album}
							   //  	Link: ${link}`);
							  })
							  .catch(function(err) {
							    console.error(err);
							  });
        		}
        		else{
        			var songRequested = "i saw the sign";
        			spotify.search({ type: 'track', query: songRequested, limit: 1 })
							  .then(function(response) {
							  	console.log(JSON.stringify(response.tracks.items, null, 2));
							  	// var artist = response.tracks.items.album.artists.name;
							  	// var song = response.tracks.items.name;
							  	// var link = response.tracks.href;
							  	// var album = response.tracks.items.album.name;
							   //  console.log(`Artist: ${artist}
							   //  	Song: ${song}
							   //  	Album: ${album}
							   //  	Link: ${link}`);
							  })
							  .catch(function(err) {
							    console.error(err);
							  });
        		}
        	});

        

    };

    function movieThis() {
        //inquirer prompt to ask for which movie user wants to look up

        //Displays movie, release year, IMDB rating, Rotten Tomatoes rating, country of production, language, plot, and actors. Defaults to "Mr. Nobody."


    };

    function doWhatItSays() {
        //uses fs to grab the contents of random.txt to go back through the switch conditional and execute the appropriate function

    };
});