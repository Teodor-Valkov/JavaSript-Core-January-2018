let usersController = (() => {
  // Login GET
  function loginGet() {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        page: './templates/credentials/login.hbs'
      })
      .then(function () {
        this.partial('./templates/main.hbs');
      });
  };

  // Login POST
  function loginPost(context) {
    let username = context.params.username;
    let password = context.params.password;

    if (!validateUsername(username)) {
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    auth.login(username, password)
      .then(function (data) {
        auth.saveSession(data);
        notification.showInfo('Login Successful.');
        context.redirect('#/home');
      })
      .catch(notification.displayError);
  }

  // Register GET
  function registerGet() {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        page: './templates/credentials/register.hbs'
      })
      .then(function () {
        this.partial('./templates/main.hbs');
      });
  };

  // Register POST
  function registerPost(context) {
    let username = context.params.username;
    let password = context.params.password;
    let repeatPassword = context.params.repeatPass;

    if (!validateUsername(username)) {
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    if (!validatePasswords(password, repeatPassword)) {
      return;
    }

    auth.register(username, password)
      .then(function (data) {
        auth.saveSession(data);
        notification.showInfo('Registration Successful.');
        context.redirect('#/home');
      })
      .catch(notification.displayError);
  }

  // Logout
  function logout(context) {
    auth.logout()
      .then(function () {
        sessionStorage.clear();
        notification.showInfo('Logout Successful.');
        context.redirect('#/home');
      })
      .catch(notification.displayError);
  }

  // Discover
  function discover(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    requester.get('user', '', 'kinvey')
      .then((users) => {
        for (let user of users) {
          user.followers = users.filter(u => u.subscriptions.includes(user.username)).length;
        }

        context.userList = users.filter(u => u.username !== username).sort((a, b) => b.followers - a.followers);

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            navigation: './templates/common/navigation.hbs',
            userItem: './templates/users/userItem.hbs',
            page: './templates/users/discover.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs');
          });
      }).catch(notification.displayError);
  }

  // Follow
  function follow(context) {
    let otherUsername = context.params.username.substr(1);
    let userId = sessionStorage.getItem('userId');

    let subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'));
    subscriptions.push(otherUsername);

    let user = {
      subscriptions
    }

    requester.update('user', userId, 'kinvey', user)
      .then(() => {
        notification.showInfo(`Subscribed to ${otherUsername}`);
        sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        context.redirect(`#/otherProfile/:${otherUsername}`);
      }).catch(notification.displayError);
  }

  // Unfollow
  function unfollow(context) {
    let otherUsername = context.params.username.substr(1);
    let userId = sessionStorage.getItem('userId');

    let subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'));
    let indexOfOtherUsername = subscriptions.indexOf(otherUsername);
    subscriptions.splice(indexOfOtherUsername, 1);

    let user = {
      subscriptions
    }

    requester.update('user', userId, 'kinvey', user)
      .then(() => {
        notification.showInfo(`Unsubscribed to ${otherUsername}`);
        sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        context.redirect(`#/otherProfile/:${otherUsername}`);
      }).catch(notification.displayError);
  }

  function validateUsername(username) {
    if (username.length < 5) {
      notification.showError('Username should be at least 5 characters long.');
      return false;
    }

    return true;
  }

  function validatePassword(password) {
    if (!password) {
      notification.showError('Password should not be empty.');
      return false;
    }

    return true;
  }

  function validatePasswords(password, repeatPassword) {
    if (password !== repeatPassword) {
      notification.showError('Passwords do not match.');
      return false;
    }

    return true;
  }

  return {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    logout,
    discover,
    follow,
    unfollow
  };
})()