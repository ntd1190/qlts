/*****************************************************************************
1. Create Date : 2017.06.18
2. Creator     : Nguyen Ngoc Tan
3. Description : khophieuchuyen/edit
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
            KhoPhieuChuyenFilter: 'KhoPhieuChuyenFilter',
            KhoPhieuChuyenEdit: 'KhoPhieuChuyenEdit',

            KhoKhoHangXuatListPopup: 'KhoKhoHangXuatListPopup',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup',
            KhoHangHoaListPopup: 'KhoHangHoaListPopup',
            KhoTaiKhoanNoListPopup: 'KhoTaiKhoanNoListPopup',
            KhoTaiKhoanCoListPopup: 'KhoTaiKhoanCoListPopup',
            NguoiNhanListPopup: 'NguoiNhanListPopup',
            NguoiGiaoListPopup: 'NguoiGiaoListPopup',

        }

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
            console.log('activate');
        };

        vm.onInitView = function (config) {
            console.log('onInitView');

            KhoPhieuChuyenEditEvent();

            KhoKhoHangXuatListPopupEvent();
            KhoKhoHangListPopupEvent();
            KhoHangHoaListPopupEvent();

            KhoTaiKhoanNoListPopupEvent();
            KhoTaiKhoanCoListPopupEvent();

            NguoiNhanListPopupEvent();
            NguoiGiaoListPopupEvent();
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
                $scope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.action.F8');
            },
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function KhoPhieuChuyenEditEvent() {
        }

        function KhoKhoHangXuatListPopupEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangXuatListPopup + '.action.ap-dung', function (e, v) {
                debugger
                var data = {};
                data.listKhoHangXuat = v.listKhoHang;
                $scope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listKhoHangXuat', data);
                $('#' + vm.controllerId.KhoKhoHangXuatListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoKhoHangXuatListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoKhoHangXuatListPopup + '.action.refresh');
                    $('#' + vm.controllerId.KhoKhoHangXuatListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.KhoKhoHangXuatListPopup + ' input[autofocus]').val('');
                });
            });
        }
        function KhoKhoHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangListPopup + '.action.ap-dung', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listKhoHang', v);
                $('#' + vm.controllerId.KhoKhoHangListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoKhoHangListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoKhoHangListPopup + '.action.reload');
                    $('#' + vm.controllerId.KhoKhoHangListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.KhoKhoHangListPopup + ' input[autofocus]').val('');
                });
            });
        }
        function KhoHangHoaListPopupEvent() {
            $scope.$on(vm.controllerId.KhoHangHoaListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listHangHoa = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listHangHoa', data);
                $('#' + vm.controllerId.KhoHangHoaListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoHangHoaListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoHangHoaListPopup + '.action.refresh');
                    $('#' + vm.controllerId.KhoHangHoaListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.KhoHangHoaListPopup + ' input[autofocus]').val('');
                });
            });
        }
        function KhoTaiKhoanCoListPopupEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanCoListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listTaiKhoanCo = v;
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listTaiKhoanCo', data);
                $('#' + vm.controllerId.KhoTaiKhoanCoListPopup).collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanCoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanCoListPopup + '.action.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanCoListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.KhoTaiKhoanCoListPopup + ' input[autofocus]').val('');
                });
            });
        }
        function KhoTaiKhoanNoListPopupEvent() {
            $scope.$on(vm.controllerId.KhoTaiKhoanNoListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listTaiKhoanNo = v;
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listTaiKhoanNo', data);
                $('#' + vm.controllerId.KhoTaiKhoanNoListPopup).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.KhoTaiKhoanNoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.KhoTaiKhoanNoListPopup + '.action.reload');
                    $('#' + vm.controllerId.KhoTaiKhoanNoListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.KhoTaiKhoanNoListPopup + ' input[autofocus]').val('');
                });
            });
        }
        function NguoiNhanListPopupEvent() {
            $scope.$on(vm.controllerId.NguoiNhanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listNguoiNhan', data);
                $('#NguoiNhanListPopup').collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.NguoiNhanListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.NguoiNhanListPopup + '.action.reload');
                    $('#' + vm.controllerId.NguoiNhanListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.NguoiNhanListPopup + ' input[autofocus]').val('');
                });
            });
        }
        function NguoiGiaoListPopupEvent() {
            $scope.$on(vm.controllerId.NguoiGiaoListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoPhieuChuyenEdit + '.data.listNguoiGiao', data);
                $('#NguoiGiaoListPopup').collapse('hide');
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.NguoiGiaoListPopup).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.NguoiGiaoListPopup + '.action.reload');
                    $('#' + vm.controllerId.NguoiGiaoListPopup + ' input[autofocus]').focus();
                    $('#' + vm.controllerId.NguoiGiaoListPopup + ' input[autofocus]').val('');
                });
            });
        }
    }
})();
