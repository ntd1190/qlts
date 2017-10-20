(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboKhoTaiSan', function () {
        return {
            restrict: 'E',
            controllerAs: 'ctrl',
            transclude: true,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            },
            scope: {
                onSelected: '&',
                config: '<',
                KhoTaiSanId: '=khotaisanid',
                disabled: '<',
                functionCode: '@',
                multiple: '<',
            },
            controller: function ($scope, $http, $q, $timeout, KhoTaiSanService) {
                /*** PRIVATE ***/

                var userInfo;

                /*** VIEW MODEL ***/

                var vm = this;
                vm.config = {};
                vm.inputSearch = {};
                vm.data = {};
                vm.data.KhoTaiSan = {};
                vm.data.TaiSanListDisplay = [];
                vm.data.TaiSanList = [
                    { TaiSanId: 1, TenTaiSan: 'TenTaiSan 1', MaTaiSan: 'MaTaiSan 1' },
                    { TaiSanId: 2, TenTaiSan: 'TenTaiSan 2', MaTaiSan: 'MaTaiSan 2' },
                ];

                /*** INIT FUNCTION ***/

                activate()
                function activate() {
                    onInitView($scope.config);
                }
                function onInitView(config) {
                    console.log('onInitView', config, $scope);
                    config = config || {};
                    userInfo = config.userInfo || {};
                }

                /*** EVENT FUNCTION ***/

                $scope.$watch('KhoTaiSanId', function (newValue, oldValue) {
                    console.log('$scope.$watch[KhoTaiSanId]:', 'newValue=', newValue, 'oldValue=', oldValue, 'vm.data.KhoTaiSan=', vm.data.KhoTaiSan);
                    if (!newValue) { vm.data.KhoTaiSan = {}; return; }
                    delete vm.inputSearch; vm.inputSearch = {};
                    vm.inputSearch.KhoTaiSanId = newValue;
                    getPage().then(function (success) {
                        if (success.data.data && success.data.data.length > 0) {
                            vm.data.KhoTaiSan = vm.data.KhoTaiSanListDisplay[0];
                        } else {
                            delete vm.data.KhoTaiSan;
                            vm.data.KhoTaiSan = {};
                        }
                        $scope.onSelected({ data: vm.data.KhoTaiSan });
                    });
                })
                /*** ACTION FUNCTION ***/

                vm.action = {};
                vm.action.onSelected = function (item, model) {
                    $scope.KhoTaiSanId = item.KhoTaiSanId;
                    $scope.onSelected({ data: item });
                };
                vm.action.search = function ($select) {
                    console.log('vm.action.search:', '$select=', $select);
                    $select.search = $select.search || '';
                    delete vm.inputSearch; vm.inputSearch = {};
                    vm.inputSearch.Search = $select.search;
                    getPage();
                }

                /*** API FUNCTION ***/

                function getPage() {
                    var deferred = $q.defer();

                    var data = {};
                    data.KhoTaiSanIds = vm.inputSearch.KhoTaiSanId || '';
                    data.MaKhoTaiSan = vm.inputSearch.MaKhoTaiSan || '';
                    data.CoSoId = vm.inputSearch.CoSoId || '';
                    data.NhanVien_Id = userInfo.NhanVienId || 0;
                    data.CoSo_Id = userInfo.CoSoId || 0;

                    KhoTaiSanService.getCombobox(data).then(function (success) {
                        console.log('KhoTaiSanService.GetCombobox:', success);
                        vm.data.KhoTaiSanListDisplay = success.data.data;
                        deferred.resolve(success);
                    });

                    return deferred.promise;
                }
            }
        }
    });
})();