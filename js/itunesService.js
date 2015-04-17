var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

  this.getSongs = function(artist) {
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    }).then(function(response) {

      console.log(response.data.results)

      deferred.resolve(response.data.results.map
        (function(item){
          return {
            Play: item.previewUrl,
            Song: item.trackName,
            Artist: item.artistName,
            Collection: item.collectionName,
            AlbumArt: item.artworkUrl100,
            Type: item.kind,
            TrackPrice: item.trackPrice,
            CollectionPrice: item.collectionPrice

          }
        })
      );
      
    })
    return deferred.promise;
  };



});

//hack to get data schema is set to a variable by changeing 'this.getSongs' to 'var getSong', set a console log in logic section set to console.log(response), then call getSong("nellie")
//I doesn't work try to  to comment out 'return deferred.promise'

/* something likd this
  var getSongs = function(artist) {
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    }).then(function(response) {

      console.log(response)

      deferred.resolve()
    } 
    return deferred.promise;
  };

  */


