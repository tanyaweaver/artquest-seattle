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
  artList.find = function(title){
    var foundList = artquestUser.userArtList.filter(function(item, index, array){
      if ( item.title.search(title) >= 0){
        return true;
      } else {
        return false;
      }
    },title);
    return foundList;
  };
  module.artList = artList;
})(window);
