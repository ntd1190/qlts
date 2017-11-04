/*****************************************************************************
1. Create Date : 2017.07.26
2. Creator     : Nguyen Thanh Binh
3. Description : 
4. History     : 2017.07.26 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('PhieuBaoHanhListCtrl', function ($scope, utility, PhieuBaoHanhService, TuyChonCotService) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;
        var listQuyenTacVu = [];
        var _tableState;
        var maForm = 'FL0018';
        var funcCode = 'KHO0019';

        /*** VIEW MODEL ***/

        vm.controllerId = 'PhieuBaoHanhListCtrl';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.data = {};
        vm.data.listPhieuBaoHanh = [];
        vm.data.listCot = [
                { MaCot: 'SerialNo', TenCot: 'Số sê-ri', HienThiYN: true, DoRong: 100 },
                { MaCot: 'TenKhachHang', TenCot: 'Khách hàng', HienThiYN: true, DoRong: 0 },
                { MaCot: 'DienThoai', TenCot: 'Điện thoại', HienThiYN: true, DoRong: 100 },
                { MaCot: 'TenThietBi', TenCot: 'Thiết bị', HienThiYN: true, DoRong: 0 },
                { MaCot: 'NgayHen', TenCot: 'Ngày hẹn', HienThiYN: true, DoRong: 100 },
                { MaCot: 'TenTrangThaiTiepNhan', TenCot: 'Trạng thái', HienThiYN: true, DoRong: 100 },
        ];

        vm.filter = {};
        vm.filter.startDate = moment();
        vm.filter.endDate = moment();
        vm.filter.LoaiBaoHanh = 'Y';

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            console.log(config);
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            initEventListener();
            vm.data.title = 'Danh sách phiếu bảo hành ';
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.xoaChon = function () {
            console.log('xoaChon');
            if (vm.status.isLoading == true) { return; }
            if (checkQuyenUI('D') == false) { return; }

            var list = getListSelected();
            if (list.length == 0) {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục');
                return;
            }

            if (confirm('Bạn có muốn xóa các mục đã chọn không?')) {
                deleteList(list);
            }
        };
        vm.action.getPage = function (tableState) {
            loadCotList();
            getPage(tableState);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listPhieuBaoHanh);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listPhieuBaoHanh, !vm.status.isSelectedAll);
        };

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.getFilter', function (event, data) {
                console.log(vm.controllerId + '.action.getFilter');
                getFilter(data);
                _tableState.pagination.start = 0;
            });
            $scope.$on(vm.controllerId + '.action.reload', function (event, data) {
                console.log(vm.controllerId + '.action.reload');
                getPage();
            });
        }

        /*** BIZ FUNCTION ***/

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }
        /* lấy thông tin filter */
        function getFilter(data) {
            console.log(data);
            
            if (!data) { return; }
            vm.filter.Series = data.Series || '';
            vm.filter.DienThoai = data.DienThoai || '';
            vm.filter.TenKhachHang = data.TenKhachHang || '';
            vm.filter.LoaiBaoHanh = data.LoaiBaoHanh || 'Y';
            vm.filter.startDate = data.startDate || '';
            vm.filter.endDate = data.endDate || '';
        }

        function getListSelected() {
            var list = [];

            for (var i = 0; i < vm.data.listPhieuBaoHanh.length; i++) {
                if (vm.data.listPhieuBaoHanh[i].isSelected == true) {
                    list.push(vm.data.listPhieuBaoHanh[i]);
                }
            }
            return list;
        }
        /*** CALL API FUNCTION ***/

        function deleteList(list) {
            vm.status.isLoading = true;
            vm.status.isSelectedAll = false;

            var data = {
                list: list,
                loginId: userInfo.NhanVienId
            }
            PhieuBaoHanhService.xoaList(data).then(function (success) {
                console.log(success);
                vm.status.isLoading = false;
                if (success.data && success.data.data) {
                    var errCode = success.data.data;

                    alert('Xóa phiếu bảo hành thành công');
                    getPage();
                }
                vm.status.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    alert('Không thể xóa phiếu bảo hành');
                }
            });
        }

        function getPage(tableState) {
            
            vm.status.isLoading = true;
            vm.status.isSelectedAll = false;

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

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.;
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.;
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'asc' : 'desc';

            data.Series = vm.filter.Series;
            data.DienThoai = vm.filter.DienThoai;
            data.ThongTinKhachHang = vm.filter.ThongTinKhachHang;
            data.LoaiBaoHanh = vm.filter.LoaiBaoHanh;
            data.strStartDate = utility.convertDateFormat(vm.filter.startDate, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.strEndDate = utility.convertDateFormat(vm.filter.endDate, 'DD/MM/YYYY', 'YYYY-MM-DD');

            data.field = '';
            data.maForm = maForm;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            vm.data.title = 'Danh sách phiếu bảo hành ' + (data.LoaiBaoHanh == 'N' ? 'với nhà cung cấp' : 'với khách hàng');
            

            PhieuBaoHanhService.getPage(data).then(function (result) {                
                if (result.data.metaData.draw != tableState.draw) { return; }

                vm.status.isLoading = false;
                if (result.data.data) {
                    vm.data.listPhieuBaoHanh = result.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(result.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
            }, function (result) {
                vm.status.isLoading = false;
                console.log(result);
            });
            loadCotList();
        }

        function loadCotList() {
            TuyChonCotService.getAll(maForm).then(function success(result) {
                console.log(result);
                if (result.data && result.data.data) {
                    delete vm.data.listCot;
                    vm.data.listCot = result.data.data;
                }
            }, function error(result) {
                console.log(result);
            });
        }
    });
})();