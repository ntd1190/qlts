(function () {
    'use strict';

    angular.module('app')
        .directive('numberFormat', formatDirective);

    function formatDirective($filter) {
        return {
            require: '?ngModel',
            link: function (scope, el, attrs, ngModel) {

                // Formatters modify the displayed value of a model
                ngModel.$formatters.push(function (value) {
                    var num = "";
                    if (ngModel.$modelValue) {
                        num = $filter('number')(value);
                    }
                    num = num || 0;
                    return num;
                })

                // Parsers read the data each time it changes
                ngModel.$parsers.push(function (value) {
                    var return_value = '', view_value = '',

                    value = value.replace(/[^\d\,]/g, '');

                    var arrValue = value.split(',');
                    if (arrValue.length >= 2 && arrValue[arrValue.length - 1] == '') {
                        view_value = value;
                    } else {
                        value = value.replace(/\,/g, '.');
                        view_value = $filter('number')(value);
                    }

                    ngModel.$setViewValue(view_value); // <= set lên view
                    ngModel.$render();

                    return_value = view_value.replace(/\./g, '').replace(/\,/g, '.');
                    return return_value;// <= return value
                });
            }
        };

        //return {
        //    require: '?ngModel',
        //    link: function (scope, elem, attrs, ctrl) {
        //        if (!ctrl) {
        //            return;
        //        }

        //        ctrl.$formatters.unshift(function () {
        //            var num = "";
        //            if (ctrl.$modelValue) num = $filter('number')(ctrl.$modelValue);
        //            return num;
        //        });

        //        ctrl.$parsers.unshift(function (viewValue) {
        //            var plainNumber = viewValue.replace(/[\,\.]/g, ''),
        //                b = $filter('number')(plainNumber);
        //            b = b.trim().replace(/,/g, '.');
        //            elem.val(b);

        //            return plainNumber;
        //        });
        //    }
        //};
    };
})()