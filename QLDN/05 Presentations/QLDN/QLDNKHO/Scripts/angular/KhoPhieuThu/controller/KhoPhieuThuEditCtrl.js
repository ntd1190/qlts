(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoPhieuThuEditCtrl', KhoPhieuThuEditCtrl)
        .directive("keyboard", keyboard);        //HOT-KEY

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

                        // Invoke the handler and digest
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY
    function KhoPhieuThuEditCtrl($rootScope, $scope, KhoPhieuThuService, utility, $window, $filter, Upload) {
        var controllerId = 'KhoPhieuThuEditCtrl';
        var KhoPhieuThuId = 0;
        var vm = this;
        vm.KhoPhieuThuId = function () {
            return KhoPhieuThuId || 0;
        }
        vm.data = {
            objKhoPhieuThu: {
                HinhThucThanhToan: 'Y',
            },
            error: {},
            listQuyenTacVu: [],
            listKhachHang: [],
            listNguoiNop: [],
            listTaiKhoanCo: [],
            listTaiKhoanNo: [],
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
        };
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                if ($rootScope.isOpenPopup) {
                    $('#popupThongTinKhoPhieuThu').collapse("hide");
                    $rootScope.isOpenPopup = false;
                    closeEdit();
                }
            },
            F8: function (name, code) {
                if ($rootScope.isOpenPopup) {
                    save();
                }
            }
        };
        //HOT-KEY
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidNgay: false,
            isInValidDonVi: false,
            isInValidLyDo: false,
            isInValidSoTien: false,
            isInValidSoPhieu: false
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListKhachHang: clearListKhachHang,
            ClearlistNguoiNop: ClearlistNguoiNop,
            ClearlistTaiKhoanCo: ClearlistTaiKhoanCo,
            ClearlistTaiKhoanNo: ClearlistTaiKhoanNo,
            getSoPhieu: getSoPhieu,
            In: In
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinKhoPhieuThu').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinKhoPhieuThu').on('shown.bs.collapse', function () {
                $("#txtSoPhieu").focus();
                $rootScope.isOpenPopup = true;
            });
            initEventListener();
        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                setEnableButton();
            }
        }
        function getSoPhieu() {

            vm.status.isLoading = true;
            var data = {};
            data.loaiPhieu = 'PhieuThu';
            data.loginId = vm.data.UserLoginId;

            KhoPhieuThuService.getSoPhieuAuto(data)
                    .then(function success(result) {
                        vm.status.isLoading = false;
                        vm.data.objKhoPhieuThu.SoPhieu = result.data.data.SoPhieu;
                    }, function error(result) {
                        console.log(result);
                        vm.status.isLoading = false;
                    });

        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KhoPhieuThuId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoPhieuThuId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('KhoPhieuThuListCtrl.action.xemKhoPhieuThu', function (event, data) {
                KhoPhieuThuId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });
            $scope.$on(controllerId + '.data.listNguoiNop', function (event, data) {
                vm.data.listNguoiNop = data;
            });
            $scope.$on(controllerId + '.data.listTaiKhoanCo', function (event, data) {
                vm.data.listTaiKhoanCo = data;
            });
            $scope.$on(controllerId + '.data.listTaiKhoanNo', function (event, data) {
                vm.data.listTaiKhoanNo = data;
            });

        }
        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }
        function ClearlistNguoiNop() {
            utility.clearArray(vm.data.listNguoiNop);
        }
        function ClearlistTaiKhoanCo() {
            utility.clearArray(vm.data.listTaiKhoanCo);
        }
        function ClearlistTaiKhoanNo() {
            utility.clearArray(vm.data.listTaiKhoanNo);
        }
        function In() {
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuThu&data=' + vm.data.objKhoPhieuThu.PhieuThuId);
            $('#reportmodal').modal('show');
        };
        function refresh() {
            setEnableButton();
            $('input[type="file"]').val('');
            if (KhoPhieuThuId > 0) {
                KhoPhieuThuService.getById(KhoPhieuThuId).then(function (result) {
                    if (result.data.data.length > 0) {
                        vm.data.listKhachHang = [];
                        vm.data.listNguoiNop = [];
                        vm.data.listTaiKhoanCo = [];
                        vm.data.listTaiKhoanNo = [];
                        if (result.data.data[0].KhachHangId) vm.data.listKhachHang.push({ KhachHangId: result.data.data[0].KhachHangId, TEN: result.data.data[0].KhachHang });
                        if (result.data.data[0].NguoiNopTien) vm.data.listNguoiNop.push({ NhanVienId: result.data.data[0].NguoiNopTien, Ho: result.data.data[0].Ho, Ten: result.data.data[0].Ten });
                        if (result.data.data[0].TaiKhoanCo) vm.data.listTaiKhoanCo.push({ TaiKhoanId: result.data.data[0].TaiKhoanCo, TenTaiKhoan: result.data.data[0].TenTaiKhoanCo });
                        if (result.data.data[0].TaiKhoanNo) vm.data.listTaiKhoanNo.push({ TaiKhoanId: result.data.data[0].TaiKhoanNo, TenTaiKhoan: result.data.data[0].TenTaiKhoanNo });
                        vm.data.objKhoPhieuThu = result.data.data[0];
                        vm.data.objKhoPhieuThu.NgayThu = utility.convertDateFormat(vm.data.objKhoPhieuThu.NgayThu, 'YYYY-MM-DD', 'DD/MM/YYYY')
                        $('#popupThongTinKhoPhieuThu').collapse('show');

                    }
                    else $rootScope.$broadcast('KhoPhieuThuListCtrl.action.refresh');
                })
            } else {
                vm.status.isInValidNgay = false;
                vm.status.isInValidDonVi = false;
                vm.status.isInValidLyDo = false;
                vm.status.isInValidSoPhieu = false;
                vm.status.isInValidSoTien = false;
                vm.data.objKhoPhieuThu = {
                    HinhThucThanhToan: 'Y',
                };
            }
        }
        function insert() {
            vm.status.isInValidSoPhieu = utility.checkInValid(vm.data.objKhoPhieuThu.SoPhieu, 'isEmpty');
            if (vm.status.isInValidSoPhieu) {
                return;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoPhieuThu.NgayThu, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById('txtNgay').focus();
                return;
            }
            vm.status.isInValidDonVi = utility.checkInValid(vm.data.listKhachHang.length > 0 ? vm.data.listKhachHang[0].KhachHangId : '', 'isEmpty');
            if (vm.status.isInValidDonVi) {
                $window.document.getElementById('popKhachHang').focus();
                return;
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhoPhieuThu.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById('txtLyDo').focus();
                return;
            }
            vm.status.isInValidSoTien = utility.checkInValid(vm.data.objKhoPhieuThu.SoTien, 'isEmpty');
            if (vm.status.isInValidSoTien) {
                $window.document.getElementById('txtSoTien').focus();
                return;
            }
            vm.data.objKhoPhieuThu.NgayThu = utility.convertDateFormat(vm.data.objKhoPhieuThu.NgayThu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objKhoPhieuThu.NguoiTao = vm.data.UserLoginId;
            if (vm.data.listKhachHang.length > 0) vm.data.objKhoPhieuThu.KhachHangId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            if (vm.data.listNguoiNop.length > 0) vm.data.objKhoPhieuThu.NguoiNopTien = joinStr(vm.data.listNguoiNop, 'NhanVienId');
            if (vm.data.listTaiKhoanCo.length > 0) vm.data.objKhoPhieuThu.TaiKhoanCo = joinStr(vm.data.listTaiKhoanCo, 'TaiKhoanId');
            if (vm.data.listTaiKhoanNo.length > 0) vm.data.objKhoPhieuThu.TaiKhoanNo = joinStr(vm.data.listTaiKhoanNo, 'TaiKhoanId');
            KhoPhieuThuService.insert(vm.data.objKhoPhieuThu).then(function (success) {
                if (success.data.result) {
                    KhoPhieuThuId = success.data.KhoPhieuThuId;
                }
                // 20170718 binhnt thêm upload
                upload().then(function () {
                    vm.status.isLoading = false;
                    $rootScope.isOpenPopup = false;
                    closeEdit();
                    $rootScope.$broadcast('KhoPhieuThuListCtrl.action.refresh');
                }, function () {
                    alert('Không thể upload file');
                });
            }, function (error) {
                console.log(error)
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }
        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join('|');
            result = result || '';

            return result;
        }
        function update() {
            vm.status.isInValidSoPhieu = utility.checkInValid(vm.data.objKhoPhieuThu.SoPhieu, 'isEmpty');
            if (vm.status.isInValidSoPhieu) {
                return;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoPhieuThu.NgayThu, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById('txtNgay').focus();
                return;
            }
            vm.status.isInValidDonVi = utility.checkInValid(vm.data.listKhachHang.length > 0 ? vm.data.listKhachHang[0].KhachHangId : '', 'isEmpty');
            if (vm.status.isInValidDonVi) {
                $window.document.getElementById('popKhachHang').focus();
                return;
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhoPhieuThu.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById('txtLyDo').focus();
                return;
            }
            vm.status.isInValidSoTien = utility.checkInValid(vm.data.objKhoPhieuThu.SoTien, 'isEmpty');
            if (vm.status.isInValidSoTien) {
                $window.document.getElementById('txtSoTien').focus();
                return;
            }
            vm.data.objKhoPhieuThu.NguoiTao = vm.data.UserLoginId;
            vm.data.objKhoPhieuThu.NgayThu = utility.convertDateFormat(vm.data.objKhoPhieuThu.NgayThu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            if (vm.data.listKhachHang.length > 0) vm.data.objKhoPhieuThu.KhachHangId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            if (vm.data.listNguoiNop.length > 0) vm.data.objKhoPhieuThu.NguoiNopTien = joinStr(vm.data.listNguoiNop, 'NhanVienId');
            if (vm.data.listTaiKhoanCo.length > 0) vm.data.objKhoPhieuThu.TaiKhoanCo = joinStr(vm.data.listTaiKhoanCo, 'TaiKhoanId');
            if (vm.data.listTaiKhoanNo.length > 0) vm.data.objKhoPhieuThu.TaiKhoanNo = joinStr(vm.data.listTaiKhoanNo, 'TaiKhoanId');
            KhoPhieuThuService.update(vm.data.objKhoPhieuThu).then(function (success) {

                // 20170718 binhnt thêm upload
                upload().then(function () {
                    closeEdit();
                    $rootScope.isOpenPopup = false;
                    vm.status.isLoading = true;

                    $rootScope.$broadcast('KhoPhieuThuListCtrl.action.refresh');
                }, function () {
                    alert('Không thể upload file');
                });

            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                if (fromId == 'txtNgay') {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoPhieuThu.NgayThu, 'isEmpty');
                    if (!vm.status.isInValidNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtLyDo') {
                    vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhoPhieuThu.LyDo, 'isEmpty');
                    if (!vm.status.isInValidLyDo) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtSoTien') {
                    vm.status.isInValidSoTien = utility.checkInValid(vm.data.objKhoPhieuThu.SoTien, 'isEmpty');
                    if (!vm.status.isInValidSoTien) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }
        function resetEdit(id) {
            vm.status.isInValidNgay = false;
            vm.status.isInValidDonVi = false;
            vm.status.isInValidLyDo = false;
            vm.status.isInValidSoTien = false;
            vm.status.isInValidSoPhieu = false;
            refresh();
        };
        function closeEdit() {
            vm.data.listKhachHang = [];
            vm.data.listNguoiNop = [];
            vm.data.listTaiKhoanCo = [];
            vm.data.listTaiKhoanNo = [];
            vm.status.isInValidNgay = false;
            vm.status.isInValidDonVi = false;
            vm.status.isInValidSoPhieu = false;
            vm.status.isInValidLyDo = false;
            vm.status.isInValidSoTien = false;
            vm.data.objKhoPhieuThu = {
                HinhThucThanhToan: 'Y',
            };
            KhoPhieuThuId = 0;
            $('input[type="file"]').val('');
            $('#popupThongTinKhoPhieuThu').collapse('hide');
        }
        function save() {

            // 20170718 binhnt upload file
            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.objKhoPhieuThu.Hinh) {
                    vm.data.objKhoPhieuThu.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.objKhoPhieuThu.Hinh = vm.data.objKhoPhieuThu.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }

            if (KhoPhieuThuId > 0) {
                update();
            } else {
                insert();
            }
        }

        // 20170718 binhnt upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.objKhoPhieuThu.Hinh);
                console.log(vm.data.file);

                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.objKhoPhieuThu.Hinh).then(function success(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    vm.data.hinh = result.data.data;
                    $('input[type="file"]').val('');
                    resolve();
                }, function error(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    reject('Upload.filesUpload');
                });
            });
        };
    }
})();
