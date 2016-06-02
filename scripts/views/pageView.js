(function(module) {
  var pageView = {};
  pageView.createNewQuest = function() {
    console.log('hi');
    $('#new-list').show();
    $('#previous-quests').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
    console.log(onMap.markersArray);
  };

  pageView.showList = function() {
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').show();
  };

  pageView.showAllQuests = function() {
    console.log('inside of the all quests route');
    artquestUser.getUserQuests();
    $('#previous-quests').show();
    $('#new-list').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
  };

  pageView.displayOnRegistrationSignin = function() {
    console.log('inside of the registered route');
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').hide();
  };

  module.pageView = pageView;
})(window);
