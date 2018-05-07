function startApp() {
  const baseUrl = 'https://baas.kinvey.com';
  const appKey = 'kid_SkqJXLf5z';
  const appSecret = '7e7ce74ffdb946f0b29af19a41e5803b';

  function getAuthHeaders(auth) {
    if (auth === 'basic') {
      return `Basic ${btoa(`${appKey}:${appSecret}`)}`;
    }

    return `Kinvey ${sessionStorage.getItem('authtoken')}`;
  }

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
      case 'details':
        $('#viewDetailsAd').show();
        break;
      case 'create':
        $('#viewCreateAd').show();
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
    setTimeout(() => $('#infoBox').fadeOut(), 3000);
  }

  function showError(error) {
    $('#errorBox').text(`Error: ${error}`);
    $('#errorBox').show();
    $('#errorBox').delay(3000).fadeOut(() => $(this).remove());
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
    $('#loggedInUser').text(`Welcome, ${sessionStorage.getItem('username')}!`);
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
    sessionStorage.setItem('authtoken', data._kmd.authtoken);
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('username', data.username);
    userLoggedIn();
  }

  // Update links for logged in or logged out users
  $('header').find('a').show();
  showView('home');

  if (sessionStorage.getItem('authtoken') !== null && sessionStorage.getItem('username') !== null) {
    userLoggedIn();
  } else {
    userLoggedOut();
  }

  // user/register
  function register() {
    const registerUrl = `${baseUrl}/user/${appKey}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('basic'),
      'Content-Type': 'application/json'
    };

    let form = $('#formRegister');
    let username = form.find('input[name=username]').val();
    let password = form.find('input[name=password]').val();

    if (username === '' || password === '') {
      showError('Invalid Credentials');
      return;
    }

    let user = {
      username,
      password
    };

    $.ajax({
      method: 'POST',
      url: registerUrl,
      headers: authHeaders,
      data: JSON.stringify(user),
      success: displayRegisterSuccess,
      error: displayError
    });

    function displayRegisterSuccess(data) {
      form.trigger('reset');
      saveSession(data);
      showView('ads');
      showInfo('Registration successful');
    }
  }

  // user/login
  function login() {
    const loginUrl = `${baseUrl}/user/${appKey}/login`;
    const authHeaders = {
      'Authorization': getAuthHeaders('basic'),
      'Content-Type': 'application/json'
    };

    let form = $('#formLogin');
    let username = form.find('input[name=username]').val();
    let password = form.find('input[name=password]').val();

    if (username === '' || password === '') {
      showError('Invalid Credentials');
      return;
    }

    let user = {
      username,
      password
    };

    $.ajax({
      method: 'POST',
      url: loginUrl,
      headers: authHeaders,
      data: JSON.stringify(user),
      success: displayLoginSuccess,
      error: displayError
    });

    function displayLoginSuccess(data) {
      form.trigger('reset');
      saveSession(data);
      showView('ads');
      showInfo('Login successful');
    }
  }

  // user/logout
  function logout() {
    const logoutUrl = `${baseUrl}/user/${appKey}/_logout`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey'),
      'Content-Type': 'application/json'
    };

    $.ajax({
      method: 'POST',
      url: logoutUrl,
      headers: authHeaders,
      success: displayLogoutSuccess,
      error: displayError
    });

    function displayLogoutSuccess(response) {
      sessionStorage.clear();
      userLoggedOut();
      showView('home');
      showInfo('Logout successful');
    }
  }

  // ads/all
  function getAllAds() {
    const container = $('#ads');
    container.empty();

    const allAdsUrl = `${baseUrl}/appdata/${appKey}/ads`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey')
    };

    $.ajax({
      method: 'GET',
      url: allAdsUrl,
      headers: authHeaders,
      success: displayAllAdsSuccess,
      error: displayError
    });

    function displayAllAdsSuccess(data) {
      if (data.length === 0) {
        container.append('<p>No ads found.</p>');
        return;
      }

      let table = $('<table>');
      let rowHeader = $('<tr>').append(
        '<th>Title</th>',
        '<th>Description</th>',
        '<th>Publisher</th>',
        '<th>Date Published</th>',
        '<th>Price</th>',
        '<th>Actions</th>');

      for (let ad of data) {
        let readMoreLink = $(`<a href="#">[Read More]</a>`).click(() => getDetailsInfo(ad._id));
        let links = [readMoreLink];

        if (ad._acl.creator === sessionStorage.getItem('userId')) {
          let editLink = $(`<a href="#">[Edit]</a>`).click(() => getEditInfo(ad._id));
          let deleteLink = $(`<a href="#">[Delete]</a>`).click(() => deleteAd(ad._id));

          links = [readMoreLink, ' ', editLink, ' ', deleteLink];
        }

        let row = $('<tr>').append(
          $('<td>').text(ad.title),
          $('<td>').text(ad.description),
          $('<td>').text(ad.price),
          $('<td>').text(new Date(ad.date).toLocaleDateString()),
          $('<td>').text(ad.publisher),
          $('<td>').append(links)
        );

        table.append(row);
      }

      table.prepend(rowHeader);
      container.append(table);
    }
  }

  // ads/details
  function getDetailsInfo(adId) {
    const adUrl = `${baseUrl}/appdata/${appKey}/ads/${adId}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey')
    };

    $.ajax({
      method: 'GET',
      url: adUrl,
      headers: authHeaders,
      success: displayDetailsInfoSuccess,
      error: displayError
    });

    function displayDetailsInfoSuccess(data) {
      let container = $('#viewDetailsAd');
      container.empty();

      let div = $('<div class="img"></div>').append(
        $('<img>').attr('src', data.imageUrl),
        $('<br>'),
        $('<label>').text('Title:'),
        $('<h1>').text(data.title),
        $('<label>').text('Description:'),
        $('<p>').text(data.description),
        $('<label>').text('Publisher:'),
        $('<div>').text(data.publisher),
        $('<label>').text('Date:'),
        $('<div>').text(new Date(data.date).toLocaleDateString()));

      container.append(div);
      showView('details');
      showInfo('Ad loaded')
    }
  }

  // ads/create
  function createAd() {
    const adsUrl = `${baseUrl}/appdata/${appKey}/ads`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey'),
      'Content-Type': 'application/json'
    };

    let form = $('#formCreateAd');
    let title = form.find('input[name="title"]').val();
    let description = form.find('textarea[name="description"]').val();
    let price = Number(form.find('input[name="price"]').val());
    let imageUrl = form.find('input[name="image"]').val();
    let date = (new Date()).toString('yyyy-MM-dd');
    let publisher = sessionStorage.getItem('username');

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

    $.ajax({
      method: 'POST',
      url: adsUrl,
      headers: authHeaders,
      data: JSON.stringify(ad),
      success: displayCreateAdSuccess,
      error: displayError
    });

    function displayCreateAdSuccess(data) {
      form.trigger('reset');
      showView('ads');
      showInfo('Ad created');
    }
  }

  // ads/edit GET
  function getEditInfo(adId) {
    const adUrl = `${baseUrl}/appdata/${appKey}/ads/${adId}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey')
    };

    $.ajax({
      method: 'GET',
      url: adUrl,
      headers: authHeaders,
      success: displayGetEditInfoSuccess,
      error: displayError
    });

    function displayGetEditInfoSuccess(data) {
      let form = $('#formEditAd');
      form.find('input[name="title"]').val(data.title);
      form.find('textarea[name="description"]').val(data.description);
      form.find('input[name="price"]').val(Number(data.price));
      form.find('input[name="image"]').val(data.imageUrl);

      form.find('input[name="id"]').val(data._id);
      form.find('input[name="publisher"]').val(data.publisher);
      form.find('input[name="date"]').val(data.date);

      showView('edit');
    }
  }

  // ads/edit POST
  function editAd() {
    let adId = $('#formEditAd input[name=id]').val();
    const adUrl = `${baseUrl}/appdata/${appKey}/ads/${adId}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey'),
      'Content-Type': 'application/json'
    };

    let form = $('#formEditAd');
    let title = form.find('input[name="title"]').val();
    let description = form.find('textarea[name="description"]').val();
    let price = Number(form.find('input[name="price"]').val());
    let imageUrl = form.find('input[name="image"]').val();
    let date = (new Date()).toString('yyyy-MM-dd');
    let publisher = sessionStorage.getItem('username');

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

    $.ajax({
      method: 'PUT',
      url: adUrl,
      headers: authHeaders,
      data: JSON.stringify(ad),
      success: displayEditAdSuccess,
      error: displayError
    });

    function displayEditAdSuccess(data) {
      form.trigger('reset');
      showView('ads');
      showInfo('Ad updated');
    }
  }

  // ads/delete
  function deleteAd(adId) {
    const adUrl = `${baseUrl}/appdata/${appKey}/ads/${adId}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey')
    };

    $.ajax({
      method: 'DELETE',
      url: adUrl,
      headers: authHeaders,
      success: displayDeleteAdSuccess,
      error: displayError
    });

    function displayDeleteAdSuccess(response) {
      showView('ads');
      showInfo('Ad deleted');
    }
  }
}