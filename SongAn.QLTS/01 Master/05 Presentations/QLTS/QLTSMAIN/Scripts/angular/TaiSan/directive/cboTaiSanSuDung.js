(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboTaiSanSuDung', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                maTaiSan: '=',
                phongBan: '=',
                nhanVien: '=',
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
            service = TaiSanService, userInfo;

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

        $scope.$watch('value+phongBan+nhanVien', function (newValue, oldValue) {
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.TaiSanId = $scope.value;
            vm.inputSearch.PhongBanId = $scope.phongBan;
            vm.inputSearch.NhanVienId = $scope.nhanVien;
            getPageById().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.TaiSan = success.data.data[0];
                } else {
                    delete vm.data.TaiSan;
                    vm.data.TaiSan = {};
                }
                $scope.onSelected({ data: vm.data.TaiSan });
            });
        });

        $scope.$watch('maTaiSan', function (newValue, oldValue) {
            console.log(newValue);
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.MaTaiSan = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.TaiSan = success.data.data[0];
                } else {
                    delete vm.data.TaiSan;
                    vm.data.TaiSan = {};
                }
                $scope.onSelected({ data: vm.data.TaiSan });
            });
        });

        activate()
        function activate() {
                onInitView($scope.config);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.TaiSan });
            $scope.value = vm.data.TaiSan.TaiSanId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.SearchString = $select.search;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getComboboxSuDung(CoSoId, NhanVienId, vm.inputSearch.SearchString, vm.inputSearch.MaTaiSan, vm.inputSearch.TaiSanId)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.TaiSanListDisplay = success.data.data;
                        }
                        resolve(success);
                    }, function (error) {
                        vm.status.isLoading = false;
                        console.log(error);
                        vm.data.isLoading = false;
                        if (error.data.error != null) {
                            alert(error.data.error.message);
                        } else {
                            alert(error.data.Message);

                        }
                        reject(error);
                    });
            });
        }
        function getPageById() {
            var CoSoId = userInfo.CoSoId || 0;
            return $q(function (resolve, reject) {
                service.getComboboxSuDungById(CoSoId, vm.inputSearch.TaiSanId, vm.inputSearch.PhongBanId, vm.inputSearch.NhanVienId)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.TaiSanListDisplay = success.data.data;
                        }
                        resolve(success);
                    }, function (error) {
                        vm.status.isLoading = false;
                        console.log(error);
                        vm.data.isLoading = false;
                        if (error.data.error != null) {
                            alert(error.data.error.message);
                        } else {
                            alert(error.data.Message);

                        }
                        reject(error);
                    });
            });
        }
    }
})();