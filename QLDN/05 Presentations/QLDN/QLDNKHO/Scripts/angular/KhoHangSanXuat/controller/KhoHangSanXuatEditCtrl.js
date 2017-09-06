(function () {
    'use strict';

    angular.module('app')
        .controller('KhoHangSanXuatEditCtrl', controller)

    function controller($scope, KhoHangSanXuatService, utility, $window) {

        /*** PRIVATE ***/

        var hangSanXuatId = -1;
        var userInfo;
        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoHangSanXuatEditCtrl';

        vm.status = {
            isInValidMa: false,
            isInValidTen: false
        };
        vm.error = {};

        vm.data = {};
        vm.data.hangSanXuat = {},

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.refresh = refresh;
        vm.action.close = close;

        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            if (checkInput() === false) { return; }

            if (checkQuyenUI('M')) {
                update();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        };

        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }

        /*** INIT FUNCTION ***/

        activate();

        function activate() { }

        vm.onInitView = function (config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            initEventListener();
        };

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.save', function (e, v) {
                console.log(vm.controllerId + '.save');
                vm.action.save();
            });

            $scope.$on(vm.controllerId + '.edit', function (e, v) {
                console.log(v);
                reset();

                if (v && v.hangSanXuat && v.hangSanXuat.HangSanXuatId > 0) {
                    hangSanXuatId = v.hangSanXuat.HangSanXuatId;
                    getById(hangSanXuatId);
                }

                $('#' + vm.controllerId).collapse('show');
                $window.document.getElementById('txtMa').focus();
            });

            $scope.$on(vm.controllerId + '.close', function (e, v) {
                close();
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

            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            if (hangSanXuatId <= 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';

            if (!inputName || inputName === 'MaHangSanXuat') {
                vm.error.MaHangSanXuat = '';
                if (!vm.data.hangSanXuat.MaHangSanXuat) {
                    first_error_name = has_error === false ? 'MaHangSanXuat' : first_error_name;
                    vm.error.MaHangSanXuat = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'TenHangSanXuat') {
                vm.error.TenHangSanXuat = '';
                if (!vm.data.hangSanXuat.TenHangSanXuat) {
                    first_error_name = has_error === false ? 'TenHangSanXuat' : first_error_name;
                    vm.error.TenHangSanXuat = '.';
                    has_error = true;
                }
            }

            // focus error input
            if (first_error_name) {
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function refresh() {
            getById(hangSanXuatId);
        }

        function reset() {
            hangSanXuatId = -1;

            delete vm.data.hangSanXuat;
            vm.data.hangSanXuat = {};

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

            var data = vm.data.hangSanXuat;
            data.LoginId = userInfo.NhanVienId;

            KhoHangSanXuatService.insert(data).then(function success(result) {
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

            var data = vm.data.hangSanXuat;
            data.LoginId = userInfo.NhanVienId;

            KhoHangSanXuatService.update(data).then(function success(result) {
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
        function keyPress(value, fromId, ToId, event) {
            vm.validate.MaHangSanXuat = '';
            vm.validate.TenHangSanXuat = '';

            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa') {
                    vm.status.isInValidMa = utility.checkInValid(vm.data.hangSanXuat.MaHangSanXuat, 'isCode');
                    if (vm.status.isInValidMa) {
                        $("#txtMa").focus();
                        vm.validate.MaHangSanXuat = '........';
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen') {
                    vm.status.isInValidTen = utility.checkInValid(vm.data.hangSanXuat.TenHangSanXuat, 'isEmpty');
                    if (vm.status.isInValidTen) {
                        $("#txtTen").focus();
                        vm.validate.TenHangSanXuat = '........';
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();


            }
        }
        function getById() {
            vm.status.isLoading = true;

            var data = {
                HangSanXuatId: hangSanXuatId,
                LoginId: userInfo.NhanVienId,
            };

            KhoHangSanXuatService.getById(data).then(function success(result) {
                console.log(result);
                vm.status.isLoading = false;
                delete vm.data.hangSanXuat;
                if (result.data && result.data.data && result.data.data.length > 0) {
                    vm.data.hangSanXuat = result.data.data[0];
                }
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
            });
        }
    }
})();