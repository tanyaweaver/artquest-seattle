(function(module) {
  var registerController = {};
  registerController.index = function() {
    $('#register-form').show().siblings().hide();
  };
  module.registerController = registerController;
})(window);
