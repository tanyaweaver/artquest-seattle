(function(module) {
  var registerController = {};
  registerController.index = function() {
    $('#register-form').show().siblings().hide();
    console.log('register controller');
    // artquestUser.getUserQuests();
  };
  module.registerController = registerController;
})(window);
