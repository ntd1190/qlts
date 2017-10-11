(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboTaiSanKeKhai', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                maTaiSan: '=',
                loaiKeKhai: '<',
                disabled: '<'
            },
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone, scope) {
                    element.append(clone);
                });
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
            service = TaiSanService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.TaiSanId = '';
        vm.inputSearch.MaTaiSan = '';
        vm.inputSearch.LoaiKeKhai = '';

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

        $scope.$watchGroup(['value', 'maTaiSan', 'loaiKeKhai'], function (newValues, oldValues) {
            console.log('$scope.$watchGroup:', 'newValues', newValues, 'oldValues', oldValues);
            if (!newValues[0] && !newValues[1] && !newValues[2]) { vm.data.TaiSan = {}; return; }
            if (newValues[0] == oldValues[0] && newValues[1] == oldValues[1] && newValues[2] == oldValues[2]) { vm.data.TaiSan = {}; return; }

            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.TaiSanId = newValues[0];
            vm.inputSearch.MaTaiSan = newValues[1];
            vm.inputSearch.LoaiKeKhai = newValues[2];
            console.log('vm.inputSearch', vm.inputSearch);
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
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
            vm.inputSearch.TaiSanId = '';
            vm.inputSearch.MaTaiSan = '';
            vm.inputSearch.SearchString = $select.search;
            vm.inputSearch.LoaiKeKhai = $scope.loaiKeKhai;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var deferred = $q.defer();

            var data = {};
            data.search = vm.inputSearch.SearchString || '';
            data.TaiSanId = vm.inputSearch.TaiSanId || '';
            data.MaTaiSan = vm.inputSearch.MaTaiSan || '';
            data.LoaiKeKhai = vm.inputSearch.LoaiKeKhai || '';

            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;

            service.getCombobox(data)
                .then(function (success) {
                    vm.status.isLoading = false;
                    console.log('service.getCombobox', success);
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