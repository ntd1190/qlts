(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboPhuongThuc', function () {
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

    function controller($scope, $http, PhuongThucService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = PhuongThucService, userInfo, PhuongThucId = 0;

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
                PhuongThucId = $scope.value || 0;
                console.log($scope.value);
                getPage().then(function () {
                    if (!vm.data.PhuongThucListDisplay && vm.data.PhuongThucListDisplay.length == 0) { return; }
                    for (var index in vm.data.PhuongThucListDisplay) {
                        if (vm.data.PhuongThucListDisplay[index].PhuongThucId == PhuongThucId) {
                            vm.data.PhuongThuc = vm.data.PhuongThucListDisplay[index];
                            return;
                        }
                    }
                });
            }, 0);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.PhuongThuc });
            $scope.value = vm.data.PhuongThuc.PhuongThucId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch.SearchString = $select.search;
            if (!vm.inputSearch.SearchString) { return; }
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
                            vm.data.PhuongThucListDisplay = success.data.data;
                            vm.data.PhuongThucListDisplay.unshift({ TenPhuongThuc: '.' });
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