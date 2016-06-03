(function(module) {
  var Locations = {};
  var tempList = [];

  Locations.getRandomList = function(questNumber) {
    var randomNumbers = [];
    var randomQuest = [];

    function selector() {
      return Math.floor(Math.random() * artquestUser.userArtList.length);
    }
    while (randomNumbers.length < questNumber) {
      var number = selector();
      if (randomNumbers.indexOf(number) === -1) {
        randomNumbers.push(number);
      }
    }
    randomNumbers.forEach(function(element) {
      randomQuest.push(artquestUser.userArtList[element]);
    });
    return randomQuest;
  };

  Locations.sitesNearAddress = function(ctx, next) {

    var geocoder = new google.maps.Geocoder();
    tempList = [];
    geocoder.geocode( { 'address': ctx.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var nearMe = [];
        var latlng = results[0].geometry.location;
        var obj = { latitude: latlng.lat(), longitude: latlng.lng(), distance: ctx.distance};
        var sortedByDistance = artquestUser.userArtList.map( function(current, index, array){
          var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), parseFloat(this.latitude),parseFloat(this.longitude));
          current.distance = distance;
          return current;
        }, obj).sort(function(a,b){
          return a.distance - b.distance;
        });
        if ( ctx.quantity > 0){
          sortedByDistance.length = ctx.quantity;
        }
        if (ctx.distance > 0) {
          nearMe = sortedByDistance.filter(function (current, index, array) {
            if (this.latitude && this.longitude ) {
              var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), parseFloat(this.latitude),parseFloat(this.longitude));
              if ( distance < this.distance){
                return true;
              } else {
                return false;
              }
            }
          }, obj);
          if (nearMe.length === 0){
            nearMe = sortedByDistance[0];
          }
        }
        ctx.locations = ctx.quantity > 0 && ctx.distance > 0 ? nearMe : sortedByDistance;
        ctx.typeChallenge = ctx.locations.length + ' Near ' + ctx.address;
        var newDate = new Date();
        var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
        ctx.createdOn = createdOn;
        next();

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

    });
  };

  distanceBetweenLocations = function (lat1, lon1, lat2, lon2) {
    // console.log(lat1,lon1, lat2,lon2);
    var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2 - lon1).toRadians(), R = 6371e3; // gives d in metres
    var d = Math.acos( Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ) ) * R;
    return d;

  };

  sitesNearMe = function (distanceFilter) {
    var test = artquestUser.userArtList;
    var nearMe = test.filter(function (current, index, array) {
      if (artquestUser.latitude && artquestUser.longitude ) {
        var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), artquestUser.latitude,artquestUser.longitude);
        if ( distance < distanceFilter){
          return true;
        } else {
          return false;
        }
      }
    }, distanceFilter);
    return nearMe;
  };

  getMyLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  function locationSuccess(position) {
    // console.log('setting user position: ', position.coords);
    artquestUser.latitude = parseFloat(position.coords.latitude);
    artquestUser.longitude = parseFloat(position.coords.longitude);
    var nearbySites = sitesNearMe(500);
    // console.log( nearbySites.length, nearbySites);
  };

  function codeAddress(address) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latlng = results[0].geometry.location;
        console.log(latlng.lat(), latlng.lng());
        return([latlng.lat(), latlng.lng()]);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

  };

  module.Locations = Locations;
  module.tempList = tempList;
})(window);
