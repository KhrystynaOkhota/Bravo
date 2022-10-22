jQuery(function ($) {
    'use strict';

    $('.gallery-wrapper').lightGallery({
        selector: '.gallery-item',
        subHtmlSelectorRelative: true,
    });


    if ($('html').find("body").hasClass("lg-on")) {
        $('html').addClass("overflow-hidden")
    } else {
        $('html').removeClass("overflow-hidden")
    }

    // $(document).on('click', 'html', function () {
    //     if ($('html').find("body").hasClass("lg-on")) {
    //         $('html').addClass("overflow-hidden")
    //     } else {
    //         $('html').removeClass("overflow-hidden")
    //     }
    // });


});