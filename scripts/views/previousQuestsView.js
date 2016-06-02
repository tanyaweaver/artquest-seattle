(function(module) {
  var previousQuestsView = {};
  previousQuestsView.clickListeners = function() {
    $('#previous-quests').delegate('li', 'click', function() {
      var i = $('#previous-quests > li').index(this);
      console.log(i);
      mapView.renderMap(Quest.all[i].list);
      var template = Handlebars.compile($('#render-list-for-quest').html());
      console.log(Quest.all[i].list);
      Quest.all[i].list.forEach(function(location) {
        $('#list-quest').append(template(location));
      });
    });
  };
  module.previousQuestsView = previousQuestsView;
})(window);
