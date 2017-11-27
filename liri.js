var keys = require("./keys.js");

console.log(keys);
console.log("--------------------------");

var request = require('request');

var Twitter = require("twitter");

var spotify = require("spotify");

var getTwitter = function() {

    var client = new Twitter(keys);

    // console.log(client);

    var params = {screen_name: "Kenny Quinn, Esq."};
            
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
                
        if (!error) {
            for(var i=0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("=================");
            }} else {
                console.log(error);
        }
    });
}

var artistName = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {

    spotify.search({ type: "track", query: songName}, function(err, data) {
        if ( err ) {
            console.log(err);
            return;
        }

        // var songs = data.tracks.items;
        // for(var i=0; i<songs.length; i++) {
        //     console.log[i];
        //     console.log("Artist(s): " + songs[i].artists.map(artistName));
        //     console.log("Song name: " + songs[i].preview_url);
        //     console.log("Album: " + songs[i].album.name);
        //     console.log("=========================")
        // }
        console.log(data); 
    });
}

var getMovie = function(movieName) {
    request("http://www.omdbapi.com/?t=pulp+fiction&y=&plot=short&r=json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tom Score: " + jsonData.tomatoRating);
        } 
        console.log(error);
    })
}

var doCommand = function() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) throw err;
        
        var dataArr = data.split(", ");
        
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            prick(dataArr[0]);
        }
    });
}

var select = function(caseData, functionData) {
    switch(caseData) {
        case "my-tweets":
            getTwitter();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
            break;
        case "do-what-it-says":
            doCommand();
            break;
        default:
            console.log("Liri is not that smart, please try again!");
    }
}

var runThis = function(argOne, argTwo) {
    select(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);