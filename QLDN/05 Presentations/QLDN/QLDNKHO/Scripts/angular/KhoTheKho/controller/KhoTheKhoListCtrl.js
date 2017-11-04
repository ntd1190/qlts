    (function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoTheKhoListCtrl', KhoTheKhoListCtrl)
            .directive("keyboard", keyboard);        //HOT-KEY

    //HOT-KEY
    function keyboard($document, keyCodes) {
        return {
            link: function (scope, element, attrs) {

                var keysToHandle = scope.$eval(attrs.keyboard);
                var keyHandlers = {};

                // Registers key handlers
                angular.forEach(keysToHandle, function (callback, keyName) {
                    var keyCode = keyCodes[keyName];
                    keyHandlers[keyCode] = { callback: callback, name: keyName };
                });

                // Bind to document keydown event
                $document.on("keydown", function (event) {

                    var keyDown = keyHandlers[event.keyCode];

                    // Handler is registered
                    if (keyDown) {
                        event.preventDefault();

                        //// Invoke the handler and digest
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY
    function KhoTheKhoListCtrl($rootScope, $scope, KhoTheKhoService, $timeout, ExcelExport) {
        /* =======================================
         * PRIVATE
         */
        var vm = this;
        $rootScope.isOpenPopup = false;
        $rootScope.IsSelectAll = false;
        $rootScope.isOpenPopupTimKiem = false;
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
            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopupTimKiem) {
                    $('#panelTimkiemCollapse').collapse('show');
                    $rootScope.isOpenPopupTimKiem = true;
                } else {
                    $('#panelTimkiemCollapse').collapse('hide');
                    $rootScope.isOpenPopupTimKiem = false;
                }
            },

        };
        var controllerId = 'KhoTheKhoListCtrl';
        var _tableState;

        var error = {
            code: 0
        };
        var formatter = new Intl.NumberFormat();
        var inputSearch = {
            searchString: '',
            listKhoTheKho: [],
            dangLamViec: '',
        };



        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            pagesize: 10,
            isLoading: false,
            showList: false,
            UserLoginId: '',
            error: error,
            listKhoHang: [],
            listKhoTheKho: [],
            inputSearch: inputSearch,
            searchString: $('#tungay').val() + '|' + $('#denngay').val() + '||',

        };

        vm.action = {
            getPage: getPage,
            search: search,
            excel: excel,
            print: print,

        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() { }

        function search() {
            if (vm.data.showList) {
                getPage();
            } else {
                vm.data.showList = true;
            }
        }
        // nhận cấu hình từ giao diện
        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }
            if (config && config.HangHoaId && config.HangHoaId!=0) {
                vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '||' + config.HangHoaId;
            }

            if (config && config.HangHoaId && config.HangHoaId != 0 && config.ParamNgay && config.ParamNgay != "" && config.ParamTuNgay && config.ParamTuNgay != "") {

                $('#tungay').val(config.ParamTuNgay);

                $('#denngay').val(config.ParamNgay);

                vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '||' + config.HangHoaId;
            }
            else if (config && config.HangHoaId && config.HangHoaId != 0 && config.ParamNgay && config.ParamNgay != "") {
               
                var day = config.ParamNgay.substring(0, 2);
                var month = config.ParamNgay.substring(3, 5);
                var year = config.ParamNgay.substring(6, 11);
                var _ngay = '01' + '/' + month + '/' + year;

                $('#tungay').val(_ngay);

                $('#denngay').val(config.ParamNgay);
                
                vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '||' + config.HangHoaId;
            }

            if (config && config.showList) {
                vm.data.showList = config.showList;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }
            getPage(_tableState);
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




        function getPage(tableState) {
            vm.data.isLoading = true;
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
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = vm.data.pagesize ? vm.data.pagesize : 10;  // Number of entries showed per page.
            var sortName = 'a.HangHoaId,a.NgayTao,a.TheKhoId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = "";
            KhoTheKhoService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId).then(function (success) {
                if (success.data.data) {
                    if (success.data.data) {
                        vm.data.listKhoTheKho = success.data.data;
                        var HangHoaId = "";
                        var KhoHangId = 0;
                        var DonGiaNhap = 0;
                        var LoHang = "";
                        var appen = "";
                        var TongNhap = 0;
                        var TongTienNhap = 0;
                        var TongXuat = 0;
                        var TongTienXuat = 0;
                        var TonCuoi = 0;
                        $("#tableKhoTheKho").html(appen);
                        if (vm.data.listKhoTheKho.length > 0) {
                            if (vm.data.searchString.split('|')[2] != '' && $('#chitietkho').prop("checked")) {
                                for (var i = 0; i < vm.data.listKhoTheKho.length; i++) {
                                    var thekho = vm.data.listKhoTheKho[i];
                                    if (HangHoaId != thekho.HangHoaId) {
                                        if (HangHoaId == "") {

                                            appen = appen + "<div class='panel-body'>";
                                            appen = appen + "<h4 '><i class='ng-binding'  style='font-size: 13px;> Mặt hàng: " + thekho.TenHangHoa.replace(',00','') + "</i><i class='ng-binding' style='float:right; font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                            //appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;' > Mặt hàng: " + thekho.TenHangHoa + "</i><i class='ng-binding' style='float:right'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                            appen = appen + "</div>"
                                            appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                            appen = appen + "<thead class='bg-default text-primary'>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<th class='text-center' rowspan='2' style='width: 150px;vertical-align:middle'>Ngày</th>";
                                            for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                                var kho = vm.data.listKhoHang[j];
                                                appen = appen + "<th class='text-center' colspan='4' style='width: 150px;'>" + kho.TenKho + "</th>";
                                            }

                                            appen = appen + "<th class='text-center' rowspan='2' style='width: 100px;vertical-align:middle'>Tồn cuối</th>";
                                            appen = appen + "<th class='text-center' rowspan='2' style='width: 20px;vertical-align:middle'>Lô</th>";
                                            appen = appen + "<th class='text-center' rowspan='2' style='vertical-align:middle'>Số phiếu</th>";
                                            appen = appen + "<tr>";
                                            for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                                appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 150px;'>Tiền nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                                appen = appen + "<th class='text-center' style='width: 150px;'>Tiền xuất</th>";
                                            }
                                            appen = appen + "</tr>";
                                            appen = appen + "</tr>";
                                            appen = appen + "</thead>";
                                            appen = appen + "<tbody>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<td class='text-center' style='color:red' colspan=" + (1 + vm.data.listKhoHang.length * 4) + ">Đầu kì</td>";
                                            appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                            appen = appen + "<td class='text-center' ></td>";
                                            appen = appen + "</tr>";
                                            if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                            }
                                            else {
                                                appen = appen + "<tr>";
                                                appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                                    var kho = vm.data.listKhoHang[j];
                                                    if (kho.KhoHangId == thekho.KhoHangId) {
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                    }
                                                    else {
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                    }
                                                }
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                appen = appen + "<td style='text-align:right'>" + TonCuoi + "</td>";
                                                appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                appen = appen + "</tr>";
                                            }
                                            HangHoaId = thekho.HangHoaId;
                                        }
                                        else {
                                            appen = appen + "</tbody>";
                                            appen = appen + "</table>";
                                            appen = appen + "<div class='panel-body'>";
                                            appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;' > Mặt hàng: " + thekho.TenHangHoa.replace(',00', '') + "</i><i class='ng-binding' style='float:right ;font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                            appen = appen + "</div>"
                                            appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                            appen = appen + "<thead class='bg-default text-primary'>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<th class='text-center' rowspan='2' style='width: 150px;vertical-align:middle'>Ngày</th>";
                                            for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                                var kho = vm.data.listKhoHang[j];
                                                appen = appen + "<th class='text-center' colspan='4' style='width: 150px;'>" + kho.TenKho + "</th>";
                                            }

                                            appen = appen + "<th class='text-center' rowspan='2' style='width: 100px;vertical-align:middle'>Tồn cuối</th>";
                                            appen = appen + "<th class='text-center' rowspan='2' style='width: 20px;vertical-align:middle'>Lô</th>";
                                            appen = appen + "<th class='text-center' rowspan='2' style='vertical-align:middle'>Số phiếu</th>";
                                            appen = appen + "<tr>";
                                            for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                                appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 150px;'>Tiền nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                                appen = appen + "<th class='text-center' style='width: 150px;'>Tiền xuất</th>";
                                            }
                                            appen = appen + "</tr>";
                                            appen = appen + "</tr>";
                                            appen = appen + "</thead>";
                                            appen = appen + "<tbody>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<td class='text-center' style='color:red' colspan=" + (1 + vm.data.listKhoHang.length * 4) + ">Đầu kì</td>";
                                            appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                            appen = appen + "<td class='text-center' ></td>";
                                            appen = appen + "</tr>";
                                            if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                            }
                                            else{
                                                appen = appen + "<tr>";
                                                appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                                    var kho = vm.data.listKhoHang[j];
                                                    if (kho.KhoHangId == thekho.KhoHangId) {
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                    }
                                                    else {
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                        appen = appen + "<td style='text-align:right'></td>";
                                                    }
                                                }
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                appen = appen + "<td style='text-align:right'>" + TonCuoi + "</td>";
                                                appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                appen = appen + "</tr>";
                                            }
                                            HangHoaId = thekho.HangHoaId;
                                        }
                                    }
                                    else {
                                        appen = appen + "<tr>";
                                        appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                        for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                                            var kho = vm.data.listKhoHang[j];
                                            if (kho.KhoHangId == thekho.KhoHangId) {
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                            }
                                            else {
                                                appen = appen + "<td style='text-align:right'></td>";
                                                appen = appen + "<td style='text-align:right'></td>";
                                                appen = appen + "<td style='text-align:right'></td>";
                                                appen = appen + "<td style='text-align:right'></td>";
                                            }
                                        }
                                        TonCuoi = TonCuoi + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                        appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                        appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                        if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                        else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                        else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                        appen = appen + "</tr>";

                                    }

                                } //end for
                                appen = appen + "</tbody>";
                                appen = appen + "</table>";
                                $("#tableKhoTheKho").html(appen);

                            }/// else của check chi tiết
                            else {
                                for (var i = 0; i < vm.data.listKhoTheKho.length; i++) {
                                    var thekho = vm.data.listKhoTheKho[i];
                                    if (HangHoaId != thekho.HangHoaId) {
                                        if (HangHoaId == "") {

                                            appen = appen + "<div class='panel-body'>";
                                            appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;' > Mặt hàng: " + thekho.TenHangHoa.replace(',00', '') + "</i><i class='ng-binding' style='float:right;font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                            appen = appen + "</div>"
                                            appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                            appen = appen + "<thead class='bg-default text-primary'>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<th class='text-center' style='width: 150px;'>Ngày</th>";
                                            appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Giá nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Tiền nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Giá xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Tiền xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 100px;'>Tồn cuối</th>";
                                            appen = appen + "<th class='text-center' style='width: 20px;'>Lô</th>";
                                            appen = appen + "<th class='text-center' style='width:300px'>Số phiếu</th>";
                                            appen = appen + "</tr>";
                                            appen = appen + "</thead>";
                                            appen = appen + "<tbody>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<td class='text-center' style='color:red' colspan='7'>Đầu kì</td>";
                                            appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                            appen = appen + "<td class='text-center' ></td>";
                                            appen = appen + "</tr>";
                                            if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                            }else{
                                                appen = appen + "<tr>";
                                                appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaNhap) ==0?'':formatter.format(thekho.DonGiaNhap) ) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaXuat)==0?'':formatter.format(thekho.DonGiaXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                                appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                appen = appen + "</tr>";
                                            }
                                            HangHoaId = thekho.HangHoaId;
                                            DonGiaNhap = thekho.DonGiaNhap;
                                            LoHang = thekho.LOHANG;
                                            KhoHangId = thekho.KhoHangId;
                                            TongNhap = TongNhap + thekho.SoLuongNhap;
                                            TongTienNhap = TongTienNhap + thekho.TienNhap;
                                            TongXuat = TongXuat + thekho.SoLuongXuat;
                                            TongTienXuat = TongTienXuat + thekho.TienXuat;
                                        }
                                        else // hang hoa khac ""
                                        {
                                            //============= them moi=====================================
                                            appen = appen + "</tbody>";
                                            appen = appen + "<tfoot>";
                                            appen = appen + " <tr>";
                                            appen = appen + " <td class='text-primary text-center'>Tổng cộng</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongNhap)==0?'':formatter.format(TongNhap)) + "</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienNhap)==0?'':formatter.format(TongTienNhap)) + "</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongXuat)==0?'':formatter.format(TongXuat)) + "</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienXuat)==0?'':formatter.format(TongTienXuat)) + "</td>";
                                            appen = appen + " <td style='text-align:right'></td>";
                                            appen = appen + " <td style='text-align:right'></td>";
                                            appen = appen + " <td style='text-align:right'></td>";
                                            appen = appen + " </tr>";
                                            appen = appen + " </tfoot>";
                                            appen = appen + "</table>";
                                            TongNhap = 0;
                                            TongTienNhap = 0;
                                            TongXuat = 0;
                                            TongTienXuat = 0;
                                            appen = appen + "<div class='panel-body'>";
                                            appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;'> Mặt hàng: " + thekho.TenHangHoa.replace(',00', '') + "</i><i class='ng-binding' style='float:right;font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                            appen = appen + "</div>"
                                            appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                            appen = appen + "<thead class='bg-default text-primary'>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<th class='text-center' style='width: 150px;'>Ngày</th>";
                                            appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Giá nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Tiền nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Giá xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Tiền xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 100px;'>Tồn cuối</th>";
                                            appen = appen + "<th class='text-center' style='width: 20px;'>Lô</th>";
                                            appen = appen + "<th class='text-center' style='width:300px'>Số phiếu</th>";
                                            appen = appen + "</tr>";
                                            appen = appen + "</thead>";
                                            appen = appen + "<tbody>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<td class='text-center' style='color:red' colspan='7'>Đầu kì</td>";
                                            appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                            appen = appen + "<td class='text-center' ></td>";
                                            appen = appen + "</tr>";
                                            if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                            } else {
                                                appen = appen + "<tr>";
                                                appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaNhap) ==0?'':formatter.format(thekho.DonGiaNhap) ) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaXuat)==0?'':formatter.format(thekho.DonGiaXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                                appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                appen = appen + "</tr>";
                                            }
                                            HangHoaId = thekho.HangHoaId;
                                            DonGiaNhap = thekho.DonGiaNhap;
                                            LoHang = thekho.LOHANG;
                                            KhoHangId = thekho.KhoHangId;
                                            TongNhap = TongNhap + thekho.SoLuongNhap;
                                            TongTienNhap = TongTienNhap + thekho.TienNhap;
                                            TongXuat = TongXuat + thekho.SoLuongXuat;
                                            TongTienXuat = TongTienXuat + thekho.TienXuat;
                                            //==============end them moi
                                        }
                                    }
                                    else // hang hoa id = hang hoa id
                                    {
                                        if (KhoHangId != thekho.KhoHangId)
                                        {
                                            //============= them moi=====================================
                                            appen = appen + "</tbody>";
                                            appen = appen + "<tfoot>";
                                            appen = appen + " <tr>";
                                            appen = appen + " <td class='text-primary text-center'>Tổng cộng</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongNhap)==0?'':formatter.format(TongNhap)) + "</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienNhap)==0?'':formatter.format(TongTienNhap)) + "</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongXuat)==0?'':formatter.format(TongXuat)) + "</td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                            appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienXuat)==0?'':formatter.format(TongTienXuat)) + "</td>";
                                            appen = appen + " <td style='text-align:right'></td>";
                                            appen = appen + " <td style='text-align:right'></td>";
                                            appen = appen + " <td style='text-align:right'></td>";
                                            appen = appen + " </tr>";
                                            appen = appen + " </tfoot>";
                                            appen = appen + "</table>";
                                            TongNhap = 0;
                                            TongTienNhap = 0;
                                            TongXuat = 0;
                                            TongTienXuat = 0;
                                            appen = appen + "<div class='panel-body'>";
                                            appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;'> Mặt hàng: " + thekho.TenHangHoa.replace(',00', '') + "</i><i class='ng-binding' style='float:right;font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                            appen = appen + "</div>"
                                            appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                            appen = appen + "<thead class='bg-default text-primary'>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<th class='text-center' style='width: 150px;'>Ngày</th>";
                                            appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Giá nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Tiền nhập</th>";
                                            appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Giá xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 200px;'>Tiền xuất</th>";
                                            appen = appen + "<th class='text-center' style='width: 100px;'>Tồn cuối</th>";
                                            appen = appen + "<th class='text-center' style='width: 20px;'>Lô</th>";
                                            appen = appen + "<th class='text-center' style='width:300px'>Số phiếu</th>";
                                            appen = appen + "</tr>";
                                            appen = appen + "</thead>";
                                            appen = appen + "<tbody>";
                                            appen = appen + "<tr>";
                                            appen = appen + "<td class='text-center' style='color:red' colspan='7'>Đầu kì</td>";
                                            appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                            appen = appen + "<td class='text-center' ></td>";
                                            appen = appen + "</tr>";
                                            if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                            } else {
                                                appen = appen + "<tr>";
                                                appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaNhap) ==0?'':formatter.format(thekho.DonGiaNhap) ) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaXuat)==0?'':formatter.format(thekho.DonGiaXuat)) + "</td>";
                                                appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                                appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                appen = appen + "</tr>";
                                            }
                                            HangHoaId = thekho.HangHoaId;
                                            DonGiaNhap = thekho.DonGiaNhap;
                                            LoHang = thekho.LOHANG;
                                            KhoHangId = thekho.KhoHangId;
                                            TongNhap = TongNhap + thekho.SoLuongNhap;
                                            TongTienNhap = TongTienNhap + thekho.TienNhap;
                                            TongXuat = TongXuat + thekho.SoLuongXuat;
                                            TongTienXuat = TongTienXuat + thekho.TienXuat;
                                            //==============end them moi
                                        }
                                        else // kho hang = kho hang
                                        {
                                            if (DonGiaNhap != thekho.DonGiaNhap) {
                                                //============= them moi=====================================
                                                appen = appen + "</tbody>";
                                                appen = appen + "<tfoot>";
                                                appen = appen + " <tr>";
                                                appen = appen + " <td class='text-primary text-center'>Tổng cộng</td>";
                                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongNhap)==0?'':formatter.format(TongNhap)) + "</td>";
                                                appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienNhap)==0?'':formatter.format(TongTienNhap)) + "</td>";
                                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongXuat)==0?'':formatter.format(TongXuat)) + "</td>";
                                                appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienXuat)==0?'':formatter.format(TongTienXuat)) + "</td>";
                                                appen = appen + " <td style='text-align:right'></td>";
                                                appen = appen + " <td style='text-align:right'></td>";
                                                appen = appen + " <td style='text-align:right'></td>";
                                                appen = appen + " </tr>";
                                                appen = appen + " </tfoot>";
                                                appen = appen + "</table>";
                                                TongNhap = 0;
                                                TongTienNhap = 0;
                                                TongXuat = 0;
                                                TongTienXuat = 0;
                                                appen = appen + "<div class='panel-body'>";
                                                appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;'> Mặt hàng: " + thekho.TenHangHoa.replace(',00', '') + "</i><i class='ng-binding' style='float:right;font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                                appen = appen + "</div>"
                                                appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                                appen = appen + "<thead class='bg-default text-primary'>";
                                                appen = appen + "<tr>";
                                                appen = appen + "<th class='text-center' style='width: 150px;'>Ngày</th>";
                                                appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 200px;'>Giá nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 200px;'>Tiền nhập</th>";
                                                appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                                appen = appen + "<th class='text-center' style='width: 200px;'>Giá xuất</th>";
                                                appen = appen + "<th class='text-center' style='width: 200px;'>Tiền xuất</th>";
                                                appen = appen + "<th class='text-center' style='width: 100px;'>Tồn cuối</th>";
                                                appen = appen + "<th class='text-center' style='width: 20px;'>Lô</th>";
                                                appen = appen + "<th class='text-center' style='width:300px'>Số phiếu</th>";
                                                appen = appen + "</tr>";
                                                appen = appen + "</thead>";
                                                appen = appen + "<tbody>";
                                                appen = appen + "<tr>";
                                                appen = appen + "<td class='text-center' style='color:red' colspan='7'>Đầu kì</td>";
                                                appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                                appen = appen + "<td class='text-center' ></td>";
                                                appen = appen + "</tr>";
                                                if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                    parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                    TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                } else {
                                                    appen = appen + "<tr>";
                                                    appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaNhap) ==0?'':formatter.format(thekho.DonGiaNhap) ) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaXuat)==0?'':formatter.format(thekho.DonGiaXuat)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                    TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                    appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                                    appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                    if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                    else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                    else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                    appen = appen + "</tr>";
                                                }
                                                HangHoaId = thekho.HangHoaId;
                                                DonGiaNhap = thekho.DonGiaNhap;
                                                LoHang = thekho.LOHANG;
                                                KhoHangId = thekho.KhoHangId;
                                                TongNhap = TongNhap + thekho.SoLuongNhap;
                                                TongTienNhap = TongTienNhap + thekho.TienNhap;
                                                TongXuat = TongXuat + thekho.SoLuongXuat;
                                                TongTienXuat = TongTienXuat + thekho.TienXuat;
                                                //==============end them moi
                                            }
                                            else // don gia nhap = don gia nhap
                                            {
                                                if (LoHang != thekho.LOHANG) {
                                                    //============= them moi=====================================
                                                    appen = appen + "</tbody>";
                                                    appen = appen + "<tfoot>";
                                                    appen = appen + " <tr>";
                                                    appen = appen + " <td class='text-primary text-center'>Tổng cộng</td>";
                                                    appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongNhap)==0?'':formatter.format(TongNhap)) + "</td>";
                                                    appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                                    appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienNhap)==0?'':formatter.format(TongTienNhap)) + "</td>";
                                                    appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongXuat)==0?'':formatter.format(TongXuat)) + "</td>";
                                                    appen = appen + " <td class='text-primary' style='text-align:right'></td>";
                                                    appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienXuat)==0?'':formatter.format(TongTienXuat)) + "</td>";
                                                    appen = appen + " <td style='text-align:right'></td>";
                                                    appen = appen + " <td style='text-align:right'></td>";
                                                    appen = appen + " <td style='text-align:right'></td>";
                                                    appen = appen + " </tr>";
                                                    appen = appen + " </tfoot>";
                                                    appen = appen + "</table>";
                                                    TongNhap = 0;
                                                    TongTienNhap = 0;
                                                    TongXuat = 0;
                                                    TongTienXuat = 0;
                                                    appen = appen + "<div class='panel-body'>";
                                                    appen = appen + "<h4><i class='ng-binding' style='font-size: 13px;'> Mặt hàng: " + thekho.TenHangHoa.replace(',00', '') + "</i><i class='ng-binding' style='float:right;font-size: 13px;'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                                    appen = appen + "</div>"
                                                    appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                                    appen = appen + "<thead class='bg-default text-primary'>";
                                                    appen = appen + "<tr>";
                                                    appen = appen + "<th class='text-center' style='width: 150px;'>Ngày</th>";
                                                    appen = appen + "<th class='text-center' style='width: 50px;'>Nhập</th>";
                                                    appen = appen + "<th class='text-center' style='width: 200px;'>Giá nhập</th>";
                                                    appen = appen + "<th class='text-center' style='width: 200px;'>Tiền nhập</th>";
                                                    appen = appen + "<th class='text-center' style='width: 50px;'>Xuất</th>";
                                                    appen = appen + "<th class='text-center' style='width: 200px;'>Giá xuất</th>";
                                                    appen = appen + "<th class='text-center' style='width: 200px;'>Tiền xuất</th>";
                                                    appen = appen + "<th class='text-center' style='width: 100px;'>Tồn cuối</th>";
                                                    appen = appen + "<th class='text-center' style='width: 20px;'>Lô</th>";
                                                    appen = appen + "<th class='text-center' style='width:300px'>Số phiếu</th>";
                                                    appen = appen + "</tr>";
                                                    appen = appen + "</thead>";
                                                    appen = appen + "<tbody>";
                                                    appen = appen + "<tr>";
                                                    appen = appen + "<td class='text-center' style='color:red' colspan='7'>Đầu kì</td>";
                                                    appen = appen + "<td class='text-center' style='color:red'>" + formatter.format(thekho.TonDau) + "</td>";
                                                    appen = appen + "<td class='text-center' ></td>";
                                                    appen = appen + "</tr>";
                                                    if (parseFloat(thekho.SoLuongNhap) == 0 && parseFloat(thekho.TienNhap) == 0 &&
                                                        parseFloat(thekho.SoLuongXuat) == 0 && parseFloat(thekho.TienXuat) == 0) {
                                                        TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                    } else {
                                                        appen = appen + "<tr>";
                                                        appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaNhap) ==0?'':formatter.format(thekho.DonGiaNhap) ) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaXuat)==0?'':formatter.format(thekho.DonGiaXuat)) + "</td>";
                                                        appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                        TonCuoi = thekho.TonDau + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                        appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                                        appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                        if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                        else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                        else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                        appen = appen + "</tr>";
                                                    }
                                                    HangHoaId = thekho.HangHoaId;
                                                    DonGiaNhap = thekho.DonGiaNhap;
                                                    LoHang = thekho.LOHANG;
                                                    KhoHangId = thekho.KhoHangId;
                                                    TongNhap = TongNhap + thekho.SoLuongNhap;
                                                    TongTienNhap = TongTienNhap + thekho.TienNhap;
                                                    TongXuat = TongXuat + thekho.SoLuongXuat;
                                                    TongTienXuat = TongTienXuat + thekho.TienXuat;
                                                    //==============end them moi
                                                }
                                                else // lo hang = lo hang
                                                {
                                                    // tt
                                                    appen = appen + "<tr>";
                                                    appen = appen + "<td class='text-center' >" + thekho.NgayTao + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongNhap) == 0 ? '' : formatter.format(thekho.SoLuongNhap)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaNhap) ==0?'':formatter.format(thekho.DonGiaNhap) ) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.TienNhap) == 0 ? '' : formatter.format(thekho.TienNhap)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.SoLuongXuat)==0?'': formatter.format(thekho.SoLuongXuat)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + (formatter.format(thekho.DonGiaXuat)==0?'':formatter.format(thekho.DonGiaXuat)) + "</td>";
                                                    appen = appen + "<td style='text-align:right'>" + ( formatter.format(thekho.TienXuat) ==0?'': formatter.format(thekho.TienXuat) ) + "</td>";
                                                    TonCuoi = TonCuoi + thekho.SoLuongNhap - thekho.SoLuongXuat;
                                                    appen = appen + "<td style='text-align:right'>" + formatter.format(TonCuoi) + "</td>";
                                                    appen = appen + "<td style='text-align:left'>" + thekho.LOHANG + "</td>";
                                                    if (thekho.SoPhieu.substring(0, 2) == "NM") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieunhap/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                    else if (thekho.SoPhieu.substring(0, 2) == "XB") appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuxuat/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                    else appen = appen + "<td class='text-left' ><a  href='/QLDNKHO/khophieuchuyen/edit/" + thekho.PhieuId + "'>" + thekho.SoPhieu + "</a></td>";
                                                    appen = appen + "</tr>";
                                                    TongNhap = TongNhap + thekho.SoLuongNhap;
                                                    TongTienNhap = TongTienNhap + thekho.TienNhap;
                                                    TongXuat = TongXuat + thekho.SoLuongXuat;
                                                    TongTienXuat = TongTienXuat + thekho.TienXuat;
                                                }
                                            }
                                        }                           
                                    }
                                }//end for
                                appen = appen + "</tbody>";
                                appen = appen + "<tfoot>";
                                appen = appen + " <tr>";
                                appen = appen + " <td class='text-primary text-center'>Tổng cộng</td>";
                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongNhap)==0?'':formatter.format(TongNhap)) + "</td>";
                                appen = appen + " <td style='text-align:right'></td>";
                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongTienNhap)==0?'':formatter.format(TongTienNhap)) + "</td>";
                                appen = appen + " <td class='text-primary' style='text-align:right'>" + (formatter.format(TongXuat)==0?'':formatter.format(TongXuat)) + "</td>";
                                appen = appen + " <td style='text-align:right'></td>";
                                appen = appen + " <td class='text-primary'  style='text-align:right'>" + (formatter.format(TongTienXuat)==0?'':formatter.format(TongTienXuat)) + "</td>";
                                appen = appen + " <td style='text-align:right'></td>";
                                appen = appen + " <td style='text-align:right'></td>";
                                appen = appen + " <td style='text-align:right'></td>";
                                appen = appen + " </tr>";
                                appen = appen + " </tfoot>";
                                appen = appen + "</table>";
                                $("#tableKhoTheKho").html(appen);
                            }
                        }
                    }
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
            });
        }




        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                vm.data.searchString = data;
                vm.data.NgayKiemKho = data.split('|')[1];
            });
            $scope.$on(controllerId + '.data.listKhoHang', function (event, data) {
                vm.data.listKhoHang = data;
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });
            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getKhoTheKhoInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }


        /* =====================================
         * Utility / Helpers
         */
        function clearArray(array) {
            while (array.length) {
                array.pop();
            }
        }



        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join('|');
            result = result || '';

            return result;
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

    }
})();
