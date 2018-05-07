// Home Index
controllers.home = function (context) {
  context.username = sessionStorage.getItem('username');

  this.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      notification: './templates/common/notification.hbs',
      page: './templates/home.hbs'
    })
    .then(function () {
      this.partial('./templates/main.hbs');
    });
};