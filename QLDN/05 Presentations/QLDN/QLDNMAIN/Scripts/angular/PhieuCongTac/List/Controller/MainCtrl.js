(function () {
    'use strict';

    angular.module('app').controller('MainCtrl', controller);

    function controller($scope) {
        /*******************************
         * PRIVATE
         */

        var vm = this;
        var userInfo;
        var listQuyenTacVu;
        var linkUrl = '';
        /**************************************
         * VIEW MODEL
         */

        vm.ctrl = {
            PhieuCongTacFilter: 'PhieuCongTacFilter',
            NguoiDuyetListPopup: 'NguoiDuyetListPopup',
            PhieuCongTacList: 'PhieuCongTacList',
        }

        //HOT-KEY
        vm.keys = {
            //press ESC -> close popup
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
                if (checkQuyenTacVu('N')) {
                    window.location.href = linkUrl + 'create';
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                $('#' + vm.ctrl.PhieuCongTacFilter).collapse('toggle');
            },

            //press F8 -> search
            F8: function (name, code) {
                //alert("F8");
                $scope.$broadcast(vm.ctrl.PhieuCongTacFilter + '.action.callSearch', 0);
            },
        };
        //end HOT-KEY

        /***************************************************
         * INIT FUNCTION
         */
        vm.onInitView = function (config) {
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                userInfo = config.userInfo;
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
        }

        activate();

        function activate() {
            PhieuCongTacFilterEvent();
            NguoiDuyetListPopupEvent();
        };

        /*** ACTION FUNCTION ***/
        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenTacVu;

        /*** BIZ FUNCTION ***/
        function checkQuyenTacVu(quyen) {
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }
        /**************************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

        function PhieuCongTacFilterEvent() {
            $scope.$on(vm.ctrl.PhieuCongTacFilter + '.action.search', function (event, data) {
                console.log(data);
                $scope.$broadcast(vm.ctrl.PhieuCongTacList + '.action.getFilter', data);
            });
        }

        function NguoiDuyetListPopupEvent() {
            $scope.$on(vm.ctrl.NguoiDuyetListPopup + '.action.ap-dung', function (event, data) {
                $scope.$broadcast(vm.ctrl.PhieuCongTacFilter + '.nguoiDuyetList', data);
            });

        }
    }

})();