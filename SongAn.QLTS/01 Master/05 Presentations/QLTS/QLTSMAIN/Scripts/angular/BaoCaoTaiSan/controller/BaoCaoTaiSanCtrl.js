(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('BaoCaoTaiSanCtrl', function () {
        var vm = this, userInfo;

        vm.error = {};
        vm.temp = {};
        vm.data = {};
        vm.data.bieuIn = 'NhaDat_TSNN';

        /*** INIT FUNCTION ***/

        activate();
        function activate() {

        };

        vm.onInitView = function (config) {
            console.log('vm.onInitView', config);
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            genYears()
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.In = function () {
            var report_name = '';
            report_name = 'rptTaiSan_' + vm.data.bieuIn;

            $('#reportmodal').find('iframe').attr('src',
                '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=' + report_name
                + '&data=|01/01/' + vm.data.Year + '||' + userInfo.CoSoId + '|' + userInfo.NhanVienId
                );

            $('#reportmodal').modal('show');
        };

        vm.action.XuatExcel = function () {
            var report_name = '';
            report_name = 'rptTaiSan_' + vm.data.bieuIn;

            $('#reportmodal').find('iframe').attr('src',
                '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=' + report_name
                + '&export=1&data=|01/01/' + vm.data.Year + '||' + userInfo.CoSoId + '|' + userInfo.NhanVienId
                );

            $('#reportmodal').modal('show');
        };

        /***EVENT FUNCTION ***/


        /*** BIZ FUNCTION ***/

        function genYears() {
            vm.data.Year = moment().format('YYYY');

            var startYear = 2015;
            var year = vm.data.Year * 1 + 5;
            delete vm.temp.Years; vm.temp.Years = [];
            for (var i = startYear; i <= year; i++) {
                vm.temp.Years.unshift(i);
            }
            console.log(startYear, year, vm.temp.Years);
        }

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            if (isEdit == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /*** API FUNCTION TÀI SẢN ***/

    });
})();
