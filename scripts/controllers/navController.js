(function(module) {
  var navController = {};

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
    console.log(history.state, ctx);
    $('nav ul').show();
    page(history.state);
  };
  navController.menuHide = function() {
    $('#signIn-nav').hide();
    $('nav ul').hide();
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
