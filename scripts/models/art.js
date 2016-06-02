(function(module) {
  var artList = {};
  artList.all = [];

  artList.requestList = function(callback) {
    if (artList.all.length === 0 ) {
      console.log('Loading data from seattle.gov');
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
