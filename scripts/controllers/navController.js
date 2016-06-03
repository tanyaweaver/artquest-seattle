(function(module) {
  var navController = {};

  navController.displayHome = function() {
    $('#signIn-nav').toggle(false);
    var user = firebase.auth().currentUser;
    if (user === null) {
      $('#home-page').show().siblings().hide();
    } else {
      page('/signedin');

    }
  };

  navController.displayAbout = function() {
    console.log('about route');
    $('#signIn-nav').toggle(false);
    $('#about').show().siblings().hide();
  };

  navController.displayRegister = function() {
    $('#signIn-nav').toggle(false);

    $('#register-form').show().siblings().hide();
    console.log('register controller');
    artquestUser.getUserQuests();
  };

  module.navController = navController;
})(window);
