(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhenThuongCaNhanEditCtrl', KhenThuongCaNhanEditCtrl)
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

    function KhenThuongCaNhanEditCtrl($rootScope, $scope, KhenThuongCaNhanService, utility, $window) {
        var controllerId = 'KhenThuongCaNhanEditCtrl';
        var KhenThuongCaNhanId = 0;
        var vm = this;

        vm.data = {
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objKhenThuongCaNhan: {
                NhanVienIds: '',
                HinhThuc: 1
            },
            error: {},
            TienThuong: true,
            BangKhen: false
        };
        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save(vm.data.objKhenThuongCaNhan);
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
            CheckBangKhen: CheckBangKhen,
            CheckTienThuong: CheckTienThuong
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
                    vm.data.showButtonSave = KhenThuongCaNhanId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhenThuongCaNhanId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        function activate() {
            $('#popupThongTinKhenThuongCaNhan').on('hidden.bs.collapse', function () {
                //$rootScope.isOpenPopup = false;
            });
            $('#popupThongTinKhenThuongCaNhan').on('shown.bs.collapse', function () {
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('KhenThuongCaNhanEditCtrl.KhenThuongCaNhanId', function (event, data) {
                KhenThuongCaNhanId = data;
                refresh();
            });
        }

        function initEventListener() {
            $scope.$on(controllerId + '.action.xemKhenThuongCaNhan', function (event, data) {
                KhenThuongCaNhanId = data;
                refresh();
            });
        }

        function refresh() {
            if (KhenThuongCaNhanId > 0) {
                vm.data.TienThuong = false;
                vm.data.BangKhen = false;
                KhenThuongCaNhanService.getById(KhenThuongCaNhanId == 0 ? vm.data.objKhenThuongCaNhan.KhenThuongCaNhanId : KhenThuongCaNhanId).then(function (result) {
                    vm.data.objKhenThuongCaNhan = result.data.data;
                    if (result.data.data.HinhThuc == 1) vm.data.TienThuong = true;
                    if (result.data.data.HinhThuc == 2) {
                        vm.data.BangKhen = true;
                        $("#txtMucHuong").prop('disabled', true);
                        $("#txtBangChu").prop('disabled', true);
                    }
                    $rootScope.$broadcast('NhanVienListCtrl.apDung', result.data.data.NhanVienId);
                    var ngay = result.data.data.Ngay.slice(0, 10).split('-');
                    result.data.data.Ngay = ngay[2] + '/' + ngay[1] + '/' + ngay[0];
                    
                })
            } else {
                vm.data.objKhenThuongCaNhan = { NhanVienIds: '' };
                vm.data.TienThuong = true;
                vm.data.BangKhen = false;
                $rootScope.$broadcast('NhanVienListCtrl.apDung', '');
                vm.data.objKhenThuongCaNhan.HinhThuc = 1;
            }
            setEnableButton();
        }
        function CheckBangKhen() {
            vm.data.objKhenThuongCaNhan.Tien = 0;
            vm.data.objKhenThuongCaNhan.BangChu = "";
            $("#txtMucHuong").prop('disabled', true);
            $("#txtBangChu").prop('disabled', true);
        }
        function CheckTienThuong() {

            $("#txtMucHuong").prop('disabled', false);
            $("#txtBangChu").prop('disabled', false);
        }
        function insert() {
            if (utility.checkInValid(vm.data.objKhenThuongCaNhan.HinhThuc, 'isEmpty')) {
                vm.data.objKhenThuongCaNhan.HinhThuc = 1;
                vm.data.TienThuong = true;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhenThuongCaNhan.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById("txtNgay").focus();
                return;
            }
            var NhanVienId = joinStr($rootScope.NhanVien2, "NhanVienId");
            vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            if (vm.status.isInValidNhanVien) {

                return;
            }
            if (vm.data.objKhenThuongCaNhan.HinhThuc == 1) {
                vm.status.isInValidTien = utility.checkInValid(vm.data.objKhenThuongCaNhan.Tien, 'isEmpty');
                if (vm.status.isInValidTien) {
                    $window.document.getElementById("txtMucHuong").focus();
                    return;
                }
            }

            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhenThuongCaNhan.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById("txtLyDo").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objKhenThuongCaNhan.NguoiTao = vm.data.UserLoginId;
            vm.data.objKhenThuongCaNhan.NhanVienIds = NhanVienId;
            KhenThuongCaNhanService.insert(vm.data.objKhenThuongCaNhan).then(function (success) {
                if (success.data.result) {
                    KhenThuongCaNhanId = success.data.KhenThuongCaNhanId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                $('#popupThongTinKhenThuongCaNhan').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.khenthuong.khenthuong.reload');
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
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhenThuongCaNhan.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $("#txtMucHuong").focus()
                $window.document.getElementById("txtNgay").focus();
                return;
            }
            var NhanVienId = joinStr($rootScope.NhanVien2, "NhanVienId");
            vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            if (vm.status.isInValidNhanVien) {

                return;
            }
            if (vm.data.objKhenThuongCaNhan.HinhThuc == 1) {
                vm.status.isInValidTien = utility.checkInValid(vm.data.objKhenThuongCaNhan.Tien, 'isEmpty');
                if (vm.status.isInValidTien) {
                    $window.document.getElementById("txtMucHuong").focus();
                    return;
                }
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhenThuongCaNhan.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById("txtLyDo").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objKhenThuongCaNhan.NhanVienId = NhanVienId;
            var ngay = vm.data.objKhenThuongCaNhan.Ngay.slice(0, 10).split('/');
            vm.data.objKhenThuongCaNhan.Ngay = ngay[2] + '-' + ngay[1] + '-' + ngay[0];
            KhenThuongCaNhanService.update(vm.data.objKhenThuongCaNhan).then(function (success) {
                vm.data.objKhenThuongCaNhan = success.data.data;
                $('#popupThongTinKhenThuongCaNhan').collapse('hide');
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('sa.qldnmain.khenthuong.khenthuong.reload');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgay') {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhenThuongCaNhan.Ngay, 'isEmpty');
                    if (!vm.status.isInValidNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtNhanVien') {
                    var NhanVienId = joinStr($rootScope.NhanVien, "NhanVienId");
                    vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
                    if (!vm.status.isInValidNhanVien) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtMucHuong') {
                    vm.status.isInValidTien = utility.checkInValid(vm.data.objKhenThuongCaNhan.Tien, 'isEmpty');
                    if (!vm.status.isInValidTien) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtLyDo') {
                    vm.status.isInValidLyDo = utility.checkInValid(vm.data.objKhenThuongCaNhan.LyDo, 'isEmpty');
                    if (!vm.status.isInValidLyDo) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtBangKhen') {
                    vm.status.isInValidHinhThuc = utility.checkInValid(vm.data.objKhenThuongCaNhan.HinhThuc, 'isEmpty');
                    if (!vm.status.isInValidHinhThuc) {
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
            //
            getById(id);
        };

        function closeEdit() {

            //set condition of has-error
            vm.status.isInValidNgay = false;
            vm.status.isInValidNhanVien = false;
            vm.status.isInValidTien = false;
            vm.status.isInValidHinhThuc = false;
            // 
            KhenThuongCaNhanId = 0;
            $rootScope.isOpenPopup = false;
            vm.data.TienThuong = true;
            vm.data.objKhenThuongCaNhan.HinhThuc = 1;
            $("#txtMucHuong").prop('disabled', false);
            $("#txtBangChu").prop('disabled', false);
            $('#popupThongTinKhenThuongCaNhan').collapse("hide");
        }

        function save() {
            if (KhenThuongCaNhanId > 0) {
                update();
            } else {
                insert();
            }
        }
    }
})();
