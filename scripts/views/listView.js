(function(module) {
  var listView = {};

  listView.generateNearMeSection = function() {
    $('#created-list > *').remove();
  };

  module.listView = listView;
})(window);
