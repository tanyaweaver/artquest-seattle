(function(module) {
  var Locations = {};
  var tempList = [];

  Locations.getRandomList = function(questNumber) {
    console.log('inside random list function');
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
        // console.log(latlng.lat(), latlng.lng());
        var test = artquestUser.userArtList;
        var obj = { latitude: latlng.lat(), longitude: latlng.lng(), distance: ctx.distance};
        var sortedByDistance = test.map( function(current, index, array){
          var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), parseFloat(this.latitude),parseFloat(this.longitude));
          // console.log(distance);
          current.distance = distance;
          return current;
        }, obj).sort(function(a,b){
          // console.log(a,b);
          return a.distance - b.distance;
        });
        if ( ctx.quantity > 0){
          console.log('truncating');
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
        console.log('new quest created on: ' + ctx.createdOn);
        next();


      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

    });
  };


  Locations.locations1 = [
    {
      title: 'Mcgilvra\'s Farm',
      latitude: 47.635467,
      longitude: -122.277917
    },
    {
      title: 'Signs of Life',
      latitude: 47.6851,
      longitude: -122.337583
    },
    {
      title: 'Baby Elephant',
      latitude: 47.669067,
      longitude: -122.34845
    }
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

  module.Locations = Locations;
  module.tempList = tempList;
})(window);
