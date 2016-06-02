(function(module) {
  var previousQuestsView = {};
  previousQuestsView.renderQuests = function() {
    console.log('previousQuestsView.renderQuests();');
    // if(Quest.all !== []) {
    //   $('#previous-quests > li').remove();
    //   var template = Handlebars.compile($('render-existing-quests-from-firebase').html());
    //   Quest.all.forEach(function(quest) {
    //     $('#previous-quests').append(template(quest));
    //   });
    // }
  };
  module.previousQuestsView = previousQuestsView;
})(window);
