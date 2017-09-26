var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request")

var client = new Twitter({
	consumer_key: process.env.lwORqO5ViqU12z68WULSKH8X3,
	consumer_secret: process.env.FQckjqXXYTW8IG0drv3XkdvLGM9ElTRf1fIROOG3lBo58viQdR,
	access_token_key: process.env.dTzD3hPGhE5lj1T7hz8DKL0uSjzMXvR,
	access_token_secret: process.env.b8M4gxQ0DIezvAFVfsarEiraJ1AuHIRFFAGCNyBIeItdu,
});

var spotif = new Spotify({
	id:'3ea388a8cba24d13a4303f23d630822d',
	secret: 'fd2575c1f5e84df5ac65d294c98c3bd1',
});

var action = process.argv[2];

// Switch case statement to define the strings we want
switch (action) {
	case "tweet":
	tweet();
	break;

	case "spotify":
	spotify();
	break;

	case "request":
	request();
	break;
}
// Define functions

function tweet() {

	var input = process.argv

	var twit = "";

	for (var i = 3; i < input.length; i++) {

		twit = twit + " " + input[i];
	}

	console.log("Tweet is" + twit);

	client.post('statuses/update', {status: twit}, function(error, tweet, response) {
		if (error) {
			console.log(error);
		}
		console.log(tweet);
	});
}

function spotify () {
	console.log("Let's find that song.");

	var input = process.argv

	var song = "";

	for (var i = 3; i < input.length; i++) {

		song = song + " " + input[i];
	}

	spotif.search({ type: 'track', query: song }, function(err, data) {
		if ( err ) {
		console.log('Error occurred: ' + err);
		return;
		}
		console.log(data);
    // Do something with 'data' 
});
}

function request () {

	var input = process.argv

	var requests = "";

	for (var i = 3; i < input.length; i++) {

		requests = requests + " " + input[i];
	}


	request .get(requests)
			.on('response', function(response) {
				console.log(response.statusCode) // 200
				console.log(response.headers['content-type']) // 'image/png'
				})
  .pipe(request.put('http://mysite.com/img.png'))
}