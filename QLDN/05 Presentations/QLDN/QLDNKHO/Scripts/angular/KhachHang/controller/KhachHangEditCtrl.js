(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhachHangEditCtrl', KhachHangEditCtrl)
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

    function KhachHangEditCtrl($rootScope, $scope, KhachHangService, utility, $window, $filter) {
        var controllerId = 'KhachHangEditCtrl';
        var KhachHangId = 0;
        var vm = this;
        vm.data = {
            objKhachHang: {
                Loai: '1'
            },
            error: {},
            listTinh: [],
            listHuyen: [],
            listPhuongXa: [],
            listQuyenTacVu: [],
            showButtonXoa: false,
            showButtonSave: false,
        };
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
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
            isInValidMa: false,
            isInValidTen: false,
            isInValidTinh: false,
            isInValidHuyen: false,
            isInValidPhuongXa: false
        };

        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListTinh: clearListTinh,
            clearListHuyen: clearListHuyen,
            clearListPhuongXa: clearListPhuongXa,
        };

        vm.onInitView = onInitView;
        activate();

        function activate() {
            $('#popupThongTinKhachHang').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinKhachHang').on('shown.bs.collapse', function () {
                $("#txtMa").focus();
             
                $rootScope.isOpenPopup = true;
            });
            initEventListener();
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                setEnableButton();
            }
        }
       
        function setEnableButton() {

            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KhachHangId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhachHangId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
       
            $scope.$on(controllerId + '.data.listTinhEdit', function (event, data) {
                vm.data.listTinh = data;
            });
            $scope.$on(controllerId + '.data.listHuyenEdit', function (event, data) {
                vm.data.listHuyen = data;
            });
            $scope.$on(controllerId + '.data.listPhuongXaEdit', function (event, data) {
                vm.data.listPhuongXa = data;
            });
            $scope.$on('KhachHangListCtrl.action.xemKhachHang', function (event, data) {
                KhachHangId = data;
                $window.document.getElementById("txtMa").focus();
                refresh();
            });
        }
        function clearListNhanVien() {
            vm.data.listTinh = [];

        }
        function refresh() {
            setEnableButton();
            if (KhachHangId > 0) {
                KhachHangService.getById(KhachHangId == 0 ? vm.data.objKhachHang.KhachHangId : KhachHangId).then(function (result) {
                    if (result.data.data.length>0)
                    {
                        vm.data.objKhachHang = result.data.data[0];
                        vm.data.listTinh = [];
                        vm.data.listHuyen = [];
                        vm.data.listPhuongXa = [];
                        if (result.data.data[0].TinhThanhPhoId != null) vm.data.listTinh.push({ TinhThanhPhoId: result.data.data[0].TinhThanhPhoId, TenTT: result.data.data[0].TenTT });
                        if (result.data.data[0].QuanHuyenId != null) vm.data.listHuyen.push({ QuanHuyenId: result.data.data[0].QuanHuyenId, TenQuanHuyen: result.data.data[0].TenQuanHuyen });
                        if (result.data.data[0].PhuongXaId != null) vm.data.listPhuongXa.push({ PhuongXaId: result.data.data[0].PhuongXaId, TenPhuongXa: result.data.data[0].TenPhuongXa });
                         result.data.data[0].Loai == 1 ? vm.data.objKhachHang.Loai = '1' : vm.data.objKhachHang.Loai = '2';
                         $('#popupThongTinKhachHang').collapse('show');
                 }
                })
            } else {
                vm.status.isInValidMa = false;
                vm.status.isInValidTen = false;
                vm.status.isInValidTinh = false;
                vm.status.isInValidHuyen = false;
                vm.status.isInValidPhuongXa = false;
                vm.data.objKhachHang = { Loai: '1' };
                clearListTinh();
                clearListHuyen();
                clearListPhuongXa();
                $window.document.getElementById("txtMa").focus();
            }
        }

        function insert() {
            vm.data.objKhachHang.Tinh = joinStr(vm.data.listTinh, "TinhThanhPhoId");
            vm.data.objKhachHang.Huyen = joinStr(vm.data.listHuyen, "QuanHuyenId");
            vm.data.objKhachHang.Xa = joinStr(vm.data.listPhuongXa, "PhuongXaId");
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhachHang.Ma, 'isEmpty');
            if (vm.status.isInValidMa) {
                $window.document.getElementById("txtMa").focus();
                return;
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objKhachHang.Ten, 'isEmpty');
            if (vm.status.isInValidTen) {
                $window.document.getElementById("txtTen").focus();
                return;
            }
            KhachHangService.insert(vm.data.objKhachHang).then(function (success) {
                if (success.data.result) {
                    KhachHangId = success.data.KhachHangId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('KhachHangListCtrl.action.refresh');
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

            vm.data.objKhachHang.TinhThanhPhoId = joinStr(vm.data.listTinh, "TinhThanhPhoId");
            vm.data.objKhachHang.QuanHuyenId = joinStr(vm.data.listHuyen, "QuanHuyenId");
            vm.data.objKhachHang.PhuongXaId = joinStr(vm.data.listPhuongXa, "PhuongXaId");
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhachHang.Ma, 'isEmpty');
            if (vm.status.isInValidMa) {
                $window.document.getElementById("txtMa").focus();
                return;
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objKhachHang.Ten, 'isEmpty');
            if (vm.status.isInValidTen) {
                $window.document.getElementById("txtTen").focus();
                return;
            }

            KhachHangService.update(vm.data.objKhachHang).then(function (success) {
                vm.data.objKhachHang = success.data.data;
                closeEdit();
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('KhachHangListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa') {
                    vm.status.isInValidMa= utility.checkInValid(vm.data.objKhachHang.Ma, 'isEmpty');
                    if (!vm.status.isInValidMa) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtTen') {
                    vm.status.isInValidTen = utility.checkInValid(vm.data.objKhachHang.Ten, 'isEmpty');
                    if (!vm.status.isInValidTen) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }   
            }
        }

        function resetEdit(id) {
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;
            getById(id);
        };

        function closeEdit() {

            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;
            vm.status.isInValidTinh = false;
            vm.status.isInValidHuyen = false;
            vm.status.isInValidPhuongXa = false;
            vm.data.objKhachHang = { Loai: '1' };
            clearListTinh();
            clearListHuyen();
            clearListPhuongXa();
            KhachHangId=0;
            $('#popupThongTinKhachHang').collapse('hide');
         
       
        }
        function clearListTinh() {
            $rootScope.$broadcast('TinhHuyenTramListCtrl.action.clearListTinh');
            utility.clearArray(vm.data.listTinh);
        }
        function clearListHuyen() {
            $rootScope.$broadcast('TinhHuyenTramListCtrl.action.clearListHuyen');
            utility.clearArray(vm.data.listHuyen);
        }
        function clearListPhuongXa() {
            utility.clearArray(vm.data.listPhuongXa);
        }
        function save() {
            if (KhachHangId > 0) {
                update();
            } else {
                insert();
            }
        }

    }
})();
