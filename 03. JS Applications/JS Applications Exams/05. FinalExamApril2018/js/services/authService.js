let auth = (() => {
    function isAuthenticated() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('authtoken', data._kmd.authtoken);
    }

    // Login POST
    function login(username, password) {
        let user = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', user);
    }

    // Register POST
    function register(username, password) {
        let user = {
            username,
            password
        };

        return requester.post('user', '', 'basic', user);
    }

    // Logout POST
    function logout() {
        return requester.post('user', '_logout', 'kinvey');
    }

    return {
        isAuthenticated,
        saveSession,
        login,
        register,
        logout
    }
})()