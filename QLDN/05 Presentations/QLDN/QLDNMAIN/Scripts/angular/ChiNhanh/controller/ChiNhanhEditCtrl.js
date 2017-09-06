/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Thanh Binh
3. Description : khophieuhang/edit
4. History     : 2017.06.15 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app')
        .controller('ChiNhanhEditCtrl', controller)

    function controller($scope, ChiNhanhService, utility, $window) {

        /*** PRIVATE ***/

        var chiNhanhId = 0;
        var userInfo;
        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = 'ChiNhanhEditCtrl';

        vm.error = {}

        vm.status = {};

        vm.data = {};
        vm.data.chiNhanh = {},

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
            delete vm.data.chiNhanh;
            vm.data.chiNhanh = {};
            delete vm.error;
            vm.error = {};
            if (chiNhanhId) {
                getById(chiNhanhId);
            }
        }

        vm.action.close = function () { close(); }

        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            if (checkInput() === false) { return; }

            if (checkQuyenUI('M')) {
                update();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        }

        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === true) {
                $('[data-name="' + $(event.target).data('next') + '"]').focus();
            }
        }

        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.close = function () {
            $('#' + vm.controllerId).collapse('hide');
            reset();
        }
        vm.action.getListChiNhanh = function () {
            emitGetListChiNhanh();
        }

        vm.action.clearChiNhanhCha = function () {
            vm.data.chiNhanh.ChiNhanhCha = '';
            vm.data.chiNhanh.MaChiNhanhCha = '';
            vm.data.chiNhanh.TenChiNhanhCha = '';
        }

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.listChiNhanh', function (e, v) {
                console.log(v);

                if (v && v.listChiNhanh && v.listChiNhanh.length > 0) {
                    vm.data.chiNhanh.ChiNhanhCha = v.listChiNhanh[0].CHINHANH_ID;
                    vm.data.chiNhanh.MaChiNhanhCha = v.listChiNhanh[0].MaChiNhanh;
                    vm.data.chiNhanh.TenChiNhanhCha = v.listChiNhanh[0].TenChiNhanh;
                }
            });

            $scope.$on(vm.controllerId + '.save', function (e, v) {
                console.log(vm.controllerId + '.save');
                vm.action.save();
            });

            $scope.$on(vm.controllerId + '.edit', function (e, v) {
                console.log(v);
                reset();

                if (v && v.ChiNhanhId > 0) {
                    chiNhanhId = v.ChiNhanhId;
                    getById(chiNhanhId);
                }

                $('#' + vm.controllerId).collapse('show');
            });

            $scope.$on(vm.controllerId + '.close', function (e, v) {
                $('#' + vm.controllerId).collapse('hide');
            });

            $scope.$on(vm.controllerId + '.action.F2', function (e, v) {
                if (checkQuyenUI('N') === false) { return; }

                $('#' + vm.controllerId).collapse('show');
            });

            $scope.$on(vm.controllerId + '.action.ESC', function (e, v) {
                $('#' + vm.controllerId).collapse('hide');
            });

            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
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
                    console.log('hidden.bs.collapse');
                    reset();
                });
            });

        }

        function emitSave() {
            $scope.$emit(vm.controllerId + '.action.apDung');
        }

        function emitGetListChiNhanh() {
            $scope.$emit(vm.controllerId + '.action.getListChiNhanh', '');
        }

        /*** BIZ FUNCTION ***/

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            var lisQuyenTacVu;

            // kiểm tra danh sách quyền # null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var lisQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (chiNhanhId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return lisQuyenTacVu.indexOf(quyen) >= 0;
        }

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';

            if (!inputName || inputName === 'MaChiNhanh') {
                vm.error.MaChiNhanh = '';
                if (utility.checkInValid(vm.data.chiNhanh.MaChiNhanh, 'isCode')) {
                    first_error_name = has_error ? first_error_name : 'MaChiNhanh';
                    vm.error.MaChiNhanh = '.';
                    has_error = true;
                }
            }

            if (!inputName || inputName === 'TenChiNhanh') {
                vm.error.TenChiNhanh = '';
                if (utility.checkInValid(vm.data.chiNhanh.TenChiNhanh, 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : 'TenChiNhanh';
                    vm.error.TenChiNhanh = '.';
                    has_error = true;
                }
            }

            //if (!inputName || inputName === 'DiaChi') {
            //    vm.error.DiaChi = '';
            //    if (utility.checkInValid(vm.data.chiNhanh.DiaChi, 'isEmpty')) {
            //        first_error_name = has_error ? first_error_name : 'DiaChi';
            //        vm.error.DiaChi = '.';
            //        has_error = true;
            //    }
            //}

            //if (!inputName || inputName === 'MoTa') {
            //    vm.error.MoTa = '';
            //    if (utility.checkInValid(vm.data.chiNhanh.MoTa, 'isEmpty')) {
            //        first_error_name = has_error ? first_error_name : 'MoTa';
            //        vm.error.MoTa = '.';
            //        has_error = true;
            //    }
            //}

            //if (!inputName || inputName === 'ChiNhanhCha') {
            //    vm.error.ChiNhanhCha = '';
            //    if (!vm.data.chiNhanh.ChiNhanhCha || vm.data.chiNhanh.ChiNhanhCha <= 0) {
            //        first_error_name = has_error ? first_error_name : 'ChiNhanhCha';
            //        vm.error.ChiNhanhCha = '.';
            //        has_error = true;
            //    }
            //}

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function reset() {
            delete vm.data.chiNhanh;
            vm.data.chiNhanh = {};
            delete vm.error;
            vm.error = {};
            chiNhanhId = 0;
        };

        function insert() {
            vm.status.isLoading = true;

            var data = vm.data.chiNhanh;
            data.LoginId = userInfo.NhanVienId;

            ChiNhanhService.insert(data).then(function (result) {
                console.log(result);
                alert('Thêm thông tin thành công.');
                vm.status.isLoading = false;
                emitSave();
            }, function (result) {
                console.log(result);
                alert('Không thể thêm thông tin.');
                vm.status.isLoading = false;
            });
        }
        function update() {
            vm.status.isLoading = true;

            var data = vm.data.chiNhanh;
            data.LoginId = userInfo.NhanVienId;

            ChiNhanhService.update(data).then(function (result) {
                console.log(result);
                alert('Cập nhật thông tin thành công.');
                vm.status.isLoading = false;
                emitSave();
            }, function (result) {
                console.log(result);
                alert('Không thể cập nhật thông tin.');
                vm.status.isLoading = false;
            });
        }

        function getById() {
            vm.status.isLoading = true;

            var data = {
                chiNhanhId: chiNhanhId,
                LoginId: userInfo.NhanVienId,
            };

            ChiNhanhService.getById(data).then(function (result) {
                console.log(result);
                vm.status.isLoading = false;
                delete vm.data.chiNhanh;
                if (result.data && result.data.data && result.data.data.length > 0) {
                    vm.data.chiNhanh = result.data.data[0];
                }
            }, function (result) {
                console.log(result);
                vm.status.isLoading = false;
            });
        }
    }
})();