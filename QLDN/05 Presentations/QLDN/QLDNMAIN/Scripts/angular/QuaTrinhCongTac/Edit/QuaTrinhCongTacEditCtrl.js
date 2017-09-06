(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuaTrinhCongTacEditCtrl', controller);

    function controller($scope, utility, QuaTrinhCongTacService) {

        /*********************************
         * PRIVATE
         */
        var debug = false;
        var isEdit = false;
        var nhanVienId = 0;
        var vm = this;

        /******************************
         * VIEW MODEL
         */

        vm.onInitView = onInitView;
        vm.controllerId = 'QuaTrinhCongTacEditCtrl';

        vm.status = {
            isLoading: '',
            infoMessage: '',
            errorMessage: '',
        };

        vm.data = {
            quaTrinhCongTac: {}
        };

        vm.action = {
            getChucVu: getChucVu,
            save: save,
            remove: remove,
            close: close,
        }

        vm.action.clearChucVu = function () {
            vm.data.quaTrinhCongTac.ChucVuId = '';
            vm.data.quaTrinhCongTac.TenChucVu = '';
        }
        /***************************************
         * INIT FUNCTION
         */

        function onInitView(config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        };

        (function activate() { })();

        /***************************************
         * ACTION FUNCTION
         */

        function save() {
            console.log(vm.data.quaTrinhCongTac);
            if (vm.data.quaTrinhCongTac.QTCT_ID > 0) {
                update(vm.data.quaTrinhCongTac);
            } else {
                insert(vm.data.quaTrinhCongTac);
            }
        }

        function remove() {
            console.log(vm.data.quaTrinhCongTac);
            if (confirm('Bạn có muốn xóa quá trình công tác ?') == false) { return; }
            if (vm.data.quaTrinhCongTac.QTCT_ID > 0) {
                removeQTCT(vm.data.quaTrinhCongTac);
            }
        }

        /***************************************
         * BROADCAST / EMIT / ON FUNCTION
         */

        function apDung() {
            $scope.$emit(vm.controllerId + '.action.ap-dung', '');
        }

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.editChiTiet', function (e, v) {
                console.log(v);
                reset();
                if (v && v.nhanVienId) {
                    nhanVienId = v.nhanVienId;
                    vm.data.quaTrinhCongTac.NhanVienId = nhanVienId;
                } else {
                    nhanVienId = 0;
                    vm.data.quaTrinhCongTac.NhanVienId = nhanVienId;
                }

                if (v && v.chiTiet) {
                    vm.data.quaTrinhCongTac = v.chiTiet;
                    fixQuaTrinhCongTac();
                }
            });

            $scope.$on(vm.controllerId + '.action.getChucVu', function (e, v) {
                console.log(v);
                if (v && v.length > 0) {
                    vm.data.quaTrinhCongTac.ChucVuId = v[0].ChucVuId;
                    vm.data.quaTrinhCongTac.TenChucVu = v[0].TenChucVu;
                }
            });
        }

        function getChucVu() {
            $scope.$emit(vm.controllerId + '.action.getChucVu', '');
        }

        /*************************************
         * BIZ FUNCTION
         */

        function fixQuaTrinhCongTac() {
            vm.data.quaTrinhCongTac.TuNgay = utility.convertDateFormat(vm.data.quaTrinhCongTac.TuNgay, 'YYYY-MM-DD', 'DD/MM/YYYY');
            vm.data.quaTrinhCongTac.DenNgay = utility.convertDateFormat(vm.data.quaTrinhCongTac.DenNgay, 'YYYY-MM-DD', 'DD/MM/YYYY');
        }

        function reset(){
            vm.data.quaTrinhCongTac = {
                NhanVienId: 0,
                QuaTrinhCongTacId: 0,
                TuNgay: moment().format('DD/MM/YYYY'),
                DenNgay: moment().format('DD/MM/YYYY'),
            };
        }

        function close() {
            $('#' + vm.controllerId).collapse('hide');
        }

        /************************************
         * API FUNCTION
         */

        function update(data) {
            console.log(data);
            vm.status.isLoading = true;

            var dataClone = utility.clone(data);

            dataClone.TuNgay = utility.convertDateFormat(dataClone.TuNgay, 'DD/MM/YYYY', 'YYYY-MM-DD');
            dataClone.DenNgay = utility.convertDateFormat(dataClone.DenNgay, 'DD/MM/YYYY', 'YYYY-MM-DD');

            console.log(dataClone);
            QuaTrinhCongTacService.update(dataClone).then(function (result) {
                console.log(result);
                if (result && result.data && result.data.data) {
                }
                alert('Lưu quá trình công tác thành công.');
                apDung();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                alert('Không thể lưu quá trình công tác.');
                vm.status.isLoading = false;
            });
        }

        function insert(data) {
            vm.status.isLoading = true;

            var dataClone = utility.clone(data);

            dataClone.TuNgay = utility.convertDateFormat(dataClone.TuNgay, 'DD/MM/YYYY', 'YYYY-MM-DD');
            dataClone.DenNgay = utility.convertDateFormat(dataClone.DenNgay, 'DD/MM/YYYY', 'YYYY-MM-DD');

            QuaTrinhCongTacService.insert(dataClone).then(function (result) {
                console.log(result);
                if (result && result.data && result.data.data) {
                }
                alert('Lưu quá trình công tác thành công.');
                apDung();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                alert('Không thể lưu quá trình công tác.');
                vm.status.isLoading = false;
            });
        }

        function removeQTCT(data) {
            console.log(data);
            vm.status.isLoading = true;
            QuaTrinhCongTacService.deleteQTCT(data).then(function (result) {
                console.log(result);
                if (result && result.data && result.data.data) {
                }
                alert('Xóa quá trình công tác thành công.');
                apDung();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                alert('Không thể lưu quá trình công tác.');
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