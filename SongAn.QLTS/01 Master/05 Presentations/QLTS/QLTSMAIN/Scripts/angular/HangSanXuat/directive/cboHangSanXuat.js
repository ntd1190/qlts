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
        }

        /*** EVENT FUNCTION ***/

        $scope.$watch('value', function (newValue, oldValue) {
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.HangSanXuatId = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 1) {
                    vm.data.HangSanXuat = success.data.data[1];
                } else {
                    delete vm.data.HangSanXuat;
                    vm.data.HangSanXuat = {};
                }
                $scope.onSelected({ data: vm.data.HangSanXuat });
            });
        });

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.HangSanXuat });
            $scope.value = vm.data.HangSanXuat.HangSanXuatId;
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
            var data = {};
            data.search = vm.inputSearch.SearchString || '';
            data.HangSanXuatId = vm.inputSearch.HangSanXuatId || 0;
            data.MaHangSanXuat = vm.inputSearch.MaHangSanXuat || '';

            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getCombobox(data)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.HangSanXuatListDisplay = success.data.data;
                            vm.data.HangSanXuatListDisplay.unshift({ TenHangSanXuat:'.' });
                        }
                        return resolve(success);
                    }, function (error) {
                        vm.status.isLoading = false;
                        console.log(error);
                        vm.data.isLoading = false;
                        if (error.data.error != null) {
                            alert(error.data.error.message);
                        } else {
                            alert(error.data.Message);

                        }
                        return reject(error);
                    });
            });
        }
    }
})();