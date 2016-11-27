(function ($) {
    $('html, body').stop().animate({
        scrollTop: $('body').offset().top
    }, 800, 'swing');

    $('.input-form').on('submit', function (event) {
        event.preventDefault();
        var location = $('#location').val();
        var destination = $('#destination').val();
        if(!location || !destination){
            alert('Location and Destination are required');
            return false;
        }
        if(location == destination){
            alert('Location and destination cannot be the same');
            return false;
        }
        //console.log(location, destination, payload);
        app.route(payload_test, 'funsho', 'ojuelegba', true);
        //showResult($('#result-section'), $('.back-link'), $('.result-link'));
    });

    $(document).on('click', 'a.result-link', function (event) {
        event.preventDefault();
        showResult($('#result-section'), $('.back-link'), $('.result-link'));
    });

    $(document).on('click', 'a.back-link', function (event) {
        event.preventDefault();
        showResult($('#input-section'), $('.result-link'), $('.back-link'));
    });

    function showResult(section, hidden_link, shown_link) {
        scrollTo (section, 800);
        hidden_link.removeClass('no-display');
        shown_link.addClass('no-display');
    };

    function scrollTo (section, speed) {
        $('html, body').stop().animate({
            scrollTop: section.offset().top
        }, speed, 'swing');
    };
})
(jQuery);
