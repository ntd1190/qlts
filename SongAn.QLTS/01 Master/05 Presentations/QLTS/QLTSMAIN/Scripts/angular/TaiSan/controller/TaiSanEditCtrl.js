(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('TaiSanEditCtrl', function (TaiSanService, utility, $timeout) {
        var vm = this, userInfo, isEdit = false, TaiSanId = 0, linkUrl = '';

        vm.data = {};
        vm.data.TaiSan = {};
        vm.data.listNguyenGia = [];

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
            if (!checkNguyenGiaList()) {
                return;
            }
            if (!checkNguyenGiaNganSach()) {
                utility.AlertError('Nguồn ngân sách không được trùng');
                return;
            }
            if (isEdit == 1 && checkQuyenUI('M')) {
                update();
            } else if (isEdit == 0 && checkQuyenUI('N')) {
                insert();
            }
        }

        /*** HOT KEY ***/
        vm.keys = {
            //press F2 -> open popup
            F2: function (name, code) {
                vm.action.addNguyenGia();
            },

            F8: function (name, code) {
            }
        };

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
            console.log('activate');
        };

        vm.onInitView = function (config) {
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            if (config && config.isEdit) {
                isEdit = config.isEdit;
            }
            if (config && config.TaiSanId) {
                TaiSanId = config.TaiSanId;
                getById(TaiSanId);
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
        };

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

        function getById(id) {
            var data = { TaiSanId: TaiSanId };
            TaiSanService.getById(data).then(function (success) {
                console.log(success);
                vm.data.TaiSan = success.data.data[0];
                fixTaiSan(vm.data.TaiSan);
                getListNguyenGia();
            }, function (error) {
                console.log(error);
            });
        }
        function insert() {
            var data = angular.copy(vm.data.TaiSan);
            data.CoSoId = 1;
            data.NhanVienId = 6;
            prepareTaiSan(data);
            data.NguyenGiaList = angular.toJson(vm.data.listNguyenGia);

            TaiSanService.insert(data).then(function (success) {
                console.log(success);
                utility.AlertSuccess('Cập nhật tài sản thành công');
                $timeout(function () {
                    window.location = linkUrl + 'edit/' + success.data.data[0].TaiSanId;
                }, 2000);
            }, function (error) {
                console.log(error);
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    utility.AlertError('Không thể thêm tài sản');
                }
            });
        }
        function update() {
            utility.addloadding($('body'));
            var data = angular.copy(vm.data.TaiSan);
            data.CoSoId = 1;
            data.NhanVienId = 6;
            prepareTaiSan(data);
            data.NguyenGiaList = angular.toJson(vm.data.listNguyenGia);

            TaiSanService.update(data).then(function (success) {
                console.log(success);
                utility.removeloadding();
                getById(TaiSanId);
                utility.AlertSuccess('Cập nhật tài sản thành công');
            }, function (error) {
                console.log(error);
                utility.removeloadding();
                if (error.status === 400) {
                    alert(error.data.error.message);
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
