(function(module) {
  var listController = {};

  listController.displayAndSaveQuest = function(ctx) {
    listController.displayQuest(ctx.locations);
    var newQuest = new Quest(ctx.createdOn, ctx.typeChallenge, ctx.locations);
    Quest.all.push(newQuest);
    artquestUser.saveNewQuestToFb(Quest.all);
  };

  listController.displayQuest = function(locations) {
    pageView.showList();
    pageView.generateListSection(locations);
    onMap.deleteMarkers();
    pageView.renderMap(locations);
  };

  listController.loadOneDayChallenge = function(ctx,next) {
    ctx.locations = Locations.getRandomList(10);
    ctx.typeChallenge = '1-Day challenge';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    next();
  };

  listController.loadTwoDayChallenge = function(ctx,next) {
    ctx.locations = Locations.getRandomList(20);
    ctx.typeChallenge = '2-Day challenge';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    next();
  };

  listController.loadNearAddress = function(ctx,next) {
    ctx.locations = Locations.sitesNearAddress(ctx.address, ctx.distance, ctx.quantity);
    ctx.typeChallenge = 'Near Address Quest';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    next();
  };

  module.listController = listController;
})(window);
