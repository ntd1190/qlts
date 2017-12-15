(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'baoGiaEdit',
            url: '/baogia/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: baoGiaEditCtrl
        });
    });

    function baoGiaEditCtrl($stateParams, SETTING, $scope, BaoGiaService, utility, $q, $window, $timeout, Upload) {
        var userInfo, _tableState;
        var BaoGiaId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.phieuBaoGia = {};
        vm.data.listChiTiet = [];
        vm.data.BaoGiaId = 0;
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.Tilte = 'Lập';

        vm.error = {
            SoPhieu: false,
            TenBaoGia: false,
            NgayBaoGia: false,
            NhanVienId: false,
            KhachHangId: false
        }

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            //console.log(config,$stateParams.id);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            BaoGiaId = $stateParams.id;
            vm.data.BaoGiaId = $stateParams.id;
            vm.status.isOpenPopup = false;

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            initEventListener();
            setEnableButton();

            if (BaoGiaId.length > 0) {
                if (parseInt(BaoGiaId) > 0) {
                    getBaoGiaById(BaoGiaId);
                    vm.data.Tilte = 'Điều chỉnh';
                }
                else if (parseInt(BaoGiaId) === 0) {
                    vm.data.phieuBaoGia.TrangThai = $("#cbxTrangThai option:first").val();
                    vm.data.phieuBaoGia.DaNhan = $("#cbxDaNhan option:first").val();
                    vm.data.phieuBaoGia.NgayBaoGia = moment().format('DD/MM/YYYY');
                    CreateListChiTiet();
                }
            }

            $("#txtSoPhieu").focus();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'BaoGia/showView?viewName=edit';
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
        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLKDMAIN/CrystalReport/ReportPage.aspx?name=rptBaoGiaById&data=' + vm.data.phieuBaoGia.BaoGiaId);
            $('#reportmodal').modal('show');
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
            var obj = InvalidateDataBaoGia();

            if (obj == null)
                return;

            if (InvalidateDataPhieuBaoGiaChiTiet())
                return;

            if (vm.data.phieuBaoGia.BaoGiaId > 0) {
                resetValidate();
                edit();
            } else {
                resetValidate();
                add();
            }
        }

        function add() {

            vm.status.isLoading = true;
            vm.data.phieuBaoGia.NguoiTao = vm.data.userInfo.NhanVienId;
            var BaoGia = utility.clone(vm.data.phieuBaoGia);
            var data = {};
            data.phieuBaoGia = angular.toJson(BaoGia);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            BaoGiaService.insert(data).then(function (success) {
                if (success.data.data) {
                    BaoGiaId = success.data.data[0].BaoGiaIdI;
                    utility.AlertSuccess('Thêm thành công!');

                    $timeout(function () {
                        window.location = vm.data.linkUrl + '#!/BaoGia/edit/' + BaoGiaId;
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
            vm.data.phieuBaoGia.NguoiTao = vm.data.userInfo.NhanVienId;
            var BaoGia = utility.clone(vm.data.phieuBaoGia);
            var data = {};
            data.baoGiaId = BaoGiaId;
            data.phieuBaoGia = angular.toJson(BaoGia);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            BaoGiaService.update(data).then(function (success) {
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
            if (BaoGiaId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var BaoGiaListSelected = new Array();

            BaoGiaListSelected.push(BaoGiaId);

            var ids = BaoGiaListSelected.join(',');
            if (ids.length > 0) {
                BaoGiaService.removeList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (BaoGiaListSelected.length > parseInt(success.data.data)) {
                            var sl = BaoGiaListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');

                        }
                        else {
                            utility.AlertError('Không thể xóa!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + '#!/BaoGia/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }

        }

        vm.action.refresh = function () {
            //if (BaoGiaId.length > 0) {
            //    if (parseInt(BaoGiaId) == 0) {
            //        
            //    }
            //}
        }

        vm.action.keyPressBaoGia = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuBaoGia;
            if (event.keyCode == '13') {
                if (fromId == 'txtSoPhieu') {
                    vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
                    if (vm.error.SoPhieu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTenBaoGia') {
                    vm.error.TenBaoGia = utility.checkInValid(obj.TenBaoGia, 'isEmpty');
                    if (vm.error.TenBaoGia) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayBaoGia') {
                    vm.error.NgayBaoGia = utility.checkInValid(obj.NgayBaoGia, 'isEmpty');
                    if (vm.error.NgayBaoGia) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId + " input").focus();
                }
                
                else $("#" + ToId).focus();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            if (event.keyCode == '13') {
                if (fromId == ('txtNgayNhan' + index)) {
                    if (vm.data.listChiTiet.length == index + 1) {
                        CreateListChiTiet();
                        var fc = function () {
                            $("#txtMaHangHoa" + (parseInt(index) + 1).toString()).focus();
                        }
                        $timeout(fc, 6);
                    }
                    else {
                        $("#txtMaHangHoa" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else if (fromId == ('txtMaHangHoa' + index)) {

                    vm.data.listChiTiet[index].TempMaHangHoa = value;
                    $timeout(function () {
                        if (vm.data.listChiTiet[index].HangHoaId > 0) {
                            $("#" + ToId).focus();
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
            vm.data.listChiTiet[index.$index].MaHangHoa = data.MaHangHoa || vm.data.listChiTiet[index.$index].MaHangHoa;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            vm.data.listChiTiet[index.$index].DonGia = vm.data.listChiTiet[index.$index].DonGia != 0 ? vm.data.listChiTiet[index.$index].DonGia : data.GiaBan;
        }

        function CreateListChiTiet() {
            var chitiet = {};
            chitiet.BaoGiaChiTietId = 0;
            chitiet.BaoGiaId = 0;
            chitiet.HangHoaId = 0;
            chitiet.SoLuong = 0;
            chitiet.DonGia = 0;
            chitiet.NgayBao = moment().format('DD/MM/YYYY');
            chitiet.NgayNhan = moment().format('DD/MM/YYYY');
            vm.data.listChiTiet.push(chitiet);

            $timeout(function () {
                jQuery("#txtNgayBao" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
                jQuery("#txtNgayNhan" + (vm.data.listChiTiet.length - 1)).datetimepicker({
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
                    //vm.data.showButtonSave = BaoGiaId > 0 ? true : vm.data.showButtonSave;
                    vm.data.showButtonSave = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataBaoGia() {

            var obj = vm.data.phieuBaoGia;

            vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
            if (vm.error.SoPhieu) {
                $("#txtSoPhieu").focus();
                return null;
            }
            vm.error.TenBaoGia = utility.checkInValid(obj.TenBaoGia, 'isEmpty');
            if (vm.error.TenBaoGia) {
                $("#txtTenBaoGia").focus();
                return null;
            }

            vm.error.NgayBaoGia = utility.checkInValid(obj.NgayBaoGia, 'isEmpty');
            if (vm.error.NgayBaoGia) {
                $("#txtNgayBaoGia").focus();
                return null;
            }

            vm.error.NhanVienId = utility.checkInValid(obj.NhanVienId, 'isEmpty');
            if (vm.error.NhanVienId) {
                $("#cbxNhanVien").focus();
                return null;
            }

            vm.error.KhachHangId = utility.checkInValid(obj.KhachHangId, 'isEmpty');
            if (vm.error.KhachHangId) {
                $("#cbxKhachHang input").focus();
                return null;
            }

            return 1;
        }

        function InvalidateDataPhieuBaoGiaChiTiet() {
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
                else if (!CompareDate(vm.data.listChiTiet[index].NgayBao, vm.data.listChiTiet[index].NgayNhan)) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Ngày nhận không hợp lệ!');
                    return hasError;
                }
                else {
                    hasError = false;
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return hasError;
        }

        function CompareDate(dateOne, dateTwo) {
            if (dateOne === "" || dateTwo === "")
                return false;
            var strOne = dateOne.split("/");
            var strTwo = dateTwo.split("/");
            dateOne = new Date(strOne[2], strOne[1], strOne[0]);
            dateTwo = new Date(strTwo[2], strTwo[1], strTwo[0]);

            if (dateOne > dateTwo) {
                return false;
            } else {
                return true;
            }
        }

        function resetValidate() {

            vm.error.SoPhieu = false;
            vm.error.TenBaoGia = false;
            vm.error.NgayBaoGia = false;
            vm.error.NhanVienId = false;
            vm.error.KhachHangId = false;
        }


        /* API FUNCTION */
        function getBaoGiaById(id) {

            BaoGiaService.getById(id)
                .then(function success(result) {

                    delete vm.data.phieuBaoGia;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuBaoGia = result.data.data[0];
                        getBaoGiaChiTietById(vm.data.phieuBaoGia.BaoGiaId);
                    }

                }, function error(result) {
                    console.log(result);
                });
        }

        function getBaoGiaChiTietById(id) {

            BaoGiaService.getPageDetail(id)
                .then(function success(result) {
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {

                        vm.data.listChiTiet = result.data.data;

                        $timeout(function () {
                            jQuery("#txtNgayBao" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                            jQuery("#txtNgayNhan" + (vm.data.listChiTiet.length - 1)).datetimepicker({
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