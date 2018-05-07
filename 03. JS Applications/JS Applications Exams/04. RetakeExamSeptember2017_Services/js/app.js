$(() => {
  const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('index.html', homeController.index);
    this.get('#/home', homeController.index);

    // Authentication
    this.get('#/login', usersController.loginGet);
    this.post('#/login', usersController.loginPost);
    this.get('#/register', usersController.registerGet);
    this.post('#/register', usersController.registerPost);
    this.get('#/logout', usersController.logout);

    // All Chirps
    this.get('#/feed', chirpsController.allChirps);

    // My Profile
    this.get('#/myProfile', chirpsController.myProfile);

    // Other Profile
    this.get('#/otherProfile/:username', chirpsController.otherProfile);

    // Discover
    this.get('#/discover', usersController.discover);

    // Create Chirp
    this.post('#/createChirp', chirpsController.createChirpPost);

    // Delete Post
    this.get('#/deleteChirp/:id', chirpsController.deleteChirp);

    // Follow
    this.get('#/follow/:username', usersController.follow);

    // Unfollow
    this.get('#/unfollow/:username', usersController.unfollow);
  });

  app.run();
});
