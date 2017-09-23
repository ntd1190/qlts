(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('ThayDoiThongTinKeKhaiEditCtrl', function (ThayDoiThongTinKeKhaiService, TaiSanService, utility, $timeout, $scope, $q) {

        /*** PRIVATE ***/

        var vm = this, userInfo
            , linkUrl = '', isEdit = false, ThayDoiThongTinId = 0;

        /*** VIEW MODEL ***/

        vm.status = {};
        vm.error = {};

        vm.data = {};
        vm.data.TDTT = {};
        vm.data.TTKK_New = {};
        vm.data.TTKK_Old = {};
        vm.data.TaiSanKK = {};

        /*** INIT FUNCTION ***/

        activate();
        function activate() { }

        vm.onInitView = function (config) {
            if (!config) { return; }

            userInfo = config.userInfo || {};
            isEdit = config.isEdit || false;
            vm.status.isEdit = isEdit;
            ThayDoiThongTinId = config.ThayDoiThongTinId || 0;
            loadData();
        }

        /*** HOT KEY ***/

        vm.keys = {
            F2: function (name, code) { },
            F3: function (name, code) { },
            F8: function (name, code) { }
        };

        /*** ACTION MODEL ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.getTaiSanKeKhai = function (data) {
            vm.data.TaiSanKK = angular.copy(data);

            vm.data.TDTT.TaiSanId = vm.data.TaiSanKK.TaiSanId;
            vm.data.TDTT.TenTaiSanCu = vm.data.TaiSanKK.TenTaiSan;
            vm.data.TDTT.TenTaiSanMoi = vm.data.TaiSanKK.TenTaiSan;
            vm.data.TDTT.LoaiKeKhai = vm.data.TaiSanKK.LoaiKeKhai;

            getTTKKById(vm.data.TaiSanKK.TaiSanId,vm.data.TaiSanKK.LoaiKeKhai).then(function () {
                if (isEdit) { } else {
                    convertTTKK_Old();
                }
            });
        }

        vm.action.keyPressTDTT = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputTDTT($(event.target).data('name')) === false) {
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

        vm.action.save = function () {
            var has_error = false;
            has_error = checkInputTTKK() == false ? true : has_error;
            has_error = checkInputTDTT() == false ? true : has_error;
            if (has_error) { return; }

            utility.addloadding($('body'));
            if (isEdit == true && checkQuyenUI('M')) {
                update().then(function (success) {
                    loadData();
                    utility.AlertSuccess('Lưu thông tin thành công');
                    utility.removeloadding();
                }, function (error) {
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message);
                    } else {
                        utility.AlertError('Không thể thêm thông tin');
                    }
                    utility.removeloadding();
                });
            } else if (isEdit == false && checkQuyenUI('N')) {
                insert().then(function (success) {
                    $timeout(function () {
                        window.location = linkUrl + 'edit/' + success.data.data[0].ThayDoiThongTinId;
                    }, 2000);
                    utility.AlertSuccess('Thêm thông tin thành công');
                    utility.removeloadding();
                }, function (error) {
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message);
                    } else {
                        utility.AlertError('Không thể lưu thông tin');
                    }
                    utility.removeloadding();
                });
            }
        }

        vm.action.removeList = function () {
            if (checkQuyenUI('D') == false) { return; }
            if (confirm('Bạn có muốn xóa thay đổi thông tin ?')) {
                utility.addloadding($('body'));
                removeTDTT().then(function (success) {
                    utility.removeloadding();
                    utility.AlertSuccess('Xóa thông tin thành công');
                    window.location = linkUrl + 'list/';
                }, function (error) {
                    utility.removeloadding();
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message);
                    } else {
                        utility.AlertError('Không thể xóa thay đổi thông tin');
                    }
                })
            }
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

            if (isEdit == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function loadData() {
            if (!ThayDoiThongTinId) { return; }
            getTDTTById(ThayDoiThongTinId).then(function (success) {
                getTDTT_LoaiById(ThayDoiThongTinId, vm.data.TDTT.LoaiKeKhai);
                getTTKKById(vm.data.TDTT.TaiSanId, vm.data.TDTT.LoaiKeKhai);
            }, function (error) {
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

            prop_name = 'TenTaiSanMoi';
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
            if (!vm.data.TaiSanKK.LoaiKeKhai) {
                return checkInput;
            }

            switch (vm.data.TaiSanKK.LoaiKeKhai.toString()) {
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

            return checkInput;
        }

        // convert Thông tin kê khai -> thay đổi thông tin
        function convertTTKK_Old() {
            switch (vm.data.TaiSanKK.LoaiKeKhai.toString()) {
                case '1':
                    return TTKK_Dat();
                    break;
                case '2':
                    return TTKK_Nha();
                    break;
                case '3':
                    return TTKK_Oto();
                    break;
                case '4':
                    return TTKK_500();
                    break;
                default:
            }

            function TTKK_Dat() {
                delete vm.data.TTKK_Old; vm.data.TTKK_Old = {};

                vm.data.TTKK_Old.DiaChiCu = vm.data.TTKK_New.DiaChi;
                vm.data.TTKK_Old.GiayToCu = vm.data.TTKK_New.GiayTo;
                vm.data.TTKK_Old.DienTichCu = vm.data.TTKK_New.DienTich;
                vm.data.TTKK_Old.LamTruSoCu = vm.data.TTKK_New.LamTruSo;
                vm.data.TTKK_Old.CoSoHDSuNghiepCu = vm.data.TTKK_New.CoSoHDSuNghiep;
                vm.data.TTKK_Old.NhaOCu = vm.data.TTKK_New.NhaO;
                vm.data.TTKK_Old.ChoThueCu = vm.data.TTKK_New.ChoThue;
                vm.data.TTKK_Old.BoTrongCu = vm.data.TTKK_New.BoTrong;
                vm.data.TTKK_Old.BiLanChiemCu = vm.data.TTKK_New.BiLanChiem;
                vm.data.TTKK_Old.SuDungKhacCu = vm.data.TTKK_New.SuDungKhac;
            }
            function TTKK_Nha() {
                delete vm.data.TTKK_Old; vm.data.TTKK_Old = {};

                vm.data.TTKK_Old.DiaChiCu = vm.data.TTKK_New.DiaChi;
                vm.data.TTKK_Old.GiayToCu = vm.data.TTKK_New.GiayTo;
                vm.data.TTKK_Old.CapHangCu = vm.data.TTKK_New.CapHang;
                vm.data.TTKK_Old.SoTangCu = vm.data.TTKK_New.SoTang;
                vm.data.TTKK_Old.NamSuDungCu = vm.data.TTKK_New.NamSuDung;
                vm.data.TTKK_Old.DienTichCu = vm.data.TTKK_New.DienTich;
                vm.data.TTKK_Old.TongDienTichSanCu = vm.data.TTKK_New.TongDienTichSan;
                vm.data.TTKK_Old.LamTruSoCu = vm.data.TTKK_New.LamTruSo;
                vm.data.TTKK_Old.CoSoHDSuNghiepCu = vm.data.TTKK_New.CoSoHDSuNghiep;
                vm.data.TTKK_Old.NhaOCu = vm.data.TTKK_New.NhaO;
                vm.data.TTKK_Old.ChoThueCu = vm.data.TTKK_New.ChoThue;
                vm.data.TTKK_Old.BoTrongCu = vm.data.TTKK_New.BoTrong;
                vm.data.TTKK_Old.BiLanChiemCu = vm.data.TTKK_New.BiLanChiem;
                vm.data.TTKK_Old.SuDungKhacCu = vm.data.TTKK_New.SuDungKhac;
            }
            function TTKK_Oto() {
                delete vm.data.TTKK_Old; vm.data.TTKK_Old = {};

                vm.data.TTKK_Old.NhanHieuCu = vm.data.TTKK_New.NhanHieu;
                vm.data.TTKK_Old.BienKiemSoatCu = vm.data.TTKK_New.BienKiemSoat;
                vm.data.TTKK_Old.CongSuatXeCu = vm.data.TTKK_New.CongSuatXe;
                vm.data.TTKK_Old.TrongTaiCu = vm.data.TTKK_New.TrongTai;
                vm.data.TTKK_Old.ChucDanhCu = vm.data.TTKK_New.ChucDanh;
                vm.data.TTKK_Old.NguonGocXeCu = vm.data.TTKK_New.NguonGocXe;
                vm.data.TTKK_Old.LoaiXeCu = vm.data.TTKK_New.LoaiXe;
                vm.data.TTKK_Old.HienTrangSuDungCu = vm.data.TTKK_New.HienTrangSuDung;
                vm.data.TTKK_Old.TenHienTrangSuDungCu = vm.data.TTKK_New.TenHienTrangSuDung;

            }
            function TTKK_500() {
                delete vm.data.TTKK_Old; vm.data.TTKK_Old = {};

                vm.data.TTKK_Old.KyHieuCu = vm.data.TTKK_New.KyHieu;
                vm.data.TTKK_Old.HienTrangSuDungCu = vm.data.TTKK_New.HienTrangSuDung;
                vm.data.TTKK_Old.TenHienTrangSuDungCu = vm.data.TTKK_New.TenHienTrangSuDung;
            }
        }

        /*** API FUNCTION ***/
        function prepareTDTT() {
            var object = angular.copy(vm.data.TDTT);

            object.Ngay = utility.convertDateFormat(object.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD');

            return object;
        }
        function fixedTDTT(object) {
            object.Ngay = utility.convertDateFormat(object.Ngay, 'YYYY-MM-DD', 'DD/MM/YYYY');

            return object;
        }

        function getTDTTById(id) {
            var deferred = $q.defer();
            var data = {};
            data.ThayDoiThongTinId = id;
            data.CoSoId = userInfo.CoSoId || 0;
            data.NhanVienId = userInfo.NhanVienId || 0;
            ThayDoiThongTinKeKhaiService.getById(data).then(function (success) {
                console.log('ThayDoiThongTinKeKhaiService.getById.success');
                console.log(success);
                if (success.data.data && success.data.data.length) {
                    vm.data.TDTT = success.data.data[0];
                } else {
                    window.location = linkUrl + 'list';
                }
                vm.data.TDTT = vm.data.TDTT || {};
                fixedTDTT(vm.data.TDTT);
                return deferred.resolve(success);
            }, function (error) {
                console.log('ThayDoiThongTinKeKhaiService.getById.error');
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

            function getTDTT_DatById(id) {
                var deferred = $q.defer();
                var data = { ThayDoiThongTinId: id };
                ThayDoiThongTinKeKhaiService.getTDTT_DatById(data).then(function (success) {
                    console.log('ThayDoiThongTinKeKhaiService.getTDTT_DatById');
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
                ThayDoiThongTinKeKhaiService.getTDTT_NhaById(data).then(function (success) {
                    console.log('ThayDoiThongTinKeKhaiService.getTDTT_NhaById');
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
                ThayDoiThongTinKeKhaiService.getTDTT_OtoById(data).then(function (success) {
                    console.log('ThayDoiThongTinKeKhaiService.getTDTT_OtoById');
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
                ThayDoiThongTinKeKhaiService.getTDTT_500ById(data).then(function (success) {
                    console.log('ThayDoiThongTinKeKhaiService.getTDTT_500ById');
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
        }

        function getTTKKById(id,LoaiKeKhai) {
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
        }
        function insert() {
            var deferred = $q.defer();

            var data = {};
            data.TDTT = angular.toJson(prepareTDTT());
            data.TTKK = angular.toJson(vm.data.TTKK_New);
            data.TenTaiSanMoi = vm.data.TDTT.TenTaiSanMoi;
            data.LoaiKeKhai = vm.data.TDTT.LoaiKeKhai;

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            ThayDoiThongTinKeKhaiService.insertTDTT(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }

        function update() {
            var deferred = $q.defer();

            var data = {};
            data.TDTT = angular.toJson(prepareTDTT());
            data.TTKK = angular.toJson(vm.data.TTKK_New);
            data.TenTaiSanMoi = vm.data.TDTT.TenTaiSanMoi;
            data.LoaiKeKhai = vm.data.TDTT.LoaiKeKhai;

            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            ThayDoiThongTinKeKhaiService.updateTDTT(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }

        function removeTDTT() {
            var deferred = $q.defer();
            var data = {};
            data.ThayDoiThongTinId = vm.data.TDTT.ThayDoiThongTinId;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            ThayDoiThongTinKeKhaiService.remove(data).then(function (success) {
                console.log('ThayDoiThongTinKeKhaiService.remove');
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

    });
})();
