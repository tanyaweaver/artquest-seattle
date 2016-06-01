(function(module) {
  var mapViewController = {};
  mapViewController.index = function(ctx, next) {
    mapView.index(ctx.locations);
  };

  module.mapViewController = mapViewController;
})(window);
