(function () {
    'use strict';

    angular.module('app')
        .controller('PhongBanEditCtrl', controller)

    function controller($rootScope, $scope, PhongBanService, $window, utility) {
        var phongBanId = 0;

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
            objPhongBan: {},
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

        vm.validate = {
            MaPhongBan: '',
            TenPhongBan: ''
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
                    vm.data.showButtonSave = phongBanId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = phongBanId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#PhongBanEditPopup').on('hidden.bs.collapse', function () {
                phongBanId = 0;
                getById(phongBanId);
                $rootScope.isOpenPopup = false;
            });

            $('#PhongBanEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('PhongBanEditCtrl.phongBanId', function (event, data) {
                phongBanId = data;
                refresh();
                setEnableButton();
            });
        }

        function save() {
            if (vm.data.objPhongBan.PhongBanId > 0) {
                edit();
            } else {
                vm.validate.MaPhongBan = '';
                vm.validate.TenPhongBan = '';
                add();
            }
        }

        function edit() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objPhongBan.MaPhongBan, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaPhongBan = '........';
                return;
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objPhongBan.TenPhongBan, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                vm.validate.TenPhongBan = '........';
                return;
            }

            vm.status.isLoading = true;
            PhongBanService.update(vm.data.objPhongBan).then(function (success) {
                if (success.data.data) {
                    vm.data.objPhongBan = success.data.data;
                }
               
            }, function (error) {
                vm.status.isLoading = false;
            });
             vm.status.isLoading = false;
                $('#PhongBanEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.phongban.phongban.reload');
        }

        function add() {
            vm.status.isInValidMa = utility.checkInValid(vm.data.objPhongBan.MaPhongBan, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaPhongBan = '........';
                return; 
            }
            vm.status.isInValidTen = utility.checkInValid(vm.data.objPhongBan.TenPhongBan, 'isEmpty');
            if (vm.status.isInValidTen) {
                $("#txtTen").focus();
                vm.validate.TenPhongBan = '........';
                return;
            }
            vm.status.isLoading = true;
            PhongBanService.insert(vm.data.objPhongBan).then(function (success) {
                if (success.data.result) {
                    phongBanId = success.data.PhongBanId;
                }
                vm.status.isLoading = false;
                $('#PhongBanEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.phongban.phongban.reload');
            }, function (error) {
                if (error.data.error) {
                    //alert(error.data.error.message);
                    alert('Mã phòng ban không được trùng, vui lòng tạo lại!');
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtMa").focus();
            getById(phongBanId);
            vm.validate.MaPhongBan = '';
            vm.validate.TenPhongBan = '';
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
            vm.validate.MaPhongBan = '';
            vm.validate.TenPhongBan = '';
         
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa')
                {
                    vm.status.isInValidMa = utility.checkInValid(vm.data.objPhongBan.MaPhongBan, 'isCode');
                    if (vm.status.isInValidMa) {
                        $("#txtMa").focus();
                        vm.validate.MaPhongBan = '........';
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen')
                {
                    vm.status.isInValidTen = utility.checkInValid(vm.data.objPhongBan.TenPhongBan, 'isEmpty');
                    if (vm.status.isInValidTen) {
                        $("#txtTen").focus();
                        vm.validate.TenPhongBan = '........';
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#PhongBanEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                PhongBanService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objPhongBan = success.data.data;
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objPhongBan = {};
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objPhongBan.MaPhongBan || vm.data.objPhongBan.MaPhongBan == '') {
                hasError = true;
                $("#txtMa").focus();
                vm.validate.MaPhongBan = '........';
                return hasError;
            }
            if (!vm.data.objPhongBan.TenPhongBan || vm.data.objPhongBan.TenPhongBan == '') {
                hasError = true;
                vm.validate.TenPhongBan = '........';
                $("#txtTen").focus();
                return hasError;
            }
            
            vm.status.isInValidMa = utility.checkInValid(vm.data.objPhongBan.MaPhongBan, 'isCode');
            if (vm.status.isInValidMa) {
                $("#txtMa").focus();
                vm.validate.MaPhongBan = '........';
                return false;
            }
            return hasError;
        }
     
    }
})();