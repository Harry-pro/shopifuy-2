// custom-cart.js

// Function to update the cart display
function updateCart() {
  $.ajax({
    url: '/cart.js',
    dataType: 'json',
    success: function(cart) {
      $('.cart-items').empty();
      $.each(cart.items, function(index, item) {
        var cartItem = '<div class="cart-item">' +
          '<p>' + item.title + '</p>' +
          '<p>Quantity: ' + item.quantity + '</p>' +
          '<p>Price: ' + Shopify.formatMoney(item.price, "{{ shop.money_format }}") + '</p>' +
          '<button class="remove-item" data-id="' + item.key + '">Remove</button>' +
          '</div>';
        $('.cart-items').append(cartItem);
      });
      $('.cart-total').html('Total: ' + Shopify.formatMoney(cart.total_price, "{{ shop.money_format }}"));
    }
  });
}

// Function to remove an item from the cart
function removeCartItem(itemId) {
  $.ajax({
    type: 'POST',
    url: '/cart/change.js',
    dataType: 'json',
    data: {
      quantity: 0,
      id: itemId
    },
    success: function() {
      updateCart();
    }
  });
}

// Event listener for removing an item
$(document).on('click', '.remove-item', function() {
  var itemId = $(this).data('id');
  removeCartItem(itemId);
});

// Initial cart update when the page loads
$(document).ready(function() {
  updateCart();
});
