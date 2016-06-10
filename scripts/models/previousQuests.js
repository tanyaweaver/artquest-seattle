(function(module) {
  var Quest = function(createdOn, type, opts) {
    this.type = type;
    this.date = createdOn;
    this.list = opts;
  };
  Quest.all = [];
  Quest.peviousQuests = function () {
    return artquestUser.getUserQuests();
  };
  module.Quest = Quest;
})(window);
