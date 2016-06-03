(function(module) {
  var homeController = {};
  homeController.index = function() {
    $('#home-page').show().siblings().hide();
    $('#map-view').show();
  };
  module.homeController = homeController;
})(window);
