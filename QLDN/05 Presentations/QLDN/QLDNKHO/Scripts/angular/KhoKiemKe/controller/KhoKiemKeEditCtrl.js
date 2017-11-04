(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoKiemKeEditCtrl', KhoKiemKeEditCtrl)
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
    function KhoKiemKeEditCtrl($rootScope, $scope, KhoKiemKeService, utility, $window, $filter,Upload) {
        var controllerId = 'KhoKiemKeEditCtrl';
        var KhoKiemKeId = 0;
        var vm = this;
        vm.KhoKiemKeId = function () {
            return KhoKiemKeId || 0;
        }
        vm.data = {
            objKhoKiemKe: {
                TrangThai: 'KKK_BD',
                NgayTao: moment().format('DD/MM/YYYY'),
            },
            error: {},
            listQuyenTacVu: [],
            listKhoHang: [],
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
        };
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                if ($rootScope.isOpenPopup) {
                    $('#popupThongTinKhoKiemKe').collapse("hide");
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
            isInValidTieuDe: false,
            isInValidKho: false,
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListKhoHang: clearListKhoHang,
            In: In
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinKhoKiemKe').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinKhoKiemKe').on('shown.bs.collapse', function () {
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
        // upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.file);
                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.objKhoKiemKe.Hinh).then(function success(result) {
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
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KhoKiemKeId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoKiemKeId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('KhoKiemKeListCtrl.action.xemKhoKiemKe', function (event, data) {
                KhoKiemKeId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listKhoHang', function (event, data) {
                vm.data.listKhoHang = data.listKhoHang;
            });

        }
        function clearListKhoHang() {
            utility.clearArray(vm.data.listKhoHang);
        }
        function In() {
            debugger;
            var strData = '';
            strData = vm.data.objKhoKiemKe.TruongBanTen == null ? '' : vm.data.objKhoKiemKe.TruongBanTen;
            strData = strData + '|' + (vm.data.objKhoKiemKe.TruongBanChucVu == null ? '' : vm.data.objKhoKiemKe.TruongBanChucVu);
            strData = strData + '|' + (vm.data.objKhoKiemKe.TruongBanDaiDien == null ? '' : vm.data.objKhoKiemKe.TruongBanDaiDien);

            strData = strData + '|' + (vm.data.objKhoKiemKe.UyVienTen == null ? '' : vm.data.objKhoKiemKe.UyVienTen);
            strData = strData + '|' + (vm.data.objKhoKiemKe.UyVienChucVu == null ? '' : vm.data.objKhoKiemKe.UyVienChucVu);
            strData = strData + '|' + (vm.data.objKhoKiemKe.UyVienDaiDien == null ? '' : vm.data.objKhoKiemKe.UyVienDaiDien);

            strData = strData + '|' + (vm.data.objKhoKiemKe.UyVienTen2 == null ? '' : vm.data.objKhoKiemKe.UyVienTen2);
            strData = strData + '|' + (vm.data.objKhoKiemKe.UyVienChucVu2 == null ? '' : vm.data.objKhoKiemKe.UyVienChucVu2);
            strData = strData + '|' + (vm.data.objKhoKiemKe.UyVienDaiDien2 == null ? '' : vm.data.objKhoKiemKe.UyVienDaiDien2);

            var ngay = utility.convertDateFormat(vm.data.objKhoKiemKe.NgayTao, 'DD/MM/YYYY', 'YYYY-MM-DD');
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptKiemKe&data='+strData+'&KhoId=' + vm.data.objKhoKiemKe.KhoHangId + '&Ngay=' + ngay);
            $('#reportmodal').modal('show');
        };
        function refresh() {
            debugger
            setEnableButton();
            if (KhoKiemKeId > 0) {
                KhoKiemKeService.getById(KhoKiemKeId).then(function (result) {
                    if (result.data.data.length > 0) {
                        vm.data.listKhoHang = [];
                        if (result.data.data[0].KhoHangId) vm.data.listKhoHang.push({ KhoHangId: result.data.data[0].KhoHangId, TenKho: result.data.data[0].TenKho });
                       
                        vm.data.objKhoKiemKe = result.data.data[0];
                        $('#popupThongTinKhoKiemKe').collapse('show');

                    }
                    else $rootScope.$broadcast('KhoKiemKeListCtrl.action.refresh');
                })
            } else {
                vm.status.isInValidNgay = false;
                vm.status.isInValidTieuDe = false;
                vm.status.isInValidKho = false;

                vm.data.objKhoKiemKe = {
                    TrangThai: 'KKK_BD',
                    NgayTao: moment().format('DD/MM/YYYY'),
                };
            }
        }
        function insert() {

            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoKiemKe.NgayTao, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById('txtNgay').focus();
                return;
            }
            vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objKhoKiemKe.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $window.document.getElementById('txtTieuDe').focus();
                return;
            }
            vm.status.isInValidKho = utility.checkInValid(vm.data.listKhoHang.length > 0 ? vm.data.listKhoHang[0].KhoHangId : '', 'isEmpty');
            if (vm.status.isInValidKho) {
                $window.document.getElementById('popKhoHang').focus();
                return;
            }
           
            vm.data.objKhoKiemKe.NgayTao = utility.convertDateFormat(vm.data.objKhoKiemKe.NgayTao, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objKhoKiemKe.NguoiTao = vm.data.UserLoginId;
            if (vm.data.listKhoHang.length > 0) vm.data.objKhoKiemKe.KhoHangId = joinStr(vm.data.listKhoHang, 'KhoHangId');
            
            KhoKiemKeService.insert(vm.data.objKhoKiemKe).then(function (success) {
                if (success.data.result) {
                    upload().then(function () {
                    }, function () {
                        alert('Không thể upload file.');
                    });
                    KhoKiemKeId = success.data.KhoKiemKeId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('KhoKiemKeListCtrl.action.refresh');
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
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoKiemKe.NgayTao, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById('txtNgay').focus();
                return;
            }
            vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objKhoKiemKe.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $window.document.getElementById('txtTieuDe').focus();
                return;
            }
            vm.status.isInValidKho = utility.checkInValid(vm.data.listKhoHang.length > 0 ? vm.data.listKhoHang[0].KhoHangId : '', 'isEmpty');
            if (vm.status.isInValidKho) {
                $window.document.getElementById('popKhoHang').focus();
                return;
            }
            vm.data.objKhoKiemKe.NguoiTao = vm.data.UserLoginId;
            vm.data.objKhoKiemKe.NgayTao = utility.convertDateFormat(vm.data.objKhoKiemKe.NgayTao, 'DD/MM/YYYY', 'YYYY-MM-DD');
            if (vm.data.listKhoHang.length > 0) vm.data.objKhoKiemKe.KhoHangId = joinStr(vm.data.listKhoHang, 'KhoHangId');
            KhoKiemKeService.update(vm.data.objKhoKiemKe).then(function (success) {
                upload().then(function () {
                }, function () {
                    alert('Không thể upload file.');
                });
                closeEdit();
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('KhoKiemKeListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                if (fromId == 'txtNgay') {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhoKiemKe.NgayTao, 'isEmpty');
                    if (!vm.status.isInValidNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtTieuDe') {
                    vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objKhoKiemKe.TieuDe, 'isEmpty');
                    if (!vm.status.isInValidTieuDe) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }
        function resetEdit(id) {
            vm.status.isInValidNgay = false;
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidKho = false;
            refresh();
        };
        function closeEdit() {
            vm.data.listKhoHang = [];
            vm.status.isInValidNgay = false;
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidKho = false;
            vm.data.objKhoKiemKe = {
                TrangThai: 'KKK_BD',          
                NgayTao: moment().format('DD/MM/YYYY'),
            };
            KhoKiemKeId = 0;
            $('#popupThongTinKhoKiemKe').collapse('hide');
        }
        function save() {
            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.objKhoKiemKe.Hinh) {
                    vm.data.objKhoKiemKe.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.objKhoKiemKe.Hinh = vm.data.objKhoKiemKe.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }
            if (KhoKiemKeId > 0) {
                update();
            } else {
                insert();
            }
        }
    }
})();
