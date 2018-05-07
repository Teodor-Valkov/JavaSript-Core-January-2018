let notification = (() => {
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function displayError(reason) {
        if (reason.responseJSON) {
            showError(reason.responseJSON.description);
        } else {
            showError(reason.message);
        }
    }

    function showError(message) {
        let container = $('#errorBox');
        container.click((event) => $(event.target).parent().hide());
        container.find('span').text(message);
        container.show();
        setTimeout(() => container.fadeOut(), 3000);
    }

    function showInfo(message) {
        let container = $('#infoBox');
        container.click((event) => $(event.target).parent().hide());
        container.find('span').text(message);
        container.show();
        setTimeout(() => container.fadeOut(), 3000);
    }

    return {
        displayError,
        showError,
        showInfo
    }
})();