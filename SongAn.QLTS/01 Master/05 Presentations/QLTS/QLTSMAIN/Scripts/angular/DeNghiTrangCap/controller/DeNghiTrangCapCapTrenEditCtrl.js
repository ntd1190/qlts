
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('DeNghiTrangCapCapTrenEditCtrl', function ($rootScope, $scope, DenNghiTrangCapService, utility, $timeout) {
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
        var phieuDeNghiId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'DeNghiTrangCapCapTrenEditCtrl';
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
                if (config.deNghiId) {
                    vm.data.phieuDeNghi.Ngay = moment().format('DD/MM/YYYY');
                    getPhieuDeNghiById(config.deNghiId);
                }
            }

            initEventListener();

            $("#txtNgayLap").focus();
        };

        /* ACTION FUNCTION */

        vm.action = {};

        vm.action.goBack = function () {
            window.history.back();
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
   
                insert();
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
            vm.data.phieuDeNghi.GuiCapTren = 1;
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
                    utility.checkInValid(vm.data.listChiTiet[index].DuToan, 'isEmpty') ||
                    utility.checkInValid(vm.data.listChiTiet[index].DuToanDuocDuyet, 'isEmpty')) {
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

            DenNghiTrangCapService.GetPageTongHopById(id)
                .then(function success(result) {
                    console.log(result);
                    vm.data.listChiTiet = result.data.data;
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