// fixed ios scale bug
var viewportmeta=document.querySelector&&document.querySelector('meta[name="viewport"]'),ua=navigator.userAgent,gestureStart=function(){viewportmeta.content="width=device-width, minimum-scale=0.25, maximum-scale=1.6"},scaleFix=function(){viewportmeta&&(/iPhone|iPod|iPad/.test(ua)&&!/Opera Mini/.test(ua))&&(viewportmeta.content="width=device-width, minimum-scale=1.0, maximum-scale=1.0",document.addEventListener("gesturestart",gestureStart,!1))};scaleFix();

// imagesLoaded
(function($){
$.fn.imagesLoaded=function(b){var a=this.filter("img"),c=a.length;a.bind("load.imgloaded",function(){0>=--c&&"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="!==this.src&&(a.unbind("load.imgloaded"),b.call(a,this))}).each(function(){if(this.complete||void 0===this.complete){var a=this.src;this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";this.src=a}});return this};
})(jQuery);

// if $.browser is not defined
(function($){
if("undefined"==typeof $.browser){$.uaMatch=function(a){a=a.toLowerCase();a=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}};var matched=$.uaMatch(navigator.userAgent),browser={};matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version);browser.chrome?browser.webkit=!0:browser.webkit&&
(browser.safari=!0);$.browser=browser};
})(jQuery);

// browser detector
$('html').removeClass('no-js');
$.each($.browser, function (a, b) {
    if (a != 'version') {
        if (a == 'msie') {
            var v = Math.floor($.browser.version);
            $('html').addClass('ie ie' + v);
            for (var i = v; i <= 10; i++) if (v < i) $('html').addClass('lt-ie' + i);
        }
        else $('html').addClass(a);
    }
});

$(function () {
    // top navigator
    setTopNavagator();
    $(window).resize(function () {
        setTopNavagator();
    });

    //news and event tab
    $('.widgetNewsEvents .eventTab').each(function (index) {
        $(this).click(function () {
            //active tab
            $(this).parent().parent().children('li').children('.newsTab').parent('li').removeClass('active');
            $(this).parent().addClass('active');

            //content tab show/hide
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetEventsPane').show();
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetEventsPane').addClass('active');
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetNewsPane').hide();
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetNewsPane').removeClass('active');

            return false;
        });
    });

    $('.widgetNewsEvents .newsTab').each(function (index) {
        $(this).click(function () {
            //active tab
            $(this).parent().parent().children('li').children('.eventTab').parent('li').removeClass('active');
            $(this).parent().addClass('active');

            //content tab show/hide
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetEventsPane').hide();
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetEventsPane').removeClass('active');
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetNewsPane').show();
            $(this).parent().parent().parent().children('.widgetNewsEventsTabContent').children('.widgetNewsPane').addClass('active');

            return false;
        });
    });

    // homepage slide
    if ($('#mainSlide').length != 0) {
        /*$('#mainSlide').on('slid', function () {
        //setSizeSlide();
        });*/
        $('#mainSlide').find('.item img:not(.bubble)').each(function (k, v) {
            $("<img/>")
            .attr('src', $(v).attr('src'))
            .imagesLoaded(function (image) {
                $(v).data({
                    'image-width': $(image).width() || image.width,
                    'image-height': $(image).height() || image.height
                });
                setSlideImage($(v));
            });
        });

        setSlideBubble();
        $(window).resize(function () {
            setSlideBubble();
            $('#mainSlide').find('.item img:not(.bubble)').each(function (k, v) {
                setSlideImage(v);
            });
        });
    }
});

function GotoLink(obj)
{
    var w = $(window).width();
    if (w > 480) {
        location.href = $(obj).attr('href');
    }
}

function setTopNavagator() {

    var w = $(window).width();

    $('.topNav').off('click touchstart', '.dropdown-toggle', dropdownAnimate);
    if (w <= 480) {
        $('.topNav').on('click touchstart', '.dropdown-toggle', dropdownAnimate);
    }
    else {
        $('.topNav').off('click touchstart', '.dropdown-toggle', dropdownAnimate);
    }
    $('.topNav .dropdown-menu').attr('style', '').parent().removeClass('open');

/*    if (!Modernizr.textshadow) {
        if (!!$.browser.msie && parseFloat($.browser.version) < 9) {
            $('.subMenuItemTitle a').textshadow('0 2px #999999');
        }
        else {
            $('.subMenuItemTitle a').textshadow('0 1px #999999');
        }
    }
	*/

}
function dropdownAnimate(e) {
    var obj = $(e.target);
    obj.next().slideToggle(200);
}

/*
function setSlideImage(im){
    var w = $(window).width(),
        hRatio = 1.47,
//        mw = 1824,
//        mh = 378,
        mw = 910,
        mh = 326,
        iw = $(im).data('image-width'),  //910
        ih = $(im).data('image-height'), //326
        scale = mh / mw,   // 326/910 =  0.3582
        sih = (w * scale * hRatio >= mh ? mh : w * scale * hRatio),  // w * 0.3582 * 1.47   >  326  ? 
        siw = sih*iw/ih,
        sil = (siw - w) / -2;
    if(sil>0) sil = sil*-1;

    $(im).css({
//        'min-width': 320 + (iw / ih * 100),
//        'height': (Modernizr.mq('only all') ? sih : mh),
//        'width': siw >= iw && w >= iw ? '100%' : 'auto',
//        'left': siw >= iw && w >= iw ? 'auto' : sil,

        'height': 'auto',
        'width':  w >= iw ? iw : w,
        'min-width':320, 
        'left': 'auto' 

    });
}
*/

function setSlideImage(im){
    var w = $(window).width(),
        hRatio = 1.47,
        mw = 1824,
        mh = 378,
        iw = $(im).data('image-width'),
        ih = $(im).data('image-height'),
        scale = mh / mw,
        sih = (w * scale * hRatio >= mh ? mh : w * scale * hRatio),
        siw = sih*iw/ih,
        sil = (siw - w) / -2;
    if(sil>0) sil = sil*-1;

    $(im).css({
//        'min-width': 320 + (iw / ih * 100),
        'min-width': 320,
        'height': (Modernizr.mq('only all') ? sih : mh),
        'width': siw >= iw && w >= iw ? '100%' : 'auto',
        'left': siw >= iw && w >= iw ? 'auto' : sil
    });
}

function setSlideBubble(){
    var bb = $('#mainSlide').find('.item img.bubble'),
        w = $(window).width(),
        hRatio = 1.47,
        mw = 1824,
        mh = 378,
        iw = mw,
        ih = mh,
        scale = ih / iw,
        sih = (w * scale * hRatio >= mh ? mh : w * scale * hRatio),
        siw = sih*iw/ih,
        sil = (siw - w) / -2;
    if(sil>0) sil = sil*-1;

    $(bb).css({
        'min-width': 320 + (iw / ih * 100),
        'height': (Modernizr.mq('only all') ? sih : mh),
        'width': 'auto',
        'left': w >= mw ? 'auto' : sil
    });
}

// load more 
function loadMore(btn) {
    var page = $(btn).data('loading-page'),
        container = $(btn).data('result-container'),
        item = $(btn).data('result-item'),
        data = $.extend({}, $(btn).data('search-params') || {});

    if (page == -1) return;

    $(btn).button('loading');
    
    /*$.each(data, function(k, v) {
        data[k] = $(v).val();
    });
    data.page = page;*/
    $('#temp').empty().load(location.href + (location.search ? '&' : '?') + 'page=' + page + ' ' + container, function (result, status, xhr) {
        if ($.trim($('#temp').text()) != '') {
            var list = $('#temp').find(item);
            $('#temp').empty();
            if (page == 1) $(container).empty();
            list.appendTo(container);
            $(btn).data('loading-page', +page + 1);
        }
        else {
            $(btn).data('loading-page', -1).fadeOut();
        }
        $(btn).button('reset');
    });
}