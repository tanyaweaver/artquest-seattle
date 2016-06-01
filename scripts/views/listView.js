(function(module) {
  var listView = {};
  listView.index = function(locations) {
    // $('#list-view').show().siblings().hide();
    $('#list-view').show().siblings().hide();
    console.log(locations);
  };

  module.listView = listView;
})(window);
