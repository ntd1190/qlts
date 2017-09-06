/*****************************************************************************
1. Create Date : 2017.07.26
2. Creator     : Nguyen Thanh Binh
3. Description : 
4. History     : 2017.07.26 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');

    module.controller('MainCtrl', function ($scope) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;
        var linkUrl = '';

        /*** VIEW MODEL ***/

        vm.ctrl = {
            PhieuBaoHanhFilter: 'PhieuBaoHanhFilterCtrl',
            TuyChonCotPopup: 'TuyChonCotPopup',
            PhieuBaoHanhList: 'PhieuBaoHanhList'
        }

        //HOT-KEY
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                console.log('ESC');
            },

            //press F2 -> open popup
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {
                    window.location.href = linkUrl + 'create';
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                console.log('F3');
                $('#' + vm.ctrl.PhieuBaoHanhFilter + 'Collapse').collapse('toggle');
            },

            //press F8 -> search
            F8: function (name, code) {
                console.log('F8');
                $scope.$broadcast(vm.ctrl.PhieuBaoHanhFilter + '.action.search', 0);
            },
        };
        //end HOT-KEY

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
        }

        activate();

        function activate() {
            TuyChonCotPopupEvent();
            PhieuBaoHanhListEvent();
            PhieuBaoHanhFilterEvent();
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        /*** BIZ FUNCTION ***/

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /*** EMIT / BROADCAST / ON / EVENT FUNCTION ***/

        function TuyChonCotPopupEvent() {
            $(document).ready(function () {
                $('#' + vm.ctrl.TuyChonCotPopup).on('show.bs.collapse', function () {
                    console.log('show.bs.collapse');
                    $scope.$broadcast(vm.ctrl.TuyChonCotPopup + '.action.refresh');
                });
            });

        }
        function PhieuBaoHanhListEvent() {
        }
        function PhieuBaoHanhFilterEvent() {
            $scope.$on(vm.ctrl.PhieuBaoHanhFilter + '.data.filter', function (e, v) {
                console.log(vm.ctrl.PhieuBaoHanhFilter + '.data.filter');
                console.log(v);
                $scope.$broadcast(vm.ctrl.PhieuBaoHanhList + '.action.getFilter', v);
                $scope.$broadcast(vm.ctrl.PhieuBaoHanhList + '.action.reload');
            });
        }
        function TuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.ctrl.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.ctrl.TuyChonCotPopup).collapse('hide');
                $scope.$broadcast(vm.ctrl.PhieuBaoHanhList + '.action.reload');
            });

            $(document).ready(function () {
                $('#' + vm.ctrl.TuyChonCotPopup).on('show.bs.collapse', function () {
                    console.log('#' + vm.ctrl.TuyChonCotPopup + ':show.bs.collapse');
                    $scope.$broadcast(vm.ctrl.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
    });
})();