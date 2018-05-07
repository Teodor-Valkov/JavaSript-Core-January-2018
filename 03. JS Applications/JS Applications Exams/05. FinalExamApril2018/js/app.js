$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('index.html', homeController.index);
    this.get('#/home', homeController.index);

    // Authentication
    this.post('#/login', usersController.loginPost);
    this.post('#/register', usersController.registerPost);
    this.get('#/logout', usersController.logout);

    // Editor
    this.get('#/editor', receiptsController.getEditor);

    // Overview
    this.get('#/overview', receiptsController.getOverview)

    // Receipt Details
    this.get('#/details/:id', receiptsController.getReceiptDetails)

    // Create Receipt
    this.post('#/createReceipt', receiptsController.createReceipt);

    // Add Entry
    this.post('#/addEntry', entriesController.addEntry);

    // Delete Entry
    this.get('#/deleteEntry/:id', entriesController.deleteEntry);
  });

  app.run();
});