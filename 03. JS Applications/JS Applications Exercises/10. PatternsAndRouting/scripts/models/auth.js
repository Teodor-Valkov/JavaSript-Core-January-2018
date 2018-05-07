let auth = (() => {
    function login(username, password) {
        let user = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', user);
    }

    async function register(username, password) {
        let user = {
            username,
            password
        };

        return requester.post('user', '', 'basic', user);
    }

    async function logout() {
        return requester.post('user', '_logout', 'kinvey');
    }

    function isAuthenticated() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function getUsername() {
        return sessionStorage.getItem('username');
    }

    function getUserId() {
        return sessionStorage.getItem('userId');
    }

    function getTeamId() {
        return sessionStorage.getItem('teamId');
    }

    function saveSession(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('authtoken', data._kmd.authtoken);
        sessionStorage.setItem('teamId', data.teamId);
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
        showInfo,
        getUsername,
        getUserId,
        getTeamId
    }
})();