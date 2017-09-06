/*****************************************************************************
1. Create Date : 2017.06.29
2. Creator     : Nguyen Thanh Binh
3. Description : khophieuxuat/list
4. History     : 2017.06.29 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        var linkUrl = '';
        vm.data = {};

        vm.controllerId = {
            KhachHangListPopup: 'KhachHangListPopup',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup',
            KhoPhieuXuatList: 'KhoPhieuXuatList',
            KhoPhieuXuatFilter: 'KhoPhieuXuatFilter',
            TuyChonCotPopup: 'TuyChonCotPhieuXuatPopup',
        }

        vm.onInitView = function (config) {
            console.log('onInitView');
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            catchKhachHangListPopupEvent();
            catchKhoPhieuXuatFilterEvent();
            KhoKhoHangListPopupEvent();
            TuyChonCotPopupEvent();
        }

        activate();

        function activate() { }

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
                console.log('F2');
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatList + '.action.F2');
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                $('#SearchCollapse').collapse('toggle');
            },

            //press F8 -> search / save
            F8: function (name, code) {
                //alert("F8");
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatFilter + '.action.F8');

            },
        };

        function TuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast(vm.controllerId.KhoPhieuXuatList + '.action.reload');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    console.log('show.bs.collapse');
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }

        function catchKhachHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (e, v) {
                var data = {};
                data.listKhachHang = v;
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatFilter + '.data.listKhachHang', data);
                $('#' + vm.controllerId.KhachHangListPopup).collapse('hide');
            });
        }
        function catchKhoPhieuXuatFilterEvent() {
            $scope.$on(vm.controllerId.KhoPhieuXuatFilter + '.data.filter', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatList + '.data.filter', v);
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatList + '.action.reload');
            });
        }

        function KhoKhoHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.KhoPhieuXuatFilter + '.data.listKhoHang', v);
                $('#' + vm.controllerId.KhoKhoHangListPopup).collapse('hide');
            });
        }
    }
})();
