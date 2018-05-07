let homeController = (() => {
  // Home Index
  function index(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    if (username) {
      context.redirect('#/catalog');
    } else {
      this.loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          navigation: './templates/common/navigation.hbs',
          loginForm: './templates/credentials/loginForm.hbs',
          registerForm: './templates/credentials/registerForm.hbs',
          page: './templates/credentials/guest.hbs'
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