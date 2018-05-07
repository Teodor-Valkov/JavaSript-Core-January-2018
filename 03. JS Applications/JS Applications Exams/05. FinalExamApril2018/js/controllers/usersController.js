let usersController = (() => {
  // Register POST
  function registerPost(context) {
    let username = context.params['username-register'];
    let password = context.params['password-register'];
    let repeatPassword = context.params['password-register-check'];

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
        notification.showInfo('User registration successful.');
        context.redirect('#/home');
      })
      .catch(notification.displayError);
  }
  
  // Login POST
  function loginPost(context) {
    let username = context.params['username-login'];
    let password = context.params['password-login'];

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
    registerPost,
    loginPost,
    logout
  };
})()