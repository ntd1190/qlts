/*****************************************************************************
1. Create Date : 2017.07.27
2. Creator     : Nguyen Thanh Binh
3. Description : 
4. History     : 2017.07.27 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('PhieuBaoHanhChiTietEditCtrl', function ($scope, utility, PhieuBaoHanhService) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;
        var phieuBaoHanhId = 0;
        var phieuBaoHanhChiTietId = 0;
        var linkUrl;

        /*** VIEW MODEL ***/

        vm.controllerId = 'BaoHanhChiTietEditPopup';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.data = {};
        vm.data.chiTiet = {
            ChiPhi: 0,
            ThueVAT: 0,
            TienThue:0
        };

        vm.error = {};

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            console.log(config);
            if (!config) { return; }

            phieuBaoHanhChiTietId = config.phieuBaoHanhChiTietId || 0;
            linkUrl = config.linkUrl || '';

            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (phieuBaoHanhChiTietId == 0 && checkQuyenUI('N') == false) {
                window.location.href = linkUrl + 'list';
            }
            initEventListener();
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.tinhThue = function () {
            vm.data.chiTiet.TienThue = vm.data.chiTiet.ChiPhi * vm.data.chiTiet.ThueVAT / 100;
        }
        vm.action.xoaChon = function () {
            console.log('xoaChon');
            if (vm.status.isLoading == true) { return; }
            if (checkQuyenUI('M') == false) { return; }

            if (confirm('Bạn có muốn xóa chi tiết không?')) {
                deleteChiTiet(phieuBaoHanhChiTietId);
            }
        };
        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            if (checkInput() === false) { return; }

            if (checkQuyenUI('M')) {
                update(vm.data.chiTiet);
            } else if (checkQuyenUI('N')) {
                insert(vm.data.chiTiet);
            }
        }
        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.close = function () {
            $('#' + vm.controllerId).collapse('hide');
        }
        vm.action.getTrangThaiThietBi = function () {
            $scope.$emit(vm.controllerId + '.action.getTrangThaiThietBi', '');
        }
        vm.action.clearTrangThaiThietBi = function () {
            vm.data.chiTiet.TrangThaiThietBi = '';
            vm.data.chiTiet.TenTrangThaiThietBi = '';
        }
        vm.action.getThietBi = function () { debugger
            $scope.$emit(vm.controllerId + '.action.getThietBi', '');
        }
        vm.action.clearThietBi = function () {
            vm.data.chiTiet.TenThietBi = '';
            vm.data.chiTiet.ThietBi = 0;
            setTimeout(function () {
                $('#' + vm.controllerId + ' input[data-name="TenThietBi"]').focus();
            }, 100);
        }

        vm.action.getThietBiThayThe = function () {
            $scope.$emit(vm.controllerId + '.action.getThietBiThayThe', '');
        }
        vm.action.clearThietBiThayThe = function () {
            vm.data.chiTiet.TenThietBiThayThe = '';
            vm.data.chiTiet.ThietBiThayThe = 0;
            setTimeout(function () {
                $('#' + vm.controllerId + ' input[data-name="TenThietBiThayThe"]').focus();
            }, 100);
        }

        /*
            Tính tiền thuế,
        */
        $scope.$watchGroup([
            'ctrl.data.chiTiet.ThueVAT',
            'ctrl.data.chiTiet.ChiPhi'
            ], function () {
                debugger
                var thueVAT = vm.data.chiTiet.ThueVAT == undefined ? 0 : vm.data.chiTiet.ThueVAT;
                var chiPhi = vm.data.chiTiet.ChiPhi == undefined ? 0 : vm.data.chiTiet.ChiPhi;
                var tienThue = (thueVAT * chiPhi) == 0 ? 0 : (thueVAT * chiPhi / 100);                
                vm.data.chiTiet.TienThue = tienThue ;                
        });



        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/
    
        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.edit', function (e, v) {
                console.log(v);
                if (v) {
                    reset();
                    phieuBaoHanhId = v.PhieuBaoHanhId;
                    phieuBaoHanhChiTietId = v.PhieuBaoHanhChiTietId;
                    refresh();
                }
            });
            $scope.$on(vm.controllerId + '.data.TrangThaiThietBi', function (e, v) {
                console.log(v);
                if (v && v.listTrangThai && v.listTrangThai.length > 0) {
                    vm.data.chiTiet.TrangThaiThietBi = v.listTrangThai[0].MaTrangThai;
                    vm.data.chiTiet.TenTrangThaiThietBi = v.listTrangThai[0].TrangThai;
                }
            });
            $scope.$on(vm.controllerId + '.data.listThietBi', function (e, v) {
                console.log(v);
                if (v && v.listHangHoa && v.listHangHoa.length > 0) {
                    vm.data.chiTiet.ThietBi = v.listHangHoa[0].HangHoaId;
                    vm.data.chiTiet.TenThietBi = v.listHangHoa[0].TenHangHoa;
                }
            });
            $scope.$on(vm.controllerId + '.data.listThietBiThayThe', function (e, v) {
                console.log(v);
                if (v && v.listHangHoa && v.listHangHoa.length > 0) {
                    vm.data.chiTiet.ThietBiThayThe = v.listHangHoa[0].HangHoaId;
                    vm.data.chiTiet.TenThietBiThayThe = v.listHangHoa[0].TenHangHoa;
                }
            });
            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                vm.action.save();
            });
            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                });

                $('#' + vm.controllerId).on('hidden.bs.collapse', function () {
                });
            });
        }

        function emitApDung() {
            var data = {
                PhieuBaoHanhChiTiet: utility.clone(vm.data.chiTiet)
            }
            $scope.$emit(vm.controllerId + '.action.ap-dung', data);
        }
        /*** BIZ FUNCTION ***/

        function reset() {
            delete vm.data.chiTiet;
            vm.data.chiTiet = {};

            phieuBaoHanhId = 0;
            phieuBaoHanhChiTietId = 0;
            refresh();
        }

        function refresh() {
            delete vm.error;
            vm.error = {};

            if (phieuBaoHanhChiTietId) {
                getChiTietById(phieuBaoHanhChiTietId);
            }
        }

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (phieuBaoHanhChiTietId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';
            var name = '';

            name = 'TenThietBi';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.chiTiet[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            /*
            name = 'MoTa';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.chiTiet[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'TenThietBiThayThe';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.chiTiet[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }*/
            name = 'TrangThaiThietBi';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.chiTiet[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'ThueVAT';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (+vm.data.chiTiet[name] > 100) {
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

        /*** CALL API FUNCTION ***/

        function insert(chiTiet) {
            vm.status.isLoading = true;

            var data = utility.clone(chiTiet);
            data.PhieuBaoHanhId = phieuBaoHanhId;
            data.loginId = userInfo.NhanVienId;

            PhieuBaoHanhService.insertChiTiet(data).then(function (success) {
                console.log(success);
                vm.status.isLoading = false;
                if (success.data && success.data.data) {
                    alert('Thêm chi tiết thành công');
                    emitApDung();
                }
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    alert('Không thể thêm chi tiết phiếu bảo hành');
                }
            });
        }
        function update(chiTiet) {
            vm.status.isLoading = true;

            var data = utility.clone(chiTiet);
            data.loginId = userInfo.NhanVienId;

            PhieuBaoHanhService.updateChiTiet(data).then(function (success) {
                console.log(success);
                vm.status.isLoading = false;
                if (success.data && success.data.data) {
                    alert('Cập nhật chi tiết thành công');
                    emitApDung();
                }
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    alert('Không thể thêm chi tiết phiếu bảo hành');
                }
            });
        }

        function getChiTietById(id) {
            vm.status.isLoading = true;

            var data = {
                ChiTietId: id,
                loginId: userInfo.NhanVienId
            }

            PhieuBaoHanhService.getChiTietById(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    vm.data.chiTiet = success.data.data[0];
                }
                vm.status.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
            });
        }

        function deleteChiTiet(id) {
            vm.status.isLoading = true;

            var data = {
                PhieuBaoHanhChiTietId: id,
                loginId: userInfo.NhanVienId
            }
            PhieuBaoHanhService.deleteChiTiet(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    alert('Xóa chi tiết bảo hành thành công');
                    emitApDung();
                }
                vm.status.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    alert('Không thể xóa chi tiết phiếu bảo hành');
                }
            });
        }
    });
})();