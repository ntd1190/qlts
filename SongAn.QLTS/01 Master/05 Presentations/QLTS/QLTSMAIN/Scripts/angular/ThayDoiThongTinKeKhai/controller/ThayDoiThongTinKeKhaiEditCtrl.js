(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('ThayDoiThongTinKeKhaiEditCtrl', function (ThayDoiThongTinKeKhaiService, TaiSanService, utility, $timeout, $scope, $q) {

        /*** PRIVATE ***/

        var vm = this, userInfo, linkUrl = '', isEdit = false, ThayDoiThongTinId = 0, TDTTService = ThayDoiThongTinKeKhaiService;

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
            ThayDoiThongTinId = config.ThayDoiThongTinId || 0;
            loadData();
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
            if (isEdit == 1 && checkQuyenUI('M')) {
                updateTDTT().then(function (success) {
                    utility.removeloadding();
                    utility.AlertSuccess('Thay đổi thông tin thành công');
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

        function loadData() {
            getTDTTById(ThayDoiThongTinId).then(function (success) {
                delete vm.data.TaiSan_Old; vm.data.TaiSan_Old = {};
                vm.data.TaiSan_Old.TaiSanId = vm.data.TDTT.TaiSanId;
                vm.data.TaiSan_Old.TenTaiSan = vm.data.TDTT.TenTaiSanCu;
                vm.data.TaiSan_Old.LoaiKeKhai = vm.data.TDTT.LoaiKeKhai;

                delete vm.data.TaiSan_New; vm.data.TaiSan_New = {};
                vm.data.TaiSan_New.TaiSanId = vm.data.TDTT.TaiSanId;
                vm.data.TaiSan_New.TenTaiSan = vm.data.TDTT.TenTaiSanMoi;
                vm.data.TaiSan_New.LoaiKeKhai = vm.data.TDTT.LoaiKeKhai;

                getTTKKById(vm.data.TaiSan_New.TaiSanId);
                getTDTT_LoaiById(ThayDoiThongTinId, vm.data.TDTT.LoaiKeKhai);
            });
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

        function fixedTDTT(object) {
            object.Ngay = utility.convertDateFormat(object.Ngay, 'YYYY-MM-DD', 'DD/MM/YYYY');
        }
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
                fixedTDTT(vm.data.TDTT);
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

        function prepareTDTT(object) {
            object.Ngay = utility.convertDateFormat(object.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }
        function updateTDTT() {
            var deferred = $q.defer();

            switch (vm.data.TaiSan_Old.LoaiKeKhai.toString()) {
                case '1':
                    return updateTDTT_Dat();
                    break;
                case '2':
                    return updateTDTT_Nha();
                    break;
                case '3':
                    return updateTDTT_Oto();
                    break;
                case '4':
                    return updateTDTT_500();
                    break;
                default:
                    deferred.resolve();
            }
            return deferred.promise;
        }
        function updateTDTT_Dat() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.updateTDTT_Dat(data).then(function (success) {
                console.log('TDTTService.updateTDTT_Dat');
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function updateTDTT_Nha() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.updateTDTT_Nha(data).then(function (success) {
                console.log('TDTTService.updateTDTT_Nha');
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function updateTDTT_Oto() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.updateTDTT_Oto(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }
        function updateTDTT_500() {
            var deferred = $q.defer();
            var data = {};

            var _TDTT = angular.copy(vm.data.TDTT);
            prepareTDTT(_TDTT);

            data.TDTT = angular.toJson(_TDTT);
            data.TenTaiSanMoi = vm.data.TaiSan_New.TenTaiSan;
            data.TTKK = angular.toJson(vm.data.TTKK_New);

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TDTTService.updateTDTT_500(data).then(function (success) {
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

            switch (vm.data.TaiSan_New.LoaiKeKhai.toString()) {
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
