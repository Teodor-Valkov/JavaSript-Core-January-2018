let chirpsController = (() => {
  function allChirps(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    // array with many elements - chirp objects which author is equal to this username
    let chirpsRequest = chirpsService.getAllChirpsByUsername(username);

    // array with many elements - user objects which have this username in their subscription property
    let followersRequest = usersService.getAllFollowersByUsername(username);

    Promise.all([chirpsRequest, followersRequest])
      .then(([chirps, followers]) => {
        let following = JSON.parse(sessionStorage.getItem('subscriptions'));
        following = following.map(f => `"${f}"`);

        // array with many elements - chirp objects which author is equal to one of the usernames in 'following'
        chirpsService.getAllChirpsByFollowing(following)
          .then((feed) => {
            for (let chirp of feed) {
              chirp.time = calcTime(chirp._kmd.ect);
            }

            context.chirps = chirps.length;
            context.following = following.length;
            context.followers = followers.length;
            context.chirpList = feed;

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigation: './templates/common/navigation.hbs',
                page: './templates/chirps/feed.hbs',
                createChirpForm: './templates/chirps/createChirpForm.hbs',
                stats: './templates/users/stats.hbs',
                chirpItem: './templates/chirps/chirpItem.hbs'
              })
              .then(function () {
                this.partial('./templates/main.hbs');
              });
          })
          .catch(notification.displayError);
      })
      .catch(notification.displayError);
  }

  // My Profile
  function myProfile(context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    // array with many elements - chirp objects which author is equal to this username
    let chirpsRequest = chirpsService.getAllChirpsByUsername(username);

    // array with one element - user object which username is equal to this username
    let followingRequest = usersService.getUserByUsername(username);

    // array with many elements - user objects which have this username in their subscription property
    let followersRequest = usersService.getAllFollowersByUsername(username);

    // array with many elements - chirp objects which author is equal to this username
    let feedRequest = chirpsService.getAllChirpsByUsername(username);

    Promise.all([chirpsRequest, followingRequest, followersRequest, feedRequest])
      .then(([chirps, following, followers, feed]) => {
        for (let chirp of feed) {
          chirp.time = calcTime(chirp._kmd.ect);
          chirp.isAuthor = true;
        }

        context.chirps = chirps.length;
        context.following = following.length !== 0 ? following[0].subscriptions.length : 0;
        context.followers = followers.length;
        context.chirpList = feed;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            navigation: './templates/common/navigation.hbs',
            createChirpForm: './templates/chirps/createChirpForm.hbs',
            stats: './templates/users/stats.hbs',
            chirpItem: './templates/chirps/chirpItem.hbs',
            page: './templates/users/myProfile.hbs',
          })
          .then(function () {
            this.partial('./templates/main.hbs');
          });
      })
      .catch(notification.displayError);
  }

  // Other Profile
  function otherProfile(context) {
    let otherUsername = context.params.username.substr(1);
    context.otherUsername = otherUsername;

    let username = sessionStorage.getItem('username');
    context.username = username;

    // array with many elements - chirp objects which author is equal to this username
    let chirpsRequest = chirpsService.getAllChirpsByUsername(otherUsername);

    // array with one element - user object which username is equal to this username    
    let followingRequest = usersService.getUserByUsername(otherUsername);

    // array with many elements - user objects which have this username in their subscription property
    let followersRequest = usersService.getAllFollowersByUsername(otherUsername);

    // array with many elements - chirp objects which author is equal to this username
    let feedRequest = chirpsService.getAllChirpsByUsername(otherUsername);

    Promise.all([chirpsRequest, followingRequest, followersRequest, feedRequest])
      .then(([chirps, following, followers, feed]) => {
        for (let chirp of feed) {
          chirp.time = calcTime(chirp._kmd.ect);
        }

        let subscriptions = JSON.parse(sessionStorage.getItem('subscriptions'));
        context.alreadyFollowed = false;

        if (subscriptions.some(u => u === otherUsername)) {
          context.alreadyFollowed = true;
        }

        context.chirps = chirps.length;
        context.following = following.length !== 0 ? following[0].subscriptions.length : 0;
        context.followers = followers.length;
        context.chirpList = feed;

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            navigation: './templates/common/navigation.hbs',
            stats: './templates/users/stats.hbs',
            chirpItem: './templates/chirps/chirpItem.hbs',
            page: './templates/users/otherProfile.hbs'
          })
          .then(function () {
            this.partial('./templates/main.hbs');
          });
      })
      .catch(notification.displayError);
  }

  // Create Chirp POST
  function createChirpPost(context) {
    let text = context.params.text;
    let author = sessionStorage.getItem('username');

    if (!validateText(text)) {
      return;
    }

    let chirp = {
      text,
      author
    };

    chirpsService.createChirp(chirp)
      .then(function () {
        notification.showInfo('Chirp created.');
        context.redirect('#/myProfile')
      })
      .catch(notification.displayError)
  }

  // Delete Chirp
  function deleteChirp(context) {
    let chirpId = context.params.id.substr(1);

    chirpsService.deleteChirp(chirpId)
      .then(function () {
        notification.showInfo('Chirp deleted.');
        context.redirect('#/myProfile');
      })
      .catch(notification.displayError)
  }

  function validateText(text) {
    if (!text) {
      notification.showError('Chirp cannot be empty.');
      return false;
    }

    if (text.length > 150) {
      notification.showError('Chirp cannot be more than 150 symbols.');
      return false;
    }

    return true;
  }

  function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
      if (value !== 1) return 's';
      else return '';
    }
  }

  return {
    allChirps,
    myProfile,
    otherProfile,
    createChirpPost,
    deleteChirp
  };
})()