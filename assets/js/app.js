var _functions = {}, winWidth;

jQuery(function ($) {
    var isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    if (isTouchScreen)
        $('html').addClass('touch-screen');
    var winScr, winHeight, is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;
    winWidth = $(window).width();
    winHeight = $(window).height();
    if (is_Mac) {
        $('html').addClass('mac');
    }
    if (is_IE) {
        $('html').addClass('ie');
    }
    if (is_Chrome) {
        $('html').addClass('chrome');
    }


  /*  _functions.getSwOptions = function (swiper) {
        let options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        const $p = swiper.closest('.swiper-entry')
            , slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;
        if (!options.pagination)
            options.pagination = {
                el: $p.find('.swiper-pagination')[0],
                clickable: true
            };
        if (!options.navigation)
            options.navigation = {
                nextEl: $p.find('>.swiper-button-next')[0],
                prevEl: $p.find('>.swiper-button-prev')[0]
            };
        options.preloadImages = false;

        options.lazy = {
            loadPrevNext: false
        };
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.centerInsufficientSlides = true;
        if (!options.speed)
            options.speed = 1200;
        options.roundLengths = true;
        if (isTouchScreen)
            options.direction = "horizontal";
        if (slidesLength <= 1) {
            options.loop = false;
        }
        return options;
    }
    ;
    _functions.initSwiper = function (el) {
        const swiper = new Swiper(el[0], _functions.getSwOptions(el));
    }
    ;
    $('.swiper-entry .swiper-container').each(function () {
        _functions.initSwiper($(this));
    });*/

    _functions.getSwOptions = function(swiper) {
        let options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        const $p = swiper.closest('.swiper-entry'),
            slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;
        if (!options.pagination) options.pagination = {
            el: $p.find('.swiper-pagination')[0],
            clickable: true
        };
        if (!options.navigation) options.navigation = {
            nextEl: $p.find('.swiper-button-next')[0],
            prevEl: $p.find('.swiper-button-prev')[0]
        };
        options.preloadImages = false;
        options.lazy = {
            loadPrevNext: true
        };
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.centerInsufficientSlides = true;
        if (!options.speed) options.speed = 500;
        options.roundLengths = true;
        if (isTouchScreen) options.direction = "horizontal";
        if (slidesLength <= 1) {
            options.loop = false;
            $p.find('.swiper-wrapper').css({
                "cursor": "default"
            })
        }
        if (options.customFraction) {
            $p.addClass('custom-fraction');
            if (slidesLength > 1 && slidesLength < 10) {
                $p.find('.custom-current').text('1');
                $p.find('.custom-total').text(slidesLength);
            } else if (slidesLength > 1) {
                $p.find('.custom-current').text('1');
                $p.find('.custom-total').text(slidesLength);
            }
        }
        return options;
    };
    _functions.initSwiper = function(el) {
        const swiper = new Swiper(el[0], _functions.getSwOptions(el));
    };
});


function animation() {
    if ($('.animation').length) {
        $('.animation').not('.animated').each(function () {
            let th = $(this);
            if ($(window).scrollTop() >= th.offset().top - $(window).height() * 0.9) {
                th.addClass('animated');
            }
        });
    }
}

animation();
$(window).on('scroll', function () {
    animation();
});
