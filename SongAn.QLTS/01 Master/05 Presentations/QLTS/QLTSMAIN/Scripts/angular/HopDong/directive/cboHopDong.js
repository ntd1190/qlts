(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboHopDong', function () {
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

    function controller($scope, $http, HopDongService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = HopDongService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.HopDongId = 0;

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
            if (newValue == oldValue && vm.data.HopDong) {
                if (typeof vm.data.HopDong.HopDongId !== 'undefined')
                    return;
            }
            if (!newValue) {
                vm.data.HopDong = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.HopDongId = newValue;

            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.HopDong = success.data.data[0];
                } else {
                    delete vm.data.HopDong;
                    vm.data.HopDong = {};
                }
                console.log('_________________________________lấy duoc HopDong');
                $scope.onSelected({ data: vm.data.HopDong });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            console.log('ITEM CBX HOP DONG');
            $scope.onSelected({ data: vm.data.HopDong });
            $scope.value = vm.data.HopDong.HopDongId;
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
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;
            var search = vm.inputSearch.SearchString || '';
            var HopDongId = vm.inputSearch.HopDongId || 0;
            var FunctionCode = $scope.functionCode || 0;

            return $q(function (resolve, reject) {
                service.getComboboxById(CoSoId, NhanVienId, search, HopDongId, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.HopDongListDisplay = success.data.data;
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