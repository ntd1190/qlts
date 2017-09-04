(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboLoaiTaiSan', function () {
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

    function controller($scope, $http, LoaiTaiSanService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = LoaiTaiSanService, userInfo, LoaiTaiSanId = 0;

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
            $timeout(function () {
                onInitView($scope.config);
                LoaiTaiSanId = $scope.value || 0;
                console.log($scope.value);
                getPage().then(function () {
                    if (!vm.data.LoaiTaiSanListDisplay && vm.data.LoaiTaiSanListDisplay.length == 0) { return; }
                    for (var nuoc in vm.data.LoaiTaiSanListDisplay) {
                        if (vm.data.LoaiTaiSanListDisplay[nuoc].LoaiId == LoaiTaiSanId) {
                            vm.data.LoaiTaiSan = vm.data.LoaiTaiSanListDisplay[nuoc];
                            return;
                        }
                    }
                });
            }, 0);
            
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.LoaiTaiSan });
            $scope.value = vm.data.LoaiTaiSan.LoaiId
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
                            vm.data.LoaiTaiSanListDisplay = success.data.data;
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