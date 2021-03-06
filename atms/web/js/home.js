/*
 * Copyright (c) 2017 by Dang Vo
 */

/**
 * Created by dangvo on 4/1/17.
 */



$( document ).ready(function() {

    // trigger show events
    jQuery(function($) {

        var _oldShow = $.fn.show;

        $.fn.show = function(speed, oldCallback) {
            return $(this).each(function() {
                var obj         = $(this),
                    newCallback = function() {
                        if ($.isFunction(oldCallback)) {
                            oldCallback.apply(obj);
                        }
                        obj.trigger('afterShow');
                    };

                // trigger a before show if you want
                obj.trigger('beforeShow');

                // now use the old function to show the element passing the new callback
                _oldShow.apply(obj, [speed, newCallback]);
            });
        }
    });


    // fix the main theme error: hide the left sub-menu when click outside the side menu area
    $("body .nav-sm").click(function(e){
       //$(".nav .child_menu").hide();

        if (! $("#sidebar-menu").find(e.target).length){
            $(".nav .child_menu").hide();
            $(".side-menu").find("li").removeClass("active");

        }


    });

   /* $(document).on("click", "#sidebar-menu",function(e){
       e.stopPropagation();
    });*/

    $("#loading").bind("beforeShow", function(){

        $("#loading").css("top", $(document).scrollTop() + $(window).height()/4 )
            .css("left", $(window).width()/2 - $("#loading").width()/2 );
    });



});


var opts = {
    lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 14 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#f63c3f' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
};

var spinner = new Spinner();


// add the animation to the popover
$('a[rel=popover]').popover().click(function(e) {
    e.preventDefault();
    var open = $(this).attr('data-easein');
    if (open == 'shake') {
        $(this).next().velocity('callout.' + open);
    } else if (open == 'pulse') {
        $(this).next().velocity('callout.' + open);
    } else if (open == 'tada') {
        $(this).next().velocity('callout.' + open);
    } else if (open == 'flash') {
        $(this).next().velocity('callout.' + open);
    } else if (open == 'bounce') {
        $(this).next().velocity('callout.' + open);
    } else if (open == 'swing') {
        $(this).next().velocity('callout.' + open);
    } else {
        $(this).next().velocity('transition.' + open);
    }

});

// add the animation to the modal
$(".modal").each(function(index) {
    $(this).on('show.bs.modal', function(e) {
        var open = $(this).attr('data-easein');
        console.log(open);
        if (open == 'shake') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'pulse') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'tada') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'flash') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'bounce') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'swing') {
            $('.modal-dialog').velocity('callout.' + open);
        } else {
            $('.modal-dialog').velocity('transition.' + open);
        }

    });
});
