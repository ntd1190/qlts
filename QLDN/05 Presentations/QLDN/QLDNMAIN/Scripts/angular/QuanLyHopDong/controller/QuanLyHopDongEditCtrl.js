/*****************************************************************************
1. Create Date : 2017.05.25
2. Creator     : Nguyen Thanh Binh
3. Description : javascript quản lý hợp đồng
4. History     : 2017.05.25 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app')
        .controller('QuanLyHopDongEditCtrl', controller);
    function controller($scope, QuanLyHopDongService, utility) {
        /*********************************
         * PRIVATE
         */

        var vm = this;
        var userInfo;
        var nhanVienId = 0;
        var listQuyenTacVu = [];
        var _tableState;
        var caller;

        /************************************
         * VIEW MODEL
         */

        vm.controllerId = 'QuanLyHopDongEditCtrl';

        vm.status = {
            isLoading: false,
            errTuNgay: '',
            errDenNgay: '',
            errHopDong: '',
            errLuong: '',
            errHuongLuong: '',
            errNgayKetThucSom: '',
        };

        vm.data = {
            hopDong: {},
        };

        /***************************************************
         * INIT FUNCTION
         */

        (function activate() {
        })();

        vm.onInitView = function (config) {
            console.log(config);
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                userInfo = config.userInfo;
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        }

        /**************************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.editHopDong', function (e, v) {
                console.log(v);

                reset();

                if (v && v.nhanVienId) {
                    nhanVienId = v.nhanVienId;
                }

                if (v && v.hopdong && v.hopdong.QuanLyHopDongId > 0) {
                    vm.data.hopDong = v.hopdong;
                    fixHopDong(vm.data.hopDong);
                } else {
                    delete vm.data.hopDong;
                    vm.data.hopDong = {};
                }

                $('#' + vm.controllerId).collapse('show');
            });
        }

        function emitApDung() {
            $scope.$emit(vm.controllerId + '.action.ap-dung', '');
            $('#' + vm.controllerId).collapse('hide');
        }

        /*******************************************************
         * ACTION FUNCTION
         */

        vm.action = {
            convertDateFormat: utility.convertDateFormat,
            save: save,
            keyPress: keyPress,
            updateXoa: function () {
                if (confirm('Bạn có muốn xóa hợp đồng ?') == false) { return; }
                updateXoa(vm.data.hopDong);
            },
            close: function () {
                $('#' + vm.controllerId).collapse('hide');
            }
        };

        /*******************************************
         * BIZ FUNCTION
         */

        function save() {
            console.log(vm.data.hopDong);

            if (validHopDong() == true) { return; }

            if (vm.data.hopDong) { } else {
                alert('Không thể lưu hợp đồng');
                return;
            }
            if (vm.data.hopDong.QuanLyHopDongId > 0) {
                update(vm.data.hopDong);
            } else {
                insert(vm.data.hopDong);
            }
        }

        function reset() {
            delete vm.data.hopDong;
            vm.data.hopDong = {};

            vm.status = {
                isLoading: false,
                errTuNgay: '',
                errDenNgay: '',
                errHopDong: '',
                errLuong: '',
                errHuongLuong: '',
            };
        }

        /* nắn thông tin để hiện */
        function fixHopDong(hopdong) {
            if (hopdong) {
                hopdong.TuNgay = utility.convertDateFormat(hopdong.TuNgay, 'YYYY-MM-DD', 'DD/MM/YYYY');
                hopdong.DenNgay = utility.convertDateFormat(hopdong.DenNgay, 'YYYY-MM-DD', 'DD/MM/YYYY');
                hopdong.NgayKetThucSom = utility.convertDateFormat(hopdong.NgayKetThucSom, 'YYYY-MM-DD', 'DD/MM/YYYY');
                hopdong.strHuongLuong = hopdong.HuongLuong * 100;
            }
            return hopdong;
        }

        /* nắn thông tin để lưu */
        function prepareHopDong(hopdong) {
            if (hopdong) {
                hopdong.strTuNgay = utility.convertDateFormat(hopdong.TuNgay, 'DD/MM/YYYY', 'YYYY-MM-DD');
                hopdong.strDenNgay = utility.convertDateFormat(hopdong.DenNgay, 'DD/MM/YYYY', 'YYYY-MM-DD');
                hopdong.strNgayKetThucSom = utility.convertDateFormat(hopdong.NgayKetThucSom, 'DD/MM/YYYY', 'YYYY-MM-DD');
                hopdong.HuongLuong = hopdong.strHuongLuong / 100;
            }
            return hopdong;
        }

        function validHopDong() {
            var hasError = false;

            vm.status.errTuNgay = '';
            if (utility.checkInValid(vm.data.hopDong.TuNgay, 'isEmpty')) {
                hasError = true;
                vm.status.errTuNgay = ' ';
            }

            vm.status.errDenNgay = '';
            if (utility.checkInValid(vm.data.hopDong.DenNgay, 'isEmpty')) {
                hasError = true;
                vm.status.errDenNgay = ' ';
            }

            vm.status.errHopDong = '';
            if (utility.checkInValid(vm.data.hopDong.HopDong, 'isEmpty')) {
                hasError = true;
                vm.status.errHopDong = ' ';
            }

            vm.status.errLuong = '';
            if (utility.checkInValid(vm.data.hopDong.Luong, 'isNumber')) {
                hasError = true;
                vm.status.errLuong = ' ';
            }

            vm.status.errHuongLuong = '';
            if (utility.checkInValid(vm.data.hopDong.strHuongLuong, 'isNumber') | vm.data.hopDong.strHuongLuong > 100) {
                hasError = true;
                vm.status.errHuongLuong = ' ';
            }

            return hasError;
        }

        function keyPress(value, fromId, ToId, event) {
            console.log(vm.status);

            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error

                if (fromId == 'QLHD_txtTuNgay') {
                    vm.status.errTuNgay = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errTuNgay = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'QLHD_txtDenNgay') {
                    vm.status.errDenNgay = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errDenNgay = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'QLHD_txtHopDong') {
                    vm.status.errHopDong = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errHopDong = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'QLHD_txtLuong') {
                    vm.status.errLuong = ' ';
                    if (!utility.checkInValid(value, 'isNumber')) {
                        vm.status.errLuong = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'QLHD_txtHuongLuong') {
                    vm.status.errHuongLuong = ' ';
                    if (!utility.checkInValid(value, 'isNumber') && value < 100) {
                        vm.status.errHuongLuong = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        /******************************************
         * CALL API FUNCTION
         */

        function insert(hopdong) {
            vm.status.isLoading = true;

            var data = utility.clone(hopdong);
            data.nhanVienId = nhanVienId;
            prepareHopDong(data);

            QuanLyHopDongService.insert(data).then(function success(result) {
                console.log(result);
                alert('Lưu thông tin hợp đồng thành công.');
                emitApDung();
                vm.status.isLoading = false;
            }, function error(result) {
                alert('Không thể lưu thông tin hợp đồng.');
                console.log(result);
                vm.status.isLoading = false;
            });
        }

        function update(hopdong) {
            vm.status.isLoading = true;
            var data = utility.clone(hopdong);
            console.log(data);
            prepareHopDong(data);

            QuanLyHopDongService.update(data).then(function success(result) {
                console.log(result);
                alert('Lưu thông tin hợp đồng thành công.');
                emitApDung();
                vm.status.isLoading = false;
            }, function error(result) {
                console.log(result);
                alert('Không thể lưu thông tin hợp đồng.');
                vm.status.isLoading = false;
            });
        }


        function updateXoa(hopdong) {
            vm.status.isLoading = true;
            var data = utility.clone(hopdong);
            console.log(data);
            prepareHopDong(data);

            QuanLyHopDongService.updateXoa(data).then(function success(result) {
                console.log(result);
                alert('Xóa thông tin hợp đồng thành công.');
                emitApDung();
                vm.status.isLoading = false;
            }, function error(result) {
                console.log(result);
                alert('Không thể xóa thông tin hợp đồng.');
                vm.status.isLoading = false;
            });
        }


        /******************************************
         * HELPERS FUNCTION
         */
    };
})();