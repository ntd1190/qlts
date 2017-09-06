(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('MainCtrl', function ($scope) {
        /*** PRIVATE ***/

        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = {
            TongHopXuatNhapTonList: 'TongHopXuatNhapTonListCtrl',
            TongHopXuatNhapTonFilter: 'TongHopXuatNhapTonFilter',
            KhoHangListPopup: 'KhoKhoHangListPopup',
            HangHoaListPopup: 'HangHoaListPopup',
            KhoTheKhoListPopup: 'KhoTheKhoListPopup'
        };

        /*** HOT-KEY ***/
        vm.keys = {
            F3: function (name, code) {
                console.log('main.F3');
                $('#' + vm.controllerId.TongHopXuatNhapTonFilter + 'Collapse').collapse('toggle');
            },
            //press F8 -> search
            F8: function (name, code) {
                console.log('main.F8');
                $scope.$broadcast(vm.controllerId.TongHopXuatNhapTonFilter + '.action.F8', '');
            },
            //press ESC -> close popup
            ESC: function (name, code) {
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
            }
        };

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
            TongHopXuatNhapTonListEvent();
            TongHopXuatNhapTonFilterEvent();
            KhoHangListPopupEvent();
            HangHoaListPopupEvent();
        };

        // nhận cấu hình từ giao diện
        function onInitView(config) { }

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function TongHopXuatNhapTonListEvent() {
            $scope.$on(vm.controllerId.TongHopXuatNhapTonList + '.action.xemChiTiet', function (e, v) {
                console.log(v);
                $('#' + vm.controllerId.KhoTheKhoListPopup).collapse('show');
                $('#' + vm.controllerId.KhoTheKhoListPopup).find('input[autofocus]').focus();
                $scope.$broadcast(vm.controllerId.KhoTheKhoListPopup + '.action.get-filters', v);
                $scope.$broadcast(vm.controllerId.KhoTheKhoListPopup + '.action.refresh', '');
            });
        }

        function TongHopXuatNhapTonFilterEvent() {
            // filter yêu cầu mởi popup kho hàng
            $scope.$on(vm.controllerId.TongHopXuatNhapTonFilter + '.action.openKhoHangPopup', function (e, v) {
                console.log(v);
                $('#' + vm.controllerId.KhoHangListPopup).collapse('show');
                $('#' + vm.controllerId.KhoHangListPopup).find('input[autofocus]').focus();
                $scope.$broadcast(vm.controllerId.KhoHangListPopup + '.action.reload', '');
            });
            // filter yêu cầu mởi popup hàng hóa
            $scope.$on(vm.controllerId.TongHopXuatNhapTonFilter + '.action.openHangHoaPopup', function (e, v) {
                console.log(v);
                $('#' + vm.controllerId.HangHoaListPopup).collapse('show');
                $('#' + vm.controllerId.HangHoaListPopup).find('input[autofocus]').focus();
                $scope.$broadcast(vm.controllerId.HangHoaListPopup + '.action.refresh', '');
            });
            // nhân sự kiện search
            $scope.$on(vm.controllerId.TongHopXuatNhapTonFilter + '.action.search', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.TongHopXuatNhapTonList + '.data.filter', v);
                $scope.$broadcast(vm.controllerId.TongHopXuatNhapTonList + '.action.refresh', v);
           });
        }

        function KhoHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhoHangListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                var data = v;
                $scope.$broadcast(vm.controllerId.TongHopXuatNhapTonFilter + '.data.listKhoHang', data);
                $('#' + vm.controllerId.KhoHangListPopup).collapse('hide');
            });
        }
        function HangHoaListPopupEvent() {
            $scope.$on(vm.controllerId.HangHoaListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                var data = v;
                $scope.$broadcast(vm.controllerId.TongHopXuatNhapTonFilter + '.data.listHangHoa', data);
                $('#' + vm.controllerId.HangHoaListPopup).collapse('hide');
            });
        }
    });
})();
