(function(module) {
  var mapView = {};

  mapView.renderMap = function(locations) {
    google.maps.event.trigger(map, 'resize');
    onMap.placeMarkers(locations);
  };

  // mapView.index = function() {
  //   $('#back-to-list').show().siblings().hide();
  //   $('#back-to-list').on('click',listView.index);
  // };

  module.mapView = mapView;
})(window);
