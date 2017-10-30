(function () {
    'use strict';

    angular.module('app')
        .controller('NhanVienEditCtrl', controller)

    function controller($rootScope, $scope, NhanVienService, $window, utility) {
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
            objNhanVien: {},
            isEdit: false,
            listBoPhan : []
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
            keyPress: keyPress
        };

        vm.validate = {
            MaNhanVien: false,
            TenNhanVien: false,
            PhongBan: false
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
                    vm.data.showButtonSave = NhanVienId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = NhanVienId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#NhanVienEditPopup').on('hidden.bs.collapse', function () {
                NhanVienId = 0;
                getById(NhanVienId);
                $rootScope.isOpenPopup = false;

            });

            $('#NhanVienEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('NhanVienEditCtrl.NhanVienId', function (event, data) {
                NhanVienId = data;
                refresh();
                setEnableButton();
            });
            $scope.$on('NhanVienEditCtrl.action.SelectData', function (event, data) {
                vm.data.PhongBan = data;
                vm.data.objNhanVien.PhongBanId = joinStr(vm.data.PhongBan, "PhongBanId");
            });
        }

        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    list.push(array[i][property]);
                }

                result = list.join(',');
            } else result = result || '';

            return result;
        }

        function save() {
            if (vm.data.objNhanVien.NhanVienId > 0) {
                edit();
            } else {
                vm.validate.MaNhanVien = false;
                vm.validate.TenNhanVien = false;
                vm.validate.PhongBan = false;
                add();
            }
        }

        function edit() {
            vm.validate.MaNhanVien = utility.checkInValid(vm.data.objNhanVien.MaNhanVien, 'isCode');
            if (vm.status.MaNhanVien) {
                $("#txtMa").focus();
                return;
            }
            vm.validate.TenNhanVien = utility.checkInValid(vm.data.objNhanVien.TenNhanVien, 'isEmpty');
            if (vm.validate.TenNhanVien) {
                $("#txtTen").focus();
                return;
            }
            vm.validate.PhongBan = utility.checkInValid(vm.data.objNhanVien.PhongBanId, 'isEmpty');
            if (vm.validate.PhongBan) {
                $("#cbxPhongBan").find('input').focus();
                return;
            }
           
            vm.status.isLoading = true;
            var nhanVien = utility.clone(vm.data.objNhanVien);
            var data = {};
            data.nhanVien = angular.toJson(nhanVien);
            data.phongBanId = vm.data.objNhanVien.PhongBanId;
            data.coSoId = vm.data.CoSoId;
            NhanVienService.update(data).then(function (success) {
                if (success.data.data) {
                    vm.data.objNhanVien = success.data.data;
                    utility.AlertSuccess('Cập nhật thành công!');
                    $rootScope.$broadcast('sa.qltsmain.NhanVien.NhanVien.reload');
                }
               
            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
             vm.status.isLoading = false;
                $('#NhanVienEditPopup').collapse('hide');
               
        }

        function add() {
            vm.validate.MaNhanVien = utility.checkInValid(vm.data.objNhanVien.MaNhanVien, 'isCode');
            if (vm.validate.MaNhanVien) {
                $("#txtMa").focus();
                return; 
            }
            vm.validate.TenNhanVien = utility.checkInValid(vm.data.objNhanVien.TenNhanVien, 'isEmpty');
            if (vm.validate.TenNhanVien) {
                $("#txtTen").focus();
                return;
            }
            vm.validate.PhongBan = utility.checkInValid(vm.data.objNhanVien.PhongBanId, 'isEmpty');
            if (vm.validate.PhongBan) {
                $("#cbxPhongBan").find('input').focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objNhanVien.CoSoId = vm.data.CoSoId;
            vm.data.objNhanVien.NguoiTao = vm.data.UserLoginId;
            var nhanVien = utility.clone(vm.data.objNhanVien);
            var data = {};
            data.nhanVien = angular.toJson(nhanVien);
            data.phongBanId = vm.data.objNhanVien.PhongBanId;
            data.coSoId = vm.data.CoSoId;
            NhanVienService.insert(data).then(function (success) {
                if (success.data.data) {
                    NhanVienId = success.data.data[0].NhanVienIdI;
                    utility.AlertSuccess('Thêm thành công!');
                }
                vm.status.isLoading = false;
                $('#NhanVienEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.NhanVien.NhanVien.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtMa").focus();
            getById(NhanVienId);
            vm.validate.MaNhanVien = false;
            vm.validate.TenNhanVien = false;
            vm.validate.PhongBan = false;
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
                if (fromId == 'txtMa')
                {
                    vm.validate.MaNhanVien = utility.checkInValid(vm.data.objNhanVien.MaNhanVien, 'isCode');
                    if (vm.validate.MaNhanVien) {
                        $("#txtMa").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen')
                {
                    vm.validate.TenNhanVien = utility.checkInValid(vm.data.objNhanVien.TenNhanVien, 'isEmpty');
                    if (vm.validate.TenNhanVien) {
                        $("#txtTen").focus();
                    } else
                    {
                        $("#" + ToId).find('input').focus();
                    }
                   
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#NhanVienEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                NhanVienService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objNhanVien = success.data.data[0];

                        var PhongbanSelected = [];
                        for (var index = 0; index < success.data.data.length; index++) {
                            //vm.data.PhongBan = { PhongBanId: vm.data.objNhanVien.PhongBanId, MaPhongBan: vm.data.objNhanVien.MaPhongBan, TenPhongBan: vm.data.objNhanVien.TenPhongBan };
                            vm.data.PhongBan = { PhongBanId: success.data.data[index].PhongBanId, MaPhongBan: success.data.data[index].MaPhongBan, TenPhongBan: success.data.data[index].TenPhongBan };
                            PhongbanSelected.push(vm.data.PhongBan);
                        }
                        
                        $rootScope.$broadcast('NhanVienEditCtrl.action.loadData', PhongbanSelected);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objNhanVien = {};
                $rootScope.$broadcast('NhanVienEditCtrl.action.clearData');
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objNhanVien.MaNhanVien || vm.data.objNhanVien.MaNhanVien == '') {
                hasError = true;
                $("#txtMa").focus();
                vm.validate.MaNhanVien = true;
                return hasError;
            }
            if (!vm.data.objNhanVien.TenNhanVien || vm.data.objNhanVien.TenNhanVien == '') {
                hasError = true;
                vm.validate.TenNhanVien = true;
                $("#txtTen").focus();
                return hasError;
            }
            
            return hasError;
        }

       
    }
})();