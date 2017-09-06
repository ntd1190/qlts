(function () {
    'use strict';

    angular.module('app')
        .controller('BaoHiemXaHoiEditCtrl', controller);

    function controller(utility, BaoHiemXaHoiService, $window) {

        /*********************************
         * PRIVATE
         */
        var nhanVienId = 0;
        var userInfo;
        var vm = this;

        /******************************
         * VIEW MODEL
         */

        vm.controllerId = 'BaoHiemXaHoiEditCtrl';

        vm.status = {
            isLoading: '',
            infoMessage: '',
            errorMessage: '',
            errNgay: '',
            errSoBHXH: '',
            errSoBHYT: '',
            errBHXH: '',
            errBHYT: '',
            errBHTN: '',
            errCongDoan: '',
        };

        vm.data = {
            BHXH: {}
        };

        /***************************************
         * INIT FUNCTION
         */

        vm.onInitView = function (config) {
            if (config && config.nhanVienId > 0) {
                nhanVienId = config.nhanVienId;
                getBHXHByNhanVienId(nhanVienId);
            } else {
                nhanVienId = 0;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
        };

        (function activate() { })();

        /***************************************
         * ACTION FUNCTION
         */

        vm.action = {
            save: function () {
                if (validBHXH()) {
                    updateBaoHiemXaHoi();
                }
            },
            getListLuocSu: GetListLuocSu,
            keyPress: keyPress,

        }

        /***************************************
         * BROADCAST / EMIT / ON FUNCTION
         */

        function initEventListener() { }

        /*************************************
         * BIZ FUNCTION
         */

        function validBHXH() {
            var hasError = false;

            vm.status.errNgay = '';
            if (utility.checkInValid(vm.data.BHXH.Ngay, 'isEmpty')) {
                hasError = true;
                vm.status.errNgay = ' ';
            }

            vm.status.errSoBHXH = '';
            if (utility.checkInValid(vm.data.BHXH.SoBHXH, 'isEmpty')) {
                hasError = true;
                vm.status.errSoBHXH = ' ';
            }

            vm.status.errSoBHYT = '';
            if (utility.checkInValid(vm.data.BHXH.SoBHYT, 'isEmpty')) {
                hasError = true;
                vm.status.errSoBHYT = ' ';
            }

            vm.status.errBHXH = '';
            if (utility.checkInValid(vm.data.BHXH.strBHXH, 'isNumber') || vm.data.BHXH.strBHXH > 100) {
                hasError = true;
                vm.status.errBHXH = ' ';
            }

            vm.status.errBHYT = '';
            if (utility.checkInValid(vm.data.BHXH.strBHYT, 'isNumber') || vm.data.BHXH.strBHYT > 100) {
                hasError = true;
                vm.status.errBHYT = ' ';
            }

            vm.status.errBHTN = '';
            if (utility.checkInValid(vm.data.BHXH.strBHTN, 'isNumber') || vm.data.BHXH.strBHTN > 100) {
                hasError = true;
                vm.status.errBHTN = ' ';
            }

            vm.status.errCongDoan = '';
            if (utility.checkInValid(vm.data.BHXH.strCongDoan, 'isNumber') || vm.data.BHXH.strCongDoan > 100) {
                hasError = true;
                vm.status.errCongDoan = ' ';
            }
            return hasError == false;
        }

        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error

                if (fromId == 'BHXH_txtSoBHXH') {
                    vm.status.errSoBHXH = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errSoBHXH = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'BHXH_txtSoBHYT') {
                    vm.status.errSoBHYT = ' ';
                    if (!utility.checkInValid(value, 'isEmpty')) {
                        vm.status.errSoBHYT = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'BHXH_txtBHXH') {
                    vm.status.errBHXH = ' ';
                    if (!utility.checkInValid(value, 'isNumber') && value <= 100) {
                        vm.status.errBHXH = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'BHXH_txtBHYT') {
                    vm.status.errBHYT = ' ';
                    if (!utility.checkInValid(value, 'isNumber') && value <= 100) {
                        vm.status.errBHYT = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'BHXH_txtBHTN') {
                    vm.status.errBHTN = ' ';
                    if (!utility.checkInValid(value, 'isNumber') && value <= 100) {
                        vm.status.errBHTN = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'BHXH_txtCongDoan') {
                    vm.status.errCongDoan = ' ';
                    if (!utility.checkInValid(value, 'isNumber') && vmvalue <= 100) {
                        vm.status.errCongDoan = '';
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        function prepareBHXH(data) {
            data.strNgay = utility.convertDateFormat(data.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD');
            data.BHXH = data.strBHXH / 100;
            data.BHYT = data.strBHYT / 100;
            data.BHTN = data.strBHTN / 100;
            data.CongDoan = data.strCongDoan / 100;
            data.NhanVienId = nhanVienId;

            data.loginId = userInfo.NhanVienId;
            console.log(data);
        }

        function fixBHXH(data) {
            data.Ngay = utility.convertDateFormat(data.Ngay, 'YYYY-MM-DD', 'DD/MM/YYYY');
            data.strBHXH = data.BHXH ? data.BHXH * 100 : 0;
            data.strBHYT = data.BHYT ? data.BHYT * 100 : 0;
            data.strBHTN = data.BHTN ? data.BHTN * 100 : 0;
            data.strCongDoan = data.CongDoan ? data.CongDoan * 100 : 0;
        }

        /************************************
         * API FUNCTION
         */

        function updateBaoHiemXaHoi() {
            vm.status.isLoading = true;

            var data = utility.clone(vm.data.BHXH);
            prepareBHXH(data);
            BaoHiemXaHoiService
                .updateBHXH(data)
                .then(function (result) {
                    console.log(result);
                    alert('Lưu thông tin bảo hiểm xã hội thành công');
                    message('info', 'Lưu thông tin bảo hiểm xã hội thành công.');

                    if (result.data && result.data.data) {
                        getBHXHByNhanVienId(nhanVienId)
                    }
                    vm.status.isLoading = false;
                }, function (result) {
                    console.log(result);
                    message('error', 'Không thể lưu thông tin bảo hiểm xã hội.');
                    vm.status.isLoading = false;
                });
        }

        function getBHXHByNhanVienId(nhanVienId) {
            vm.status.isLoading = true;
            message('info', 'Đang tải thông tin lương phụ cấp ...');
            var data = { NhanVienId: nhanVienId };

            BaoHiemXaHoiService
                .getBHXHByNhanVienId(data)
                .then(function (result) {
                    console.log(result);
                    message('', '');
                    if (result.data && result.data.data && result.data.data.length > 0) {
                        delete vm.data.BHXH;
                        vm.data.BHXH = result.data.data[0];
                        fixBHXH(vm.data.BHXH);
                    }
                    vm.status.isLoading = false;
                }, function (result) {
                    console.log(result);
                    message('error', 'Không thể tải thông tin bảo hiểm xã hội.');
                    vm.status.isLoading = false;
                });
        }

        function GetListLuocSu(id) {// id là NhanVienId, 
            vm.data.isLoading = true;

            var draw = 1;
            var start = 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = 10;  // Number of entries showed per page.
            var sortName = 'LuocSuId';
            var sortDir = 'desc';
            var searchString = id + "|BaoHiemXaHoi";
            var fields = "ngay,sukien, HoTen";
            BaoHiemXaHoiService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                console.log(success);
                if (success.data.data.length > 0) {
                    var msg = "";
                    $.each(success.data.data, function (i, item) {
                        var date = new Date(item.ngay);
                        msg = msg + "Ngày: " + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ", Họ tên: " + item.HoTen + ", Sự kiện: " + item.sukien + "\n";
                    });
                    alert(msg);
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
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