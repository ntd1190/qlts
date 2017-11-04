(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoHangHoaEditCtrl', KhoHangHoaEditCtrl)
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
                debugger;
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
    function KhoHangHoaEditCtrl($rootScope, $scope, KhoHangHoaService, utility, $window, $filter,Upload) {
        var controllerId = 'KhoHangHoaEditCtrl';
        var KhoHangHoaId = 0;
        var vm = this;
        var isOpenPopup  = false; 
        vm.data = {
            objKhoHangHoa: {},
            error: {},
            listQuyenTacVu: [],
            listKhachHang: [],
            listKhoNhomHangHoa: [],
            listKhoLoaiHangHoa: [],
            listKhoHangSanXuat: [],
            listKhoNuocSanXuat: [],
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
        };
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            F8: function (name, code) {
                if (isOpenPopup) {
                    save();
                }
            }
        };
        //HOT-KEY
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidMaHangHoa: false,
            isInValidTenHangHoa: false,
            isInValidDonViTinh: false,

            isInValid: false,
            
            isInValidNhomHangHoa: false,
            isInValidLoaiHangHoa: false,
            isInValidHangSanXuat: false,
            isInValidNuocSanXuat: false,
            isInsert:''
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListKhachHang: clearListKhachHang,
            ClearlistKhoNhomHangHoa: ClearlistKhoNhomHangHoa,
            ClearlistKhoLoaiHangHoa: ClearlistKhoLoaiHangHoa,
            ClearlistKhoHangSanXuat: ClearlistKhoHangSanXuat,
            ClearlistKhoNuocSanXuat: ClearlistKhoNuocSanXuat,
            checkMa: checkMa,
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinKhoHangHoa').on('hidden.bs.collapse', function () {
                console.log('popupThongTinKhoHangHoa hidden.bs.collapse')
                isOpenPopup = false;      

            });
            $('#popupThongTinKhoHangHoa').on('shown.bs.collapse', function () {
                console.log(vm.status)
                $("#txtMaHangHoa").focus();
                isOpenPopup = true;
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
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KhoHangHoaId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoHangHoaId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('KhoHangHoaListCtrl.action.xemKhoHangHoa', function (event, data) {
                KhoHangHoaId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });
            $scope.$on(controllerId + '.data.listKhoNhomHangHoa', function (event, data) {
                vm.data.listKhoNhomHangHoa = data;
            });
            $scope.$on(controllerId + '.data.listKhoLoaiHangHoa', function (event, data) {
                vm.data.listKhoLoaiHangHoa = data;
            });
            $scope.$on(controllerId + '.data.listKhoHangSanXuat', function (event, data) {
                vm.data.listKhoHangSanXuat = data;
            });
            $scope.$on(controllerId + '.data.listKhoNuocSanXuat', function (event, data) {
                vm.data.listKhoNuocSanXuat = data;
            });
        }
        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }
        function ClearlistKhoNhomHangHoa() {
            utility.clearArray(vm.data.listKhoNhomHangHoa);
        }
        function ClearlistKhoLoaiHangHoa() {
            utility.clearArray(vm.data.listKhoLoaiHangHoa);
        }
        function ClearlistKhoHangSanXuat() {
            utility.clearArray(vm.data.listKhoHangSanXuat);
        }
        function ClearlistKhoNuocSanXuat() {
            utility.clearArray(vm.data.listKhoNuocSanXuat);
        }
        function refresh() {
            debugger;
            setEnableButton();
            if (KhoHangHoaId > 0) {
                KhoHangHoaService.getById(KhoHangHoaId).then(function (result) {
                    if (result.data.data.length > 0) {
                        vm.data.listKhachHang = [];
                        vm.data.listKhoNhomHangHoa = [];
                        vm.data.listKhoLoaiHangHoa = [];
                        vm.data.listKhoHangSanXuat = [];
                        vm.data.listKhoNuocSanXuat = [];
                        if (result.data.data[0].NhaCungCapId) vm.data.listKhachHang.push({ KhachHangId: result.data.data[0].NhaCungCapId, TEN: result.data.data[0].Ten });
                        if (result.data.data[0].NhomHangHoaId) vm.data.listKhoNhomHangHoa.push({ NhomHangHoaId: result.data.data[0].NhomHangHoaId, TenNhom: result.data.data[0].TenNhom });
                        if (result.data.data[0].LoaiHangHoaId) vm.data.listKhoLoaiHangHoa.push({ LoaiHangHoaId: result.data.data[0].LoaiHangHoaId, TenLoai: result.data.data[0].TenLoai });
                        if (result.data.data[0].HangSanXuatId) vm.data.listKhoHangSanXuat.push({ HangSanXuatId: result.data.data[0].HangSanXuatId, TenHangSanXuat: result.data.data[0].TenHangSanXuat });
                        if (result.data.data[0].NuocSanXuatId) vm.data.listKhoNuocSanXuat.push({ NuocSanXuatId: result.data.data[0].NuocSanXuatId, TenNuoc: result.data.data[0].TenNuoc });
                        vm.data.objKhoHangHoa = result.data.data[0];
                        vm.data.objKhoHangHoa.ThueMua = vm.data.objKhoHangHoa.ThueMua == 'Y' ? true : false;
                        vm.data.objKhoHangHoa.ThueBan = vm.data.objKhoHangHoa.ThueBan == 'Y' ? true : false;
                        $('#popupThongTinKhoHangHoa').collapse('show');

                    }
                    else $rootScope.$broadcast('KhoHangHoaListCtrl.action.refresh');
                })
            } else {
                vm.data.listDuAn = [];
                vm.data.listNhanVien = [];
                vm.status.isInValidTieuDe = false;
                vm.status.isInValidNgayBatDau = false;
                vm.status.isInValidNgayKetThuc = false;
                vm.status.isInValidNhanVien = false;
                vm.status.isInValidDuAn = false;
                vm.data.objKhoHangHoa = {};
            }
        }
        function insert() {
            debugger;
            var flag = true;
            vm.status.isInValidMaHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.MaHangHoa, 'isEmpty');
            if (vm.status.isInValidMaHangHoa) {
                $window.document.getElementById('txtMaHangHoa').focus();
                flag = false;     
            }
            else {
                
                checkMa();
            }

            vm.status.isInValidTenHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.TenHangHoa, 'isEmpty');
            if (vm.status.isInValidTenHangHoa) {
                $window.document.getElementById('txtTenHangHoa').focus();
                flag = false;          
            }
            vm.status.isInValidDonViTinh = utility.checkInValid(vm.data.objKhoHangHoa.DonViTinh, 'isEmpty');
            if (vm.status.isInValidDonViTinh) {
                $window.document.getElementById('txtDonViTinh').focus();
                flag = false;               
            }            

            if (vm.data.listKhoNhomHangHoa.length < 1) {
                vm.status.isInValidNhomHangHoa = true;
                flag = false;
            } else {
                vm.status.isInValidNhomHangHoa = false;
            }

            if (vm.data.listKhoLoaiHangHoa.length < 1) {
                vm.status.isInvalidLoaiHangHoa = true;
                flag = false;
            } else {
                vm.status.isInvalidLoaiHangHoa = false;
            }

            if (vm.data.listKhoHangSanXuat.length < 1) {
                vm.status.isInvalidHangSanXuat = true;
                flag = false;
            } else {
                vm.status.isInvalidHangSanXuat = false;
            }

            if (vm.data.listKhoNuocSanXuat.length < 1) {
                vm.status.isInvalidNuocSanXuat = true;
                flag = false;
            } else {
                vm.status.isInvalidNuocSanXuat = false;
            }
            if (!flag) return;

            vm.data.objKhoHangHoa.ThueMua = vm.data.objKhoHangHoa.ThueMua ? "Y" : "";
            vm.data.objKhoHangHoa.ThueBan = vm.data.objKhoHangHoa.ThueBan ? "Y" : "";
            vm.data.objKhoHangHoa.NguoiTao = vm.data.UserLoginId;
            if (vm.data.listKhoNhomHangHoa.length > 0) vm.data.objKhoHangHoa.NhomHangHoaId = joinStr(vm.data.listKhoNhomHangHoa, 'NhomHangHoaId');
            if (vm.data.listKhoLoaiHangHoa.length > 0) vm.data.objKhoHangHoa.LoaiHangHoaId = joinStr(vm.data.listKhoLoaiHangHoa, 'LoaiHangHoaId');
            if (vm.data.listKhachHang.length > 0) vm.data.objKhoHangHoa.NhaCungCapId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            if (vm.data.listKhoHangSanXuat.length > 0) vm.data.objKhoHangHoa.HangSanXuatId = joinStr(vm.data.listKhoHangSanXuat, 'HangSanXuatId');
            if (vm.data.listKhoNuocSanXuat.length > 0) vm.data.objKhoHangHoa.NuocSanXuatId = joinStr(vm.data.listKhoNuocSanXuat, 'NuocSanXuatId');
            KhoHangHoaService.insert(vm.data.objKhoHangHoa).then(function (success) {
                if (success.data.result) {
                    KhoHangHoaId = success.data.KhoHangHoaId;
                    upload().then(function () {
                    }, function () {
                        alert('Không thể upload file');
                    });
                }
                vm.status.isLoading = false;
                isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('KhoHangHoaListCtrl.action.refresh');
            }, function (error) {
                console.log(error)
                if (error.data.error) {
                    //alert(error.data.error.message);
                    alert("Mã này đã tồn tại");
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
            debugger;
            var flag = true;
            vm.status.isInValidMaHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.MaHangHoa, 'isEmpty');
            if (vm.status.isInValidMaHangHoa) {
                $window.document.getElementById('txtMaHangHoa').focus();
                flag = false;
            }            

            vm.status.isInValidTenHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.TenHangHoa, 'isEmpty');
            if (vm.status.isInValidTenHangHoa) {
                $window.document.getElementById('txtTenHangHoa').focus();
                flag = false;
            }
            vm.status.isInValidDonViTinh = utility.checkInValid(vm.data.objKhoHangHoa.DonViTinh, 'isEmpty');
            if (vm.status.isInValidDonViTinh) {
                $window.document.getElementById('txtDonViTinh').focus();
                flag = false;
            }
            
            if (vm.data.listKhoNhomHangHoa.length < 1) {
                vm.status.isInValidNhomHangHoa = true;
                flag = false;
            } else {
                vm.status.isInValidNhomHangHoa = false;
            }

            if (vm.data.listKhoLoaiHangHoa.length < 1) {
                vm.status.isInvalidLoaiHangHoa = true;
                flag = false;
            } else {
                vm.status.isInvalidLoaiHangHoa = false;
            }

            if (vm.data.listKhoHangSanXuat.length < 1) {
                vm.status.isInvalidHangSanXuat = true;
                flag = false;
            } else {
                vm.status.isInvalidHangSanXuat = false;
            }

            if (vm.data.listKhoNuocSanXuat.length < 1) {
                vm.status.isInvalidNuocSanXuat = true;
                flag = false;
            } else {
                vm.status.isInvalidNuocSanXuat = false;
            }

            if (!flag) return;
            vm.data.objKhoHangHoa.ThueMua = vm.data.objKhoHangHoa.ThueMua ? "Y" : "";
            vm.data.objKhoHangHoa.ThueBan = vm.data.objKhoHangHoa.ThueBan ? "Y" : "";
            vm.data.objKhoHangHoa.NguoiTao = vm.data.UserLoginId;
            if (vm.data.listKhoNhomHangHoa.length > 0) vm.data.objKhoHangHoa.NhomHangHoaId = joinStr(vm.data.listKhoNhomHangHoa, 'NhomHangHoaId');
            if (vm.data.listKhoLoaiHangHoa.length > 0) vm.data.objKhoHangHoa.LoaiHangHoaId = joinStr(vm.data.listKhoLoaiHangHoa, 'LoaiHangHoaId');
            if (vm.data.listKhachHang.length > 0) vm.data.objKhoHangHoa.NhaCungCapId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            if (vm.data.listKhoHangSanXuat.length > 0) vm.data.objKhoHangHoa.HangSanXuatId = joinStr(vm.data.listKhoHangSanXuat, 'HangSanXuatId');
            if (vm.data.listKhoNuocSanXuat.length > 0) vm.data.objKhoHangHoa.NuocSanXuatId = joinStr(vm.data.listKhoNuocSanXuat, 'NuocSanXuatId');
            KhoHangHoaService.update(vm.data.objKhoHangHoa).then(function (success) {
                upload().then(function () {
                    closeEdit();
                }, function () {
                    alert('Không thể upload file');
                });
               
                isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('KhoHangHoaListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            debugger;
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaHangHoa') {
                    vm.status.isInValidMaHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.MaHangHoa, 'isEmpty');
                    if (!vm.status.isInValidMaHangHoa) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtTenHangHoa') {
                    vm.status.isInValidTenHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.TenHangHoa, 'isEmpty');
                    if (!vm.status.isInValidTenHangHoa) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtDonViTinh') {
                    vm.status.isInValidDonViTinh = utility.checkInValid(vm.data.objKhoHangHoa.DonViTinh, 'isEmpty');
                    if (!vm.status.isInValidDonViTinh) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }
        function resetEdit(id) {
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidNgayBatDau = false;
            vm.status.isInValidNgayKetThuc = false;
            vm.status.isInValidNhanVien = false;
            vm.status.isInValidDuAn = false;
            refresh();
        };
        function closeEdit() {
            debugger;
            vm.data.listKhachHang = [];
            vm.data.listKhoNhomHangHoa = [];
            vm.data.listKhoLoaiHangHoa = [];
            vm.data.listKhoHangSanXuat = [];
            vm.data.listKhoNuocSanXuat = [];
            delete vm.status; vm.status = {};
            //vm.status.isInValidMaHangHoa = false;
            //vm.status.isInValidTenHangHoa = false;
            //vm.status.isInValidDonViTinh = false;

            //vm.status.isInValidNhomHangHoa = false;
            //vm.status.isInValidLoaiHangHoa = false;
            //vm.status.isInValidHangSanXuat = false;
            //vm.status.isInValidNuocSanXuat = false;

            vm.data.objKhoHangHoa = {};
            KhoHangHoaId = 0;
            $('#popupThongTinKhoHangHoa').collapse('hide');
        }
        function save() {
            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.objKhoHangHoa.Hinh) {
                    vm.data.objKhoHangHoa.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.objKhoHangHoa.Hinh = vm.data.objKhoHangHoa.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }
            if (KhoHangHoaId > 0) {
                update();
            } else {                
                insert();
            }
        }
        function checkMa() {
            debugger;
            vm.status.isInValidMaHangHoa = utility.checkInValid(vm.data.objKhoHangHoa.MaHangHoa, 'isEmpty');
            if (vm.status.isInValidMaHangHoa) {
                $window.document.getElementById('txtMaHangHoa').focus();
                return;
            }

            KhoHangHoaService.getThongTinByMa(vm.data.objKhoHangHoa.MaHangHoa).then(function (result) {
                if (result.data && result.data.data && result.data.data.length) {
                    debugger;
                    vm.status.isInValidMaHangHoa = true;                    
                    $window.document.getElementById('txtMaHangHoa').focus();                    
                    return;
                } else {
                    vm.status.isInValidMaHangHoa = false;
                    $window.document.getElementById('txtTenHangHoa').focus();
                }
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                vm.status.isLoading = false;
            });
        }
        // upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.file);
                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.objKhoHangHoa.Hinh).then(function success(result) {
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
