let homeController = (() => {
  // Home Index
  function index(context) {
    if (auth.isAuthenticated()) {
      context.redirect('#/editor');
    } else {
      this.loadPartials({
          footer: './templates/common/footer.hbs',
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