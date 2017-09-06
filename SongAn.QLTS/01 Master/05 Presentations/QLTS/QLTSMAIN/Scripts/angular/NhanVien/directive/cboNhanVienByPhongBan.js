(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboNhanVienByPhongBan', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                phongbanid : '='
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, NhanVienService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = NhanVienService, userInfo, flag_run_active = false;

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
       
        $scope.$watch('value', function (newValue, oldValue) {
            console.log(userInfo);
            if (newValue == 0) {
                vm.data.NhanVien = {};
            } else {

                getPage().then(function () {
                    console.log('_________________________________________________');
                    console.log(userInfo);
                    console.log(vm.data.NhanVienListDisplay);
                    if (!vm.data.NhanVienListDisplay && vm.data.NhanVienListDisplay.length == 0) { return; }
                    for (var index in vm.data.NhanVienListDisplay) {
                        if (vm.data.NhanVienListDisplay[index].NhanVienId == newValue) {
                            vm.data.NhanVien = vm.data.NhanVienListDisplay[index];
                            return;
                        }
                    }
                });

            }
        });

        activate()
        function activate() {
            $timeout(function () {
                onInitView($scope.config);
                var NhanVienId = $scope.value || 0;
                console.log($scope.value);
                getPage().then(function () {
                    console.log(vm.data.NhanVienListDisplay);
                    if (!vm.data.NhanVienListDisplay && vm.data.NhanVienListDisplay.length == 0) { return; }
                    for (var index in vm.data.NhanVienListDisplay) {
                        if (vm.data.NhanVienListDisplay[index].NhanVienId == NhanVienId) {
                            vm.data.NhanVien = vm.data.NhanVienListDisplay[index];
                            return;
                        }
                    }
                });

            }, 500);

        }

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.NhanVien });
            $scope.value = vm.data.NhanVien.NhanVienId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch.SearchString = $select.search;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            
            //if (typeof userInfo === 'undefined')
            //    return;
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            return $q(function (resolve, reject) {
                
                service.getCombobox(CoSoId, NhanVienId, vm.inputSearch.SearchString)
                    .then(function (success) {
                        vm.status.isLoading = false;
                        console.log(success);
                        if (success.data.data) {
                            console.log('aaaaaa');
                            console.log(vm.data.NhanVien);

                            if (vm.data.NhanVien){
                                if (vm.data.NhanVien.PhongBanId + '' != $scope.phongbanid) {
                                    vm.data.NhanVien = {};
                                    $scope.value = '';
                                }
                            }
                            for (var i = 0; i < success.data.data.length;) {
                                if (success.data.data[i].PhongBanId + '' != $scope.phongbanid) {
                                    success.data.data.splice(i, 1);
                                } else { i++;}
                            }
                            vm.data.NhanVienListDisplay = success.data.data;
                            //vm.data.NhanVienListDisplay.unshift({ TenNhanVien: '.' });
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