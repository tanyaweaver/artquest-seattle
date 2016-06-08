(function(module) {
  var navController = {};

  navController.displayHome = function() {
    $('#signIn-nav').toggle(false);
    var user = firebase.auth().currentUser;
    if (user === null) {
      $('#home-page').show().siblings().hide();
      $('#home-page-head').show();
    } else {
      page('/signedin');

    }
  };

  navController.displayAbout = function() {
    $('#signIn-nav').toggle(false);
    $('#about').show().siblings().hide();
    pageView.generateAboutSection(content.about);
  };

  navController.displayRegister = function() {
    $('#signIn-nav').toggle(false);
    $('#register-form').show().siblings().hide();
    artquestUser.getUserQuests();
  };

  module.navController = navController;
})(window);
