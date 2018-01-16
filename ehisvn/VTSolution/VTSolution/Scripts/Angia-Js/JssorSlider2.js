jQuery(document).ready(function ($) {


    var options = {
        $FillMode: 0,                                       //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
        $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
        $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
        $PauseOnHover: 1,                                   //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

        $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
        $SlideEasing: $JssorEasing$.$EaseOutQuint,          //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
        $SlideDuration: 800,                               //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
        $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
        //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
        //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
        $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
        $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
        $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
        $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
        $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
        $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

        $ArrowNavigatorOptions: {                           //[Optional] Options to specify and enable arrow navigator or not
            $Class: $JssorArrowNavigator$,                  //[Requried] Class to create arrow navigator instance
            $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
            $AutoCenter: 0,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
            $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
        }
    };

    var jssor_slider2 = new $JssorSlider$("slider1_container", options);
    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizes
    function ScaleSlider2() {
         if ($(document).width() >= 1366) {
        var windowWidth = jssor_slider2.$Elmt.parentNode.clientWidth;

        if (windowWidth) {
            var windowHeight = $('#slider1_container').parent().height();
            var originalWidth = jssor_slider2.$OriginalWidth();
            var originalHeight = jssor_slider2.$OriginalHeight();
            var scaleWidth = windowWidth;
            var tmpA = originalWidth / windowWidth;
            var tmpB = originalHeight / windowHeight;
            if (tmpA > tmpB) {
                scaleWidth = Math.ceil(windowHeight / originalHeight * originalWidth);
            }

            jssor_slider2.$ScaleWidth(scaleWidth);
        }
        else
            window.setTimeout(ScaleSlider2, 30);
            var parentWidth = jssor_slider2.$Elmt.parentNode.clientWidth;
            if (parentWidth)
                jssor_slider2.$ScaleWidth(Math.min(parentWidth, 1920));
            else
                window.setTimeout(ScaleSlider2, 30);
        }
        if ($(document).width() >= 350) {
            var parentWidth = jssor_slider2.$Elmt.parentNode.clientWidth;
            if (parentWidth)
                jssor_slider2.$ScaleWidth(Math.min(parentWidth, 1920));
            else
                window.setTimeout(ScaleSlider2, 30);
        } else {
            var parentHeight = $('#slider1_container').parent().height();
            if (parentHeight)
                jssor_slider2.$ScaleHeight(Math.min(parentHeight, 1920));
            else
                window.setTimeout(ScaleSlider2, 30);
        }
    }
    ScaleSlider2();

    $(window).bind("load", ScaleSlider2);
    $(window).bind("resize", ScaleSlider2);
    $(window).bind("orientationchange", ScaleSlider2);
    //responsive code end
});
