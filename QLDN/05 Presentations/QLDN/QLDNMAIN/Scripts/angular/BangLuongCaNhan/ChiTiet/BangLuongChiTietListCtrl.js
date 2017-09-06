(function () {
    'use strict';

    angular
        .module('app')
        .controller('BangLuongChiTietListCtrl', BangLuongChiTietListCtrl);


    function BangLuongChiTietListCtrl($rootScope, $scope, BangLuongCaNhanService, TuyChonCotService, $window, utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'BangLuongChiTietListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        // Create our number formatter.
        var formatter = new Intl.NumberFormat();

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            QuayLai: false,
            HoTen: '',
            UserLoginId: '',
            isLoading: false,
            showList: false,
            listBangLuong: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'TenBangLuong', TenCot: 'Tên bảng lương', DoRong: '150px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'ThangNam', TenCot: 'Tháng năm', DoRong: '70px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'ThoiGianPhatSinh', TenCot: 'Thời gian phát sinh', DoRong: '100px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-left' },
                { MaCot: 'TongThuNhap', TenCot: 'Tổng tiền', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', Formatter: formatter },
                { MaCot: 'CacKhoanKhauTru', TenCot: 'Giảm trừ', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', Formatter: formatter },
                { MaCot: 'ThucLanh', TenCot: 'Thực lãnh', DoRong: '50px', HienThiYN: true, RowSpan: 2, ColSpan: 0, CanhLe: 'text-right', Formatter: formatter },

            ],
            showList: false,
            useCotListDb: true,
            showHoanThien: true,
        };

        vm.action = {
            getPage: getPage,
            search: search,
            reset: reset,
            XemBangLuong: XemBangLuong
        };

        vm.onInitView = onInitView;

        activate();
        function activate() {

        }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                if (config.nhanVienId) { vm.data.UserLoginId = config.nhanVienId; vm.data.QuayLai = true; }
                else vm.data.UserLoginId = config.userInfo.NhanVienId;
                getPage(_tableState);
                loadCotList();
            }

            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }

        /* ===========================
         * FUNCTION
         */
        function loadCotList() {
            if (vm.data.useCotListDb) {
                TuyChonCotService.getAll('FL0006').then(function (success) {
                    if (success.data && success.data.data.length > 0) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
        }
        function xemBangLuong(id) {
            $scope.$emit(controllerId + '.action.xemBangLuong', id);
        }
        function search() {
            getPage(_tableState);
        }
        function reset() {
            $('#txtTuNgay').val('');
            $('#txtDenNgay').val('');
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
            data.sortName = tableState.sort.predicate || 'ThangNam';
            data.sortDir = '';
            if (data.sortName != '')
                data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';


            // filter
            data.NhanVienIds = vm.data.UserLoginId;
            data.NgayBatDau = $('#txtTuNgay').val() != '' ? utility.convertDateFormat($('#txtTuNgay').val(), 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.NgayKetThuc = $('#txtDenNgay').val() != '' ? utility.convertDateFormat($('#txtDenNgay').val(), 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.XoaYN = 'N';
            // end chuẩn bị tham số 
            // gọi api
            BangLuongCaNhanService.getFilter(data)

                .then(function (success) {
                    if (success.data.metaData.draw == data.draw && success.data.data) {
                        utility.clearArray(vm.data.listBangLuong);
                        if (success.data.data.length > 0) {
                            vm.data.HoTen = success.data.data[0].MaNhanVien + "-" + success.data.data[0].HoTenNhanVien;
                        }
                        var formatter = new Intl.NumberFormat();
                        for (var i = 0; i < success.data.data.length; i++) {
                            success.data.data[i].ThangNam = utility.convertDateFormat(success.data.data[i].ThangNam, 'YYYY-MM-DD', 'MM/YYYY');
                            success.data.data[i].ThoiGianPhatSinh = utility.convertDateFormat(success.data.data[i].NgayBatDau, 'YYYY-MM-DD', 'DD/MM/YYYY') + "~" + utility.convertDateFormat(success.data.data[i].NgayKetThuc, 'YYYY-MM-DD', 'DD/MM/YYYY');
                            if (angular.isNumber(success.data.data[i].TongThuNhap)) success.data.data[i].TongThuNhap = formatter.format(success.data.data[i].TongThuNhap);
                            if (angular.isNumber(success.data.data[i].CacKhoanKhauTru)) success.data.data[i].CacKhoanKhauTru = formatter.format(success.data.data[i].CacKhoanKhauTru);
                            if (angular.isNumber(success.data.data[i].ThucLanh)) success.data.data[i].ThucLanh = formatter.format(success.data.data[i].ThucLanh);
                            vm.data.listBangLuong.push(success.data.data[i]);
                        }
                        tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / data.number);//set the number of pages so the pagination can update
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });
        }
        /* =====================================
         * $broadcast / $emit / $on
         */
        function XemBangLuong(bangluong) {
            var appen = "";
            appen = appen + "<thead>";
            appen = appen + "<tr>";
            appen = appen + "<th style='text-align:right'>Lương tháng</th>";
            appen = appen + " <td>" + bangluong.TenBangLuong + "</td>";
            appen = appen + " </tr>";
            appen = appen + "<tr>";
            appen = appen + "<th style='text-align:right'>Họ và tên</th>";
            appen = appen + "<td >" + bangluong.HoTenNhanVien + "</td>";
            appen = appen + "</tr>";
            appen = appen + "<tr>";
            appen = appen + "<th style='text-align:right'>MaNV</th>";
            appen = appen + " <td >" + bangluong.MaNhanVien + "</td>";
            appen = appen + " </tr>";
            appen = appen + "<tr>";
            appen = appen + " <th style='text-align:right'>Bộ phận</th>";
            appen = appen + " <td >" + bangluong.PhongBan + "</td>";
            appen = appen + "</tr>";
            appen = appen + " <tr>";
            appen = appen + " <th style='text-align:right'>Chức vụ</th>";
            appen = appen + " <td>" + bangluong.ChucVu + "</td>";
            appen = appen + " </tr>";
            appen = appen + " </thead>";

            appen = appen + " <tbody >";
            appen = appen + "  <tr>";
            appen = appen + "  <td style='width:250px'><span>Lương thử việc:</span></td>";
            appen = appen + "   <td><span></span></td>";
            appen = appen + " </tr>";
            appen = appen + "  <tr>";
            appen = appen + "       <td style='width:250px'><span>Lương chính thức:</span></td>";
            appen = appen + "    <td><span>" +  formatter.format(bangluong.LuongChinhThuc) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + " <tr>";
            appen = appen + "     <td style='width:250px'><span>Ngày công trong tháng:</span></td>";
            appen = appen + "   <td><span>" + bangluong.NgayCong + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + "  <tr>";
            appen = appen + "     <td style='width:250px'><span>Lương tháng:</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.LuongThang) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "  <tr>";
            appen = appen + "     <td style='width:250px'><span>&nbsp;+ Phụ cấp cơm trưa:</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TienCom) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + "  <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;+ Tiền điện thoại:</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TienDienThoai) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + "  <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;+ Tiền tăng ca:</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TienTangCa) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + " <tr>";
            appen = appen + "     <td style='width:250px'><span>&nbsp;+ Lương trách nhiệm:</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TienTrachNhiem) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + "  <tr>";
            appen = appen + "     <td style='width:250px'><span>&nbsp;+ Công tác phí:</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TienCongTacPhi) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + " <tr>";
            appen = appen + "     <td style='width:250px'><span><b>A.Tổng các khoảng thu nhập :</b></span></td>";
            appen = appen + "     <td><span>" + bangluong.TongThuNhap + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "  <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- Nghĩ phép có lương:</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.NghiCoPhep) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + " <tr>";
            appen = appen + "     <td style='width:250px'><span>&nbsp;- Nghĩ phép Không lương:</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.NghiKhongPhep) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + "  <tr>";
            appen = appen + "     <td style='width:250px'><span>&nbsp;- BHXH(8%):</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.TruBHXH) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "  <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- BHYT(1.5%):</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.TruBHYT) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "  <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- BHTN(1%):</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TruBHTN) + "</span></td>";
            appen = appen + "   </tr>";
            appen = appen + " <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- Công đoàn(1%):</span></td>";
            appen = appen + "     <td><span>" + formatter.format(bangluong.TruBHYT) + "</span></td>";
            appen = appen + " </tr>";
            appen = appen + " <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- Truy thu:</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.TruCongDoan) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "  <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- Tạm ứng lương:</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.TruTamUng) + "</span></td>";
            appen = appen + "   </tr>";
            appen = appen + "   <tr>";
            appen = appen + "       <td style='width:250px'><span>&nbsp;+ Cộng tiền:</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.TienThuong) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "   <tr>";
            appen = appen + "      <td style='width:250px'><span>&nbsp;- Trừ tiền:</span></td>";
            appen = appen + "      <td><span>" + formatter.format(bangluong.TruLuong) + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "   <tr>";
            appen = appen + "       <td style='width:250px'><span><b>B.Tổng các khoảng Khấu trừ :</b></span></td>";
            appen = appen + "      <td><span>" + bangluong.CacKhoanKhauTru + "</span></td>";
            appen = appen + "  </tr>";
            appen = appen + "  <tr>";
            appen = appen + "     <td style='width:250px'><span><b>C.Thực lãnh (A-B) :</b></span></td>";
            appen = appen + "     <td class='text-danger'><span><b><h4>" + bangluong.ThucLanh + " đ</h4></b></span></td>";
            appen = appen + "  </tr>";
            appen = appen + " </tbody>";
            $('#BangLuongChiTiet').html(appen);
            $('#BangLuongChiTietPopup').collapse('show');
        }
        function initEventListener() {
            $(document).ready(function () {
                $('#TuyChonCotPopup').on('show.bs.collapse', function () {
                    $scope.$broadcast(controllerId + '.action.refresh');
                });
            });
            $scope.$on(controllerId + '.action.ap-dung', function (event, data) {
                $('#TuyChonCotPopup').collapse('hide');
                loadCotList();
            });
        }
        /* =====================================
         * Utility
         */
    }
})();
