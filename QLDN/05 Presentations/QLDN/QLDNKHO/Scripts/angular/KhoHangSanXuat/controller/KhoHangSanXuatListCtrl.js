(function () {
    'use strict';

    angular.module("app")
        .controller("KhoHangSanXuatListCtrl", controller)

    function controller($scope, KhoHangSanXuatService, utility) {

        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoHangSanXuatListCtrl';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;


        vm.data = {};
        vm.data.searchString = '';
        vm.data.listHangSanXuat = [];
        vm.data.listCot = [
            { MaCot: 'MaHangSanXuat', TenCot: 'Mã', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenHangSanXuat', TenCot: 'Tên', HienThiYN: true, DoRong: 0 },
        ],


        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.xoaChon = deleteSelected;
        vm.action.getPage = getPage;

        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        };

        vm.action.create = function () {
            emitEdit();
        };
        vm.action.edit = function (item) {
            emitEdit(item);
        };

        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listHangSanXuat);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listHangSanXuat, !vm.status.isSelectedAll);
        };
        vm.action.apDung = function () {
            var selectedList = new Array();
            var listHangSanXuat = vm.data.listHangSanXuat;
            for (var i = 0; i < listHangSanXuat.length; i++) {
                if (listHangSanXuat[i].isSelected) {
                    selectedList.push(listHangSanXuat[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit(vm.controllerId + '.action.ap-dung', selectedList);
        }

        /*** INIT FUNCTION ***/

        function activate() { }

        vm.onInitView = function (config) {
            if (!!config && !!config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            initEventListener();
        }

        activate();

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.reload', function (e, v) {
                console.log(vm.controllerId + '.reload');
                getPage(_tableState);
            });
            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                });
            });
        }

        function emitEdit(item) {
            var data = {};
            data.hangSanXuat = item || {};
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

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /*** API FUNCTION ***/

        function deleteSelected() {
            vm.status.isLoading = true;

            var list = new Array();

            for (var i = 0; i < vm.data.listHangSanXuat.length; i++) {
                if (vm.data.listHangSanXuat[i].isSelected) {
                    list.push(vm.data.listHangSanXuat[i]);
                }
            }

            var data = {
                list: list,
                loginId: userInfo.NhanVienId,
            };
            if (data.list.length > 0) {
                if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }
                KhoHangSanXuatService.removeList(data).then(function (result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    if (result.data.data[0][""].length > 0) {
                        var res = result.data.data[0][""].substring(0, 3);
                        if (res == "ERR") {
                            alert('Không thể xóa!')
                        }
                        else {
                            _tableState.pagination.start = 0;
                            getPage(_tableState);
                            alert('Xóa thành công!')
                        }
                    }                    
                }, function (result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    alert('Không thể xóa!')
                });
            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }
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
            data.sortName = tableState.sort.predicate || 'HangSanXuatId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.fields = '';
            data.search = vm.data.searchString;

            KhoHangSanXuatService.getPage(data).then(function (result) {
                console.log(result);

                vm.status.isLoading = false;
                if (result.data.data) {
                    delete vm.data.listHangSanXuat;
                    vm.data.listHangSanXuat = result.data.data;
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