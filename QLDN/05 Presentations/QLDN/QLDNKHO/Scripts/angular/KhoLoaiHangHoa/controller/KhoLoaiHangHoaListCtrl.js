(function () {
    'use strict';

    angular.module("app")
        .controller("KhoLoaiHangHoaListCtrl", controller)

    function controller($scope, KhoLoaiHangHoaService, utility) {
        /************************************
         * PRIVATE
         */
        var vm = this;
        var _tableState;
        var listQuyenTacVu;
        var userInfo;

        /**********************************
         * VIEW MODEL
         */
        vm.controllerId = 'KhoLoaiHangHoaListCtrl';
        vm.status = {
            isLoading: false,
            isSelectedAll: false,
        };
        vm.data = {
            searchString: '',
            listLoaiHangHoa: [],
        };

        /**********************************************
         * ACTION FUNCTION
         */

        vm.action = {};
        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.xoaChon = deleteSelected;
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        };
        vm.action.create = function () {
            emitEdit();
        };
        vm.action.update = function (loai) {
            emitEdit(loai);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listLoaiHangHoa);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listLoaiHangHoa, !vm.status.isSelectedAll);
        };
        vm.action.apDung = function () {
            debugger
            var selectedList = new Array();
            var listLoaiHangHoa = vm.data.listLoaiHangHoa;
            for (var i = 0; i < listLoaiHangHoa.length; i++) {
                if (listLoaiHangHoa[i].isSelected) {
                    selectedList.push(listLoaiHangHoa[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit(vm.controllerId + '.action.ap-dung', selectedList);
        }

        vm.action.checkQuyenTacVu = checkQuyenUI;

        /****************************************
         * INIT FUNCTION
         */

        activate();
        function activate() { }
        vm.onInitView = function (config) {
            if (!!config && !!config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                userInfo = config.userInfo;
            }
            initEventListener();
        }

        /*******************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

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

        function emitEdit(loai) {
            var data = {};
            if (loai) {
                data.loaiHangHoa = loai;
            }

            $scope.$emit(vm.controllerId + '.edit', data);
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

        function checkQuyenTacVu(quyen) {
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function deleteSelected() {


            vm.status.isLoading = true;

            var list = new Array();

            for (var i = 0; i < vm.data.listLoaiHangHoa.length; i++) {
                if (vm.data.listLoaiHangHoa[i].isSelected) {
                    list.push(vm.data.listLoaiHangHoa[i]);
                }
            }

            var data = {
                list: list,
                loginId: userInfo.NhanVienId,
            };
            if (data.list.length > 0) {
                if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) {
                    vm.status.isLoading = false; return;
                }

                KhoLoaiHangHoaService.removeList(data).then(function (success) {
                    vm.status.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!')
                }, function (error) {
                    vm.status.isLoading = false;
                    if (error.status == 400) {
                        alert(error.data.error.message)
                    } else {
                        alert('Không thể xóa!')
                    }
                });
            } else {
                vm.status.isLoading = false;
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
            data.sortName = tableState.sort.predicate || 'LoaiHangHoaId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.fields = 'LHH.*';
            data.search = vm.data.searchString;

            KhoLoaiHangHoaService.getPage(data).then(function (result) {
                console.log(result);

                vm.status.isLoading = false;
                if (result.data.data) {
                    delete vm.data.listLoaiHangHoa;
                    vm.data.listLoaiHangHoa = result.data.data;
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