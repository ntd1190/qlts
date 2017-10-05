(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('DanhGiaTaiSanEditCtrl', function (DanhGiaTaiSanService, TaiSanService, utility, $timeout, $scope, $q) {
        var vm = this, userInfo, TaiSanSD,
            isEdit = false, DanhGiaId = 0, linkUrl = '';

        vm.error = {};
        vm.status = {};
        vm.data = {};
        vm.data.TaiSan_New = {};
        vm.data.TaiSan_Old = {};
        vm.data.DanhGia = {};

        vm.data.listNguyenGia = [];
        vm.data.NguyenGia = 0;
        vm.data.TaiSan = {};

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
        function activate() { };

        vm.onInitView = function (config) {
            console.log('vm.onInitView');
            console.log(config);
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            if (config && config.isEdit) {
                isEdit = config.isEdit;
                vm.status.isEdit = isEdit;
            }
            if (config && config.DanhGiaId) {
                DanhGiaId = config.DanhGiaId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (isEdit) {
                loadDataDanhGia();
                loadDataTaiSan();
            } else {
                vm.action.addNguyenGia();
            }
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.addNguyenGia = function () {
            if (checkQuyenUI('N') == false && checkQuyenUI('M') == false) { return; }
            vm.data.listNguyenGia.push({ GiaTri: 0, isCreate: true });
        }
        vm.action.removeNguyenGia = function (index) {
            vm.data.listNguyenGia.splice(index, 1);
        }
        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.save = function () {
            console.log('vm.action.save');
            if (checkQuyenUI('N') == false && checkQuyenUI('M') == false) { return; }

            var has_error = false;

            if (checkInputDanhGia() == false) {
                has_error = true;
            }

            if (checkNguyenGiaList() == false || checkNguyenGiaNganSach() == false) {
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
            if (checkInputDanhGia($(event.target).data('name')) === false) {
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

        vm.action.In = function () {
            var report_name = '';
            switch (vm.data.DanhGia.LoaiKeKhai.toString()) {
                case '1':
                    report_name = 'rptDanhGia_Nha';
                    break;
                case '2':
                    report_name = 'rptDanhGia_Nha';
                    break;
                case '3':
                    report_name = 'rptDanhGia_Oto';
                    break;
                case '4':
                    report_name = 'rptDanhGia_Tren500';
                    break;
            }

            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=' + report_name + '&data=' + DanhGiaId);
            $('#reportmodal').modal('show');
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

        function loadDataDanhGia() {
            getDanhGiaById(DanhGiaId);
        }

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

        function tinhHaoMonCu() {
            vm.data.NguyenGiaCu = vm.data.NguyenGiaCu || 0;
            vm.data.DanhGia.TyLeHaoMonCu = vm.data.DanhGia.TyLeHaoMonCu || 0;

            vm.data.DanhGia.HaoMonNamCu = vm.data.NguyenGiaCu * vm.data.DanhGia.TyLeHaoMonCu / 100;

            vm.data.DanhGia.SoNamSDConLaiCu = (moment().year() - moment(vm.data.DanhGia.NgayBDHaoMonCu, 'YYYY-MM-DD').year());
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSuDungCu - vm.data.DanhGia.SoNamSDConLaiCu;
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSDConLaiCu < 0 ? 0 : vm.data.DanhGia.SoNamSDConLaiCu;
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSDConLaiCu || 0;

            vm.data.DanhGia.HaoMonLuyKeCu = (vm.data.DanhGia.SoNamSuDungCu - vm.data.DanhGia.SoNamSDConLaiCu) * vm.data.DanhGia.HaoMonNamCu;
            vm.data.DanhGia.HaoMonLuyKeCu = vm.data.DanhGia.HaoMonLuyKeCu || 0;

            vm.data.DanhGia.GiaTriConLaiCu = vm.data.NguyenGiaCu - vm.data.DanhGia.HaoMonLuyKeCu;
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

        function loadDataTaiSan() {
            if (!TaiSanSD || !TaiSanSD.TaiSanId) { return; }

            getTaiSanById(TaiSanSD.TaiSanId).then(function (success) {
                console.log('getTaiSanById(TaiSanSD.TaiSanId)');
                console.log(vm.data.TaiSan);
                $q.all([getListNguyenGia()]).then(function () {
                    $timeout(function () {
                        importDanhGiaFromTaiSan();
                    }, 0);
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

        function checkInputDanhGia(inputName) {
            console.log('checkInputTDTT');
            var has_error = false, first_error_name = '',
                obj_name = 'DanhGia', // Tên sử dung trong vm.data.obj_name
                prop_name = '', // tên thuộc tính của obj_name
                prefix_name = 'DanhGia', // tiền tố của error name, tránh trùng tên
                error_name = '';

            prop_name = 'SoChungTu';
            error_name = prefix_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NgayChungTu';
            error_name = prefix_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NgayDanhGia';
            error_name = prefix_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'TaiSanId';
            error_name = prefix_name + '_' + prop_name;
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

        function importDanhGiaFromTaiSan() {
            console.log('importDanhGiaFromTaiSan');
            vm.data.DanhGia.NgayBDHaoMonCu = vm.data.TaiSan.NgayBDHaoMon;

            vm.data.DanhGia.HaoMonLuyKeCu = vm.data.DanhGia.HaoMonLuyKeCu != null ? vm.data.DanhGia.HaoMonLuyKeCu : (vm.data.TaiSan.HaoMonLuyKe || 0);
            vm.data.DanhGia.SoNamSuDungCu = vm.data.DanhGia.SoNamSuDungCu != null ? vm.data.DanhGia.SoNamSuDungCu : (vm.data.TaiSan.SoNamSuDung || 0);
            vm.data.DanhGia.TyLeHaoMonCu = vm.data.DanhGia.TyLeHaoMonCu != null ? vm.data.DanhGia.TyLeHaoMonCu : (vm.data.TaiSan.TyLeHaoMon || 0);
            vm.data.DanhGia.SLTonCu = vm.data.DanhGia.SLTonCu != null ? vm.data.DanhGia.SLTonCu : (vm.data.TaiSan.SLTon || 0);

            vm.data.DanhGia.HaoMonNamCu = vm.data.DanhGia.HaoMonNamCu != null ? vm.data.DanhGia.HaoMonNamCu : (vm.data.TaiSan.HaoMonNam || 0);
            vm.data.DanhGia.SoNamSDConLaiCu = vm.data.DanhGia.SoNamSDConLaiCu != null ? vm.data.DanhGia.SoNamSDConLaiCu : (vm.data.TaiSan.SoNamSDConLai || 0);
            vm.data.DanhGia.GiaTriConLaiCu = vm.data.DanhGia.GiaTriConLaiCu != null ? vm.data.DanhGia.GiaTriConLaiCu : (vm.data.TaiSan.GiaTriConLai || 0);

            tinhHaoMonCu();
        }
        /*** API FUNCTION TÀI SẢN ***/

        // chuẩn bị dữ liệu gửi api
        function prepareTaiSan(object) { }

        // fixed dữ liệu sau khi nhận từ api
        function fixTaiSan(object) {
            object.SLTon = TaiSanSD.SoLuongTon;
        }

        function prepareDanhGia(object) {
            object.NgayChungTu = utility.convertDateFormat(object.NgayChungTu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            object.NgayDanhGia = utility.convertDateFormat(object.NgayDanhGia, 'DD/MM/YYYY', 'YYYY-MM-DD');
            object.NgayTao = utility.convertDateFormat(object.NgayTao, 'DD/MM/YYYY', 'YYYY-MM-DD');
            return object;
        }

        function fixDanhGia(object) {
            object.NgayChungTu = utility.convertDateFormat(object.NgayChungTu, 'YYYY-MM-DD', 'DD/MM/YYYY');
            object.NgayDanhGia = utility.convertDateFormat(object.NgayDanhGia, 'YYYY-MM-DD', 'DD/MM/YYYY');
            object.NgayTao = utility.convertDateFormat(object.NgayTao, 'YYYY-MM-DD', 'DD/MM/YYYY');
            object.SoChungTu = object.SoChungTu.trim();
            return object;
        }
        function insert() {
            utility.addloadding($('body'));
            var data = {};

            data.DanhGia = angular.toJson(prepareDanhGia(angular.copy(vm.data.DanhGia)));
            data.NguyenGiaList = angular.toJson(vm.data.listNguyenGia);
            data.SoNamSuDung = vm.data.TaiSan.SoNamSuDung;
            data.TyLeHaoMon = vm.data.TaiSan.TyLeHaoMon;
            data.HaoMonLuyKe = vm.data.TaiSan.HaoMonLuyKe;
            data.SLTon = vm.data.TaiSan.SLTon;

            data.COSO_ID = userInfo.CoSoId;
            data.NHANVIEN_ID = userInfo.NhanVienId;

            DanhGiaTaiSanService.insert(data).then(function (success) {
                console.log(success);
                $timeout(function () {
                    window.location = linkUrl + 'edit/' + success.data.data[0].DanhGiaId;
                }, 2000);
                utility.removeloadding();
                utility.AlertSuccess('Thêm thông tin thành công');
            }, function (error) {
                console.log(error);
                utility.removeloadding();
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể thêm thông tin');
                }
            });
        }

        function getDanhGiaById(DanhGiaId) {
            var deferred = $q.defer();
            var data = {};
            data.DanhGiaIds = DanhGiaId;

            data.COSO_ID = userInfo.CoSoId;
            data.NHANVIEN_ID = userInfo.NhanVienId;

            DanhGiaTaiSanService.getById(data).then(function (success) {
                console.log('DanhGiaTaiSanService.getPage.success');
                console.log(success);
                delete vm.data.DanhGia;
                vm.data.DanhGia = success.data.data[0];
                vm.data.DanhGia = vm.data.DanhGia || {};
                fixDanhGia(vm.data.DanhGia);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }

        function getTaiSanById(TaiSanId) {
            var deferred = $q.defer();
            var data = {};
            data.TaiSanId = TaiSanId;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            TaiSanService.getById(data).then(function (success) {
                console.log('TaiSanService.getById.success');
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
            data.DanhGiaId = vm.data.DanhGia.DanhGiaId;
            data.CoSoId = userInfo.CoSoId;
            data.NhanVienId = userInfo.NhanVienId;

            DanhGiaTaiSanService.removeById(data).then(function (success) {
                console.log(success);
                utility.AlertSuccess('Xóa thông tin thành công');
                $timeout(function () {
                    window.location = linkUrl + 'list/';
                }, 2000);
            }, function (error) {
                console.log(error);
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể xóa thông tin');
                }
            });

        }


        function update() {
            utility.addloadding($('body'));
            var data = {};

            data.DanhGia = angular.toJson(prepareDanhGia(angular.copy(vm.data.DanhGia)));
            data.NguyenGiaList = angular.toJson(vm.data.listNguyenGia);
            data.SoNamSuDung = vm.data.TaiSan.SoNamSuDung;
            data.TyLeHaoMon = vm.data.TaiSan.TyLeHaoMon;
            data.HaoMonLuyKe = vm.data.TaiSan.HaoMonLuyKe;
            data.SLTon = vm.data.TaiSan.SLTon;

            data.COSO_ID = userInfo.CoSoId;
            data.NHANVIEN_ID = userInfo.NhanVienId;

            DanhGiaTaiSanService.update(data).then(function (success) {
                console.log(success);
                utility.removeloadding();
                utility.AlertSuccess('Lưu thông tin thành công');
            }, function (error) {
                console.log(error);
                utility.removeloadding();
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Không thể lưu thông tin');
                }
            });
        }

        function getListNguyenGia() {
            var deferred = $q.defer();

            var data = {};
            data.TaiSanId = TaiSanSD.TaiSanId;
            data.DanhGiaId = DanhGiaId;

            DanhGiaTaiSanService.getListNguyenGiaByDanhGia(data).then(function (success) {
                console.log('DanhGiaTaiSanService.getListNguyenGiaByDanhGia');
                console.log(success);
                delete vm.data.listNguyenGia;
                vm.data.listNguyenGia = success.data.data;
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
            return sum || 0;
        };
    });
})();
