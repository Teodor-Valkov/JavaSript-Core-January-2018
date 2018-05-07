const controllers = {};

$(() => {
  const app = Sammy('#main', function () {
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

    // My Received Messages
    this.get('#/myMessages', controllers.myMessages);

    // My Sent Messages
    this.get('#/archiveMessages', controllers.archiveMessages);

    // Send Message GET
    this.get('#/sendMessage', controllers.sendMessageGet);

    // Send Message POST
    this.post('#/sendMessage', controllers.sendMessagePost);
  });

  app.run();
});