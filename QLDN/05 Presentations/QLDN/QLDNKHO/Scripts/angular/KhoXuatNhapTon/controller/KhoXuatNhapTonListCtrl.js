(function () {
    'use strict';
    var moduleXuatTon = angular.module('app');
    moduleXuatTon.controller('KhoXuatNhapTonListCtrl', KhoXuatNhapTonListCtrl);

    moduleXuatTon.$inject = ['$rootScope', '$scope', 'KhoXuatNhapTonService', '$window', '$location', 'utility', 'ExcelExport', '$timeout'];

    function KhoXuatNhapTonListCtrl($rootScope, $scope, KhoXuatNhapTonService, $window, $location, utility, ExcelExport, $timeout) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'KhoXuatNhapTonListCtrl';
        var _tableState;
        var userInfo;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            ngayTu: moment().format("01/MM/YYYY"),
            ngayDen: moment().daysInMonth() + moment().format("/MM/YYYY"),
        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            error: error,
            listKhoXuatNhapTon: [],
            listQuyenTacVu: [],
            LoginId: '',
            
            showList: false,
            useCotListDb: false,
            inputSearch: inputSearch,
            TuNgay:'',
            DenNgay:'',
            TenKho:''
        };

        vm.action = {
            initSearch: initSearch,
            getPage: getPage,
            excel: excel,
            print: print,
            In:In
        };

        vm.onInitView = onInitView;

        activate();
        function activate() { }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.LoginId = config.userInfo.NhanVienId;
            }

            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }

        function excel(tableId) {
            var exportHref = ExcelExport.tableToExcel(tableId, 'Issue');
            $timeout(function () { location.href = exportHref; }, 100);
        }

        function print(printSectionId) {
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

        function In() {
            debugger;
            var data = {};                         
            data.searchString = inputSearch.searchString;
            data.TuNgay = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.DenNgay = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.KhoHangId = inputSearch.khoHangId == undefined ? '' : inputSearch.khoHangId;
            data.NhomHangHoaId = inputSearch.NhomHangHoaId == undefined ? '' : inputSearch.NhomHangHoaId;
            data.HangHoaId = inputSearch.HangHoaId == undefined ? '' : inputSearch.HangHoaId;
            data.LoginId = vm.data.LoginId;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptKhoXuatNhapTon&KhoId=' + data.KhoHangId + '&TuNgay=' + data.TuNgay + '&DenNgay=' + data.DenNgay + '&LoginId=' + vm.data.LoginId + '&NhomHangHoaId=' + data.NhomHangHoaId + '&HangHoaId=' + data.HangHoaId);
            $('#reportmodal').modal('show');
        };

        /* ===========================
         * FUNCTION
         */

        function search(data) {
            getFilter(data);

            //_tableState.pagination.start = 0;
            getPage(_tableState);
        }

        function initSearch() {
            if (vm.data.showList) {
                getPage();
            }
            else {
                vm.data.showList = true;
            }
        }        

        function getFilter(data) {
            inputSearch.searchString = (data && data.searchString) ? data.searchString : '';
            inputSearch.ngayTu = (data && data.ngayTu) ? data.ngayTu : '';
            inputSearch.ngayDen = (data && data.ngayDen) ? data.ngayDen : '';
            inputSearch.khoHangId = (data && data.khoHangId) ? data.khoHangId : '0';
            inputSearch.NhomHangHoaId = (data && data.NhomHangHoaId) ? data.NhomHangHoaId : '0';
            console.log(inputSearch);
        }

        function getPage(tableState) {
            vm.data.isLoading = true;
            debugger;
            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;

            var data = {};

            // chuẩn bị tham số 
            // phân trang
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.number = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = '';
            if (data.sortName != '')
                data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            // filter
            data.searchString = inputSearch.searchString;
            data.TuNgay = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.DenNgay = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.KhoHangId = inputSearch.khoHangId;
            data.NhomHangHoaId = inputSearch.NhomHangHoaId;
            data.LoginId = vm.data.LoginId;
            // end chuẩn bị tham số 

            // gọi api
            KhoXuatNhapTonService.getFilter(data)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        utility.clearArray(vm.data.listKhoXuatNhapTon);
                        while (success.data.data.length) {
                            vm.data.listKhoXuatNhapTon.push(success.data.data.shift());
                            vm.data.TuNgay = utility.convertDateFormat(vm.data.listKhoXuatNhapTon[0].TuNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                            vm.data.DenNgay = utility.convertDateFormat(vm.data.listKhoXuatNhapTon[0].DenNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                            vm.data.TenKho = vm.data.listKhoXuatNhapTon[0].TenKho;
                        }
                        //tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / data.number);//set the number of pages so the pagination can update
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });
        }

        function initTableState(tableState) {
            tableState = tableState || {};

            tableState.draw = tableState.draw || 0;

            tableState.pagination = tableState.pagination || {};
            tableState.pagination.numberOfPages = tableState.pagination.numberOfPages || 0;
            tableState.pagination.start = tableState.pagination.start || 0;
            tableState.pagination.number = tableState.pagination.number || 10;

            tableState.sort = tableState.sort || {};
            tableState.sort.predicate = '';
            tableState.sort.reverse = false;

            return tableState;
        }


        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                search(data);
            });
            $scope.$on(controllerId + '.action.getPage', function (event, data) {
                getPage(_tableState);
            });
        }

        /* =====================================
         * Utility
         */

        
    }

    moduleXuatTon.filter('sumOfValue', function () {
        return function (data, key) {
            
            if (angular.isUndefined(data) && angular.isUndefined(key))
                return 0;
            var sum = 0;

            angular.forEach(data, function (v, k) {
                sum = sum + parseFloat(v[key]);
            });
            return sum.toFixed(2);
        }
    });
})();
