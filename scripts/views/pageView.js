(function(module) {
  var pageView = {};
  pageView.createNewQuest = function() {
    $('#new-list').show();
    $('#near-me-form').show();
    $('#previous-quests').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
  };

  pageView.showList = function() {
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').show();
  };

  pageView.showAllQuests = function() {
    artquestUser.getUserQuests();
    $('#previous-quests').show();
    $('#new-list').hide();
    $('#list-view').hide();
    onMap.deleteMarkers();
  };

  pageView.displayOnRegistrationSignin = function() {
    $('#registered-signedin').show().siblings().hide();
    $('#new-list').hide();
    $('#previous-quests').hide();
    $('#list-view').hide();
  };

  pageView.generateListSection = function (array) {
    var template = Handlebars.compile($('#artlist-template').html());
    $('#created-list > *').remove();
    array.forEach(function(item,index) {
      item.index = index;
      $('#created-list').append(template(item));
    });
    pageView.artListClickHandler();
  };

  var gArtListItem = {};
  var gDistanceThreshold = 50;
  var gClickTargetIndex;
  var thereLat;
  var thereLon;

  pageView.artListClickHandler = function() {
    $('#created-list').delegate('input', 'click', function(e) {
      e.preventDefault();
      console.log('clickhandler');
      gClickTargetIndex = $(this).parent('li').index();
      gArtListItem = $(event.target).data('test');
      thereLat = parseFloat(gArtListItem.latitude);
      thereLon = parseFloat(gArtListItem.longitude);
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var hereLat = parseFloat(position.coords.latitude);
          var hereLon = parseFloat(position.coords.longitude);

          var d = distanceBetweenLocations(hereLat, hereLon, thereLat,thereLon );
          if (d < gDistanceThreshold){
            $('#created-list li:eq(' + gClickTargetIndex + ') input').prop('checked', true);
            var info = $('#created-list li:eq(' + gClickTargetIndex + ') input').data('test');
            var foundItems = artquestUser.userArtList.filter(function(item, index, array){
              var test = item.title === info.title && item.latitude === info.latitude && item.longitude === item.longitude;
              // console.log(item.title, item.latitude, item.longitude, info.title, info.latitude, info.longitude);
              if( test ) {
                console.log(item.title, info.title, 'found at index:', index);
                artquestUser.userArtList[index].completed = {date: new Date(), location:{latitude:info.latitude, longitude: info.longitude}, status: true};
              }
              return test;
            },info);
            console.log('master list', foundItems);
            var foundQuestItems = Quest.all[artquestUser.currentQuestIndex].list.map(function(item,index, array) {
              var test = item.title === info.title && item.latitude === info.latitude && item.longitude === item.longitude;
              if(test){
                console.log('match in quest list @ index:',index);
                Quest.all[artquestUser.currentQuestIndex].list[index].completed = {date: new Date(), location:{latitude:info.latitude, longitude: info.longitude}, status: true};
              }
              return test;
            }, info);
          } else {
            $('#created-list li:eq(' + gClickTargetIndex + ') input').prop('checked', false);
          }
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });
  };

  pageView.renderMap = function(locations) {
    google.maps.event.trigger(map, 'resize');
    onMap.placeMarkers(locations);
  };

  pageView.clickListeners = function() {
    $('#previous-quests').delegate('li', 'click', function() {
      var i = $('#previous-quests > li').index(this);
      artquestUser.currentQuestIndex = i;
      listController.displayQuest(Quest.all[i].list);
    });
  };


  module.pageView = pageView;
  module.gClickTargetIndex = gClickTargetIndex;
  module.gArtListItem = gArtListItem;

})(window);
