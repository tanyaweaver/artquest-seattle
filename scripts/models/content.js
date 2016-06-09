(function(module) {
  var content = {};

  content.about = [];
  content.home = [];

  content.loadContent = function(url) {
    return $.getJSON(url);
  }

  content.loadContent('scripts/models/about.json').done(function(data) {
    content.about = data;
  });
  content.loadContent();
  module.content = content;
})(window);
