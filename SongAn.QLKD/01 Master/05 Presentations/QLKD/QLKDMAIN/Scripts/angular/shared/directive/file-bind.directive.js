(function () {
    'use strict';

    var module = angular.module('app');
    module.directive('fileBind', function () {
        return {
            scope: {
                fileBind: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    scope.$apply(function () {
                        //scope.fileread = changeEvent.target.files[0];
                        // or all selected files:
                        scope.fileBind = changeEvent.target.files;
                    });
                });
            }
        }
    });
})()