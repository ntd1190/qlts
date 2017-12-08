(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboPhuongXa', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                disabled: '<',
                functionCode: '@',
                quanhuyenid: '='
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, PhuongXaService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = PhuongXaService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.PhuongXaId = 0;
        vm.inputSearch.QuanHuyenId = 0;

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
            newValue = newValue || 0;
            if (!newValue) {
                vm.data.PhuongXa = {};
                onWatch();
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.PhuongXaId = newValue;
            vm.inputSearch.QuanHuyenId = $scope.quanhuyenid;

            getPage().then(function (success) {
                console.log(success, vm.inputSearch.PhuongXaId, '_________________________________vo PhuongXa');
                if (newValue && success.data.data && success.data.data.length == 1) {
                    vm.data.PhuongXa = success.data.data[0];
                    console.log(vm.data.PhuongXa, vm.data.PhuongXa.PhuongXaId, 'vm.data.PhuongXa_________________________________vo PhuongXa');
                } else {
                    delete vm.data.PhuongXa;
                    vm.data.PhuongXa = {};
                }
                console.log('_________________________________lấy duoc PhuongXa');
                onWatch();
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};
        function onWatch() {
            vm.data.PhuongXa.isSelected = false;
            $scope.onSelected({ data: vm.data.PhuongXa });
            $scope.value = vm.data.PhuongXa.PhuongXaId;
        };

        vm.action.onSelected = function () {
            vm.data.PhuongXa.isSelected = true;
            $scope.onSelected({ data: vm.data.PhuongXa });
            $scope.value = vm.data.PhuongXa.PhuongXaId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch = {};
            vm.inputSearch.SearchString = $select.search;
            vm.inputSearch.QuanHuyenId = $scope.quanhuyenid;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var UserId = userInfo.UserId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;
            var search = vm.inputSearch.SearchString || '';
            var PhuongXaId = vm.inputSearch.PhuongXaId || 0;
            var QuanHuyenId = vm.inputSearch.QuanHuyenId || 0;
            var FunctionCode = $scope.functionCode || '';

            return $q(function (resolve, reject) {
                service.GetComboboxById(UserId, NhanVienId, search, PhuongXaId, QuanHuyenId, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.PhuongXaListDisplay = success.data.data;
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