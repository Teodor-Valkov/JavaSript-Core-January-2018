$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        // Home Index
        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        function displayHome(context) {
            context.loggedIn = auth.isAuthenticated();
            context.username = auth.getUsername();
            context.hasTeam = auth.getTeamId() !== null && auth.getTeamId() !== '' && auth.getTeamId() !== 'undefined';
            context.teamId = auth.getTeamId();

            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/home/home.hbs');
            });
        }

        // About GET
        this.get('#/about', function (context) {
            context.loggedIn = auth.isAuthenticated();
            context.username = auth.getUsername();

            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/about/about.hbs');
            });
        });

        // Login GET
        this.get('#/login', function (context) {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                loginForm: 'templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('templates/login/loginPage.hbs');
            });
        });

        // Login POST
        this.post('#/login', function (context) {
            let username = context.params.username;
            let password = context.params.password;

            if (username === '' || password === '') {
                auth.showError('Empty input fields');
            } else {
                auth.login(username, password)
                    .then(function (data) {
                        auth.saveSession(data);
                        auth.showInfo('Login Successful');
                        displayHome(context);
                    })
                    .catch(auth.displayError)
            }
        });

        // Register GET
        this.get('#/register', function () {
            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                registerForm: 'templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('templates/register/registerPage.hbs');
            });
        });

        // Register POST
        this.post('#/register', function (context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;

            if (username === '' || password === '' || repeatPassword === '') {
                auth.showError('Empty input fields');
            } else if (password !== repeatPassword) {
                auth.showError('Password and Confirm Password do not match');
            } else {
                auth.register(username, password)
                    .then(function (data) {
                        auth.saveSession(data);
                        auth.showInfo('Registration Successful');
                        displayHome(context);
                    })
                    .catch(auth.displayError)
            }
        });

        // Logout GET
        this.get('#/logout', function (context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logout Successful');
                    displayHome(context);
                });
        });

        // All Teams GET 
        this.get('#/catalog', displayCatalogs);

        function displayCatalogs(context) {
            teamsService.getTeams()
                .then(function (data) {
                    context.teams = data;
                    context.loggedIn = auth.isAuthenticated();
                    context.username = auth.getUsername();
                    context.hasTeam = auth.getTeamId() !== null && auth.getTeamId() !== '' && auth.getTeamId() !== 'undefined';

                    context.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                        teamItem: 'templates/catalog/teamItem.hbs'
                    }).then(function () {
                        this.partial('templates/catalog/teamList.hbs');
                    });
                });
        }

        // Team Details GET
        // Unable to get the members before code execution for updating the context.memebers        
        this.get('#/catalog/:id', function (context) {
            let teamId = context.params.id.substr(1);
            let members = [];

            requester.get('user', '', 'kinvey')
                .then(function (users) {
                    members = users.filter(user => user.teamId === teamId).map(user => {
                        return {
                            username: user.username
                        }
                    });

                    return members;
                })
                .then(teamsService.getTeamDetails(teamId)
                    .then(function (data) {
                        context.loggedIn = auth.isAuthenticated();
                        context.username = auth.getUsername();
                        context.name = data.name;
                        context.comment = data.comment;
                        context.members = members;
                        context.author = data.author;
                        context.teamId = data._id;
                        context.isOnTeam = data._id === auth.getTeamId();
                        context.isAuthor = data._acl.creator === auth.getUserId();

                        context.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs',
                            teamMember: 'templates/catalog/teamMember.hbs',
                            teamControls: 'templates/catalog/teamControls.hbs'
                        }).then(function () {
                            this.partial('templates/catalog/teamDetails.hbs');
                        });
                    }));
        });

        // Create GET
        this.get('#/create', function () {
            this.loggedIn = auth.isAuthenticated();
            this.username = auth.getUsername();

            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                createForm: 'templates/create/createForm.hbs'
            }).then(function () {
                this.partial('templates/create/createPage.hbs');
            });
        });

        // Create POST
        this.post('#/create', function (context) {
            let name = context.params.name;
            let comment = context.params.comment;

            teamsService.createTeam(name, comment)
                .then(function (data) {
                    teamsService.joinTeam(data._id)
                        .then((newData) => {
                            auth.saveSession(newData);
                            auth.showInfo('Team Creation Successful');
                            displayCatalogs(context);
                        });
                });
        });

        // Join GET
        this.get('#/join/:id', function (context) {
            let teamId = this.params.id.substr(1);

            teamsService.joinTeam(teamId)
                .then((data) => {
                    auth.saveSession(data);
                    auth.showInfo('Join Successful');
                    displayCatalogs(context);
                });
        });

        // Leave GET
        this.get('#/leave', function (context) {
            teamsService.leaveTeam()
                .then(function (data) {
                    auth.saveSession(data);
                    auth.showInfo('Leave Successful');
                    displayCatalogs(context);
                });
        });

        // Edit Team GET
        this.get('#/edit/:id', function (context) {
            context.loggedIn = auth.isAuthenticated();
            context.username = auth.getUsername();
            context.teamId = this.params.id.substr(1);

            teamsService.getTeamDetails(context.teamId)
                .then(function (data) {
                    context.name = data.name;
                    context.comment = data.comment;

                    context.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                        editForm: 'templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('templates/edit/editPage.hbs');
                    })
                })
        });

        // Edit Team POST
        this.post('#/edit/:id', function (context) {
            let teamId = context.params.id.substr(1);
            let name = context.params.name;
            let comment = context.params.comment;

            teamsService.editTeam(teamId, name, comment)
                .then(function () {
                    auth.showInfo(`Team ${name} Updated!`);
                    displayCatalogs(context);
                })
                .catch(auth.displayError);
        });

        // Delete Team GET
        // Unable to delete team and remove every team member property teamId
        this.get('#/delete/:id', function (context) {
            let teamId = context.params.id.substr(1);

            //requester.get('user', '', 'kinvey')
            //    .then(function (users) {
            //        let members = users.filter(user => user.teamId === teamId);

            //        for (let member of members) {
            //            member.teamId = '';

            //            requester.update('user', member._id, 'kinvey', member)
            //                .then(function (data) {
            //                    auth.saveSession(data);
            //                })
            //                .catch(auth.displayError);
            //        }
            //    })
            //    .then(teamsService.deleteTeam(teamId))
            //    .then(function () {
            //        auth.showInfo(`Team Deleted!`);
            //        displayCatalogs(context);
            //    });
        })
    });

    app.run();
});