(function(module) {
  var pageView = {};
  pageView.createNewQuest = function() {
    console.log('hi');
    $('#new-list').show();
    $('#previous-quests').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
    console.log(onMap.markersArray);
  };

  pageView.showList = function() {
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').show();
  };

  pageView.showAllQuests = function() {
    console.log('inside of the all quests route');
    artquestUser.getUserQuests();
    $('#previous-quests').show();
    $('#new-list').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
  };

  pageView.displayOnRegistrationSignin = function() {
    console.log('inside of the registered route');
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').hide();
  };

  pageView.generateListSection = function (array) {
    var template = Handlebars.compile($('#artlist-template').html());
    $('#created-list > *').remove();
    array.forEach(function(item) {
      $('#created-list').append(template(item));
    });
  };

  pageView.renderMap = function(locations) {
    google.maps.event.trigger(map, 'resize');
    onMap.placeMarkers(locations);
  };

  pageView.clickListeners = function() {
    $('#previous-quests').delegate('li', 'click', function() {
      var i = $('#previous-quests > li').index(this);
      console.log(i);
      listController.loadQuest(Quest.all[i].list);
    });
  };

  module.pageView = pageView;
})(window);
