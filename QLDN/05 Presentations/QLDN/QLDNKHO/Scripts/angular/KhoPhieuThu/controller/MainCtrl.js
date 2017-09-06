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
            KhoPhieuThuFilter: 'KhoPhieuThuFilterCtrl',
            KhoPhieuThuList: 'KhoPhieuThuListCtrl',
            KhoPhieuThuEdit: 'KhoPhieuThuEditCtrl',
            NguoiNopListPopup: 'NguoiNopListPopup',
            KhachHangListPopup: 'KhachHangListPopup',
            

            NguoiNopListPopupEdit: 'NguoiNopListPopupEdit',
            KhachHangListPopupEdit: 'KhachHangListPopupEdit',
            KhoTaiKhoanCoListPopupEdit: 'KhoTaiKhoanCoListPopupEdit',
            KhoTaiKhoanNoListPopupEdit: 'KhoTaiKhoanNoListPopupEdit'

           
        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchKhachHangPopupSearchEvent();
            catchNguoiNopListPopupSearchEvent();
            catchKhoPhieuThuFilterEvent();

            catchKhachHangEditPopupSearchEvent();
            catchNguoiNopEditListPopupSearchEvent();
            catchKhoTaiKhoanCoListPopupEditEvent();
            catchKhoTaiKhoanNoListPopupEditEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('KhoPhieuThuListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchKhachHangPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }
        function catchNguoiNopListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiNopListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuFilter + '.data.listNguoiNop', data);
                $('#NguoiNopListPopup').collapse('hide');
            });
        }
        function catchKhoPhieuThuFilterEvent() {
            $scope.$on(vm.controllerId.KhoPhieuThuFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuList + '.action.get-filters', data);
            });

        }

        function catchKhachHangEditPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuEdit + '.data.listKhachHang', data);
                $('#KhachHangListPopupEdit').collapse('hide');
            });
            $('#KhachHangListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
        function catchNguoiNopEditListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiNopListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuEdit + '.data.listNguoiNop', data);
                $('#NguoiNopListPopupEdit').collapse('hide');
            });
            $('#NguoiNopListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
        function catchKhoTaiKhoanCoListPopupEditEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanCoListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuEdit + '.data.listTaiKhoanCo', data);
                $('#KhoTaiKhoanCoListPopupEdit').collapse('hide');
            });
            $('#KhoTaiKhoanCoListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
        function catchKhoTaiKhoanNoListPopupEditEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanNoListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuThuEdit + '.data.listTaiKhoanNo', data);
                $('#KhoTaiKhoanNoListPopupEdit').collapse('hide');
            });
            $('#KhoTaiKhoanNoListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
    }
})();
