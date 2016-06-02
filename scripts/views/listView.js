(function(module) {
  var listView = {};

  $('#use-my-location-button').on('click', function(e) {
    e.preventDefault();
    console.log('use my location Button clicked');
   // artquestUser.register();
  });

  $('#create-near-me-button').on('click', function(e) {
    e.preventDefault();
    console.log('create Button clicked');
   // artquestUser.register();

    artquestUser.sitesNearAddress($('#distance-input').val(),$('#address-input').val(),$('#number-of-art-items-input').val());
  });

  listView.index = function() {
    $('#list-view').show().siblings().hide();
    // $('#see-map').on('click', mapView.index);
    // google.maps.event.addDomListener($('#see-map'), 'click', mapView.index);
  };

  listView.renderList = function(locations) {

  };


  listView.generateListSection = function (array) {
    var template = Handlebars.compile($('#artlist-template').html());
    $('#created-list > *').remove();
    array.forEach(function(item) {
      $('#created-list').append(template(item));
    });
  };

  listView.generateNearMeSection = function() {
    $('#created-list > *').remove();

  };

  module.listView = listView;
})(window);
