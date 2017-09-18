(function () {
    'use strict';

    angular.module('app')
        .directive('inputNumber', formatDirective);

    function formatDirective($filter) {
        return {
            require: '?ngModel',
            link: function (scope, el, attrs, ctrl) {
                // model -> view
                ctrl.$formatters.unshift(function (value) {
                    console.log('ctrl.$modelValue');
                    console.log(ctrl.$modelValue);
                    return ctrl.$modelValue;
                })

                // view -> model
                ctrl.$parsers.unshift(function (value) {
                    var min = Number(attrs['saMin']), max = Number(attrs['saMax']);
                    value = Number(value);

                    if (min !== undefined && value < min) { value = min; }
                    if (max !== undefined && value > max) { value = max; }

                    ctrl.$setViewValue(value); // <= set lên view
                    ctrl.$render();

                    return value;
                });
            }
        };
    };
})()