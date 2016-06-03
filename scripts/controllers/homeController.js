(function(module) {
  var homeController = {};

  homeController.index = function() {
    console.log('homecontroller');
    var user = firebase.auth().currentUser;
    if (user === null) {
      console.log('signed out');
      $('#home-page').show().siblings().hide();
    } else {
      console.log('signedIN');
      page('/signedin');

    }
  };
  module.homeController = homeController;
})(window);
