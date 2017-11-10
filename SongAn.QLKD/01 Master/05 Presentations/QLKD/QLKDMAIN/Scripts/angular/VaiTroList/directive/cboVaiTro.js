(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboVaiTro', function () {
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

    function controller($scope, $http, VaiTroService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = VaiTroService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.VaiTroId = 0;

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
            if (newValue == oldValue && vm.data.VaiTro) {
                if (typeof vm.data.VaiTro.VaiTroId !== 'undefined')
                    return;
            }
            if (!newValue) {
                vm.data.VaiTro = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.VaiTroId = newValue;

            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.VaiTro = success.data.data[0];
                } else {
                    delete vm.data.VaiTro;
                    vm.data.VaiTro = {};
                }
                console.log('_________________________________lấy duoc VaiTro');
                $scope.onSelected({ data: vm.data.VaiTro });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.VaiTro });
            $scope.value = vm.data.VaiTro.VaiTroId;
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
            var VaiTroId = vm.inputSearch.VaiTroId || 0;
            var FunctionCode = '' || '';

            return $q(function (resolve, reject) {
                service.GetComboboxById(UserId, NhanVienId, search, VaiTroId, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.VaiTroListDisplay = success.data.data;
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