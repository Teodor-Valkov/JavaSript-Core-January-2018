// Cart
controllers.cart = function (context) {
  let userId = sessionStorage.getItem('userId');
  let username = sessionStorage.getItem('username');
  context.username = username;

  requester.get('user', userId, 'kinvey')
    .then((user) => {
      let cart = user.cart;

      if (cart) {
        for (let productId in cart) {
          let product = cart[productId].product;
          product.price = product.price.toFixed(2);
          product.quantity = cart[productId].quantity;
          product.totalPrice = Number(cart[product._id].quantity * product.price).toFixed(2);
        }
      }

      context.cartProductList = Object.values(cart).map(item => item.product);

      this.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          notification: './templates/common/notification.hbs',
          page: './templates/cart/cart.hbs',
          cartProductItem: './templates/cart/cartProductItem.hbs'
        })
        .then(function () {
          this.partial('./templates/main.hbs')
            .then(function () {
              $('button').click((event) => {
                let productId = $(event.target).attr('data-id');
                discardProduct(productId);
              })
            })
        });
    })
    .catch(notification.displayError);

  // Discard Product
  function discardProduct(productId) {
    requester.get('user', userId, 'kinvey')
      .then((user) => {
        let cart = user.cart;

        if (!cart.hasOwnProperty(productId)) {
          notification.showError('Product has already been discarded.');
          context.redirect('#/cart');
          return;
        }

        delete cart[productId];

        requester.update('user', userId, 'kinvey', user)
          .then((user) => {
            notification.showInfo('Product discarded.');
            context.redirect('#/cart');
            // window.location.reload(true);
          })
          .catch(notification.displayError);
      })
      .catch(notification.displayError)
  }
};