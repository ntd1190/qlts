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
        vm.data.LoaiTaiSan = {};
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
            if (!newValue || vm.data.LoaiTaiSan.LoaiId == newValue) { return; }

            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.LoaiId = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.LoaiTaiSan = success.data.data[0];
                } else {
                    delete vm.data.LoaiTaiSan;
                    vm.data.LoaiTaiSan = {};
                }
                $scope.onSelected({ data: vm.data.LoaiTaiSan });
            });
        });

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function (item) {
            $scope.onSelected({ data: item });
            $scope.value = item.LoaiId;
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
            data.LoaiId = vm.inputSearch.LoaiId || 0;
            data.MaLoai = vm.inputSearch.MaLoai || '';

            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                service.getCombobox(data)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            vm.data.LoaiTaiSanListDisplay = success.data.data;
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