(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportTheoBangLuongCtrl', ReportTheoBangLuongCtrl)
        .filter('sumOfValue', function () {
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

    function ReportTheoBangLuongCtrl($rootScope, $scope, BangLuongCaNhanService,BangLuongService, $window, utility, ExcelExport, $timeout, $http) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'ReportTheoBangLuongCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            Calculate: false,
            BangLuongId: '',
            CtrVersion: 0,
            NhanVienIds: '',
            ngayTu: '',
            ngayDen: '',
        };

        // Create our number formatter.
        var formatter= new Intl.NumberFormat();

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {


            
            listTitle:'',

            isLoading: false,
            showList: false,
            error: error,
            listBangLuong: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'MaNhanVien', TenCot: 'Mã Nhân Viên', DoRong: '150px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'HoTenNhanVien', TenCot: 'Tên Nhân Viên', DoRong: '70px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'PhongBan', TenCot: 'Phòng ban', DoRong: '140px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'ChucVu', TenCot: 'Chức vụ', DoRong: '70px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'NgayCong', TenCot: 'Ngày công', DoRong: '80px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'NgayCongTac', TenCot: 'Ngày công tác', DoRong: '70px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'NgayChamCong', TenCot: 'Chấm công', DoRong: '70px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'NgayLamThuc', TenCot: 'Ngày làm thực', DoRong: '80px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right',DinhDang: 'number'  },
                { MaCot: 'NghiCoPhep', TenCot: 'Nghỉ có phép', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'NghiKhongPhep', TenCot: 'Nghỉ không lương', DoRong: '150px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'LuongDongBHXH', TenCot: 'Lương đóng BHXH', DoRong: '70px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'LuongChinhThuc', TenCot: 'Lương chính thức', DoRong: '80px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'LuongNgay', TenCot: 'Lương ngày', DoRong: '80px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number'  },

                { MaCot: '', TenCot: 'CÁC KHOẢN THU NHẬP', DoRong: '50px', HienThiYN: false, RowSpan: 0, ColSpan: 7, CanhLe: 'text-center' },

                { MaCot: 'LuongThang', TenCot: 'Lương tháng', DoRong: '50px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TienCongTacPhi', TenCot: 'Công tác phí', DoRong: '150px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TienThuong', TenCot: 'Thưởng', DoRong: '70px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TienDienThoai', TenCot: 'Tiền điện thoại', DoRong: '140px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TienTrachNhiem', TenCot: 'Trách nhiệm', DoRong: '70px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TienCom', TenCot: 'Tiền cơm', DoRong: '70px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TienTangCa', TenCot: 'Tăng ca', DoRong: '80px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },

                { MaCot: 'TongThuNhap', TenCot: 'Tổng thu nhập', DoRong: '80px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },

                { MaCot: '', TenCot: 'CÁC KHOẢN KHẤU TRỪ', DoRong: '50px', HienThiYN: false, RowSpan: 0, ColSpan: 4, CanhLe: 'text-center' },

                { MaCot: 'TruBH', TenCot: 'BHXH + BHYT + BHTN', DoRong: '50px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TruCongDoan', TenCot: 'Công đoàn', DoRong: '50px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TruLuong', TenCot: 'Trừ lương', DoRong: '50px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'TruTamUng', TenCot: 'Tạm ứng', DoRong: '50px', HienThiYN: true, RowSpan: 0, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },

                { MaCot: 'CacKhoanKhauTru', TenCot: 'Tổng các loại khấu trừ', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'ThucLanh', TenCot: 'Thực lãnh', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', DinhDang: 'number' },
                { MaCot: 'KyTen', TenCot: 'Ký tên', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },


            ],
            showList: false,
            useCotListDb: false,
            inputSearch: inputSearch,

            showHoanThien: true,
            NgayThangNam: 'TP.Hồ Chí Minh,ngày ' + moment().format('DD') + ' tháng ' + moment().format('MM') + ' năm ' + moment().format('YYYY'),
            NgayThangNamTieuDe: ''
       };

        vm.action = {
            excel: excel,
            print: print,

            checkInValid: utility.checkInValid,
            initSearch: initSearch,
            getPage: getPage,

            xemBangLuong: xemBangLuong,

            callTinhToan: callTinhToan,
            convertDateFormat: utility.convertDateFormat,
            isNumber: utility.isNumber,
            closeWindow: closeWindow,
            refreshOpener: refreshOpener,
            updateTrangThaiBangLuong: updateTrangThaiBangLuong,
        };

        vm.onInitView = onInitView;

        activate();
        function activate() { }

        function excel(tableId) {
            var exportHref = ExcelExport.tableToExcel(tableId, 'VaiTro');
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

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                //.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                //setEnableButton();
            }

            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }

        /* ===========================
         * FUNCTION
         */

        function callTinhToan(item) {
            if (item) {
                alert("Tinh Toan cho: " + item.ID)
            }
        }

        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoaChon = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {

                }
            }
        }

        function xemBangLuong(id) {
            $scope.$emit(controllerId + '.action.xemBangLuong', id);
        }

        function search(data) {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        function initSearch() {
            inputSearch.Calculate = getParameterByName('cal');
            inputSearch.BangLuongId = getParameterByName('BangLuongId');
            inputSearch.CtrVersion = getParameterByName('CtrVersion');
            inputSearch.NhanVienIds = getParameterByName('NhanVienIds');

            if (!inputSearch.BangLuongId)
                return;

            if (!inputSearch.CtrVersion > 0)
                vm.data.showHoanThien = false;

            if (!inputSearch.NhanVienIds)
                inputSearch.NhanVienIds = '';

            if (!inputSearch.Calculate) {
                inputSearch.Calculate = false;
                vm.data.showHoanThien = false;
            }

            if (inputSearch.Calculate) {
                calculate();
            }
            else {
                getPage();
            }
        }

        function getPage(tableState) {
            vm.data.isLoading = true;

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
            data.BangLuongId = inputSearch.BangLuongId;
            data.NhanVienIds = inputSearch.NhanVienIds;
            data.MaTrangThai = '';
            data.NgayBatDau = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.NgayKetThuc = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.XoaYN = 'N';
            // end chuẩn bị tham số 

            // gọi api
            BangLuongCaNhanService.getFilter(data)

                .then(function (success) {
                    console.log(success);

                    if (success.data.metaData.draw == data.draw && success.data.data) {
                        utility.clearArray(vm.data.listBangLuong);
                        if (success.data.data.length > 0) {
                            vm.data.listTitle = success.data.data[0].TenBangLuong;
                        }

                        while (success.data.data.length) {
                            vm.data.listBangLuong.push(success.data.data.shift());
                        }
                        vm.data.NgayThangNamTieuDe = 'Từ ngày 01 đến ngày 31 tháng ' + vm.data.listBangLuong[0].NgayBatDau.split('-')[1] + ' năm ' + vm.data.listBangLuong[0].NgayBatDau.split('-')[0];
                        tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / data.number);//set the number of pages so the pagination can update
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });
        }

        function calculate() {
            vm.data.isLoading = true;

            var data = {};

            // chuẩn bị tham số 
            data.BangLuongId = inputSearch.BangLuongId;
            data.NhanVienIds = inputSearch.NhanVienIds;

            // end chuẩn bị tham số 

            // gọi api
            BangLuongCaNhanService.calculate(data)

                .then(function (success) {
                    console.log(success);

                    if (success.data.data) {
                        getPage();
                        if (success.data.data.length > 0) {
                            
                        }
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });
        }

        function updateTrangThaiBangLuong() {
            vm.data.isLoading = true;

            var data = {};

            // chuẩn bị tham số 
            data.BangLuongId = inputSearch.BangLuongId;
            data.CtrVersion = inputSearch.CtrVersion;
            data.TrangThai = 'BL_HT';

            // end chuẩn bị tham số 

            // gọi api
            BangLuongService.updateTrangThai(data)

                .then(function (success) {

                    if (success.data.data) {
                        refreshOpener();
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });
        }

        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        function closeWindow() {
            $window.close();
        }


        function refreshOpener() {
            $window.opener.location.reload();
            $window.close();
        }


        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.closePopup', function (event, data) {
                closeWindow();
            });
        }

        /* =====================================
         * Utility
         */
    }
})();
