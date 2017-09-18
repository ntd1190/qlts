(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('ThayDoiThongTinKeKhaiCreateCtrl', function (ThayDoiThongTinKeKhaiService, TaiSanService, utility, $timeout, $scope, $q) {

        /*** PRIVATE ***/

        var vm = this, userInfo, isEdit = false, linkUrl = '', TDTTService = ThayDoiThongTinKeKhaiService;

        /*** VIEW MODEL ***/

        vm.error = {};
        vm.data = {};
        vm.data.TDTT = {};
        vm.data.TaiSan_Old = {};
        vm.data.TaiSan_New = {};
        vm.data.TTKK_New = {};
        vm.data.TTKK_Old = {};

        /*** INIT FUNCTION ***/

        activate();
        function activate() { }
        vm.onInitView = function (config) {
            if (!config) { return; }

            userInfo = config.userInfo || {};
            isEdit = config.isEdit || false;
            linkUrl = config.linkUrl || '';
        }

        /*** HOT KEY ***/

        vm.keys = {
            F2: function (name, code) {
            },
            F3: function (name, code) {
            },

            F8: function (name, code) {
                vm.action.save();
            }
        };

        /*** ACTION MODEL ***/

        vm.action = {};
        vm.action.getTaiSanKeKhai = function (data) {
            delete vm.data.TaiSan_Old;
            vm.data.TaiSan_Old = angular.copy(data);

            delete vm.data.TaiSan_New;
            vm.data.TaiSan_New = angular.copy(vm.data.TaiSan_Old);

            getTTKKById(vm.data.TaiSan_Old.TaiSanId).then(function (success) {
                delete vm.data.TTKK_New;
                vm.data.TTKK_New = angular.copy(vm.data.TTKK_Old);
            });
        }
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.keyPressTTKK = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTTKK($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.keyPressTDTT = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTDTT($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.save = function () {
            var has_error = false;
            has_error = checkInputTTKK() == false ? true : has_error;
            has_error = checkInputTDTT() == false ? true : has_error;
            if (has_error) { return; }

            utility.addloadding($('body'));
            if (checkQuyenUI('N')) {
                insertTDTT().then(function (success) {
                    utility.removeloadding();
                    utility.AlertSuccess('Thay đổi thông tin thành công');
                    $timeout(function () {
                        window.location = linkUrl + 'edit/' + success.data.data[0].ThayDoiThongTinId;
                    }, 2000);
                }, function (error) {
                    utility.removeloadding();
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message);
                    } else {
                        utility.AlertError('Không thể thay đổi thông tin kê khai');
                    }
                });
            }

        }

        /*** EVENT FUNCTION ***/

        $scope.$watch(`
            ctrl.data.TTKK_New.LamTruSo+
            ctrl.data.TTKK_New.CoSoHDSuNghiep+
            ctrl.data.TTKK_New.NhaO+
            ctrl.data.TTKK_New.ChoThue+
            ctrl.data.TTKK_New.BoTrong+
            ctrl.data.TTKK_New.BiLanChiem+
            ctrl.data.TTKK_New.SuDungKhac`
    , function () {
        vm.data.TTKK_New.DienTich = 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.LamTruSo * 1 || 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.CoSoHDSuNghiep * 1 || 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.NhaO * 1 || 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.ChoThue * 1 || 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.BoTrong * 1 || 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.BiLanChiem * 1 || 0;
        vm.data.TTKK_New.DienTich += vm.data.TTKK_New.SuDungKhac * 1 || 0;
    });

        /*** BIZ FUNCTION ***/

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length == 0) { return false; }

            if (isEdit == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function loadData() { }

        function getTTKKById(id) {
            var deferred = $q.defer();

            switch (vm.data.TaiSan_Old.LoaiKeKhai.toString()) {
                case '1':
                    return insertTDTT_Dat();
                    break;
                case '2':
                    return insertTDTT_Nha();
                    break;
                case '3':
                    return insertTDTT_Oto();
                    break;
                case '4':
                    return insertTDTT_500();
                    break;
                default:
                    deferred.resolve();
            }
            return deferred.promise;
        }


        function checkInputTDTT(inputName) {
            console.log('checkInputTDTT');
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'TDTT';
            var prop_name = '';
            var error_name = '';

            prop_name = 'Ngay';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'TaiSanId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
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

        function checkInputTTKK(inputName) {
            var checkInput = true;
            if (!vm.data.TaiSan_New.LoaiKeKhai) {
                return checkInput;
            }

            switch (vm.data.TaiSan_New.LoaiKeKhai.toString()) {
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
            console.log('checkInputTTKK_Dat');
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'TTKK_New';
            var prop_name = '';
            var error_name = '';

            prop_name = 'DiaChi';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'LamTruSo';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'CoSoHDSuNghiep';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NhaO';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'ChoThue';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'BoTrong';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'BiLanChiem';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'SuDungKhac';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
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
        function checkInputTTKK_Nha(inputName) {
            console.log('checkInputTTKK_Nha');
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'TTKK_New';
            var prop_name = '';
            var error_name = '';

            prop_name = 'DiaChi';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'CapHang';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'SoTang';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NamSuDung';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'DienTich';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'TongDienTichSan';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'LamTruSo';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'CoSoHDSuNghiep';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NhaO';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'ChoThue';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'BoTrong';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'BiLanChiem';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'SuDungKhac';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
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
        function checkInputTTKK_Oto(inputName) {
            console.log('checkInputTTKK_Oto');
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'TTKK_New';
            var prop_name = '';
            var error_name = '';

            prop_name = 'NhanHieu';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'BienKiemSoat';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'CongSuatXe';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'TrongTai';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'LoaiXe';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'HienTrangSuDung';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
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
        function checkInputTTKK_500(inputName) {
            console.log('checkInputTTKK_500');
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'TTKK_New';
            var prop_name = '';
            var error_name = '';

            prop_name = 'HienTrangSuDung';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
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

        /*** API FUNCTION ***/
        function prepareTDTT(object) {
            object.Ngay = utility.convertDateFormat(object.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }
        function insertTDTT() {
            var deferred = $q.defer();

            switch (vm.data.TaiSan_Old.LoaiKeKhai.toString()) {
                case '1':
                    return insertTDTT_Dat();
                    break;
                case '2':
                    return insertTDTT_Nha();
                    break;
                case '3':
                    return insertTDTT_Oto();
                    break;
                case '4':
                    return insertTDTT_500();
                    break;
                default:
                    deferred.resolve();
            }
            return deferred.promise;
        }
        function insertTDTT_Dat() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.insertTDTT_Dat(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function insertTDTT_Nha() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.insertTDTT_Nha(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function insertTDTT_Oto() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.insertTDTT_Oto(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function insertTDTT_500() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.insertTDTT_500(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }

        function getTTKKById(id) {
            var deferred = $q.defer();

            switch (vm.data.TaiSan_Old.LoaiKeKhai.toString()) {
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
        function getTTKK_NhaById(id) {
            var deferred = $q.defer();
            var data = { TaiSanId: id };
            TaiSanService.getTTKK_NhaById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_NhaById');
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
        function getTTKK_OtoById(id) {
            var deferred = $q.defer();
            var data = { TaiSanId: id };
            TaiSanService.getTTKK_OtoById(data).then(function (success) {
                console.log('TaiSanService.getTTKK_OtoById');
                console.log(success);
                delete vm.data.TTKK_Old;
                if (success.data.data && success.data.data.length) {
                    vm.data.TTKK_Old = success.data.data[0];
                    vm.data.TTKK_Old.LoaiXe = vm.data.TTKK_Old.LoaiXe.toString();
                }
                vm.data.TTKK_Old = vm.data.TTKK_Old || {};
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
    });
})();
