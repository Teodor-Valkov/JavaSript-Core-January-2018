const controllers = {};

$(() => {
  const app = Sammy('#app', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('index.html', controllers.home);
    this.get('#', controllers.home);

    // Authentication
    this.get('#/login', controllers.loginGet);
    this.post('#/login', controllers.loginPost);
    this.get('#/register', controllers.registerGet);
    this.post('#/register', controllers.registerPost);
    this.get('#/logout', controllers.logout);

    // Shop
    this.get('#/shop', controllers.shop);

    // Cart
    this.get('#/cart', controllers.cart);
  });

  app.run();
});