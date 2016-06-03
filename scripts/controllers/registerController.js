(function(module) {
  var registerController = {};
  registerController.index = function() {
    $('#signIn-nav').toggle(false);

    $('#register-form').show().siblings().hide();
    console.log('register controller');
    artquestUser.getUserQuests();
  };
  module.registerController = registerController;
})(window);
