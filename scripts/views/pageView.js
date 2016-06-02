(function(module) {
  var createListController = {};
  createListController.createNewQuest = function() {
    console.log('hi');
    $('#new-list').show();
    $('#previous-quests').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
    console.log(onMap.markersArray);
  };

  createListController.showList = function() {
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').show();
  };

  createListController.showAllQuests = function() {
    console.log('inside of the all quests route');
    artquestUser.getUserQuests();
    $('#previous-quests').show();
    $('#new-list').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
  };

  createListController.displayOnRegistrationSignin = function() {
    console.log('inside of the registered route');
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').hide();
  };

  module.createListController = createListController;
})(window);
