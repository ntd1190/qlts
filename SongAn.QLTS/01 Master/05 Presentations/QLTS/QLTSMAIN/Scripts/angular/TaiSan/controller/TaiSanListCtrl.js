(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('TaiSanListCtrl', function (TaiSanService, utility, $timeout) {

        /*** PRIVATE ***/
        var vm = this,
            service = TaiSanService,
            TaiSanId = 0,
            userInfo,
            _tableState;

        /*** VIEW MODEL ***/

        vm.status = {};

        vm.data = {};
        vm.data.ListTaiSan = [];
        vm.data.TaiSan = {};
        vm.data.listCot = [
            { MaCot: 'MaTaiSan', TenCot: 'Mã tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenTaiSan', TenCot: 'Tên tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'SoLuong', TenCot: 'Số lượng', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NguyenGia', TenCot: 'Nguyên giá', HienThiYN: true, DoRong: 0 },
        ];

        vm.inputSearch = {};
        vm.inputSearch.search = '';

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPage = getPage;
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.search = function () {
            getPage(_tableState);
            _tableState.pagination.start = 0;
        };
        vm.action.removeList = function () {
            removeList();
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.ListTaiSan);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.ListTaiSan, !vm.status.isSelectedAll);
        };

        vm.action.TaiSanInfo = function (index) {
            for (var i in vm.data.ListTaiSan) {
                vm.data.ListTaiSan[i].isView = false;
            }
            vm.data.ListTaiSan[index].isView = true;
            getById(vm.data.ListTaiSan[index].TaiSanId);
        }
        /*** HOT KEY ***/

        vm.keys = {
            F2: function (name, code) {
            },
            F3: function (name, code) {
                vm.action.search();
            },

            F8: function (name, code) {
            }
        };

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
        };

        vm.onInitView = function (config) {
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
        };

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

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function getListSelected() {
            var list = [];
            for (var index in vm.data.ListTaiSan) {
                if (vm.data.ListTaiSan[index].isSelected) {
                    list.push(vm.data.ListTaiSan[index]);
                }
            }
            return list;
        }
        /*** API FUNCTION ***/

        // chuẩn bị dữ liệu gửi api
        function prepareTaiSan(object) {
            object.NgayMua = utility.convertDateFormat(object.NgayMua, 'DD/MM/YYYY', 'YYYY-MM-DD');
            object.NgayGhiTang = utility.convertDateFormat(object.NgayGhiTang, 'DD/MM/YYYY', 'YYYY-MM-DD');
            object.NgayBDHaoMon = utility.convertDateFormat(object.NgayBDHaoMon, 'DD/MM/YYYY', 'YYYY-MM-DD');
            object.NgayBDKhauHao = utility.convertDateFormat(object.NgayBDKhauHao, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }

        // fixed dữ liệu sau khi nhận từ api
        function fixTaiSan(object) {
            object.NgayMua = utility.convertDateFormat(object.NgayMua, 'YYYY-MM-DD', 'DD/MM/YYYY');
            object.NgayGhiTang = utility.convertDateFormat(object.NgayGhiTang, 'YYYY-MM-DD', 'DD/MM/YYYY');
            object.NgayBDHaoMon = utility.convertDateFormat(object.NgayBDHaoMon, 'YYYY-MM-DD', 'DD/MM/YYYY');
            object.NgayBDKhauHao = utility.convertDateFormat(object.NgayBDKhauHao, 'YYYY-MM-DD', 'DD/MM/YYYY');
        }

        function removeList() {
            var data = {};
            data.TaiSanIds = utility.joinStr(getListSelected(), 'TaiSanId', '|');
            data.CoSoId = 1;
            data.NhanVienId = 6;

            service.removeList(data).then(function (success) {
                console.log(success);
                vm.action.search();
            }, function (error) {
                console.log(error);
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    utility.AlertError('Không thể xóa tài sản');
                }
            });

        }

        function getById(id) {
            var data = { TaiSanId: id };
            service.getById(data).then(function (success) {
                console.log(success);
                vm.data.TaiSan = success.data.data[0];
            }, function (error) {
                console.log(error);
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
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'TS.TaiSanId' : tableState.sort.predicate;

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data = angular.extend({}, data, tableState.search.predicateObject);
            data.search = vm.inputSearch.search;

            data.NhanVienId = userInfo ? userInfo.NhanVienId : 0;
            data.CoSoId = userInfo ? userInfo.CoSoId : 0;
            service.getPage(data).then(function (success) {
                vm.status.isLoading = false;
                console.log(success);
                if (success && success.data && success.data.data) {
                    delete vm.data.listTaiSan;
                    vm.data.ListTaiSan = success.data.data;
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
