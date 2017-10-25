(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboTaiSanTonKho', function () {
        return {
            restrict: 'E',
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            },
            scope: {
                onSelected: '&',
                config: '<',
                TaiSanId: '=taisanid',
                KhoTaiSanId: '<?khotaisanid',
                DonGia: '<?dongia',
                ThangNam: '<?thangnam',
                FunctionCode: '<?functioncode',
            },
            controller: function ($scope, $http, TaiSanService, $q, $timeout) {

                /*** PRIVATE ***/

                var vm = this,
                    service = TaiSanService, userInfo;

                /*** VIEW MODEL ***/

                vm.status = {};

                vm.data = {};
                vm.inputSearch = {};
                vm.inputSearch.SearchString = '';
                vm.inputSearch.TaiSanId = '';

                /*** INIT FUNCTION ***/

                function onInitView(config) {
                    console.log('onInitView', config, $scope);
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
                // lấy 1 tài sản
                $scope.$watchGroup(['TaiSanId', 'KhoTaiSanId', 'DonGia', 'ThangNam'], function (newValue, oldValue) {
                    if (angular.isUndefined(newValue[0])
                        || angular.isUndefined(newValue[1])
                        || angular.isUndefined(newValue[2])
                        || angular.isUndefined(newValue[3])) {
                        return;
                    }
                    //if (newValue[0] == $scope.TaiSanId.toString()
                    //    && newValue[1] == $scope.KhoTaiSanId.toString()
                    //    && newValue[2] == $scope.DonGia.toString()
                    //    && newValue[3] == $scope.ThangNam) {
                    //    return;
                    //}

                    delete vm.inputSearch;
                    vm.inputSearch = {};
                    vm.inputSearch.TaiSanId = newValue[0] || '';
                    vm.inputSearch.KhoTaiSanId = newValue[1] || '';
                    vm.inputSearch.DonGia = newValue[2] || '';
                    vm.inputSearch.ThangNam = newValue[3] || '';
                    getPage().then(function (success) {
                        if (success.data.data && success.data.data.length == 1) {
                            vm.data.TaiSan = success.data.data[0];
                        } else {
                            delete vm.data.TaiSan;
                            vm.data.TaiSan = {};
                        }
                        $scope.onSelected({ data: angular.copy(vm.data.TaiSan) });
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
                    $scope.onSelected({ data: angular.copy(item) });
                    $scope.TaiSanId = item.TaiSanId;
                };
                vm.action.search = function ($select) {
                    $select.search = $select.search || '';
                    delete vm.inputSearch;
                    vm.inputSearch = {};
                    vm.inputSearch.SearchString = $select.search;
                    vm.inputSearch.KhoTaiSanId = $scope.KhoTaiSanId || '';
                    vm.inputSearch.ThangNam = $scope.ThangNam || '';
                    getPage();
                }

                /*** BIZ FUNCTION ***/

                /*** API FUNCTION ***/

                function getPage() {
                    var deferred = $q.defer();
                    var data = {};
                    data.Search = vm.inputSearch.SearchString || '';

                    data.TaiSanId = vm.inputSearch.TaiSanId;
                    data.KhoTaiSanId = vm.inputSearch.KhoTaiSanId;
                    data.DonGia = vm.inputSearch.DonGia;
                    data.ThangNam = vm.inputSearch.ThangNam;
                    data.CoSo_Id = userInfo.CoSoId || 0;
                    data.NhanVien_Id = userInfo.NhanVienId || 0;
                    data.FunctionCode = $scope.FunctionCode || '';

                    service.getComboboxTonKho(data).then(function (success) {
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
        }
    });
})();