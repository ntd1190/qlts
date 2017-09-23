(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('DanhGiaTaiSanListCtrl', function (DanhGiaTaiSanService, utility, $timeout, $scope, $q) {
        var vm = this, userInfo, _tableState,
            isEdit = false, linkUrl = '', service = DanhGiaTaiSanService;

        vm.error = {};

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.inputSearch = {};

        vm.data = {};
        vm.data.ListDanhGia = {};
        vm.data.listCot = [
            { MaCot: 'SoChungTu', TenCot: 'Số chứng từ', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenTaiSan', TenCot: 'Tên tài sản', HienThiYN: true, DoRong: 0 },
        ]

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.getPage = getPage;
        vm.action.removeList = function () {
            if (checkQuyenUI('D') == false) { return; }
            if (confirm('Bạn có muốn xóa tài sản ?')) {
                removeList();
            }
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.ListDanhGia);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.ListDanhGia, !vm.status.isSelectedAll);
        };
        vm.action.TaiSanInfo = function (object) {
            for (var i in vm.data.ListDanhGia) {
                vm.data.ListDanhGia[i].isView = false;
            }
            object.isView = true;
        }
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        };

        /*** HOT KEY ***/
        vm.keys = {
            //press F2 -> open popup
            F2: function (name, code) {
                vm.action.addNguyenGia();
                var index = vm.data.listNguyenGia.length - 1;
                $timeout(function () {
                    $('[data-name="listNguyenGia_NguonNganSachId' + index + '"] input').focus();
                }, 0);
            },

            F8: function (name, code) {
                vm.action.save();
            }
        };

        /*** INIT FUNCTION ***/

        activate();
        function activate() {

        };

        vm.onInitView = function (config) {
            console.log('vm.onInitView');
            console.log(config);
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            if (config && config.isEdit) {
                isEdit = config.isEdit;
            }
            if (config && config.DanhGiaId) {
                DanhGiaId = config.DanhGiaId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
        };

        /***EVENT FUNCTION ***/


        /*** BIZ FUNCTION ***/

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            if (isEdit == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

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

        /*** API FUNCTION TÀI SẢN ***/


        function removeList() {
            var data = {};
            data.TaiSanIds = vm.data.TaiSan.TaiSanId;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.removeList(data).then(function (success) {
                console.log(success);
                utility.AlertSuccess('Xóa tài sản thành công');
                $timeout(function () {
                    window.location = linkUrl + 'list/';
                }, 2000);
            }, function (error) {
                console.log(error);
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể xóa tài sản');
                }
            });

        }

        function getPage(tableState) {
            vm.status.isSelectedAll = false;
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
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'DG.TenTaiSan' : tableState.sort.predicate;

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.inputSearch.search;

            data.NHANVIEN_ID = userInfo ? userInfo.NhanVienId : 0;
            data.COSO_ID = userInfo ? userInfo.CoSoId : 0;
            service.getPage(data).then(function (success) {
                vm.status.isLoading = false;
                console.log(success);
                if (success && success.data && success.data.data) {
                    delete vm.data.ListDanhGia;
                    vm.data.ListDanhGia = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
            }, function (error) {
                vm.status.isLoading = false;
                console.log(error);
            });
        };

    });

    module.filter('sumOfValue', function () {
        return function (data, key) {
            if (angular.isUndefined(data) || angular.isUndefined(key))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + parseFloat(value[key]);
            });
            return sum;
        };
    });
})();
