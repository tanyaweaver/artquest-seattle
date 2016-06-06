(function(module) {
  var navController = {};

  $(window).resize( function() {
    if ($('#menu-icon').is(':visible') ) {
      $('nav ul').hide();
      $('#menu-icon').removeClass('active');
    } else {
      $('nav ul').show();
    }

  });

  $('#sign-in-button').on('click', function(){
    $('#register-form').hide();
    $('#home-page').show();
    if ($('#sign-in-button').text() === 'Sign In') {
      $('#signIn-nav').toggle('#reveal');
      $('#email-signin').focus();
      if ($('#menu-icon').is(':visible') && $('nav ul').is(':visible')) {
        $('nav ul').hide();
        $('#menu-icon').removeClass('active');
      }
      var email = $('#email-signin').val();
      var password = $('#password-signin').val();
      if( email !== 'email@email.com' && email !== '') {
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
    var $nav_ul = $('nav ul');
    if ($nav_ul.is(':visible') ) {
      $nav_ul.hide();
      $('#menu-icon').removeClass('active');

    }
    else {
      $nav_ul.show();
      $('#menu-icon').addClass('active');
    }
    page(history.state);
  };

  navController.menuHide = function() {
    $('#signIn-nav').hide();
    if ($('#menu-icon').is(':visible')){
      $('nav ul').hide();
      $('#menu-icon').removeClass('active');
    }
  };

  navController.displayAbout = function() {
    navController.menuHide();
    $('#about').show().siblings().hide();
  };

  navController.displayRegister = function() {
    navController.menuHide();
    $('#register-form').show().siblings().hide();
    $('#name-input').focus();
    artquestUser.getUserQuests();
  };

  module.navController = navController;
})(window);
