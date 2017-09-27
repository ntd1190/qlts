(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboNguonNganSach', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                disabled:'<'
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, NguonNganSachService, $q) {

        /*** PRIVATE ***/

        var vm = this,
            service = NguonNganSachService, userInfo, NguonNganSachId = 0;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.data.NguonNganSach = {};

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
            if (!newValue || vm.data.NguonNganSach.NguonNganSachId == newValue) { return; }
            
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.NguonNganSachId = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.NguonNganSach = success.data.data[0];
                } else {
                    delete vm.data.NguonNganSach;
                    vm.data.NguonNganSach = {};
                }
                $scope.onSelected({ data: vm.data.NguonNganSach });
            });
        });

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function (item, model) {
            console.log(item);
            $scope.onSelected({ data: item });
            $scope.value = item.NguonNganSachId;
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
            data.NguonNganSachId = vm.inputSearch.NguonNganSachId || 0;
            data.MaNguonNganSach = vm.inputSearch.MaNguonNganSach || '';

            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getCombobox(data)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.NguonNganSachListDisplay = success.data.data;
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