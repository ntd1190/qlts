(function () {
    'use strict';

    var module = angular.module('app');

    module.directive('cboCoSo', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                config: '<',
                disabled: '<',
                CoSoId: '=cosoid',
                functionCode: '@',
            },
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            },
            controller: function (CoSoService, $q, $scope) {

                /*** PRIVATE ***/

                var userInfo;

                /*** PUBLIC ***/

                var vm = this;
                vm.data = {};
                vm.data.CoSo = {};
                vm.inputSearch = {};
                /*** INIT FUNCTION ***/

                activate();
                function activate() {
                    console.log('activate:', '$scope', $scope);
                    onInitView($scope.config);
                }

                function onInitView(config) {
                    console.log('onInitView:', 'config', config);
                    if (config && config.NameId) {
                        vm.NameId = config.NameId;
                    }
                    if (config && config.userInfo) {
                        userInfo = config.userInfo;
                    }
                }

                /*** EVENT FUNCTION ***/

                $scope.$watch('CoSoId', function (newValue, oldValue) {
                    if (newValue == vm.data.CoSo.CoSoId) { return; }
                    delete vm.inputSearch;
                    vm.inputSearch = {};
                    vm.inputSearch.CoSoId = newValue;
                    getPage().then(function (success) {
                        delete vm.data.CoSo;
                        if (success.data.data && success.data.data.length == 1) {
                            vm.data.CoSo = success.data.data[0];
                        } else {
                            vm.data.CoSo = {};
                        }
                        $scope.onSelected({ data: vm.data.CoSo });
                    });
                });

                /*** ACTION FUNCTION ***/

                vm.action = {};

                vm.action.onSelected = function (item, model) {
                    delete vm.data.CoSo;
                    vm.data.CoSo = angular.copy(item);
                    $scope.onSelected({ data: vm.data.CoSo });
                    $scope.CoSoId = vm.data.CoSo.CoSoId;
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
                    data.search = vm.inputSearch.SearchString;
                    data.CoSoId = vm.inputSearch.CoSoId;
                    data.NhanVien_Id = userInfo.NhanVienId || 0;
                    data.CoSo_Id = userInfo.CoSoId || 0;
                    CoSoService.getPagecboCoSo(data).then(function (success) {
                        console.log('CoSoService.getPagecboCoSo:', 'success', success);
                        delete vm.data.CoSoList;
                        vm.data.CoSoList = success.data.data;
                        deferred.resolve(success);
                    });

                    return deferred.promise;
                }

                /*** HELPER FUNCTION ***/
            }
        }
    });

})();