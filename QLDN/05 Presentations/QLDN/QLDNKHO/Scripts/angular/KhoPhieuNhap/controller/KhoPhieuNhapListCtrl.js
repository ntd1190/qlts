﻿/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Thanh Binh
3. Description : khophieunhap/list
4. History     : 2017.06.15 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';
    angular.module('app').controller('KhoPhieuNhapListCtrl', function ($scope, KhoPhieuNhapService, utility, TuyChonCotService) {
        /* PRIVATE */

        var vm = this;
        var _tableState;
        var userInfo;
        var linkUrl;
        /* VIEW MODEL */
        vm.controllerId = 'KhoPhieuNhapListCtrl';
        vm.status = {};
        vm.status.isLoading = false;
        vm.status.useCotListDb = false;
        vm.status.isSelectedAll = false;

        vm.filter = {};
        vm.filter.listKhachHang = [];
        vm.filter.listKhoHang = [];
        vm.filter.listTrangThai = [];
        vm.filter.startDate = '';
        vm.filter.endDate = '';

        vm.data = {};
        vm.data.listPhieuNhap = [];
        vm.data.listCot = [
            { MaCot: 'SoPhieu', TenCot: 'Số', HienThiYN: true, DoRong: 100 },
            { MaCot: 'NoiDung', TenCot: 'Nội dung', HienThiYN: true, DoRong: 150 },
            { MaCot: 'NgayChungTu', TenCot: 'Ngày CT', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenKhachHang', TenCot: 'Đơn vị', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenKhoNhap', TenCot: 'Kho hàng', HienThiYN: true, DoRong: 100 },
            { MaCot: 'SoHoaDon', TenCot: 'Hóa đơn', HienThiYN: true, DoRong: 100 },
            { MaCot: 'NgayThanhToan', TenCot: 'Ngày thanh toán', HienThiYN: true, DoRong: 150 },
            { MaCot: 'TrangThai', TenCot: 'Trạng thái', HienThiYN: true, DoRong: 100 },
        ],


        /*** INIT FUNCTION ***/

        (function activate() {
            console.log('activate');
        })();

        vm.onInitView = function (config) {
            console.log(config);
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }

            if (config && config.loadListCot) {
                vm.status.useCotListDb = config.loadListCot;
                loadCotList();
            }

            initEventListener();
        }

        /*** ACTION FUNCTION ***/
        vm.action = {};
        vm.action.getPage = getPage;
        vm.action.xoaChon = xoaChon;
        vm.action.checkQuyenTacVu = checkQuyenUI;

        // kiểm tra ẩn hiện cột
        vm.action.checkCot = function (cot) {
            if (!cot.HienThiYN) {
                return false;
            }
            switch (cot.MaCot) {
                case 'CtrVersion': return false;
                case 'PhieuNhapId': return false;
                case 'MaTrangThai': return false;
                default: return true;
            }
        }

        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listPhieuNhap);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listPhieuNhap, !vm.status.isSelectedAll);
        };

        /*** BROADCAST / EMIT / ON FUNCTION ***/
        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.filter', function (e, v) {
                vm.filter = v;
                console.log(vm.filter);
            });
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                reload();
            });
            $scope.$on(vm.controllerId + '.action.F2', function (e, v) {
                console.log(checkQuyenUI('N'));
                if (checkQuyenUI('N')) {
                    window.location.href = linkUrl + 'create';
                }
            });
        }

        /*** BIZ FUNCTION ***/

        /* tự đông check / uncheck checkAll */
        function autoCheckAll(list) {
            if (!list || list.length == 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                if (list[i].isSelected) {
                } else {
                    return false;
                }
            }

            return true;
        }

        /* checkAll / uncheckAll */
        function checkAll(list, isSelected) {
            if (!list || list.length == 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                list[i].isSelected = isSelected;
            }
            return isSelected;
        }

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        // kiểm tra quyền dùng cho code, có thông báo
        function checkQuyenAction(quyen) {

            return false;
        }

        function reload() {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        function xoaChon() {
            var list = new Array();

            for (var i = 0; i < vm.data.listPhieuNhap.length; i++) {
                if (vm.data.listPhieuNhap[i].isSelected && vm.data.listPhieuNhap[i].MaTrangThai === "KPN_LSC") {
                    alert("Phiếu đã Lưu sổ cái, bạn không thể Xóa hay Sửa");
                    return;
                }

                if (vm.data.listPhieuNhap[i].isSelected) {
                    list.push(vm.data.listPhieuNhap[i]);
                }
            }
            // TODO kiểm tra chọn phiếu
            if (list.length < 1) {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục');
                return;
            }

            if (!confirm('Bạn có thật sự muốn xóa?')) { return; }

            vm.status.isLoading = true;


            var data = {
                listPhieuNhap: list,
                //loginId: userInfo.NhanVienId,
            };

            KhoPhieuNhapService.removeList(data).then(function (result) {
                console.log(result);
                vm.status.isLoading = false;
                reload();
                alert('Xóa thành công!')
            }, function (result) {
                console.log(result);
                vm.status.isLoading = false;
                alert('Không thể xóa!')
            });
        }

        function setInitValue() {
            if (!!vm.data.listKhachHang == false) {
                vm.data.listKhachHang = [];
            }
        }

        // load thông tin vào vm.filter
        function getFilter(data) {
            if (data && data.listKhachHang) {
                delete vm.filter.listKhachHang;
                vm.filter.listKhachHang = data.listKhachHang;
            }

            if (data && data.listKhohHang) {
                delete vm.filter.listKhohHang;
                vm.filter.listKhohHang = data.listKhohHang;
            }

            if (data && data.listTrangThai) {
                delete vm.filter.listTrangThai;
                vm.filter.listTrangThai = data.listTrangThai;
            }

            if (data && data.startDate) {
                vm.filter.startDate = data.startDate;
            }

            if (data && data.endDate) {
                vm.filter.endDate = data.endDate;
            }
        };

        // load danh sách có phân trang
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
            tableState.draw = tableState.draw + 1 || 1;
            tableState.sort.reverse = tableState.sort.reverse === undefined ? true : tableState.sort.reverse;
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'KPN.NgayNhap' : tableState.sort.predicate;

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.maForm = 'FL0016';
            data.trangThai = utility.joinStr(vm.filter.listTrangThai, 'MaTrangThai', '|');
            data.khachHang = utility.joinStr(vm.filter.listKhachHang, 'KhachHangId', '|');
            data.khoHang = utility.joinStr(vm.filter.listKhoHang, 'KhoHangId', '|');
            data.strStartDate = utility.convertDateFormat(vm.filter.startDate, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.strEndDate = utility.convertDateFormat(vm.filter.endDate, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuNhapService.getPage(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);
                if (result && result.data && result.data.data) {
                    delete vm.data.listPhieuNhap;
                    vm.data.listPhieuNhap = result.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(result.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
            });
            loadCotList();
        };

        function loadCotList() {
            if (vm.status.useCotListDb) {
                TuyChonCotService.getAll('FL0016').then(function success(result) {
                    console.log(result);
                    if (result.data && result.data.data) {
                        delete vm.data.listCot;
                        vm.data.listCot = result.data.data;
                    }
                }, function error(result) {
                    console.log(result);
                });
            }
        }

    });
})();