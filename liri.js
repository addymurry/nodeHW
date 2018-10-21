
require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var moment = require('moment');
var fs = require('fs');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var type = process.argv[3];
function movie_this() {

    var movie = type;

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "";

    if (queryUrl === "http://www.omdbapi.com/?apikey=trilogy&t=") {
        queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody";
    }

    request(queryUrl, function (err, response,data ) {


        if (err) {
            console.log('error:', err);
            console.log('statusCode:', response);
        }
        
        console.log("Title: " + JSON.parse(data).Title);
        console.log("Released: " + JSON.parse(data).Year);
        console.log("Rating: " + JSON.parse(data).Ratings);
        console.log("Countries where the movie was made: " + JSON.parse(data).Country);
        console.log("Language: " + JSON.parse(data).Language);
        console.log("Plot: " + JSON.parse(data).Plot);
        console.log("Actors: " + JSON.parse(data).Actors);


        fs.appendFile("log.txt",JSON.parse.Year,JSON.parse.Ratings,JSON.parse.Country,JSON.parse.Language,JSON.parse.Plot,JSON.parse.Actors, function (err) {
            if (err) {
                return console.log(err);
            }
        });

    })
}
function spotify_this() {

  
    var songName = type

    
    if (songName == "") {


        spotify.search({ type: 'track', query: "No Problem", limit: 1 }, function (err, data) {


            if (err) {
                console.log('Error: ' + err);
            }

            var artist = data.tracks.items[""].album.artists[""].name
            var title = data.tracks.items[""].name
            var link = data.tracks.items[""].album.external_urls.spotify
            var album = data.tracks.items[""].album.name

            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)
        });
    }

    else {
        spotify.search({ type: 'track', query: songName,}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
            }
            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            var album = data.tracks.items[0].album.name
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)

            fs.appendFile("log.txt", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
}





function go() {
    switch (command) {
        
        case "search_this_song":
            spotify_this();
            break;

        case "movie_this":
            movie_this();
            break;
    }
}
go();