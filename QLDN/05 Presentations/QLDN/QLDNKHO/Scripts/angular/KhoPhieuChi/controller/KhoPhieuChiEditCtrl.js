(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoPhieuChiEditCtrl', KhoPhieuChiEditCtrl)
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
    function KhoPhieuChiEditCtrl($rootScope, $scope, KhoPhieuChiService, utility, $window, $filter, Upload) {
        var controllerId = 'KhoPhieuChiEditCtrl';
        var KhoPhieuChiId = 0;
        var vm = this;
        vm.KhoPhieuChiId = function () {
            return KhoPhieuChiId || 0;
        }
        vm.data = {
            objKhoPhieuChi: {
                HinhThucThanhToan: 'Y',
            },
            error: {},
            listQuyenTacVu: [],
            listKhachHang: [],
            listNguoiNhan: [],
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
                    $('#popupThongTinKhoPhieuChi').collapse("hide");
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
            isInValidSoPhieu : false
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListKhachHang: clearListKhachHang,
            ClearlistNguoiNhan: ClearlistNguoiNhan,
            ClearlistTaiKhoanCo: ClearlistTaiKhoanCo,
            ClearlistTaiKhoanNo: ClearlistTaiKhoanNo,
            getSoPhieu: getSoPhieu,
            In:In,
        };
       
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinKhoPhieuChi').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinKhoPhieuChi').on('shown.bs.collapse', function () {
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
            getSoPhieuAuto();
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KhoPhieuChiId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoPhieuChiId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('KhoPhieuChiListCtrl.action.xemKhoPhieuChi', function (event, data) {
                KhoPhieuChiId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });
            $scope.$on(controllerId + '.data.listNguoiNhan', function (event, data) {
                vm.data.listNguoiNhan = data;
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
        function ClearlistNguoiNhan() {
            utility.clearArray(vm.data.listNguoiNhan);
        }
        function ClearlistTaiKhoanCo() {
            utility.clearArray(vm.data.listTaiKhoanCo);
        }
        function ClearlistTaiKhoanNo() {
            utility.clearArray(vm.data.listTaiKhoanNo);
        }
        function In() {
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuChi&data=' + vm.data.objKhoPhieuChi.PhieuChiId);
            $('#reportmodal').modal('show');
        };
        function refresh() {
            setEnableButton();
            if (KhoPhieuChiId > 0) {
                KhoPhieuChiService.getById(KhoPhieuChiId).then(function (result) {
                    if (result.data.data.length > 0) {
                        vm.data.listKhachHang = [];
                        vm.data.listNguoiNhan = [];
                        vm.data.listTaiKhoanCo = [];
                        vm.data.listTaiKhoanNo = [];
                        if (result.data.data[0].KhachHangId) vm.data.listKhachHang.push({ KhachHangId: result.data.data[0].KhachHangId, TEN: result.data.data[0].KhachHang });
                        if (result.data.data[0].NguoiNhanTien) vm.data.listNguoiNhan.push({ NhanVienId: result.data.data[0].NguoiNhanTien, Ho: result.data.data[0].Ho, Ten: result.data.data[0].Ten });
                        if (result.data.data[0].TaiKhoanCo) vm.data.listTaiKhoanCo.push({ TaiKhoanId: result.data.data[0].TaiKhoanCo, TenTaiKhoan: result.data.data[0].TenTaiKhoanCo });
                        if (result.data.data[0].TaiKhoanNo) vm.data.listTaiKhoanNo.push({ TaiKhoanId: result.data.data[0].TaiKhoanNo, TenTaiKhoan: result.data.data[0].TenTaiKhoanNo });
                        vm.data.objKhoPhieuChi = result.data.data[0];
                        vm.data.objKhoPhieuChi.NgayChi = utility.convertDateFormat(vm.data.objKhoPhieuChi.NgayChi, 'YYYY-MM-DD', 'DD/MM/YYYY')
                        $('#popupThongTinKhoPhieuChi').collapse('show');

                    }
                    else $rootScope.$broadcast('KhoPhieuChiListCtrl.action.refresh');
                })
            } else {
                vm.status.isInValidNgay = false;
                vm.status.isInValidDonVi = false;
                vm.status.isInValidLyDo = false;
                vm.status.isInValidSoTien = false;
                vm.status.isInValidSoPhieu = false;
                
                vm.data.objKhoPhieuChi = {
                    HinhThucThanhToan: 'Y',
                };
            }
        }
        function insert() {
            vm.status.isInValidSoPhieu = utility.checkInValid(vm.data.objKhoPhieuChi.SoPhieu, 'isEmpty');
            if (vm.status.isInValidSoPhieu) {
                return;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoPhieuChi.NgayChi, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById('txtNgay').focus();
                return;
            }
            vm.status.isInValidDonVi = utility.checkInValid(vm.data.listKhachHang.length > 0 ? vm.data.listKhachHang[0].KhachHangId : '', 'isEmpty');
            if (vm.status.isInValidDonVi) {
                $window.document.getElementById('popKhachHang').focus();
                return;
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhoPhieuChi.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById('txtLyDo').focus();
                return;
            }
            vm.status.isInValidSoTien = utility.checkInValid(vm.data.objKhoPhieuChi.SoTien, 'isEmpty');
            if (vm.status.isInValidSoTien) {
                $window.document.getElementById('txtSoTien').focus();
                return;
            }
            vm.data.objKhoPhieuChi.NgayChi = utility.convertDateFormat(vm.data.objKhoPhieuChi.NgayChi, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objKhoPhieuChi.NguoiTao = vm.data.UserLoginId;
            if (vm.data.listKhachHang.length > 0) vm.data.objKhoPhieuChi.KhachHangId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            if (vm.data.listNguoiNhan.length > 0) vm.data.objKhoPhieuChi.NguoiNhanTien = joinStr(vm.data.listNguoiNhan, 'NhanVienId');
            if (vm.data.listTaiKhoanCo.length > 0) vm.data.objKhoPhieuChi.TaiKhoanCo = joinStr(vm.data.listTaiKhoanCo, 'TaiKhoanId');
            if (vm.data.listTaiKhoanNo.length > 0) vm.data.objKhoPhieuChi.TaiKhoanNo = joinStr(vm.data.listTaiKhoanNo, 'TaiKhoanId');
            KhoPhieuChiService.insert(vm.data.objKhoPhieuChi).then(function (success) {
                if (success.data.result) {
                    KhoPhieuChiId = success.data.KhoPhieuChiId;
                }
                // 20170718 binhnt thêm upload
                upload().then(function () {
                    vm.status.isLoading = false;
                    $rootScope.isOpenPopup = false;
                    closeEdit();
                    $rootScope.$broadcast('KhoPhieuChiListCtrl.action.refresh');
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
            vm.status.isInValidSoPhieu = utility.checkInValid(vm.data.objKhoPhieuChi.SoPhieu, 'isEmpty');
            if (vm.status.isInValidSoPhieu) {
                return;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoPhieuChi.NgayChi, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById('txtNgay').focus();
                return;
            }
            vm.status.isInValidDonVi = utility.checkInValid(vm.data.listKhachHang.length > 0 ? vm.data.listKhachHang[0].KhachHangId : '', 'isEmpty');
            if (vm.status.isInValidDonVi) {
                $window.document.getElementById('popKhachHang').focus();
                return;
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhoPhieuChi.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById('txtLyDo').focus();
                return;
            }
            vm.status.isInValidSoTien = utility.checkInValid(vm.data.objKhoPhieuChi.SoTien, 'isEmpty');
            if (vm.status.isInValidSoTien) {
                $window.document.getElementById('txtSoTien').focus();
                return;
            }
            vm.data.objKhoPhieuChi.NguoiTao = vm.data.UserLoginId;
            vm.data.objKhoPhieuChi.NgayChi = utility.convertDateFormat(vm.data.objKhoPhieuChi.NgayChi, 'DD/MM/YYYY', 'YYYY-MM-DD');
            if (vm.data.listKhachHang.length > 0) vm.data.objKhoPhieuChi.KhachHangId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            if (vm.data.listNguoiNhan.length > 0) vm.data.objKhoPhieuChi.NguoiNhanTien = joinStr(vm.data.listNguoiNhan, 'NhanVienId');
            if (vm.data.listTaiKhoanCo.length > 0) vm.data.objKhoPhieuChi.TaiKhoanCo = joinStr(vm.data.listTaiKhoanCo, 'TaiKhoanId');
            if (vm.data.listTaiKhoanNo.length > 0) vm.data.objKhoPhieuChi.TaiKhoanNo = joinStr(vm.data.listTaiKhoanNo, 'TaiKhoanId');
            KhoPhieuChiService.update(vm.data.objKhoPhieuChi).then(function (success) {
                // 20170718 binhnt thêm upload
                upload().then(function () {
                    closeEdit();
                    $rootScope.isOpenPopup = false;
                    vm.status.isLoading = true;
                    $rootScope.$broadcast('KhoPhieuChiListCtrl.action.refresh');
                }, function () {
                    alert('Không thể upload file');
                });
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function getSoPhieuAuto() {
            vm.status.isLoading = true;
            var data = {};
            data.loaiPhieu = 'PhieuChi';
            data.loginId = vm.data.UserLoginId;

            KhoPhieuChiService.getSoPhieuAuto(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    console.log(result);
                    vm.data.objKhoPhieuChi.SoPhieu = result.data.data.SoPhieu;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });
        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                if (fromId == 'txtNgay') {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoPhieuChi.NgayChi, 'isEmpty');
                    if (!vm.status.isInValidNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtLyDo') {
                    vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhoPhieuChi.LyDo, 'isEmpty');
                    if (!vm.status.isInValidLyDo) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtSoTien') {
                    vm.status.isInValidSoTien = utility.checkInValid(vm.data.objKhoPhieuChi.SoTien, 'isEmpty');
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
            vm.data.listNguoiNhan = [];
            vm.data.listTaiKhoanCo = [];
            vm.data.listTaiKhoanNo = [];
            vm.status.isInValidNgay = false;
            vm.status.isInValidDonVi = false;
            vm.status.isInValidLyDo = false;
            vm.status.isInValidSoTien = false;
            vm.status.isInValidSoPhieu = false;
            vm.data.objKhoPhieuChi = {
                HinhThucThanhToan: 'Y',
            };
            KhoPhieuChiId = 0;
            $('input[type="file"]').val('');
            $('#popupThongTinKhoPhieuChi').collapse('hide');
        }
        function save() {
            // 20170718 binhnt upload file
            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.objKhoPhieuChi.Hinh) {
                    vm.data.objKhoPhieuChi.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.objKhoPhieuChi.Hinh = vm.data.objKhoPhieuChi.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }
            if (KhoPhieuChiId > 0) {
                update();
            } else {
                insert();
            }
        }
        // 20170718 binhnt upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.objKhoPhieuChi.Hinh);
                console.log(vm.data.file);

                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.objKhoPhieuChi.Hinh).then(function success(result) {
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
