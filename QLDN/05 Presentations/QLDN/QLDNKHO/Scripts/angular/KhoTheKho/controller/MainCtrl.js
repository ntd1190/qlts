(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = { 
            KhoTheKhoFilter: 'KhoTheKhoFilterCtrl',
            KhoTheKhoList: 'KhoTheKhoListCtrl',
            KhoHangHoaListPopup: 'KhoHangHoaListPopup',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup'


        }

        vm.onInitView = function (config) {
            catchKhoHangHoaListPopupSearchEvent();
            catchKhoKhoHangListPopupSearchEvent();
            catchKhoTheKhoFilterEvent();
        }

        activate();

        function activate() {
        }
        function catchKhoHangHoaListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangHoaListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoTheKhoFilter + '.data.listKhoHangHoa', data);
                $('#KhoHangHoaListPopup').collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoHangHoaListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoHangHoaListPopup + '.action.refresh');
                    $('#' + vm.controllerId.KhoHangHoaListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function catchKhoKhoHangListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoTheKhoFilter + '.data.listKhoKhoHang', data);
                $('#KhoKhoHangListPopup').collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoKhoHangListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoKhoHangListPopup + '.action.reload');
                    $('#' + vm.controllerId.KhoKhoHangListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function catchKhoTheKhoFilterEvent() {
            $scope.$on(vm.controllerId.KhoTheKhoFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoTheKhoList + '.action.get-filters', data);
            });
            $scope.$on(vm.controllerId.KhoTheKhoFilter + '.data.listKhoHang', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoTheKhoList + '.data.listKhoHang', data);
            });
        }
        
    }
})();
