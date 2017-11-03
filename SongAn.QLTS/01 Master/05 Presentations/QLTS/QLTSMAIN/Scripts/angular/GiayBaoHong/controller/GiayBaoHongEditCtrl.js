
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('GiayBaoHongEditCtrl', function ($rootScope, $scope, GiayBaoHongService, TaiSanService, utility, $timeout, $q, KhoaSoLieuService) {
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
        var phieuGiayBaoHongId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'GiayBaoHongEditCtrl';
        vm.getphieuGiayBaoHongId = function () {
            return phieuGiayBaoHongId || 0;
        }

        vm.error = {};

        vm.data = {};
        vm.data.phieuGiayBaoHong = {};
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

            if (config && config.giayBaoHongId) {
                phieuGiayBaoHongId = config.giayBaoHongId;
                if (config.giayBaoHongId > 0) {
                    getphieuGiayBaoHongById(config.giayBaoHongId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.giayBaoHongId === 0) {
                vm.data.phieuGiayBaoHong.Ngay = moment().format('DD/MM/YYYY');
                vm.data.phieuGiayBaoHong.PhongBanId = $("#cbxPhongBan option:first").val();
                CreateListChiTiet();
            }

            initEventListener();
            $("#txtNgay").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptGiayBaoHongById&data=' + phieuGiayBaoHongId);
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

            var obj = InvalidateDataPhieuGiayBaoHong();

            if (obj == null)
                return;

            if (InvalidateDataPhieuGiayBaoHongChiTiet())
                return;
            checkKhoaSoLieuNam().then(function (success) {
                if (phieuGiayBaoHongId > 0) {
                    update();
                }
                else {
                    insert();
                }
            }, function (error) {
                utility.AlertError('Số liêu năm ' + vm.data.phieuGiayBaoHong.Ngay.substring(6, 12) + ' đã bị khóa. Vui lòng kiểm tra lại !');
            });
           
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

        vm.action.removePhieuGiayBaoHong = function () {

            if (phieuGiayBaoHongId <= 0) {
                utility.AlertError('Phiếu này không tồn tại trong hệ thống!');
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var GiayBaoHongListSelected = new Array();

            GiayBaoHongListSelected.push(phieuGiayBaoHongId);

            var ids = GiayBaoHongListSelected.join(',');
            if (ids.length > 0) {
                checkKhoaSoLieuNam().then(function (success) {
                    GiayBaoHongService.DeleteList(ids).then(function (success) {
                        utility.AlertSuccess('Xóa thành công!');
                        window.location.href = vm.data.linkUrl + 'GiayBaoHong/list';
                    }, function (error) {
                        alert(error.data.error.code + " : " + error.data.error.message);
                    });
                }, function (error) {
                    utility.AlertError('Số liêu năm ' + vm.data.phieuGiayBaoHong.Ngay.substring(6, 12) + ' đã bị khóa. Vui lòng kiểm tra lại !');
                });
               

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }
        };

        vm.action.keyPressGiayBaoHong = function (value, fromId, ToId, event) {
            var obj = vm.data.phieuGiayBaoHong;

            if (event.keyCode == '13') {
                if (fromId == 'txtNgay') {
                    vm.error.Ngay = utility.checkInValid(obj.Ngay, 'isEmpty');
                    if (vm.error.Ngay) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId + " input").focus();
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
            vm.data.listChiTiet[index.$index].SoLuongTon = data.SoLuongTon;
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
            chitiet.GiayBaoHongChiTietId = 0;
            chitiet.GiayBaoHongId = 0;
            chitiet.TaiSanId = 0;
            chitiet.PhongBanId = 0;
            chitiet.NhanVienId = 0;
            chitiet.SoLuong = 0;
            chitiet.LyDo = "";
            chitiet.GhiChu = "";
            vm.data.listChiTiet.push(chitiet);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuGiayBaoHong.CoSoId = userInfo.CoSoId;

            var phieuGiayBaoHong = utility.clone(vm.data.phieuGiayBaoHong);
            var data = {};
            data.phieuGiayBaoHong = angular.toJson(phieuGiayBaoHong);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            GiayBaoHongService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");

                    $timeout(function () {
                        window.location = vm.data.linkUrl + 'GiayBaoHong/edit/' + result.data.data[0].GiayBaoHongIdI;
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
            vm.data.phieuGiayBaoHong.CoSoId = userInfo.CoSoId;

            var phieuGiayBaoHong = utility.clone(vm.data.phieuGiayBaoHong);
            var data = {};
            data.giayBaoHongId = phieuGiayBaoHongId;
            data.phieuGiayBaoHong = angular.toJson(phieuGiayBaoHong);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            //return;
            GiayBaoHongService.update(data)
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

        function InvalidateDataPhieuGiayBaoHong() {
            var obj = vm.data.phieuGiayBaoHong;

            vm.error.Ngay = utility.checkInValid(obj.Ngay, 'isEmpty');
            if (vm.error.Ngay) {
                $("#txtNgay").focus();
                return null;
            }
            
            vm.error.SoChungTu = utility.checkInValid(obj.SoChungTu, 'isEmpty');
            if (vm.error.SoChungTu) {
                $("#txtSoChungTu").focus();
                return null;
            }

            vm.error.PhongBanId = utility.checkInValid(obj.PhongBanId, 'isEmpty');
            if (vm.error.PhongBanId) {
                $("#cbxPhongBan").focus();
                return null;
            }

            return 1;
        }

        function InvalidateDataPhieuGiayBaoHongChiTiet() {
            var hasError = false;
            var obj = vm.data.phieuGiayBaoHong;

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
                else if (obj.PhongBanId.toString() != vm.data.listChiTiet[index].PhongBanId.toString()) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Vui lòng chọn lại tài sản đúng bộ phận!');
                    return hasError;
                }
                else if (checkNumber(vm.data.listChiTiet[index].SoLuong)) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Số lượng tài sản không hợp lệ!');
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

        function getphieuGiayBaoHongById(id) {

            GiayBaoHongService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuGiayBaoHong;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuGiayBaoHong = result.data.data[0];

                        getphieuGiayBaoHongChiTietById(vm.data.phieuGiayBaoHong.GiayBaoHongId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getphieuGiayBaoHongChiTietById(id) {

            GiayBaoHongService.GetPageDetail(id)
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

            TaiSanService.getComboboxGiayBaoHong(CoSoId, NhanVienId, "")
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
            vm.data.phieuGiayBaoHong = {};
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
        function checkKhoaSoLieuNam() {
            var deferred = $q.defer();
            var Nam = vm.data.phieuGiayBaoHong.Ngay.substring(6, 12);
            KhoaSoLieuService.CheckKhoaSoLieu(Nam, userInfo.CoSoId).then(function (success) {
                console.log(success);
                if (success.data.data[0].TrangThai == 1) {
                    return deferred.reject(success);
                } else {
                    return deferred.resolve(success);
                }
            }, function (error) {
                console.log(error);
                if (error.status === 400) {
                    utility.AlertError(error.data.error.message);
                } else {
                    utility.AlertError('Lỗi !');
                }
            });
            return deferred.promise;
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