(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'donHangEdit',
            url: '/donhang/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: donHangEditCtrl
        });
    });

    function donHangEditCtrl($stateParams, SETTING, $scope, DonHangService, utility, $q, $window, $timeout, Upload) {
        var userInfo, _tableState;
        var DonHangId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.phieuDonHang = {};
        vm.data.listChiTiet = [];
        vm.data.DonHangId = 0;
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.Tilte = 'Lập';

        vm.error = {
            SoPhieu: false,
            KhachHangId: false,
            KyDonHang: false,
            Nam: false,
        }

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            //console.log(config,$stateParams.id);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            DonHangId = $stateParams.id;
            vm.data.DonHangId = $stateParams.id;
            vm.status.isOpenPopup = false;

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            initEventListener();
            setEnableButton();

            if (DonHangId.length > 0) {
                if (parseInt(DonHangId) > 0) {
                    getDonHangById(DonHangId);
                    vm.data.Tilte = 'Điều chỉnh';
                }
                else if (parseInt(DonHangId) === 0) {
                    vm.data.phieuDonHang.TrangThai = $("#cbxTrangThai option:first").val();
                    vm.data.phieuDonHang.NgayLap = moment().format('DD/MM/YYYY');
                    CreateListChiTiet();
                }
            }

            $("#txtSoPhieu").focus();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'DonHang/showView?viewName=edit';
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
            var obj = InvalidateDataDonHang();

            if (obj == null)
                return;

            if (InvalidateDataPhieuDonHangChiTiet())
                return;

            if (vm.data.phieuDonHang.DonHangId > 0) {
                edit();
            } else {
                resetValidate();
                add();
            }
        }

        function add() {

            vm.status.isLoading = true;
            vm.data.phieuDonHang.NguoiTao = vm.data.userInfo.NhanVienId;
            var DonHang = utility.clone(vm.data.phieuDonHang);
            var data = {};
            data.phieuDonHang = angular.toJson(DonHang);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            DonHangService.insert(data).then(function (success) {
                if (success.data.data) {
                    DonHangId = success.data.data[0].DonHangIdI;
                    utility.AlertSuccess('Thêm thành công!');

                    $timeout(function () {
                        window.location = vm.data.linkUrl + '#!/DonHang/edit/' + DonHangId;
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
            vm.data.phieuDonHang.NguoiTao = vm.data.userInfo.NhanVienId;
            var DonHang = utility.clone(vm.data.phieuDonHang);
            var data = {};
            data.donHangId = DonHangId;
            data.phieuDonHang = angular.toJson(DonHang);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            DonHangService.update(data).then(function (success) {
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
            if (DonHangId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var DonHangListSelected = new Array();

            DonHangListSelected.push(DonHangId);

            var ids = DonHangListSelected.join(',');
            if (ids.length > 0) {
                DonHangService.removeList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (DonHangListSelected.length > parseInt(success.data.data)) {
                            var sl = DonHangListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');

                        }
                        else {
                            utility.AlertError('Không thể xóa!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + '#!/DonHang/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }

        }

        vm.action.refresh = function () {
            //if (DonHangId.length > 0) {
            //    if (parseInt(DonHangId) == 0) {
            //        delete vm.data.phieuDonHang;
            //        vm.data.phieuDonHang = {};
            //        vm.data.phieuDonHang.TrangThai = $("#cbxTrangThai option:first").val();
            //        vm.data.phieuDonHang.NgayLap = moment().format('DD/MM/YYYY');;

            //        $("#txtMaDonHang").focus();
            //    }
            //}
        }

        vm.action.keyPressDonHang = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuDonHang;
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
        }

        function CreateListChiTiet() {
            var chitiet = {};
            chitiet.DonHangChiTietId = 0;
            chitiet.DonHangId = 0;
            chitiet.HangHoaId = 0;
            chitiet.LoaiHangHoa = 0;
            chitiet.SoLuong = 0;
            chitiet.DonGia = 0;
            chitiet.NgayDuKien = moment().format('DD/MM/YYYY');
            chitiet.NgayTao = moment().format('DD/MM/YYYY');
            chitiet.TrangThai = "0";
            vm.data.listChiTiet.push(chitiet);

            $timeout(function () {
                jQuery("#txtNgayDuKien" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
                jQuery("#txtNgayTao" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })

            }, 100);
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
                    //vm.data.showButtonSave = DonHangId > 0 ? true : vm.data.showButtonSave;
                    vm.data.showButtonSave = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataDonHang() {

            var obj = vm.data.phieuDonHang;

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

            vm.error.KyDonHang = utility.checkInValid(obj.KyDonHang, 'isEmpty');
            if (vm.error.KyDonHang) {
                $("#cbxKyDonHang").focus();
                return null;
            }

            vm.error.Nam = utility.checkInValid(obj.Nam, 'isEmpty');
            if (vm.error.Nam) {
                $("#txttxtNam").focus();
                return null;
            }


            return 1;
        }

        function InvalidateDataPhieuDonHangChiTiet() {
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
                    else {
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
            vm.error.KyDonHang = false;
            vm.error.Nam = false;
        }


        /* API FUNCTION */
        function getDonHangById(id) {

            DonHangService.getById(id)
                .then(function success(result) {

                    delete vm.data.phieuDonHang;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuDonHang = result.data.data[0];
                        getDonHangChiTietById(vm.data.phieuDonHang.DonHangId);
                    }

                }, function error(result) {
                    console.log(result);
                });
        }

        function getDonHangChiTietById(id) {

            DonHangService.getPageDetail(id)
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