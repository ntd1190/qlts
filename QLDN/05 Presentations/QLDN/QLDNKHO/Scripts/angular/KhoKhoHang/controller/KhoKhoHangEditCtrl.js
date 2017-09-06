/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Thanh Binh
3. Description : khophieuhang/edit
4. History     : 2017.06.15 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app')
        .controller('KhoKhoHangEditCtrl', controller)

    function controller($scope, KhoKhoHangService, utility, $window) {

        /*** PRIVATE ***/

        var khoHangId = 0;
        var userInfo;
        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoKhoHangEditCtrl';

        vm.error = {}

        vm.data = {};
        vm.data.khoHang = {},
        vm.status = {};

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

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.refresh = function () {
            delete vm.data.khoHang;
            vm.data.khoHang = {};
            delete vm.error;
            vm.error = {};
            if (khoHangId) {
                getById(khoHangId);
            }
        }
        vm.action.getListChiNhanh = function () {
            emitGetListChiNhanh();
        }
        vm.action.close = function () { close(); }
        vm.action.clearChiNhanhCha = function () {
            vm.data.khoHang.ChiNhanh = '';
            vm.data.khoHang.TenChiNhanh = '';
        }
        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            if (checkInputKhoHang() === false) { return; }

            if (checkQuyenUI('M')) {
                update();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        }

        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputKhoHang($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.checkQuyenTacVu = checkQuyenUI;


        /*** BROADCAST / EMIT / ON / EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.listChiNhanh', function (e, v) {
                console.log(vm.controllerId + '.data.listChiNhanh');
                console.log(v);
                if (v && v.listChiNhanh && v.listChiNhanh.length > 0) {
                    vm.data.khoHang.ChiNhanh = v.listChiNhanh[0].ChiNhanhId;
                    vm.data.khoHang.TenChiNhanh = v.listChiNhanh[0].TenChiNhanh;
                }
            });

            $scope.$on(vm.controllerId + '.action.edit', function (e, v) {
                console.log(vm.controllerId + '.action.edit');
                reset();
                if (v && v.khoHang && v.khoHang.KhoHangId > 0) {
                    khoHangId = v.khoHang.KhoHangId;
                    getById(khoHangId);
                }

                $('#' + vm.controllerId).collapse('show');
            });

            $scope.$on(vm.controllerId + '.action.create', function (e, v) {
                console.log(vm.controllerId + '.action.create');
                reset();
                if (checkQuyenUI('N') === false) { return; }
                $('#' + vm.controllerId).collapse('show');
            });

            $scope.$on(vm.controllerId + '.action.close', function (e, v) {
                console.log(vm.controllerId + '.action.close');
                vm.action.close();
            });

            $scope.$on(vm.controllerId + '.action.save', function (e, v) {
                console.log(vm.controllerId + '.action.save');
                if (checkQuyenUI('N') || checkQuyenUI('M')) {
                    vm.action.save();
                }
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
            $scope.$emit(vm.controllerId + '.action.apDung');
            close();
        }

        function close() {
            $('#' + vm.controllerId).collapse('hide');
        }

        function emitGetListChiNhanh() {
            $scope.$emit(vm.controllerId + '.action.getListChiNhanh', '');
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

            if (khoHangId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function checkInputKhoHang(inputName) {
            var has_error = false;
            var first_error_name = '';

            if (!inputName || inputName === 'MaKho') {
                vm.error.MaKho = '';
                if (utility.checkInValid(vm.data.khoHang.MaKho, 'isCode')) {
                    vm.error.MaKho = '.';
                    first_error_name = has_error ? first_error_name : 'MaKho';
                    has_error = true;
                }
            }

            if (!inputName || inputName === 'TenKho') {
                vm.error.TenKho = '';
                if (utility.checkInValid(vm.data.khoHang.TenKho, 'isEmpty')) {
                    vm.error.TenKho = '.';
                    first_error_name = has_error ? first_error_name : 'TenKho';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function reset() {
            console.log(vm.controllerId + '.fn.reset');
            delete vm.data.khoHang;
            vm.data.khoHang = {};
            delete vm.error;
            vm.error = {};
            khoHangId = 0;
        };

        function insert() {
            vm.status.isLoading = true;

            var data = vm.data.khoHang;
            data.LoginId = userInfo.NhanVienId;

            KhoKhoHangService.insert(data).then(function success(result) {
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

            var data = vm.data.khoHang;
            data.LoginId = userInfo.NhanVienId;

            KhoKhoHangService.update(data).then(function success(result) {
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
                KhoHangId: khoHangId,
                LoginId: userInfo.NhanVienId,
            };

            KhoKhoHangService.getById(data).then(function success(result) {
                console.log(result);
                vm.status.isLoading = false;
                delete vm.data.khoHang;
                if (result.data && result.data.data && result.data.data.length > 0) {
                    vm.data.khoHang = result.data.data[0];
                }
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
            });
        }
    }
})();