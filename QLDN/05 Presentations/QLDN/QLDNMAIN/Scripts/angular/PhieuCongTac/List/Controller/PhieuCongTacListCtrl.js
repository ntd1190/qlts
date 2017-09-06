/*****************************************************************************
1. Create Date : 2017.05.04
2. Creator     : Nguyen Thanh Binh
3. Description : javascript chức năng phiếu công tác
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app')
        .controller('PhieuCongTacListCtrl', controller);
    function controller($scope, PhieuCongTacService, utility) {
        var vm = this;
        var userInfo;
        var listQuyenTacVu = [];
        var _tableState;
        var caller;
        vm.controllerId = 'PhieuCongTacListCtrl';

        vm.status = {
            isLoading: false,
            errorMessage: '',
            infoMessage: '',
            isSelectedAll: false,
        };

        vm.data = {
            listPhieuCongTac: [],
            listCot: [
                { MaCot: 'NoiDung', TenCot: 'Phiếu công tác', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'NgayDi', TenCot: 'Ngày đi', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'NgayVe', TenCot: 'Ngày về', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'SoNgay', TenCot: 'Số ngày', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'TenNhanVien', TenCot: 'Nhân viên', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'YeuCauThanhToan', TenCot: 'Yêu cầu thanh toán', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'ThanhToan', TenCot: 'Thanh toán', HienThiYN: true, DoRong: '100px' },
                { MaCot: 'TrangThai', TenCot: 'Trạng thái', HienThiYN: true, DoRong: 'auto' },
            ],
            inputSearch: {
                listNguoiDuyet: [],
                startDate: moment().startOf('month').format('DD/MM/YYYY'),
                endDate: moment().endOf('month').format('DD/MM/YYYY'),
                listTrangThai: [],
            }
        };

        vm.action = {
            getPage: getPage,
            checkQuyenTacVu: checkQuyenTacVu,
            search: search,
            convertDateFormat: utility.convertDateFormat,
            checkAll: checkAll,
            autoCheckAll: autoCheckAll,
            xoaChon: xoaChon,
        };


        /***************************************************
         * INIT FUNCTION
         */

        vm.onInitView = function (config) {
            console.log(config);
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                userInfo = config.userInfo;
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        }

        /**************************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.getFilter', function (event, data) {
                getFilter(data);
                getPage();
            });
        }

        /*******************************************************
         * ACTION FUNCTION
         */

        function xoaChon() {
            message('', '');


            var listChon = getListPhieuCongTacSelected();
            if (listChon.length > 0) {

                /* kiểm tra trạng thái đã duyệt của listChon */
                for (var i = 0; i < listChon.length; i++) {
                    if (listChon[i].MaTrangThai && (listChon[i].MaTrangThai == 'PCT_DY' || listChon[i].MaTrangThai == 'PCT_TC')) {
                        alert('Không thể xóa phiếu đã duyệt');
                        return;
                    }
                }

                if (confirm('Bạn có muốn xóa phiếu đã chọn ?') == false) {
                    return;
                }

                deleteListPhieuCongtac(listChon);
            } else {
                alert('Vui lòng chọn phiếu trong danh sách');
            }
        }

        function search() {
            console.log(vm.data.trangThai);
        }

        /*******************************************
         * BIZ FUNCTION
         */

        /* lấy danh sách phiếu công tác được chọn */
        function getListPhieuCongTacSelected() {
            var list = [];

            if (vm.data.listPhieuCongTac && vm.data.listPhieuCongTac.length > 0) {
                for (var i = 0; i < vm.data.listPhieuCongTac.length; i++) {
                    if (vm.data.listPhieuCongTac[i].isSelected) {
                        list.push(vm.data.listPhieuCongTac[i]);
                    }
                }

            }

            return list;
        }

        function checkQuyenTacVu(quyen) {
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /* tự đông check / uncheck checkAll */
        function autoCheckAll() {
            if (!vm.data.listPhieuCongTac || vm.data.listPhieuCongTac.length == 0) {
                return false;
            }

            for (var i = 0; i < vm.data.listPhieuCongTac.length; i++) {
                if (vm.data.listPhieuCongTac[i].isSelected) {
                } else {
                    vm.status.isSelectedAll = false;
                    return vm.status.isSelectedAll;
                }
            }
            vm.status.isSelectedAll = true;

            return vm.status.isSelectedAll;
        }

        /* checkAll / uncheckAll */
        function checkAll() {
            if (!vm.data.listPhieuCongTac || vm.data.listPhieuCongTac.length == 0) {
                return false;
            }

            vm.status.isSelectedAll = !vm.status.isSelectedAll;

            for (var i = 0; i < vm.data.listPhieuCongTac.length; i++) {
                vm.data.listPhieuCongTac[i].isSelected = vm.status.isSelectedAll;
            }
            return vm.status.isSelectedAll;
        }


        /* lấy thông tin filter */
        function getFilter(data) {
            console.log(data);
            if (data && data.listNguoiDuyet) {
                delete vm.data.inputSearch.listNguoiDuyet;
                vm.data.inputSearch.listNguoiDuyet = data.listNguoiDuyet;
            }

            if (data && data.listTrangThai) {
                delete vm.data.inputSearch.listTrangThai;
                vm.data.inputSearch.listTrangThai = data.listTrangThai;
            }

            if (data) {
                vm.data.inputSearch.startDate = data.startDate;
            }

            if (data) {
                delete vm.data.inputSearch.endDate;
                vm.data.inputSearch.endDate = data.endDate;
            }
        }

        /******************************************
         * CALL API FUNCTION
         */


        function deleteListPhieuCongtac(list) {
            message('', '')

            var data = {
                listPCT: list,
                loginId: userInfo.NhanVienId
            }
            PhieuCongTacService.xoaList(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    var errCode = success.data.data;
                   
                    alert('Xóa phiếu công tác thành công.');
                    //  vm.data.listPhieuCongTac = success.data.data;
                    getPage();
                }
                vm.status.isLoading = false;
            }, function (error) {
                alert('Không thể xóa phiếu công tác.');
                console.log(error);
                vm.status.isLoading = false;
            });
        }

        /* load danh sách từ api có phân trang */
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
            tableState.sort.reverse = tableState.sort.reverse == undefined ? true : tableState.sort.reverse;
            console.log(tableState);
            // chuẩn bị tham số 
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'PCT.NgayDi';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            var searchString = '';
            var fields = 'PCT.NoiDung,PCT.NgayDi,PCT.NgayVe,PCT.SoNgay,PCT.MaTrangThai,NV.Ho,NV.Ten,TT.TrangThai';
            var nguoiDuyetIds = utility.joinStr(vm.data.inputSearch.listNguoiDuyet, 'NhanVienId');
            var trangThai = utility.joinStr(vm.data.inputSearch.listTrangThai, 'MaTrangThai');
            var startDate = utility.convertDateFormat(vm.data.inputSearch.startDate, 'DD/MM/YYYY', 'YYYYMMDD');
            var endDate = utility.convertDateFormat(vm.data.inputSearch.endDate, 'DD/MM/YYYY', 'YYYYMMDD');
            // tạo input cho api
            var data = {
                // phân trang
                draw: draw, start: start, length: number, sortName: sortName, sortDir: sortDir,
                // cấu hình
                fields: fields,
                // filter
                searchString: searchString,
                nguoiDuyetIds: nguoiDuyetIds,
                trangThai: trangThai,
                xoa: 'N',
                loginId: userInfo.NhanVienId,
                startDate: startDate,
                endDate: endDate,
            };

            // gọi api
            PhieuCongTacService.getPage(data).then(function (success) {
                console.log(success);
                if (success.data.metaData.draw == draw && success.data.data) {
                    vm.data.listPhieuCongTac = success.data.data;

                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                }
                vm.status.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
            });
        }

        /******************************************
         * HELPERS FUNCTION
         */

        function message(type, message) {
            vm.status.infoMessage = '';
            vm.status.errorMessage = '';

            switch (type) {
                case 'info':
                    vm.status.infoMessage = message;
                    break;
                case 'error':
                    vm.status.errorMessage = message;
                    break;
                default:
                    break;
            }
        }

    };
})();