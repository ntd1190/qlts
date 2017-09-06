(function () {
    'use strict';

    angular.module('app')
        .controller('KhoNuocSanXuatEditCtrl', controller)

    function controller($rootScope, $scope, KhoNuocSanXuatService, $window, utility) {
        var KhoNuocSanXuatId = 0;

        var vm = this;

        vm.status = {
            isLoading: false,
            isInValidMa: false,
            isInValidTen: false
        };

        vm.data = {
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objKhoNuocSanXuat: {},
            isEdit: false
        };
        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup) {
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
            MaNuoc: '',
            TenNuoc: ''
        }
        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
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
                    vm.data.showButtonSave = KhoNuocSanXuatId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoNuocSanXuatId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#KhoNuocSanXuatEditPopup').on('hidden.bs.collapse', function () {
                debugger
                KhoNuocSanXuatId = 0;
                getById(KhoNuocSanXuatId);
                $rootScope.isOpenPopup = false;
            });

            $('#KhoNuocSanXuatEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('KhoNuocSanXuatEditCtrl.KhoNuocSanXuatId', function (event, data) {
                KhoNuocSanXuatId = data;
                refresh();
                setEnableButton();
            });
        }

        function save() {
            if (vm.data.objKhoNuocSanXuat.NuocSanXuatId > 0) {
                edit();
            } else {
                vm.validate.MaNuoc = '';
                vm.validate.TenNuoc = '';
                add();
            }
        }

        function edit() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNuocSanXuat.MaNuoc, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaNuoc = '........';
                return;
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objKhoNuocSanXuat.TenNuoc, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                vm.validate.TenNuoc = '........';
                return;
            }

            vm.status.isLoading = true;
            KhoNuocSanXuatService.update(vm.data.objKhoNuocSanXuat).then(function (success) {
                if (success.data.data) {
                    vm.data.objKhoNuocSanXuat = success.data.data;
                }
               
            }, function (error) {
                vm.status.isLoading = false;
            });
             vm.status.isLoading = false;
                $('#KhoNuocSanXuatEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.KhoNuocSanXuat.KhoNuocSanXuat.reload');
        }

        function add() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNuocSanXuat.MaNuoc, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaNuoc = '........';
                return; 
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objKhoNuocSanXuat.TenNuoc, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                vm.validate.TenNuoc = '........';
                return;
            }
            vm.data.objKhoNuocSanXuat.NguoiTao = vm.data.UserLoginId;
            vm.status.isLoading = true;
            KhoNuocSanXuatService.insert(vm.data.objKhoNuocSanXuat).then(function (success) {
                if (success.data.result) {
                    KhoNuocSanXuatId = success.data.KhoNuocSanXuatId;
                }
                vm.status.isLoading = false;
                $('#KhoNuocSanXuatEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.KhoNuocSanXuat.KhoNuocSanXuat.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtMa").focus();
            getById(KhoNuocSanXuatId);
            vm.validate.MaNuoc = '';
            vm.validate.TenNuoc = '';
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
            vm.validate.MaNuoc = '';
            vm.validate.TenNuoc = '';
         
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa')
                {
                    vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNuocSanXuat.MaNuoc, 'isCode');
                    if (vm.status.isInValidMa) {
                        $("#txtMa").focus();
                        vm.validate.MaNuoc = '........';
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen')
                {
                    vm.status.isInValidTen = utility.checkInValid(vm.data.objKhoNuocSanXuat.TenNuoc, 'isEmpty');
                    if (vm.status.isInValidTen) {
                        $("#txtTen").focus();
                        vm.validate.TenNuoc = '........';
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#KhoNuocSanXuatEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                KhoNuocSanXuatService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objKhoNuocSanXuat = success.data.data;
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objKhoNuocSanXuat = {};
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objKhoNuocSanXuat.MaNuoc || vm.data.objKhoNuocSanXuat.MaNuoc == '') {
                hasError = true;
                $("#txtMa").focus();
                vm.validate.MaNuoc = '........';
                return hasError;
            }
            if (!vm.data.objKhoNuocSanXuat.TenNuoc || vm.data.objKhoNuocSanXuat.TenNuoc == '') {
                hasError = true;
                vm.validate.TenNuoc = '........';
                $("#txtTen").focus();
                return hasError;
            }
            
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNuocSanXuat.MaNuoc, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaNuoc = '........';
                return false;
            }
            return hasError;
        }
     
    }
})();