(function () {
    'use strict';

    angular.module('app')
        .controller('TheoDoiEditCtrl', controller)

    function controller($rootScope, $scope, TheoDoiService, $window, utility, $timeout) {
        var TaiSanId = 0;
        var PhongBanId = 0;
        var NhanVienId = 0;

        var vm = this;

        vm.status = {
            isLoading: false,
        };

        vm.data = {
            UserLoginId: '',
            CoSoId: '',
            PhongBan: {},
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objTheoDoi: {},
            objTheoDoi_Old: {},
            isEdit: false,
            TaiSanId : 0,
            PhongBanId : 0,
            NhanVienId: 0
        };

        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save();
                }
            }
        };
        //HOT-KEY

        vm.action = {
            save: save,
            refresh: refresh,
            close: close,
            keyPress: keyPress,
            getDataTaiSan: getDataTaiSan,
            resetNhanVienId: resetNhanVienId
        };

        vm.validate = {
            MaTaiSan : false,
            TaiSanId : false,
            NgayGhiTang : false,
            NgayTrangCap : false,
            NgayBatDauSuDung : false,
            PhongBanId : false,
            NhanVienId : false,
            SLTon : false
        }

        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                vm.data.CoSoId = ctrlId.userInfo.CoSoId;
                setEnableButton();
            }
        }

        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = TaiSanId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = TaiSanId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }

        function activate() {
            $('#TheoDoiEditPopup').on('hidden.bs.collapse', function () {
                reset();
                //getById();
                $rootScope.isOpenPopup = false;

            });

            $('#TheoDoiEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMaTaiSan').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('TheoDoiEditCtrl.TheoDoiId', function (event, data) {
                vm.data.TaiSanId = data.taiSanId;
                vm.data.PhongBanId = data.phongBanId;
                vm.data.NhanVienId = data.nhanVienId;
                refresh();
                setEnableButton();
                getById();
            });
            
        }

        function getDataTaiSan(data) {
            console.log(data);

            vm.data.objTheoDoi.TaiSanId = data.TaiSanId;
            vm.data.objTheoDoi.MaTaiSan = data.MaTaiSan;
        }

        function resetNhanVienId(data) {
            console.log(data);

            vm.data.objTheoDoi.NhanVienId = 0;
        }

        function save() {
            var obj = InvalidateData();
            if (obj == null)
                return;

            if (vm.data.TaiSanId > 0 &&
                vm.data.PhongBanId > 0 &&
                vm.data.NhanVienId > 0) {
                edit();
            } else {                
                add();
            }
        }

        function edit() {            

            vm.status.isLoading = true;
            TheoDoiService.update(vm.data.objTheoDoi, vm.data.objTheoDoi_Old).then(function (success) {
                if (success.data.data) {

                    if (parseInt(success.data.data[0].ID) < 0) {
                        utility.AlertError('Cập nhật thất bại!');
                    }
                    else {
                        utility.AlertSuccess('Cập nhật thành công');
                    }
                    $rootScope.$broadcast('sa.qltsmain.TheoDoi.TheoDoi.reload');
                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;
            $('#TheoDoiEditPopup').collapse('hide');

        }

        function add() {
            
            vm.status.isLoading = true;
            vm.data.objTheoDoi.CoSoId = vm.data.CoSoId;
            vm.data.objTheoDoi.NguoiTao = vm.data.UserLoginId;
            TheoDoiService.insert(vm.data.objTheoDoi).then(function (success) {
                if (success.data.data) {
                    if (parseInt(success.data.data[0].ID) < 0) {
                        utility.AlertError('Tài sản của phòng ban nay đã tồn tại. Thêm thất bại!');
                    }
                    else {
                        utility.AlertSuccess('Khai báo thành công');
                    }
                }
                
                $rootScope.$broadcast('sa.qltsmain.TheoDoi.TheoDoi.reload');

            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
            vm.status.isLoading = false;
            $('#TheoDoiEditPopup').collapse('hide');
        }

        function InvalidateData() {
            var obj = vm.data.objTheoDoi;

            vm.validate.MaTaiSan = utility.checkInValid(obj.MaTaiSan, 'isEmpty');
            if (vm.validate.MaTaiSan) {
                $("#txtMaTaiSan").focus();
                return null;
            }
            vm.validate.TaiSanId = utility.checkInValid(obj.TaiSanId, 'isEmpty');
            if (vm.validate.TaiSanId) {
                $("#cbxTaiSan").find('input').focus();
                return null;
            }
            vm.validate.NgayGhiTang = utility.checkInValid(obj.NgayGhiTang, 'isEmpty');
            if (vm.validate.NgayGhiTang) {
                $("#txtngayghitang").focus();
                return null;
            }
            vm.validate.NgayTrangCap = utility.checkInValid(obj.NgayTrangCap, 'isEmpty');
            if (vm.validate.NgayTrangCap) {
                $("#txtngaytrangcap").focus();
                return null;
            }
            vm.validate.NgayBatDauSuDung = utility.checkInValid(obj.NgayBatDauSuDung, 'isEmpty');
            if (vm.validate.NgayBatDauSuDung) {
                $("#txtngaybatdausudung").focus();
                return null;
            }
            vm.validate.PhongBanId = utility.checkInValid(obj.PhongBanId, 'isEmpty');
            if (vm.validate.PhongBanId) {
                $("#cbxPhongBan").find('input').focus();
                return null;
            }
            vm.validate.NhanVienId = utility.checkInValid(obj.NhanVienId, 'isEmpty');
            if (vm.validate.NhanVienId) {
                $("#cbxNhanVien").find('input').focus();
                return null;
            }
            vm.validate.SLTon = utility.checkInValid(obj.SLTon, 'isEmpty');
            if (vm.validate.SLTon) {
                $("#txtSLTon").focus();
                return null;
            }

            return 1;
        }

        function reset() {
            delete vm.data.objTheoDoi;
            vm.data.objTheoDoi = {};
            vm.data.objTheoDoi.TaiSanId = 0;
            vm.data.objTheoDoi.PhongBanId = 0;
            vm.data.objTheoDoi.NhanVienId = 0;

            vm.data.objTheoDoi.NgayGhiTang = moment().format('DD/MM/YYYY');
            vm.data.objTheoDoi.NgayTrangCap = moment().format('DD/MM/YYYY');
            vm.data.objTheoDoi.NgayBatDauSuDung = moment().format('DD/MM/YYYY');

            vm.data.TaiSanId = 0;
            vm.data.PhongBanId = 0;
            vm.data.NhanVienId = 0;
        }

        function refresh() {

            $("#txtMaTaiSan").focus();
            vm.validate.MaTaiSan = false;
            vm.validate.TaiSanId = false;
            vm.validate.NgayGhiTang = false;
            vm.validate.NgayTrangCap = false;
            vm.validate.NgayBatDauSuDung = false;
            vm.validate.PhongBanId = false;
            vm.validate.NhanVienId = false;
            vm.validate.SLTon = false;
        }

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
                            scope.$apply(function () {
                                keyDown.callback(keyDown.name, event.keyCode);
                            })
                        }
                    });
                }
            }
        }
        function keyPress(value, fromId, ToId, event) {


            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaTaiSan') {
                    vm.validate.MaTaiSan = utility.checkInValid(vm.data.objTheoDoi.MaTaiSan, 'isCode');
                    if (vm.validate.MaTaiSan) {
                        $("#txtMaTaiSan").focus();
                    } else {
                        vm.data.objTheoDoi.TempMaTaiSan = value;
                        $timeout(function () {
                            if (vm.data.objTheoDoi.TaiSanId > 0) {
                                $("#" + ToId).focus();
                            }
                        }, 100);
                    }
                }
                else if (fromId == 'txtngaybatdausudung') {
                    vm.validate.NgayBatDauSuDung = utility.checkInValid(vm.data.objTheoDoi.NgayBatDauSuDung, 'isEmpty');
                    if (vm.validate.NgayBatDauSuDung) {
                        $("#txtngaybatdausudung").focus();
                    } else {
                        $("#" + ToId).find('input').focus();
                    }
                }
                else $("#" + ToId).focus();
            }
        }

        function close() {
            reset();
            $('#TheoDoiEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }

        function getById() {
            var data = {};
            data.taiSanId = vm.data.TaiSanId;
            data.phongBanId = vm.data.PhongBanId;
            data.nhanVienId = vm.data.NhanVienId;

            if (vm.data.TaiSanId > 0 && vm.data.NhanVienId > 0 && vm.data.PhongBanId > 0) {
                vm.status.isLoading = true;
                TheoDoiService.GetById(data).then(function (success) {
                    if (success.data) {
                        vm.data.objTheoDoi = success.data.data[0];
                        vm.data.objTheoDoi_Old = angular.copy(success.data.data[0]);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                reset();
            }
        }
    }
})();