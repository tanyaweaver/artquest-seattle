(function(module) {
  var listController = {};

  listController.index = function(ctx) {
    // listView.renderList(ctx.locations);
    mapView.renderMap(ctx.locations);
    listView.index();
  };

  listController.loadOneDayChallenge = function(ctx,next) {
    ctx.locations = Locations.locations1;
    next();
  };

  listController.loadTwoDayChallenge = function(ctx,next) {
    ctx.locations = Locations.locations2;
    next();
  };

  listController.loadAllSites = function(ctx,next) {
    ctx.locations = Locations.locations3;
    next();
  };

  listController.loadSitesNearMe = function(ctx,next) {
    ctx.locations = Locations.locations4;
    next();
  };

  module.listController = listController;
})(window);
