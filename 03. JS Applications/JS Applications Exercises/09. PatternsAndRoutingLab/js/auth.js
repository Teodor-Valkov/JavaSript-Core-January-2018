let auth = (() => {
    function login(username, password) {
        let user = {
            username,
            password
        };

        return remote.post('user', 'login', user, 'basic');
    }

    async function register(username, password) {
        let user = {
            username,
            password
        };

        return remote.post('user', '', user, 'basic');
    }

    async function logout() {
        let authHeaders = {
            authtoken: localStorage.getItem('authtoken')
        };

        return remote.post('user', '_logout', authHeaders);
    }

    function isAuthenticated() {
        return localStorage.getItem('authtoken') !== null;
    }

    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
    }

    function displayError(reason) {
        showError(reason.responseJSON.description);
    }

    function showError(message) {
        let container = $('#errorBox');
        container.text(message);
        container.show();
        setTimeout(() => container.fadeOut(), 3000);
    }

    function showInfo(message) {
        let container = $('#infoBox');
        container.text(message);
        container.show();
        setTimeout(() => container.fadeOut(), 3000);
    }

    return {
        login,
        register,
        logout,
        isAuthenticated,
        saveSession,
        displayError,
        showError,
        showInfo
    }
})();