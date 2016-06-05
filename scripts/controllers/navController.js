(function(module) {
  var navController = {};

  $('#sign-in-button').on('click', function(){
    $('#register-form').hide();
    $('#home-page').show();
    if ($('#sign-in-button').text() === 'Sign In') {
      $('#signIn-nav').toggle('#reveal');
      if ($('#menu-icon').is(':visible') ) {
        $('nav ul').hide();
      }
      var email = $('#email-signin').val();
      var password = $('#password-signin').val();
      if(email !== 'email@email.com') {
        artquestUser.signIn($('#email-signin').val(), $('#password-signin').val());
      };
    } else if ($('#sign-in-button').text() === 'Sign Out') {
      navController.menuHide();
      artquestUser.signOut();
    }
  });

  navController.displayHome = function() {
    navController.menuHide();
    var user = firebase.auth().currentUser;
    if (user === null) {
      $('#home-page').show().siblings().hide();
    } else {
      page('/signedin');
    }
  };

  navController.menuShow = function(ctx) {
    $('#signIn-nav').hide();
    if ($('nav ul').is(':visible') ) {
      $('nav ul').hide();
    }
    else {
      $('nav ul').show();
    }
    page(history.state);
  };

  navController.menuHide = function() {
    $('#signIn-nav').hide();
    if ($('#menu-icon').is(':visible')){
      $('nav ul').hide();
    }
  };

  navController.displayAbout = function() {
    navController.menuHide();
    $('#about').show().siblings().hide();
  };

  navController.displayRegister = function() {
    navController.menuHide();
    $('#register-form').show().siblings().hide();
    artquestUser.getUserQuests();
  };

  module.navController = navController;
})(window);
