(function () {
    'use strict';

    angular.module('app')
        .controller('ThongTinNhanVienEditCtrl', controller);

    function controller($scope, utility, NhanVienService, $window) {
        var vm = this;
        var nhanVienId = 0;
        var listQuyenTacVu = [];
        var linkUrl = '';

        vm.controllerId = 'ThongTinNhanVienEditCtrl';

        vm.status = {
            isLoading: false,
            isEdit: false,
            errorMessage: '',
            infoMessage: '',

            /* INPUT ERROR STATUS */
            errMaNhanVien: '',
            errHoNhanVien: '',
            errTenNhanVien: '',
            errPhongBanId: '',
        }
        vm.data = {
            nhanVien: {},
            dangLamViec: true,
        };

        vm.action = {
            save: save,
            clearPhongBan: clearPhongBan,
            clearChucVu: clearChucVu,
            keyPress: keyPress,
            checkMa: checkMa,
        }

        vm.action.getListChiNhanh = function () {
            console.log(vm.controllerId + '.action.getListChiNhanh');
            $scope.$emit(vm.controllerId + '.action.getListChiNhanh', '');
        }

        vm.action.clearChiNhanh = function () {
            vm.data.nhanVien.ChiNhanhId = '';
            vm.data.nhanVien.TenChiNhanh = '';
            vm.data.nhanVien.MaChiNhanh = '';
        }

        /***************************************************
         * INIT FUNCTION
         */

        vm.onInitView = function (config) {
            if (config && config.nhanVienId) {
                nhanVienId = config.nhanVienId;
                vm.status.isEdit = true;
                getThongTin(nhanVienId);
            }

            if (config && config.userInfo) {
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (config && config.editUrl) {
                linkUrl = config.url;
            }

            if (config && config.userInfo) {
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');

                if (nhanVienId == 0 && checkQuyenTacVu('N') == false) {
                    window.location.href = linkUrl + 'list/';
                }
            }

            initEventListener();
        };

        activate();
        function activate() { }

        /**************************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.getPhongBan', function (e, v) {
                if (v && v.length > 0) { } else { return; }

                vm.data.nhanVien.PhongBanId = v[0].PhongBanId || 0;
                vm.data.nhanVien.TenPhongBan = v[0].TenPhongBan || '';
            });

            $scope.$on(vm.controllerId + '.action.getChucVu', function (e, v) {
                if (v && v.length > 0) { } else { return; }

                vm.data.nhanVien.ChucVuId = v[0].ChucVuId || 0;
                vm.data.nhanVien.TenChucVu = v[0].TenChucVu || '';
            });

            $scope.$on(vm.controllerId + '.data.listChiNhanh', function (e, v) {
                console.log(v);
                vm.action.clearChiNhanh();
                if (v && v.listChiNhanh && v.listChiNhanh.length > 0) {
                    vm.data.nhanVien.ChiNhanhId = v.listChiNhanh[0].ChiNhanhId;
                    vm.data.nhanVien.TenChiNhanh = v.listChiNhanh[0].TenChiNhanh;
                    vm.data.nhanVien.MaChiNhanh = v.listChiNhanh[0].MaChiNhanh;
                }
            });
        }

        /***************************
         * ACTION FUNCTION
         */

        function save() {
            if (validNhanVien() == false) { }
            else if (nhanVienId != 0) {
                updateNhanVien();
            } else {
                insertNhanVien();
            }
        }

        /*******************************
         * BIZ FUNCTION
         */

        /* kiểm tra quyền tác vụ */
        function checkQuyenTacVu(quyen) {
            console.log(quyen + ':' + (listQuyenTacVu.indexOf(quyen) >= 0));
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function validNhanVien() {
            resetErrorMessage();
            if (!vm.data.nhanVien.Ma) {
                vm.status.errMa = 'chưa nhập Mã nhân viên.';
                message('error', vm.status.errMa);
                $('#TTNV_txtMa').focus();
                return false;
            }
            if (!vm.data.nhanVien.Ho) {
                vm.status.errHo = 'chưa nhập Họ nhân viên.';
                message('error', vm.status.errHo);
                $('#TTNV_txtHo').focus();
                return false;
            }
            if (!vm.data.nhanVien.Ten) {
                vm.status.errTen = 'chưa nhập Tên nhân viên.';
                message('error', vm.status.errTen);
                $('#TTNV_txtTen').focus();
                return false;
            }
            if (!vm.data.nhanVien.PhongBanId) {
                vm.status.errPhongBanId = 'chưa chọn phòng ban.';
                message('error', vm.status.errPhongBanId);
                $('#TTNV_txtPhongBanId').focus();
                return false;
            }
            return true;
        }

        function clearPhongBan() {
            vm.data.nhanVien.PhongBanId = 0;
            vm.data.nhanVien.TenPhongBan = '';
        }

        function clearChucVu() {
            vm.data.nhanVien.ChucVuId = 0;
            vm.data.nhanVien.TenChucVu = '';
        }

        /*  xử lý dữ liệu trước khi gọi api */
        function prepareThongTinNhanVien() {
            vm.data.nhanVien.MaTrangThai = vm.data.dangLamViec ? 'NV_DL' : 'NV_NL';
        }

        /* xử lý dữ liệu sau khi gọi api */
        function fixThongTinNhanVien() {
            vm.data.nhanVien.NgaySinh = utility.convertDateFormat(vm.data.nhanVien.NgaySinh, 'YYYY-MM-DD', 'DD/MM/YYYY');
            vm.data.nhanVien.NgayCap = utility.convertDateFormat(vm.data.nhanVien.NgayCap, 'YYYY-MM-DD', 'DD/MM/YYYY');
            vm.data.nhanVien.NgayTuyenDung = utility.convertDateFormat(vm.data.nhanVien.NgayTuyenDung, 'YYYY-MM-DD', 'DD/MM/YYYY');

            vm.data.dangLamViec = vm.data.nhanVien.MaTrangThai == 'NV_DL';
        }

        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error

                if (fromId == 'TTNV_txtMa') {
                    vm.status.errMa = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errMa = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'TTNV_txtHo') {
                    vm.status.errHo = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errHo = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'TTNV_txtTen') {
                    vm.status.errTen = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errTen = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'TTNV_txtPhongBanId') {
                    vm.status.errPhongBanId = ' ';
                    if (!value) {
                        vm.status.errPhongBanId = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        /******************************
         * API FUNCTION
         */
        function insertNhanVien() {
            vm.status.isLoading = true;
            message('info', 'Đang lưu thông tin nhân viên ...');

            prepareThongTinNhanVien();

            var data = utility.clone(vm.data.nhanVien);
            data.NgaySinh = utility.convertDateFormat(data.NgaySinh, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.NgayCap = utility.convertDateFormat(data.NgayCap, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.NgayTuyenDung = utility.convertDateFormat(data.NgayTuyenDung, 'DD/MM/YYYY', 'YYYY-MM-DD');

            NhanVienService.insertThongTin(data).then(function (result) {
                if (result.data && result.data.data && result.data.data.NhanVienId > 0) {
                    alert('Lưu thông tin nhân viên thành công.');
                    message('info', 'Lưu thông tin nhân viên thành công.');
                    window.location.href = linkUrl + 'edit/' + result.data.data.NhanVienId;

                }
            }, function (result) {
                message('error', 'không thể lưu thông tin nhân viên.');
                console.log(result);
            });
        }

        function updateNhanVien() {
            vm.status.isLoading = true;
            message('info', 'Đang lưu thông tin nhân viên ...');

            prepareThongTinNhanVien();

            var data = utility.clone(vm.data.nhanVien);
            data.NgaySinh = utility.convertDateFormat(data.NgaySinh, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.NgayCap = utility.convertDateFormat(data.NgayCap, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.NgayTuyenDung = utility.convertDateFormat(data.NgayTuyenDung, 'DD/MM/YYYY', 'YYYY-MM-DD');

            NhanVienService.updateThongTin(data).then(function (result) {
                if (result.data && result.data.data && result.data.data.NhanVienId > 0) {
                    alert('Lưu thông tin nhân viên thành công.');
                    message('info', 'Lưu thông tin nhân viên thành công.');
                    getThongTin(result.data.data.NhanVienId)
                }
                vm.status.isLoading = false;
            }, function (result) {
                message('error', 'không thể lưu thông tin nhân viên.');
                console.log(result);
                vm.status.isLoading = false;
            });
        }

        function getThongTin(id) {
            vm.status.isLoading = true;
            message('info', 'Đang tải thông tin nhân viên ...');

            NhanVienService.getThongTin(id).then(function (result) {
                console.log(result);
                message('', '');
                if (result.data && result.data.data && result.data.data.length) {
                    vm.data.nhanVien = result.data.data[0];
                    fixThongTinNhanVien();
                } else {
                    message('error', 'Không tìm thấy nhân viên');
                }
                vm.status.isLoading = false;
            }, function (result) {
                message('', '');
                console.log(result);
                vm.status.isLoading = false;
            });
        }

        function checkMa(ma) {
            if (!vm.data.nhanVien.Ma) {
                vm.status.errMa = 'chưa nhập Mã nhân viên.';
                message('error', vm.status.errMa);
                $('#TTNV_txtMa').focus();
                return;
            }

            vm.status.isLoading = true;
            message('info', 'Đang kiểm tra mã nhân viên ...');

            NhanVienService.getThongTinByMa(vm.data.nhanVien.Ma).then(function (result) {
                message('', '');
                if (result.data && result.data.data && result.data.data.length) {
                    vm.status.errMa = 'chưa nhập Mã nhân viên.';
                    message('error', vm.status.errMa);
                } else {
                    alert('Có thể dùng mã nhân viên này');
                    vm.status.errMa = '';
                    message('info', 'Có thể dùng mã nhân viên này');
                }
                vm.status.isLoading = false;
            }, function (result) {
                message('error', 'Không thể kiểm tra mã nhân viên');
                console.log(result);
                vm.status.isLoading = false;
            });
        }

        /******************************
         * HELPERS FUNCTION
         */

        function resetErrorMessage() {
            message('', '');

            vm.status.errMaNhanVien = '';
            vm.status.errHoNhanVien = '';
            vm.status.errTenNhanVien = '';
            vm.status.errPhongBanId = '';
        }

        function message(type, message) {
            vm.status.infoMessage = '';
            vm.status.errorMessage = '';

            switch (type) {
                case 'info':
                    vm.status.infoMessage = message;
                    break;
                case 'error':
                    vm.status.errorMessage = message;
                    break;
                default:
                    break;
            }
        }
    }
})();