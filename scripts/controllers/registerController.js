(function(module) {
  var registerController = {};
  registerController.index = function() {
    $('#register-form').show().siblings().hide();
    console.log('register controller');
    console.log(Quest.all);
    artquestUser.getUserQuests();
    console.log(artquestUser.getUserQuests());
    console.log(Quest.all);
    previousQuestsView.renderQuests();
  };
  module.registerController = registerController;
})(window);
