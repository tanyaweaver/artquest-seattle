(function(module) {
  var homeController = {};
  homeController.index = function() {
    $('#home-page').show().siblings().hide();
  };
  module.homeController = homeController;
})(window);
