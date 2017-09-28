(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('DanhGiaTaiSanListCtrl', function (DanhGiaTaiSanService,TaiSanService, utility, $timeout, $scope, $q) {
        var vm = this, userInfo, _tableState,
            isEdit = false, linkUrl = '', service = DanhGiaTaiSanService;

        vm.error = {};

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.inputSearch = {};

        vm.data = {};
        vm.data.TaiSan = {};
        vm.data.DanhGia = {};
        vm.data.ListDanhGia = {};
        vm.data.listCot = [
            { MaCot: 'SoChungTu', TenCot: 'Số chứng từ', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenTaiSan', TenCot: 'Tên tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NgayDanhGia', TenCot: 'Ngày đánh giá', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NgayChungTu', TenCot: 'Ngày chứng từ', HienThiYN: true, DoRong: 0 },
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
            vm.data.DanhGia = object;

            getTaiSanById(object.TaiSanId).then(function () {
                tinhHaoMon();
                importTaiSanToDanhGia();
                tinhHaoMonCu();
            });
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

        function importTaiSanToDanhGia() {
            vm.data.DanhGia.NgayBDHaoMonCu = vm.data.TaiSan.NgayBDHaoMon;

            vm.data.DanhGia.NguyenGiaCu = vm.data.DanhGia.NguyenGiaCu == null ? vm.data.TaiSan.NguyenGia : vm.data.DanhGia.NguyenGiaCu;
            vm.data.DanhGia.SoNamSuDungCu = vm.data.DanhGia.SoNamSuDungCu == null ? vm.data.TaiSan.SoNamSuDung : vm.data.DanhGia.SoNamSuDungCu;
            vm.data.DanhGia.TyLeHaoMonCu = vm.data.DanhGia.TyLeHaoMonCu == null ? vm.data.TaiSan.TyLeHaoMon : vm.data.DanhGia.TyLeHaoMonCu;
            vm.data.DanhGia.HaoMonLuyKeCu = vm.data.DanhGia.HaoMonLuyKeCu == null ? vm.data.TaiSan.HaoMonLuyKe : vm.data.DanhGia.HaoMonLuyKeCu;
        }

        function tinhHaoMonCu() {
            vm.data.DanhGia.NguyenGiaCu = vm.data.DanhGia.NguyenGiaCu || 0;
            vm.data.DanhGia.TyLeHaoMonCu = vm.data.DanhGia.TyLeHaoMonCu || 0;

            vm.data.DanhGia.HaoMonNamCu = vm.data.DanhGia.NguyenGiaCu * vm.data.DanhGia.TyLeHaoMonCu / 100;

            vm.data.DanhGia.SoNamSDConLaiCu = (moment().year() - moment(vm.data.DanhGia.NgayBDHaoMonCu, 'YYYY-MM-DD').year());
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSuDungCu - vm.data.DanhGia.SoNamSDConLaiCu;
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSDConLaiCu < 0 ? 0 : vm.data.DanhGia.SoNamSDConLaiCu;
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSDConLaiCu || 0;

            vm.data.DanhGia.HaoMonLuyKeCu = (vm.data.DanhGia.SoNamSuDungCu - vm.data.DanhGia.SoNamSDConLaiCu) * vm.data.DanhGia.HaoMonNamCu;
            vm.data.DanhGia.HaoMonLuyKeCu = vm.data.DanhGia.HaoMonLuyKeCu || 0;

            vm.data.DanhGia.GiaTriConLaiCu = vm.data.DanhGia.NguyenGiaCu - vm.data.DanhGia.HaoMonLuyKeCu;
            vm.data.DanhGia.GiaTriConLaiCu = vm.data.DanhGia.GiaTriConLaiCu || 0;
        }

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

        function tinhHaoMon() {
            vm.data.TaiSan.NguyenGia = vm.data.TaiSan.NguyenGia | 0;
            vm.data.TaiSan.SoNamSuDung = vm.data.TaiSan.SoNamSuDung | 0;

            vm.data.TaiSan.TyLeHaoMon = 100 / vm.data.TaiSan.SoNamSuDung;
            vm.data.TaiSan.HaoMonNam = vm.data.TaiSan.NguyenGia / vm.data.TaiSan.SoNamSuDung;

            vm.data.TaiSan.SoNamSDConLai = (moment().year() - moment(vm.data.TaiSan.NgayBDHaoMon, 'YYYY-MM-DD').year());
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSuDung - vm.data.TaiSan.SoNamSDConLai;
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSDConLai < 0 ? 0 : vm.data.TaiSan.SoNamSDConLai;

            vm.data.TaiSan.HaoMonLuyKe = (vm.data.TaiSan.SoNamSuDung - vm.data.TaiSan.SoNamSDConLai) * vm.data.TaiSan.HaoMonNam;
            vm.data.TaiSan.GiaTriConLai = vm.data.TaiSan.SoNamSDConLai * vm.data.TaiSan.HaoMonNam;

            vm.data.TaiSan.TyLeHaoMon = vm.data.TaiSan.TyLeHaoMon | 0;
            vm.data.TaiSan.HaoMonNam = vm.data.TaiSan.HaoMonNam | 0;
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSDConLai | 0;
            vm.data.TaiSan.HaoMonLuyKe = vm.data.TaiSan.HaoMonLuyKe | 0;
            vm.data.TaiSan.GiaTriConLai = vm.data.TaiSan.GiaTriConLai | 0;
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
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'TS.TenTaiSan' : tableState.sort.predicate;

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

        function getTaiSanById(id) {
            var deferred = $q.defer();
            var data = {};
            data.TaiSanId = id;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.getById(data).then(function (success) {
                console.log(success);
                vm.data.TaiSan = success.data.data[0];
                deferred.resolve(success);
            }, function (error) {
                deferred.resolve(error);
            });

            return deferred.promise;
        }

        function getDanhGiaById(id) {
            var deferred = $q.defer();
            var data = {};
            data.DanhGiaId = id;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            DanhGiaTaiSanService.getById(data).then(function (success) {
                console.log(success);
                vm.data.DanhGia = success.data.data[0];
                deferred.resolve(success);
            }, function (error) {
                deferred.resolve(error);
            });

            return deferred.promise;
        }

    });
})();
