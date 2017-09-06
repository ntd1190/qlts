angular.module('smart-table')
    .directive('pageSelect', function () {
        return {
            restrict: 'E',
            scope:{
               elClass:'@'
            },
            template: '<input type="text" class="{{elClass}}" ng-model="inputPage" ng-change="selectPage(inputPage)">',
            link: function (scope, element, attrs) {
                scope.$watch('currentPage', function (c) {
                    scope.inputPage = c;
                });
            }
        }
    });