(function () {
    'use strict';

    angular.module('app')
        .controller('KhoLoaiHangHoaEditCtrl', controller)

    function controller($scope, KhoLoaiHangHoaService, utility, $window) {

        /*** PRIVATE ***/

        var loaiHangHoaId = -1;
        var userInfo;
        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoLoaiHangHoaEditCtrl';

        vm.status = {};
        vm.error = {};

        vm.data = {};
        vm.data.loaiHangHoa = {},

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.refresh = function () { refresh(); }
        vm.action.close = function () { close(); }
        vm.action.save = function () { save(); }

        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }

            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }


        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.save', function (e, v) {
                console.log(vm.controllerId + '.save');
                save();
            });

            $scope.$on(vm.controllerId + '.edit', function (e, v) {
                reset();

                if (v && v.loaiHangHoa && v.loaiHangHoa.LoaiHangHoaId > 0) {
                    loaiHangHoaId = v.loaiHangHoa.LoaiHangHoaId;
                    getById(loaiHangHoaId);
                }

                $('#' + vm.controllerId).collapse('show');
            });

            $scope.$on(vm.controllerId + '.close', function (e, v) {
                close();
            });

            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                });
            });

            $(document).ready(function () {
                $('#' + vm.controllerId).on('hidden.bs.collapse', function () {
                    reset();
                });
            });
        }

        function emitSave() {
            $scope.$emit(vm.controllerId + '.apDung');
            close();
        }

        /*** BIZ FUNCTION ***/

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;

            // kiểm tra danh sách quyền # null
            if (userInfo && userInfo.DsQuyenTacVu) {
                listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            if (loaiHangHoaId <= 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            }
        }

        // kiểm tra thông tin nhập
        function checkInput(inputName) {
            var isValid = true;
            var first_error_name = '';

            if (!inputName || inputName === 'MaLoai') {
                vm.error.MaLoai = '';
                if (utility.checkInValid(vm.data.loaiHangHoa.MaLoai, 'isCode')) {
                    first_error_name = isValid ? 'MaLoai' : first_error_name
                    vm.error.MaLoai = '.';
                    isValid = false;
                }
            }
            if (!inputName || inputName === 'TenLoai') {
                vm.error.TenLoai = '';
                if (utility.checkInValid(vm.data.loaiHangHoa.TenLoai, 'isEmpty')) {
                    first_error_name = isValid ? 'TenLoai' : first_error_name
                    vm.error.TenLoai = '.';
                    isValid = false;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return isValid;
        }

        function save() {
            if (checkInput() === false) { return; }

            if (loaiHangHoaId > 0 && checkQuyenUI('M')) {
                update();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        }

        function refresh() {
            getById(loaiHangHoaId);
        }

        function reset() {
            loaiHangHoaId = -1;

            delete vm.data.loaiHangHoa;
            vm.data.loaiHangHoa = {};

            delete vm.error;
            vm.error = {};

        };

        function close() {
            console.log(vm.controllerId);
            reset();
            $('#' + vm.controllerId).collapse('hide');
        }

        /*** API FUNCTION ***/

        function insert() {
            vm.status.isLoading = true;

            var data = vm.data.loaiHangHoa;
            data.LoginId = userInfo.NhanVienId;

            KhoLoaiHangHoaService.insert(data).then(function success(result) {
                console.log(result);
                alert('Thêm thông tin thành công.');
                vm.status.isLoading = false;
                emitSave();
            }, function error(result) {
                console.log(result);
                alert('Không thể thêm thông tin.');
                vm.status.isLoading = false;
            });
        }

        function update() {
            vm.status.isLoading = true;

            var data = vm.data.loaiHangHoa;
            data.LoginId = userInfo.NhanVienId;

            KhoLoaiHangHoaService.update(data).then(function success(result) {
                console.log(result);
                alert('Cập nhật thông tin thành công.');
                vm.status.isLoading = false;
                emitSave();
            }, function error(result) {
                console.log(result);
                alert('Không thể cập nhật thông tin.');
                vm.status.isLoading = false;
            });
        }

        function getById() {
            vm.status.isLoading = true;

            var data = {
                LoaiHangHoaId: loaiHangHoaId,
                LoginId: userInfo.NhanVienId,
            };

            KhoLoaiHangHoaService.getById(data).then(function success(result) {
                console.log(result);
                vm.status.isLoading = false;
                delete vm.data.loaiHangHoa;
                if (result.data && result.data.data && result.data.data.length > 0) {
                    vm.data.loaiHangHoa = result.data.data[0];
                }
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
            });
        }

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            initEventListener();
        };

        (function activate() { })();
    }
})();