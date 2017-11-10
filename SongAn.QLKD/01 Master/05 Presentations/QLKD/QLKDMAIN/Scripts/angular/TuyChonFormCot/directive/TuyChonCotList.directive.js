(function () {
    'use strict';

    var module = angular.module('app');

    module.directive('tuyChonCotList', function () {
        return {
            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            },
            scope: {
                maform: '@maform',
                isOpen: '=isopen',
                config: '<'
            },
            controller: controller,
            controllerAs: 'ctrl'
        };
    });

    function controller($scope) {
        var vm = this;

        /* INIT FUNCTION */

        function onInitView(config) {
            config = config || {};
            vm.ctrlId = config.ctrlId || 'TuyChonCotPopup';
        }

        activate();
        function activate() {
            onInitView($scope.config);
            initEventListener();
        }

        /* EVENT FUNCTION */

        function initEventListener() {
            console.log(`#${vm.ctrlId}`);
            $('#' + vm.ctrlId).on('hidden.bs.collapse', function () {
                console.log(`#${vm.ctrlId}.hidden.bs.collapse`);
                $scope.isOpen = false;
            });
            $('#' + vm.ctrlId).on('shown.bs.collapse', function () {
                console.log(`#${vm.ctrlId}.shown.bs.collapse`);
                $scope.isOpen = true;
            });

        }

        $scope.$watch('isOpen', function (newValue, oldValue) {
            console.log('$scope.$watch.isOpen',newValue, oldValue);
            if (newValue) {
                $(`#${vm.ctrlId}`).collapse('show');
            } else {
                $(`#${vm.ctrlId}`).collapse('hide');
            }
        });
    }
})();
