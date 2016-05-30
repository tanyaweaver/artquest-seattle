(function(module) {
  var mapOptions = {
    center: {lat: 47.618217, lng: -122.351832},
    zoom: 16
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });
})();
