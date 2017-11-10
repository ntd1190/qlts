(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboNhanVienByPhongBan', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                phongbanid: '='
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, NhanVienService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = NhanVienService, userInfo, flag_run_active = false;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.NhanVienId = 0;
        vm.inputSearch.PhongBanId = 0;

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

        $scope.$watch('phongbanid', function (newValue, oldValue) {
            console.log('_________________________________ VO watch phong ban cua NHANVIEN');
            console.log('phongbanid: ' + newValue);
            if (newValue == oldValue) {
                if (!vm.data.NhanVien) {
                    console.log('_________________________________reset NHANVIEN');
                    vm.data.NhanVien = {};
                }
                return;
            }

            if (!newValue) {
                console.log('_________________________________reset NHANVIEN');
                vm.data.NhanVien = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.PhongBanId = newValue;
            vm.inputSearch.NhanVienId = 0;

            getPage().then(function (success) {
                console.log('_________________________________reset NHANVIEN');
                if (success.data.data && success.data.data.length > 0) {
                    //vm.data.NhanVien = success.data.data;
                    vm.data.NhanVien = {};
                } else {
                    delete vm.data.NhanVien;
                    vm.data.NhanVien = {};
                }
            });
        });

        $scope.$watch('value', function (newValue, oldValue) {
            console.log('_________________________________ VO watch cua NHANVIEN');
            console.log('nhanvienid: ' + newValue);
            if (!newValue) {
                console.log('_________________________________reset NHANVIEN cua nhan vien');
                vm.data.NhanVien = {};
                return;
            }

            vm.inputSearch = {};
            vm.inputSearch.NhanVienId = newValue;
            vm.inputSearch.PhongBanId = $scope.phongbanid;

            getPage().then(function (success) {
                console.log('abc',success);
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.NhanVien = success.data.data[0];
                } else {
                    delete vm.data.NhanVien;
                    vm.data.NhanVien = {};
                }
                console.log('_________________________________lấy duoc NHANVIEN');
                console.log(vm.data.NhanVien);
                $scope.onSelected({ data: vm.data.NhanVien });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.NhanVien });
            $scope.value = vm.data.NhanVien.NhanVienId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch = {};
            vm.inputSearch.SearchString = $select.search;
            vm.inputSearch.PhongBanId = $scope.phongbanid;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {

            var UserId = userInfo.UserId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;
            var PhongBanId = vm.inputSearch.PhongBanId || 0;
            var NhanVienId = vm.inputSearch.NhanVienId || 0;

            return $q(function (resolve, reject) {

                service.GetComboboxByPhongBanId(UserId, NhanVienId, vm.inputSearch.SearchString, PhongBanId)
                    .then(function (success) {
                        vm.status.isLoading = false;


                        if (success.data.data) {

                            vm.data.NhanVienListDisplay = success.data.data;
                        }
                        return resolve(success);
                    }, function (error) {

                        console.log(error);

                        return reject(error);
                    });
            });
        }
    }
})();