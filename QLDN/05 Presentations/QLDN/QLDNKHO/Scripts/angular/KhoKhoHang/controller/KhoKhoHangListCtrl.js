(function () {
    'use strict';

    angular.module("app")
        .controller("KhoKhoHangListCtrl", controller)

    function controller($scope, KhoKhoHangService, utility) {

        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoKhoHangListCtrl';
        vm.status = {
            isLoading: false,
            isSelectedAll: false,
        };
        vm.data = {
            searchString: '',
            listKhoHang: [],
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.xoaChon = function () {
            console.log(vm.controllerId + '.fn.xoaChon');
            if (vm.status.isLoading) { return; }

            if (checkQuyenUI('D') === false) {
                alert('Bạn không có quyền xóa kho hàng');
                return;
            }

            if (confirm('Bạn có muốn xóa các mục đã chọn không?')) {
                deleteSelected();
            }

        };

        vm.action.search = function () {
            getPage(_tableState);
            _tableState.pagination.start = 0;
        };
        vm.action.create = function () {
            if (vm.status.isLoading) { return; }

            if (checkQuyenUI('N')) {
                emitEdit();
            }
        };
        vm.action.update = function (loai) {
            if (vm.status.isLoading) { return; }
            emitEdit(loai);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listKhoHang);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listKhoHang, !vm.status.isSelectedAll);
        };
        vm.action.checkQuyenTacVu = checkQuyenUI;

        /*** INIT FUNCTION ***/

        activate();
        function activate() { };

        vm.onInitView = function (config) {
            if (!!config && !!config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            initEventListener();
        }

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                getPage(_tableState);
            });
        }

        function emitEdit(item) {
            var data = {};
            if (item) {
                data.khoHang = item;
                $scope.$emit(vm.controllerId + '.action.edit', data);
            } else {
                $scope.$emit(vm.controllerId + '.action.create', data);
            }
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
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length == 0) { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /*** API FUNCTION ***/

        function deleteSelected(list) {
            var list = new Array();

            for (var i = 0; i < vm.data.listKhoHang.length; i++) {
                if (vm.data.listKhoHang[i].isSelected) {
                    list.push(vm.data.listKhoHang[i]);
                }
            }

            if (list.length < 1) {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
                return;
            }

            var data = {
                list: list,
                loginId: userInfo.NhanVienId,
            };

            KhoKhoHangService.removeList(data).then(function (result) {
                console.log(result);
                vm.status.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                alert('Xóa thành công!')
            }, function (result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.status == 400) {
                    alert(result.data.error.message)
                } else {
                    alert('Không thể xóa!')
                }
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
            data.sortName = tableState.sort.predicate || 'KhoHangId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.fields = '';
            data.search = vm.data.searchString;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            KhoKhoHangService.getPage(data).then(function (result) {
                console.log(result);

                vm.status.isLoading = false;
                if (result.data.data) {
                    delete vm.data.listKhoHang;
                    vm.data.listKhoHang = result.data.data;
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
    }
})();