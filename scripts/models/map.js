(function(module) {
  var Locations = {};
  // var showAll = document.getElementById('show-all');
  // var useMyGeolocation = document.getElementById('geolocation');

  Locations.locations1 = [
      ['Mcgilvra\'s Farm', 47.635467, -122.277917],
      ['Signs of Life', 47.6851, -122.337583],
      ['Baby Elephant', 47.669067, -122.34845],
  ];

  Locations.locations2 = [
      ['Mcgilvra\'s Farm', 47.635467, -122.277917],
      ['Signs of Life', 47.6851, -122.337583],
      ['Baby Elephant', 47.669067, -122.34845],
      ['In Transition is Unity', 47.705883, -122.322567],
      ['Weather Prophet', 47.70575, -122.291367],
      ['Aureole', 47.7243, -122.348633],

  ];

  Locations.locations3 = [
      ['Mcgilvra\'s Farm', 47.635467, -122.277917],
      ['Signs of Life', 47.6851, -122.337583],
      ['Baby Elephant', 47.669067, -122.34845],
      ['In Transition is Unity', 47.705883, -122.322567],
      ['Weather Prophet', 47.70575, -122.291367],
      ['Aureole', 47.7243, -122.348633],
      ['Fremont Canal Bench Project', 47.649883, -122.314983],
      ['Little Liberty', 47.579383, -122.410633],
      ['East is West', 47.59205, -122.317417],
      ['Homage to Hokusai', 47.6814, -122.32695]
  ];

  Locations.locations4 = [
      ['Mcgilvra\'s Farm', 47.635467, -122.277917],
      ['Signs of Life', 47.6851, -122.337583],
      ['Baby Elephant', 47.669067, -122.34845],
      ['In Transition is Unity', 47.705883, -122.322567],
      ['Weather Prophet', 47.70575, -122.291367],
      ['Aureole', 47.7243, -122.348633],
      ['Fremont Canal Bench Project', 47.649883, -122.314983],
      ['Little Liberty', 47.579383, -122.410633],
      ['East is West', 47.59205, -122.317417],
      ['Homage to Hokusai', 47.6814, -122.32695]
  ];

  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    center: {lat: 47.618217, lng: -122.351832},
    // center: new google.maps.LatLng(-33.92, 151.25),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var infoWindow = new google.maps.InfoWindow({map: map}), marker, i;

  Locations.initiateMap = function() {
    console.log('initiateMap function');
    google.maps.event.addDomListener(window, 'resize', function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
  };

  Locations.placeMarkers = function(locationsArray) {
    console.log('placeMarkers function');
    for(i = 0; i < locationsArray.length; i++) {
      console.log('message for each marker inside for-loop');
      var position = new google.maps.LatLng(locationsArray[i][1], locationsArray[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: locationsArray[i][0]
      });
    //each marker has an info window on click, displaying title
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(locationsArray[i][0]);
          infoWindow.open(map, marker);
        };
      })(marker, i));
    //center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }
  };

  Locations.renderMap = function(locations) {
    Locations.initiateMap();
    Locations.placeMarkers(locations);
  };

  // Locations.oneDayChallenge = function(loations) {
  //   Locations.initiateMap();
  //   Locations.placeMarkers(locations);
  // };
  //
  // Locations.twoDayChallenge = function() {
  //   Locations.initiateMap();
  //   Locations.placeMarkers(locations2);
  // };
  //
  // Locations.allSites = function() {
  //   Locations.initiateMap();
  //   Locations.placeMarkers(locations3);
  //   //override our map zoom level once our fitBounds function runs (make sure it only runs once)
  //   // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
  //   //   this.setZoom(14);
  //   //   google.maps.event.removeListener(boundsListener);
  //   // });
  // };
  //
  // Locations.sitesNearMe = function() {
  //   Locations.initiateMap();
  //   Locations.showMyGeolocation();
  //   Locations.placeMarkers(locations4);
  // };

  //detectiong geolocation on pressing button <Use My Geolocation>
  Locations.showMyGeolocation = function() {
    //override our map zoom level once our fitBounds function runs (make sure it only runs //once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
      this.setZoom(14);
      google.maps.event.removeListener(boundsListener);
    });
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here');
        map.setCenter(pos);
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
  };
  // useMyGeolocation.addEventListener('click', showMyGeolocation);
  // showAll.addEventListener('click', showAllSites);
  module.Locations = Locations;
})(window);
