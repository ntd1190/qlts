(function () {
    'use strict';

    angular.module('app')
        .controller('TheoDoiEditCtrl', controller)

    function controller($rootScope, $scope, TheoDoiService, $window, utility) {
        var TheoDoiId = 0;

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
            objTheoDoi: {},
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
            MaTheoDoi: false,
            TenTheoDoi: false,
            PhongBan: false
        }
        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.TheoDoiId;
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
                    vm.data.showButtonSave = TheoDoiId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = TheoDoiId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#TheoDoiEditPopup').on('hidden.bs.collapse', function () {
                TheoDoiId = 0;
                getById(TheoDoiId);
                $rootScope.isOpenPopup = false;

            });

            $('#TheoDoiEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('TheoDoiEditCtrl.TheoDoiId', function (event, data) {
                TheoDoiId = data;
                refresh();
                setEnableButton();
            });
            $scope.$on('TheoDoiEditCtrl.action.SelectData', function (event, data) {
                vm.data.PhongBan = data;
                vm.data.objTheoDoi.PhongBanId = vm.data.PhongBan.PhongBanId;
            });
        }

        vm.action.getDataTaiSan = function (data) {
            console.log(data);
            //console.log(index);

            vm.data.objTheoDoi.TaiSanId = data.TaiSanId;
            vm.data.objTheoDoi.MaTaiSan = data.MaTaiSan;

        }

        function save() {
            if (vm.data.objTheoDoi.TheoDoiId > 0) {
                edit();
            } else {
                vm.validate.MaTheoDoi = false;
                vm.validate.TenTheoDoi = false;
                vm.validate.PhongBan = false;
                add();
            }
        }

        function edit() {
            vm.validate.MaTheoDoi = utility.checkInValid(vm.data.objTheoDoi.MaTheoDoi, 'isCode');
            if (vm.status.MaTheoDoi) {
                $("#txtMa").focus();
                return;
            }
            vm.validate.TenTheoDoi = utility.checkInValid(vm.data.objTheoDoi.TenTheoDoi, 'isEmpty');
            if (vm.validate.TenTheoDoi) {
                $("#txtTen").focus();
                return;
            }
            vm.validate.PhongBan = utility.checkInValid(vm.data.objTheoDoi.PhongBanId, 'isEmpty');
            if (vm.validate.PhongBan) {
                $("#cbxPhongBan").find('input').focus();
                return;
            }

            vm.status.isLoading = true;
            TheoDoiService.update(vm.data.objTheoDoi).then(function (success) {
                if (success.data.data) {
                    vm.data.objTheoDoi = success.data.data;
                    $rootScope.$broadcast('sa.qltsmain.TheoDoi.TheoDoi.reload');
                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;
            $('#TheoDoiEditPopup').collapse('hide');

        }

        function add() {
            vm.validate.MaTheoDoi = utility.checkInValid(vm.data.objTheoDoi.MaTheoDoi, 'isCode');
            if (vm.validate.MaTheoDoi) {
                $("#txtMa").focus();
                return;
            }
            vm.validate.TenTheoDoi = utility.checkInValid(vm.data.objTheoDoi.TenTheoDoi, 'isEmpty');
            if (vm.validate.TenTheoDoi) {
                $("#txtTen").focus();
                return;
            }
            vm.validate.PhongBan = utility.checkInValid(vm.data.objTheoDoi.PhongBanId, 'isEmpty');
            if (vm.validate.PhongBan) {
                $("#cbxPhongBan").find('input').focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objTheoDoi.CoSoId = vm.data.CoSoId;
            vm.data.objTheoDoi.NguoiTao = vm.data.UserLoginId;
            TheoDoiService.insert(vm.data.objTheoDoi).then(function (success) {
                if (success.data.result) {
                    TheoDoiId = success.data.TheoDoiId;
                }
                vm.status.isLoading = false;
                $('#TheoDoiEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.TheoDoi.TheoDoi.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {

            $("#txtMa").focus();
            getById(TheoDoiId);
            vm.validate.MaTheoDoi = false;
            vm.validate.TenTheoDoi = false;
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
                if (fromId == 'txtMaTaiSan') {
                    vm.validate.MaTaiSan = utility.checkInValid(vm.data.objTheoDoi.MaTaiSan, 'isCode');
                    if (vm.validate.MaTaiSan) {
                        $("#txtMaTaiSan").focus();
                    } else {
                        vm.data.objTheoDoi.TempMaTaiSan = value;
                        $("#" + ToId).focus();
                    }
                }
                else if (fromId == 'txtngaybatdausudung') {
                    vm.validate.NgayBatDauSuDung = utility.checkInValid(vm.data.objTheoDoi.NgayBatDauSuDung, 'isEmpty');
                    if (vm.validate.NgayBatDauSuDung) {
                        $("#txtngaybatdausudung").focus();
                    } else {
                        $("#" + ToId).find('input').focus();
                    }

                }
                else $("#" + ToId).focus();


            }
        }
        function close() {
            $('#TheoDoiEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                TheoDoiService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objTheoDoi = success.data.data[0];
                        vm.data.PhongBan = { PhongBanId: vm.data.objTheoDoi.PhongBanId, MaPhongBan: vm.data.objTheoDoi.MaPhongBan, TenPhongBan: vm.data.objTheoDoi.TenPhongBan };
                        $rootScope.$broadcast('TheoDoiEditCtrl.action.loadData', vm.data.PhongBan);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objTheoDoi = {};
                $rootScope.$broadcast('TheoDoiEditCtrl.action.clearData');
            }
        }

        function validate(hasError) {

            if (!vm.data.objTheoDoi.MaTheoDoi || vm.data.objTheoDoi.MaTheoDoi == '') {
                hasError = true;
                $("#txtMa").focus();
                vm.validate.MaTheoDoi = true;
                return hasError;
            }
            if (!vm.data.objTheoDoi.TenTheoDoi || vm.data.objTheoDoi.TenTheoDoi == '') {
                hasError = true;
                vm.validate.TenTheoDoi = true;
                $("#txtTen").focus();
                return hasError;
            }

            return hasError;
        }


    }
})();