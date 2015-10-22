var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.












var songData = [];
    this.getArtist = function(artist) {
    	var defer = $q.defer();
    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    	}).then(function(res){
    		console.log(res);
      for (var i = 0; i < res.data.results.length; i++){
        var songObject = {
          AlbumArt: res.data.results[i].artworkUrl30,
          Artist: res.data.results[i].artistName,
          Song: res.data.results[i].trackName,
          Collection: res.data.results[i].collectionName,
          Price: res.data.results[i].trackPrice,
          CollectionPrice: res.data.results[i].collectionPrice,
          Play: res.data.results[i].previewUrl,
          Type: res.data.results[i].kind
        }
        songData.push(songObject);
      }
      defer.resolve(songData);
    })
    return defer.promise;
    }
    
});
