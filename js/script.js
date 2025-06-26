$(function() {
    $('header, section').css('opacity', 0);

    $(window).on('load', function() {
        $('header, section').each(function(i) {
            $(this).delay(i * 200).animate({opacity: 1}, 1000);
        });
    });
});