/*****************************************************************************
1. Create Date : 2017.06.18
2. Creator     : Nguyen Thanh Binh
3. Description : khophieunhap/edit
4. History     : 2017.06.18 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainEditCtrl', controller);

    function controller($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = {
            KhoPhieuNhapFilter: 'KhoPhieuNhapFilter',
            KhoPhieuNhapEdit: 'KhoPhieuNhapEdit',

            KhachHangListPopup: 'KhachHangListPopup',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup',
            KhoHangHoaListPopup: 'KhoHangHoaListPopup',
            KhoTaiKhoanNoListPopup: 'KhoTaiKhoanNoListPopup',
            KhoTaiKhoanCoListPopup: 'KhoTaiKhoanCoListPopup',

            ThuKhoListPopup: 'ThuKhoListPopup',
            NguoiNhanHangListPopup: 'NguoiNhanHangListPopup',
        }

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
            console.log('activate');
        };

        vm.onInitView = function (config) {
            console.log('onInitView');

            KhoPhieuNhapEditEvent();

            KhachHangListPopupEvent();
            KhoKhoHangListPopupEvent();
            KhoHangHoaListPopupEvent();

            KhoTaiKhoanNoListPopupEvent();
            KhoTaiKhoanCoListPopupEvent();
            ThuKhoListPopupEvent();
            NguoiNhanHangListPopupEvent();
            getKhoNhapIdPopup();
        }


        /*** HOT-KEY ***/
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                //alert("ESC");
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },

            //press F2 -> open popup
            F2: function (name, code) {
                //alert("F2");
            //$('#' + vm.controllerId.KhoHangHoaListPopup).collapse('show');
            //$('#' + vm.controllerId.KhoHangHoaListPopup + ' input[autofocus]').focus();
            $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.action.F2');
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
            },

            //press F8 -> search / save
            F8: function (name, code) {
                //alert("F8");
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.action.F8');
            },
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};

        /*** BROADCAST / EMIT / ON FUNCTION ***/
        function getKhoNhapIdPopup() {
            $scope.$on(vm.controllerId.KhoPhieuNhapEdit + '.data.khonhapidPop', function (event, data) {
                console.log("asdaaaaaaaaaaaaaaaaaaaaaaaasdasd");
                vm.data.khoNhap = data;
                $scope.$broadcast(vm.controllerId.KhoHangHoaListPopup + '.data.getKhoXuat', data);
                $('#' + vm.controllerId.KhoHangHoaListPopup).collapse('show');
            });
        }
        function KhoPhieuNhapEditEvent() {
        }

        function ThuKhoListPopupEvent() {
            $scope.$on(vm.controllerId.ThuKhoListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                var data = {};
                data.listThuKho = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listThuKho', data);
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.action.refresh');
                $('#' + vm.controllerId.ThuKhoListPopup).collapse('hide');
            });
        }
        function NguoiNhanHangListPopupEvent() {
            $scope.$on(vm.controllerId.NguoiNhanHangListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                var data = {};
                data.listNguoiNhanHang = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listNguoiNhanHang', data);
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.action.refresh');
                $('#' + vm.controllerId.NguoiNhanHangListPopup).collapse('hide');
            });
        }
        function KhachHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listKhachHang = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listKhachHang', data);
                $('#' + vm.controllerId.KhachHangListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhachHangListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhachHangListPopup + '.action.refresh');
                    $('#' + vm.controllerId.KhachHangListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function KhoKhoHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangListPopup + '.action.ap-dung', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listKhoHang', v);
                $('#' + vm.controllerId.KhoKhoHangListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoKhoHangListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoKhoHangListPopup + '.action.reload');
                    $('#' + vm.controllerId.KhoKhoHangListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function KhoHangHoaListPopupEvent() {
            $scope.$on(vm.controllerId.KhoHangHoaListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listHangHoa = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listHangHoa', data);
                $('#' + vm.controllerId.KhoHangHoaListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoHangHoaListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoHangHoaListPopup + '.action.refresh');
                    $('#' + vm.controllerId.KhoHangHoaListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function KhoTaiKhoanCoListPopupEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanCoListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listTaiKhoanCo = v;
                $rootScope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listTaiKhoanCo', data);
                $('#' + vm.controllerId.KhoTaiKhoanCoListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanCoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanCoListPopup + '.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanCoListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function KhoTaiKhoanNoListPopupEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanNoListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listTaiKhoanNo = v;
                $rootScope.$broadcast(vm.controllerId.KhoPhieuNhapEdit + '.data.listTaiKhoanNo', data);
                $('#' + vm.controllerId.KhoTaiKhoanNoListPopup).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanNoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanNoListPopup + '.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanNoListPopup + ' input[autofocus]').focus();
                });
            });
        }
    }
})();
