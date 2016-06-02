(function(module) {
  var mapView = {};

  mapView.renderMap = function(locations) {
    google.maps.event.trigger(map, 'resize');
    // onMap.showMyGeolocation();
    onMap.placeMarkers(locations);
    // onMap.resizeMap();
  };

  // mapView.index = function() {
  //   $('#back-to-list').show().siblings().hide();
  //   $('#back-to-list').on('click',listView.index);
  // };

  module.mapView = mapView;
})(window);
