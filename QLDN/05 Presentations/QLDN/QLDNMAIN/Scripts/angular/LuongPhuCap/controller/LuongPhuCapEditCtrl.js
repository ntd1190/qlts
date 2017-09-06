(function () {
    'use strict';

    angular.module('app')
        .controller('LuongPhuCapEditCtrl', controller);

    function controller(utility, LuongPhuCapService, $window) {
        activate();

        /*********************************
         * PRIVATE
         */
        var isEdit = false;
        var nhanVienId = 0;
        var luongPhucap = 0;
        var vm = this;

        /******************************
         * VIEW MODEL
         */

        vm.onInitView = onInitView;
        vm.controllerId = 'LuongPhuCapEditCtrl';

        vm.status = {
            isLoading: '',
            infoMessage: '',
            errorMessage: '',
        };

        vm.data = {
            luongPhuCap: {
                NhanVienId: '0',
                LuongPhuCapId: '0',
                ComTrua: '0',
                DienThoai: '0',
                DongPhuc: '0',
                Khac: '0',
                LuongCoBan: '0',
                TrachNhiem: '0',
                LuongChinhThuc: '0',
                HuongLuong: 1.00,
            }
        };

        vm.action = {
            save: save,
            keyPress: keyPress,
        }

        /***************************************
         * INIT FUNCTION
         */

        function onInitView(config) {
            if (config && config.nhanVienId > 0) {
                nhanVienId = config.nhanVienId;
                getLuongPhuCapByNhanVienId(nhanVienId);
            } else {
                nhanVienId = 0;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

        };

        function activate() { };

        /***************************************
         * ACTION FUNCTION
         */


        function save() {
            message('', '');
            delete vm.status;
            vm.status = {};

            if (validLuongPhuCap() == false) { return; }
            if (nhanVienId) { } else {
                alert('Phải lưu nhân viên trước khi nhập lương phụ cấp');
                message('error', 'Phải lưu nhân viên trước khi nhập lương phụ cấp');
                return;
            }
            if (isEdit) {
                updateLuongPhuCap();
            } else {
                insertLuongPhuCap();
            }
        }

        /***************************************
         * BROADCAST / EMIT / ON FUNCTION
         */

        function initEventListener() { }

        /*************************************
         * BIZ FUNCTION
         */

        function validLuongPhuCap() {
            //vm.status.errHuongLuong = '';
            //if (utility.checkInValid(vm.data.luongPhuCap.HuongLuong, 'isNumber') || vm.data.luongPhuCap.HuongLuong > 100) {
            //    vm.status.errHuongLuong = ' ';
            //    $window.document.getElementById('#LPC_txtHuongLuong').focus();
            //    return false;
            //}
            return true;
        }

        function keyPress(value, fromId, ToId, event) {
            console.log(value);
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error             
                if (fromId == '_LPC_txtLuongCoBan') {
                    vm.status.errLuongCoBan = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errLuongCoBan = '';
                        $window.document.getElementById(ToId).focus();
                    }
                //} else if (fromId == '_LPC_txtLuongChinhThuc') {
                //    vm.status.errLuongChinhThuc = ' ';
                //    if (!utility.checkInValid(value, 'isEmpty')) {
                //        vm.status.errLuongChinhThuc = '';
                //        $window.document.getElementById(ToId).focus();
                //    }
                //} else if (fromId == 'LPC_txtHuongLuong') {
                //    vm.status.errHuongLuong = ' ';
                //    if (!utility.checkInValid(value, 'isNumber') && value <= 100) {
                //        vm.status.errHuongLuong = '';
                //        $window.document.getElementById(ToId).focus();
                //    }
                } else if (fromId == '_LPC_txtComTrua') {
                    vm.status.errComTrua = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errComTrua = '';
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == '_LPC_txtDienThoai') {
                    vm.status.errDienThoai = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errDienThoai = '';
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == '_LPC_txtTrachNhiem') {
                    vm.status.errTrachNhiem = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errTrachNhiem = '';
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == '_LPC_txtDongPhuc') {
                    vm.status.errDongPhuc = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errDongPhuc = '';
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == '_LPC_txtKhac') {
                    vm.status.errKhac = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errKhac = '';
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        function prepareLuongPhuCap(data) {
            data.NhanVienId = data.NhanVienId || 0;
            data.LuongPhuCapId = data.LuongPhuCapId || 0;
            data.ComTrua = data.ComTrua || 0;
            data.DienThoai = data.DienThoai || 0;
            data.DongPhuc = data.DongPhuc || 0;
            data.Khac = data.Khac || 0;
            data.LuongCoBan = data.LuongCoBan || 0;
            data.TrachNhiem = data.TrachNhiem || 0;
            data.LuongChinhThuc = data.LuongChinhThuc || 0;
            data.HuongLuong = data.HuongLuong ? data.HuongLuong / 100 : 0;
        }

        function fixLuongPhuCap(data) {
            data.NhanVienId = data.NhanVienId || 0;
            data.LuongPhuCapId = data.LuongPhuCapId || 0;
            data.ComTrua = data.ComTrua || 0;
            data.DienThoai = data.DienThoai || 0;
            data.DongPhuc = data.DongPhuc || 0;
            data.Khac = data.Khac || 0;
            data.LuongCoBan = data.LuongCoBan || 0;
            data.TrachNhiem = data.TrachNhiem || 0;
            data.LuongChinhThuc = data.LuongChinhThuc || 0;
            data.HuongLuong = data.HuongLuong ? data.HuongLuong * 100 : 0;
        }
        /************************************
         * API FUNCTION
         */

        function insertLuongPhuCap() {
            vm.status.isLoading = true;
            message('info', 'Đang lưu thông tin lương phụ cấp ...');
            vm.data.luongPhuCap.NhanVienId = nhanVienId;
            var data = utility.clone(vm.data.luongPhuCap);
            prepareLuongPhuCap(data);
            LuongPhuCapService
                .insertLuongPhuCap(data)
                .then(function (result) {
                    console.log(result);
                    alert('Lưu thông tin lương phụ câp thành công');
                    message('info', 'Lưu thông tin lương phụ câp thành công.');

                    if (result.data && result.data.data) {
                        getLuongPhuCapByNhanVienId(nhanVienId);
                    }
                    isEdit = true;
                    vm.status.isLoading = false;
                }, function (result) {
                    console.log(result);
                    message('error', 'Không thể lưu thông tin lương phụ cấp.');
                    vm.status.isLoading = false;
                });
        }

        function updateLuongPhuCap() {
            vm.status.isLoading = true;
            message('info', 'Đang lưu thông tin lương phụ cấp ...');
            var data = utility.clone(vm.data.luongPhuCap);
            prepareLuongPhuCap(data);

            LuongPhuCapService
                .updateLuongPhuCap(data)
                .then(function (result) {
                    console.log(result);
                    alert('Lưu thông tin lương phụ câp thành công');
                    message('info', 'Lưu thông tin lương phụ câp thành công.');

                    if (result.data && result.data.data) {
                        getLuongPhuCapByNhanVienId(nhanVienId);
                    }
                    vm.status.isLoading = false;
                }, function (result) {
                    console.log(result);
                    message('error', 'Không thể lưu thông tin lương phụ cấp.');
                    vm.status.isLoading = false;
                });
        }

        function getLuongPhuCapByNhanVienId(nhanVienId) {
            vm.status.isLoading = true;
            message('info', 'Đang tải thông tin lương phụ cấp ...');
            var data = { nhanVienId: nhanVienId };

            LuongPhuCapService
                .getByNhanVienId(data)
                .then(function (result) {
                    console.log(result);
                    message('', '');

                    delete vm.data.luongPhuCap;
                    if (result.data && result.data.data && result.data.data.length > 0) {
                        vm.data.luongPhuCap = result.data.data[0];
                        fixLuongPhuCap(vm.data.luongPhuCap);
                        isEdit = true;
                    }
                    vm.status.isLoading = false;
                }, function (result) {
                    console.log(result);
                    message('error', 'Không thể tải thông tin lương phụ cấp.');
                    vm.status.isLoading = false;
                });
        }

        /*************************************
         * HELPERS FUNCTION
         */

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
    };
})();