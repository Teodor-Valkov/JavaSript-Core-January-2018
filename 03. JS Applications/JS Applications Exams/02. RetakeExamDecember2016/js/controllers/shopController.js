// Shop
controllers.shop = function (context) {
  let userId = sessionStorage.getItem('userId');
  let username = sessionStorage.getItem('username');
  context.username = username;

  requester.get('appdata', 'products', 'kinvey')
    .then((products) => {
      for (let product of products) {
        product.price = product.price.toFixed(2);
      }

      context.shopProductList = products;

      this.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          notification: './templates/common/notification.hbs',
          page: './templates/shop/shop.hbs',
          shopProductItem: './templates/shop/shopProductItem.hbs'
        })
        .then(function () {
          this.partial('./templates/main.hbs')
            .then(function () {
              $('button').click((event) => {
                let productId = $(event.target).attr('data-id');
                //purchaseProduct(productId);
                purchaseProductByPromiseAll(productId, userId);
              })
            })
        });
    })
    .catch(notification.displayError);

  // Purchase Product
  function purchaseProduct(productId) {
    requester.get('appdata', `products/${productId}`, 'kinvey')
      .then((product) => {
        requester.get('user', userId, 'kinvey')
          .then((user) => {
            let cart = user.cart;

            if (!cart.hasOwnProperty(productId)) {
              cart[productId] = {
                'quantity': 0,
                'product': product
              };
            }

            cart[productId].quantity++;

            requester.update('user', userId, 'kinvey', user)
              .then((user) => {
                notification.showInfo('Product purchased.');
                context.redirect('#/cart');
              })
              .catch(notification.displayError);
          })
          .catch(notification.displayError)
      })
      .catch(notification.displayError);
  }

  // Purchase Product By Promise All
  function purchaseProductByPromiseAll(productId, userId) {
    let productRequest = requester.get('appdata', `products/${productId}`, 'kinvey');
    let userRequest = requester.get('user', userId, 'kinvey');

    Promise.all([productRequest, userRequest])
      .then(([product, user]) => {
        let cart = user.cart;

        if (!cart.hasOwnProperty(productId)) {
          cart[productId] = {
            'quantity': 0,
            'product': product
          };
        }

        cart[productId].quantity++;

        requester.update('user', userId, 'kinvey', user)
          .then((user) => {
            notification.showInfo('Product purchased.');
            context.redirect('#/cart');
          })
          .catch(notification.displayError);
      })
      .catch(notification.displayError)
  }
}