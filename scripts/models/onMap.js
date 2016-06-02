(function(module) {
  var onMap = {};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.618217, lng: -122.351832},
    zoom: 14
  });

  var infoWindow;
  onMap.markersArray = [];

  onMap.setAllMarkersOnMap = function(map) {
    for(var i = 0; i < onMap.markersArray.length; i++) {
      onMap.markersArray[i].setMap(map);
    }
  };

  onMap.deleteMarkers = function() {
    onMap.setAllMarkersOnMap(null);
    onMap.markersArray = [];
  };

  onMap.placeMarkers = function(locationsArray) {
    infoWindow = new google.maps.InfoWindow({map: map});
    var bounds = new google.maps.LatLngBounds();
    var marker;
    var currentLocation = map.getCenter();
    bounds.extend(currentLocation);
    for(var i = 0; i < locationsArray.length; i++) {
      var position = new google.maps.LatLng(locationsArray[i][1], locationsArray[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
      });
      onMap.markersArray.push(marker);

      //each marker has an info window on click, displaying title
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(locationsArray[i][0]);
          infoWindow.open(map, marker);
        };
      })(marker, i));
      onMap.setAllMarkersOnMap(map);
      map.fitBounds(bounds);
    }
  };

  (onMap.showMyGeolocation = function() {
    infoWindow = new google.maps.InfoWindow({map: map});

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(map.getCenter() + 'before setCenter(pos)');
        map.setCenter(pos);
        console.log(map.getCenter() + 'after setCenter(pos)');
        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here');
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      //Browser doesn't support geolocation
      handleLocationError(true, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }
    google.maps.event.addDomListener(window, 'resize', function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
  })();

  module.onMap = onMap;
})(window);
