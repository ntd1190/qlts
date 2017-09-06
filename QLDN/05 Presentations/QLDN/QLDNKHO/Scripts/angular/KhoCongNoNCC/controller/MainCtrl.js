(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = { 
            KhoCongNoNCCFilter: 'KhoCongNoNCCFilterCtrl',
            KhoCongNoNCCList: 'KhoCongNoNCCListCtrl',
            KhoCongNoNCCChiTietList: 'KhoCongNoNCCListChiTietCtrl',
            KhachHangListPopup: 'KhachHangListPopup',


        }

        vm.onInitView = function (config) {
            catchKhachHangPopupSearchEvent();
            catchKhoCongNoNCCFilterEvent();
        }

        activate();

        function activate() {
        }
        function catchKhachHangPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoCongNoNCCFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }
        function catchKhoCongNoNCCFilterEvent() {
            $scope.$on(vm.controllerId.KhoCongNoNCCFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoCongNoNCCList + '.action.get-filters', data);
            });
            $scope.$on(vm.controllerId.KhoCongNoNCCFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoCongNoNCCChiTietList + '.action.get-filters', data);
            });
        }
        
    }
})();
