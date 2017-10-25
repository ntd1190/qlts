(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboNhaCungCap', function () {
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

    function controller($scope, $http, NhaCungCapService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = NhaCungCapService, userInfo, NhaCungCapId = 0;

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
            console.log('$scope.$watch:value', newValue, oldValue);
            if (angular.isUndefined(newValue)) { return; }
            console.log('$scope.$watch:OK');
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.NhaCungCapId = newValue;
            console.log('vm.inputSearch', vm.inputSearch);
            getPage().then(function (success) {
                console.log('getPage()',success);
                if (success.data.data && success.data.data.length == 2) {
                    vm.data.NhaCungCap = success.data.data[1];
                } else {
                    delete vm.data.NhaCungCap;
                    vm.data.NhaCungCap = {};
                }
                $scope.onSelected({ data: vm.data.NhaCungCap });
            });
        });

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function (item, model) {
            $scope.onSelected({ data: item });
            $scope.value = item.NhaCungCapId;
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
            data.NhaCungCapId = vm.inputSearch.NhaCungCapId;

            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getCombobox(data)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.NhaCungCapListDisplay = success.data.data;
                            vm.data.NhaCungCapListDisplay.unshift({ TenNhaCungCap: '.' });
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