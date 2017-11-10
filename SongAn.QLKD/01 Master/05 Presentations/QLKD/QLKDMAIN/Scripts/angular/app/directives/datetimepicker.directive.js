(function () {
    'use strict';
    var module = angular.module('app');
    module.directive('datetimepicker', function () {
        return {
            restrict: "C",
            link: function (scope, element, attrs, ngModelCtrl) {
                jQuery.datetimepicker.setLocale('vi');

                if (jQuery(element).hasClass('date')) {
                    jQuery(element).datetimepicker({
                        mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                    })
                }
                else if (jQuery(element).hasClass('time')) {
                    jQuery(element).datetimepicker({
                        mask: '29:59', format: 'H:i', timepicker: true, datepicker: false, scrollInput: false,
                    })
                }
                else if (jQuery(element).hasClass('datetime')) {
                    jQuery(element).datetimepicker({
                        mask: '39/19/9999 29:59', format: 'd/m/Y H:i', startDate: '+1971/05/01'
                    })
                }
                else if (jQuery(element).hasClass('ngaysinh')) {
                    jQuery(element).datetimepicker({
                        mask: '39/19/9999', format: 'd/m/Y', timepicker: false, maxDate: 'now', scrollInput: false
                    })
                }
                else {
                    jQuery(element).datetimepicker({
                        mask: '39/19/9999 29:59', format: 'd/m/Y H:i', maxDate: 'now', scrollInput: false, startDate: '+1971/05/01'
                    })
                }
            }
        };
    });


})();

