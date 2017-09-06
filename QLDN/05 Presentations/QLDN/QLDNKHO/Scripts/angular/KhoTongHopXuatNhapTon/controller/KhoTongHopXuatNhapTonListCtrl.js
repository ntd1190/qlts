(function () {
    'use strict';
    var module = angular.module('app');
    module.controller('TongHopXuatNhapTonListCtrl', function (KhoTongHopXuatNhapTonService, $scope, $timeout, utility, ExcelExport) {
        /*** PRIVATE ***/

        var vm = this;
        var _tableState;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoTongHopXuatNhapTonListCtrl';
        vm.status = {};
        vm.status.isLoading = false;

        vm.filter = {
            startDate: moment().startOf('month').format("DD/MM/YYYY"),
            endDate: moment().endOf('month').format("DD/MM/YYYY"),
            listHangHoa: [],
            listKhoHang: [],
            chiTietKho: false,
        };

        vm.data = {};
        vm.data.listTheKho = [];

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.excel = function (tableId) {
            var exportHref = ExcelExport.tableToExcel(tableId, 'Issue');
            $timeout(function () { location.href = exportHref; }, 100);
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

        vm.action.xemChiTiet = function (hangHoaId) {
            var data = vm.filter.startDate + '|' + vm.filter.endDate + '||' + hangHoaId;
            $scope.$emit(vm.controllerId + '.action.xemChiTiet', data);
        };
        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });
            $scope.$on(vm.controllerId + '.data.listKhoHang', function (event, data) {
                vm.data.listKhoHang = data;
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });
            $scope.$on(vm.controllerId + '.data.filter', function (event, data) {
                console.log(data);
                vm.filter.listKhoHang = data.listKhoHang;
                vm.filter.listHangHoa = data.listHangHoa;
                vm.filter.startDate = data.startDate;
                vm.filter.endDate = data.endDate;
                vm.filter.chiTietKho = data.chiTietKho;
            });
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
            data.startDate = utility.convertDateFormat(vm.filter.startDate, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.endDate = utility.convertDateFormat(vm.filter.endDate, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.KhoHangIds = vm.filter.listKhoHang ? utility.joinStr(vm.filter.listKhoHang, 'KhoHangId', '|') : '';
            data.HangHoaIds = vm.filter.listHangHoa ? utility.joinStr(vm.filter.listHangHoa, 'HangHoaId', '|') : '';

            KhoTongHopXuatNhapTonService.getPage(data).then(function (result) {
                vm.status.isLoading = false;
                console.log(result);
                delete vm.data.listTheKho;
                vm.data.listTheKho = result.data.data;
            }, function (reasult) {
                vm.status.isLoading = false;
                console.log(result);
            });
        }

        /*** INIT FUNCTION ***/

        (function activate() {
            getPage();
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

            initEventListener();
        }
    });

    /*** FILTER ANGULAR ***/

    module.filter('sumOfValue', function () {
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
