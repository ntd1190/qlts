(function () {
    'use strict';

    angular
        .module('app')
        .controller('KyLuatEditCtrl', KyLuatEditCtrl)
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

    function KyLuatEditCtrl($rootScope, $scope, KyLuatService, utility, $window, $filter) {
        var controllerId = 'KyLuatEditCtrl';
        var KyLuatId = 0;
        var vm = this;
        vm.data = {
            objKyLuat: {
                HinhThuc: 1,
                Ngay: $filter('date')(new Date(), 'dd/MM/yyyy'),
            },
            error: {},
            PhatTien: true,
            CanhCao: false,
            VanBan: false,
            listNhanVien: [],
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
        };
        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save(vm.data.objKyLuat);
                }
            }
        };
        //HOT-KEY
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidNgay: false,
            isInValidTien: false,
            isInValidHinhThuc: false,
            isInValidNhanVien: false
        };

        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            CheckCanhCao: CheckCanhCao,
            CheckPhatTien: CheckPhatTien,
            clearListNhanVien: clearListNhanVien
        };

        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                setEnableButton();
            }
            initEventListener();
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = (!KyLuatId) ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KyLuatId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#popupThongTinKyLuat').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinKyLuat').on('shown.bs.collapse', function () {
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('KyLuatEditCtrl.KyLuatId', function (event, data) {
                KyLuatId = data.KyLuatId;
                vm.data.listNhanVien = [];
                vm.data.listNhanVien.push({ NhanVienId: data.NhanVienId, Ho: data.Ho, Ten: data.Ten });
         
                refresh();
            });
            $scope.$on(controllerId + '.data.listNhanVien', function (event, data) {
                vm.data.listNhanVien = data;
                if (data.length != 0) {
                    vm.status.isInValidNhanVien = false;
                    $window.document.getElementById("txtTienPhat").focus();
                }
            });

        }


        function initEventListener() {
            $scope.$on(controllerId + '.action.xemKyLuat', function (event, data) {
                KyLuatId = data;
                refresh();
               
            });
        }
        function clearListNhanVien() {
            vm.data.listNhanVien = [];

        }
        function refresh() {
            if (KyLuatId > 0 ) {
                vm.data.PhatTien = false;
                vm.data.CanhCao = false;
                vm.data.Vanban = false;
                $("#txtTienPhat").prop('disabled', false);
                $("#txtBangChu").prop('disabled', false);
                KyLuatService.getById(KyLuatId == 0 ? vm.data.objKyLuat.KyLuatId : KyLuatId).then(function (result) {
                    vm.data.objKyLuat = result.data.data;
                    if (result.data.data.HinhThuc == 1) vm.data.PhatTien = true;
                    if (result.data.data.HinhThuc == 2) {
                        vm.data.CanhCao = true;
                        $("#txtTienPhat").prop('disabled', true);
                        $("#txtBangChu").prop('disabled', true);
                    }
                    if (result.data.data.HinhThuc == 3) {
                        vm.data.Vanban = true;
                        $("#txtTienPhat").prop('disabled', true);
                        $("#txtBangChu").prop('disabled', true);
                    }
                    var ngay = result.data.data.Ngay.slice(0, 10).split('-');
                    result.data.data.Ngay = ngay[2] + '/' + ngay[1] + '/' + ngay[0];
                })
            } else {
                vm.data.PhatTien = true;
                vm.data.CanhCao = false;
                vm.data.Vanban = false;
                vm.data.listNhanVien = [];
                vm.data.objKyLuat = { HinhThuc: 1, Ngay: $filter('date')(new Date(), 'dd/MM/yyyy') };
            }
            setEnableButton();
        }
        function CheckCanhCao() {
            vm.data.objKyLuat.Tien = 0;
            vm.data.objKyLuat.BangChu = "";
            $("#txtTienPhat").prop('disabled', true);
            $("#txtBangChu").prop('disabled', true);
        }
        function CheckPhatTien() {
            $("#txtTienPhat").prop('disabled', false);
            $("#txtBangChu").prop('disabled', false);
        }
        function insert() {
            if (utility.checkInValid(vm.data.objKyLuat.HinhThuc, 'isEmpty')) {
                vm.data.objKyLuat.HinhThuc = 1;
                vm.data.PhatTien = true;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKyLuat.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById("txtNgay").focus();
                return;
            }
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            if (vm.status.isInValidNhanVien) {

                return;
            }
            if (vm.data.objKyLuat.HinhThuc == 1) {
                vm.status.isInValidTien = utility.checkInValid(vm.data.objKyLuat.Tien, 'isEmpty');
                if (vm.status.isInValidTien) {
                    $window.document.getElementById("txtTienPhat").focus();
                    return;
                }
            }

            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKyLuat.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById("txtLyDo").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objKyLuat.NguoiTao = vm.data.UserLoginId;
            vm.data.objKyLuat.NhanVienIds = NhanVienId;
            KyLuatService.insert(vm.data.objKyLuat).then(function (success) {
                if (success.data.result) {
                    KyLuatId = success.data.KyLuatId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                $('#popupThongTinKyLuat').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.kyluat.kyluat.reload');
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
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKyLuat.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $("#txtTienPhat").focus()
                $window.document.getElementById("txtNgay").focus();
                return;
            }
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            if (vm.status.isInValidNhanVien) {

                return;
            }
            if (vm.data.objKyLuat.HinhThuc == 1) {
                vm.status.isInValidTien = utility.checkInValid(vm.data.objKyLuat.Tien, 'isEmpty');
                if (vm.status.isInValidTien) {
                    $window.document.getElementById("txtTienPhat").focus();
                    return;
                }
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKyLuat.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById("txtLyDo").focus();
                return;
            }
            vm.status.isLoading = true;
            var ngay = vm.data.objKyLuat.Ngay.slice(0, 10).split('/');
            vm.data.objKyLuat.Ngay = ngay[2] + '-' + ngay[1] + '-' + ngay[0];
            vm.data.objKyLuat.NhanVienId = NhanVienId;
            KyLuatService.update(vm.data.objKyLuat).then(function (success) {
                vm.data.objKyLuat = success.data.data;
                $('#popupThongTinKyLuat').collapse('hide');
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('sa.qldnmain.kyluat.kyluat.reload');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgay') {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objKyLuat.Ngay, 'isEmpty');
                    if (!vm.status.isInValidNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNhanVien') {
                    var NhanVienId = joinStr($rootScope.NhanVien, "NhanVienId");
                    vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
                    if (!vm.status.isInValidNhanVien) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtTienPhat') {
                    vm.status.isInValidTien = utility.checkInValid(vm.data.objKyLuat.Tien, 'isEmpty');
                    if (!vm.status.isInValidTien) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtLyDo') {
                    vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKyLuat.LyDo, 'isEmpty');
                    if (!vm.status.isInValidLyDo) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        function resetEdit(id) {
            //set condition of has-error
            vm.status.isInValidNgay = false;
            vm.status.isInValid = false;
            vm.status.isInValidTien = false;
            vm.status.isInValidHinhThuc = false;
            vm.status.isInValidNhanVien = false;
            //
            getById(id);
        };
       
        function closeEdit() {

            //set condition of has-error
            vm.status.isInValidNgay = false;
            vm.status.isInValidTien = false;
            vm.status.isInValidHinhThuc = false;
            vm.status.isInValidNhanVien = false;
            // 
            KyLuatId = 0;
            $rootScope.isOpenPopup = false;
            vm.data.PhatTien = true;
            vm.data.objKyLuat.HinhThuc = 1;
            $("#txtTienPhat").prop('disabled', false);
            $("#txtBangChu").prop('disabled', false);
            $('#popupThongTinKyLuat').collapse("hide");
        }

        function save() {
            if (KyLuatId > 0 ) {
                update();
            } else {
                insert();
            }
        }

    }
})();
