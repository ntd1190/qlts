(function () {
    'use strict';

    angular.module('app')
        .controller('LoaiTaiSanEditCtrl', controller)

    function controller($rootScope, $scope, LoaiTaiSanService, $window, utility) {
        var LoaiId = 0;

        var vm = this;


        vm.status = {
            isLoading: false,
        };

        vm.data = {
            UserLoginId: '',
            CoSoId: '',
            NhomTaiSan: {},
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objLoaiTaiSan: {},
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
            MaLoai: false,
            TenLoai: false,
            NhomTaiSan: false
        }
        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.LoaiId;
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
                    vm.data.showButtonSave = LoaiId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = LoaiId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#LoaiTaiSanEditPopup').on('hidden.bs.collapse', function () {
                LoaiId = 0;
                getById(LoaiId);
                $rootScope.isOpenPopup = false;
            });

            $('#LoaiTaiSanEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('LoaiTaiSanEditCtrl.LoaiId', function (event, data) {
                LoaiId = data;
                refresh();
                setEnableButton();
            });
            $scope.$on('LoaiTaiSanEditCtrl.action.SelectData', function (event, data) {
                vm.data.NhomTaiSan = data;
                vm.data.objLoaiTaiSan.NhomId = vm.data.NhomTaiSan.NhomId;
            });
        }

        function save() {
            if (vm.data.objLoaiTaiSan.LoaiId > 0) {
                edit();
            } else {
                vm.validate.MaLoai = false;
                vm.validate.TenLoai = false;
                vm.validate.NhomTaiSan = false;
                add();
            }
        }

        function edit() {
            vm.validate.MaLoai = utility.checkInValid(vm.data.objLoaiTaiSan.MaLoai, 'isCode');
            if (vm.status.MaLoai) {
                $("#txtMa").focus();
                return;
            }
            vm.validate.TenLoai = utility.checkInValid(vm.data.objLoaiTaiSan.TenLoai, 'isEmpty');
            if (vm.validate.TenLoai) {
                $("#txtTen").focus();
                return;
            }
            vm.validate.NhomTaiSan = utility.checkInValid(vm.data.objLoaiTaiSan.NhomId, 'isEmpty');
            if (vm.validate.NhomTaiSan) {
                $("#cbxNhomTaiSan").find('input').focus();
                return;
            }
           
            vm.status.isLoading = true;
            LoaiTaiSanService.update(vm.data.objLoaiTaiSan).then(function (success) {
                if (success.data.data) {
                    vm.data.objLoaiTaiSan = success.data.data;
                    $rootScope.$broadcast('sa.qltsmain.LoaiTaiSan.LoaiTaiSan.reload');
                }
               
            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
             vm.status.isLoading = false;
                $('#LoaiTaiSanEditPopup').collapse('hide');
               
        }

        function add() {
            vm.validate.MaLoai = utility.checkInValid(vm.data.objLoaiTaiSan.MaLoai, 'isCode');
            if (vm.validate.MaLoai) {
                $("#txtMa").focus();
                return; 
            }
            vm.validate.TenLoai = utility.checkInValid(vm.data.objLoaiTaiSan.TenLoai, 'isEmpty');
            if (vm.validate.TenLoai) {
                $("#txtTen").focus();
                return;
            }
            vm.validate.NhomTaiSan = utility.checkInValid(vm.data.objLoaiTaiSan.NhomId, 'isEmpty');
            if (vm.validate.NhomTaiSan) {
                $("#cbxNhomTaiSan").find('input').focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objLoaiTaiSan.CoSoId = vm.data.CoSoId;
            vm.data.objLoaiTaiSan.NguoiTao = vm.data.UserLoginId;
            LoaiTaiSanService.insert(vm.data.objLoaiTaiSan).then(function (success) {
                if (success.data.result) {
                    LoaiId = success.data.LoaiId;
                }
                vm.status.isLoading = false;
                $('#LoaiTaiSanEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.LoaiTaiSan.LoaiTaiSan.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#txtMa").focus();
            getById(LoaiId);
            vm.validate.MaLoai = false;
            vm.validate.TenLoai = false;
            vm.validate.NhomTaiSan = false;
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
                    vm.validate.MaLoai = utility.checkInValid(vm.data.objLoaiTaiSan.MaLoai, 'isCode');
                    if (vm.validate.MaLoai) {
                        $("#txtMa").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTen')
                {
                    vm.validate.TenLoai = utility.checkInValid(vm.data.objLoaiTaiSan.TenLoai, 'isEmpty');
                    if (vm.validate.TenLoai) {
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
            $('#LoaiTaiSanEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                LoaiTaiSanService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objLoaiTaiSan = success.data.data[0];
                        vm.data.NhomTaiSan = { NhomId: vm.data.objLoaiTaiSan.NhomId, MaNhom: vm.data.objLoaiTaiSan.MaNhom, TenNhom: vm.data.objLoaiTaiSan.TenNhom };
                        $rootScope.$broadcast('LoaiTaiSanEditCtrl.action.loadData', vm.data.NhomTaiSan);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objLoaiTaiSan = {};
                $rootScope.$broadcast('LoaiTaiSanEditCtrl.action.clearData');
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objLoaiTaiSan.MaLoai || vm.data.objLoaiTaiSan.MaLoai == '') {
                hasError = true;
                $("#txtMa").focus();
                vm.validate.MaLoai = true;
                return hasError;
            }
            if (!vm.data.objLoaiTaiSan.TenLoai || vm.data.objLoaiTaiSan.TenLoai == '') {
                hasError = true;
                vm.validate.TenLoai = true;
                $("#txtTen").focus();
                return hasError;
            }
            
            return hasError;
        }

       
    }
})();