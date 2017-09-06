(function () {
    'use strict';
    var module = angular.module('app');
    module.controller('QuanHeGiaDinhEditCtrl', function ($scope, utility, QuanHeGiaDinhService) {

        /*** PRIVATE ***/

        var service = QuanHeGiaDinhService,
            vm = this,
            nhanVienId = 0,
            QuanHeGiaDinhId = 0,
            userInfo;

        vm.controllerId = 'QuanHeGiaDinhEditCtrl';

        vm.status = {};
        vm.status.isLoading = false;

        vm.error = {};

        vm.data = {};
        vm.data.QuanHeGiaDinh = {};

        /*** VIEW MODEL ***/

        vm.action = {};

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            console.log(config);
            if (config === undefined) { return; }
            nhanVienId = config.nhanVienId || nhanVienId;
            vm.controllerId = config.controllerId || vm.controllerId;
            userInfo = config.userInfo || userInfo;
            initEventListener();
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.apDung = function () {
            var data = { QuanHeGiaDinh: row };
            emitApDung(data);
        }
        vm.action.refresh = function () {
            refresh();
        }
        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            if (checkInput() === false) { return; }

            if (checkQuyenUI('M') == false) { return; }

            if (QuanHeGiaDinhId) {
                update(vm.data.QuanHeGiaDinh);
            } else {
                insert(vm.data.QuanHeGiaDinh);
            }
        }
        vm.action.remove = function () {
            if (vm.status.isLoading) { return; }

            if (checkQuyenUI('D') == false) { return; }
            if (confirm('Bạn có muốn xóa không ?')) {
                remove(vm.data.QuanHeGiaDinh);
            }
        }
        vm.action.close = function () {
            if (vm.status.isLoading) { return; }
            close();
        }

        /*** BROADCAST / EMIT / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.edit', function (e, v) {
                console.log(v);
                if (v && v.QuanHeGiaDinh) {
                    QuanHeGiaDinhId = v.QuanHeGiaDinh.QuanHeGiaDinhId;
                    refresh();
                }
            });
            $scope.$on(vm.controllerId + '.action.create', function (e, v) {
                console.log(v);
                if (v && v.NhanVienId) {
                    nhanVienId = v.nhanVienId || nhanVienId;
                }
            });
            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                });

                $('#' + vm.controllerId).on('hidden.bs.collapse', function () {
                    reset();
                });
            });
        }

        function emitApDung(data) {
            console.log(vm.controllerId + '.action.ap-dung');
            $scope.$emit(vm.controllerId + '.action.ap-dung', data);
        }

        /*** BIZ FUNCTION ***/

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            var lisQuyenTacVu;

            // kiểm tra danh sách quyền # null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var lisQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return lisQuyenTacVu.indexOf(quyen) >= 0;
        }

        function close() {
            $('#' + vm.controllerId).collapse('hide');
        }

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';
            var name = '';

            name = 'Ten';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.QuanHeGiaDinh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'MoiQuanHe';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.QuanHeGiaDinh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function reset() {
            QuanHeGiaDinhId = 0;
            refresh();
        }

        function refresh() {
            delete vm.data.error;
            vm.error = {};

            getById(QuanHeGiaDinhId);
        }

        /*** API FUNCTION ***/

        function fixData(data) {
            data.NgaySinh = utility.convertDateFormat(data.NgaySinh, 'YYYY-MM-DD', 'DD/MM/YYYY');
        }

        function prepareData(data) {
            data.NgaySinh = utility.convertDateFormat(data.NgaySinh, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }

        function getById(id) {
            if (!id) {
                delete vm.data.QuanHeGiaDinh;
                vm.data.QuanHeGiaDinh = {};
                return;
            }

            vm.status.isLoading = true;

            var data = {};
            data.search = id;

            service.getById(data).then(function (result) {
                console.log(result);
                delete vm.data.QuanHeGiaDinh;
                if (result && result.data && result.data.data && result.data.data.length) {
                    vm.data.QuanHeGiaDinh = result.data.data[0];
                    fixData(vm.data.QuanHeGiaDinh);
                } else {
                    vm.data.QuanHeGiaDinh = {};
                }
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);
                }
                vm.status.isLoading = false;
            });
        }
        function insert(data) {
            vm.status.isLoading = true;

            var param = utility.clone(data);
            prepareData(param);
            param.NhanVienId = nhanVienId;
            param.loginId = userInfo.NhanVienId || 0;

            service.insert(param).then(function (result) {
                console.log(result);
                if (result && result.data && result.data.data && result.data.data.length) {
                    alert('Thêm thành công');
                    QuanHeGiaDinhId = result.data.data[0].QuanHeGiaDinhId;
                    refresh();
                }
                emitApDung();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);
                }
                vm.status.isLoading = false;
            });
        }
        function update(data) {
            vm.status.isLoading = true;

            var param = utility.clone(data);
            prepareData(param);
            param.loginId = userInfo.NhanVienId || 0;

            service.update(param).then(function (result) {
                console.log(result);
                if (result && result.data && result.data.data && result.data.data.length) {
                    alert('Cập nhật thành công');
                    refresh();
                }
                emitApDung();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);
                }
                vm.status.isLoading = false;
            });
        }
        function remove(data) {
            vm.status.isLoading = true;

            var param = utility.clone(data);
            prepareData(param);
            param.loginId = userInfo.NhanVienId || 0;

            service.remove(param).then(function (result) {
                console.log(result);
                alert('Xóa thành công');
                emitApDung();
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);
                }
                vm.status.isLoading = false;
            });
        }

        /*** HELPER FUNCTION ***/
    });
})();