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
                value: '='
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
            NguonNganSachId = $scope.value || 0;
            console.log($scope.value);
            getPage().then(function () {
                if (!vm.data.NguonNganSachListDisplay && vm.data.NguonNganSachListDisplay.length == 0) { return; }
                for (var nuoc in vm.data.NguonNganSachListDisplay) {
                    if (vm.data.NguonNganSachListDisplay[nuoc].NguonNganSachId === NguonNganSachId) {
                        vm.data.NguonNganSach = vm.data.NguonNganSachListDisplay[nuoc];
                        return;
                    }
                }
            });
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.NguonNganSach });
            $scope.value = vm.data.NguonNganSach.NguonNganSachId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch.SearchString = $select.search;
            if (!vm.inputSearch.SearchString) { return; }
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getCombobox(CoSoId, NhanVienId, vm.inputSearch.SearchString)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.NguonNganSachListDisplay = success.data.data;
                        }
                        resolve();
                    }, function (error) {
                        vm.status.isLoading = false;
                        console.log(error);
                        vm.data.isLoading = false;
                        if (error.data.error != null) {
                            alert(error.data.error.message);
                        } else {
                            alert(error.data.Message);

                        }
                        reject();
                    });
            });
        }
    }
})();