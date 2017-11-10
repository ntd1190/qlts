(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('uiDraggable', function () {
        return {
            restrict: "C",
            link: function (scope, element, attrs, ngModelCtrl) {

                // canh giữa
                $(element).on('shown.bs.collapse', function () {

                    var el = $(this);
                    //el.css({ top: '25%', left: '25%' });

                    // canh giữa màn hình
                    var width = $(window).width();
                    var heigth = $(window).height();
                    el.css({
                        left: (width - el.width()) / 2,
                        top: (heigth - el.height()) / 2
                    });
                })

                // setup draggable, focus
                $(element).draggable({
                    handle: ".ui-draggable-handle",
                    containment: 'window'
                }).on('mousedown shown.bs.collapse', function (event) {
                    var boxes = $(".ui-draggable");
                    var el = $(this), // The box that was clicked
                    max = 0;

                    // Find the highest z-index
                    boxes.each(function () {
                        // Find the current z-index value
                        var z = parseInt($(this).css("z-index"), 10);
                        z = z || 0;
                        // Keep either the current max, or the current z-index, whichever is higher
                        max = Math.max(max, z);
                    });
                    // Set the box that was clicked to the highest z-index plus one
                    el.css("z-index", max + 1);
                });
            }
        };
    });
})();

