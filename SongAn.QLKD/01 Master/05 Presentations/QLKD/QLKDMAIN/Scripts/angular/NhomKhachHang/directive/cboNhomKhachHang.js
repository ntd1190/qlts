(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboNhomKhachHang', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
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

    function controller($scope, $http, NhomKhachHangService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = NhomKhachHangService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.NhomKhachHangId = 0;

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
            if (newValue == oldValue && vm.data.NhomKhachHang) {
                if (typeof vm.data.NhomKhachHang.NhomKhachHangId !== 'undefined')
                    return;
            }
            if (!newValue) {
                vm.data.NhomKhachHang = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.NhomKhachHangId = newValue;

            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.NhomKhachHang = success.data.data[0];
                } else {
                    delete vm.data.NhomKhachHang;
                    vm.data.NhomKhachHang = {};
                }
                console.log('_________________________________lấy duoc NhomKhachHang');
                $scope.onSelected({ data: vm.data.NhomKhachHang });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.NhomKhachHang });
            $scope.value = vm.data.NhomKhachHang.NhomKhachHangId;
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
            var NhomKhachHangId = vm.inputSearch.NhomKhachHangId || 0;
            var FunctionCode = $scope.functionCode || '';

            return $q(function (resolve, reject) {
                service.GetComboboxById(UserId, NhanVienId, search, NhomKhachHangId, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.NhomKhachHangListDisplay = success.data.data;
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