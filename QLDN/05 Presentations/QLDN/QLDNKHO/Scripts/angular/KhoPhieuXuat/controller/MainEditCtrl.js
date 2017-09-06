/*****************************************************************************
1. Create Date : 2017.06.29
2. Creator     : Nguyen Thanh Binh
3. Description : khophieuxuat/edit
4. History     : 2017.06.29 (Nguyen Thanh Binh) - tạo mới
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
            KhoPhieuXuatFilter: 'KhoPhieuXuatFilter',
            KhoPhieuXuatEdit: 'KhoPhieuXuatEdit',

            KhachHangListPopup: 'KhachHangListPopup',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup',
            KhoHangHoaListPopup: 'KhoHangHoaListPopup',
            KhoTaiKhoanNoListPopup: 'KhoTaiKhoanNoListPopup',
            KhoTaiKhoanCoListPopup: 'KhoTaiKhoanCoListPopup',
            KhoTaiKhoanKhoListPopup: 'KhoTaiKhoanKhoListPopup',
            KhoTaiKhoanGiaVonListPopup: 'KhoTaiKhoanGiaVonListPopup',

            ThuKhoListPopup: 'ThuKhoListPopup',
            NguoiGiaoHangListPopup: 'NguoiGiaoHangListPopup',
        }

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
            console.log('activate');
        };

        vm.onInitView = function (config) {
            console.log('onInitView');

            KhoPhieuXuatEditEvent();

            KhachHangListPopupEvent();
            KhoKhoHangListPopupEvent();
            KhoHangHoaListPopupEvent();

            KhoTaiKhoanNoListPopupEvent();
            KhoTaiKhoanCoListPopupEvent();
            KhoTaiKhoanKhoListPopupEvent();
            KhoTaiKhoanGiaVonListPopupEvent();

            ThuKhoListPopupEvent();
            NguoiGiaoHangListPopupEvent();
            getKhoXuatIdPopup();
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
            $('#' + vm.controllerId.KhoHangHoaListPopup).collapse('show');
            $('#' + vm.controllerId.KhoHangHoaListPopup + ' input[autofocus]').focus();
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
            },

            //press F8 -> search / save
            F8: function (name, code) {
                //alert("F8");
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.action.F8');
            },
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};

        /*** BROADCAST / EMIT / ON FUNCTION ***/
        function getKhoXuatIdPopup() {
            $scope.$on(vm.controllerId.KhoPhieuXuatEdit + '.data.khoxuatidPop', function (event, data) {
                console.log("asdaaaaaaaaaaaaaaaaaaaaaaaasdasd");
                vm.data.khoXuat = data;
                $scope.$broadcast(vm.controllerId.KhoHangHoaListPopup + '.data.getKhoXuat', data);
                $('#' + vm.controllerId.KhoHangHoaListPopup).collapse('show');
            });
        }
        function KhoPhieuXuatEditEvent() {
        }

        function ThuKhoListPopupEvent() {
            $scope.$on(vm.controllerId.ThuKhoListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                var data = {};
                data.listThuKho = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listThuKho', data);
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.action.refresh');
                $('#' + vm.controllerId.ThuKhoListPopup).collapse('hide');
            });
        }
        function NguoiGiaoHangListPopupEvent() {
            $scope.$on(vm.controllerId.NguoiGiaoHangListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                var data = {};
                data.listNguoiGiaoHang = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listNguoiGiaoHang', data);
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.action.refresh');
                $('#' + vm.controllerId.NguoiGiaoHangListPopup).collapse('hide');
            });
        }
        function KhachHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listKhachHang = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listKhachHang', data);
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
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listKhoHang', v);
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
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listHangHoa', data);
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
                $rootScope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listTaiKhoanCo', data);
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
                $rootScope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listTaiKhoanNo', data);
                $('#' + vm.controllerId.KhoTaiKhoanNoListPopup).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanNoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanNoListPopup + '.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanNoListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function KhoTaiKhoanKhoListPopupEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanKhoListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listTaiKhoanKho = v;
                $rootScope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listTaiKhoanKho', data);
                $rootScope.$broadcast(vm.controllerId.KhoTaiKhoanKhoListPopup + '.action.listTaiKhoanKho', data);
                $('#' + vm.controllerId.KhoTaiKhoanKhoListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanKhoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanKhoListPopup + '.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanKhoListPopup + ' input[autofocus]').focus();
                });
            });
        }
        function KhoTaiKhoanGiaVonListPopupEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanGiaVonListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listTaiKhoanGiaVon = v;
                $rootScope.$broadcast(vm.controllerId.KhoPhieuXuatEdit + '.data.listTaiKhoanGiaVon', data);
                $('#' + vm.controllerId.KhoTaiKhoanGiaVonListPopup).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanGiaVonListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanGiaVonListPopup + '.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanGiaVonListPopup + ' input[autofocus]').focus();
                });
            });
        }
    }
})();
