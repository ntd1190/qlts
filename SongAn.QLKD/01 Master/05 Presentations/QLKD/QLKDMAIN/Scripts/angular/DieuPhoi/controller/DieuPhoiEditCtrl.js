(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'dieuPhoiEdit',
            url: '/dieuphoi/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: dieuPhoiEditCtrl
        });
    });

    function dieuPhoiEditCtrl($stateParams, SETTING, $scope, DieuPhoiService, utility, $q, $window, $timeout, Upload) {
        var userInfo, _tableState;
        var DieuPhoiId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.phieuDieuPhoi = {};
        vm.data.listChiTiet = [];
        vm.data.DieuPhoiId = 0;
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.Tilte = 'Lập';

        vm.error = {
            DonHangId: false,
            NhanVienDieuPhoi: false,
            NgayDieuPhoi: false
        }

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            //console.log(config,$stateParams.id);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            DieuPhoiId = $stateParams.id;
            vm.data.DieuPhoiId = $stateParams.id;
            vm.status.isOpenPopup = false;

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            initEventListener();
            setEnableButton();

            if (DieuPhoiId.length > 0) {
                if (parseInt(DieuPhoiId) > 0) {
                    getDieuPhoiById(DieuPhoiId);
                    vm.data.Tilte = 'Điều chỉnh';
                }
                else if (parseInt(DieuPhoiId) === 0) {
                    vm.data.phieuDieuPhoi.NgayDieuPhoi = moment().format('DD/MM/YYYY');
                }
            }
            $timeout(function () {
                $("#cbxDonHang input").focus();
            }, 100);
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'DieuPhoi/showView?viewName=edit';
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
                
            }
        };

        function initEventListener() {

        }

        /* ACTION FUNCTION */

        vm.action = {
            deleteSelected: deleteSelected,
        };
        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLKDMAIN/CrystalReport/ReportPage.aspx?name=rptDieuPhoiById&data=' + vm.data.phieuDieuPhoi.DieuPhoiId);
            $('#reportmodal').modal('show');
        };
        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.getvalTrangThaiDieuPhoi = function (index) {
            if (vm.data.listChiTiet[index].TrangThai.toString() === "0"){
                vm.data.listChiTiet[index].NgayNhan = "";
            }
            else
            {
                vm.data.listChiTiet[index].NgayNhan =  moment().format('DD/MM/YYYY');
            }
        }

        vm.action.getDataDonHang = function (data) {
            //vm.data.phieuDieuPhoi.DonHangId = data.DonHangId;
            if (DieuPhoiId > 0)
                getDieuPhoiChiTietById(DieuPhoiId, data.DonHangId);
            else
                getDieuPhoiChiTietById(0, data.DonHangId);
        }

        vm.action.save = function () {
            var obj = InvalidateDataDieuPhoi();

            if (obj == null)
                return;

            if (InvalidateDataPhieuDieuPhoiChiTiet())
                return;

            if (vm.data.phieuDieuPhoi.DieuPhoiId > 0) {
                resetValidate();
                edit();
            } else {
                resetValidate();
                add();
            }
        }

        function add() {

            vm.status.isLoading = true;
            vm.data.phieuDieuPhoi.NguoiTao = vm.data.userInfo.NhanVienId;
            var DieuPhoi = utility.clone(vm.data.phieuDieuPhoi);
            var data = {};
            data.phieuDieuPhoi = angular.toJson(DieuPhoi);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            DieuPhoiService.insert(data).then(function (success) {
                if (success.data.data) {
                    DieuPhoiId = success.data.data[0].DieuPhoiIdI;
                    utility.AlertSuccess('Thêm thành công!');

                    $timeout(function () {
                        window.location = vm.data.linkUrl + '#!/DieuPhoi/edit/' + DieuPhoiId;
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
            vm.data.phieuDieuPhoi.NguoiTao = vm.data.userInfo.NhanVienId;
            var DieuPhoi = utility.clone(vm.data.phieuDieuPhoi);
            var data = {};
            data.dieuPhoiId = DieuPhoiId;
            data.phieuDieuPhoi = angular.toJson(DieuPhoi);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            DieuPhoiService.update(data).then(function (success) {
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
            if (DieuPhoiId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var DieuPhoiListSelected = new Array();

            DieuPhoiListSelected.push(DieuPhoiId);

            var ids = DieuPhoiListSelected.join(',');
            if (ids.length > 0) {
                DieuPhoiService.removeList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (DieuPhoiListSelected.length > parseInt(success.data.data)) {
                            var sl = DieuPhoiListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');

                        }
                        else {
                            utility.AlertError('Không thể xóa!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + '#!/DieuPhoi/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }

        }

        vm.action.refresh = function () {
            //if (DieuPhoiId.length > 0) {
            //    if (parseInt(DieuPhoiId) == 0) {
            //        delete vm.data.phieuDieuPhoi;
            //        vm.data.phieuDieuPhoi = {};
            //        vm.data.phieuDieuPhoi.TrangThai = $("#cbxTrangThai option:first").val();
            //        vm.data.phieuDieuPhoi.NgayLap = moment().format('DD/MM/YYYY');;

            //        $("#txtMaDieuPhoi").focus();
            //    }
            //}
        }

        vm.action.keyPressDieuPhoi = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuDieuPhoi;
            if (event.keyCode == '13') {
                if (fromId == 'txtNgayDieuPhoi') {
                    if (vm.data.listChiTiet.length > 0) {
                        $("#cbxDaChuyen0").focus();
                    }
                }
                else $("#" + ToId).focus();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            if (event.keyCode == '13') {
                if (fromId == ('txtNgayNhan' + index)) {
                    if (vm.data.listChiTiet.length == index + 1) {
                        $("#cbxDaChuyen" + (parseInt(index) + 1).toString()).focus();
                    }
                    else {
                        $("#cbxDaChuyen" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else $("#" + ToId).focus();
            }
                //check TAB key is press
            else if (event.keyCode == '9') {

            }
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
                    //vm.data.showButtonSave = DieuPhoiId > 0 ? true : vm.data.showButtonSave;
                    vm.data.showButtonSave = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataDieuPhoi() {

            var obj = vm.data.phieuDieuPhoi;

            vm.error.DonHangId = utility.checkInValid(obj.DonHangId, 'isEmpty');
            if (vm.error.DonHangId) {
                $("#cbxDonHang input").focus();
                return null;
            }
            vm.error.NhanVienDieuPhoi = utility.checkInValid(obj.NhanVienDieuPhoi, 'isEmpty');
            if (vm.error.NhanVienDieuPhoi) {
                $("#cbxNhanVien input").focus();
                return null;
            }

            vm.error.NgayDieuPhoi = utility.checkInValid(obj.NgayDieuPhoi, 'isEmpty');
            if (vm.error.NgayDieuPhoi) {
                $("#txtNgayDieuPhoi").focus();
                return null;
            }

            return 1;
        }

        function InvalidateDataPhieuDieuPhoiChiTiet() {
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
                else {
                    hasError = false;
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return hasError;
        }

        function resetValidate() {
            vm.error.DonHangId = false;
            vm.error.NhanVienDieuPhoi = false;
            vm.error.NgayDieuPhoi = false;

        }


        /* API FUNCTION */
        function getDieuPhoiById(id) {

            DieuPhoiService.getById(id)
                .then(function success(result) {

                    delete vm.data.phieuDieuPhoi;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuDieuPhoi = result.data.data[0];
                        getDieuPhoiChiTietById(vm.data.phieuDieuPhoi.DieuPhoiId, vm.data.phieuDieuPhoi.DonHangId);
                    }

                }, function error(result) {
                    console.log(result);
                });
        }

        function getDieuPhoiChiTietById(id, donhangid) {

            DieuPhoiService.getPageDetail(id, donhangid)
                .then(function success(result) {
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {

                        vm.data.listChiTiet = result.data.data;

                        $timeout(function () {
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

function getvalTrangThaiDieuPhoi(sel) {
    alert(sel.value);
}