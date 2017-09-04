(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = { 
            TuyChonCotPopup: 'TuyChonCotPopup',
            NguoiDungFilter: 'NguoiDungFilterCtrl',
            NguoiDungList: 'NguoiDungListCtrl',
            NguoiDungEdit: 'NguoiDungEditCtrl',
            NhanVienListPopupSearch: 'NhanVienListPopupSearch',
            VaiTroListPopup: 'VaiTroListCtrl',
            VaiTroListPopupEdit: 'VaiTroListCtrl',
            NhanVienListPopupEdit: 'NhanVienListPopupEdit'

        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchNguoiDungListPopupEvent();
            catchNguoiDungFilterEvent();
            catchVaiTroListPopupEvent();
            catchNhanVienListPopupSearchEvent();
            catchVaiTroListPopupEditEvent();
            catchNhanVienListPopupEditEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('NguoiDungListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchVaiTroListPopupEvent() {
            $scope.$on(vm.controllerId.VaiTroListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NguoiDungFilter + '.data.listVaiTro', data);
                $('#VaiTroListPopup').collapse('hide');
            });
        }
        function catchNhanVienListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NguoiDungFilter + '.data.listNhanVienSearch', data);
                $('#NhanVienListPopupSearch').collapse('hide');
            });
            $('#NhanVienListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchNguoiDungListPopupEvent() {
            $scope.$on(vm.controllerId.NguoiDungList + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NguoiDungFilter + '.data.listNguoiDung', data);
                $('#NguoiDungListPopup').collapse('hide');
            });
        }
        function catchNguoiDungFilterEvent() {
            $scope.$on(vm.controllerId.NguoiDungFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NguoiDungList + '.action.get-filters', data);
            });

        }
        function catchVaiTroListPopupEditEvent() {
            $scope.$on(vm.controllerId.VaiTroListPopupEdit + '.action.ap-dung', function (event, data) {
              
                $rootScope.$broadcast(vm.controllerId.NguoiDungEdit + '.data.listVaiTro', data);
                $('#VaiTroListPopupEdit').collapse('hide');
            });
        }
        function catchNhanVienListPopupEditEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NguoiDungEdit + '.data.listNhanVienEdit', data);
                $('#NhanVienListPopupEdit').collapse('hide');
            });
            $('#NhanVienListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopupEdit + '.action.get-filters', { searchString: '' });
            });
        }
    }
})();
