(function () {
    'use strict';

    angular.module('app')
        .controller('KhoNhomHangHoaEditCtrl', controller)

    function controller($rootScope, $scope, KhoNhomHangHoaService, $window, utility) {
        var KhoNhomHangHoaId = 0;

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
            objKhoNhomHangHoa: {},
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
            MaNhom: '',
            TenNhom: ''
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
                    vm.data.showButtonSave = KhoNhomHangHoaId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoNhomHangHoaId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#KhoNhomHangHoaEditPopup').on('hidden.bs.collapse', function () {
                debugger
                KhoNhomHangHoaId = 0;
                getById(KhoNhomHangHoaId);
                $rootScope.isOpenPopup = false;
            });

            $('#KhoNhomHangHoaEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('KhoNhomHangHoaEditCtrl.KhoNhomHangHoaId', function (event, data) {
                KhoNhomHangHoaId = data;
                refresh();
                setEnableButton();
            });
        }

        function save() {
            if (vm.data.objKhoNhomHangHoa.NhomHangHoaId > 0) {
                edit();
            } else {
                vm.validate.MaNhom = '';
                vm.validate.TenNhom = '';
                add();
            }
        }

        function edit() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNhomHangHoa.MaNhom, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaNhom = '........';
                return;
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objKhoNhomHangHoa.TenNhom, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                vm.validate.TenNhom = '........';
                return;
            }

            vm.status.isLoading = true;
            vm.data.objKhoNhomHangHoa.NguoiTao = vm.data.UserLoginId;
            KhoNhomHangHoaService.update(vm.data.objKhoNhomHangHoa).then(function (success) {
                if (success.data.data) {
                    vm.data.objKhoNhomHangHoa = success.data.data;
                }
               
            }, function (error) {
                vm.status.isLoading = false;
            });
             vm.status.isLoading = false;
                $('#KhoNhomHangHoaEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.KhoNhomHangHoa.KhoNhomHangHoa.reload');
        }

        function add() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNhomHangHoa.MaNhom, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaNhom = '........';
                return; 
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objKhoNhomHangHoa.TenNhom, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                vm.validate.TenNhom = '........';
                return;
            }
            vm.status.isLoading = true;
            KhoNhomHangHoaService.insert(vm.data.objKhoNhomHangHoa).then(function (success) {
                if (success.data.result) {
                    KhoNhomHangHoaId = success.data.KhoNhomHangHoaId;
                }
                vm.status.isLoading = false;
                $('#KhoNhomHangHoaEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.KhoNhomHangHoa.KhoNhomHangHoa.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtMa").focus();
            getById(KhoNhomHangHoaId);
            vm.validate.MaNhom = '';
            vm.validate.TenNhom = '';
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
            vm.validate.MaNhom = '';
            vm.validate.TenNhom = '';
         
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa')
                {
                    vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNhomHangHoa.MaNhom, 'isCode');
                    if (vm.status.isInValidMa) {
                        $("#txtMa").focus();
                        vm.validate.MaNhom = '........';
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen')
                {
                    vm.status.isInValidTen = utility.checkInValid(vm.data.objKhoNhomHangHoa.TenNhom, 'isEmpty');
                    if (vm.status.isInValidTen) {
                        $("#txtTen").focus();
                        vm.validate.TenNhom = '........';
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#KhoNhomHangHoaEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                KhoNhomHangHoaService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objKhoNhomHangHoa = success.data.data;
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objKhoNhomHangHoa = {};
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objKhoNhomHangHoa.MaNhom || vm.data.objKhoNhomHangHoa.MaNhom == '') {
                hasError = true;
                $("#txtMa").focus();
                vm.validate.MaNhom = '........';
                return hasError;
            }
            if (!vm.data.objKhoNhomHangHoa.TenNhom || vm.data.objKhoNhomHangHoa.TenNhom == '') {
                hasError = true;
                vm.validate.TenNhom = '........';
                $("#txtTen").focus();
                return hasError;
            }
            
            vm.status.isInValidMa = utility.checkInValid(vm.data.objKhoNhomHangHoa.MaNhom, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaNhom = '........';
                return false;
            }
            return hasError;
        }
     
    }
})();