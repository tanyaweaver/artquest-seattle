function User() {
  this.userID = '';
  this.userEmail = '';
  this.userPassword = '';
  this.userArtList = [];
  this.userQuests = [];
}

var artquestUser = new User();

// var ref = firebase.database();

$('#register').on('click', function() {
  console.log('Register Button clicked');
  artquestUser.register();
  // debugger;
});

$('#sign-in-button').on('click', function() {
  console.log('sign-in Button clicked');
  userSignIn();
});

$('#sign-out-button').on('click', function() {
  console.log('sign-Out Button clicked');
  artquestUser.signOut();
});


User.prototype.register = function() {
  // debugger;
  console.log('Registering a new user');
  var email = $('#emailInput').val();
  var password = $('#passwordInput').val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('error ', errorMessage);
    // debugger;
  });
  // debugger;
};


userSignIn = function() {
  console.log('user sign in');
  var email = $('#emailInput').val();
  var password = $('#passwordInput').val();
  var test = firebase.auth().signInWithEmailAndPassword(email, password);
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
    debugger;
  });
};

User.prototype.signOut = function () {
  // debugger;
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('user signed out');
    artList.all = [];
    artquestUser.userArtList = [];
    artquestUser.userID = '';
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
  var userID = firebase.auth().currentUser.uid;
  firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
    if (snapshot.val() === null ) {
      artList.requestList(function(){
        firebase.database().ref('users/' + userID).set({
          userArtList: artList.all
        });
        debugger;
        artquestUser.userArtList = artList.all;
      });
    } else {
      console.log('user.artList exists in firebase DB');
      // console.log(snapshot.val().userArtList);
      artquestUser.userArtList = snapshot.val().userArtList;
    }
  });
};

User.prototype.signedIn = function() {

  var user = firebase.auth().currentUser;
  console.log(user.uid + ' signed in');
  if (user != null) {
    this.name = user.displayName;
    this.userID = user.uid;
    this.getUserData();
  }
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('user signed in');
    artquestUser.signedIn();
  } else {
    console.log('no current user signed in');
    // user.signedOut();
  }
});
