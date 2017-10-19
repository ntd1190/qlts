
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('DieuChuyenEditCtrl', function ($rootScope, $scope, DieuChuyenService, TaiSanService, utility, $timeout) {
        /*** PRIVATE ***/

        var vm = this;

        //HOT-KEY       
        vm.keys = {
            F2: function (name, code) {
                CreateListChiTiet();
                var fc = function () {
                    $("#txtMaTaiSan" + (vm.data.listChiTiet.length - 1).toString()).focus();
                }
                $timeout(fc, 6);
            },
            F8: function (name, code) {
                vm.action.save();
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
        var phieuDieuChuyenId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'DieuChuyenEditCtrl';
        vm.getphieuDieuChuyenId = function () {
            return phieuDieuChuyenId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuDieuChuyen = {};
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

            if (config && config.DieuChuyenId) {
                phieuDieuChuyenId = config.DieuChuyenId;
                if (config.DieuChuyenId > 0) {
                    getphieuDieuChuyenById(config.DieuChuyenId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.DieuChuyenId === 0) {
                vm.data.phieuDieuChuyen.NgayChungTu = moment().format('DD/MM/YYYY');
                vm.data.phieuDieuChuyen.NgayDieuChuyen = moment().format('DD/MM/YYYY');
                CreateListChiTiet();
            }

            initEventListener();
            $("#txtSoChungTu").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptDieuChuyenById&data=' + phieuDieuChuyenId);
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

            var obj = InvalidateDataPhieuDieuChuyen();

            if (obj == null)
                return;
            if (phieuDieuChuyenId <= 0) {
                if (InvalidateDataPhieuDieuChuyenChiTiet())
                    return;
                if (checkSoLuongTon() != null)
                    return;
            }
            if (phieuDieuChuyenId > 0) {
                if (!compareList()) {
                    if (InvalidateDataPhieuDieuChuyenChiTiet())
                        return;
                    if (checkSoLuongTon() != null)
                        return;
                }
                
                update();
            }
            else {                
                insert();
            }
        };
        function compareList() {
            var _1  = vm.data.listChiTiet;
            var _2 = vm.data.list1ChiTietGoc;

            for (var index1 in vm.data.listChiTiet) {
                if (typeof vm.data.list1ChiTietGoc[index1] === "undefined") {
                    return false;
                }
                else {
                    vm.data.list1ChiTietGoc[index1].TaiSanId = parseInt(vm.data.list1ChiTietGoc[index1].TaiSanId);
                    vm.data.list1ChiTietGoc[index1].PhongBanSuDung = parseInt(vm.data.list1ChiTietGoc[index1].PhongBanSuDung);
                    vm.data.list1ChiTietGoc[index1].NhanVienSuDung = parseInt(vm.data.list1ChiTietGoc[index1].NhanVienSuDung);
                }
                
                if (angular.toJson(vm.data.listChiTiet[index1]) === angular.toJson(vm.data.list1ChiTietGoc[index1])) {
                //if (JSON.stringify(vm.data.listChiTiet[index1]) === JSON.stringify(vm.data.list1ChiTietGoc[index1])) {
                    
                }
                else {
                    return false;
                }
            }
            return true;
        }


        vm.action.removePhieuDieuChuyen = function () {

            if (phieuDieuChuyenId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var DieuChuyenListSelected = new Array();

            DieuChuyenListSelected.push(phieuDieuChuyenId);

            var ids = DieuChuyenListSelected.join(',');
            if (ids.length > 0) {
                DieuChuyenService.DeleteList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (DieuChuyenListSelected.length > parseInt(success.data.data)) {
                            var sl = DieuChuyenListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');
                        }
                        else
                            utility.AlertError('Phiếu đã duyệt hoặc số liệu đã chốt!');
                    }
                    else {
                        utility.AlertSuccess('Xóa thành công!');
                        window.location.href = vm.data.linkUrl + 'DieuChuyen/list';
                    }
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };
        vm.action.keyPressDieuChuyen = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuDieuChuyen;
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgayChungTu') {
                    vm.error.NgayChungTu = utility.checkInValid(obj.NgayChungTu, 'isEmpty');
                    if (vm.error.NgayChungTu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayDieuChuyen') {
                    vm.error.NgayDieuChuyen = utility.checkInValid(obj.NgayDieuChuyen, 'isEmpty');
                    if (vm.error.NgayDieuChuyen) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
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
                //set condition of has-error
                if (fromId == ('txtLyDo' + index)) {
                    if ($("#txtLyDo" + (index + 1)).length == 0) {
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
                            $("#" + ToId + " input").focus();
                        }
                            }, 100);
                    
                    //if (value != "") {
                    //    $timeout(function () {
                    //        getTaiSan(value);
                    //    }, 0);
                    //}
                }
                else $("#" + ToId).focus();
            }
            //check TAB key is press
            else if (event.keyCode == '9') {
                if (fromId == ('txtMaTaiSan' + index)) {
                    vm.data.listChiTiet[index].TempMaTaiSan = value;
                }
            }
        }

        
        vm.action.getDataTaiSan = function (data, index) {
            console.log(data);
            console.log(index);

            vm.data.listChiTiet[index.$index].TaiSanId = data.TaiSanId;
            vm.data.listChiTiet[index.$index].MaTaiSan = data.MaTaiSan;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            vm.data.listChiTiet[index.$index].PhongBanSuDung = data.PhongBanId;
            vm.data.listChiTiet[index.$index].TenPhongBanSuDung = data.TenPhongBan;
            vm.data.listChiTiet[index.$index].NhanVienSuDung = data.NhanVienId;
            vm.data.listChiTiet[index.$index].TenNhanVienSuDung = data.TenNhanVien;
            vm.data.listChiTiet[index.$index].SoLuongTon = data.SoLuongTon;
            
        }

        vm.action.resetNhanVienId = function (data, index) {
            //console.log(data);
            //console.log(index);
            vm.data.listChiTiet[index.$index].PhongBanChuyenDen = data.PhongBanId;
            vm.data.listChiTiet[index.$index].NhanVienTiepNhan = 0;
        }
        vm.action.nhanVienByPhongBanSelected = function (data, index) {
            //console.log(data);
            vm.data.listChiTiet[index.$index].NhanVienTiepNhan = data.NhanVienId;
        }


        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {

        }

        /*** BIZ FUNCTION ***/

        function setEnableButton() {
            if (document.referrer.toUpperCase().indexOf("TRACUUTAISAN") > 1) {
                return;
            }
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
            chitiet.PhieuDieuChuyenChiTietId = 0;
            chitiet.DieuChuyenId = 0;
            chitiet.TaiSanId = 0;
            chitiet.PhongBanSuDung = 0;
            chitiet.PhongBanChuyenDen = 0;
            chitiet.SoLuong = 0;
            chitiet.LyDo = "";
            vm.data.listChiTiet.push(chitiet);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuDieuChuyen.CoSoId = userInfo.CoSoId;

            var phieuDieuChuyen = utility.clone(vm.data.phieuDieuChuyen);
            var data = {};
            data.phieuDieuChuyen = angular.toJson(phieuDieuChuyen);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            DieuChuyenService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    if (parseInt(result.data.data[0]["DieuChuyenIdI"]) < 0) {
                        utility.AlertError("Năm đã chốt hoặc ngày điều chuyển không hợp lệ!");
                    }
                    else
                    {
                        utility.AlertSuccess("Điều chuyển thành công");

                        $timeout(function () {
                            window.location = vm.data.linkUrl + 'DieuChuyen/edit/' + result.data.data[0].DieuChuyenIdI;
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
            vm.data.phieuDieuChuyen.CoSoId = userInfo.CoSoId;

            var phieuDieuChuyen = utility.clone(vm.data.phieuDieuChuyen);
            var data = {};
            data.DieuChuyenId = phieuDieuChuyenId;
            data.phieuDieuChuyen = angular.toJson(phieuDieuChuyen);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            DieuChuyenService.update(data)
                .then(function success(result) {
                    utility.removeloadding();
                    if (parseInt(result.data.data[0]["ID"]) < 0) {
                        if (parseInt(result.data.data[0]["ID"]) == -1)
                            utility.AlertError("Không thể cập nhật. Tài sản đã được sử dụng. Số lượng không đủ!");
                        else if (parseInt(result.data.data[0]["ID"]) == -2)
                            utility.AlertError("Phiếu đã duyệt. Không thể chỉnh sửa!");
                        else if (parseInt(result.data.data[0]["ID"]) == -3)
                            utility.AlertError("Năm đã chốt hoặc ngày điều chuyển không hợp lệ!");
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

        function InvalidateDataPhieuDieuChuyen() {
            var obj = vm.data.phieuDieuChuyen;

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
            vm.error.NgayDieuChuyen = utility.checkInValid(obj.NgayDieuChuyen, 'isEmpty');
            if (vm.error.NgayDieuChuyen) {
                $("#txtNgayDieuChuyen").focus();
                return null;
            }

           
            return 1;
        }

        function InvalidateDataPhieuDieuChuyenChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết!');
                return true;
            }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].TaiSanId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].PhongBanSuDung, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].PhongBanChuyenDen, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NhanVienSuDung, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NhanVienTiepNhan, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Vui lòng chọn lại cán bộ tiếp nhận !');
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].SoLuong, 'isEmpty')) {
                    if (typeof vm.data.listChiTiet[index].SoLuong === 'undefined') {
                        utility.AlertError("[<b>" + vm.data.listChiTiet[index].TenTaiSan + '</b>] Không đủ số lượng điều chuyển!');
                    }
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

        function checkSoLuongTon() {
            var _taiSanId = 0;
            var _soLuongTon = 0;
            var _soLuongChuyen = 0;

            for (var index in vm.data.listChiTiet) {
                _taiSanId = vm.data.listChiTiet[index].TaiSanId;
                _soLuongTon = vm.data.listChiTiet[index].SoLuongTon;

                for (var index1 in vm.data.listChiTiet) {
                    if (vm.data.listChiTiet[index1].TaiSanId == _taiSanId) {
                        _soLuongChuyen += vm.data.listChiTiet[index1].SoLuong * 1;

                        if (vm.data.listChiTiet[index1].PhongBanSuDung == vm.data.listChiTiet[index1].PhongBanChuyenDen && 
                            vm.data.listChiTiet[index1].NhanVienSuDung == vm.data.listChiTiet[index1].NhanVienTiepNhan)
                        {
                            vm.data.listChiTiet[index1].isError = true;
                            utility.AlertError("Bạn không thể điều chuyển đến phòng hiện tại đang sử dụng!");
                            return index1;
                        }
                    }
                }
                if (_soLuongTon < _soLuongChuyen) {
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError("[<b>" + vm.data.listChiTiet[index].TenTaiSan + '</b>] Không đủ số lượng điều chuyển!');
                    return index;
                }
                else
                {
                    _taiSanId = 0;
                    _soLuongTon = 0;
                    _soLuongChuyen = 0;
                }
            }
            return null;
        }

        function getphieuDieuChuyenById(id) {

            DieuChuyenService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuDieuChuyen;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuDieuChuyen = result.data.data[0];

                        getphieuDieuChuyenChiTietById(vm.data.phieuDieuChuyen.DieuChuyenId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuDieuChuyenChiTietById(id) {

            DieuChuyenService.GetPageDetail(id)
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
            vm.data.phieuDieuChuyen = {};
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