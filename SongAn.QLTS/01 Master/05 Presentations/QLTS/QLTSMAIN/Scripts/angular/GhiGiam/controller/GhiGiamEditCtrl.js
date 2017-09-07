
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('GhiGiamEditCtrl', function ($rootScope, $scope, GhiGiamService, TaiSanService,utility, $timeout) {
        /*** PRIVATE ***/

        var vm = this;

        //HOT-KEY       
        vm.keys = {
            F2: function (name, code) {
                CreateListChiTiet();
                var fc = function () {
                    $("#txtTenTaiSan" + (vm.data.listChiTiet.length - 1).toString()).focus();
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
        var phieuGhiGiamId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'GhiGiamEditCtrl';
        vm.getphieuGhiGiamId = function () {
            return phieuGhiGiamId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuGhiGiam = {};
        vm.data.listChiTiet = [];
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

            if (config && config.GhiGiamId) {
                phieuGhiGiamId = config.GhiGiamId;
                if (config.GhiGiamId > 0) {
                    getphieuGhiGiamById(config.GhiGiamId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.GhiGiamId === 0) {
                vm.data.phieuGhiGiam.NgayChungTu = moment().format('DD/MM/YYYY');
                vm.data.phieuGhiGiam.NgayGhiGiam = moment().format('DD/MM/YYYY');
                CreateListChiTiet();
            }

            initEventListener();
            //$('#cbxPhanLoai').val("2");            
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.add = function () {
            CreateListChiTiet();
        };

        vm.action.save = function () {

            var obj = InvalidateDataPhieuGhiGiam();

            if (obj == null)
                return;
            if (!InvalidateDataPhieuGhiGiamChiTiet())
                return;
            if (phieuGhiGiamId > 0) {
                update();
            }
            else {
                insert();
            }
        };

        vm.action.removePhieuGhiGiam = function () {

            if (phieuGhiGiamId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var GhiGiamListSelected = new Array();

            GhiGiamListSelected.push(phieuGhiGiamId);

            var ids = GhiGiamListSelected.join(',');
            if (ids.length > 0) {
                GhiGiamService.DeleteList(ids).then(function (success) {
                    utility.AlertSuccess('Xóa thành công!');
                    window.location.href = vm.data.linkUrl + 'GhiGiam/list';
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };
        vm.action.keyPressGhiGiam = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuGhiGiam;
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgayChungTu') {
                    vm.error.NgayChungTu = utility.checkInValid(obj.NgayChungTu, 'isEmpty');
                    if (vm.error.NgayChungTu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayGhiGiam') {
                    vm.error.NgayGhiGiam = utility.checkInValid(obj.NgayGhiGiam, 'isEmpty');
                    if (vm.error.NgayGhiGiam) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtSoChungTu') {
                    vm.error.SoChungTu = utility.checkInValid(obj.SoChungTu, 'isEmpty');
                    if (vm.error.SoChungTu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNoiDung') {
                    vm.error.NoiDung = utility.checkInValid(obj.NoiDung, 'isEmpty');
                    if (vm.error.NoiDung) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();


            }
        }
        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                debugger
                //set condition of has-error
                if (fromId == ('txtMaTaiSan' + index)) {
                    var data = { MaTaiSan: value,CoSoId : userInfo.CoSoId };
                    TaiSanService.GetMaTaiSan(data).then(function (success) {
                        if (success.data.data.length>0) {
                            vm.data.listChiTiet[index].TaiSanId = success.data.data[0].TaiSanId;
                            vm.data.listChiTiet[index].TenPhongBan =  success.data.data[0].TenPhongBan;
                            vm.data.listChiTiet[index].DonViTinh = success.data.data[0].DonViTinh;
                            vm.data.listChiTiet[index].SoLuongTon = success.data.data[0].SoLuongTon;
                        }
                        
                    });
                }
                else if (fromId == ('txtSoLuong' + index)) {
                    if ($("#txtSoLuong" + (index + 1)).length == 0) {
                        CreateListChiTiet();
                        var fc = function () {
                            $("#cbxTaiSan" + (parseInt(index) + 1).toString()).focus();
                        }
                        $timeout(fc, 6);
                    }
                    else {
                        $("#cbxTaiSan" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else $("#" + ToId).focus();
            }
        }

        vm.action.resetNhanVienId = function (data, index) {
            console.log(data);
            console.log(index);
            //for (var index = 0; index < vm.data.listChiTiet.length; index++) {
            vm.data.listChiTiet[index.$index].NhanVienId = 0;
            //}
        }
        vm.action.getDataTaiSan = function (data, index) {
            console.log(data);
            console.log(index);
           
            vm.data.listChiTiet[index.$index].MaTaiSan = data.MaTaiSan;
            vm.data.listChiTiet[index.$index].TenPhongBan = data.TenPhongBan;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            vm.data.listChiTiet[index.$index].SoLuongTon = data.SoLuongTon;
        }


        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {

            //$scope.$on(vm.controllerId + '.action.focusTenTaiSan', function (e, v) {
            //    $("#txtTenTaiSan" + v).focus();
            //});


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
            chitiet.PhieuGhiGiamChiTietId = 0;
            chitiet.GhiGiamId = 0;
            chitiet.TaiSanId = 0;
            chitiet.NgayBatDauSuDung = moment().format('DD/MM/YYYY');
            chitiet.PhongBanId = 0;
            chitiet.NhanVienId = 0;
            chitiet.SoLuong = 0;
            vm.data.listChiTiet.push(chitiet);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuGhiGiam.CoSoId = userInfo.CoSoId;

            var phieuGhiGiam = utility.clone(vm.data.phieuGhiGiam);
            var data = {};
            data.phieuGhiGiam = angular.toJson(phieuGhiGiam);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            GhiGiamService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");
                    window.location = vm.data.linkUrl + 'GhiGiam/edit/' + result.data.data[0].GhiGiamIdI;

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
            vm.data.phieuGhiGiam.CoSoId = userInfo.CoSoId;

            var phieuGhiGiam = utility.clone(vm.data.phieuGhiGiam);
            var data = {};
            data.GhiGiamId = phieuGhiGiamId;
            data.phieuGhiGiam = angular.toJson(phieuGhiGiam);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            GhiGiamService.update(data)
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

        function InvalidateDataPhieuGhiGiam() {
            var obj = vm.data.phieuGhiGiam;

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
            vm.error.NgayGhiGiam = utility.checkInValid(obj.NgayGhiGiam, 'isEmpty');
            if (vm.error.NgayGhiGiam) {
                $("#txtNgayGhiGiam").focus();
                return null;
            }

            vm.error.NoiDung = utility.checkInValid(obj.NoiDung, 'isEmpty');
            if (vm.error.NoiDung) {
                $("#txtNoiDung").focus();
                return null;
            }
            return 1;
        }

        function InvalidateDataPhieuGhiGiamChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0)
            {                
                return true;
            }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].TaiSanId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].PhongBanId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NhanVienId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Vui lòng chọn lại nhân viên !');
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NgayBatDauSuDung, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].SoLuong, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                }
                else
                {
                    hasError = false;
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return !hasError;
        }

        function getphieuGhiGiamById(id) {

            GhiGiamService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuGhiGiam;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuGhiGiam = result.data.data[0];

                        getphieuGhiGiamChiTietById(vm.data.phieuGhiGiam.GhiGiamId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuGhiGiamChiTietById(id) {

            GhiGiamService.GetPageDetail(id)
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

        function reset() {
            vm.data.phieuGhiGiam = {};
            vm.data.listChiTiet = "";
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