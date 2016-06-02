(function(module) {
  var previousQuestsView = {};
  previousQuestsView.renderQuests = function(getArray) {
    getArray();
    debugger;
    console.log('Quest.all after calling getArray ' + Quest.all.length);
    // console.log('Quest.all.length = ' + artquestUser.getUserQuests().length);
    if(Quest.all.length !== 0) {
      console.log('Quest.all.length!=0');
      $('#previous-quests > li').remove();
      var template = Handlebars.compile($('#render-existing-quests-from-firebase').html());
      Quest.all.forEach(function(quest) {
        $('#previous-quests').append(template(quest));
      });
    }
    console.log('end of render function');
  };
  module.previousQuestsView = previousQuestsView;
})(window);
