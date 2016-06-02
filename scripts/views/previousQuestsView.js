(function(module) {
  var previousQuestsView = {};
  previousQuestsView.clickListeners = function() {
    for(var i = 0; i < Quest.all.length; i++) {
      $('button').on('click', function() {
        // var template = Handlebars.compile($('#render-lis-for-quest').html());
        // Quest.all[i].list.forEach(function(location) {
        //   $('#list-quest').append(template(location));
        // });
        onMap.deleteMarkers();
        console.log(Quest.all[i]);
        mapView.renderMap(Quest.all[i].list);
      });
    }
  };
  // previousQuestsView.renderQuests = function(questListArray) {
  //   // $('#previous-quests > li').remove();
  //   // var template = Handlebars.compile($('#render-lis-for-quest').html());
  //   // questListArray.forEach(function(quest) {
  //   //   $('#previous-quests').append(template(quest));
  //   // });
  //   // renderMap(questListArray);
  // };
  module.previousQuestsView = previousQuestsView;
})(window);
