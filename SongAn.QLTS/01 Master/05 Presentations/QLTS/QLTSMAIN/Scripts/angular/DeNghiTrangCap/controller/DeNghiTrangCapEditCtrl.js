
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('DeNghiTrangCapEditCtrl', function ($rootScope, $scope, DenNghiTrangCapService, utility, $timeout, KhoaSoLieuService, $q) {
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
            },
            DELETE: function (name, code) {
                var fc = function () {
                    vm.data.listChiTiet.splice(vm.data.listChiTiet.length - 1, 1);
                    $("#txtTenTaiSan" + (vm.data.listChiTiet.length - 1).toString()).focus();
                }
                $timeout(fc, 6);
            }
        };
        //end HOT-KEY

        var _tableState;
        var userInfo;
        var linkUrl = '';
        var phieuDeNghiId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'DeNghiTrangCapEditCtrl';
        vm.getphieuDeNghiId = function () {
            return phieuDeNghiId || 0;
        }

        vm.error = {};
       
        vm.data = {};
        vm.data.phieuDeNghi = {};
        vm.data.listChiTiet = [];
        vm.data.fullDateString = '';
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.showButtonSave = false;
        vm.data.showButtonXoa = false;
        vm.data.showButtonNew = false;
        vm.data.showButtonDuyet = false;
        vm.data.Tilte = 'Thêm';
        vm.data.phieuDeNghi.DuyetId = 0;
        vm.data.phieuDeNghi.DenghiId = 0;
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

            if (config && config.deNghiId) {
                phieuDeNghiId = config.deNghiId;
                if (config.deNghiId > 0) {
                    getPhieuDeNghiById(config.deNghiId);
                    vm.data.Tilte = 'Sửa';
                }
            }
            else if (config && config.deNghiId === 0) {
                vm.data.phieuDeNghi.Ngay = moment().format('DD/MM/YYYY');
                vm.data.phieuDeNghi.PhanLoaiId = $("#cbxPhanLoai option:first").val();
                vm.data.phieuDeNghi.PhongBanId = $("#cbxPhongBan option:first").val();
                CreateListChiTiet();
            }

            initEventListener();

            $("#txtNgayLap").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
        };
        vm.action.GuiCapTren = function () {
            vm.data.phieuDeNghi.GuiCapTren = 1;
            utility.addloadding($('body'));
            vm.data.phieuDeNghi.CoSoId = userInfo.CoSoId;

            var phieuDeNghi = utility.clone(vm.data.phieuDeNghi);
            var data = {};
            data.deNghiId = phieuDeNghiId;
            data.phieuDeNghi = angular.toJson(phieuDeNghi);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            DenNghiTrangCapService.update(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Gửi thành công");
                }, function error(result) {
                    console.log(result);
                    utility.removeloadding();
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        utility.AlertError('Không thể cập nhật');
                    }
                });
        };

        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptDeNghiTrangCapById&data=' + phieuDeNghiId);
            $('#reportmodal').modal('show');
        };

        vm.action.add = function () {
            CreateListChiTiet();
        };

        vm.action.save = function () {

            var obj = InvalidateDataPhieuDeNghi();

            if (obj == null)
                return;
            if (!InvalidateDataPhieuDeNghiChiTiet())
                return;
            checkKhoaSoLieuNam().then(function (success) {

                if (phieuDeNghiId > 0) {
                    update();
                }
                else {
                    insert();
                }
            }, function (error) {
                utility.AlertError('Số liêu năm ' + vm.data.phieuDeNghi.Ngay.substring(6, 12) + ' đã bị khóa. Vui lòng kiểm tra lại !');
            });
        };

        vm.action.removePhieuDeNghi = function () {

            if (phieuDeNghiId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }
            checkKhoaSoLieuNam().then(function (success) {

                var DeNghiTrangCapListSelected = new Array();

                DeNghiTrangCapListSelected.push(phieuDeNghiId);

                var ids = DeNghiTrangCapListSelected.join(',');
                if (ids.length > 0) {
                    DenNghiTrangCapService.DeleteList(ids).then(function (success) {
                        utility.AlertSuccess('Xóa thành công!');
                        window.location.href = vm.data.linkUrl + 'denghitrangcap/list';
                    }, function (error) {
                        alert(error.data.error.code + " : " + error.data.error.message);
                    });

                } else {
                    utility.AlertError('Không tìm thấy phiếu để xóa!');
                }
            }, function (error) {
                utility.AlertError('Số liêu năm ' + vm.data.phieuDeNghi.Ngay.substring(6, 12) + ' đã bị khóa. Vui lòng kiểm tra lại !');
            });
        };
        vm.action.keyPressDeNghi = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuDeNghi;
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgayLap') {
                    vm.error.NgayLap = utility.checkInValid(obj.Ngay, 'isEmpty');
                    if (vm.error.NgayLap) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtSoPhieu') {
                    vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
                    if (vm.error.SoPhieu) {
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
                //set condition of has-error
                if (fromId == ('txtGhiChu' + index)) {
                    if ($("#txtGhiChu" + (index + 1)).length == 0) {
                        CreateListChiTiet();
                    }
                    else {
                        $("#txtTenTaiSan" + (parseInt(index) + 1).toString()).focus();
                    }
                }
                else {
                    if(fromId.indexOf('txtMoTa') >= 0){
                        $("#" + ToId).find('input').focus();
                    } else
                        $("#" + ToId).focus();
                }
            }
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
                // Co quyen duyet
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonDuyet = true;
                }

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
            chitiet.PhieuDeNghiChiTiet = 0;
            chitiet.DeNghiId = 0;
            chitiet.TenTaiSan = "";
            chitiet.Mota = "";
            chitiet.LoaiId = 0;
            chitiet.SoLuong = 0;
            chitiet.DonViTinh = "";
            chitiet.PhuongThucId = 0;
            chitiet.NgayDeNghi = moment().format('DD/MM/YYYY');
            chitiet.DuToan = 0;
            chitiet.DuToanDuocDuyet = 0;
            chitiet.GhiChu = "";
            vm.data.listChiTiet.push(chitiet);
            $timeout(function () {
                document.getElementById("txtTenTaiSan" + (vm.data.listChiTiet.length - 1)).focus();
            }, 100);
        }

        function insert() {
            utility.addloadding($('body'));
            vm.data.phieuDeNghi.CoSoId = userInfo.CoSoId;

            var phieuDeNghi = utility.clone(vm.data.phieuDeNghi);
            var data = {};
            data.phieuDeNghi = angular.toJson(phieuDeNghi);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            DenNghiTrangCapService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");
                    $timeout(function () {
                        window.location = vm.data.linkUrl + 'denghitrangcap/edit/' + result.data.data[0].DeNghiIdI;
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
            vm.data.phieuDeNghi.CoSoId = userInfo.CoSoId;

            var phieuDeNghi = utility.clone(vm.data.phieuDeNghi);
            var data = {};
            data.deNghiId = phieuDeNghiId;
            data.phieuDeNghi = angular.toJson(phieuDeNghi);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            DenNghiTrangCapService.update(data)
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

        function InvalidateDataPhieuDeNghi() {
            var obj = vm.data.phieuDeNghi;

            vm.error.NgayLap = utility.checkInValid(obj.Ngay, 'isEmpty');
            if (vm.error.NgayLap) {
                $("#txtNgayLap").focus();
                return null;
            }

            vm.error.SoPhieu = utility.checkInValid(obj.SoPhieu, 'isEmpty');
            if (vm.error.SoPhieu) {
                $("#txtSoPhieu").focus();
                return null;
            }

            vm.error.BoPhanId = utility.checkInValid(obj.PhongBanId, 'isEmpty');
            if (vm.error.BoPhanId) {
                $("#cbxPhongBan").focus();
                return null;
            }

            vm.error.NoiDung = utility.checkInValid(obj.NoiDung, 'isEmpty');
            if (vm.error.NoiDung) {
                $("#txtNoiDung").focus();
                return null;
            }
            return 1;
        }

        function InvalidateDataPhieuDeNghiChiTiet() {
            var hasError = false;
            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) { return true; }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].TenTaiSan, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].LoaiId, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].SoLuong, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].DonViTinh, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].PhuongThucId, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].NgayDeNghi, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].DuToan, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                }
                else {
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return !hasError;
        }

        function getPhieuDeNghiById(id) {

            DenNghiTrangCapService.GetPageHeaderById(id)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuDeNghi;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuDeNghi = result.data.data[0];

                        getPhieuDeNghiChiTietById(vm.data.phieuDeNghi.DeNghiId);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }

        function getPhieuDeNghiChiTietById(id) {

            DenNghiTrangCapService.GetPageDetail(id)
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
            vm.data.phieuDeNghi = {};
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
        function checkKhoaSoLieuNam() {
            debugger
            var deferred = $q.defer();
            var Nam = vm.data.phieuDeNghi.Ngay.substring(6, 12);
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