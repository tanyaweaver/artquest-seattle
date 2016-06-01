(function(module) {
  var signinController = {};
  signinController.index = function() {
    $('#register-form').show().siblings().hide();
  };
  module.signinController = signinController;
})(window);
