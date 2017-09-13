(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboTaiSanKeKhai', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                maTaiSan: '=',
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, TaiSanService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = TaiSanService, userInfo, LoaiKeKhai = '1|2|3|4';

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.TaiSanId = 0;
        vm.inputSearch.MaTaiSan = '';

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

        /*** EVENT FUNCTION ***/

        $scope.$watch('value', function (newValue, oldValue) {
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.TaiSanId = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.TaiSan = success.data.data[0];
                } else {
                    delete vm.data.TaiSan;
                    vm.data.TaiSan = {};
                }
                $scope.onSelected({ data: vm.data.TaiSan });
            });
        });

        $scope.$watch('maTaiSan', function (newValue, oldValue) {
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.MaTaiSan = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.TaiSan = success.data.data[0];
                } else {
                    delete vm.data.TaiSan;
                    vm.data.TaiSan = {};
                }
                $scope.onSelected({ data: vm.data.TaiSan });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function (item, model) {
            console.log(item);
            $scope.onSelected({ data: item });
            $scope.value = item.TaiSanId;
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
            var deferred = $q.defer();

            var data = {};
            data.search = vm.inputSearch.SearchString || '';
            data.TaiSanId = vm.inputSearch.TaiSanId || 0;
            data.MaTaiSan = vm.inputSearch.MaTaiSan || '';
            data.LoaiKeKhai = LoaiKeKhai;

            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;

            service.getCombobox(data)
                .then(function (success) {
                    vm.status.isLoading = false;
                    console.log(success);
                    if (success.data.data) {
                        vm.data.TaiSanListDisplay = success.data.data;
                    }
                    return deferred.resolve(success);
                }, function (error) {
                    console.log(error);
                    return deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();