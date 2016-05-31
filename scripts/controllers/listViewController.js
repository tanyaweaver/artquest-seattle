(function(module) {
  var listViewController = {};
  listViewController.index = function() {
    $('#list-view').show().siblings().hide();
  };
  module.listViewController = listViewController;
})(window);
