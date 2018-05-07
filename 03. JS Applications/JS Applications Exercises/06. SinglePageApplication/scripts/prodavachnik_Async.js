function startApp() {
  let requester = (() => {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_SkqJXLf5z';
    const appSecret = '7e7ce74ffdb946f0b29af19a41e5803b';

    function getAuthHeaders(auth) {
      if (auth === 'basic') {
        return `Basic ${btoa(`${appKey}:${appSecret}`)}`;
      }

      return `Kinvey ${localStorage.getItem('authtoken')}`;
    }

    function makeRequest(method, module, url, auth) {
      let request = {
        url: `${baseUrl}/${module}/${appKey}/${url}`,
        method,
        headers: {
          'Authorization': getAuthHeaders(auth)
        }
      };
      return request;
    }

    function get(module, url, auth) {
      let request = makeRequest('GET', module, url, auth);
      return $.ajax(request);
    }

    function post(module, url, data, auth) {
      let request = makeRequest('POST', module, url, auth);
      request.data = JSON.stringify(data);
      request.headers['Content-Type'] = 'application/json';
      return $.ajax(request);
    }

    function update(module, url, data, auth) {
      let request = makeRequest('PUT', module, url, auth);
      request.data = JSON.stringify(data);
      request.headers['Content-Type'] = 'application/json';
      return $.ajax(request);
    }

    function remove(module, url, auth) {
      let request = makeRequest('DELETE', module, url, auth);
      return $.ajax(request);
    }

    return {
      get,
      post,
      update,
      remove
    };
  })();

  function showView(view) {
    $('section').hide();
    switch (view) {
      case 'home':
        $('#viewHome').show();
        break;
      case 'login':
        $('#viewLogin').show();
        break;
      case 'register':
        $('#viewRegister').show();
        break;
      case 'ads':
        $('#viewAds').show();
        getAllAds();
        break;
      case 'create':
        $('#viewCreateAd').show();
        break;
      case 'details':
        $('#viewDetailsAd').show();
        break;
      case 'edit':
        $('#viewEditAd').show();
        break;
    }
  }

  // Attach event listeners
  $('#linkHome').click(() => showView('home'));
  $('#linkLogin').click(() => showView('login'));
  $('#linkRegister').click(() => showView('register'));
  $('#linkListAds').click(() => showView('ads'));
  $('#linkCreateAd').click(() => showView('create'));
  $('#linkLogout').click(logout);

  $('#buttonLoginUser').click(login);
  $('#buttonRegisterUser').click(register);
  $('#buttonCreateAd').click(createAd);
  $('#buttonEditAd').click(editAd);

  // Notifications
  $(document).on({
    ajaxStart: () => $('#loadingBox').show(),
    ajaxStop: () => $('#loadingBox').fadeOut()
  });

  $('#infoBox').click((event) => $(event.target).hide());
  $('#errorBox').click((event) => $(event.target).hide());

  function showInfo(message) {
    $('#infoBox').text(message);
    $('#infoBox').show();
    setTimeout(() => $('#infoBox').fadeOut(), 2000);
  }

  function showError(error) {
    $('#errorBox').text(`Error: ${error}`);
    $('#errorBox').show();
    $('#errorBox').delay(4000).fadeOut(() => $(this).remove());
  }

  function displayError(response) {
    let error = JSON.stringify(response);

    if (response.readyState === 0) {
      error = 'Cannot connect due to network error.';
    }

    if (response.responseJSON && response.responseJSON.description) {
      error = response.responseJSON.description;
    }

    showError(error);
  }

  function userLoggedIn() {
    $('#loggedInUser').text(`Welcome, ${localStorage.getItem('username')}!`);
    $('#loggedInUser').show();

    $('#linkLogin').hide();
    $('#linkRegister').hide();
    $('#linkLogout').show();
    $('#linkListAds').show();
    $('#linkCreateAd').show();
  }

  function userLoggedOut() {
    $('#loggedInUser').text('');
    $('#loggedInUser').hide();

    $('#linkLogin').show();
    $('#linkRegister').show();
    $('#linkLogout').hide();
    $('#linkListAds').hide();
    $('#linkCreateAd').hide();
  }

  function saveSession(data) {
    localStorage.setItem('authtoken', data._kmd.authtoken);
    localStorage.setItem('userId', data._id);
    localStorage.setItem('username', data.username);
    userLoggedIn();
  }

  // Update links for logged in or logged out users
  $('header').find('a').show();
  showView('home');

  if (localStorage.getItem('authtoken') !== null && localStorage.getItem('username') !== null) {
    userLoggedIn();
  } else {
    userLoggedOut();
  }

  // user/register
  async function register() {
    let form = $('#formRegister');
    let username = form.find('input[name="username"]').val();
    let password = form.find('input[name="password"]').val();

    if (username === '' || password === '') {
      showError('Invalid Credentials');
      return;
    }

    let user = {
      username,
      password
    };

    try {
      let data = await requester.post('user', '', user, 'basic');
      form.trigger('reset');
      saveSession(data);
      showView('ads');
      showInfo('Registration successful');
    } catch (error) {
      displayError(error);
    }
  }

  // user/login
  async function login() {
    let form = $('#formLogin');
    let username = form.find('input[name="username"]').val();
    let password = form.find('input[name="password"]').val();

    if (username === '' || password === '') {
      showError('Invalid Credentials');
      return;
    }

    let user = {
      username,
      password
    };

    try {
      let data = await requester.post('user', 'login', user, 'basic');
      form.trigger('reset');
      saveSession(data);
      showView('ads');
      showInfo('Login successful');
    } catch (error) {
      displayError(error);
    }
  }

  // user/logout
  async function logout() {
    try {
      await requester.post('user', '_logout');
      localStorage.clear();
      userLoggedOut();
      showView('home');
      showInfo('Logout successful');
    } catch (error) {
      displayError(error);
    }
  }

  // ads/all
  async function getAllAds() {
    const container = $('#ads');
    container.empty();

    let data = await requester.get('appdata', 'ads');

    if (data.length === 0) {
      container.append('<p>No ads found.</p>');
      return;
    }


    for (let ad of data) {
      let div = $('<div class="ad-box"></div>');
      let title = $(`<div class="ad-title">${ad.title}</div>`);

      if (ad._acl.creator === localStorage.getItem('userId')) {
        let editButton = $('<button class="ad-control">&#9998;</button>').click(() => getEditInfo(ad));
        let deleteButton = $('<button class="ad-control">&#10006;</button>').click(() => deleteAd(ad._id));
        title.append(editButton).append(deleteButton);
      }

      let image = $(`<div><img src="${ad.imageUrl}"></div>`);
      let price = $(`<div>Price: ${Number(ad.price).toFixed(2)} | By ${ad.publisher} </div>`);
      let readMoreLink = $('<a href="#">Read more</a>').click(() => getDetailsInfo(ad._id));

      div.append(title);
      div.append(image);
      div.append(price);
      div.append(readMoreLink);
      container.append(div);
    }
  }

  // ads/details - if we receive only id
  async function getDetailsInfo(adId) {
    let container = $('#viewDetailsAd');
    container.empty();

    try {
      let ad = await requester.get('appdata', `ads/${adId}`);

      let div = $('<div class="img"></div>').append(
        $('<img>').attr('src', ad.imageUrl),
        $('<br>'),
        $('<label>').text('Title:'),
        $('<h1>').text(ad.title),
        $('<label>').text('Description:'),
        $('<p>').text(ad.description),
        $('<label>').text('Publisher:'),
        $('<div>').text(ad.publisher),
        $('<label>').text('Date:'),
        $('<div>').text(new Date(ad.date).toLocaleDateString()));

      container.append(div);

      showView('details');
      showInfo('Ad loaded');
    } catch (error) {
      displayError(error);
    }
  }

  // user/details - if we receive the object directly
  //
  //function getDetailsInfo(ad) {
  //  let container = $('#viewDetailsAd');
  //  container.empty();

  //  let div = $('<div class="img"></div>').append(
  //    $('<img>').attr('src', ad.imageUrl),
  //    $('<br>'),
  //    $('<label>').text('Title:'),
  //    $('<h1>').text(ad.title),
  //    $('<label>').text('Description:'),
  //    $('<p>').text(ad.description),
  //    $('<label>').text('Publisher:'),
  //    $('<div>').text(ad.publisher),
  //    $('<label>').text('Date:'),
  //    $('<div>').text(new Date(ad.date).toLocaleDateString()));

  //  container.append(div);

  //  showView('details');
  //  showInfo('Ad loaded');
  //}

  // ads/create
  async function createAd() {
    let form = $('#formCreateAd');
    let title = form.find('input[name="title"]').val();
    let description = form.find('textarea[name="description"]').val();
    let price = Number(form.find('input[name="price"]').val());
    let imageUrl = form.find('input[name="image"]').val();
    let date = (new Date()).toString('yyyy-MM-dd');
    let publisher = localStorage.getItem('username');

    if (title.length === 0) {
      showError('Title cannot be empty');
      return;
    }
    if (Number.isNaN(price) || Number(price) === 0) {
      showError('Price cannot be empty or zero');
      return;
    }

    let ad = {
      title,
      description,
      price,
      imageUrl,
      date,
      publisher
    };

    try {
      await requester.post('appdata', 'ads', ad);
      form.trigger('reset');
      showView('ads');
      showInfo('Ad created');
    } catch (error) {
      displayError(error);
    }
  }

  // ads/edit GET
  function getEditInfo(ad) {
    let form = $('#formEditAd');
    form.find('input[name="title"]').val(ad.title);
    form.find('textarea[name="description"]').val(ad.description);
    form.find('input[name="price"]').val(Number(ad.price));
    form.find('input[name="image"]').val(ad.imageUrl);

    form.find('input[name="id"]').val(ad._id);
    form.find('input[name="publisher"]').val(ad.publisher);
    form.find('input[name="date"]').val(ad.date);

    showView('edit');
  }

  // ads/edit POST
  async function editAd() {
    let form = $('#formEditAd');
    let title = form.find('input[name="title"]').val();
    let description = form.find('textarea[name="description"]').val();
    let price = form.find('input[name="price"]').val();
    let imageUrl = form.find('input[name="image"]').val();

    let adId = form.find('input[name="id"]').val();
    let publisher = form.find('input[name="publisher"]').val();
    let date = form.find('input[name="date"]').val();

    if (title.length === 0) {
      showError('Title cannot be empty');
      return;
    }
    if (Number.isNaN(price) || Number(price) === 0) {
      showError('Price cannot be empty or zero');
      return;
    }

    let ad = {
      title,
      description,
      price,
      imageUrl,
      date,
      publisher
    };

    try {
      await requester.update('appdata', `ads/${adId}`, ad);
      form.trigger('reset');
      showView('ads');
      showInfo('Ad updated');
    } catch (error) {
      displayError(error);
    }
  }

  // ads/delete
  async function deleteAd(adId) {
    await requester.remove('appdata', `ads/${adId}`);
    showView('ads');
    showInfo('Ad deleted');
  }
}