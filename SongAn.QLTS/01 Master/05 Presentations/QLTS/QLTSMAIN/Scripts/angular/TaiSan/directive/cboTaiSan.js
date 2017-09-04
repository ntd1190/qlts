(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboTaiSan', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '='
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, TaiSanService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = TaiSanService, userInfo, TaiSanId = 0;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';

        /*** INIT FUNCTION ***/

        function onInitView(config) {
            console.log(config);
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.NameId) {
                vm.NameId = config.NameId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
        }

        activate()
        function activate() {
            $timeout(function () {
                onInitView($scope.config);
                TaiSanId = $scope.value || 0;
                console.log($scope.value);
                getPage().then(function () {
                    console.log(vm.data.TaiSanListDisplay);
                    if (!vm.data.TaiSanListDisplay && vm.data.TaiSanListDisplay.length == 0) { return; }
                    for (var index in vm.data.TaiSanListDisplay) {
                        if (vm.data.TaiSanListDisplay[index].TaiSanId == TaiSanId) {
                            vm.data.TaiSan = vm.data.TaiSanListDisplay[index];
                            return;
                        }
                    }
                });
            }, 0);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.TaiSan });
            $scope.value = vm.data.TaiSan.TaiSanId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch.SearchString = $select.search;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getCombobox(CoSoId, NhanVienId, vm.inputSearch.SearchString)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.TaiSanListDisplay = success.data.data;
                            vm.data.TaiSanListDisplay.unshift({ TenTaiSan: '.' });
                        }
                        resolve();
                    }, function (error) {
                        vm.status.isLoading = false;
                        console.log(error);
                        vm.data.isLoading = false;
                        if (error.data.error != null) {
                            alert(error.data.error.message);
                        } else {
                            alert(error.data.Message);

                        }
                        reject();
                    });
            });
        }
    }
})();