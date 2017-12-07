(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboDonHang', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                soPhieu: '=',
                disabled: '<',
                functionCode: '@',
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, DonHangService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = DonHangService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.DonHangId = 0;
        vm.inputSearch.soPhieu = '';

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

            if (newValue == oldValue && vm.data.DonHang) {
                if (typeof vm.data.DonHang.DonHangId !== 'undefined')
                    return;
            }
            if (!newValue) {
                vm.data.DonHang = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.DonHangId = newValue;

            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.DonHang = success.data.data[0];
                } else {
                    delete vm.data.DonHang;
                    vm.data.DonHang = {};
                }
                console.log('_________________________________lấy duoc DonHang');
                $scope.onSelected({ data: vm.data.DonHang });
            });
        });

        $scope.$watch('soPhieu', function (newValue, oldValue) {
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.soPhieu = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.DonHang = success.data.data[0];
                } else {
                    delete vm.data.DonHang;
                    vm.data.DonHang = {};
                }
                $scope.onSelected({ data: vm.data.DonHang });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.DonHang });
            $scope.value = vm.data.DonHang.DonHangId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch = {};
            vm.inputSearch.SearchString = $select.search;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var UserId = userInfo.UserId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;
            var search = vm.inputSearch.SearchString || '';
            var DonHangId = vm.inputSearch.DonHangId || 0;
            var soPhieu = vm.inputSearch.soPhieu || '';
            var FunctionCode = $scope.functionCode || '';

            return $q(function (resolve, reject) {
                service.GetComboboxById(UserId, NhanVienId, search, DonHangId, soPhieu, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.DonHangListDisplay = success.data.data;
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