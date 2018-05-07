$(() => {
    const templates = {};
    const context = {
        contacts: []
    };

    const listContainer = $('#list').find('.content');
    const detailsContainer = $('#details').find('.content');

    loadData();
    loadTemplates();

    async function loadData() {
        let contacts = await $.get('data.json');

        contacts.map(contact => {
            contact.active = false
            return contact;
        });

        // for (let contact of contacts) {
        //     contact.active = false;
        // }

        context.contacts = contacts;
    }

    async function loadTemplates() {
        const [contactItemSource, contactListSource, contactDetailsSource] =
        await Promise.all([
            $.get('templates/contactItem.html'),
            $.get('templates/contactList.html'),
            $.get('templates/contactDetails.html')
        ]);

        Handlebars.registerPartial('contactItem', contactItemSource);
        templates.list = Handlebars.compile(contactListSource);
        templates.details = Handlebars.compile(contactDetailsSource);

        renderList();
    }

    function renderList() {
        listContainer.html(templates.list(context));
        attachEvents();
    }


    function attachEvents() {
        $('.contact').click((event) => {
            let contact = $(event.target).closest('.contact');
            let index = contact.attr('data-index');

            for (let contact of context.contacts) {
                contact.active = false;
            }

            context.contacts[index].active = true;

            renderDetails(index);
            renderList();
        });
    }

    function renderDetails(index) {
        let contact = context.contacts[index];
        detailsContainer.html(templates.details(contact));
    }
});