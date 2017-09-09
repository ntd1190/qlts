(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('TaiSanEditCtrl', function (TaiSanService, utility, $timeout, $scope, $q) {
        var vm = this, userInfo, isEdit = false, TaiSanId = 0, linkUrl = '';

        vm.error = {};

        vm.data = {};
        vm.data.TaiSan = {};
        vm.data.TTCK = {}; // Thông tin công khai
        vm.data.TTKK_Dat = {}; // Thông tin kê khai đất
        vm.data.TTKK_Nha = {}; // Thông tin kê khai nhà
        vm.data.TTKK_Oto = {}; // Thông tin kê khai ô tô
        vm.data.TTKK_500 = {}; // Thông tin kê khai tài sản trên 500 triệu

        vm.data.listNguyenGia = [];

        /*** ACTION FUNCTION ***/

        vm.action = {};

        vm.action.getNuocSanXuat = function (data) {
            console.log(data);
            vm.data.TaiSan.NuocSanXuatId = data.NuocSanXuatId;
        }

        vm.action.addNguyenGia = function () {
            vm.data.listNguyenGia.push({ GiaTri: 0 });
        }

        vm.action.removeNguyenGia = function (index) {
            vm.data.listNguyenGia.splice(index, 1);
        }

        vm.action.save = function () {
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

        vm.action.keyPressTaiSan = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTaiSan($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }

        vm.action.keyPressTTCK = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTTCK($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }

        vm.action.keyPressTTKK = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTTKK($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }

        vm.action.getTaiSan = function (data) {
            console.log(data);
        }

        /*** HOT KEY ***/

        vm.keys = {
            //press F2 -> open popup
            F2: function (name, code) {
                vm.action.addNguyenGia();
            },

            F8: function (name, code) {
                vm.action.save();
            }
        };

        /*** INIT FUNCTION ***/

        activate();
        function activate() { };

        vm.onInitView = function (config) {
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            if (config && config.isEdit) {
                isEdit = config.isEdit;
            }
            if (config && config.TaiSanId) {
                TaiSanId = config.TaiSanId;
                loadData();
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
        };

        /***EVENT FUNCTION ***/

        $scope.$watch(`
            ctrl.data.TTKK_Dat.LamTruSo+
            ctrl.data.TTKK_Dat.CoSoHDSuNghiep+
            ctrl.data.TTKK_Dat.NhaO+
            ctrl.data.TTKK_Dat.ChoThue+
            ctrl.data.TTKK_Dat.BoTrong+
            ctrl.data.TTKK_Dat.BiLanChiem+
            ctrl.data.TTKK_Dat.SuDungKhac`
            , function () {
                vm.data.TTKK_Dat.DienTich = 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.LamTruSo * 1 || 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.CoSoHDSuNghiep * 1 || 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.NhaO * 1 || 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.ChoThue * 1 || 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.BoTrong * 1 || 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.BiLanChiem * 1 || 0;
                vm.data.TTKK_Dat.DienTich += vm.data.TTKK_Dat.SuDungKhac * 1 || 0;
            });

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

        function loadData() {
            getById(TaiSanId).then(function success() {
                getListNguyenGia();
                getTTCKById(TaiSanId);
                getTTKK_DatById(TaiSanId);
                getTTKK_OtoById(TaiSanId);
            });
        }

        function checkInputTaiSan(inputName) {
            var has_error = false;
            var prefix_name = 'TS_';
            var first_error_name = '';
            var name = '';

            name = 'MaTaiSan';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (utility.checkInValid(vm.data.TaiSan[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'TenTaiSan';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (utility.checkInValid(vm.data.TaiSan[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'LoaiId';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TaiSan[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
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

        function checkInputTTCK(inputName) {
            var has_error = false;
            var first_error_name = '';
            var prefix_name = 'TTCK_';
            var name = '';

            name = 'MoTa';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (utility.checkInValid(vm.data.TTCK[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function checkInputTTKK(inputName) {
            var checkInput = true;
            switch (vm.data.TaiSan.LoaiKeKhai.toString()) {
                case '1':
                    checkInput = checkInputTTKK_Dat(inputName);
                    break;
                case '2':
                    checkInput = checkInputTTKK_Nha(inputName);
                    break;
                case '3':
                    checkInput = checkInputTTKK_Oto(inputName);
                    break;
                case '4':
                    checkInput = checkInputTTKK_500(inputName);
                    break;
                default:
            }

            return checkInput;
        }

        function checkInputTTKK_Dat(inputName) {
            var has_error = false;
            var first_error_name = '';
            var prefix_name = 'TTKK_Dat_';
            var name = '';

            name = 'DiaChi';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'LamTruSo';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'CoSoHDSuNghiep';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'NhaO';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'ChoThue';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'BoTrong';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'BiLanChiem';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'SuDungKhac';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Dat[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function checkInputTTKK_Oto(inputName) {
            var has_error = false;
            var first_error_name = '';
            var prefix_name = 'TTKK_Oto_';
            var name = '';

            name = 'NhanHieu';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Oto[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'BienKiemSoat';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Oto[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'CongSuatXe';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Oto[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'TrongTai';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Oto[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'LoaiXe';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Oto[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }
            name = 'HienTrangSuDung';
            if (!inputName || inputName == (prefix_name + name)) {
                vm.error[prefix_name + name] = '';
                if (!vm.data.TTKK_Oto[name]) {
                    first_error_name = has_error ? first_error_name : prefix_name + name;
                    vm.error[prefix_name + name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        /*** API FUNCTION TÀI SẢN ***/

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
            object.LoaiKeKhai = object.LoaiKeKhai.toString() || '0';
        }

        function getById(id) {
            console.log('getById');
            var data = { TaiSanId: TaiSanId };
            return $q(function (resolve, reject) {
                TaiSanService.getById(data).then(function (success) {
                    console.log(success);
                    delete vm.data.TaiSan;
                    vm.data.TaiSan = success.data.data[0];
                    fixTaiSan(vm.data.TaiSan);
                    return resolve(success);
                }, function (error) {
                    console.log(error);
                    return reject(error);
                });
            });
        }

        function insert() {
            utility.addloadding($('body'));
            var data = {};

            var _taiSan = angular.copy(vm.data.TaiSan);
            prepareTaiSan(_taiSan);
            data.TaiSan = angular.toJson(_taiSan);

            vm.data.TTCK.TaiSanId = _taiSan.TaiSanId;
            data.TTCK = angular.toJson(vm.data.TTCK);

            vm.data.TTKK_Dat.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_Dat = angular.toJson(vm.data.TTKK_Dat);

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

            console.log(vm.data.TTKK_Dat);
            console.log(_taiSan);
            vm.data.TTKK_Dat.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_Dat = angular.toJson(vm.data.TTKK_Dat);

            vm.data.TTKK_Oto.TaiSanId = _taiSan.TaiSanId;
            data.TTKK_Oto = angular.toJson(vm.data.TTKK_Oto);

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

        function getListNguyenGia() {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getListNguyenGiaByTaiSanId(data).then(function (success) {
                console.log(success);
                delete vm.data.listNguyenGia;
                vm.data.listNguyenGia = success.data.data;
            }, function (error) {
                console.log(error);
            });
        }

        function getTTCKById(id) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTCKById(data).then(function (success) {
                console.log(success);
                delete vm.data.TTCK;
                vm.data.TTCK = success.data.data[0];
            }, function (error) {
                console.log(error);
            });
        }

        function getTTKK_DatById(id) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_DatById(data).then(function (success) {
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
        function getTTKK_OtoById(id) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getTTKK_OtoById(data).then(function (success) {
                console.log('getTTKK_OtoById');
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
