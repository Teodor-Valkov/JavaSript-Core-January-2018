const controllers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function () {
            if (auth.isAuthenticated()) {
                this.loggedIn = true;
            }

            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/login.hbs');
            });
        });

        this.post('#/login', function (context) {
            let username = context.params.username;
            let password = context.params.password;
            auth.login(username, password)
                .then(function (data) {
                    auth.saveSession(data);
                    context.redirect('#/contacts');
                })
                .catch(auth.displayError);
        });

        this.get('#/register', function () {
            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/register.hbs');
            });
        });

        this.post('#/register', function (context) {
            let username = context.params.username;
            let password = context.params.password;
            auth.register(username, password)
                .then(function (data) {
                    auth.saveSession(data);
                    context.redirect('#/contacts');
                })
                .catch(auth.displayError);
        });

        this.get('#/logout', function () {
            auth.logout()
                .then(() => {
                    localStorage.clear();
                    this.redirect('#');
                })
                .catch(auth.displayError);
        });

        this.get('#/contacts', controllers.contactsController);

        this.get('#/profile', function (context) {
            let userId = localStorage.getItem('userId');

            remote.get('user', userId, 'kinvey')
                .then(function (data) {
                    context.userId = userId;
                    context.firstName = data.firstName;
                    context.lastName = data.lastName;
                    context.phone = data.phone;
                    context.email = data.email;

                    context.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('templates/profile.hbs');
                    });
                })
                .catch(auth.displayError);
        });

        this.post('#/profile', function (context) {
            let userId = context.params.userId;
            let firstName = context.params.firstName;
            let lastName = context.params.lastName;
            let phone = context.params.phone;
            let email = context.params.email;

            let user = {
                firstName,
                lastName,
                phone,
                email
            };

            remote.update('user', userId, user, 'kinvey')
                .then(function (data) {
                    auth.saveSession(data);
                    context.redirect('#/contacts');
                })
                .catch(auth.displayError);
        });
    });

    app.run();
});