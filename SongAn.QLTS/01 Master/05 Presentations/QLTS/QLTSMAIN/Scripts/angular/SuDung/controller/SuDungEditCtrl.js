
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('SuDungEditCtrl', function ($rootScope, $scope, SuDungService, TaiSanService, utility, $timeout) {
        /*** PRIVATE ***/

        var vm = this;

        //HOT-KEY       
        vm.keys = {
            F2: function (name, code) {
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    CreateListChiTiet();
                    var fc = function () {
                        $("#txtMaTaiSan" + (vm.data.listChiTiet.length - 1).toString()).focus();
                    }
                    $timeout(fc, 6);
                }
            },
            F8: function (name, code) {
                if (vm.data.listQuyenTacVu.indexOf("M") > 0 || vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.action.save();
                }
            }
        };
        //end HOT-KEY

        var _tableState;
        var userInfo;
        var linkUrl = '';
        var phieuSuDungId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'SuDungEditCtrl';
        vm.getphieuSuDungId = function () {
            return phieuSuDungId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuSuDung = {};
        vm.data.listChiTiet = [];
        vm.data.list1ChiTietGoc = [];
        vm.data.fullDateString = '';
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.showButtonSave = false;
        vm.data.showButtonXoa = false;
        vm.data.showButtonNew = false;
        vm.data.Tilte = 'Thêm';
        /*** INIT FUNCTION ***/

        // chạy khi controller được khởi tạo
        (function activate() {

        })();

        // nhận config từ view
        vm.onInitView = function (config) {
            vm.data.fullDateString = fullDateString(moment().format('DDMMYYYY'), 'DDMMYYYY');


            if (config && config.userInfo) {
                userInfo = config.userInfo;
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                setEnableButton();
            }

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            if (config && config.SuDungId) {
                phieuSuDungId = config.SuDungId;
                if (config.SuDungId > 0) {
                    getphieuSuDungById(config.SuDungId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.SuDungId === 0) {
                vm.data.phieuSuDung.KyLap = $("#cbxKyLap option:first").val();
                vm.data.phieuSuDung.Nam = new Date().getFullYear();
                CreateListChiTiet();
            }

            initEventListener();
            $("#txtMaTaiSan").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptSuDungById&data=' + phieuSuDungId);
            $('#reportmodal').modal('show');
        };

        vm.action.add = function () {
            CreateListChiTiet();
            var fc = function () {
                $("#txtTenBoPhan" + (vm.data.listChiTiet.length - 1).toString()).focus();
            }
            $timeout(fc, 6);
        };

        vm.action.save = function () {

            var obj = InvalidateDataPhieuSuDung();

            if (obj == null)
                return;
            if (InvalidateDataPhieuSuDungChiTiet())
                return;

            if (phieuSuDungId > 0) {
                update();
            }
            else {
                insert();
            }
        };

        vm.action.removePhieuSuDung = function () {

            if (phieuSuDungId <= 0) {
                utility.AlertError('Phiếu này không tồn tại trong hệ thống!');
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var SuDungListSelected = new Array();

            SuDungListSelected.push(phieuSuDungId);

            var ids = SuDungListSelected.join(',');
            if (ids.length > 0) {
                SuDungService.DeleteList(ids).then(function (success) {
                    utility.AlertSuccess('Xóa thành công!');
                    window.location.href = vm.data.linkUrl + 'SuDung/list';
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };

        vm.action.keyPressSuDung = function (value, fromId, ToId, event) {
            var obj = vm.data.phieuSuDung;

            if (event.keyCode == '13') {
                if (fromId == 'txtNam') {
                    if (!obj.Nam)
                        vm.error.Nam = true;
                    else if (obj.Nam.toString().length <= 0)
                        vm.error.Nam = true;
                    else vm.error.Nam = false;
                    if (vm.error.Nam) {
                        $("#txtNam").focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == ('txtGhiChu' + index)) {
                    if ($("#txtGhiChu" + (index + 1)).length == 0) {
                        CreateListChiTiet();
                        var fc = function () {
                            $("#txtMaTaiSan" + (parseInt(index) + 1).toString()).focus();
                        }
                        $timeout(fc, 6);
                    }
                    else {
                        $("#txtMaTaiSan" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else if (fromId == ('txtMaTaiSan' + index)) {
                    vm.data.listChiTiet[index].TempMaTaiSan = value;
                    $timeout(function () {
                        if (vm.data.listChiTiet[index].TaiSanId > 0) {
                            $("#" + ToId).focus();
                        }
                    }, 100);
                }
                else $("#" + ToId).focus();
            }

        }
        vm.action.getDataTaiSan = function (data, index) {
            console.log(data);

            vm.data.listChiTiet[index.$index].TaiSanId = data.TaiSanId;
            vm.data.listChiTiet[index.$index].MaTaiSan = data.MaTaiSan;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            vm.data.listChiTiet[index.$index].PhongBanId = data.PhongBanId;
            vm.data.listChiTiet[index.$index].TenPhongBan = data.TenPhongBan;
            vm.data.listChiTiet[index.$index].NhanVienId = data.NhanVienId;
            vm.data.listChiTiet[index.$index].TenNhanVien = data.TenNhanVien;
        }


        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {

        }

        /*** BIZ FUNCTION ***/

        function setEnableButton() {
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
                    vm.data.showButtonSave = true;
                }
                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true;
                }
            }
        }

        function CreateListChiTiet() {
            var chitiet = {};
            chitiet.SuDungChiTietId = 0;
            chitiet.SuDungId = 0;
            chitiet.TaiSanId = 0;
            chitiet.PhongBanId = 0;
            chitiet.NhanVienId = 0;
            chitiet.SoSanPhamPhucVu = 0;
            chitiet.DonViTinhSanPham = "";
            chitiet.SoNguyenLieuSuDung = 0;
            chitiet.DonViTinhNguyenLieu = "";
            chitiet.GhiChu = "";
            vm.data.listChiTiet.push(chitiet);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuSuDung.CoSoId = userInfo.CoSoId;

            var phieuSuDung = utility.clone(vm.data.phieuSuDung);
            var data = {};
            data.phieuSuDung = angular.toJson(phieuSuDung);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            SuDungService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");

                    $timeout(function () {
                        window.location = vm.data.linkUrl + 'SuDung/edit/' + result.data.data[0].SuDungIdI;
                    }, 2000);
                }, function error(result) {
                    console.log(result);
                    utility.removeloadding();
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        utility.AlertError('Không thể thêm');
                    }
                });
        }

        function update() {
            utility.addloadding($('body'));
            vm.data.phieuSuDung.CoSoId = userInfo.CoSoId;

            var phieuSuDung = utility.clone(vm.data.phieuSuDung);
            var data = {};
            data.SuDungId = phieuSuDungId;
            data.phieuSuDung = angular.toJson(phieuSuDung);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            SuDungService.update(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Cập nhật thành công");
                }, function error(result) {
                    console.log(result);
                    utility.removeloadding();
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        utility.AlertError('Không thể cập nhật');
                    }
                });
        }

        function InvalidateDataPhieuSuDung() {
            var obj = vm.data.phieuSuDung;

            vm.error.KyLap = utility.checkInValid(obj.KyLap, 'isEmpty');
            if (vm.error.KyLap) {
                $("#cbxKyLap").find('input').focus();
                return null;
            }

            
            if (!obj.Nam)
                vm.error.Nam = true;
            else if (obj.Nam.toString().length <= 0)
                vm.error.Nam = true;
            else vm.error.name = false;
            if (vm.error.Nam) {
                $("#txtNam").focus();
                return null;
            }

            return 1;
        }

        function InvalidateDataPhieuSuDungChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết!');
                return true;
            }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].MaTaiSan, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (checkNumber(vm.data.listChiTiet[index].SoSanPhamPhucVu)) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].DonViTinhSanPham, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (checkNumber(vm.data.listChiTiet[index].SoNguyenLieuSuDung)) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].DonViTinhNguyenLieu, 'isEmpty')) {
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

        function checkNumber(num) {
            if (!num && num!=0)
                return true;
            else if (num.toString().length <= 0)
                return true;
            else 
                return false;
        }

        function getphieuSuDungById(id) {

            SuDungService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuSuDung;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuSuDung = result.data.data[0];

                        getphieuSuDungChiTietById(vm.data.phieuSuDung.SuDungId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuSuDungChiTietById(id) {

            SuDungService.GetPageDetail(id)
                .then(function success(result) {
                    console.log(result);
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.listChiTiet = result.data.data;
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getTaiSan(maTaiSan) {
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            TaiSanService.getComboboxSuDung(CoSoId, NhanVienId, "")
                .then(function (success) {

                    console.log(success);
                    if (success.data.data) {

                        for (var index in success.data.data) {
                            if (success.data.data[index].MaTaiSan.toUpperCase() == maTaiSan.toUpperCase()) {
                                vm.data.TaiSan = success.data.data[index];
                                return;
                            }
                        }
                    }
                }, function error(result) {
                    console.log(result);

                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {

                    }
                });
        }

        function reset() {
            vm.data.phieuSuDung = {};
            vm.data.listChiTiet = [];
            vm.data.list1ChiTietGoc = [];
            vm.data.TaiSan = {};
        }



        /*** HELPERS ***/
        function compare(dateTimeA, dateTimeB) {
            var momentA = moment(dateTimeA, "DD/MM/YYYY");
            var momentB = moment(dateTimeB, "DD/MM/YYYY");
            if (momentA > momentB) return 1;
            else if (momentA < momentB) return -1;
            else return 0;
        }

        function fullDateString(strDate, strFormat) {
            var date = moment(strDate, strFormat);
            return 'ngày ' + date.format('DD') + ' tháng ' + date.format('MM') + ' năm ' + date.format('YYYY');
        }

        function removeListItem(list, item, prop) {
            var list_length = list.length;
            for (var i = 0; i < list_length; i++) {
                if (list[i][prop] === item[prop]) {
                    list.splice(i, 1);
                    break;
                }
            }

            return list;
        }

    });// end controller

    app.directive("keyboard", keyboard);
    //HOT-KEY
    function keyboard($document, keyCodes) {
        return {
            link: function (scope, element, attrs) {

                var keysToHandle = scope.$eval(attrs.keyboard);
                var keyHandlers = {};

                // Registers key handlers
                angular.forEach(keysToHandle, function (callback, keyName) {
                    var keyCode = keyCodes[keyName];
                    keyHandlers[keyCode] = { callback: callback, name: keyName };
                });

                // Bind to document keydown event
                $document.on("keydown", function (event) {

                    var keyDown = keyHandlers[event.keyCode];

                    // Handler is registered
                    if (keyDown) {
                        event.preventDefault();

                        //// Invoke the handler and digest
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY

})();