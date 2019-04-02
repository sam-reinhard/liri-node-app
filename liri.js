

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotifyKeys);

var command = process.argv[2];
var query = process.argv[3];

//function for calling spotify
function spotifyFunc(){
    if (query === undefined){
        query = "the sign ace of base";
    }

    // write artist(s), the song's name, preview link of the song, and if no song is provided default to "the sign" by ace of bass
    spotify.search({type: 'track', query: query}).then(function(response){
        
        var songInfo = response.tracks.items[0];
        console.log("\n" + songInfo.name);
        console.log(songInfo.artists[0].name);
        console.log(songInfo.album.name);
        console.log(songInfo.preview_url + "\n");
    });
};


//function for calling omdb
function omdb(){
    // if the user doesn't write anything, plug in Mr. Nobody
    if (query === undefined){
        query = "mr+nobody";
    }

    var movieUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

    axios.get(movieUrl).then(function(response){
        // write title, year, imdb rating, rotten tomatoes score, country produced, language, plot, actors
        console.log("\nTitle: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
        console.log("Country Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors + "\n");
    })
};

//function for calling bandsintown
function bandsInTown(){
    var bandUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";

    axios.get(bandUrl).then(function(response){
        //write the name of the venue / venue location / date of the concert for each concert in the object
        for (var i = 0; i < response.data.length; i++){
            console.log("\nVenue Name: " + response.data[i].venue.name);
            if (response.data[i].venue.region){
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            }
            else {
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country); 
            }

            // convert date from object into right format using moment.js
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
            console.log("Date: " + date + "\n");
        }
    })
};

// conditionals for accepting the user command
//put this within a function
function followCommand (){
    if (command==="concert-this"){
        bandsInTown();

    } else if (command==="spotify-this-song"){
        spotifyFunc();

    } else if (command==="movie-this"){
        omdb();

    } else if (command==="do-what-it-says"){
        //function for do what it says
        fs.readFile("random.txt", "utf8", function(error, response){
            if (error) {
                return console.log(error);
            }
    
            var responseArr = response.split(",");
            command = responseArr[0];
            query = responseArr[1];
            followCommand();
            return;  
        })
    }
};

followCommand();