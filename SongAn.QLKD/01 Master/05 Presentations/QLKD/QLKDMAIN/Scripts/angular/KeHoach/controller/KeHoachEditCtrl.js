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
                    CreateListChiTiet();
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
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.action.add();
                }
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.data.listQuyenTacVu.indexOf("M") > 0 || vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.action.save();
                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
                var fc = function () {
                    vm.data.listChiTiet.splice(vm.data.listChiTiet.length - 1, 1);
                    $("#txtMaHangHoa" + (vm.data.listChiTiet.length - 1).toString()).focus();
                }
                $timeout(fc, 6);
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

        vm.action.save = function () {
            var obj = InvalidateDataKeHoach();

            if (obj == null)
                return;

            if (InvalidateDataPhieuKeHoachChiTiet())
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
            data.phieuKeHoach = angular.toJson(KeHoach);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            KeHoachService.insert(data).then(function (success) {
                if (success.data.data) {
                    KeHoachId = success.data.data[0].KeHoachIdI;
                    utility.AlertSuccess('Thêm thành công!');
                    
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
            data.keHoachId = KeHoachId;
            data.phieuKeHoach = angular.toJson(KeHoach);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            KeHoachService.update(data).then(function (success) {
                if (success.data.data) {
                    
                    utility.AlertSuccess('Cập nhật thành công!');
                
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
                if (fromId == 'txtSoPhieu') {
                    vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
                    if (vm.error.SoPhieu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId + " input").focus();
                }
                else if (fromId == 'txtNam') {
                    if (vm.data.listChiTiet.length > 0) {
                        $("#txtMaHangHoa0").focus();
                    }
                }
                else $("#" + ToId).focus();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            if (event.keyCode == '13') {
                if (fromId == ('txtNgayDuKien' + index)) {
                    $("#" + ToId).focus();
                }
                else if (fromId == ('txtMaHangHoa' + index)) {

                    vm.data.listChiTiet[index].TempMaHangHoa = value;
                    $timeout(function () {
                        if (vm.data.listChiTiet[index].HangHoaId > 0) {
                            $("#" + ToId + " input").focus();
                        }
                    }, 100);
                }
                else $("#" + ToId).focus();
            }
                //check TAB key is press
            else if (event.keyCode == '9') {
                if (fromId == ('txtMaHangHoa' + index)) {
                    vm.data.listChiTiet[index].TempMaHangHoa = value;
                }
            }
        }

        vm.action.getDataHangHoa = function (data, index) {

            vm.data.listChiTiet[index.$index].HangHoaId = data.HangHoaId;
            vm.data.listChiTiet[index.$index].MaHangHoa = data.MaHangHoa || vm.data.listChiTiet[index.$index].MaHangHoa;;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            vm.data.listChiTiet[index.$index].DonGia = data.GiaBan;
        }

        function CreateListChiTiet() {
            var chitiet = {};
            chitiet.KeHoachChiTietId = 0;
            chitiet.KeHoachId = 0;
            chitiet.HangHoaId = 0;
            chitiet.LoaiHangHoa = 0;
            chitiet.SoLuong = 0;
            chitiet.DonGia = 0;
            chitiet.NgayDuKien = moment().format('DD/MM/YYYY');
            chitiet.NgayTao = moment().format('DD/MM/YYYY');
            chitiet.TrangThai = "0";
            vm.data.listChiTiet.push(chitiet);
        }

        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            vm.data.showButtonNew = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    //vm.data.showButtonSave = KeHoachId > 0 ? true : vm.data.showButtonSave;
                    vm.data.showButtonSave = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true ;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataKeHoach() {

            var obj = vm.data.phieuKeHoach;

            vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
            if (vm.error.SoPhieu) {
                $("#txtSoPhieu").focus();
                return null;
            }

            vm.error.KhachHangId = utility.checkInValid(obj.KhachHangId, 'isEmpty');
            if (vm.error.KhachHangId) {
                $("#cbxKhachHang input").focus();
                return null;
            }

            vm.error.KyKeHoach = utility.checkInValid(obj.KyKeHoach, 'isEmpty');
            if (vm.error.KyKeHoach) {
                $("#cbxKyKeHoach").focus();
                return null;
            }

            vm.error.Nam = utility.checkInValid(obj.Nam, 'isEmpty');
            if (vm.error.Nam) {
                $("#txttxtNam").focus();
                return null;
            }


            return 1;
        }

        function InvalidateDataPhieuKeHoachChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết!');
                return true;
            }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].HangHoaId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].LoaiHangHoa, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].SoLuong, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Số lượng phải > 0 !');
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].DonGia, 'isEmpty')) {
                    if (vm.data.listChiTiet[index].DonGia.toString() == '0') {

                    }
                    else
                    {
                        hasError = true;
                        vm.data.listChiTiet[index].isError = true;
                        return hasError;
                    }
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NgayTao, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NgayDuKien, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].TrangThai, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else {
                    hasError = false;
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return hasError;
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
                        getKeHoachChiTietById(vm.data.phieuKeHoach.KeHoachId);
                    }

                }, function error(result) {
                    console.log(result);
                });
        }

        function getKeHoachChiTietById(id) {

            KeHoachService.getPageDetail(id)
                .then(function success(result) {
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {

                        vm.data.listChiTiet = result.data.data;

                        $timeout(function () {
                            jQuery("#txtNgayDuKien" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                            jQuery("#txtNgayTao" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                        }, 100);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }
    }
})();