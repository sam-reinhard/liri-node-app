# liri-node-app

## Requirements
* Create a Node.js application that takes a user's input from the command line and outputs relevant data
* Integrate Spotify, OMDB, and BandsInTown via their npm modules
* Read commands and queries from a text file

## Technology
* Node.js
* Moment.js
* JavaScript
* Spotify API (via Spotify NPM module)
* BandsInTown API
* OMDB API

## Code Explanation
* When the user inputs a command and a query, the command is checked to see which function we need to call and the query is plugged into the function to generate the result
* Through the above action, the user can search Spotify for a song, BandsInTown for an artist's upcoming concerts, and OMDB for information about a movie all via npm modules/http requests
* Additionally, the user can input do-what-it-says to have the program read an associated text file and act on the text present

## Images of Functionality
![Spotify and Movie example](/images/spotify-movie.png)
