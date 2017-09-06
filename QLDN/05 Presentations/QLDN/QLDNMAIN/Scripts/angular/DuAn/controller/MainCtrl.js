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
            DuAnFilter: 'DuAnFilterCtrl',
            DuAnList: 'DuAnListCtrl',
            DuAnListPopup: 'DuAnListPopup',
            DuAnEdit: 'DuAnEditCtrl',
            NhanVienListPopupSearch: 'NhanVienListPopupSearch',
            PhongBanListPopupEdit: 'PhongBanListPopup',
            NhanVienListPopupEdit: 'NhanVienListPopupEdit',
            QuanLyListPopupEdit: 'QuanLyListPopupEdit'

        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchDuAnListPopupEvent();
            catchDuAnFilterEvent();
            catchNhanVienListPopupSearchEvent();
            catchPhongBanListPopupSearchEvent();
            catchNhanVienListPopupEditEvent();
            catchQuanLyPopupEditEvent();
            catchPhongBanPopupEditEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('DuAnListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }

        function catchNhanVienListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnFilter + '.data.listNhanVienSearch', data);
                $('#NhanVienListPopupSearch').collapse('hide');
            });
            $('#NhanVienListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchPhongBanListPopupSearchEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnFilter + '.data.listPhongBanListPopupSearch', data);
                $('#PhongBanListPopup').collapse('hide');
            });
            $('#PhongBanListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.PhongBanListPopup + '.action.get-filters', { searchString: '' });
            });
        }
        function catchDuAnListPopupEvent() {
            $scope.$on(vm.controllerId.DuAnListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnFilter + '.data.listDuAn', data);
                $('#DuAnListPopup').collapse('hide');
            });
           
        }
        function catchDuAnFilterEvent() {
            $scope.$on(vm.controllerId.DuAnFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnList + '.action.get-filters', data);
            });
            
        }
        function catchNhanVienListPopupEditEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnEdit + '.data.listNhanVienEdit', data);
                $('#NhanVienListPopupEdit').collapse('hide');
            });
            $('#NhanVienListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopupEdit + '.action.get-filters', { searchString: '' });
            });
        }
        function catchQuanLyPopupEditEvent() {
            $scope.$on(vm.controllerId.QuanLyListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnEdit + '.data.listQuanLyEdit', data);
                $('#QuanLyListPopupEdit').collapse('hide');
            });
            $('#QuanLyListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.QuanLyListPopupEdit + '.action.get-filters', { searchString: '' });
            });
        }
        function catchPhongBanPopupEditEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.DuAnEdit + '.data.listPhongBannEdit', data);
                $('#PhongBanListPopup').collapse('hide');
            });
            $('#PhongBanListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.PhongBanListPopupEdit + '.action.get-filters', { searchString: '' });
            });
        }
    }
})();
