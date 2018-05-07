// Login GET
controllers.loginGet = function () {
  this.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      notification: './templates/common/notification.hbs',
      page: './templates/credentials/login.hbs'
    })
    .then(function () {
      this.partial('./templates/main.hbs');
    });
};

// Login POST
controllers.loginPost = function (context) {
  let username = context.params.username;
  let password = context.params.password;

  auth.login(username, password)
    .then(function (data) {
      auth.saveSession(data);
      notification.showInfo('Login Successful.');
      context.redirect('#');
    })
    .catch(notification.displayError);
};

// Register GET
controllers.registerGet = function () {
  this.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      notification: './templates/common/notification.hbs',
      page: './templates/credentials/register.hbs'
    })
    .then(function () {
      this.partial('./templates/main.hbs');
    });
};

// Register POST
controllers.registerPost = function (context) {
  let username = context.params.username;
  let password = context.params.password;
  let name = context.params.name;

  auth.register(username, password, name)
    .then(function (data) {
      auth.saveSession(data);
      notification.showInfo('Registration Successful.');
      context.redirect('#')
    })
    .catch(notification.displayError);
};

// Logout
controllers.logout = function (context) {
  auth.logout()
    .then(function () {
      sessionStorage.clear();
      notification.showInfo('Logout Successful.');
      context.redirect('#')
    })
    .catch(notification.displayError);
};