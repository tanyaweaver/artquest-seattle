(function(module) {
  var Quest = function(createdOn, type, opts) {
    this.type = type;
    this.date = createdOn;
    this.list = opts;
  };
  Quest.all = [];
  Quest.peviousQuests = function () {
    // ourData.sort(function(a,b) {
    //   return(new Date(b.createdOn) - new Date(a.createdOn));
    // });
    return artquestUser.getUserQuests();
    console.log(Quest.all);
    // return Quest.all.push(new Quest(array));
  };
  // Quest.loadAll(Locations.locations1);
  // console.log(Quest.all, Quest.all[0].type, Quest.all[0].list);
  module.Quest = Quest;
})(window);
