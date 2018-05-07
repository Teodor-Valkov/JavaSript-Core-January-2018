// My Received Messages
controllers.myMessages = function (context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    requester.get('appdata', `messages?query={"recipient_username":"${username}"}`, 'kinvey')
        .then((messages) => {
            for (let message of messages) {
                message.timestamp = formatDate(message._kmd.lmt);
                message.name = formatSender(message.sender_name, message.sender_username);
            }

            context.receivedMessageList = messages;

            this.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    notification: './templates/common/notification.hbs',
                    page: './templates/messages/receivedMessageList.hbs',
                    receivedMessageItem: './templates/messages/receivedMessageItem.hbs'
                })
                .then(function () {
                    this.partial('./templates/main.hbs');
                });
        })
        .catch(notification.displayError);
};

// My Sent Messages
controllers.archiveMessages = function (context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    requester.get('appdata', `messages?query={"sender_username":"${username}"}`, 'kinvey')
        .then((messages) => {
            for (let message of messages) {
                message.timestamp = formatDate(message._kmd.lmt);
            }

            context.archiveMessageList = messages;

            context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    notification: './templates/common/notification.hbs',
                    page: './templates/messages/archiveMessageList.hbs',
                    archiveMessageItem: './templates/messages/archiveMessageItem.hbs',
                })
                .then(function () {
                    this.partial('./templates/main.hbs')
                        .then(function () {
                            $('button').click((event) => {
                                let messageId = $(event.target).attr('data-id');

                                requester.remove('appdata', `messages/${messageId}`, 'kinvey')
                                    .then(() => {
                                        notification.showInfo('Message successfully deleted.');
                                        context.redirect('#');
                                    })
                                    .catch(notification.displayError)
                            })
                        });
                })
        })
        .catch(notification.displayError);
};

// Send Message GET
controllers.sendMessageGet = function (context) {
    let username = sessionStorage.getItem('username');
    context.username = username;

    requester.get('user', '', 'kinvey')
        .then((users) => {
            context.users = users.filter(u => u.username !== context.username);

            context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    notification: './templates/common/notification.hbs',
                    page: './templates/messages/sendMessage.hbs'
                })
                .then(function () {
                    this.partial('./templates/main.hbs');
                });
        })
        .catch(notification.displayError);
};

// Send Message POST
controllers.sendMessagePost = function (context) {
    let username = sessionStorage.getItem('username');
    let name = sessionStorage.getItem('name');
    let recipient = context.params.recipient;
    let text = context.params.text;

    let message = {
        sender_username: username,
        sender_name: name,
        recipient_username: recipient,
        text: text
    };

    requester.post('appdata', 'messages', 'kinvey', message)
        .then(function () {
            notification.showInfo('Message sent.');
            context.redirect('#/archiveMessages')
        })
        .catch(notification.displayError)
};

function formatDate(dateISO8601) {
    let date = new Date(dateISO8601);

    if (Number.isNaN(date.getDate())) {
        return '';
    }

    return date.getDate() + '.' + padZeros(date.getMonth() + 1) + "." + date.getFullYear() + ' ' + date.getHours() + ':' + padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

    function padZeros(number) {
        return ('0' + number).slice(-2);
    }
}

function formatSender(name, username) {
    if (!name) {
        return username;
    }

    return username + ' (' + name + ')';
}