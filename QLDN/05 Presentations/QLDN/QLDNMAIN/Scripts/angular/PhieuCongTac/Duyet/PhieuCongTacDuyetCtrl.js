(function () {
    'use strict';

    angular.module('app')
        .controller('PhieuCongTacDuyetCtrl', controller);
    function controller($scope,$rootScope, utility, PheDuyetService) {
        var vm = this;
        var listQuyenTacVu;
        vm.action = {
            DongY: DongY,
            TuChoi: TuChoi,
        };
        vm.data = {
            userLogin: []
        }
        activate();
        function activate() { }
        /****************************************
         * INIT FUNCTION
         */
        vm.onInitView = function (config) {
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                vm.data.userLogin = config.userInfo.UserId;
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }
            initEventListener();
        }
        function initEventListener() {

            $scope.$on('PhieuCongTacDuyetCtrl.action.UpdatePhieuCongTac', function (e, PhieuDuyeId, trangThai,SoTien) {
                PheDuyetService.Update("PhieuCongTac", "NguoiDuyet = '" + vm.data.userLogin + "',MaTrangThai='PCT_" + trangThai + "',ThanhToan = '" + SoTien + "'", "PhieuCongTacId='" + PhieuDuyeId + "'");
            });
        }
        function DongY(data) {
            console.log(data)
            updatePheDuyet("_DY", "Bạn có đồng ý duyệt hay không?", data)
        }
        function TuChoi(data) {
            updatePheDuyet("_TC", "Bạn có muốn từ chối duyệt hay không?", data)
        }
        function updatePheDuyet(trangThai, msg, listPheDuyet) {
            var NguoiDuyet = vm.data.userLogin;
            var PhieuCongTacChiTietId = "";
            var PhieuCongTacId = "";
            for (var i = 0; i < listPheDuyet.length; i++) {
                var pheduyet = listPheDuyet[i];
                if (pheduyet.isSelected) {
                    if (pheduyet.MaTrangThai.substring(pheduyet.MaTrangThai.length - 2, pheduyet.MaTrangThai.length) != "DD") {
                        alert("Phiếu đã duyệt không được phép duyệt lại!");
                        return;
                    }
                    PhieuCongTacId = "PhieuCongTacId = " + pheduyet.PhieuCongTacId + "";
                    PhieuCongTacChiTietId = PhieuCongTacChiTietId + "" + pheduyet.PhieuCongTacChiTietId + ",";
                }
            }
            if (!confirm(msg)) { return; }
            PheDuyetService.Update("PhieuCongTacChiTiet", "MaTrangThai='PCTCT" + trangThai + "'", "PhieuCongTacChiTietId in (" + PhieuCongTacChiTietId.substring(0,PhieuCongTacChiTietId.length - 1) + ")");
            $rootScope.$broadcast('phieuCongTacEdit.action.reloadChiTiet', PhieuCongTacId);
        }
    }
})();