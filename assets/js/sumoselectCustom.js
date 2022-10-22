jQuery(function ($) {

    //sumoselect
    if ($('.select-box').length) {
        $('.select-box').each(function () {
            $(this).SumoSelect({
                floatWidth: 0,
                nativeOnDevice: [],
            });
        });
    }

});