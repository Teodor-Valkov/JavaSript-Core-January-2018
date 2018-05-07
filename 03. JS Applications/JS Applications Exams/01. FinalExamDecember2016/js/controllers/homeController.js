// Home Index
controllers.home = function (context) {
  context.username = sessionStorage.getItem('username');

  let partials = {
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs',
    notification: './templates/common/notification.hbs',
  };

  if (auth.isAuthenticated()) {
    partials.page = './templates/userHome.hbs';
  } else {
    partials.page = './templates/appHome.hbs'
  }

  this.loadPartials(partials)
    .then(function () {
      this.partial('./templates/main.hbs');
    });
};