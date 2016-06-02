function User() {
  this.userID = '';
  this.userEmail = '';
  this.userName = '';
  this.userPassword = '';
  this.userArtList = [];
  this.userQuests = [];
}

var artquestUser = new User();

// var ref = firebase.database();

$('#register-button').on('click', function(e) {
  e.preventDefault();
  console.log('Register Button clicked');
  artquestUser.register();
});

$('#sign-in-button').on('click', function(e) {
  e.preventDefault();
  console.log('sign-in Button clicked');
  artquestUser.signIn();
});

$('#sign-out-button').on('click', function(e) {
  e.preventDefault();
  console.log('sign-Out Button clicked');
  artquestUser.signOut();
});

$('#locate-button').on('click', function(e) {
  e.preventDefault();
  console.log('Locate Button clicked');
  getMyLocation(1000);
  // sitesNearMe(1000);
});

User.prototype.register = function() {
  console.log('Registering a new user');
  this.userName = $('#nameInput').val();
  var email = $('#emailInput').val();
  var password = $('#passwordInput').val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('error ', errorMessage);
  });
};

User.prototype.signIn = function() {
  console.log('user sign in');
  var email = $('#emailInput').val();
  var password = $('#passwordInput').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    //handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('error ', errorMessage);
  });
};

User.prototype.signOut = function () {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('user signed out');
    artList.all = [];
    artquestUser.userArtList = [];
    artquestUser.userID = '';
    artquestUser.userName = '';
    artquestUser.userEmail = '';
  }, function(error) {
    // An error happened.
    console.log('error signing out');
  });
};

User.prototype.loadUserData = function () {
  firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
    if (snapshot.val() != null ) {
      artquestUser.userArtList = snapshot.val().userArtList;
    }
  });
};

var tempList = [];
getFBDataByKey = function(artID) {
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid + '/fbArtList').child(artID).once('value').then(function(snapshot){
    if (snapshot.val() != null ) {
      console.log(snapshot.val());
    }
  });
};

writeFBDataByKey = function(artID, property, value) {
  var myObj = '{' + property + '"' + value + '"}';
  console.log(myObj);
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid + '/fbArtList').child(artID).child(property).set(value);
};

getFBData = function(){
  tempList = [];
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid + '/fbArtList').once('value').then(function(snapshot){
    if (snapshot.val() != null ) {

      for (var key in snapshot.val()) {
      // skip loop if the property is from prototype
        if (!snapshot.val().hasOwnProperty(key)) continue;

        var obj = snapshot.val()[key];
        tempList.push({artID: key, title: obj.title, latitude: obj.latitude, longitude: obj.longitude});
        // for (var prop in obj) {
        //     // skip loop if the property is from prototype
        //   if(!obj.hasOwnProperty(prop)) continue;
        //     // your code
        //     console.log(prop + " = " + obj[prop]);
        // }
      }
      // console.log(snapshot.val());
    }

  });
  // return tempList;
};

User.prototype.getUserData = function () {
  var user = firebase.auth().currentUser;
  var userID = user.uid;
  this.userID = user.uid;
  this.userName = user.displayName;
  this.userEmail = user.email;

  firebase.database().ref('/users/' + user.uid + '/userArtList').once('value').then(function(snapshot) {
    if (snapshot.val() === null ) {
      artList.requestList(function(){
        firebase.database().ref('users/' + user.uid).set({
          userArtList: artList.all, userName: user.displayName
        });
        var myRef = firebase.database().ref('/users/' + user.uid);
        artList.all.forEach(function(item, index, array){
          this.child('fbArtList').push(item);
        }, myRef);
        artquestUser.userArtList = artList.all;
        // page('/new+list');
      });
    } else {
      console.log('user.artList exists in firebase DB');
      // console.log(snapshot.val().userArtList);
      artquestUser.userArtList = snapshot.val();
      // page('/new+list');
    }
  });
};

User.prototype.getUserQuests = function () {
  var user = firebase.auth().currentUser;

  firebase.database().ref('/users/' + user.uid + '/userQuests').once('value').then(function(snapshot) {
    console.log('inside of User.prototype.getUserQuests');
    console.log(snapshot.val());
    if (!snapshot.val()) {
      console.log('no quests in fb');
      Quest.all = [];
    } else {
      console.log('quest list exists in firebase DB');
      Quest.all = snapshot.val();
      if(Quest.all.length !== 0) {
        console.log('Quest.all.length!=0');
        $('#previous-quests > li').remove();
        var template = Handlebars.compile($('#render-existing-quests-from-firebase').html());
        Quest.all.forEach(function(quest) {
          quest.index = Quest.all.indexOf(quest);
          console.log('index of quest ' + quest.index);
          $('#previous-quests').append(template(quest));
        });
        previousQuestsView.clickListeners();
        // for(var i = 0; i < Quest.all.length; i++) {
        //   console.log(Quest.all[i]);
          // $('button').on('click', function() {
            // var template = Handlebars.compile($('#render-lis-for-quest').html());
            // Quest.all[i].list.forEach(function(location) {
            //   $('#list-quest').append(template(location));
            // });
          // });
        // }
      }
    }
  });
};

User.prototype.saveNewQuestToFb = function (allQuestsUpdatedArray) {
  // var user = firebase.auth().currentUser;
  //
  // firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
  //   console.log(snapshot.val().userQuests);
  //   if (!snapshot.val().userQuests) {
  //     console.log('no quests in fb');
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid);
  myRef.child('userQuests').set(allQuestsUpdatedArray);
  // firebase.database().ref('users/' + user.uid).set({
  //   userQuests: allQuestsUpdatedArray
  // });
  //     return Quest.all = [];
  //   } else {
  //     console.log('quest list exists in firebase DB');
  //     // console.log(snapshot.val().userArtList);
  //     return Quest.all = snapshot.val().userQuests;
  //   }
  // });
  console.log('new quest is saved');
  // console.log(snapshot.val().userQuests);
};

distanceBetweenLocations = function (lat1, lon1, lat2, lon2) {
  // console.log(lat1,lon1, lat2,lon2);

  var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2 - lon1).toRadians(), R = 6371e3; // gives d in metres
  var d = Math.acos( Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ) ) * R;
  // console.log('Distance: ', d);
  return d;
};

sitesNearMe = function (distanceFilter) {
  var test = artquestUser.userArtList;
  var nearMe = test.filter(function (current, index, array) {
    if (artquestUser.latitude && artquestUser.longitude ) {
      var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), artquestUser.latitude,artquestUser.longitude);
      if ( distance < distanceFilter){
        // console.log(current.title, current.latitude, current.longitude);
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
    console.log("Geolocation is not supported by this browser.");
  }
};

function locationSuccess(position) {
  console.log('setting user position: ', position.coords);
  artquestUser.latitude = parseFloat(position.coords.latitude);
  artquestUser.longitude = parseFloat(position.coords.longitude);
  var nearbySites = sitesNearMe(500);
  console.log( nearbySites.length, nearbySites);
};

function codeAddress(address) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latlng = results[0].geometry.location;
      console.log(latlng.lat(), latlng.lng());
      return([latlng.lat(), latlng.lng()]);
    } else {
    alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function sitesNearAddress2(distanceFilter, address){
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latlng = results[0].geometry.location;
      console.log(latlng.lat(), latlng.lng());
      var test = artquestUser.userArtList;
      var obj = { latitude: latlng.lat(), longitude: latlng.lng(), distance: distanceFilter};
      var nearMe = test.filter(function (current, index, array) {
        // console.log(this, current);
        if (this.latitude && this.longitude ) {
          var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), parseFloat(this.latitude),parseFloat(this.longitude));
          if ( distance < this.distance){
            console.log(current.title, current.latitude, current.longitude, distance);
            return true;
          } else {
            return false;
          }
        }
      }, obj);
      return nearMe;

    } else {
    alert("Geocode was not successful for the following reason: " + status);
    }
  });

}


function sitesNearAddress(distanceFilter, address) {
  var latlng = codeAddress(address);
  var test = artquestUser.userArtList;
  var obj = { latitude: latlng[0], longitude: latlng[1], distance: distanceFilter};
  var nearMe = test.filter(function (current, index, array) {
    if (this.latitude && this.longitude ) {
      var distance = distanceBetweenLocations(parseFloat(current.latitude), parseFloat(current.longitude), this.latutude,this.longitude);
      if ( distance < this.distance){
        // console.log(current.title, current.latitude, current.longitude);
        return true;
      } else {
        return false;
      }
    }
  }, obj);
  return nearMe;
};


User.prototype.signedIn = function() {
  var user = firebase.auth().currentUser;
  console.log(user.uid + ' signed in');
  if (user != null) {
    if (user.displayName === null){
      if (this.userName != ''){
        user.updateProfile({
          displayName: this.userName,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
          // Update successful.
          artquestUser.getUserData();
        }, function(error) {
          // An error happened.
          console.log('Error updating user name in profile.');
        });
      }
    } else {
      artquestUser.getUserData();
      // artquestUser.getUserQuests();
    }
  }
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('user signed in');
    artquestUser.signedIn();
  } else {
    console.log('no current user signed in');
    // artquestUser.signedOut();
  }
});
