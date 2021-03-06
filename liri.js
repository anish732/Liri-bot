//The code will read and set environment variables with dotenv package.
require("dotenv").config();
//This code import the key.js file
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
//Grab the axios package.
var axios = require("axios");
//This code will hadle read  random.txt
var fs = require("fs");
//Grab moment package.
var moment = require("moment");
//  Case  will always be the third node argument.
var action = process.argv[2]
//User input will be split and join index 
var userInput = process.argv.slice(3).join(" ");
// We will then create a switch-case statement.
function switchFunction(){
// The switch-case will direct which function gets run.
switch(action){
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says" :
        whatSays();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
}
}
function movieThis(){
    //If user doesn't pick any movie then will Mr. Nobody 
    if(!userInput){
        userInput = 'Mr.Nobody';
    }
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
//console.log(queryUrl);
axios.get(queryUrl).then(
  function(response) {
    var movieResult = `
         Title of the movie:  ${response.data.Title}
          Release Year:  ${response.data.Year}
          IMDB rating :  ${response.data.imdbRating},
          Rotton tomato rating: ${JSON.stringify(response.data.Ratings[1])},
          Country: : ${response.data.Country},
          Language :   ${response.data.Language},
          Plot :   ${response.data.Plot},
          Actors :  ${response.data.Actors}
        `
       console.log(movieResult);

      //THis code will add all search data in log.txt
      fs.appendFile("log.txt",  movieResult,  function(err){
          if(err){
              console.log(err);
          }
          else{
              console.log("Content added in log.txt!")
          }
      })
  })
  .catch(function(error){
      if (error.response){
          console.log(error.response);
      }else if (error.request){
          console.log(error.request);
      }else{
          console.log("Error",error.message);
      }
      console.log(error.config);
  });
}

function concertThis(){
    //If user doesn't pick any band name then it will display Pup.
    if(!userInput){
        userInput = "Pup"
    }
    var url = "https://rest.bandsintown.com/artists/" +  userInput  + "/events?app_id=codingbootcamp"

    axios.get(url).then(
        function(response){
            var concertResult = `
                Name of the venue is : ${response.data[0].venue.name},
                Venue location : ${response.data[0].venue.city},
                Date of the event is : ${moment(response.data[0].datetime).format("MM/DD/YYYY")},
              `      
            console.log(concertResult);

            //This code will add all search data in log.txt
            fs.appendFile("log.txt", concertResult, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Content added in log.txt!")
                }
            })
        }
    ).catch(function(error){
        console.log("Something went wrong :" + (error.response))
    })
}
function whatSays(){
    //Block of the code will read from random.text
    //The code will save the content of the reading in variable data.
    fs.readFile("random.text", "UTF8", function(err,data){
        if (err){
            console.log(error);
        }
        console.log(data);
        //This will spint the data and give index number to each word.
        var splitData = data.split(",");
        action = splitData[0];
        userInput =splitData[1];
        switchFunction();
    })
}
function spotifyThisSong(){
    //If user doesn't choose any song then it will display The sign.
    if(!userInput){
        userInput = "The Sign";
    }
 var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
spotify.search({ type: 'track', query: userInput }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var songResult = `
    Name of the Artist is :${data.tracks.items[0].artists[0].name};
    The song name: ${data.tracks.items[0].name};
    A preview link of the song from Spotify : ${data.tracks.items[0].external_urls.spotify};
    The album from the song is from: ${data.tracks.items[0].album.name};
  `
   console.log(songResult);
    //This code will add all search data in log.txt
    fs.appendFile("log.txt", songResult , function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Content added in log.txt!")
        }
    })
  });
}
switchFunction();

