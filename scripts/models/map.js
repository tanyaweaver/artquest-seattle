(function(module) {
  var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
  ];
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    // center: {lat: 47.618217, lng: -122.351832},
    center: new google.maps.LatLng(-33.92, 151.25),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  google.maps.event.addDomListener(window, 'resize', function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  for(i = 0; i < locations.length; i++) {
    var position = new google.maps.LatLng(locations[i][1], locations[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      // position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      position: position,
      map: map,
      title: locations[i][0]
    });
    //each marker has an info window on click, displaying title
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(locations[i][0]);
        infoWindow.open(map, marker);
      };
    })(marker, i));
    //center the map fitting all markers on the screen
    map.fitBounds(bounds);
  };
  //override our map zoom level once our fitBounds function runs (make sure it only runs once)
  // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
  //   this.setZoom(14);
  //   google.maps.event.removeListener(boundsListener);
  // });
})();
