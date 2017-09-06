(function () {
    'use strict';

    angular.module('app')
        .controller('PhieuCongTacChiTietEditCtrl', controller);

    function controller($scope, PhieuCongTacService, utility) {
        /****************************
         * PRIVATE
         */

        var phieuCongTacChiTietId = 0;
        var phieuCongTacId = 0;

        /************************************
         * VIEW MODEL
         */

        var vm = this;
        vm.controllerId = 'PhieuCongTacChiTietEditCtrl';
        vm.status = {
            isLoading: false,
            errorMessage: '',
            infoMessage: '',
        };
        vm.data = {
            chiTiet: {},
        };
        vm.action = {
            save: save,
            close: close,
            checkModify: checkModify,
        };

        /*************************************
         * INIT FUNCTION
         */

        /* thực hiện khi controller được tạo, trước khi view được load */
        (function activate() { })();

        /* thực hiện khi view đã load xong */
        angular.element(document).ready(function () { });

        /* thục hiện khi được gọi từ view và nhận các tham số config */
        vm.onInitView = function (config) {
            config = config || {};

            vm.controllerId = config.controllerId || vm.controllerId;

            initEventListener();
            reset();
        }

        /************************************
         * BROADCAST / EMIT / ON EVENT
         */

        /* Khởi tạo các sự kiện */
        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.updateChiTiet', function (e, v) {
                if (!v) return;

                vm.data.chiTiet = v;
                fixChiTiet();

                $('#' + vm.controllerId).collapse('show');
            });

            $scope.$on(vm.controllerId + '.action.addChiTiet', function (e, v) {
                if (!v) return;
                reset();
                phieuCongTacId = v;
                console.log(phieuCongTacId);

                $('#' + vm.controllerId).collapse('show');
            });

        }

        function saveEvent() {
            $scope.$emit(vm.controllerId + '.action.save', '');
            $('#' + vm.controllerId).collapse('hide');
        }
        /***********************************
         * ACTION FUNCTION
         */

        function save() {
            message('', '');
            if (inputValidate() == false) { return; }

            if (vm.data.chiTiet && vm.data.chiTiet.PhieuCongTacChiTietId) {
                if (checkModify(vm.data.chiTiet.MaTrangThai)) {
                    update();

                } else {
                    alert('Không thể thay đổi phiếu đã duyệt');
                }
            } else {
                insert();

                reset();
            }
        }

        function close() {
            reset();
            $('#' + vm.controllerId).collapse('hide');
        }

        /************************************
         * BIZ FUNCTION
         */

        /* kiểm tra trạng thái cho phép thay đổi thông tin*/
        function checkModify(trangthai) {
            if (trangthai == 'PCTCT_DY' || trangthai == 'PCTCT_TC') {
                return false;
            }
            return true;
        }

        function checkSoLuong() {
            if (vm.data.chiTiet.SoLuong && (vm.data.chiTiet.SoLuong <= 0 || vm.data.chiTiet.SoLuong >= 1000)) {
                return false;
            }
            return true;
        }

        function inputValidate() {
            message('', '');
            if (!vm.data.chiTiet.Ngay) {
                message('error', 'Chưa nhập \'Ngày\'');
                return false;
            }
            if (!vm.data.chiTiet.NoiDung) {
                message('error', 'Chưa nhập \'Nội dung\'');
                return false;
            }
            if (!checkSoLuong()) {
                message('error', '\'Số lượng\' phải lớn hơn 0 và nhỏ hơn 1000');
                return false;
            }
            if (!vm.data.chiTiet.DonGia) {
                message('error', 'Chưa nhập \'Đơn giá\'');
                return false;
            }
            //if (!vm.data.chiTiet.GhiChu) {
            //    message('error', 'Chưa nhập \'Ghi chú\'');
            //    return false;
            //}

            return true;
        }

        /*****************************************
         * API FUNCTION
         */

        function update() {
            vm.status.isLoading = true;
            var data = {
                phieuCongTacChiTietId: vm.data.chiTiet.PhieuCongTacChiTietId,
                noiDung: vm.data.chiTiet.NoiDung,
                ngay: utility.convertDateFormat(vm.data.chiTiet.Ngay, 'DD/MM/YYYY', 'YYYYMMDD'),
                soLuong: vm.data.chiTiet.SoLuong,
                donGia: vm.data.chiTiet.DonGia,
                ghiChu: vm.data.chiTiet.GhiChu,
                ctrVersion: vm.data.chiTiet.CtrVersion,
            };

            PhieuCongTacService.updateChiTiet(data).then(function (result) {
                console.log(result);
                vm.status.isLoading = false;
                saveEvent();
                close();
            }, function (result) {
                console.log(result);
                if (result.status == 400) {
                    alert(result.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function insert() {
            vm.status.isLoading = true;
            var data = {
                phieuCongTacId: phieuCongTacId,
                noiDung: vm.data.chiTiet.NoiDung,
                ngay: utility.convertDateFormat(vm.data.chiTiet.Ngay, 'DD/MM/YYYY', 'YYYYMMDD'),
                soLuong: vm.data.chiTiet.SoLuong,
                donGia: vm.data.chiTiet.DonGia,
                ghiChu: vm.data.chiTiet.GhiChu,
            };

            PhieuCongTacService.insertChiTiet(data).then(function (result) {
                console.log(result);
                reset();
                saveEvent();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                if (result.data.status == 400) {
                    alert(result.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        /*****************************************
         * HELPERS FUNCTION
         */
        function reset() {
            delete vm.data.chiTiet;
            vm.data.chiTiet = {};
            vm.data.chiTiet.Ngay = moment().format('DD/MM/YYYY')

            phieuCongTacChiTietId = 0;
            phieuCongTacId = 0;

            vm.status.isLoading = false;
            message('', '');
        }

        function fixChiTiet() {
            vm.data.chiTiet.Ngay = utility.convertDateFormat(vm.data.chiTiet.Ngay, 'YYYY-MM-DD', 'DD/MM/YYYY');
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
    };

})();