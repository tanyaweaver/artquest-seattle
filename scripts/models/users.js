(function (module) {

  var tempList = [];

  function User() {
    this.userID = '';
    this.userEmail = '';
    this.userName = '';
    this.userPassword = '';
    this.userArtList = [];
    this.userQuests = [];
  }

  var artquestUser = new User();

  $('#register-form-button').on('click', function(e) {
    e.preventDefault();
    artquestUser.register();
  });

  $('#sign-out-button').on('click', function(e) {
    e.preventDefault();
    artquestUser.signOut();
  });

  User.prototype.register = function() {
    this.userName = $('#name-input').val();
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('error ', errorMessage);
    });
  };

  User.prototype.signIn = function(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('error ', errorMessage);
    });
  };

  User.prototype.signOut = function () {
    firebase.auth().signOut().then(function() {
      artList.all = [];
      for (var prop in artquestUser) { if (artquestUser.hasOwnProperty(prop)) { artquestUser[prop] = null; } };
      page('/');
    }, function(error) {
      console.log('error signing out');
    });
  };

  User.prototype.saveNewQuestToFb = function (allQuestsUpdatedArray) {
    var user = firebase.auth().currentUser;
    if (user != null ) {
      var myRef = firebase.database().ref('/users/' + user.uid);
      myRef.child('userQuests').set(allQuestsUpdatedArray);
    }
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
          page('/signedin');
        });
      } else {
        artquestUser.userArtList = snapshot.val();
        page('/signedin');
      }
    });
  };

  User.prototype.getUserQuests = function () {
    var user = firebase.auth().currentUser;
    if (user != null) {
      firebase.database().ref('/users/' + user.uid + '/userQuests').once('value').then(function(snapshot) {
        if (!snapshot.val()) {
          Quest.all = [];
        } else {
          Quest.all = snapshot.val();
          if(Quest.all.length !== 0) {
            $('#previous-quests > li').remove();
            var template = Handlebars.compile($('#render-existing-quests-from-firebase').html());
            Quest.all.forEach(function(quest) {
              quest.index = Quest.all.indexOf(quest);
              $('#previous-quests').append(template(quest));
            });
            pageView.clickListeners();
          }
        }
      });
    }
  };

  User.prototype.signedIn = function() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      if (user.displayName === null){
        if (this.userName != ''){
          user.updateProfile({
            displayName: this.userName,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
            $('#sign-in-button').text('Sign Out');
            $('#register-button').hide();

            artquestUser.getUserData();
          }, function(error) {
            console.log('Error updating user name in profile.');
          });
        }
      } else {
        $('#signIn-nav').toggle(false);

        $('#sign-in-button').text('Sign Out');
        $('#register-button').hide();

        artquestUser.getUserData();
      }
    }
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      artquestUser.signedIn();
    } else {
      $('#sign-in-button').text('Sign In');
      $('#register-button').show();
      $('#email-signin').val('');
      $('#password-signin').val('');
    }
  });

  module.artquestUser = artquestUser;

})(window);
