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

User.prototype.getUserData = function () {
  var user = firebase.auth().currentUser;
  var userID = user.uid;
  this.userID = user.uid;
  this.userName = user.displayName;
  this.userEmail = user.email;

  firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
    if (snapshot.val() === null ) {
      artList.requestList(function(){
        firebase.database().ref('users/' + user.uid).set({
          userArtList: artList.all, userName: user.displayName
        });
        artquestUser.userArtList = artList.all;
      });
    } else {
      console.log('user.artList exists in firebase DB');
      // console.log(snapshot.val().userArtList);
      artquestUser.userArtList = snapshot.val().userArtList;
    }
  });
};

User.prototype.getUserQuests = function () {
  var user = firebase.auth().currentUser;

  firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
    console.log('inside of User.prototype.getUserQuests');
    console.log(snapshot.val().userQuests);
    if (!snapshot.val().userQuests) {
      console.log('no quests in fb');
      // firebase.database().ref('users/' + user.uid).set({
      //   userQuests: Quest.all
      // });
      Quest.all = [];
      return Quest.all;
    } else {
      console.log('quest list exists in firebase DB');
      console.log('snapshot.val().userQuests: ' + snapshot.val().userQuests);
      Quest.all = snapshot.val().userQuests;
      console.log(Quest.all);
      console.log('Quest.all after calling getArray ' + Quest.all.length);
      // console.log('Quest.all.length = ' + artquestUser.getUserQuests().length);
      if(Quest.all.length !== 0) {
        console.log('Quest.all.length!=0');
        $('#previous-quests > li').remove();
        var template = Handlebars.compile($('#render-existing-quests-from-firebase').html());
        Quest.all.forEach(function(quest) {
          $('#previous-quests').append(template(quest));
        });
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
  firebase.database().ref('users/' + user.uid).set({
    userQuests: allQuestsUpdatedArray
  });
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

User.prototype.checkInWithCurrentLocation = function (lat1,lon1, lat2,lon2) {
  var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2 - lon1).toRadians(), R = 6371e3; // gives d in metres
  var d = Math.acos( Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ) ) * R;
  console.log('Distance: ', d);
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
