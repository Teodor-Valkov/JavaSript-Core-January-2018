function startApp() {
  const baseUrl = 'https://baas.kinvey.com';
  const appKey = 'kid_HJ3gYfZcG';
  const appSecret = '095f8fb7eea340bda05fe54ba341df0c';

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
  function register() {
    const registerUrl = `${baseUrl}/user/${appKey}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('basic'),
      'Content-Type': 'application/json'
    };

    let form = $('#formRegister');
    let username = form.find('input[name=username]').val();
    let password = form.find('input[name=password]').val();
    let confirmPassword = form.find('input[name=confirm-password]').val();

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
      showView('books');
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
      showView('books');
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

  // books/all
  function getAllBooks() {
    const container = $('#books');
    container.empty();

    const allBooksUrl = `${baseUrl}/appdata/${appKey}/books`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey')
    };

    $.ajax({
      method: 'GET',
      url: allBooksUrl,
      headers: authHeaders,
      success: displayAllBooksSuccess,
      error: displayError
    });

    function displayAllBooksSuccess(data) {
      if (data.length === 0) {
        container.append('<p>No books found.</p>');
        return;
      }

      let table = $('<table>');
      let rowHeader = $('<tr>').append('<th>Title</th>', '<th>Author</th>', '<th>Description</th>', '<th>Actions</th>');

      for (let book of data) {
        let links = [];

        if (book._acl.creator === sessionStorage.getItem('userId')) {
          // let editLink = $('<a href="#">[Edit]</a>').click(getEditInfo.bind(this, book));
          // let deleteLink = $('<a href="#">[Delete]</a>').click(deleteBook.bind(this, book));
          // links = [editLink, ' ', deleteLink];

          let editButton = $('<button>').html('&#9998;').click(() => getEditInfo(book));
          let deleteButton = $('<button>').html('&#10006;').click(() => deleteBook(book));
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
  }

  // books/create
  function createBook() {
    const booksUrl = `${baseUrl}/appdata/${appKey}/books`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey'),
      'Content-Type': 'application/json'
    };

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

    $.ajax({
      method: 'POST',
      url: booksUrl,
      headers: authHeaders,
      data: JSON.stringify(book),
      success: displayCreateBookSuccess,
      error: displayError
    });

    function displayCreateBookSuccess(data) {
      form.trigger('reset');
      showView('books');
      showInfo('Book created');
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
  function editBook() {
    let bookId = $('#formEditBook input[name=id]').val();
    const bookUrl = `${baseUrl}/appdata/${appKey}/books/${bookId}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey'),
      'Content-Type': 'application/json'
    }

    let form = $('#formEditBook');
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

    $.ajax({
      method: 'PUT',
      url: bookUrl,
      headers: authHeaders,
      data: JSON.stringify(book),
      success: displayEditBookSuccess,
      error: displayError
    });

    function displayEditBookSuccess(data) {
      form.trigger('reset');
      showView('books');
      showInfo('Book updated');
    }
  }

  function deleteBook(book) {
    const bookUrl = `${baseUrl}/appdata/${appKey}/books/${book._id}`;
    const authHeaders = {
      'Authorization': getAuthHeaders('kinvey')
    };

    $.ajax({
      method: 'DELETE',
      url: bookUrl,
      headers: authHeaders,
      success: displayDeleteBookSuccess,
      error: displayError
    });

    function displayDeleteBookSuccess(response) {
      showView('books');
      showInfo('Book deleted');
    }
  }
}