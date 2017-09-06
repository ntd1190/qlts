/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Ngoc Tan
3. Description : khophieuchuyen/list
4. History     : 2017.06.15 (Nguyen Ngoc Tan) - tạo mới
*****************************************************************************/
(function () {
    'use strict';
    angular.module('app').controller('KhoPhieuChuyenListCtrl', function ($scope, KhoPhieuChuyenService, utility, TuyChonCotService) {
        /* PRIVATE */

        var vm = this;
        var _tableState;
        var userInfo;
        var linkUrl;
        /* VIEW MODEL */
        vm.controllerId = 'KhoPhieuChuyenListCtrl';
        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.filter = {};
        vm.filter.listKhoHang = [];
        vm.filter.listTrangThai = [];
        vm.filter.startDate = '';
        vm.filter.endDate = '';

        vm.data = {};
        vm.data.listPhieuChuyen = [];
        vm.data.listCot = [];
        vm.data.showList= false;
        vm.data.useCotListDb = true;
        vm.data.searchString = '';
        /*** INIT FUNCTION ***/

        (function activate() {
            console.log('activate');
            loadCotList();
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
                vm.data.useCotListDb = config.loadListCot;
                
            }
            initEventListener();
        }

        /*** ACTION FUNCTION ***/
        vm.action = {};
        vm.action.getPage = getPage;
        vm.action.xoaChon = xoaChon;
        vm.action.checkQuyenTacVu = checkQuyenUI;
        function loadCotList() {
            if (vm.data.useCotListDb) {
                TuyChonCotService.getAll('FM0015').then(function (success) {
                    if (success.data && success.data.data.length > 0) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
        }
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listPhieuChuyen);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listPhieuChuyen, !vm.status.isSelectedAll);
        };

        /*** BROADCAST / EMIT / ON FUNCTION ***/
        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.filter', function (e, v) {
                vm.data.searchString = v;
            });
            $scope.$on(vm.controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
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
            if (userInfo && userInfo.DsQuyenTacVu) {
                return userInfo.DsQuyenTacVu.split(',').indexOf(quyen) >= 0;
            }
            return false;
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
           
            vm.status.isLoading = true;
            var list = new Array();
            for (var i = 0; i < vm.data.listPhieuChuyen.length; i++) {
                if (vm.data.listPhieuChuyen[i].isSelected) {
                    if (vm.data.listPhieuChuyen[i].MaTrangThai == 'KPC_LSC') {
                        alert('Phiếu đã Lưu sổ cái, bạn không thể Xóa hay Sửa');
                        return;
                    }
                    list.push(vm.data.listPhieuChuyen[i]);
                }
            }
            if (list.length > 0) {
                if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }
                var data = {
                    listPhieuChuyen: list,
                    //loginId: userInfo.NhanVienId,
                };

                KhoPhieuChuyenService.removeList(data).then(function (result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    reload();
                    alert('Xóa thành công!')
                }, function (result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    alert('Không thể xóa!')
                });
            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }
        }



        // load thông tin vào vm.filter

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
            tableState.sort.reverse = tableState.sort.reverse === undefined ? true : tableState.sort.reverse; // default: sort giảm dần
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'KPC.NgayNhap' : tableState.sort.predicate; // default: sort theo ngày nhập

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.data.searchString;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuChuyenService.getPage(data).then(function success(result) {
                vm.status.isLoading = false;
                if (result && result.data && result.data.data) {
                    delete vm.data.listPhieuChuyen;
                    vm.data.listPhieuChuyen = result.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(result.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }

            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
            });
            loadCotList();
        };
    });
})();