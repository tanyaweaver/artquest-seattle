(function(module) {
  var aboutController = {};
  aboutController.index = function() {
    console.log('about route');
    $('#signIn-nav').toggle(false);
    $('#about').show().siblings().hide();
  };
  module.aboutController = aboutController;
})(window);
