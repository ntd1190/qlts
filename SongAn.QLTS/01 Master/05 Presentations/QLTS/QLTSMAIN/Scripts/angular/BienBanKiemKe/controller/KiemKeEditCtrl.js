
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('BienBanKiemKeEditCtrl', function ($rootScope, $scope, BienBanKiemKeService, TaiSanService, utility, $timeout) {
        /*** PRIVATE ***/

        var vm = this;

        //HOT-KEY       
        vm.keys = {
            F2: function (name, code) {
                CreateListBanKiemKe();
                var fc = function () {
                    $("#txtNguoiKiemKe" + (vm.data.listBanKiemKe.length - 1).toString()).focus();
                }
                $timeout(fc, 6);
            },
            F8: function (name, code) {
                vm.action.save();
            }
        };
        //end HOT-KEY

        var _tableState;
        var userInfo;
        var linkUrl = '';
        var phieuBienBanKiemKeId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'BienBanKiemKeEditCtrl';
        vm.getphieuBienBanKiemKeId = function () {
            return phieuBienBanKiemKeId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuBienBanKiemKe = {};
        vm.data.listChiTiet = [];
        vm.data.listBanKiemKe = [];
        vm.data.listChiTietGoc = [];
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

            if (config && config.kiemKeId) {
                phieuBienBanKiemKeId = config.kiemKeId;
                if (config.kiemKeId > 0) {
                    getphieuBienBanKiemKeById(config.kiemKeId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.kiemKeId === 0) {
                vm.data.phieuBienBanKiemKe.NgayChungTu = moment().format('DD/MM/YYYY');
                vm.data.phieuBienBanKiemKe.NgayKiemKe = moment().format('DD/MM/YYYY');
                //CreateListChiTiet();
                CreateListBanKiemKe();
            }

            initEventListener();
            $("#txtNgayChungTu").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.add = function () {
            CreateListBanKiemKe();
            var fc = function () {
                $("#txtNguoiKiemKe" + (vm.data.listBanKiemKe.length - 1).toString()).focus();
            }
            $timeout(fc, 6);
        };

        vm.action.save = function () {

            var obj = InvalidateDataPhieuBienBanKiemKe();
            if (obj == null)
                return;

            if (InvalidateDataPhieuBienBanKiemKeChiTiet())
                return;

            if (InvalidateDataBanKiemKe()) {
                $('[data-target="#BanKiemKe"]').tab('show');
                return;
            }

            if (phieuBienBanKiemKeId > 0) {
                utility.AlertSuccess('UUUUUUUUUUUUUUUUUUUUU!');
                update();
            }
            else {
                utility.AlertSuccess('IIIIIIIIIIIIIIII!');
                insert();
            }
        };

        vm.action.removePhieuBienBanKiemKe = function () {

            if (phieuBienBanKiemKeId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var BienBanKiemKeListSelected = new Array();

            BienBanKiemKeListSelected.push(phieuBienBanKiemKeId);

            var ids = BienBanKiemKeListSelected.join(',');
            if (ids.length > 0) {
                BienBanKiemKeService.DeleteList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (BienBanKiemKeListSelected.length > parseInt(success.data.data)) {
                            var sl = BienBanKiemKeListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');
                        }
                        else
                            utility.AlertError('Tài sản đã được sử dụng. Không thể xóa!');
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + 'BienBanKiemKe/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };
        vm.action.keyPressKiemKe = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuBienBanKiemKe;
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgayChungTu') {
                    vm.error.NgayChungTu = utility.checkInValid(obj.NgayChungTu, 'isEmpty');
                    if (vm.error.NgayChungTu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayKiemKe') {
                    vm.error.NgayKiemKe = utility.checkInValid(obj.NgayKiemKe, 'isEmpty');
                    if (vm.error.NgayKiemKe) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).find('input').focus();
                }
                else if (fromId == 'txtSoChungTu') {
                    vm.error.SoChungTu = utility.checkInValid(obj.SoChungTu, 'isEmpty');
                    if (vm.error.SoChungTu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtGhiChu') {
                    vm.error.GhiChu = utility.checkInValid(obj.GhiChu, 'isEmpty');
                    if (vm.error.GhiChu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();


            }
        }
        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
            
            }
        }

        vm.action.keyPressBanKiemKe = function (value, fromId, ToId, index, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == ('txtVaiTro' + index)) {
                    if ($("#txtVaiTro" + (index + 1)).length == 0) {
                        CreateListBanKiemKe();
                        var fc = function () {
                            $("#txtNguoiKiemKe" + (parseInt(index) + 1).toString()).focus();
                        }
                        $timeout(fc, 6);
                    }
                    else {
                        $("#txtNguoiKiemKe" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else $("#" + ToId).focus();
            }
        }

        vm.action.resetNhanVienId = function (data) {
            vm.data.phieuBienBanKiemKe.PhongBanId = data.PhongBanId;
            if (phieuBienBanKiemKeId > 0)
                getphieuBienBanKiemKeChiTietById(vm.data.phieuBienBanKiemKe.BienBanKiemKeId, data.PhongBanId);
            else
                getphieuBienBanKiemKeChiTietById(0, data.PhongBanId);
        }
        vm.action.getDataTaiSan = function (data, index) {
            console.log(data);
            console.log(index);

            vm.data.listChiTiet[index.$index].TaiSanId = data.TaiSanId;
            vm.data.listChiTiet[index.$index].MaTaiSan = data.MaTaiSan || vm.data.listChiTiet[index.$index].MaTaiSan;;
            vm.data.listChiTiet[index.$index].NguyenGia = data.NguyenGia;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            if (data.TaiSanId > 0) $("#cbxPhongBan" + index.$index).find('input').focus();

        }
        vm.action.nhanVienByPhongBanSelected = function (data, index) {
            console.log(data);
            vm.data.listChiTiet[index.$index].NhanVienId = data.NhanVienId;
        }


        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = $(e.target).attr("data-target");
                if (target == "#BanKiemKe") {
                    $("#txtNguoiKiemKe0").focus();
                }
            });
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
            
            vm.data.listChiTiet.push(chitiet);
        }

        function CreateListBanKiemKe() {
            var chitiet = {};
            chitiet.BanKiemKeId = 0;
            chitiet.BienBanKiemKeId = 0;
            chitiet.NguoiKiemKe = "";
            chitiet.NguoiKiemKe = "";
            chitiet.NguoiKiemKe = "";
            chitiet.NguoiKiemKe = "";
            vm.data.listBanKiemKe.push(chitiet);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuBienBanKiemKe.CoSoId = userInfo.CoSoId;

            var phieuBienBanKiemKe = utility.clone(vm.data.phieuBienBanKiemKe);
            var data = {};
            data.phieuBienBanKiemKe = angular.toJson(phieuBienBanKiemKe);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.listBanKiemKe = angular.toJson(vm.data.listBanKiemKe);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            BienBanKiemKeService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");
                    window.location = vm.data.linkUrl + 'BienBanKiemKe/edit/' + result.data.data[0].BienBanKiemKeIdI;

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
            vm.data.phieuBienBanKiemKe.CoSoId = userInfo.CoSoId;

            var phieuBienBanKiemKe = utility.clone(vm.data.phieuBienBanKiemKe);
            var data = {};
            data.BienBanKiemKeId = phieuBienBanKiemKeId;
            data.phieuBienBanKiemKe = angular.toJson(phieuBienBanKiemKe);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.listBanKiemKe = angular.toJson(vm.data.listBanKiemKe);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            BienBanKiemKeService.update(data)
                .then(function success(result) {
                    utility.removeloadding();
                    if (parseInt(result.data.data[0]["ID"]) < 0)
                        utility.AlertError("Không thể cập nhật. Tài sản đã được sử dụng. Số lượng không đủ!");
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

        function InvalidateDataPhieuBienBanKiemKe() {
            var obj = vm.data.phieuBienBanKiemKe;

            vm.error.SoChungTu = utility.checkInValid(obj.SoChungTu, 'isEmpty');
            if (vm.error.SoChungTu) {
                $("#txtSoChungTu").focus();
                return null;
            }

            vm.error.NgayChungTu = utility.checkInValid(obj.NgayChungTu, 'isEmpty');
            if (vm.error.NgayChungTu) {
                $("#txtNgayChungTu").focus();
                return null;
            }
            vm.error.NgayKiemKe = utility.checkInValid(obj.NgayKiemKe, 'isEmpty');
            if (vm.error.NgayKiemKe) {
                $("#txtNgayKiemKe").focus();
                return null;
            }
            vm.error.BoPhanId = utility.checkInValid(obj.PhongBanId, 'isEmpty');
            if (vm.error.BoPhanId) {
                $("#cbxPhongBan").find("input").focus();
                return null;
            }

            return 1;
        }

        function InvalidateDataPhieuBienBanKiemKeChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa tạo thông tin chi tiết tài sản!');
                return true;
            }

            return hasError;
        }

        function InvalidateDataBanKiemKe() {
            var hasError = false;

            if (!vm.data.listBanKiemKe || vm.data.listBanKiemKe.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết ban kiểm kê!');
                return true;
            }
            for (var index = 0; index < vm.data.listBanKiemKe.length; index++) {
                if (utility.checkInValid(vm.data.listBanKiemKe[index].NguoiKiemKe, 'isEmpty')) {
                    hasError = true;
                    vm.data.listBanKiemKe[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listBanKiemKe[index].ChucVu, 'isEmpty')) {
                    hasError = true;
                    vm.data.listBanKiemKe[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listBanKiemKe[index].DaiDien, 'isEmpty')) {
                    hasError = true;
                    vm.data.listBanKiemKe[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listBanKiemKe[index].VaiTro, 'isEmpty')) {
                    hasError = true;
                    vm.data.listBanKiemKe[index].isError = true;
                    return hasError;
                }
                else {
                    hasError = false;
                    vm.data.listBanKiemKe[index].isError = false;
                }
            }
            return hasError;
        }

        function getphieuBienBanKiemKeById(id) {

            BienBanKiemKeService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuBienBanKiemKe;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuBienBanKiemKe = result.data.data[0];

                        //getphieuBienBanKiemKeChiTietById(vm.data.phieuBienBanKiemKe.BienBanKiemKeId, vm.data.phieuBienBanKiemKe.PhongBanId);
                        getphieuBanKiemKeById(vm.data.phieuBienBanKiemKe.BienBanKiemKeId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuBienBanKiemKeChiTietById(id, phongBanId) {

            BienBanKiemKeService.GetPageDetail(id, phongBanId)
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

        function getphieuBanKiemKeById(id) {

            BienBanKiemKeService.GetPageBanKiemKeById(id)
                .then(function success(result) {
                    console.log(result);
                    vm.data.listBanKiemKe = [];

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.listBanKiemKe = result.data.data;
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getTaiSan(maTaiSan) {
            var CoSoId = userInfo.CoSoId || 0;
            var NhanVienId = userInfo.NhanVienId || 0;

            TaiSanService.getCombobox(CoSoId, NhanVienId, "")
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
            vm.data.phieuBienBanKiemKe = {};
            vm.data.listChiTiet = "";
            vm.data.TaiSan = {};
        }

        function compareList() {

            for (var index1 in vm.data.listChiTiet) {
                if (typeof vm.data.listChiTietGoc[index1] === "undefined") {
                    return 0;
                }
                else {
                    vm.data.listChiTietGoc[index1].TaiSanId = parseInt(vm.data.listChiTietGoc[index1].TaiSanId);
                    vm.data.listChiTietGoc[index1].isError = false;
                }

                if (angular.toJson(vm.data.listChiTiet[index1]) === angular.toJson(vm.data.listChiTietGoc[index1])) {

                }
                else {
                    return 0;
                }
            }
            return 1;
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