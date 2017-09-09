(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboPhongBan', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                disabled: '<'
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, PhongBanService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = PhongBanService, userInfo, PhongBanId = 0;

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

        $scope.$watch('value', function (newValue, oldValue) {
            console.log(userInfo);
            if (newValue == 0) {
                vm.data.PhongBan = {};
            } else {

                getPage().then(function () {
                    console.log('_________________________________________________');
                    console.log(userInfo);
                    console.log(vm.data.PhongBanListDisplay);
                    if (!vm.data.PhongBanListDisplay && vm.data.PhongBanListDisplay.length == 0) { return; }
                    for (var index in vm.data.PhongBanListDisplay) {
                        if (vm.data.PhongBanListDisplay[index].PhongBanId == newValue) {
                            vm.data.PhongBan = vm.data.PhongBanListDisplay[index];
                            return;
                        }
                    }
                });

            }
        });

        activate()
        function activate() {
            $timeout(function () {
                onInitView($scope.config);
                PhongBanId = $scope.value || 0;
                console.log($scope.value);
                getPage().then(function () {
                    if (!vm.data.PhongBanListDisplay && vm.data.PhongBanListDisplay.length == 0) { return; }
                    for (var index in vm.data.PhongBanListDisplay) {
                        if (vm.data.PhongBanListDisplay[index].PhongBanId == PhongBanId) {
                            vm.data.PhongBan = vm.data.PhongBanListDisplay[index];
                            return;
                        }
                    }
                });
            }, 10);

        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.PhongBan });
            $scope.value = vm.data.PhongBan.PhongBanId;
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
                            vm.data.PhongBanListDisplay = success.data.data;
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