var _functions = {}, winWidth, shareButton;

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


    /* _functions.getSwOptions = function (swiper) {
         let options = swiper.data('options');
         options = (!options || typeof options !== 'object') ? {} : options;
         const $p = swiper.closest('.swiper-entry')
             , slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;

         console.log(swiper);
         if (!options.pagination)
             options.pagination = {
                 el: $p.find('.swiper-pagination')[0],
                 type: "fraction",
                 clickable: false
             };
         if (!options.navigation)
             options.navigation = {
                 nextEl: $p.find('.swiper-button-next')[0],
                 prevEl: $p.find('.swiper-button-prev')[0]
             };
         options.preloadImages = true;

         options.lazy = {
             loadPrevNext: true
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
             options.loop = true;
         }
         return options;
     };*/

    _functions.getSwOptions = function (swiper) {
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
    _functions.initSwiper = function (el) {
        const swiper = new Swiper(el[0], _functions.getSwOptions(el));
    }
    ;
    $('.swiper-entry .swiper-container').each(function () {
        _functions.initSwiper($(this));
    });


    //custom fraction
    $('.custom-fraction').each(function () {
        var $this = $(this),
            $thisSwiper = $this.find('.swiper-container')[0].swiper;

        $thisSwiper.on('slideChange', function () {
            $this.find('.custom-current').text(
                function () {
                    if ($thisSwiper.realIndex < 9) {
                        return ($thisSwiper.realIndex + 1)
                    } else {
                        return $thisSwiper.realIndex + 1
                    }
                }
            )
        });
    });


    // video stop/play
    $('.banner-slider').each(function () {
        let $thisSwiper = $('.banner-slider').find('.swiper-container')[0].swiper;

        $thisSwiper.on('slideChange', function () {

            var $cSlides = $('.swiper-container').find('.banner-slide');
            _functions.customSlide($thisSwiper, $cSlides);

        });
    });
    _functions.customSlide = function (swiperObj, $customSlides) {
        var slideTo = $customSlides.eq(swiperObj.activeIndex),
            slideFrom = $customSlides.eq(swiperObj.previousIndex);

        var prevSlideVideo = slideFrom.find('video'),
            activeSlideVideo = slideTo.find('video');

        if (prevSlideVideo.length) prevSlideVideo[0].pause();
        if (prevSlideVideo.length) prevSlideVideo[0].currentTime = 0;
        if (activeSlideVideo.length) activeSlideVideo[0].play();
    }

    //popup
    let popupTop = 0;
    _functions.removeScroll = function () {
        popupTop = $(window).scrollTop();
        $('html').css({
            "top": -$(window).scrollTop(),
            "width": "100%"
        }).addClass("overflow-hidden");
    }
    _functions.addScroll = function () {
        $('html').css({}).removeClass("overflow-hidden");
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {
        $('.popup-content').removeClass('active');

        $('.popup-content').removeClass('animate-away').addClass('animate-in');

        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {


        $('.popup-content').removeClass('animate-in').addClass('animate-away');

        $('.popup-wrapper').removeClass('active');
        _functions.addScroll();
    };


    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .close-popup, .popup-wrapper .layer-close', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });


    $(window).scroll(function () {
        _functions.scrollCall();
    });
    var prev_scroll = 0;
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > prev_scroll) {
            $('header').addClass('hide-header').removeClass('show-header');
            $('.menu-item').removeClass('active');
        } else {
            $('header').removeClass('hide-header').addClass('show-header');

        }
        prev_scroll = winScr;
        if (winScr <= 10) {
            $('header').removeClass('hide-header').removeClass('show-header');
            prev_scroll = 0;
        }
    }

    _functions.coolNav = function () {


        let n = $(".no-touch .menu >  .menu-item > a"), i = $(".no-touch .menu"), r = $("header");
        n.mouseenter((function () {
                r.removeClass("open-dropdown"),
                    n.parent().removeClass("active"),
                    $(this).parent().addClass("active"),
                $(this).parent().hasClass("menu-item-has-children") && r.addClass("open-dropdown")
            }
        )),
            i.mouseleave((function () {
                    n.parent().removeClass("active"),
                        r.removeClass("open-dropdown")
                }
            )),

            /// $(".touchevents .menu-item-has-children > a").on("click", (function () {
            ///  alert("ghgjhj");
            //  }
            //  ));
            $(window).on("scroll", (function () {
                    $(window).scrollTop() > 100 ? r.addClass("fixed-top") : r.removeClass("fixed-top")
                }
            ));

    };
    _functions.coolNav();


/*
    $(document).on('click', '.header__search', function () {
        $('.search-block__main').addClass('opened');

        _functions.removeScroll();
    });
    _functions.removeScroll = function () {

        $('html').css({
            "position": "fixed",
            "top": -$(window).scrollTop(),
            "width": "100%"
        });
        if (!$('header').hasClass('header-hide')) {
            $('body').addClass('fix-header');
        }
    }
    _functions.addScroll = function () {
        $('html').css({
            "position": "static"
        });

        prev_scroll = 0;
        $('body').removeClass('fix-header');
    }
    $(document).click(function (e) {
        $(e.target).closest(".header__search, .search-block__main").length || ($(".search-block__main").removeClass("opened"),
            $(".header__search").removeClass("active"), $('body').removeClass("overflow-hidden"));
    });
    $(document).on('click', '.h-sform-close, .h-sform-overlay', function () {
        $('.h-sform').removeClass('show');
        _functions.addScroll();
    });

    */
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



jQuery(function () {

    $(".burger").on("click", function () {
        $(this).toggleClass("active"),
            $(".navbar").fadeToggle(10),
            $(".navbar").toggleClass("is-visible")
    })

});


// Sub-menu
document.addEventListener("DOMContentLoaded", function (event) {

    let childrenItem = document.querySelectorAll('.menu-item-has-children');

    for (let i = 0; i < childrenItem.length; i++) {
        let btn = document.createElement("button");
        btn.className = "menu-item__btn";
        btn.innerHTML = `<i class="icon-ar-bottom"></i>`;
        childrenItem[i].appendChild(btn);
    }
});


$(document).on('click', '.menu-item__btn', function (e) {

    e.preventDefault();


    if (!$(this).parents('.menu-item-has-children').hasClass('is-open')) {
        $(this).parents('.menu-item-has-children').addClass('is-open');

        var as =  $(this).parents('.menu-item-has-children').find(".sub-menu");
        console.log(as);
        $(this).parents('.menu-item-has-children').find(".sub-menu").slideDown();

    } else {
        $(this).parents('.menu-item-has-children').removeClass("is-open");
        $(this).parents('.menu-item-has-children').find(".sub-menu").slideUp();
    }
});

