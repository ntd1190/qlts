(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('ThayDoiThongTinKeKhaiListCtrl', function (ThayDoiThongTinKeKhaiService, TaiSanService, utility, $timeout, $scope, $q) {

        /*** PRIVATE ***/

        var vm = this, userInfo, _tableState,
            linkUrl = '', TDTTService = ThayDoiThongTinKeKhaiService;

        /*** VIEW MODEL ***/

        vm.data = {};
        vm.data.TDTTList = [];
        vm.data.TDTT = {};
        vm.data.TTKK_New = {};
        vm.data.TTKK_Old = {};
        vm.inputSearch = {};

        vm.data.listCot = [
            { MaCot: 'MaTaiSan', TenCot: 'Mã tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenTaiSan', TenCot: 'Tên tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'Ngay', TenCot: 'Ngày thay đổi', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenNguoiDuyet', TenCot: 'Tên người duyệt', HienThiYN: true, DoRong: 0 },
        ];

        /*** INIT FUNCTION ***/

        activate();
        function activate() { }
        vm.onInitView = function (config) {
            if (!config) { return; }

            userInfo = config.userInfo || {};
            linkUrl = config.linkUrl || '';
        }

        /*** ACTION MODEL ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.getPage = getPage;
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        };
        vm.action.TTKKInfo = function (object) {
            for (var i in vm.data.TDTTList) {
                vm.data.TDTTList[i].isView = false;
            }
            object.isView = true;
            getTDTTById(object.ThayDoiThongTinId).then(function (success) {
                getTTKKById(vm.data.TDTT.TaiSanId, vm.data.TDTT.LoaiKeKhai).then(function () {
                    console.log('vm.data.TTKK_New');
                    console.log(vm.data.TTKK_New);
                });
                getTDTT_LoaiById(vm.data.TDTT.ThayDoiThongTinId, vm.data.TDTT.LoaiKeKhai).then(function () {
                    console.log('vm.data.TTKK_Old');
                    console.log(vm.data.TTKK_Old);
                });
            });
        }
        /*** EVENT FUNCTION ***/

        /*** BIZ FUNCTION ***/

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

        function getPage(tableState) {
            var deferred = $q.defer();

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
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'ID' : tableState.sort.predicate;

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.inputSearch.search;

            data.NhanVienId = userInfo ? userInfo.NhanVienId : 0;
            data.CoSoId = userInfo ? userInfo.CoSoId : 0;
            TDTTService.getPage(data).then(function (success) {
                console.log(success);
                if (success && success.data && success.data.data) {
                    delete vm.data.listTaiSan;
                    vm.data.TDTTList = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        };

        function getTDTTById(id) {
            var deferred = $q.defer();
            var data = {};
            data.ThayDoiThongTinId = id;
            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;
            TDTTService.getById(data).then(function (success) {
                console.log('TDTTService.getById.success');
                console.log(success);
                if (success.data.data && success.data.data.length) {
                    vm.data.TDTT = success.data.data[0];
                }
                vm.data.TDTT = vm.data.TDTT || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log('TDTTService.getById.error');
                console.log(error);
                return deferred.resolve(error);
            });
            return deferred.promise;
        }

        function getTDTT_LoaiById(id, LoaiKeKhai) {
            var deferred = $q.defer();

            switch (LoaiKeKhai.toString()) {
                case '1':
                    return getTDTT_DatById(id);
                    break;
                case '2':
                    return getTDTT_NhaById(id);
                    break;
                case '3':
                    return getTDTT_OtoById(id);
                    break;
                case '4':
                    return getTDTT_500ById(id);
                    break;
                default:
                    deferred.resolve();
            }
            return deferred.promise;
        }
        function getTDTT_DatById(id) {
            var deferred = $q.defer();
            var data = { ThayDoiThongTinId: id };
            TDTTService.getTDTT_DatById(data).then(function (success) {
                console.log('TDTTService.getTDTT_DatById');
                console.log(success);
                delete vm.data.TTKK_Old;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Old = success.data.data[0];
                }
                vm.data.TTKK_Old = vm.data.TTKK_Old || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function getTDTT_NhaById(id) {
            var deferred = $q.defer();
            var data = { ThayDoiThongTinId: id };
            TDTTService.getTDTT_NhaById(data).then(function (success) {
                console.log('TDTTService.getTDTT_NhaById');
                console.log(success);
                delete vm.data.TTKK_Old;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Old = success.data.data[0];
                }
                vm.data.TTKK_Old = vm.data.TTKK_Old || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function getTDTT_OtoById(id) {
            var deferred = $q.defer();
            var data = { ThayDoiThongTinId: id };
            TDTTService.getTDTT_OtoById(data).then(function (success) {
                console.log('TDTTService.getTDTT_OtoById');
                console.log(success);
                delete vm.data.TTKK_Old;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Old = success.data.data[0];
                    vm.data.TTKK_Old.LoaiXeCu = vm.data.TTKK_Old.LoaiXeCu.toString();
                }
                vm.data.TTKK_Old = vm.data.TTKK_Old || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function getTDTT_500ById(id) {
            var deferred = $q.defer();
            var data = { ThayDoiThongTinId: id };
            TDTTService.getTDTT_500ById(data).then(function (success) {
                console.log('TDTTService.getTDTT_500ById');
                console.log(success);
                delete vm.data.TTKK_Old;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Old = success.data.data[0];
                }
                vm.data.TTKK_Old = vm.data.TTKK_Old || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }


        function getTTKKById(id, LoaiKeKhai) {
            var deferred = $q.defer();

            switch (LoaiKeKhai.toString()) {
                case '1':
                    return getTTKK_DatById(id);
                    break;
                case '2':
                    return getTTKK_NhaById(id);
                    break;
                case '3':
                    return getTTKK_OtoById(id);
                    break;
                case '4':
                    return getTTKK_500ById(id);
                    break;
                default:
                    deferred.resolve();
            }
            return deferred.promise;
        }
        function getTTKK_DatById(id) {
            var deferred = $q.defer();
            var data = { TaiSanId: id };
            TaiSanService.getTTKK_DatById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_DatById');
                console.log(success);
                delete vm.data.TTKK_New;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_New = success.data.data[0];
                }
                vm.data.TTKK_New = vm.data.TTKK_New || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function getTTKK_NhaById(id) {
            var deferred = $q.defer();
            var data = { TaiSanId: id };
            TaiSanService.getTTKK_NhaById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_NhaById');
                console.log(success);
                delete vm.data.TTKK_New;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_New = success.data.data[0];
                }
                vm.data.TTKK_New = vm.data.TTKK_New || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function getTTKK_OtoById(id) {
            var deferred = $q.defer();
            var data = { TaiSanId: id };
            TaiSanService.getTTKK_OtoById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_OtoById');
                console.log(success);
                delete vm.data.TTKK_New;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_New = success.data.data[0];
                    vm.data.TTKK_New.LoaiXe = vm.data.TTKK_New.LoaiXe.toString();
                }
                vm.data.TTKK_New = vm.data.TTKK_New || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function getTTKK_500ById(id) {
            var deferred = $q.defer();
            var data = { TaiSanId: id };
            TaiSanService.getTTKK_500ById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_500ById');
                console.log(success);
                delete vm.data.TTKK_New;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_New = success.data.data[0];
                }
                vm.data.TTKK_New = vm.data.TTKK_New || {};
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

    });
})();
