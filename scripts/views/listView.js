(function(module) {
  var listView = {};

  listView.renderList = function(locations) {

  };

  listView.index = function() {
    $('#list-view').show().siblings().hide();
    $('#see-map').on('click', mapView.index);
  };

  module.listView = listView;
})(window);