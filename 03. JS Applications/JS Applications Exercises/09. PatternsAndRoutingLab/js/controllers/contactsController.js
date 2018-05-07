controllers.contactsController = function (context) {
    if (!auth.isAuthenticated()) {
        context.redirect('index.html');
    } else {
        context.loggedIn = true;
        $.get('data.json').then(data => {
            context.contacts = data;
            context.selected = null;

            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                contactItem: 'templates/common/contactItem.hbs',
                contactList: 'templates/common/contactList.hbs',
                contactDetails: 'templates/common/contactDetails.hbs',
            }).then(function () {
                context.partials = this.partials;
                render();
            });
        });
    }

    function render() {
        context.partial('templates/contacts.hbs')
            .then(attachEventHandlers);
    }

    function attachEventHandlers() {
        $('.contact').click((event) => {
            let index = $(event.target).closest('.contact').attr('data-id');
            context.contacts.forEach(c => c.active = false);
            context.contacts[index].active = true;
            context.selected = context.contacts[index];
            render();
        });
    }
}