let usersController = (() => {
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
    let regex = /^[A-Za-z]{3,}$/g;
    if (!regex.test(username)) {
      notification.showError('Username should be at least 3 characters long and should contain only english alphabet letters.');
      return false;
    }

    return true;
  }

  function validatePassword(password) {
    let regex = /^[A-Za-z0-9]{6,}$/g;
    if (!regex.test(password)) {
      notification.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.');
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