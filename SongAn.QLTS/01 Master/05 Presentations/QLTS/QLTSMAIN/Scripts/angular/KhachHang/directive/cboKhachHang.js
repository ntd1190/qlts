(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboKhachHang', function () {
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

    function controller($scope, $http, KhachHangService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = KhachHangService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.KhachHangId = 0;

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

            if (!newValue) {
                vm.data.KhachHang = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.KhachHangId = newValue;

            getPage().then(function (success) {
                console.log('________________ CBXKhachHang_________________________________');
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.KhachHang = success.data.data[0];
                } else {
                    delete vm.data.KhachHang;
                    vm.data.KhachHang = {};
                }
                $scope.onSelected({ data: vm.data.KhachHang });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            console.log('ITEM CBX KHACH HANG');
            $scope.onSelected({ data: vm.data.KhachHang });
            $scope.value = vm.data.KhachHang.KhachHangId;
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
            var KhachHangId = vm.inputSearch.KhachHangId || 0;

            return $q(function (resolve, reject) {
                service.getComboboxById(CoSoId, NhanVienId, vm.inputSearch.SearchString, KhachHangId)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.KhachHangListDisplay = success.data.data;
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