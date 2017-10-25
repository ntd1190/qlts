
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('KhoPhieuNhapEditCtrl', function ($rootScope, $scope, KhoPhieuNhapService, TaiSanService, utility, $timeout) {
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
            },
            DELETE: function (name, code) {
                var fc = function () {
                    vm.data.listChiTiet.splice(vm.data.listChiTiet.length - 1, 1);
                    $("#txtMaTaiSan" + (vm.data.listChiTiet.length - 1).toString()).focus();
                }
                $timeout(fc, 6);
            }
        };
        //end HOT-KEY

        var _tableState;
        var userInfo;
        var linkUrl = '';
        var phieuKhoPhieuNhapId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoPhieuNhapEditCtrl';
        vm.getphieuKhoPhieuNhapId = function () {
            return phieuKhoPhieuNhapId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuKhoPhieuNhap = {};
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

            if (config && config.khoPhieuNhapId) {
                phieuKhoPhieuNhapId = config.khoPhieuNhapId;
                if (config.khoPhieuNhapId > 0) {
                    getphieuKhoPhieuNhapById(config.khoPhieuNhapId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.khoPhieuNhapId === 0) {
                vm.data.phieuKhoPhieuNhap.NgayNhap = moment().format('DD/MM/YYYY');
                vm.data.phieuKhoPhieuNhap.NgayHD = moment().format('DD/MM/YYYY');
                vm.data.phieuKhoPhieuNhap.Loai = $("#cbxLoai option:first").val();
                CreateListChiTiet();
            }

            initEventListener();
            $("#txtSoPhieu").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptKhoPhieuNhapById&data=' + phieuKhoPhieuNhapId);
            $('#reportmodal').modal('show');
        };

        vm.action.add = function () {
            CreateListChiTiet();
            var fc = function () {
                $("#txtMaTaiSan" + (vm.data.listChiTiet.length - 1).toString()).focus();
            }
            $timeout(fc, 6);
        };

        vm.action.save = function () {

            var obj = InvalidateDataPhieuKhoPhieuNhap();

            if (obj == null)
                return;

            if (InvalidateDataPhieuKhoPhieuNhapChiTiet())
                return;

            if (phieuKhoPhieuNhapId > 0) {
                //if (!compareList()) {
                //    if (InvalidateDataPhieuKhoPhieuNhapChiTiet())
                //        return;
                //}
                update();
            }
            else {
                insert();
            }
        };

        function compareList() {
            var _1 = vm.data.listChiTiet;
            var _2 = vm.data.list1ChiTietGoc;

            for (var index1 in vm.data.listChiTiet) {
                if (typeof vm.data.list1ChiTietGoc[index1] === "undefined") {
                    return false;
                }
                else {
                    //vm.data.list1ChiTietGoc[index1].TaiSanId = parseInt(vm.data.list1ChiTietGoc[index1].TaiSanId);
                }

                if (angular.toJson(vm.data.listChiTiet[index1]) === angular.toJson(vm.data.list1ChiTietGoc[index1])) {

                }
                else {
                    return false;
                }
            }
            return true;
        }

        vm.action.removePhieuKhoPhieuNhap = function () {

            if (phieuKhoPhieuNhapId <= 0) {
                utility.AlertError('Phiếu này không tồn tại trong hệ thống!');
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var KhoPhieuNhapListSelected = new Array();

            KhoPhieuNhapListSelected.push(phieuKhoPhieuNhapId);

            var ids = KhoPhieuNhapListSelected.join(',');
            if (ids.length > 0) {
                KhoPhieuNhapService.DeleteList(ids).then(function (success) {
                    if (success.data.data > 0) {
                        if (parseInt(success.data.data) > 0) {
                            utility.AlertError(success.data.data + ' phiếu xóa không thành công!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + 'KhoPhieuNhap/list';
                    }, 600);
                    
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };

        vm.action.keyPressKhoPhieuNhap = function (value, fromId, ToId, event) {
            var obj = vm.data.phieuKhoPhieuNhap;

            if (event.keyCode == '13') {
                if (fromId == 'txtSoPhieu') {
                    vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
                    if (vm.error.SoPhieu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayHD') {
                    $("#" + ToId + " input").focus();
                }
                else if (fromId == 'txtBBKiem') {
                    $("#" + ToId + " input").focus();
                }
                else $("#" + ToId).focus();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            if (event.keyCode == '13') {
                console.log(fromId + "->" + ToId);
                if (fromId == ('txtVAT' + index)) {
                    if ($("#txtVAT" + (index + 1)).length == 0) {
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
            //vm.data.listChiTiet[index.$index].PhongBanId = data.PhongBanId;
            //vm.data.listChiTiet[index.$index].TenPhongBan = data.TenPhongBan;
            //vm.data.listChiTiet[index.$index].NhanVienId = data.NhanVienId;
            //vm.data.listChiTiet[index.$index].TenNhanVien = data.TenNhanVien;
            //vm.data.listChiTiet[index.$index].SoLuongTon = data.SoLuongTon;
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
            chitiet.KhoPhieuNhapChiTietId = 0;
            chitiet.KhoPhieuNhapId = 0;
            chitiet.TaiSanId = 0;
            chitiet.SoLuong = 0;
            chitiet.DonGia = 0;
            chitiet.GiaMua = 0;
            chitiet.GiaBan = 0;
            chitiet.VAT = 0;
            chitiet.HanDung = "";
            chitiet.LoSanXuat = "";
            vm.data.listChiTiet.push(chitiet);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuKhoPhieuNhap.CoSoId = userInfo.CoSoId;

            var phieuKhoPhieuNhap = utility.clone(vm.data.phieuKhoPhieuNhap);
            var data = {};
            data.phieuKhoPhieuNhap = angular.toJson(phieuKhoPhieuNhap);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuNhapService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    if (parseInt(result.data.data[0]["KhoPhieuNhapIdI"]) < 0) {
                        utility.AlertError("Tháng đã chốt!");
                    }
                    else {
                        utility.AlertSuccess("Nhập kho thành công");

                        $timeout(function () {
                            window.location = vm.data.linkUrl + 'KhoPhieuNhap/edit/' + result.data.data[0].KhoPhieuNhapIdI;
                        }, 2000);
                    }
                    
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
            vm.data.phieuKhoPhieuNhap.CoSoId = userInfo.CoSoId;

            var phieuKhoPhieuNhap = utility.clone(vm.data.phieuKhoPhieuNhap);
            var data = {};
            data.khoPhieuNhapId = phieuKhoPhieuNhapId;
            data.phieuKhoPhieuNhap = angular.toJson(phieuKhoPhieuNhap);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            KhoPhieuNhapService.update(data)
                .then(function success(result) {
                    utility.removeloadding();
                    if (parseInt(result.data.data[0]["ID"]) < 0) {
                        if (parseInt(result.data.data[0]["ID"]) == -1)
                            utility.AlertError("Tháng đã chốt!");
                        else if (parseInt(result.data.data[0]["ID"]) == -2)
                            utility.AlertError("Không thể cập nhật. Tài sản đã được sử dụng. Số lượng không đủ!!");
                    }
                    else
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

        function refresh() {
            vm.error.SoPhieu = false;
            vm.error.Loai = false;
            vm.error.NgayNhap = false;
            vm.error.SoHoaDon = false;
            vm.error.Seri = false;
            vm.error.NgayHD = false;
            vm.error.KhoTaiSanId = false;
            vm.error.NguonNganSachId = false;
            vm.error.BBKiem = false;
            vm.error.NhaCungCapId = false;
            vm.error.ChietKhau = false;
            vm.error.NguoiGiao = false;
            vm.error.TaiKhoanCo = false;
            vm.error.TaiKhoanNo = false;
            vm.error.NoiDung = false;
        }

        function InvalidateDataPhieuKhoPhieuNhap() {
            refresh();

            var obj = vm.data.phieuKhoPhieuNhap;

            vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
            if (vm.error.SoPhieu) {
                $("#txtSoPhieu").focus();
                return null;
            }

            vm.error.KhoTaiSanId = utility.checkInValid(obj.KhoTaiSanId, 'isEmpty');
            if (vm.error.KhoTaiSanId) {
                $("#cbxKho").focus();
                return null;
            }
            vm.error.NguonNganSachId = utility.checkInValid(obj.NguonNganSachId, 'isEmpty');
            if (vm.error.NguonNganSachId) {
                $("#cbxNguonNganSach").focus();
                return null;
            }
            vm.error.NhaCungCapId = utility.checkInValid(obj.NhaCungCapId, 'isEmpty');
            if (vm.error.NhaCungCapId) {
                $("#cbxNhaCungCap").focus();
                return null;
            }
            if (angular.isUndefined(obj.ChietKhau) === false) {
                if (obj.ChietKhau.toString().length > 0) {
                    if (parseInt(obj.ChietKhau) < 0) {
                        vm.error.ChietKhau = true;
                        $("#txtChietKhau").focus();
                        utility.AlertError('Chiết khấu không hợp lệ!');
                        return null;
                    }
                }
            }

            return 1;
        }

        function InvalidateDataPhieuKhoPhieuNhapChiTiet() {
            var hasError = false;
            var obj = vm.data.phieuKhoPhieuNhap;

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
                else if (utility.checkInValid(vm.data.listChiTiet[index].SoLuong, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].DonGia, 'isEmpty')) {
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
            if (!num && num != 0)
                return true;
            else if (num.toString().length <= 0)
                return true;
            else if (num.toString() === '0')
                return true;
            else
                return false;
        }

        function getphieuKhoPhieuNhapById(id) {

            KhoPhieuNhapService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuKhoPhieuNhap;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuKhoPhieuNhap = result.data.data[0];

                        getphieuKhoPhieuNhapChiTietById(vm.data.phieuKhoPhieuNhap.KhoPhieuNhapId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuKhoPhieuNhapChiTietById(id) {

            KhoPhieuNhapService.GetPageDetail(id)
                .then(function success(result) {
                    console.log(result);
                    vm.data.listChiTiet = [];
                    vm.data.list1ChiTietGoc = [];

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.listChiTiet = result.data.data;
                        vm.data.list1ChiTietGoc = angular.copy(result.data.data);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getTaiSan(maTaiSan) {
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            TaiSanService.getComboboxKhoPhieuNhap(CoSoId, NhanVienId, "")
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
            vm.data.phieuKhoPhieuNhap = {};
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