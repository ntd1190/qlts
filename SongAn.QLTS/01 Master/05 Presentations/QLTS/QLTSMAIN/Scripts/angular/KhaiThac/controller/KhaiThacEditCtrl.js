

(function () {
    'use strict';

    angular.module('app')
        .controller('KhaiThacEditCtrl', controller)

    function controller($rootScope, $scope, KhaiThacService, $window, utility, $timeout) {

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
            objKhaiThac: {},
            objKhaiThac_Old: {},
            isEdit: false,
            KhaiThacId: 0
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
            resetNhanVienId: resetNhanVienId,
            nhanVienByPhongBanSelected: nhanVienByPhongBanSelected
        };

        vm.validate = {
            SoChungTu: false,
            MaTaiSan: false,
            TaiSanId: false,
            SoLuongKhaiThac: false,
            DonGiaKhaiThac: false,
            ThoiGianBatDau: false,
            ThoiGianKetThuc: false,
            TienThu: false,
            NopNganSach: false,
            DonVi: false,
            TienThu: false
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
                    vm.data.showButtonSave = vm.data.KhaiThacId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.KhaiThacId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }

        function activate() {
            $('#KhaiThacEditPopup').on('hidden.bs.collapse', function () {
                reset();
                //getById();
                $rootScope.isOpenPopup = false;

            });

            $('#KhaiThacEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtSoChungTu').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('KhaiThacEditCtrl.KhaiThacId', function (event, data) {
                vm.data.KhaiThacId = data.KhaiThacId;
                vm.data.objKhaiThac.ThoiGianBatDau = moment().format('DD/MM/YYYY');
                vm.data.objKhaiThac.ThoiGianKetThuc = moment().format('DD/MM/YYYY');
                refresh();
                setEnableButton();
                getById();
            });

        }        

        function getDataTaiSan(data) {
            console.log(data);
            
            vm.data.objKhaiThac.TaiSanId = data.TaiSanId;
            vm.data.objKhaiThac.MaTaiSan = data.MaTaiSan;
            vm.data.objKhaiThac.DonViTinh = data.DonViTinh;
            vm.data.objKhaiThac.PhongBanId = data.PhongBanId;
            vm.data.objKhaiThac.TenPhongBan = data.TenPhongBan;
            vm.data.objKhaiThac.NhanVienIdKT = data.NhanVienId;
            vm.data.objKhaiThac.SoLuongTon = data.SoLuongTon;
        }

        function resetNhanVienId(data) {
            console.log(data);
            vm.data.objKhaiThac.PhongBanId = data.PhongBanId;
            vm.data.objKhaiThac.NhanVienId = 0;
        }

        function nhanVienByPhongBanSelected(data) {
            console.log(data);
            vm.data.objKhaiThac.NhanVienId = data.NhanVienId;
        }



        function save() {
            var obj = InvalidateData();
            if (obj == null)
                return;

            if (vm.data.KhaiThacId > 0) {
                edit();
            } else {
                add();
            }
        }

        function edit() {

            vm.status.isLoading = true;
            KhaiThacService.update(vm.data.objKhaiThac, vm.data.objKhaiThac_Old).then(function (success) {
                if (success.data.data) {

                    if (parseInt(success.data.data[0].ID) < 0) {
                        utility.AlertError('Phiếu này đã có người thay đổi thông tin. Cập nhật thất bại!');
                    }
                    else {
                        utility.AlertSuccess('Cập nhật thành công');
                    }
                    $rootScope.$broadcast('sa.qltsmain.KhaiThac.KhaiThac.reload');
                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;
            $('#KhaiThacEditPopup').collapse('hide');

        }

        function add() {

            vm.status.isLoading = true;
            vm.data.objKhaiThac.CoSoId = vm.data.CoSoId;
            vm.data.objKhaiThac.NguoiTao = vm.data.UserLoginId;
            KhaiThacService.insert(vm.data.objKhaiThac).then(function (success) {
                if (success.data.data) {
                    if (parseInt(success.data.data[0].ID) < 0) {
                        utility.AlertError('Tài sản của phòng ban nay đã được sử dụng. Thêm thất bại!');
                    }
                    else {
                        utility.AlertSuccess('Khai thác thành công');
                    }
                }

                $rootScope.$broadcast('sa.qltsmain.KhaiThac.KhaiThac.reload');

            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
            vm.status.isLoading = false;
            $('#KhaiThacEditPopup').collapse('hide');
        }

        function InvalidateData() {
            var obj = vm.data.objKhaiThac;
            console.log(vm.data.objKhaiThac);

            vm.validate.SoChungTu = utility.checkInValid(obj.SoChungTu, 'isEmpty');
            if (vm.validate.SoChungTu) {
                $("#txtSoChungTu").focus();
                return null;
            }

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
            vm.validate.KhachHangNCCId = utility.checkInValid(obj.KhachHangNCCId, 'isEmpty');
            if (vm.validate.KhachHangNCCId) {
                $("#cbxKhachHang").find('input').focus();
                return null;
            }
            vm.validate.SoLuongKhaiThac = utility.checkInValid(obj.SoLuongKhaiThac, 'isEmpty');
            if (vm.validate.SoLuongKhaiThac) {
                $("#txtSoLuongKhaiThac").focus();
                return null;
            }
            //vm.validate.DonGiaKhaiThac = utility.checkInValid(obj.DonGiaKhaiThac, 'isEmpty');
            if (obj.DonGiaKhaiThac === "")
                vm.validate.DonGiaKhaiThac = true;
            if (vm.validate.DonGiaKhaiThac) {
                $("#txtDonGiaKhaiThac").focus();
                return null;
            }
            vm.validate.ThoiGianBatDau = utility.checkInValid(obj.ThoiGianBatDau, 'isEmpty');
            if (vm.validate.ThoiGianBatDau) {
                $("#txtThoiGianBatDau").focus();
                return null;
            }
            vm.validate.ThoiGianKetThuc = utility.checkInValid(obj.ThoiGianKetThuc, 'isEmpty');
            if (vm.validate.ThoiGianKetThuc) {
                $("#txtThoiGianKetThuc").focus();
                return null;
            }
            
            if (obj.SoLuongKhaiThac > obj.SoLuongTon) {
                vm.validate.SoLuongKhaiThac = true;
                $("#txtSoLuongKhaiThac").focus();
                utility.AlertError('Tài sản của phòng ban này không đủ khai thác. Cập nhật thất bại!');
                return null;
            }

            if (obj.TienThu > obj.SoLuongKhaiThac * obj.DonGiaKhaiThac) {
                $("#txtTienThu").focus();
                utility.AlertError('Số tiền thu không hợp lệ!');
                return null;
            }

            if (obj.TienThu < obj.NopNganSach) {
                $("#txtNopNganSach").focus();
                utility.AlertError('Số tiền nộp ngân sách vượt quá số tiền thu!');
                return null;
            }

            if (obj.TienThu < obj.DonVi) {
                $("#txtDonVi").focus();
                utility.AlertError('Số tiền giữ lại đơn vị vượt quá số tiền thu!');
                return null;
            }

            if (obj.TienThu < obj.DonVi + obj.NopNganSach) {
                $("#txtNopNganSach").focus();
                utility.AlertError('Tổng số tiền giữ lại đơn vị và nộp ngân sách vượt quá số tiền thu!');
                return null;
            }

            return 1;
        }

        //$scope.$watchGroup([
        //   'vm.data.objKhaiThac.TienThu'
        //], function () {
            
        //})

        function myChangeTienThu() {
            vm.data.objKhaiThac.TienThu = vm.data.objKhaiThac.SoLuongKhaiThac * vm.data.objKhaiThac.DonGiaKhaiThac;
        }

        function reset() {
            delete vm.data.objKhaiThac;
            vm.data.objKhaiThac = {};
            vm.data.objKhaiThac.TaiSanId = 0;
            vm.data.objKhaiThac.PhongBanId = 0;
            vm.data.objKhaiThac.NhanVienIdKT = 0;
            vm.data.objKhaiThac.DonGiaKhaiThac = 0;
            vm.data.objKhaiThac.SoLuongKhaiThac = 0;
            vm.data.objKhaiThac.TienThu = 0;
            vm.data.objKhaiThac.NopNganSach = 0;
            vm.data.objKhaiThac.DonVi = 0;

            vm.data.objKhaiThac.ThoiGianBatDau = moment().format('DD/MM/YYYY');
            vm.data.objKhaiThac.ThoiGianKetThuc = moment().format('DD/MM/YYYY');

            vm.data.KhaiThacId = 0;
        }

        function refresh() {

            $("#txtSoChungTu").focus();
            getById();
            vm.validate.SoChungTu = false;
            vm.validate.MaTaiSan = false;
            vm.validate.TaiSanId = false;
            vm.validate.SoLuongKhaiThac = false;
            vm.validate.DonGiaKhaiThac = false;
            vm.validate.ThoiGianBatDau = false;
            vm.validate.ThoiGianKetThuc = false;
            vm.validate.TienThu = false;
            vm.validate.NopNganSach = false;
            vm.validate.DonVi = false;
            vm.validate.TienThu = false;
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
                if (fromId == 'txtSoChungTu') {
                    vm.validate.SoChungTu = utility.checkInValid(vm.data.objKhaiThac.SoChungTu, 'isEmpty');
                    if (vm.validate.SoChungTu) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtSoLuongKhaiThac') {
                    vm.validate.SoLuongKhaiThac = utility.checkInValid(vm.data.objKhaiThac.SoLuongKhaiThac, 'isEmpty');
                    if (vm.validate.SoLuongKhaiThac) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtDonGiaKhaiThac') {
                    //vm.validate.DonGiaKhaiThac = utility.checkInValid(vm.data.objKhaiThac.DonGiaKhaiThac, 'isEmpty');
                    if (vm.data.objKhaiThac.DonGiaKhaiThac === "")
                        vm.validate.DonGiaKhaiThac = true;
                    if (vm.validate.DonGiaKhaiThac) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtThoiGianBatDau') {
                    vm.validate.ThoiGianBatDau = utility.checkInValid(vm.data.objKhaiThac.ThoiGianBatDau, 'isEmpty');
                    if (vm.validate.ThoiGianBatDau) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtThoiGianKetThuc') {
                    vm.validate.ThoiGianKetThuc = utility.checkInValid(vm.data.objKhaiThac.ThoiGianKetThuc, 'isEmpty');
                    if (vm.validate.ThoiGianKetThuc) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtMaTaiSan') {
                    vm.validate.MaTaiSan = utility.checkInValid(vm.data.objKhaiThac.MaTaiSan, 'isCode');
                    if (vm.validate.MaTaiSan) {
                        $("#txtMaTaiSan").focus();
                    } else {
                        vm.data.objKhaiThac.TempMaTaiSan = value;
                        $timeout(function () {
                            if (vm.data.objKhaiThac.TaiSanId > 0) {
                                $("#" + ToId).find('input').focus();
                            }
                        }, 100);
                    }
                }
                else $("#" + ToId).focus();
            }
        }

        function close() {
            reset();
            $('#KhaiThacEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }

        function getById() {
            var data = {};
            data.KhaiThacId = vm.data.KhaiThacId;

            if (vm.data.KhaiThacId > 0) {
                vm.status.isLoading = true;
                KhaiThacService.GetById(data).then(function (success) {
                    if (success.data) {
                        vm.data.objKhaiThac = success.data.data[0];
                        vm.data.objKhaiThac_Old = angular.copy(success.data.data[0]);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                reset();
            }
        }
    }
})();