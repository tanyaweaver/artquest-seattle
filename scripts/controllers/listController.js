(function(module) {
  var listController = {};

  listController.index = function(ctx) {
    listController.loadQuest(ctx.locations);
    console.log(Quest.all + ' - Quest.all before adding new list');
    var newQuest = new Quest(ctx.createdOn, ctx.typeChallenge, ctx.locations);
    console.log(newQuest);
    Quest.all.push(newQuest);
    console.log(Quest.all + ' - Quest.all after adding new list');
    artquestUser.saveNewQuestToFb(Quest.all);
  };

  listController.loadQuest = function(locations) {
    pageView.showList();
    pageView.generateListSection(locations);
    onMap.deleteMarkers();
    pageView.renderMap(locations);
  };

  listController.loadOneDayChallenge = function(ctx,next) {
    ctx.locations = Locations.getRandomList(10);
    // ctx.locations = Locations.locations1;
    ctx.typeChallenge = '1-Day challenge';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    console.log('new quest created on: ' + ctx.createdOn);
    next();
  };

  listController.loadTwoDayChallenge = function(ctx,next) {
    ctx.locations = Locations.getRandomList(20);
    ctx.typeChallenge = '2-Day challenge';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    console.log('new quest created on: ' + ctx.createdOn);
    next();
  };


  listController.loadNearAddress = function(ctx,next) {
    ctx.locations = Locations.sitesNearAddress(ctx.address, ctx.distance, ctx.quantity);
    ctx.typeChallenge = 'Near Address Quest';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    console.log('new quest created on: ' + ctx.createdOn);
    next();
  };

  listController.loadNearMe = function(ctx,next) {
    ctx.locations = Locations.getRandomList(20);
    ctx.typeChallenge = '2-Day challenge';
    var newDate = new Date();
    var createdOn = (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
    ctx.createdOn = createdOn;
    console.log('new quest created on: ' + ctx.createdOn);
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
