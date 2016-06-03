(function(module) {
  var homeController = {};

  homeController.index = function() {
    console.log('homecontroller');
    var user = firebase.auth().currentUser;
    if (user === null) {
      console.log('homeController: signed out');
      $('#home-page').show().siblings().hide();
    } else {
      console.log('home controller: signedIN');
      page('/signedin');

    }
  };
  module.homeController = homeController;
})(window);
