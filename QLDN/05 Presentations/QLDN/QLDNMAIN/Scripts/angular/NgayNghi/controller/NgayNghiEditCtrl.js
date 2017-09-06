(function () {
    'use strict';

    angular.module('app')
        .controller('NgayNghiEditCtrl', controller)
    function controller($rootScope, $scope, NgayNghiService, $window, utility) {
        var ngayNghiId = 0;

        var vm = this;

        vm.status = {
            isLoading: false,
            isInValidNgay: false,
            isInValidMoTa: false
        };

        vm.data = {
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objNgayNghi: {},
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
            Ngay: '',
            MoTa: ''
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
                    vm.data.showButtonSave = ngayNghiId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = ngayNghiId != 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#NgayNghiEditPopup').on('hidden.bs.collapse', function () {
                ngayNghiId = 0;
               
                getById(ngayNghiId);
                $rootScope.isOpenPopup = false;
            });

            $('#NgayNghiEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('NgayNghiEditCtrl.ngayNghiId', function (event, data) {
                ngayNghiId = data;
                refresh();
                setEnableButton();
            });
        }

        function save() {
            if (ngayNghiId != 0) {
                edit();
            } else {
                vm.validate.Ngay = '';
                vm.validate.MoTa = '';
                add();
            }
        }

        function edit() {
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objNgayNghi.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $("#txtNgay").focus();
                vm.validate.Ngay = '........';
                return;
            }
            vm.status.isInValidMoTa = utility.checkInValid(vm.data.objNgayNghi.MoTa, 'isEmpty');
            if (vm.status.isInValidMoTa) {
                $("#txtMoTa").focus();
                vm.validate.MoTa = '........';
                return;
            }
            vm.data.objNgayNghi.Ngay = utility.convertDateFormat(vm.data.objNgayNghi.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objNgayNghi.NguoiTao = vm.data.UserLoginId;
            vm.status.isLoading = true;
            NgayNghiService.update(vm.data.objNgayNghi).then(function (success) {
                if (success.data.data) {
                    vm.data.objNgayNghi = success.data.data;
                }
               
            }, function (error) {
                vm.status.isLoading = false;
            });
             vm.status.isLoading = false;
                $('#NgayNghiEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.ngaynghi.ngaynghi.reload');
        }

        function add() {
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objNgayNghi.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $("#txtNgay").focus();
                vm.validate.Ngay = '........';
                return; 
            }
            vm.status.isInValidMoTa = utility.checkInValid(vm.data.objNgayNghi.MoTa, 'isEmpty');
            if (vm.status.isInValidMoTa) {
                $("#txtMoTa").focus();
                vm.validate.MoTa = '........';
                return;
            }
            vm.status.isLoading = true;
            vm.data.objNgayNghi.Ngay = utility.convertDateFormat(vm.data.objNgayNghi.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objNgayNghi.NguoiTao = vm.data.UserLoginId;
            NgayNghiService.insert(vm.data.objNgayNghi).then(function (success) {
                if (success.data.result) {
                    ngayNghiId = success.data.Ngay;
                }
                vm.status.isLoading = false;
                $('#NgayNghiEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.ngaynghi.ngaynghi.reload');
            }, function (error) {
                if (error.data.error) {
                    
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            getById(ngayNghiId);
            vm.validate.Ngay = '';
            vm.validate.MoTa = '';
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
            vm.validate.Ngay = '';
            vm.validate.MoTa = '';
         
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgay')
                {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objNgayNghi.Ngay, 'isEmpty');
                    if (vm.status.isInValidNgay) {
                        $("#txtNgay").focus();
                        vm.validate.Ngay = '........';
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtMoTa')
                {
                    vm.status.isInValidMoTa = utility.checkInValid(vm.data.objNgayNghi.MoTa, 'isEmpty');
                    if (vm.status.isInValidMoTa) {
                        $("#txtMoTa").focus();
                        vm.validate.MoTa = '........';
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#NgayNghiEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
            $('#txtNgay').prop('disabled', false);
        }
        function getById(id) {
            if (id != 0) {
                vm.status.isLoading = true;
                NgayNghiService.getById(id).then(function (success) {
                    if (success.data) {
                      
                        vm.data.objNgayNghi = success.data.data;
                        vm.data.objNgayNghi.Ngay = utility.convertDateFormat(vm.data.objNgayNghi.Ngay, 'YYYY-MM-DD', 'DD/MM/YYYY');
                        $('#txtNgay').prop('disabled', true);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objNgayNghi = {};
            }
        }

        function validate(hasError) {
           
            if (!vm.data.objNgayNghi.Ngay || vm.data.objNgayNghi.Ngay == '') {
                hasError = true;
                $("#txtNgay").focus();
                vm.validate.Ngay = '........';
                return hasError;
            }
            if (!vm.data.objNgayNghi.MoTa || vm.data.objNgayNghi.MoTa == '') {
                hasError = true;
                vm.validate.MoTa = '........';
                $("#txtMoTa").focus();
                return hasError;
            }
            

            return hasError;
        }
     
    }
})();