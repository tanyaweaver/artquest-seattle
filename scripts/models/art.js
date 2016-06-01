(function(module) {
  var artList = {};
  artList.all = [];

  artList.requestList = function(callback) {
    debugger;
    if (artList.all.length === 0 ) {
      $.ajax({
        url: 'https://data.seattle.gov/resource/249z-59hj',
        type: 'GET',
        success: function(data, message, xhr) {
          artList.all = data;
        },
        error: function(xhr, options, error) {
          console.log(xhr.status,error);
        }

      })
      .done(callback);
    }
  };
  module.artList = artList;
})(window);
