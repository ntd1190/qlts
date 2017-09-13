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
        vm.data.TTKK_Dat = {}; // Thông tin kê khai đất
        vm.data.TTKK_Nha = {}; // Thông tin kê khai nhà
        vm.data.TTKK_Oto = {}; // Thông tin kê khai ô tô
        vm.data.TTKK_500 = {}; // Thông tin kê khai tài sản trên 500 triệu
        vm.data.listCot = [
            { MaCot: 'MaTaiSan', TenCot: 'Mã tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenTaiSan', TenCot: 'Tên tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'DonViTinh', TenCot: 'ĐVT', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenNhom', TenCot: 'Nhóm tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenLoai', TenCot: 'Loại tài sản', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenHangSanXuat', TenCot: 'Hãng sản xuất', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenNuocSanXuat', TenCot: 'Nước sản xuất', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NguyenGia', TenCot: 'Nguyên giá', HienThiYN: true, DoRong: 0 },
        ];

        vm.inputSearch = {};
        vm.inputSearch.search = '';

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPage = getPage;
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        };
        vm.action.removeList = function () {
            if (checkQuyenUI('D') == false) { return; }
            if (confirm('Bạn có muốn xóa tài sản ?')) {
                removeList();
            }
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.ListTaiSan);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.ListTaiSan, !vm.status.isSelectedAll);
        };

        vm.action.TaiSanInfo = function (taisan) {
            for (var i in vm.data.ListTaiSan) {
                vm.data.ListTaiSan[i].isView = false;
            }
            taisan.isView = true;
            getById(taisan.TaiSanId);
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
                utility.AlertSuccess('Xóa tài sản thành công');
                vm.action.search();
            }, function (error) {
                console.log(error);
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể xóa tài sản');
                }
            });

        }

        function getById(id) {
            var data = { TaiSanId: id };
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;
            service.getById(data).then(function (success) {
                console.log(success);
                vm.data.TaiSan = success.data.data[0];
                loadThongTinKeKhai(vm.data.TaiSan);
                tinhHaoMon();
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

        /*** API FUNCTION THÔNG TIN KÊ KHAI ***/

        function loadThongTinKeKhai(taisan) {
            console.log('loadThongTinKeKhai');
            console.log(taisan);
            delete vm.data.TTKK_Dat; vm.data.TTKK_Dat = {}; // Thông tin kê khai đất
            delete vm.data.TTKK_Nha; vm.data.TTKK_Nha = {}; // Thông tin kê khai nhà
            delete vm.data.TTKK_Oto; vm.data.TTKK_Oto = {}; // Thông tin kê khai ô tô
            delete vm.data.TTKK_500; vm.data.TTKK_500 = {}; // Thông tin kê khai tài sản trên 500 triệu

            if (!taisan) { return; }
            switch (taisan.LoaiKeKhai.toString()) {
                case '1':
                    getTTKK_DatById(taisan.TaiSanId);
                    break;
                case '2':
                    getTTKK_NhaById(taisan.TaiSanId);
                    break;
                case '3':
                    getTTKK_OtoById(taisan.TaiSanId);
                    break;
                case '4':
                    getTTKK_500ById(taisan.TaiSanId);
                    break;
                default:
                    return;
            }
        }

        function getTTKK_DatById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_DatById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_DatById');
                console.log(success);
                delete vm.data.TTKK_Dat;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Dat = success.data.data[0];
                }
                vm.data.TTKK_Dat = vm.data.TTKK_Dat || {};
            }, function (error) {
                console.log(error);
            });
        }
        function getTTKK_NhaById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_NhaById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_NhaById');
                console.log(success);
                delete vm.data.TTKK_Nha;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Nha = success.data.data[0];
                }
                vm.data.TTKK_Nha = vm.data.TTKK_Nha || {};
            }, function (error) {
                console.log(error);
            });
        }
        function getTTKK_OtoById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_OtoById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_OtoById');
                console.log(success);
                delete vm.data.TTKK_Oto;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Oto = success.data.data[0];
                    vm.data.TTKK_Oto.LoaiXe = vm.data.TTKK_Oto.LoaiXe.toString();
                }
                vm.data.TTKK_Oto = vm.data.TTKK_Oto || {};
            }, function (error) {
                console.log(error);
            });
        }
        function getTTKK_500ById(TaiSanId) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_500ById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_500ById');
                console.log(success);
                delete vm.data.TTKK_500;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_500 = success.data.data[0];
                }
                vm.data.TTKK_500 = vm.data.TTKK_500 || {};
            }, function (error) {
                console.log(error);
            });
        }

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
