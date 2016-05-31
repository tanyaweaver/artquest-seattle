(function(module) {
  var createListController = {};
  createListController.index = function() {
    $('#new-list').show().siblings().hide();
  };
  module.createListController = createListController;
})(window);
