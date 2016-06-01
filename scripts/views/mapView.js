(function(module) {
  var mapView = {};
  mapView.index = function(locations) {
    $('#map-view').show().siblings().hide();
    Locations.renderMap(locations);
  };

  module.mapView = mapView;
})(window);
