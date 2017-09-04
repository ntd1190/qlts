(function () {
    'use strict';

    angular
        .module('app')
        .controller('NguoiDungMenuEditCtrl', NguoiDungEditCtrl)
    function NguoiDungEditCtrl($rootScope, $scope, NguoiDungService, utility, $window, $filter) {
        var controllerId = 'NguoiDungEditCtrl';
        var NguoiDungId = 0;
        var vm = this;
        vm.data = {
            objNguoiDung: {
                MaTrangThai: 'CV_BD',
            },
            error: {},
            listQuyenTacVu: [],
            listVaiTro: [],
            listNhanVien: [],
            UserLoginId:'',
            showButtonXoa: false,
            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidMaNguoiDung: false,
            isInValidTenNguoiDung: false,
            isInValidVaiTro: false,
            isInValidEmail: false,
            isInValidPassword:false
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListVaiTro: clearListVaiTro,
            clearListNhanVien: clearListNhanVien
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupNguoiDung').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupNguoiDung').on('shown.bs.collapse', function () {
                $("#txtEmailMenu").focus();
                $rootScope.isOpenPopup = true;
                refresh();
            });
            initEventListener();
        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
            if (ctrlId && ctrlId.userInfo) {
                NguoiDungId = ctrlId.userInfo;
            }
        }
        function initEventListener() {
            $scope.$on('NguoiDungListCtrl.action.xemNguoiDung', function (event, data) {
                NguoiDungId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listVaiTro', function (event, data) {
                vm.data.listVaiTro = data;
            });
            $scope.$on(controllerId + '.data.listNhanVienEdit', function (event, data) {
                vm.data.listNhanVien = data;
            });
        }
        function clearListVaiTro() {
            utility.clearArray(vm.data.listVaiTro);
        }
        function clearListNhanVien() {
            utility.clearArray(vm.data.listNhanVien);
        }
        function refresh() {
            if (NguoiDungId > 0) {
                NguoiDungService.getById(NguoiDungId).then(function (result) {
                    if (result.data.data.length>0)
                    {
                        vm.data.listVaiTro = [];
                        vm.data.listNhanVien = [];
                        vm.data.objNguoiDung = result.data.data[0];
                        if (result.data.data[0].VaiTroId != null) vm.data.listVaiTro.push({ VaiTroId: result.data.data[0].VaiTroId, TenVaiTro: result.data.data[0].TenVaiTro });
                        if (result.data.data[0].NhanVienId > 0) vm.data.listNhanVien.push({ NhanVienId: result.data.data[0].NhanVienId, Ho: result.data.data[0].Ho, Ten: result.data.data[0].Ten });
                    }
                    else $rootScope.$broadcast('NguoiDungListCtrl.action.refresh');
                })
            } else {
                vm.data.objNguoiDung = [];
                vm.data.listVaiTro = [];
                vm.data.listNhanVien = [];
                vm.status.isInValidMaNguoiDung = false;
                vm.status.isInValidTenNguoiDung = false;
                vm.status.isInValidVaiTro = false;
                vm.status.isInValidEmail = false;
                vm.status.isInValidPassword = false;
                $("#txtEmailMenu").focus();
            }
        }
        function insert() {
            vm.status.isInValidMaNguoiDung = utility.checkInValid(vm.data.objNguoiDung.MaNguoiDung, 'isEmpty');
            if (vm.status.isInValidMaNguoiDung) {
                $window.document.getElementById('txtMaNguoiDungMenu').focus();
                return;
            }
            vm.status.isInValidTenNguoiDung = utility.checkInValid(vm.data.objNguoiDung.HoTen, 'isEmpty');
            if (vm.status.isInValidTenNguoiDung) {
                $window.document.getElementById('txtMaNguoiDungMenu').focus();
                return;
            }
        
            vm.status.isInValidVaiTro = utility.checkInValid(vm.data.listVaiTro.length > 0 ? vm.data.listVaiTro[0].VaiTroId : '', 'isEmpty');
            if (vm.status.isInValidVaiTro) {
                $window.document.getElementById('popVaiTro').focus();
                return;
            }
            vm.status.isInValidEmail = utility.checkInValid(vm.data.objNguoiDung.Email, 'Email');
            if (vm.status.isInValidEmail) {
                $window.document.getElementById('txtEmailMenu').focus();
                return;
            }
            vm.status.isInValidPassword = utility.checkInValid(vm.data.objNguoiDung.PasswordHash, 'isEmpty');
                if (vm.status.isInValidPassword) {
                $window.document.getElementById('txtPasswordMenu').focus();
                return;
            }
            vm.data.objNguoiDung.NguoiTao = vm.data.UserLoginId;
            vm.data.objNguoiDung.VaiTroId = joinStr(vm.data.listVaiTro, 'VaiTroId');
            vm.data.objNguoiDung.NhanVienId = joinStr(vm.data.listNhanVien, 'NhanVienId');
            NguoiDungService.insert(vm.data.objNguoiDung).then(function (success) {
                if (success.data.result) {
                    NguoiDungId = success.data.NguoiDungId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('NguoiDungListCtrl.action.refresh');
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

            vm.status.isInValidMaNguoiDung = utility.checkInValid(vm.data.objNguoiDung.MaNguoiDung, 'isEmpty');
            if (vm.status.isInValidMaNguoiDung) {
                $window.document.getElementById('txtMaNguoiDungMenu').focus();
                return;
            }
            vm.status.isInValidTenNguoiDung = utility.checkInValid(vm.data.objNguoiDung.HoTen, 'isEmpty');
            if (vm.status.isInValidTenNguoiDung) {
                $window.document.getElementById('txtMaNguoiDungMenu').focus();
                return;
            }

            vm.status.isInValidVaiTro = utility.checkInValid(vm.data.listVaiTro.length > 0 ? vm.data.listVaiTro[0].VaiTroId : '', 'isEmpty');
            if (vm.status.isInValidVaiTro) {
                $window.document.getElementById('popVaiTro').focus();
                return;
            }
            vm.data.objNguoiDung.NguoiTao = vm.data.UserLoginId;
            vm.data.objNguoiDung.VaiTroId = joinStr(vm.data.listVaiTro, 'VaiTroId');
            vm.data.objNguoiDung.NhanVienId = joinStr(vm.data.listNhanVien, 'NhanVienId');
            NguoiDungService.update(vm.data.objNguoiDung).then(function (success) {
                closeEdit();
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('NguoiDungListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaNguoiDungMenu') {
                    vm.status.isInValidMaNguoiDung = utility.checkInValid(vm.data.objNguoiDung.MaNguoiDung, 'isEmpty');
                    if (!vm.status.isInValidMaNguoiDung) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtMaNguoiDungMenu') {
                    vm.status.isInValidTenNguoiDung = utility.checkInValid(vm.data.objNguoiDung.HoTen, 'isEmpty');
                    if (!vm.status.isInValidTenNguoiDung) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtEmailMenu') {
                    vm.status.isInValidEmail = utility.checkInValid(vm.data.objNguoiDung.Email, 'isEmpty');
                    if (!vm.status.isInValidEmail) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }   
            }
        }
        function resetEdit(id) {
            vm.status.isInValidMaNguoiDung = false;
            vm.status.isInValidTenNguoiDung = false;
            vm.status.isInValidVaiTro = false;
            vm.status.isInValidEmail = false;
            vm.status.isInValidPassword = false;
            refresh();
           
        };
        function closeEdit() {
            $('#popupNguoiDung').collapse('hide');
        }
        function save() {
            if (NguoiDungId > 0) {
                update();
            } else {
                insert();
            }
        }
    }
})();
