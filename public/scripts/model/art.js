(function(module) {
  var artList = {};
  artList.all = [];

  artList.requestList = function(callback) {
  $.ajax({
    url: "https://data.seattle.gov/resource/249z-59hj",
    type: 'GET',
    success: function(data, message, xhr) {
      artList.all = data;
    }
  })
  .done(callback);
  }
  module.artList = artList;
})(window);
