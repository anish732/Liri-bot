## Liri Bot


#### Technologies used:

* node.js

![liri.png](liri.png)

#### Code:
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

#### Installation:

* axios
* moment
* node-spotify-api
* dotenv

