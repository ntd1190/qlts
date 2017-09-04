(function () {
    'use strict';

    angular.module('app')
        .controller('NhaCungCapEditCtrl', controller)

    function controller($rootScope, $scope, NhaCungCapService, $window, utility) {
        var NhaCungCapId = 0;

        var vm = this;

        vm.status = {
            isLoading: false,
            isInValidMa: false,
            isInValidTen: false
        };

        vm.data = {
            UserLoginId: '',
            CoSoId:'',
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objNhaCungCap: {},
            isEdit: false
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
                    vm.data.showButtonSave = NhaCungCapId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = NhaCungCapId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#NhaCungCapEditPopup').on('hidden.bs.collapse', function () {
                NhaCungCapId = 0;
                getById(NhaCungCapId);
                $rootScope.isOpenPopup = false;
            });

            $('#NhaCungCapEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('NhaCungCapEditCtrl.NhaCungCapId', function (event, data) {
                NhaCungCapId = data;
                refresh();
                setEnableButton();
            });
        }

        function save() {
            if (vm.data.objNhaCungCap.NhaCungCapId > 0) {
                edit();
            } else {
                add();
            }
        }

        function edit() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objNhaCungCap.MaNhaCungCap, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                return;
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objNhaCungCap.TenNhaCungCap, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                return;
            }

            vm.status.isLoading = true;
            NhaCungCapService.update(vm.data.objNhaCungCap).then(function (success) {
                if (success.data.data) {
                    vm.data.objNhaCungCap = success.data.data;
                    $rootScope.$broadcast('sa.qltsmain.NhaCungCap.NhaCungCap.reload');
                }
               
            }, function (error) {
                vm.status.isLoading = false;
            });
             vm.status.isLoading = false;
                $('#NhaCungCapEditPopup').collapse('hide');
               
        }

        function add() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objNhaCungCap.MaNhaCungCap, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                return; 
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objNhaCungCap.TenNhaCungCap, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objNhaCungCap.CoSoId = vm.data.CoSoId;
            vm.data.objNhaCungCap.NguoiTao = vm.data.UserLoginId;
            NhaCungCapService.insert(vm.data.objNhaCungCap).then(function (success) {
                if (success.data.result) {
                    NhaCungCapId = success.data.NhaCungCapId;
                }
                vm.status.isLoading = false;
                $('#NhaCungCapEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.NhaCungCap.NhaCungCap.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtMa").focus();
            getById(NhaCungCapId);
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;
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
                    vm.status.isInValidMa = utility.checkInValid(vm.data.objNhaCungCap.MaNhaCungCap, 'isCode');
                    if (vm.status.isInValidMa) {
                        $("#txtMa").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen')
                {
                    vm.status.isInValidTen = utility.checkInValid(vm.data.objNhaCungCap.TenNhaCungCap, 'isEmpty');
                    if (vm.status.isInValidTen) {
                        $("#txtTen").focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#NhaCungCapEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                NhaCungCapService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objNhaCungCap = success.data.data;
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objNhaCungCap = {};
            }
        }

       
     
    }
})();