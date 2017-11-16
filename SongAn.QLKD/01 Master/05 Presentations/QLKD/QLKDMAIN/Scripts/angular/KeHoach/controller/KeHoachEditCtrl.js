(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'keHoachEdit',
            url: '/kehoach/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: keHoachEditCtrl
        });
    });

    function keHoachEditCtrl($stateParams, SETTING, $scope, KeHoachService, utility, $q, $window, $timeout, Upload) {
        var userInfo, _tableState;
        var KeHoachId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.phieuKeHoach = {};
        vm.data.listChiTiet = [];
        vm.data.KeHoachId = 0;
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.Tilte = 'Lập';

        vm.error = {
            SoPhieu: false,
            KhachHangId: false,
            KyKehoach: false,
            Nam: false,
        }

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            //console.log(config,$stateParams.id);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            KeHoachId = $stateParams.id;
            vm.data.KeHoachId = $stateParams.id;
            vm.status.isOpenPopup = false;

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            initEventListener();
            setEnableButton();

            if (KeHoachId.length > 0) {
                if (parseInt(KeHoachId) > 0) {
                    getKeHoachById(KeHoachId);
                    vm.data.Tilte = 'Điều chỉnh';
                }
                else if (parseInt(KeHoachId) === 0) {
                    vm.data.phieuKeHoach.KyKeHoach = $("#cbxKyKeHoach option:first").val();
                    vm.data.phieuKeHoach.Nam = new Date().getFullYear();
                }
            }

            $("#txtSoPhieu").focus();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'KeHoach/showView?viewName=edit';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {

                }
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.status.isOpenPopup && checkQuyenUI('N')) {

                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            }
        };

        function initEventListener() {

        }

        /* ACTION FUNCTION */

        vm.action = {
            deleteSelected: deleteSelected,
        };

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.add = function () {
            CreateListChiTiet();
            var fc = function () {
                $("#txtMaHangHoa" + (vm.data.listChiTiet.length - 1).toString()).focus();
            }
            $timeout(fc, 6);
        };

        vm.action.save = function (data) {
            var obj = InvalidateDataKeHoach();

            if (obj == null)
                return;           

            if (vm.data.phieuKeHoach.KeHoachId > 0) {
                edit();
            } else {
                resetValidate();
                add();
            }
        }

        function add() {

            vm.status.isLoading = true;
            vm.data.phieuKeHoach.NguoiTao = vm.data.userInfo.NhanVienId;
            var KeHoach = utility.clone(vm.data.phieuKeHoach);
            var data = {};
            data.KeHoach = angular.toJson(KeHoach);
            data.UserId = vm.data.userInfo.UserId;

            KeHoachService.insert(data).then(function (success) {
                if (success.data.data) {
                    KeHoachId = success.data.data[0].KeHoachIdI;
                    utility.AlertSuccess('Thêm thành công!');
                    upload().then(function () {

                    }, function () {
                        utility.AlertSuccess('Không thể upload file.');
                    });

                    $timeout(function () {
                        window.location = vm.data.linkUrl + '#!/KeHoach/edit/' + KeHoachId;
                    }, 2000);
                }
                vm.status.isLoading = false;
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function edit() {

            vm.status.isLoading = true;
            vm.data.phieuKeHoach.NguoiTao = vm.data.userInfo.NhanVienId;
            var KeHoach = utility.clone(vm.data.phieuKeHoach);
            var data = {};
            data.KeHoach = angular.toJson(KeHoach);
            data.UserId = vm.data.userInfo.UserId;

            KeHoachService.update(data).then(function (success) {
                if (success.data.data) {
                    vm.data.phieuKeHoach = success.data.data[0];
                    utility.AlertSuccess('Cập nhật thành công!');
                    upload().then(function () {

                    }, function () {
                        utility.AlertSuccess('Không thể upload file.');
                    });

                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;

        }

        function deleteSelected() {
            if (KeHoachId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var KeHoachListSelected = new Array();

            KeHoachListSelected.push(KeHoachId);

            var ids = KeHoachListSelected.join(',');
            if (ids.length > 0) {
                KeHoachService.removeList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (KeHoachListSelected.length > parseInt(success.data.data)) {
                            var sl = KeHoachListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');

                        }
                        else {
                            utility.AlertError('Không thể xóa!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + '#!/KeHoach/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }

        }

        vm.action.refresh = function () {
            if (KeHoachId.length > 0) {
                if (parseInt(KeHoachId) == 0) {
                    delete vm.data.phieuKeHoach;
                    vm.data.phieuKeHoach = {};
                    vm.data.phieuKeHoach.NgaySinh = moment().format('DD/MM/YYYY');
                    vm.data.phieuKeHoach.NgayThanhLap = moment().format('DD/MM/YYYY');
                    vm.data.phieuKeHoach.GioiTinh = $("#cbxGioiTinh option:first").val();

                    $("#txtMaKeHoach").focus();
                }
            }
        }

        vm.action.keyPressKeHoach = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuKeHoach;
            if (event.keyCode == '13') {
                if (fromId == 'txtMaKeHoach') {
                    vm.error.MaKeHoach = utility.checkInValid(obj.MaKeHoach, 'isEmpty');
                    if (vm.error.MaKeHoach) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTenKeHoach') {
                    vm.error.TenKeHoach = utility.checkInValid(obj.TenKeHoach, 'isEmpty');
                    if (vm.error.TenKeHoach) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).find('input').focus();
                }
                else if (fromId == 'txtNgaySinh') {
                    vm.error.NgaySinh = utility.checkInValid(obj.NgaySinh, 'isEmpty');
                    if (vm.error.NgaySinh) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtEmail') {
                    $("#" + ToId + " input").focus();
                }
                else if (fromId == 'txtKhac') {
                    window.location.href = vm.data.linkUrl + '#!/KeHoach/edit/' + KeHoachId + '#profile';
                    var lk = '#!/KeHoach/edit/' + KeHoachId + '#profile';
                    $('a[href="' + lk + '"]').tab('show');
                    $("#txtNguoiPhuTrach").focus();
                }
                else $("#" + ToId).focus();
            }
        }

        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KeHoachId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KeHoachId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataKeHoach() {

            var obj = vm.data.phieuKeHoach;

            vm.error.MaKeHoach = utility.checkInValid(obj.MaKeHoach, 'isEmpty');
            if (vm.error.MaKeHoach) {
                $("#txtMaKeHoach").focus();
                return null;
            }

            vm.error.TenKeHoach = utility.checkInValid(obj.TenKeHoach, 'isEmpty');
            if (vm.error.TenKeHoach) {
                $("#txtTenKeHoach").focus();
                return null;
            }
            vm.error.NhomKeHoachId = utility.checkInValid(obj.NhomKeHoachId, 'isEmpty');
            if (vm.error.NhomKeHoachId) {
                $("#cbxNhomKeHoach input").focus();
                return null;
            }
            vm.error.GioiTinh = utility.checkInValid(obj.GioiTinh, 'isEmpty');
            if (vm.error.GioiTinh) {
                $("#cbxGioiTinh input").focus();
                return null;
            }
            vm.error.NgaySinh = utility.checkInValid(obj.NgaySinh, 'isEmpty');
            if (vm.error.NgaySinh) {
                $("#txtNgaySinh").focus();
                return null;
            }
            vm.error.TinhThanhPhoId = utility.checkInValid(obj.TinhThanhPhoId, 'isEmpty');
            if (vm.error.TinhThanhPhoId) {
                $("#cbxTinhThanhPho input").focus();
                return null;
            }
            vm.error.QuanHuyenId = utility.checkInValid(obj.QuanHuyenId, 'isEmpty');
            if (vm.error.QuanHuyenId) {
                $("#cbxQuanHuyen input").focus();
                return null;
            }
            vm.error.PhuongXaId = utility.checkInValid(obj.PhuongXaId, 'isEmpty');
            if (vm.error.PhuongXaId) {
                $("#cbxPhuongXa input").focus();
                return null;
            }


            return 1;
        }

        function resetValidate() {
            vm.error.SoPhieu = false;
            vm.error.KhachHangId = false;
            vm.error.KyKehoach = false;
            vm.error.Nam = false;
        }

        
        /* API FUNCTION */
        function getKeHoachById(id) {

            KeHoachService.getById(id)
                .then(function success(result) {

                    delete vm.data.phieuKeHoach;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuKeHoach = result.data.data[0];
                    }

                }, function error(result) {
                    console.log(result);
                });
        }
    }
})();