(function () {
    'use strict';

    angular.module('app').controller('MainCtrl', controller);

    function controller($scope) {
        var listQuyenTacVu = [];
        var vm = this;

        vm.controllerId = {
            nhanVienListPopup: 'NhanVienListPopup',
            phieuCongTacEdit: 'phieuCongTacEdit',
            PhieuCongTacChiTietEditPopup: 'PhieuCongTacChiTietEditPopup',
        };

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
                $scope.$broadcast(vm.controllerId.phieuCongTacEdit + '.action.F2');
            },

            //press F3 -> run Quick search
            F3: function (name, code) { },

            //press F8 -> search
            F8: function (name, code) {
                //alert("F8");
                $scope.$broadcast(vm.controllerId.phieuCongTacEdit + '.action.F8');
            },
        };

        (function activate() {
            phieuCongTacEditEvent();
            nhanVienListPopupEvent();
            PhieuCongTacChiTietEditPopupEvent();
        })();

        vm.onInitView = function (config) {
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }
        };

        vm.action = {
            checkQuyenTacVu: checkQuyenTacVu
        };

        /* kiểm tra quyền tác vụ */
        function checkQuyenTacVu(quyen) {
            console.log(quyen + ':' + (listQuyenTacVu.indexOf(quyen) >= 0));
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function phieuCongTacEditEvent() {
            $scope.$on(vm.controllerId.phieuCongTacEdit + '.action.updateChiTiet', function (e, v) {
                $scope.$broadcast(vm.controllerId.PhieuCongTacChiTietEditPopup + '.action.updateChiTiet', v);
            });

            $scope.$on(vm.controllerId.phieuCongTacEdit + '.action.addChiTiet', function (e, v) {
                $scope.$broadcast(vm.controllerId.PhieuCongTacChiTietEditPopup + '.action.addChiTiet', v);
            });
        }

        function PhieuCongTacChiTietEditPopupEvent() {
            $scope.$on(vm.controllerId.PhieuCongTacChiTietEditPopup + '.action.save', function (e, v) {
                $scope.$broadcast(vm.controllerId.phieuCongTacEdit + '.action.reloadChiTiet', v);
            });
        }

        function nhanVienListPopupEvent() {
            $scope.$on(vm.controllerId.nhanVienListPopup + '.action.ap-dung', function (e, v) {
                $scope.$broadcast(vm.controllerId.phieuCongTacEdit + '.action.getNhanVien', v);
            });
        }
    };
})();