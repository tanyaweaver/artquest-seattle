(function(module) {
  var homeController = {};
  homeController.index = function() {
    $('#signup-signin').show().siblings().hide();
  };
  module.homeController = homeController;
})(window);
