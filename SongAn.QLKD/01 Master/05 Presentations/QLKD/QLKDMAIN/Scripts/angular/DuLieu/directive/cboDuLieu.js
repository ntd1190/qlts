(function () {
    'use strict';
    var module = angular.module('app');

    module.directive('cboDuLieu', function () {
        return {
            restrict: 'E',
            scope: {
                onSelected: '&',
                config: '<',
                DuLieuId: '=dulieuid',
                disabled: '<',
                functionCode: '@functioncode',
            },
            controller: controller,
            controllerAs: 'ctrl',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'directive.html';
            }
        }
    });

    function controller($scope, DuLieuService, $q, $timeout) {
        var userInfo;
        var vm = this;

        vm.status = {};

        vm.data = {};
        vm.inputSearch = {};

        /*** EVENT / INIT FUNCTION ***/

        function onInitView(config) {
            config = config || {};
            userInfo = config.userInfo || {};
        }

        activate()
        function activate() {
            onInitView($scope.config);
        }

        $scope.$watch('DuLieuId', function (newValue, oldValue) {
            newValue = newValue || 0;
            vm.inputSearch = {};
            vm.inputSearch.DuLieuId = newValue;
            getPage().then(function (success) {
                if (newValue && success.data.data && success.data.data.length == 1) {
                    vm.data.objSelected = success.data.data[0];
                    vm.action.onSelected();
                } else {
                    delete vm.data.objSelected; vm.data.objSelected = {};
                }
            });
        });

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.onSelected = function () {
            $scope.onSelected({ data: vm.data.objSelected });
            $scope.DuLieuId = vm.data.objSelected.DuLieuId;
        };
        vm.action.search = function ($select) {
            vm.inputSearch = {};
            vm.inputSearch.search = $select.search;
            getPage().then(function (success) {
                vm.data.listDisplay.unshift({ DuLieuId: 0, TenDuLieu: 'Chọn dữ liệu' });
            });
        }

        /*** BIZ FUNCTION ***/

        /*** API FUNCTION ***/

        function getPage() {
            var deferred = $q.defer();

            var data = {};
            data.Search = vm.inputSearch.search || '';
            data.DuLieuId = vm.inputSearch.DuLieuId || 0;

            data.FunctionCode = $scope.functionCode || '';
            data.NHANVIEN_ID = userInfo.NhanVienId || 0;
            data.USER_ID = userInfo.UserId || 0;

            DuLieuService.cbxGetPage(data).then(function (success) {
                console.log(success);
                if (success.data.data) {
                    vm.data.listDisplay = success.data.data;
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