(function(module) {
  var mapViewController = {};
  mapViewController.index = function() {
    $('#map-view').show().siblings().hide();
  };
  module.mapViewController = mapViewController;
})(window);
