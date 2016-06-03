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
        var latlng = results[0].geometry.location;
        var test = artquestUser.userArtList;
        var obj = { latitude: latlng.lat(), longitude: latlng.lng(), distance: ctx.distance};
        var sortedByDistance = test.map( function(current, index, array){
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
          var nearMe = sortedByDistance.filter(function (current, index, array) {
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

  module.Locations = Locations;
  module.tempList = tempList;
})(window);
