(function(module) {
  var registerController = {};
  registerController.index = function() {
    $('#register-form').show().siblings().hide();
    console.log('register controller');
    previousQuestsView.renderQuests(artquestUser.getUserQuests);
  };
  module.registerController = registerController;
})(window);
