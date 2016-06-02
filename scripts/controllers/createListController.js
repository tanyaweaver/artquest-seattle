(function(module) {
  var createListController = {};
  createListController.index = function() {
    console.log('hi');
    $('#new-list').show().siblings().hide();
    onMap.deleteMarkers();
    console.log(onMap.markersArray);
  };
  module.createListController = createListController;
})(window);
