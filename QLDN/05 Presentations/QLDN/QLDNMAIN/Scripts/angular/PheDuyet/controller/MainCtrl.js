(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {
           
        };

        vm.controllerId = {
            PheDuyetFilter: 'PheDuyetFilterCtrl',
            PheDuyetList: 'PheDuyetListCtrl',
            NguoiTaoListPopupSearch: 'NguoiTaoListPopupSearch',
            PhongBanListPopup: 'PhongBanListPopup',
            NhanVienListPopup2: 'NhanVienListPopup2Ctrl',
            NhanVienListPopup3: 'NhanVienListPopup3Ctrl',
            LoaiNghiPhepListPopup2: 'LoaiNghiPhepListPopup2Ctrl',
            NghiPhepEditPopup: 'NghiPhepEditPopupCtrl',
            NhanVienListPopup2TangCa: 'NhanVienListPopup2CtrlTangCa',
            TangCaEditPopup: 'TangCaEditPopupCtrl',

        }

        vm.onInitView = function (config) {
            catchPheDuyetListPopupEvent();
            catchPheDuyetFilterEvent();
            catchNguoiTaoListPopupSearchEvent();
            catchPhongBanListPopupSearchEvent();
            catchNhanVienListPopup2Event();
            catchNhanVienListPopup3Event();
            catchLoaiNghiPhepListPopup2Event();
            catchNghiPhepEditPopupEvent();
            catchNhanVienListPopup2EventTangCa();
            catchTangCaEditPopupEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchNguoiTaoListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiTaoListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.PheDuyetFilter + '.data.listNguoiTaoSearch', data);
                $('#NguoiTaoListPopupSearch').collapse('hide');
            });
            $('#NguoiTaoListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiTaoListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchPhongBanListPopupSearchEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.PheDuyetFilter + '.data.listPhongBanListPopupSearch', data);
                $('#PhongBanListPopup').collapse('hide');
            });
            $('#PhongBanListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.PhongBanListPopup + '.action.get-filters', { searchString: '' });
            });
        }
        function catchPheDuyetListPopupEvent() {
            $scope.$on(vm.controllerId.PheDuyetList + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.PheDuyetFilter + '.data.listPheDuyet', data);
                $('#PheDuyetListPopup').collapse('hide');
            });
            $scope.$on(vm.controllerId.PheDuyetList + '.action.xemNghiPhep', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.action.xemNghiPhep', data);
            });
            $scope.$on(vm.controllerId.PheDuyetList + '.action.xemTangCa', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.TangCaEditPopup + '.action.xemTangCa', data);
            });
        }
        function catchPheDuyetFilterEvent() {
            $scope.$on(vm.controllerId.PheDuyetFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.PheDuyetList + '.action.get-filters', data);
            });

        }
        function catchNhanVienListPopup2Event() {

            $scope.$on(vm.controllerId.NhanVienListPopup2 + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiBanGiao', data);

                $('#NhanVienListPopup2').collapse('hide');
            });

            $scope.$on(vm.controllerId.NhanVienListPopup2 + '.data.listInfo', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiBanGiao', data);
                console.log('.data.listNguoiBanGiao');
                console.log(data);
                $('#NhanVienListPopup2').collapse('hide');
            });


            $('#NhanVienListPopup2').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopup2 + '.action.get-filters', { searchString: '' });
            });
        }
        function catchNhanVienListPopup3Event() {

            $scope.$on(vm.controllerId.NhanVienListPopup3 + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiYeuCau', data);
                $('#NhanVienListPopup3').collapse('hide');
            });

            $scope.$on(vm.controllerId.NhanVienListPopup3 + '.data.listInfo', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiYeuCau', data);
                console.log('.data.listNguoiYeuCau');
                console.log(data);
                $('#NhanVienListPopup3').collapse('hide');
            });

            $('#NhanVienListPopup3').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopup3 + '.action.get-filters', { searchString: '' });
            });
        }
        function catchLoaiNghiPhepListPopup2Event() {
            $scope.$on(vm.controllerId.LoaiNghiPhepListPopup2 + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listLoaiNghiPhep', data);
                $('#LoaiNghiPhepListPopup2').collapse('hide');
            });

            $scope.$on(vm.controllerId.LoaiNghiPhepListPopup2 + '.data.listInfo', function (event, data) {
                debugger
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listLoaiNghiPhep', data);
                console.log('.data.listLoaiNghiPhep');
                console.log(data);
                $('#LoaiNghiPhepListPopup2').collapse('hide');
            });
        }

        function catchNghiPhepEditPopupEvent() {

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.getInfoBanGiao', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienListPopup2 + '.action.getInfo', data);
            });

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.getInfoYeuCau', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienListPopup3 + '.action.getInfo', data);
            });

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.getInfoLoaiNghiPhep', function (event, data) {
                debugger
                $rootScope.$broadcast(vm.controllerId.LoaiNghiPhepListPopup2 + '.action.getInfo', data);
            });
        }
        function catchNhanVienListPopup2EventTangCa() {
            $scope.$on(vm.controllerId.NhanVienListPopup2TangCa + '.data.listInfo', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.TangCaEditPopup + '.data.listNguoiYeuCau', data);
            });

        }
        function catchTangCaEditPopupEvent() {
            $scope.$on(vm.controllerId.TangCaEditPopup + '.action.getInfoYeuCau', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienListPopup2TangCa + '.action.getInfo', data);
            });
        }

    }
})();
