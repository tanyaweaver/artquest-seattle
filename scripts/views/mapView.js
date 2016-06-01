(function(module) {
  var mapView = {};

  mapView.renderMap = function(locations) {
    // onMap.showMyGeolocation();
    onMap.resizeMap();
    onMap.placeMarkers(locations);
  };

  mapView.index = function() {
    $('#map-view').show().siblings().hide();
    $('#back-to-list').on('click', listView.index);
  };

  module.mapView = mapView;
})(window);
