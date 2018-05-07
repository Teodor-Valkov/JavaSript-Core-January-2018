function startApp() {
  let requester = (() => {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_HJ3gYfZcG';
    const appSecret = '095f8fb7eea340bda05fe54ba341df0c';

    function getAuthHeaders(auth) {
      if (auth === 'basic') {
        return `Basic ${btoa(`${appKey}:${appSecret}`)}`;
      }

      return `Kinvey ${sessionStorage.getItem('authtoken')}`;
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
      case 'books':
        $('#viewBooks').show();
        getAllBooks();
        break;
      case 'create':
        $('#viewCreateBook').show();
        break;
      case 'edit':
        $('#viewEditBook').show();
        break;
    }
  }

  // Attach event listeners
  $('#linkHome').click(() => showView('home'));
  $('#linkLogin').click(() => showView('login'));
  $('#linkRegister').click(() => showView('register'));
  $('#linkListBooks').click(() => showView('books'));
  $('#linkCreateBook').click(() => showView('create'));
  $('#linkLogout').click(logout);

  $('#formLogin').submit(login);
  $('#formRegister').submit(register);
  $('#formCreateBook').submit(createBook);
  $('#formEditBook').submit(editBook);

  $('form').submit(function (event) {
    event.preventDefault();
  });

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
    $('#linkListBooks').show();
    $('#linkCreateBook').show();
  }

  function userLoggedOut() {
    $('#loggedInUser').text('');
    $('#loggedInUser').hide();

    $('#linkLogin').show();
    $('#linkRegister').show();
    $('#linkLogout').hide();
    $('#linkListBooks').hide();
    $('#linkCreateBook').hide();
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
  async function register() {
    let form = $('#formRegister');
    let username = form.find('input[name="username"]').val();
    let password = form.find('input[name="password"]').val();
    let confirmPassword = form.find('input[name="confirm-password"]').val();

    if (username === '' || password === '' || confirmPassword === '') {
      showError('Invalid Credentials');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match')
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
      showView('books');
      showInfo('Registration successful');
    } catch (error) {
      displayError(error);
    }
  }

  // user/login
  async function login() {
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

    try {
      let data = await requester.post('user', 'login', user, 'basic');
      form.trigger('reset');
      saveSession(data);
      showView('books');
      showInfo('Login successful');
    } catch (error) {
      displayError(error);
    }
  }

  // user/logout
  async function logout() {
    try {
      await requester.post('user', '_logout');
      sessionStorage.clear();
      userLoggedOut();
      showView('home');
      showInfo('Logout successful');
    } catch (error) {
      displayError(error);
    }
  }

  // books/all
  async function getAllBooks() {
    const container = $('#books');
    container.empty();

    let data = await requester.get('appdata', 'books');

    if (data.length === 0) {
      container.append('<p>No books found.</p>');
      return;
    }

    let table = $('<table>');
    let rowHeader = $('<tr>').append('<th>Title</th>', '<th>Author</th>', '<th>Description</th>', '<th>Actions</th>');

    for (let book of data) {
      let links = [];

      if (book._acl.creator === sessionStorage['userId']) {
        // let editLink = $('<a href="#">[Edit]</a>').click(getEditInfo.bind(this, book));
        // let deleteLink = $('<a href="#">[Delete]</a>').click(deleteBook.bind(this, book._id));
        // links = [editLink, ' ', deleteLink];

        let editButton = $('<button>').html('&#9998;').click(() => getEditInfo(book));
        let deleteButton = $('<button>').html('&#10006;').click(() => deleteBook(book._id));
        links = [editButton, ' ', deleteButton];
      }

      let row = $('<tr>').append(
        $('<td>').text(book.title),
        $('<td>').text(book.author),
        $('<td>').text(book.description),
        $('<td>').append(links)
      );

      table.append(row);
    }

    table.prepend(rowHeader);
    container.append(table);
  }

  // books/create
  async function createBook() {
    let form = $('#formCreateBook');
    let title = form.find('input[name=title]').val();
    let author = form.find('input[name=author]').val();
    let description = form.find('textarea[name=description]').val();

    if (title === '' || author === '' || description === '') {
      showError('Invalid fields');
      return;
    }

    let book = {
      title,
      author,
      description
    };

    try {
      await requester.post('appdata', 'books', book);
      form.trigger('reset');
      showView('books');
      showInfo('Book created');
    } catch (error) {
      displayError(error);
    }
  }

  // books/edit GET
  function getEditInfo(book) {
    let form = $('#formEditBook');

    form.find('input[name=id]').val(book._id);
    form.find('input[name=title]').val(book.title);
    form.find('input[name=author]').val(book.author);
    form.find('textarea[name=description]').val(book.description);

    showView('edit');
  }

  // books/edit POST
  async function editBook() {
    let form = $('#formEditBook');
    let bookId = form.find('input[name=id]').val();
    let title = form.find('input[name=title]').val();
    let author = form.find('input[name=author]').val();
    let description = form.find('textarea[name=description]').val();

    if (title === '' || author === '' || description === '') {
      showError('Invalid fields');
      return;
    }

    let book = {
      title,
      author,
      description
    };

    try {
      await requester.update('appdata', `books/${bookId}`, book);
      form.trigger('reset');
      showView('books');
      showInfo('Book updated');
    } catch (error) {
      displayError(error);
    }
  }

  async function deleteBook(bookId) {
    try {
      await requester.remove('appdata', `books/${bookId}`);
      showView('books');
      showInfo('Book deleted');
    } catch (error) {
      displayError(error);
    }
  }
}