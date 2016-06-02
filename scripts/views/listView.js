(function(module) {
  var listView = {};

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

  }

  module.listView = listView;
})(window);
