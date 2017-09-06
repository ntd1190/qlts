(function () {
    'use strict';

    angular.module('app')
        .controller('KhoTaiKhoanEditCtrl', controller)

    function controller($rootScope, $scope, KhoTaiKhoanService, $window, utility) {
        var KhoTaiKhoanId = 0;

        var vm = this;

        vm.status = {
            isLoading: false,
            isInValidTenTaiKhoan: false,
            isInValidMaTaiKhoan: false
        };

        vm.data = {
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objKhoTaiKhoan: {},
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
            TenTaiKhoan: '',
            MaTaiKhoan: ''
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
                    vm.data.showButtonSave = KhoTaiKhoanId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhoTaiKhoanId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#KhoTaiKhoanEditPopup').on('hidden.bs.collapse', function () {
                debugger
                KhoTaiKhoanId = 0;
                getById(KhoTaiKhoanId);
                $rootScope.isOpenPopup = false;
            });

            $('#KhoTaiKhoanEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMaTaiKhoan').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('KhoTaiKhoanEditCtrl.KhoTaiKhoanId', function (event, data) {
                KhoTaiKhoanId = data;
                refresh();
                setEnableButton();
            });
        }

        function save() {
            if (vm.data.objKhoTaiKhoan.TaiKhoanId > 0) {
                edit();
            } else {
                vm.validate.TenTaiKhoan = '';
                vm.validate.MaTaiKhoan = '';
                add();
            }
        }

        function edit() {
            vm.status.isInValidMaTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.MaTaiKhoan, 'isEmpty');
            if (vm.status.isInValidMaTaiKhoan) {
                $("#txtMaTaiKhoan").focus();
                vm.validate.MaTaiKhoan = '........';
                return;
            }
            vm.status.isInValidTenTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.TenTaiKhoan, 'isEmpty');
            if (vm.status.isInValidTenTaiKhoan) {
                $("#txtTenTaiKhoan").focus();
                vm.validate.TenTaiKhoan = '........';
                return;
            }
            

            vm.status.isLoading = true;
            vm.data.objKhoTaiKhoan.NguoiTao = vm.data.UserLoginId;
            KhoTaiKhoanService.update(vm.data.objKhoTaiKhoan).then(function (success) {
                if (success.data.data) {
                    vm.data.objKhoTaiKhoan = success.data.data;
                }
               
            }, function (error) {
                vm.status.isLoading = false;
            });
             vm.status.isLoading = false;
                $('#KhoTaiKhoanEditPopup').collapse('hide');
                $rootScope.$broadcast('KhoTaiKhoanListCtrl.reload');
        }

        function add() {
            vm.status.isInValidMaTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.MaTaiKhoan, 'isEmpty');
            if (vm.status.isInValidMaTaiKhoan) {
                $("#txtMaTaiKhoan").focus();
                vm.validate.MaTaiKhoan = '........';
                return;
            }
            vm.status.isInValidTenTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.TenTaiKhoan, 'isEmpty');
            if (vm.status.isInValidTenTaiKhoan) {
                $("#txtTenTaiKhoan").focus();
                vm.validate.TenTaiKhoan = '........';
                return; 
            }
           
            vm.status.isLoading = true;
            vm.data.objKhoTaiKhoan.NguoiTao = vm.data.UserLoginId;
            KhoTaiKhoanService.insert(vm.data.objKhoTaiKhoan).then(function (success) {
                if (success.data.result) {
                    KhoTaiKhoanId = success.data.KhoTaiKhoanId;
                }
                vm.status.isLoading = false;
                $('#KhoTaiKhoanEditPopup').collapse('hide');
                $rootScope.$broadcast('KhoTaiKhoanListCtrl.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtTenTaiKhoan").focus();
            getById(KhoTaiKhoanId);
            vm.validate.TenTaiKhoan = '';
            vm.validate.MaTaiKhoan = '';
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
            vm.validate.TenTaiKhoan = '';
            vm.validate.MaTaiKhoan = '';
         
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaTaiKhoan')
                {
                    vm.status.isInValidMaTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.MaTaiKhoan, 'isEmpty');
                    if (vm.status.isInValidMaTaiKhoan) {
                        $("#txtMaTaiKhoan").focus();
                        vm.validate.MaTaiKhoan = '........';
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTenTaiKhoan')
                {
                    vm.status.isInValidTenTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.TenTaiKhoan, 'isEmpty');
                    if (vm.status.isInValidTenTaiKhoan) {
                        $("#txtTenTaiKhoan").focus();
                        vm.validate.TenTaiKhoan = '........';
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#KhoTaiKhoanEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                KhoTaiKhoanService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objKhoTaiKhoan = success.data.data;
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objKhoTaiKhoan = {};
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objKhoTaiKhoan.TenTaiKhoan || vm.data.objKhoTaiKhoan.TenTaiKhoan == '') {
                hasError = true;
                $("#txtTenTaiKhoan").focus();
                vm.validate.TenTaiKhoan = '........';
                return hasError;
            }
            if (!vm.data.objKhoTaiKhoan.MaTaiKhoan || vm.data.objKhoTaiKhoan.MaTaiKhoan == '') {
                hasError = true;
                vm.validate.MaTaiKhoan = '........';
                $("#txtMaTaiKhoan").focus();
                return hasError;
            }
            
            vm.status.isInValidTenTaiKhoan = utility.checkInValid(vm.data.objKhoTaiKhoan.TenTaiKhoan, 'isCode');
            if (vm.status.isInValidTenTaiKhoan) {
                $("#txtTenTaiKhoan").focus();
                vm.validate.TenTaiKhoan = '........';
                return false;
            }
            return hasError;
        }
     
    }
})();