(function () {
    'use strict';
    var moduleKyViewDetail = angular.module('app');
    
    moduleKyViewDetail.controller('TongHopXuatNhapTonTheoKyViewDetailListCtrl', TongHopXuatNhapTonTheoKyViewDetailListCtrl);

    moduleKyViewDetail.$inject = ['TongHopXuatNhapTonTheoKyService', '$scope', '$timeout', 'utility', 'ExcelExport'];

    function TongHopXuatNhapTonTheoKyViewDetailListCtrl(TongHopXuatNhapTonTheoKyService, $scope, $timeout, utility, ExcelExport) {
        /*** PRIVATE ***/

        var vm = this;
        var _tableState;

        /*** VIEW MODEL ***/

        vm.controllerId = 'TongHopXuatNhapTonTheoKyViewDetailListCtrl';
        vm.status = {};
        vm.status.isLoading = false;

        vm.data = {};
        vm.data.listTheKho = [];
        vm.data.TuNgay = '';
        vm.data.DenNgay = '';
        vm.data.TenHangHoa = '';
        vm.data.KhoId = '';
        vm.data.GiaXuatBQ = 0;
        var isEdit = 0;
        var kyId = 0;
        var hangHoaId = 0;
        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.excel = function (tableId) {
            var exportHref = ExcelExport.tableToExcel(tableId, 'Issue');
            $timeout(function () { location.href = exportHref; }, 100);
        };

        vm.action.goBack = function () {
            window.history.back();
        };
        vm.action.print = function (printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            var css = '<style>';
            css += 'table, td, th {border: 1px solid #ddd; text-align: left; } ';
            css += 'table { border-collapse: collapse; width: 100%;}';
            css += ' th, td { padding: 15px;}';
            css += '</style>';
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /> ' + css + '</head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        };

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            //$scope.$on(vm.controllerId + '.action.refresh', function (event, data) {
            //    getPage(_tableState);
            //});
        }

        /*** API FUNCTION ***/

        function getPage(tableState) {
            vm.status.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = utility.initTableState(tableState);
                _tableState = tableState;
            }
            console.log(vm.filter);
            var data = {};
            data.KyId = kyId;
            data.HangHoaId = hangHoaId;

            TongHopXuatNhapTonTheoKyService.getListChiTietTheKhobyItem(data).then(function (result) {
                vm.status.isLoading = false;
                //console.log(result);
                delete vm.data.listTheKho;
                vm.data.listTheKho = result.data.data;
                if (vm.data.listTheKho.length > 0) {
                    vm.data.TuNgay = utility.convertDateFormat(vm.data.listTheKho[0].TuNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.DenNgay = utility.convertDateFormat(vm.data.listTheKho[0].DenNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.TenHangHoa = vm.data.listTheKho[0].TenHangHoa;
                    vm.data.KhoId = vm.data.listTheKho[0].TenKho;
                    vm.data.GiaXuatBQ = vm.data.listTheKho[0].DonGiaXuatBQ;
                }
                
            }, function (reasult) {
                vm.status.isLoading = false;
                console.log(result);
            });
        }

        function getNameKho(idKho) {
            if (idKho == 0) {
                return " tất cả các kho";
            }
            else {
                return " kho " + idKho.toString();
            }
        }
        /*** INIT FUNCTION ***/

        (function activate() {
            //getPage();
        })();

        // nhận cấu hình từ giao diện
        vm.onInitView = function (config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }


            if (config && config.showList) {
                vm.data.showList = config.showList;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }
            if (config && config.kyId) {
                kyId = config.kyId;
                hangHoaId = config.hangHoaId;
                getPage(_tableState, kyId, hangHoaId);
            }
            initEventListener();
        }
    }

    
    /*** FILTER ANGULAR ***/

    moduleKyViewDetail.filter('sumOfValue', function () {
        return function (data, key) {
            if (angular.isUndefined(data) || angular.isUndefined(key))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + parseInt(value[key], 10);
            });
            return sum;
        };
    });

})();
