(function () {
    'use strict';

    angular
        .module('app', [
         // Angular modules 
         'ngCookies',
         // Custom modules 
         // 3rd Party Modules
        'smart-table',
        'ngSanitize', 'ui.select'
        ])
        .value('API_BASE', 'http://localhost/qltsapi/')
        .value('SETTING', {
            DEBUG: true
        })
        .run(run)
        .config(config);

    function run($http, SETTING) {
        initJqueryPlugin();
        authorizeHeader($http);

        if (SETTING.DEBUG == false) {
            console.log = function () { };
        }
    }

    function config(stConfig) {
        stConfig.pipe.delay = 0;
    }

    function authorizeHeader($http) {
        var token = 'abcd';
        $http.defaults.headers.post.Authorization = 'Bearer ' + token;
    }

    function initJqueryPlugin() {
        $(document).ready(function () {
            $('#side-menu').metisMenu();

            setupDatetimePicker();
            setupPopup();
            setUpMonthPicker();
        });
    }

    function setupPopup() {
        $('.ui-draggable.collapse').on('shown.bs.collapse', function () {

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

        $('.ui-draggable').draggable({
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
    function setupDatetimePicker() {
        jQuery.datetimepicker.setLocale('vi');
        jQuery(".datetimepicker").each(function () {
            if (jQuery(this).hasClass('date')) {
                jQuery(this).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
            }
            else if (jQuery(this).hasClass('time')) {
                jQuery(this).datetimepicker({
                    mask: '29:59', format: 'H:i', timepicker: true, datepicker: false, scrollInput: false,
                })
            }
            else if (jQuery(this).hasClass('datetime')) {
                jQuery(this).datetimepicker({
                    mask: '39/19/9999 29:59', format: 'd/m/Y H:i', startDate: '+1971/05/01'
                })
            }
            else if (jQuery(this).hasClass('ngaysinh')) {
                jQuery(this).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, maxDate: 'now', scrollInput: false
                })
            }
            else {
                jQuery(this).datetimepicker({
                    mask: '39/19/9999 29:59', format: 'd/m/Y H:i', maxDate: 'now', scrollInput: false, startDate: '+1971/05/01'
                })
            }
        });
    }

    function setUpMonthPicker() {
        $('.input-month-year').mask('00/0000', { placeholder: "__/____" });
    }
})();