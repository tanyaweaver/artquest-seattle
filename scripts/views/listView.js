(function(module) {
  var listView = {};

  listView.generateNearMeSection = function() {
    $('#created-list > *').remove();
  };

  listView.getAddress = function(ctx, next){
    ctx.address = $('#address-input').val();
    var distance = $('#distance-input').val();
    if (distance === ''){
      distance = -1;
    }
    ctx.distance = distance;
    var quantity = $('#art-items-qty-input').val();
    if (quantity === '') {
      quantity = -1;
    }
    ctx.quantity = quantity;
    next();
  };

  module.listView = listView;
})(window);
