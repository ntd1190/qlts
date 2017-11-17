(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboHangHoa', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                input: '<',
                config: '<',
                value: '=',
                maHangHoa: '=',
                disabled: '<',
                functionCode: '@',
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, $http, HangHoaService, $q, $timeout) {

        /*** PRIVATE ***/

        var vm = this,
            service = HangHoaService, userInfo;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};
        vm.inputSearch.SearchString = '';
        vm.inputSearch.HangHoaId = 0;
        vm.inputSearch.MaHangHoa = '';

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

            if (newValue == oldValue && vm.data.HangHoa) {
                if (typeof vm.data.HangHoa.HangHoaId !== 'undefined')
                    return;
            }
            if (!newValue) {
                vm.data.HangHoa = {};
                return;
            }
            vm.inputSearch = {};
            vm.inputSearch.HangHoaId = newValue;

            getPage().then(function (success) {
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.HangHoa = success.data.data[0];
                } else {
                    delete vm.data.HangHoa;
                    vm.data.HangHoa = {};
                }
                console.log('_________________________________lấy duoc HangHoa');
                $scope.onSelected({ data: vm.data.HangHoa });
            });
        });

        $scope.$watch('maHangHoa', function (newValue, oldValue) {
            if (!newValue) { return; }
            delete vm.inputSearch;
            vm.inputSearch = {};
            vm.inputSearch.MaHangHoa = newValue;
            getPage().then(function (success) {
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.HangHoa = success.data.data[0];
                } else {
                    delete vm.data.HangHoa;
                    vm.data.HangHoa = {};
                }
                $scope.onSelected({ data: vm.data.HangHoa });
            });
        });

        activate()
        function activate() {
            onInitView($scope.config);

        }


        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.HangHoa });
            $scope.value = vm.data.HangHoa.HangHoaId;
        };
        vm.action.search = function ($select) {
            $select.search = $select.search || '';
            vm.inputSearch = {};
            vm.inputSearch.SearchString = $select.search;
            getPage();
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var UserId = userInfo.UserId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;
            var search = vm.inputSearch.SearchString || '';
            var HangHoaId = vm.inputSearch.HangHoaId || 0;
            var MaHangHoa = vm.inputSearch.MaHangHoa || '';
            var FunctionCode = $scope.functionCode || '';

            return $q(function (resolve, reject) {
                service.GetComboboxById(UserId, NhanVienId, search, HangHoaId, MaHangHoa, FunctionCode)
                    .then(function (success) {

                        vm.status.isLoading = false;
                        if (success.data.data) {
                            vm.data.HangHoaListDisplay = success.data.data;
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