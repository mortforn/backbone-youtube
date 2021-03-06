var VideosCollection = Backbone.Collection.extend({

  model: VideoModel,

  getVideos: function(query) {
    /*set the url for the fetch request to the youtube API endpoint with my API key set up and allow for the query to be a parameter
    passed into the getVideos property to allow for dynamic results each search*/
    this.url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyDnc1FKH9lz6AlgkofR3m62u2gZnpLqUk4&q=${query}`;
    //using the reset property to trigger the reset listener in appView
    this.fetch({ reset: true });
  },

  //override the parse function to access the desired data
  parse: function (response) {
    //use the map array helper function to create an array of objects by looping through the original JSON data
    var result = response.items.map(function(data) {
      return {
        title: data.snippet.title,
        desc: data.snippet.description,
        thumbnail: data.snippet.thumbnails.default.url,
        videoId: data.id.videoId
      }
    })
    return result;
  }
});
