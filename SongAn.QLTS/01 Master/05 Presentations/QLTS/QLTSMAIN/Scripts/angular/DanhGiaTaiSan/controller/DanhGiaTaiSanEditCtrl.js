(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('DanhGiaTaiSanEditCtrl', function (DanhGiaTaiSanService, TaiSanService, utility, $timeout, $scope, $q) {
        var vm = this, userInfo,TaiSanSD,
            isEdit = false, DanhGiaId = 0, linkUrl = '', service = DanhGiaTaiSanService;

        vm.error = {};

        vm.data = {};
        vm.data.TaiSan_New = {};
        vm.data.TaiSan_Old = {};
        vm.data.DanhGia = {};

        vm.data.listNguyenGia = [];
        vm.data.NguyenGia = 0;
        vm.data.TaiSan = {};

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.addNguyenGia = function () {
            if (checkQuyenUI('N') == false && checkQuyenUI('M') == false) { return; }
            vm.data.listNguyenGia.push({ GiaTri: 0 });
        }
        vm.action.removeNguyenGia = function (index) {
            if (checkQuyenUI('N') == false && checkQuyenUI('M') == false) { return; }
            vm.data.listNguyenGia.splice(index, 1);
        }
        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.save = function () {
            if (checkQuyenUI('N') == false && checkQuyenUI('M') == false) { return; }

            var has_error = false;

            if (checkInputTaiSan() == false) {
                if (has_error == false) {
                    $('[data-target="#ThongTinChung"]').tab('show');
                    $timeout(function () {
                        checkInputTaiSan();
                    }, 500);
                }
                has_error = true;
            }

            if (checkNguyenGiaList() == false || checkNguyenGiaNganSach() == false) {
                if (has_error == false) {
                    $('[data-target="#ThongTinChung"]').tab('show');
                }
                has_error = true;
            }

            if (checkInputTTKK() == false) {
                if (has_error == false) {
                    $('[data-target="#ThongTinKeKhai"]').tab('show');
                    $timeout(function () {
                        checkInputTTKK();
                    }, 500);
                }
                has_error = true;
            }

            if (checkInputTTCK() == false) {
                if (has_error == false) {
                    $('[data-target="#ThongTinCongKhai"]').tab('show');
                    $timeout(function () {
                        checkInputTTCK();
                    }, 500);
                }
                has_error = true;
            }

            if (has_error) { return; }

            if (isEdit == 1 && checkQuyenUI('M')) {
                update();
            } else if (isEdit == 0 && checkQuyenUI('N')) {
                insert();
            }
        }

        vm.action.removeList = function () {
            if (checkQuyenUI('D') == false) { return; }
            if (confirm('Bạn có muốn xóa tài sản ?')) {
                removeList();
            }
        };

        vm.action.keyPressDanhGia = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTaiSan($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }

        vm.action.keyPressNganSach = function (event, index) {
            if (event.keyCode != 13) { return; }

            if (vm.data.listNguyenGia && (vm.data.listNguyenGia.length - 1) == index) {
                vm.action.addNguyenGia();
            }
            $timeout(function () {
                $('[data-name="' + $(event.target).data('next') + '"] input').focus();
                $('[data-name="' + $(event.target).data('next') + '"]').focus();
            }, 0);
        }

        vm.action.getDataTaiSan = function (data) {
            console.log('vm.action.getDataTaiSan');
            console.log(data);
            TaiSanSD = angular.copy(data);
            vm.data.DanhGia.TaiSanId = TaiSanSD.TaiSanId;
            vm.data.DanhGia.PhongBanId = TaiSanSD.PhongBanId;
            vm.data.DanhGia.NhanVienId = TaiSanSD.NhanVienId;

            loadDataTaiSan();
        }

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
            loadDataTaiSan();
            vm.action.addNguyenGia();
        };

        /***EVENT FUNCTION ***/

        // tính hao mòn
        $scope.$watchGroup([
            'ctrl.data.NguyenGia'
            , 'ctrl.data.TaiSan.TyLeHaoMon'
            , 'ctrl.data.TaiSan.SoNamSuDung'
        ], function () {
            tinhHaoMon();
        })

        /*** BIZ FUNCTION ***/

        function tinhHaoMon() {
            vm.data.NguyenGia = vm.data.NguyenGia || 0;
            vm.data.TaiSan.TyLeHaoMon = vm.data.TaiSan.TyLeHaoMon || 0;

            vm.data.TaiSan.HaoMonNam = vm.data.NguyenGia * vm.data.TaiSan.TyLeHaoMon / 100;

            vm.data.TaiSan.SoNamSDConLai = (moment().year() - moment(vm.data.TaiSan.NgayBDHaoMon, 'YYYY-MM-DD').year());
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSuDung - vm.data.TaiSan.SoNamSDConLai;
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSDConLai < 0 ? 0 : vm.data.TaiSan.SoNamSDConLai;
            vm.data.TaiSan.SoNamSDConLai = vm.data.TaiSan.SoNamSDConLai || 0;

            vm.data.TaiSan.HaoMonLuyKe = (vm.data.TaiSan.SoNamSuDung - vm.data.TaiSan.SoNamSDConLai) * vm.data.TaiSan.HaoMonNam;
            vm.data.TaiSan.HaoMonLuyKe = vm.data.TaiSan.HaoMonLuyKe || 0;

            vm.data.TaiSan.GiaTriConLai = vm.data.NguyenGia - vm.data.TaiSan.HaoMonLuyKe;
            vm.data.TaiSan.GiaTriConLai = vm.data.TaiSan.GiaTriConLai || 0;
        }

        function tinhGTConLai() {
            vm.data.TaiSan.NamTheoDoi = moment(vm.data.TaiSan.NgayMua, 'DD/MM/YYYY').year();
            vm.data.TaiSan.GiaTriConLai = vm.data.TaiSan.SoNamSDConLai * vm.data.TaiSan.HaoMonNam;
        }

        function tinhKhauHao() {
            console.log('tinhKhauHao');
            vm.data.TaiSan.TyLeKhauHao = vm.data.TaiSan.TyLeKhauHao || 0;

            var currDate = moment();
            var startDate = moment(vm.data.TaiSan.NgayBDKhauHao, 'DD/MM/YYYY');

            var ThangTheoKy = vm.data.TaiSan.KyTinhKhauHao == 'Tháng' ? 1
                : vm.data.TaiSan.KyTinhKhauHao == 'Quý' ? 3
                : vm.data.TaiSan.KyTinhKhauHao == 'Năm' ? 12
                : 0

            var SoThangSD = currDate.diff(startDate, 'months');
            var SoThangConLai = vm.data.TaiSan.SoKyKhauHao * ThangTheoKy - SoThangSD;
            SoThangConLai = SoThangConLai > 0 ? SoThangConLai : 0;

            vm.data.TaiSan.KhauHaoKy = vm.data.NguyenGia * vm.data.TaiSan.TyLeKhauHao / 100;
            vm.data.TaiSan.SoKyConLai = SoThangConLai > 0 ? Math.floor(SoThangConLai / ThangTheoKy) : 0;
            vm.data.TaiSan.KhauHaoLuyKe = vm.data.TaiSan.KhauHaoKy * (vm.data.TaiSan.SoKyKhauHao - vm.data.TaiSan.SoKyConLai);
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

        function loadDataTaiSan() {
            if (!TaiSanSD || !TaiSanSD.TaiSanId) { return; }

            getTaiSanById(TaiSanSD.TaiSanId).then(function success() {
                $q.all([getListNguyenGia()]).then(function () {
                    tinhHaoMon();
                    importDanhGiaFromTaiSan();
                });
            });
        }


        function checkNguyenGiaList() {
            var hasError = false;
            if (!vm.data.listNguyenGia || vm.data.listNguyenGia.length === 0) { return true; }
            for (var index = 0; index < vm.data.listNguyenGia.length; index++) {
                if (!vm.data.listNguyenGia[index].GiaTri || !vm.data.listNguyenGia[index].NguonNganSachId) {
                    hasError = true;
                    vm.data.listNguyenGia[index].isError = true;
                }
                else {
                    vm.data.listNguyenGia[index].isError = false;
                }
            }


            return !hasError;
        }

        function checkNguyenGiaNganSach() {
            var hasError = false;
            for (var outer = 0; outer < vm.data.listNguyenGia.length - 1; outer++) {
                for (var inner = outer + 1; inner < vm.data.listNguyenGia.length; inner++) {
                    if (vm.data.listNguyenGia[outer].NguonNganSachId == vm.data.listNguyenGia[inner].NguonNganSachId) {
                        hasError = true;
                        vm.data.listNguyenGia[outer].isError = true;
                        vm.data.listNguyenGia[inner].isError = true;
                    }
                }
            }
            return !hasError;
        }

        function checkInputTaiSan(inputName) {
            console.log('checkInputTaiSan');
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'TaiSan';
            var prop_name = '';
            var error_name = '';

            prop_name = 'MaTaiSan';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'TenTaiSan';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'LoaiId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NuocSanXuatId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                console.log(vm.data[obj_name][prop_name]);
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function importDanhGiaFromTaiSan() {
            vm.data.DanhGia.HaoMonLuyKeCu = vm.data.TaiSan.HaoMonLuyKe || 0;
            vm.data.DanhGia.SoNamSuDungCu = vm.data.TaiSan.SoNamSuDung || 0;
            vm.data.DanhGia.TyLeHaoMonCu = vm.data.TaiSan.TyLeHaoMon || 0;
            vm.data.DanhGia.SLTonCu = vm.data.TaiSan.SLTon || 0;
            vm.data.DanhGia.HaoMonNamCu = vm.data.TaiSan.HaoMonNam || 0;
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.TaiSan.SoNamSDConLai || 0;
            vm.data.DanhGia.GiaTriConLaiCu = vm.data.TaiSan.GiaTriConLai || 0;
        }
        /*** API FUNCTION TÀI SẢN ***/

        // chuẩn bị dữ liệu gửi api
        function prepareTaiSan(object) { }

        // fixed dữ liệu sau khi nhận từ api
        function fixTaiSan(object) {
            object.SLTon = TaiSanSD.SoLuongTon;
        }

        function getTaiSanById(TaiSanId) {
            var deferred = $q.defer();
            var data = {};
            data.TaiSanId = TaiSanId;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.getById(data).then(function (success) {
                console.log('TaiSanService.getById');
                console.log(success);
                delete vm.data.TaiSan;
                vm.data.TaiSan = success.data.data[0];
                fixTaiSan(vm.data.TaiSan);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }

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

        function insert() {
            utility.addloadding($('body'));
            var data = {};

            var _taiSan = angular.copy(vm.data.TaiSan);
            prepareTaiSan(_taiSan);
            data.TaiSan = angular.toJson(_taiSan);

            data.TTCK = angular.toJson(vm.data.TTCK);
            data.TTKK_Dat = angular.toJson(vm.data.TTKK_Dat);
            data.TTKK_Nha = angular.toJson(vm.data.TTKK_Nha);
            data.TTKK_Oto = angular.toJson(vm.data.TTKK_Oto);
            data.TTKK_500 = angular.toJson(vm.data.TTKK_500);

            data.NguyenGiaList = angular.toJson(vm.data.listNguyenGia);
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.insert(data).then(function (success) {
                console.log(success);
                $timeout(function () {
                    window.location = linkUrl + 'edit/' + success.data.data[0].TaiSanId;
                }, 2000);
                utility.removeloadding();
                utility.AlertSuccess('Thêm tài sản thành công');
            }, function (error) {
                console.log(error);
                utility.removeloadding();
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể thêm tài sản');
                }
            });
        }

        function update() {
            utility.addloadding($('body'));
            var data = {};

            var _taiSan = angular.copy(vm.data.TaiSan);
            prepareTaiSan(_taiSan);
            data.TaiSan = angular.toJson(_taiSan);

            vm.data.TTCK.TaiSanId = _taiSan.TaiSanId;
            data.TTCK = angular.toJson(vm.data.TTCK);

            vm.data.TTKK_Dat.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_Dat = angular.toJson(vm.data.TTKK_Dat);

            vm.data.TTKK_Nha.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_Nha = angular.toJson(vm.data.TTKK_Nha);

            vm.data.TTKK_Oto.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_Oto = angular.toJson(vm.data.TTKK_Oto);

            vm.data.TTKK_500.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_500 = angular.toJson(vm.data.TTKK_500);

            data.NguyenGiaList = angular.toJson(vm.data.listNguyenGia);
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.update(data).then(function (success) {
                console.log(success);
                loadData();
                utility.removeloadding();
                utility.AlertSuccess('Cập nhật tài sản thành công');
            }, function (error) {
                console.log(error);
                utility.removeloadding();
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể cập nhật tài sản');
                }
            });
        }

        function fixListNguyenGia(list) {
            for (var index in list) {
                list[index].GiaTri = list[index].GiaTri || 0;
                list[index].GiaTriCu = list[index].GiaTri;
            }
        }

        function getListNguyenGia() {
            var deferred = $q.defer();

            var data = {};
            data.TaiSanId = TaiSanSD.TaiSanId;

            TaiSanService.getListNguyenGiaByTaiSanId(data).then(function (success) {
                console.log('TaiSanService.getListNguyenGiaByTaiSanId');
                console.log(success);
                delete vm.data.listNguyenGia;
                vm.data.listNguyenGia = success.data.data;
                fixListNguyenGia(vm.data.listNguyenGia);
                return deferred.resolve(success.data.data);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
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
