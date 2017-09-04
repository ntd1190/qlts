(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboHangSanXuat', function () {
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

    function controller($scope, $http, HangSanXuatService, $q) {

        /*** PRIVATE ***/

        var vm = this,
            service = HangSanXuatService, userInfo, HangSanXuatId = 0;

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
            onInitView($scope.config);
            HangSanXuatId = $scope.value || 0;
            console.log($scope.value);
            getPage().then(function () {
                if (!vm.data.HangSanXuatListDisplay && vm.data.HangSanXuatListDisplay.length == 0) { return; }
                for (var nuoc in vm.data.HangSanXuatListDisplay) {
                    if (vm.data.HangSanXuatListDisplay[nuoc].HangSanXuatId === HangSanXuatId) {
                        vm.data.HangSanXuat = vm.data.HangSanXuatListDisplay[nuoc];
                        return;
                    }
                }
            });
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.HangSanXuat });
            $scope.value = vm.data.HangSanXuat.HangSanXuatId;
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
                            vm.data.HangSanXuatListDisplay = success.data.data;
                            vm.data.HangSanXuatListDisplay.unshift({ TenHangSanXuat:'.' });
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