(function(module) {
  var createListController = {};
  createListController.index = function() {
    console.log('hi');
    $('#new-list').show().siblings().hide();
    onMap.deleteMarkers();
    console.log(onMap.markersArray);
  };

  createListController.displayOnRegistrationSignin = function(ctx) {
    $('#registered-signedin').show().siblings().hide();
    artquestUser.getUserQuests();
  };

  module.createListController = createListController;
})(window);
