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
                maForm: '@maform',
                config: '<',
                onConfirm: '&'
            },
            controller: controller,
            controllerAs: 'ctrl'
        };
    });

    function controller($scope, utility, TuyChonCotService, $q) {
        var _tableState;

        var vm = this;
        vm.data = {};
        vm.data.inputSearch = {};

        /* INIT FUNCTION */

        function onInitView(config) {
            config = config || {};
            vm.ctrlId = config.ctrlId || 'TuyChonCotPopup';

            vm.data.inputSearch.MaForm = $scope.maForm || '';

            initEventListener();
            getAll().then(function (success) {
                $scope.onConfirm({ data: vm.data.listCot });
            });
        }

        /* EVENT FUNCTION */

        function initEventListener() {
            console.log(`#${vm.ctrlId}`);

            $(document).ready(function () {
                $('#' + vm.ctrlId).on('hidden.bs.collapse', function () {
                    console.log(`#${vm.ctrlId}.hidden.bs.collapse`);
                });
                $('#' + vm.ctrlId).on('shown.bs.collapse', function () {
                    console.log(`#${vm.ctrlId}.shown.bs.collapse`);
                    getAll();
                });
            });
        }

        activate();
        function activate() {
            onInitView($scope.config);
        }

        /* action function */

        vm.action = {};

        vm.action.apDung = function () {
            saveList().then(function () {
                $scope.onConfirm({ data: vm.data.listCot });
                vm.action.close();
            });
        }

        vm.action.close = function () {
            $('#' + vm.ctrlId).collapse('hide');
        }
        /* api function */

        function saveList() {
            var deferred = $q.defer();

            vm.data.isLoading = true;
            vm.data.showList = true;

            if (!vm.data.listCot || vm.data.listCot.length < 1) { return; }

            var listSelected = [];

            for (var i = 0; i < vm.data.listCot.length; i++) {
                vm.data.listCot[i].HienThiYN = vm.data.listCot[i].isSelected;
                listSelected.push(vm.data.listCot[i]);
            }

            if (listSelected && listSelected.length > 0) {
                TuyChonCotService.saveListCot(listSelected).then(function (success) {
                    vm.data.isLoading = false;
                    return deferred.resolve(success);
                }, function (error) {
                    vm.data.isLoading = false;
                    return deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        function getAll() {
            var deferred = $q.defer();

            vm.data.isLoading = true;
            vm.data.showList = true;

            TuyChonCotService.getAll(vm.data.inputSearch.MaForm)
                .then(function (success) {
                    console.log('TuyChonCotService.getAll', success);
                    if (success.data.data) {
                        vm.data.listCot = success.data.data;
                    }
                    vm.data.isLoading = false;
                    return deferred.resolve(success);
                }, function (error) {
                    console.log(error);
                    vm.data.isLoading = false;
                    return deferred.reject(error);
                });
            return deferred.promise;
        }

    }
})();
