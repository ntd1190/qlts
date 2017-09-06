(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = { 
            KhoCongNoKhachHangFilter: 'KhoCongNoKhachHangFilterCtrl',
            KhoCongNoKhachHangList: 'KhoCongNoKhachHangListCtrl',
            KhoCongNoKhachHangChiTietList: 'KhoCongNoKhachHangListChiTietCtrl',
            KhachHangListPopup: 'KhachHangListPopup',


        }

        vm.onInitView = function (config) {
            catchKhachHangPopupSearchEvent();
            catchKhoCongNoKhachHangFilterEvent();
        }

        activate();

        function activate() {
        }
        function catchKhachHangPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoCongNoKhachHangFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }
        function catchKhoCongNoKhachHangFilterEvent() {
            $scope.$on(vm.controllerId.KhoCongNoKhachHangFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoCongNoKhachHangList + '.action.get-filters', data);
            });
            $scope.$on(vm.controllerId.KhoCongNoKhachHangFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoCongNoKhachHangChiTietList + '.action.get-filters', data);
            });
        }
        
    }
})();
