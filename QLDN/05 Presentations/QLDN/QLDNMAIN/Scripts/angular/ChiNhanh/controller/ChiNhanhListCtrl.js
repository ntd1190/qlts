(function () {
    'use strict';
    var module = angular.module("app");
    module.controller("ChiNhanhListCtrl", function ($scope, ChiNhanhService, utility) {

        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;

        /*** VIEW MODEL ***/

        vm.controllerId = 'ChiNhanhListCtrl';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.data = {};
        vm.data.searchString = '';
        vm.data.listChiNhanh = [];
        vm.data.listCot = [
            { MaCot: 'MaChiNhanh', TenCot: 'Mã', HienThiYN: true, DoRong: 75 },
            { MaCot: 'TenChiNhanh', TenCot: 'Chi nhánh', HienThiYN: true, DoRong: 200 },
            { MaCot: 'DiaChi', TenCot: 'Địa chỉ', HienThiYN: true, DoRong: 0 },            
            { MaCot: 'MoTa', TenCot: 'Mô tả', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenChiNhanhCha', TenCot: 'Chi nhánh cha', HienThiYN: true, DoRong: 0 }
        ];

        /*** INIT FUNCTION ***/

        activate();
        function activate() { };

        vm.onInitView = function (config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            initEventListener();
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.xoaChon = deleteSelected;

        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };

        vm.action.search = function () {
            getPage(_tableState);
            _tableState.pagination.start = 0;
        };
        vm.action.create = function () {
            emitEdit();
        };
        vm.action.edit = function (id) {
            emitEdit(id);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listChiNhanh);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listChiNhanh, !vm.status.isSelectedAll);
        };
        vm.action.checkQuyenTacVu = checkQuyenUI;

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.reload', function (e, v) {
                console.log(vm.controllerId + '.reload');
                getPage(_tableState);
            });
        }

        function emitEdit(item) {
            var data = {};
            if (item) {
                data.ChiNhanhId = item;
            }

            $scope.$emit(vm.controllerId + '.edit', data);
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

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            var lisQuyenTacVu;

            // kiểm tra danh sách quyền # null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var lisQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return lisQuyenTacVu.indexOf(quyen) >= 0;
        }

        /*** API FUNCTION ***/

        function deleteSelected() {
            if (vm.status.isLoading) { return; }

            var list = new Array();

            for (var i = 0; i < vm.data.listChiNhanh.length; i++) {
                if (vm.data.listChiNhanh[i].isSelected) {
                    list.push(vm.data.listChiNhanh[i]);
                }
            }

            if (list.length < 1) {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
                return;
            }

            if (checkQuyenUI('D') === false) {
                alert('Bạn không có quyền xóa kho hàng');
                return;
            }

            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            var data = {
                list: list,
                loginId: userInfo.NhanVienId,
            };
            console.log(data);
            ChiNhanhService.removeList(data).then(function (result) {
                console.log(result);
                vm.status.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                alert('Xóa thành công!')
            }, function (result) {
                console.log(result);
                vm.status.isLoading = false;
                alert('Không thể xóa!')
            });
        }

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

            var data = {};
            data.draw = tableState.draw + 1 || 1;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.;
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.;
            data.sortName = tableState.sort.predicate || 'CHINHANH_ID';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.fields = '';
            data.search = vm.data.searchString;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            ChiNhanhService.getPage(data).then(function (result) {
                console.log(result);

                vm.status.isLoading = false;
                if (result.data.data) {
                    delete vm.data.listChiNhanh;
                    vm.data.listChiNhanh = result.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(result.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
            }, function (result) {
                console.log(result);

                vm.status.isLoading = false;
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);

                }
            });
        }
    });
})();