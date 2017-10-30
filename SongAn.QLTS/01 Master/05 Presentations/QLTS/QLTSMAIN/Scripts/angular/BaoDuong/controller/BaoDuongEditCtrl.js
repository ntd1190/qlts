
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('BaoDuongEditCtrl', function ($rootScope, $scope, BaoDuongService, TaiSanService, utility, $timeout) {
        /*** PRIVATE ***/

        var vm = this;

        //HOT-KEY       
        vm.keys = {
            F2: function (name, code) {
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    CreateListChiTiet();
                    var fc = function () {
                        $("#txtTenBoPhan" + (vm.data.listChiTiet.length - 1).toString()).focus();
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
        var phieuBaoDuongId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'BaoDuongEditCtrl';
        vm.getphieuBaoDuongId = function () {
            return phieuBaoDuongId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuBaoDuong = {};
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

            if (config && config.BaoDuongId) {
                phieuBaoDuongId = config.BaoDuongId;
                if (config.BaoDuongId > 0) {
                    getphieuBaoDuongById(config.BaoDuongId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.BaoDuongId === 0) {
                vm.data.phieuBaoDuong.NgayBaoDuong = moment().format('DD/MM/YYYY');
                vm.data.phieuBaoDuong.NgayDuKien = moment().format('DD/MM/YYYY');
                vm.data.phieuBaoDuong.LoaiBaoDuongId = $("#cbxLoaiBaoDuong option:first").val();
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
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptBaoDuongById&data=' + phieuBaoDuongId);
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

            var obj = InvalidateDataPhieuBaoDuong();

            if (obj == null)
                return;
            if (InvalidateDataPhieuBaoDuongChiTiet())
                return;

            if (phieuBaoDuongId > 0) {                
                update();
            }
            else {
                insert();                
            }
        };

        vm.action.removePhieuBaoDuong = function () {

            if (phieuBaoDuongId <= 0) {
                utility.AlertError('Phiếu này không tồn tại trong hệ thống!');
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var BaoDuongListSelected = new Array();

            BaoDuongListSelected.push(phieuBaoDuongId);

            var ids = BaoDuongListSelected.join(',');
            if (ids.length > 0) {
                BaoDuongService.DeleteList(ids).then(function (success) {
                    utility.AlertSuccess('Xóa thành công!');
                    window.location.href = vm.data.linkUrl + 'BaoDuong/list';
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };

        vm.action.keyPressBaoDuong = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuBaoDuong;
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaTaiSan') {
                    vm.error.MaTaiSan = utility.checkInValid(obj.MaTaiSan, 'isEmpty');
                    if (vm.error.MaTaiSan) {
                        $("#txtMaTaiSan").focus();
                    } else {
                        vm.data.phieuBaoDuong.TempMaTaiSan = value;
                        $timeout(function () {
                            if (vm.data.phieuBaoDuong.TaiSanId > 0) {
                                $("#" + ToId).focus();
                            }
                        }, 100);
                    }
                }
                else if (fromId == 'txtNgayBaoDuong') {
                    vm.error.NgayBaoDuong = utility.checkInValid(obj.NgayBaoDuong, 'isEmpty');
                    if (vm.error.NgayBaoDuong) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayDuKien') {
                    vm.error.NgayDuKien = utility.checkInValid(obj.NgayDuKien, 'isEmpty');
                    if (vm.error.NgayDuKien) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtDuToan') {
                    vm.error.DuToan = utility.checkInValid(obj.DuToan, 'isEmpty');
                    if (vm.error.DuToan) {
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
                if (fromId == ('txtKetQua' + index)) {
                    if ($("#txtKetQua" + (index + 1)).length == 0) {
                        CreateListChiTiet();
                        var fc = function () {
                            $("#txtTenBoPhan" + (parseInt(index) + 1).toString()).focus();
                        }
                        $timeout(fc, 6);
                    }
                    else {
                        $("#txtTenBoPhan" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else $("#" + ToId).focus();
            }
            
        }


        vm.action.getDataTaiSan = function (data) {
            console.log(data);

            vm.data.phieuBaoDuong.TaiSanId = data.TaiSanId;
            vm.data.phieuBaoDuong.MaTaiSan = data.MaTaiSan;
            vm.data.phieuBaoDuong.PhongBanId = data.PhongBanId;
            vm.data.phieuBaoDuong.TenPhongBan = data.TenPhongBan;
            vm.data.phieuBaoDuong.NhanVienId = data.NhanVienId;
            vm.data.phieuBaoDuong.TenNhanVien = data.TenNhanVien;
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
            chitiet.SuaChuaId = 0;
            chitiet.BaoDuongId = 0;
            chitiet.TenBoPhan = "";
            chitiet.NgayBatDau = moment().format('DD/MM/YYYY');
            chitiet.NgayKetThuc = moment().format('DD/MM/YYYY');;
            chitiet.ChiPhi = 0;
            chitiet.NoiDung = "";
            chitiet.NoiSua = "";
            chitiet.KetQua = "";
            vm.data.listChiTiet.push(chitiet);
            $timeout(function () {
                jQuery("#txtNgayBatDau" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
                jQuery("#txtNgayKetThuc" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
            }, 100);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuBaoDuong.CoSoId = userInfo.CoSoId;

            var phieuBaoDuong = utility.clone(vm.data.phieuBaoDuong);
            var data = {};
            data.phieuBaoDuong = angular.toJson(phieuBaoDuong);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            BaoDuongService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");
                   
                    $timeout(function () {
                        window.location = vm.data.linkUrl + 'BaoDuong/edit/' + result.data.data[0].BaoDuongIdI;
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
            vm.data.phieuBaoDuong.CoSoId = userInfo.CoSoId;

            var phieuBaoDuong = utility.clone(vm.data.phieuBaoDuong);
            var data = {};
            data.baoDuongId = phieuBaoDuongId;
            data.phieuBaoDuong = angular.toJson(phieuBaoDuong);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            BaoDuongService.update(data)
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

        function InvalidateDataPhieuBaoDuong() {
            var obj = vm.data.phieuBaoDuong;

            vm.error.TaiSanId = utility.checkInValid(obj.TaiSanId, 'isEmpty');
            if (vm.error.TaiSanId) {
                $("#cbxTaiSan").find('input').focus();
                return null;
            }

            vm.error.MaTaiSan = utility.checkInValid(obj.MaTaiSan, 'isEmpty');
            if (vm.error.MaTaiSan) {
                $("#txtMaTaiSan").focus();
                return null;
            }
            vm.error.NgayBaoDuong = utility.checkInValid(obj.NgayBaoDuong, 'isEmpty');
            if (vm.error.NgayBaoDuong) {
                $("#txtNgayBaoDuong").focus();
                return null;
            }
            vm.error.NgayDuKien = utility.checkInValid(obj.NgayDuKien, 'isEmpty');
            if (vm.error.NgayDuKien) {
                $("#txtNgayDuKien").focus();
                return null;
            }
            vm.error.DuToan = utility.checkInValid(obj.DuToan, 'isEmpty');
            if (vm.error.DuToan) {
                $("#txtDuToan").focus();
                return null;
            }
            vm.error.LoaiBaoDuongId = utility.checkInValid(obj.LoaiBaoDuongId, 'isEmpty');
            if (vm.error.LoaiBaoDuongId) {
                $("#cbxLoaiBaoDuong").focus();
                return null;
            }


            return 1;
        }

        function InvalidateDataPhieuBaoDuongChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết!');
                return true;
            }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].TenBoPhan, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NgayBatDau, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].NgayKetThuc, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].ChiPhi, 'isEmpty')) {
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

        function getphieuBaoDuongById(id) {

            BaoDuongService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuBaoDuong;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuBaoDuong = result.data.data[0];

                        getphieuBaoDuongChiTietById(vm.data.phieuBaoDuong.BaoDuongId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuBaoDuongChiTietById(id) {

            BaoDuongService.GetPageDetail(id)
                .then(function success(result) {
                    console.log(result);
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.listChiTiet = result.data.data;
                        $timeout(function () {
                            jQuery("#txtNgayBatDau" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                            jQuery("#txtNgayKetThuc" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                        }, 100);
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
            vm.data.phieuBaoDuong = {};
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