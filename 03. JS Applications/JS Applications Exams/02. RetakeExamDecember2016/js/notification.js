let notification = (() => {
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function displayError(reason) {
        showError(reason.responseJSON.description);
    }
    
    function showError(message) {
        let container = $('#errorBox');
        container.click((event) => $(event.target).hide());
        container.text(message);
        container.show();
        setTimeout(() => container.fadeOut(), 3000);
    }
    
    function showInfo(message) {
        let container = $('#infoBox');
        container.click((event) => $(event.target).hide());
        container.text(message);
        container.show();
        setTimeout(() => container.fadeOut(), 3000);
    }

    return {
        displayError,
        showError,
        showInfo
    }
})();