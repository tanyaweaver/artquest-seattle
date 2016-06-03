(function(module) {
  var pageView = {};
  pageView.createNewQuest = function() {
    console.log('hi');
    $('#new-list').show();
    $('#near-me-form').show();
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
    array.forEach(function(item,index) {
      item.index = index;
      $('#created-list').append(template(item));
    });
    pageView.artListClickHandler();
  };

  var gArtListItem = {};
  var gDistanceThreshold = 500;
  var gClickTargetIndex;
  var thereLat;
  var thereLon;

  pageView.artListClickHandler = function() {
    $('#created-list').delegate('input', 'click', function(e) {
      e.preventDefault();

      gClickTargetIndex = $(this).parent('li').index();
      // $(this).prop('checked', false);
      console.log(gClickTargetIndex);
      gArtListItem = $(event.target).data('test');
      thereLat = parseFloat(gArtListItem.latitude);
      thereLon = parseFloat(gArtListItem.longitude);
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var hereLat = parseFloat(position.coords.latitude);
          var hereLon = parseFloat(position.coords.longitude);

          var d = distanceBetweenLocations(hereLat, hereLon, thereLat,thereLon );
          console.log(gDistanceThreshold - d);
          if (d < gDistanceThreshold){
            console.log('close enough', gClickTargetIndex);
            $('#created-list li:eq(' + gClickTargetIndex + ') input').prop('checked', true);
          } else {
            console.log('too far',gClickTargetIndex);
            $('#created-list li:eq(' + gClickTargetIndex + ') input').prop('checked', false);
          }
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }

      // var i = $('#previous-quests > li').index(this);
      // console.log(i);
      // listController.loadQuest(Quest.all[i].list);
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
  module.gClickTargetIndex = gClickTargetIndex;
  module.gArtListItem = gArtListItem;

})(window);
