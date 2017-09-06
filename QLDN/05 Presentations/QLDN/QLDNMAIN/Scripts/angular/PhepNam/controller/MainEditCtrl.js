(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('MainEditCtrl', function ($scope) {
        /*** PRIVATE ***/

        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = {
            PhepNamEditListCtrl: 'PhepNamEditListCtrl'
        };

        /*** HOT-KEY ***/
        vm.keys = {
            F3: function (name, code) {
                console.log('main.F3');

            },
            //press F8 -> search
            F8: function (name, code) {
                console.log('main.F8');

            },
            //press ESC -> close popup
            ESC: function (name, code) {
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            }
        };

        /*** INIT FUNCTION ***/

        (function activate() {
            PhepNamEditListEvent();
        })();

        // nhận cấu hình từ giao diện
        function onInitView(config) { }

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function PhepNamEditListEvent() {
        }
    });
})();
