
$(document).ready(function () {
    /* affix the navbar after scroll below header */
    var setupNavBar = function () {
        $('#nav').affix({
            offset: {
                top: function () { return $('#main-logo').height() }
            }
        });
        var smallMode = $(window).width() < 767;
        var height = 50;
        if (!smallMode) {
            height += $('#main-logo').height()
        }
        $('.nav-wrapper').css('min-height', height + 'px');
    };

    setupNavBar();

    $(window).resize(function () {
        setupNavBar();
    });
});