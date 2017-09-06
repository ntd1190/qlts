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
            KhoPhieuChiFilter: 'KhoPhieuChiFilterCtrl',
            KhoPhieuChiList: 'KhoPhieuChiListCtrl',
            KhoPhieuChiEdit: 'KhoPhieuChiEditCtrl',
            NguoiNhanListPopup: 'NguoiNhanListPopup',
            KhachHangListPopup: 'KhachHangListPopup',
            

            NguoiNhanListPopupEdit: 'NguoiNhanListPopupEdit',
            KhachHangListPopupEdit: 'KhachHangListPopupEdit',
            KhoTaiKhoanCoListPopupEdit: 'KhoTaiKhoanCoListPopupEdit',
            KhoTaiKhoanNoListPopupEdit: 'KhoTaiKhoanNoListPopupEdit'

           
        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchKhachHangPopupSearchEvent();
            catchNguoiNhanListPopupSearchEvent();
            catchKhoPhieuChiFilterEvent();

            catchKhachHangEditPopupSearchEvent();
            catchNguoiNhanEditListPopupSearchEvent();
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
                $rootScope.$broadcast('KhoPhieuChiListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchKhachHangPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }
        function catchNguoiNhanListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiNhanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiFilter + '.data.listNguoiNhan', data);
                $('#NguoiNhanListPopup').collapse('hide');
            });
        }
        function catchKhoPhieuChiFilterEvent() {
            $scope.$on(vm.controllerId.KhoPhieuChiFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiList + '.action.get-filters', data);
            });

        }

        function catchKhachHangEditPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiEdit + '.data.listKhachHang', data);
                $('#KhachHangListPopupEdit').collapse('hide');
            });
            $('#KhachHangListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
        function catchNguoiNhanEditListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiNhanListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiEdit + '.data.listNguoiNhan', data);
                $('#NguoiNhanListPopupEdit').collapse('hide');
            });
            $('#NguoiNhanListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
        function catchKhoTaiKhoanCoListPopupEditEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanCoListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiEdit + '.data.listTaiKhoanCo', data);
                $('#KhoTaiKhoanCoListPopupEdit').collapse('hide');
            });
            $('#KhoTaiKhoanCoListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
        function catchKhoTaiKhoanNoListPopupEditEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanNoListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChiEdit + '.data.listTaiKhoanNo', data);
                $('#KhoTaiKhoanNoListPopupEdit').collapse('hide');
            });
            $('#KhoTaiKhoanNoListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }
    }
})();
