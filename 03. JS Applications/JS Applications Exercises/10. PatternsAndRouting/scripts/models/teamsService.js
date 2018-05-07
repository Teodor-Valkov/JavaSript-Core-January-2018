let teamsService = (() => {
    function getTeams() {
        return requester.get('appdata', 'teams', 'kinvey');
    }

    function getTeamDetails(teamId) {
        return requester.get('appdata', `teams/${teamId}`, 'kinvey');
    }

    function createTeam(name, comment) {
        let author = auth.getUsername();

        let team = {
            name,
            comment,
            author
        };

        return requester.post('appdata', 'teams', 'kinvey', team);
    }

    function joinTeam(teamId) {
        let userId = auth.getUserId();
        let username = auth.getUsername();

        let user = {
            username,
            teamId
        };

        return requester.update('user', userId, 'kinvey', user);
    }

    function leaveTeam() {
        let userId = sessionStorage.getItem('userId');
        let username = auth.getUsername();

        let user = {
            username,
            teamId: ''
        };

        return requester.update('user', userId, 'kinvey', user);
    }

    function editTeam(teamId, name, comment) {
        let author = auth.getUsername();

        let team = {
            name,
            comment,
            author
        };

        return requester.update('appdata', `teams/${teamId}`, 'kinvey', team);
    }

    function deleteTeam(teamId) {
        return requester.remove('appdata', `teams/${teamId}`, 'kinvey');
    }

    return {
        getTeams,
        getTeamDetails,
        createTeam,
        joinTeam,
        leaveTeam,
        editTeam,
        deleteTeam
    }
})();