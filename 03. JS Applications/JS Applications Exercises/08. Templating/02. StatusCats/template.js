$(() => {
    let catSource = $('#catItem').html();
    let catTemplate = Handlebars.compile(catSource);

    renderCat();

    function renderCat() {
        for (let cat of window.cats) {
            $('#allCats').append(catTemplate(cat))
        }

        $('.btn-primary').click(showHideStatus);

        function showHideStatus() {
            if ($(this).text() === 'Show status code') {
                $(this).text('Hide status code');
                $(this).parent().show();
            } else {
                $(this).text('Show status code');
                $(this).parent().hide();
            }

            $(this).next().toggle();
        }
    }
});