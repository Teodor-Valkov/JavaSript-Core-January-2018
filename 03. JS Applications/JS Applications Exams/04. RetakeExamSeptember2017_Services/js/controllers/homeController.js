let homeController = (() => {
  // Home Index
  function index(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    if (auth.isAuthenticated()) {
      context.redirect('#/feed');
    } else {
      this.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          navigation: './templates/common/navigation.hbs',
          page: './templates/credentials/login.hbs'
        })
        .then(function () {
          this.partial('./templates/main.hbs');
        });
    }
  }

  return {
    index
  };
})()