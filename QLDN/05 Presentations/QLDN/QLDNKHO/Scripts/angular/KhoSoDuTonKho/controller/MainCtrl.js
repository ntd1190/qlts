(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = { 
            KhoSoDuTonKhoFilter: 'KhoSoDuTonKhoFilterCtrl',
            KhoSoDuTonKhoList: 'KhoSoDuTonKhoListCtrl',
            KhoHangHoaListPopup: 'KhoHangHoaListPopup',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup'


        }

        vm.onInitView = function (config) {
            catchKhoHangHoaListPopupSearchEvent();
            catchKhoKhoHangListPopupSearchEvent();
            catchKhoSoDuTonKhoFilterEvent();
        }

        activate();

        function activate() {
        }
        function catchKhoHangHoaListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangHoaListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoSoDuTonKhoFilter + '.data.listKhoHangHoa', data);
                $('#KhoHangHoaListPopup').collapse('hide');
            });
        }
        function catchKhoKhoHangListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoSoDuTonKhoFilter + '.data.listKhoKhoHang', data);
                $('#KhoKhoHangListPopup').collapse('hide');
            });
        }
        function catchKhoSoDuTonKhoFilterEvent() {
            $scope.$on(vm.controllerId.KhoSoDuTonKhoFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoSoDuTonKhoList + '.action.get-filters', data);
            });
            $scope.$on(vm.controllerId.KhoSoDuTonKhoFilter + '.data.listKhoHang', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoSoDuTonKhoList + '.data.listKhoHang', data);
            });
        }
        
    }
})();
