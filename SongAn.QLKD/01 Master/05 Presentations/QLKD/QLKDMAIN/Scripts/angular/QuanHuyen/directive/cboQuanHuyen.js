(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboQuanHuyen', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                disabled: '<',
                functionCode: '@',
                tinhid: '='
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, QuanHuyenService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = QuanHuyenService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.QuanHuyenId = 0;
        vm.inputSearch.TinhId = 0;

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

        $scope.$watch('tinhid', function (newValue, oldValue) {
            console.log('_________________________________ VO watch tỉnh thành phố cua quan/huyen');
            console.log('tinhid: ' + newValue);
            if (newValue == oldValue) {
                if (!vm.data.QuanHuyen) {
                    console.log('_________________________________reset quan/huyen');
                    vm.data.QuanHuyen = {};
                }
                return;
            }

            if (!newValue) {
                console.log('_________________________________reset quan/huyen');
                vm.data.QuanHuyen = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.TinhId = newValue;
            vm.inputSearch.QuanHuyenId = 0;

            getPage().then(function (success) {
                console.log('_________________________________reset quan/huyen');
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.QuanHuyen = {};
                } else {
                    delete vm.data.QuanHuyen;
                    vm.data.QuanHuyen = {};
                }
            });
        });

        $scope.$watch('value', function (newValue, oldValue) {
            if (newValue == oldValue && vm.data.QuanHuyen) {
                if (typeof vm.data.QuanHuyen.QuanHuyenId !== 'undefined')
                    return;
            }
            if (!newValue) {
                vm.data.QuanHuyen = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.QuanHuyenId = newValue;
            vm.inputSearch.TinhId = $scope.tinhid;

            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.QuanHuyen = success.data.data[0];
                } else {
                    delete vm.data.QuanHuyen;
                    vm.data.QuanHuyen = {};
                }
                console.log('_________________________________lấy duoc QuanHuyen');
                $scope.onSelected({ data: vm.data.QuanHuyen });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.QuanHuyen });
            $scope.value = vm.data.QuanHuyen.QuanHuyenId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch = {};
            vm.inputSearch.SearchString = $select.search;
            vm.inputSearch.TinhId = $scope.tinhid;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var UserId = userInfo.UserId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;
            var search = vm.inputSearch.SearchString || '';
            var QuanHuyenId = vm.inputSearch.QuanHuyenId || 0;
            var TinhId = vm.inputSearch.TinhId || 0;
            var FunctionCode = $scope.functionCode || '';

            return $q(function (resolve, reject) {
                service.GetComboboxById(UserId, NhanVienId, search, QuanHuyenId, TinhId, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.QuanHuyenListDisplay = success.data.data;
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