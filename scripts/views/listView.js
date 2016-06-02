(function(module) {
  var listView = {};

  listView.renderList = function(locations) {

  };

  listView.generateListSection = function (array) {
    var template = Handlebars.compile($('#artlist-template').html());
    $('#created-list > *').remove();
    array.forEach(function(item) {
      $('#created-list').append(template(item));
    })
  }

  listView.index = function() {
    $('#list-view').show().siblings().hide();
    // $('#see-map').on('click', mapView.index);
    // google.maps.event.addDomListener($('#see-map'), 'click', mapView.index);
  };

  module.listView = listView;
})(window);
