(function () {
    'use strict';

         angular.module('app')
        .controller('KeHoachMuaSamEditCtrl', controller)
    function controller($rootScope, $scope, KeHoachMuaSamService, $window, utility,$timeout) {
        var MuaSamId = 0;
        var vm = this;
        vm.status = {
            isLoading: false,
            isInValidNam: false,
        };
        vm.data = {
            UserLoginId: '',
            CoSoId: '',
            showButtonXoa: false,
            showButtonSave: false,
            Tilte : 'Thêm',
            listQuyenTacVu: [],
            objKeHoachMuaSam: {Nam:moment().format('YYYY')},
            listChiTiet: [{ TenTaiSan: '', LoaiId: 0, PhuongThucId: 0, DonViTinh: '', MoTa: '', Ngay: moment().format('DD/MM/YYYY'), SoLuong: 0, DonGia: 0, HinhThucId: 0, DuToan: 0, GhiChu: '' }],
            isEdit: false
        };
        //HOT-KEY       
        vm.keys = {
            
            //press F2 -> open popup
            F2: function (name, code) {
                InsertChiTiet();
            },
            F8: function (name, code) {
                if (vm.data.showButtonSave) {
                    save();
                }
            }
        };
        //HOT-KEY
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            keyPressChiTiet:keyPressChiTiet,
            InsertChiTiet: InsertChiTiet,
            DeleteChiTiet: DeleteChiTiet,
            deleteSelected: deleteSelected
        };
        vm.action.goBack = function () {
            window.history.back();
        };
        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                vm.data.CoSoId = ctrlId.userInfo.CoSoId;
                setEnableButton();
            }
            if (ctrlId && ctrlId.MuaSamId) {
                MuaSamId = ctrlId.MuaSamId;
                getById(MuaSamId);
                vm.data.Tilte = "Sửa";
            }
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = MuaSamId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = MuaSamId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {

            $scope.$on('KeHoachMuaSamEditCtrl.MuaSamId', function (event, data) {
                MuaSamId = data;
                refresh();
                setEnableButton();
            });
        }
        function save() {
            if (vm.data.objKeHoachMuaSam.MuaSamId > 0) {
                edit();
            } else {
                add();
            }
        }
       
        function edit() {
            vm.status.isInValidNam = utility.checkInValid(vm.data.objKeHoachMuaSam.Nam, 'isCode');
            if (vm.status.isInValidNam) {
                $("#txtNam").focus();
                return;
            }
            var kehoachmuasam = utility.clone(vm.data.objKeHoachMuaSam);
            var data = {};
            data.kehoachmuasam = angular.toJson(kehoachmuasam);
            data.kehoachmuasamchitiet = angular.toJson(vm.data.listChiTiet);
            data.NguoiTao = vm.data.UserLoginId;
            data.CoSoId = vm.data.CoSoId;
            utility.addloadding($('body'));

            vm.status.isLoading = true;
            KeHoachMuaSamService.update(data).then(function (success) {
                if (success.data.data) {
                    utility.removeloadding();
                    utility.AlertSuccess("Cập nhật thành công");
                    MuaSamId = success.data.data.MuaSamId;
                    vm.data.objKeHoachMuaSam = success.data.data;
                    vm.data.objKeHoachMuaSam.Nam = success.data.data.Nam + "";
                }

            }, function (error) {
                utility.removeloadding();
                utility.AlertError('Không thể cập nhật');
            });
            vm.status.isLoading = false;
            $('#KeHoachMuaSamEditPopup').collapse('hide');
        }
        function add() {
            vm.status.isInValidNam = utility.checkInValid(vm.data.objKeHoachMuaSam.Nam, 'isCode');
            if (vm.status.isInValidNam) {
                $("#txtNam").focus();
                return;
            }
            checkList();
            var kehoachmuasam = utility.clone(vm.data.objKeHoachMuaSam);
            var data = {};
            data.kehoachmuasam = angular.toJson(kehoachmuasam);
            data.kehoachmuasamchitiet = angular.toJson(vm.data.listChiTiet);
            data.NguoiTao = vm.data.UserLoginId;
            data.CoSoId = vm.data.CoSoId;
            utility.addloadding($('body'));
            KeHoachMuaSamService.insert(data).then(function (success) {
                if (success.data) {
                    MuaSamId = success.data.data.MuaSamId;
                    utility.removeloadding();
                    utility.AlertSuccess("Thêm thành công");
                    $timeout(function () {
                        window.location = '/QLTSMAIN/kehoachmuasam/edit/' + MuaSamId;
                    }, 2000);
                   
                }
                vm.status.isLoading = false;
            }, function (error) {
                if (error.data.error) {
                    utility.removeloadding();
                    utility.AlertError('Không thể thêm');
                }
                vm.status.isLoading = false;
            });
        }
        function checkList() {
            var hasError = false;
            if (!vm.data.listChiTiet || vm.data.listChiTiet.length === 0) { return true; }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (!vm.data.listChiTiet[index].TenTaiSan || !vm.data.listChiTiet[index].LoaiId || !vm.data.listChiTiet[index].PhuongThucId || !vm.data.listChiTiet[index].DonViTinh || !vm.data.listChiTiet[index].SoLuong || !vm.data.listChiTiet[index].DonGia || !vm.data.listChiTiet[index].HinhThucId) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                }
                else {
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return !hasError;
        }
        function refresh() {
            $("#txtNam").focus();
            getById(MuaSamId);
            vm.status.isInValidNam = false;
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
        function keyPress(value,fromId, ToId, event) {


            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNam') {
                    vm.status.isInValidNam = utility.checkInValid(vm.data.objKeHoachMuaSam.Nam, 'isCode');
                    if (vm.status.isInValidNam) {
                        $("#txtNam").focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();


            }
        }
        function keyPressChiTiet( fromId, ToId, event) {

            if (event.keyCode == '13') {
                if (fromId.indexOf('txtTenTaiSan') >= 0)
                {
                    $("#" + ToId).find('input').focus();
                }
                else{$("#" + ToId).focus();}

            }
        }
        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }
            vm.data.isLoading = true;
            var KeHoachMuaSamSelected = new Array();
            KeHoachMuaSamSelected.push(vm.data.objKeHoachMuaSam.MuaSamId);
            var ids = KeHoachMuaSamSelected.join(',');
            if (ids.length > 0) {
                KeHoachMuaSamService.removeList(ids).then(function (success) {
                    utility.AlertSuccess('Xóa thành công!');
                    window.location = '/QLTSMAIN/kehoachmuasam/list';
                }, function (error) {
                    vm.data.isLoading = false;
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');

            }



        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                KeHoachMuaSamService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objKeHoachMuaSam = success.data.data;
                        vm.data.objKeHoachMuaSam.Nam = success.data.data.Nam + "";
                        getPageChiTiet(vm.data.objKeHoachMuaSam.MuaSamId);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objKeHoachMuaSam = {};
            }
        }
        function getPageChiTiet(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                KeHoachMuaSamService.getPageChiTiet(id).then(function (success) {
                    if (success.data) {
                        delete vm.data.listChiTiet;
                        vm.data.listChiTiet = success.data.data;
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.listChiTiet = [];
            }
        }
        function InsertChiTiet() {
            var chitiet = {};
            chitiet.TenTaiSan = '';
            chitiet.LoaiId = 0;
            chitiet.PhuongThucId = 0;
            chitiet.DonViTinh = '';
            chitiet.MoTa = '';
            chitiet.Ngay = moment().format('DD/MM/YYYY');
            chitiet.SoLuong = 0;
            chitiet.DonGia = 0;
            chitiet.HinhThucId = 0;
            chitiet.DuToan = 0;
            chitiet.GhiChu = '';
            vm.data.listChiTiet.push(chitiet);
            $timeout(function () {
                document.getElementById("txtTenTaiSan" + (vm.data.listChiTiet.length - 1)).focus();
                jQuery("#txtNgay" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
            }, 100);
            
        }
        function DeleteChiTiet(i) {
                vm.data.listChiTiet.splice(i, 1);   
          
        }
       
    }
})();