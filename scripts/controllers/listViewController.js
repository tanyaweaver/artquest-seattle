(function(module) {
  var listViewController = {};
  listViewController.index = function(ctx, next) {
    listView.index(ctx.locations);
    $('#see-map').on('click', next);
  };

  listViewController.loadOneDayChallenge = function(ctx,next) {
    ctx.locations = Locations.locations1;
    next();
  };

  listViewController.loadTwoDayChallenge = function(ctx,next) {
    ctx.locations = Locations.locations2;
    next();
  };

  listViewController.loadAllSites = function(ctx,next) {
    ctx.locations = Locations.locations3;
    next();
  };

  listViewController.loadSitesNearMe = function(ctx,next) {
    ctx.locations = Locations.locations4;
    next();
  };

  module.listViewController = listViewController;
})(window);
