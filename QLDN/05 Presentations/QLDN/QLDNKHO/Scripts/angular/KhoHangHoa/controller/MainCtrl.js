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
            KhoHangHoaFilter: 'KhoHangHoaFilterCtrl',
            KhoHangHoaList: 'KhoHangHoaListCtrl',
            KhoHangHoaEdit: 'KhoHangHoaEditCtrl',
            KhoNhomHangHoaListPopup: 'KhoNhomHangHoaListPopup',
            KhoLoaiHangHoaListPopup: 'KhoLoaiHangHoaListPopup',
            KhachHangListPopup: 'KhachHangListPopup',
            KhoHangSanXuatListPopup: 'KhoHangSanXuatListPopup',
            KhoNuocSanXuatListPopup: 'KhoNuocSanXuatListPopup',
            KhoHangHoaListPopup: 'KhoHangHoaListPopup',

            KhoNhomHangHoaListPopupEdit: 'KhoNhomHangHoaListPopupEdit',
            KhoLoaiHangHoaListPopupEdit: 'KhoLoaiHangHoaListPopupEdit',
            KhachHangListPopupEdit: 'KhachHangListPopupEdit',
            KhoHangSanXuatListPopupEdit: 'KhoHangSanXuatListPopupEdit',
            KhoNuocSanXuatListPopupEdit: 'KhoNuocSanXuatListPopupEdit',
        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchKhachHangPopupSearchEvent();
            catchKhoNhomHangHoaListPopupSearchEvent();
            catchKhoLoaiHangHoaListPopupSearchEvent();
            catchKhoHangSanXuatListPopupSearchEvent();
            catchKhoNuocSanXuatListPopupSearchEvent();
            catchKhoHangHoaListPopupSearchEvent();
            catchKhoHangHoaFilterEvent();

            catchKhachHangEditPopupSearchEvent();
            catchKhoNhomHangHoaEditListPopupSearchEvent();
            catchKhoLoaiHangHoaEditListPopupSearchEvent();
            catchKhoHangSanXuatEditListPopupSearchEvent();
            catchKhoNuocSanXuatEditListPopupSearchEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('KhoHangHoaListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchKhachHangPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }
        function catchKhoNhomHangHoaListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoNhomHangHoaListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaFilter + '.data.listKhoNhomHangHoa', data);
                $('#KhoNhomHangHoaListPopup').collapse('hide');
            });
        }
        function catchKhoLoaiHangHoaListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoLoaiHangHoaListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaFilter + '.data.listKhoLoaiHangHoa', data);
                $('#KhoLoaiHangHoaListPopup').collapse('hide');
            });
           
        }
        function catchKhoHangSanXuatListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangSanXuatListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaFilter + '.data.listKhoHangSanXuat', data);
                $('#KhoHangSanXuatListPopup').collapse('hide');
            });
        }
        function catchKhoNuocSanXuatListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoNuocSanXuatListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaFilter + '.data.listKhoNuocSanXuat', data);
                $('#KhoNuocSanXuatListPopup').collapse('hide');
            });
        }
        function catchKhoHangHoaListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangHoaListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaFilter + '.data.listKhoHangHoa', data);
                $('#KhoHangHoaListPopup').collapse('hide');
            });
        }
        function catchKhoHangHoaFilterEvent() {
            $scope.$on(vm.controllerId.KhoHangHoaFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaList + '.action.get-filters', data);
            });

        }

        function catchKhachHangEditPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaEdit + '.data.listKhachHang', data);
                $('#KhachHangListPopupEdit').collapse('hide');
            });
            $('#KhachHangListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchStringKhachHang").focus();
            });
        }
        function catchKhoNhomHangHoaEditListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoNhomHangHoaListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaEdit + '.data.listKhoNhomHangHoa', data);
                $('#KhoNhomHangHoaListPopupEdit').collapse('hide');
            });
            $('#KhoNhomHangHoaListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchStringNhomHang").focus();
            });
        }
        function catchKhoLoaiHangHoaEditListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoLoaiHangHoaListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaEdit + '.data.listKhoLoaiHangHoa', data);
                $('#KhoLoaiHangHoaListPopupEdit').collapse('hide');
            });
            $('#KhoLoaiHangHoaListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchStringLoaiHang").focus();
            });

        }
        function catchKhoHangSanXuatEditListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangSanXuatListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaEdit + '.data.listKhoHangSanXuat', data);
                $('#KhoHangSanXuatListPopupEdit').collapse('hide');
            });
            $('#KhoHangSanXuatListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchStringHangSanXuat").focus();
            });
        }
        function catchKhoNuocSanXuatEditListPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoNuocSanXuatListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoHangHoaEdit + '.data.listKhoNuocSanXuat', data);
                $('#KhoNuocSanXuatListPopupEdit').collapse('hide');
            });
            $('#KhoNuocSanXuatListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchStringNuocSanXuat").focus();
            });
        }


    }
})();
