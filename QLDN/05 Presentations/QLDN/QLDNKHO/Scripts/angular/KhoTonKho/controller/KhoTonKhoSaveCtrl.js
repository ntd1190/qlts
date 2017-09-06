(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoTonKhoSaveCtrl', KhoTonKhoSaveCtrl);

    //HOT-KEY
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
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };

    //end HOT-KEY
    KhoTonKhoSaveCtrl.$inject = ['$rootScope', '$scope', 'KhoTonKhoService', 'utility', '$window'];
    function KhoTonKhoSaveCtrl($rootScope, $scope, KhoTonKhoService, utility, $window) {
        var controllerId = 'KhoTonKhoSaveCtrl';
        var vm = this;
        var userInfo;

        vm.data = {
            listQuyenTacVu: [],

            objTongHopTon: {

            },
            NhanVienId: 0,
            error: {},

            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidMaHangHoa: false,
            isInValidTenHangHoa: false,
            isInValidDonViTinh: false,
            isInValidLoHang: false,
            isInValidTonDau: false,
            isInValidGiaNhap: false
        };

        vm.action = {
            save: save,
            refresh: refresh,
            closeEdit: closeEdit,
            keyPress: keyPress,

        };

        vm.onInitView = onInitView;
        activate();

        function activate() {
        }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');

                vm.data.nhanVienId = config.userInfo.NhanVienId ? config.userInfo.NhanVienId : '0';
            }

            initEventListener();
        }

        function initEventListener() {
            $scope.$on(controllerId + '.action.addHangHoaTonDau', function (event, data) {
                vm.data.objTongHopTon.TonKhoId = data;
                refresh();
                setEnableButton();
            });


            //F8
            $scope.$on(controllerId + '.action.callSave', function (event, data) {
                if (vm.data.showButtonSave == true) {
                    vm.action.save();
                }
            });
        }


        function refresh() {
            
                vm.data.objTongHopTon = {
                    TonKhoId: vm.data.objTongHopTon.TonKhoId,
                    MaHangHoa: '',
                    TenHangHoa: '',
                    DonViTinh: '',
                    LoHang: '',
                    TonDau: 0,
                    GiaNhap: '0',
                    LoginId: vm.data.nhanVienId
                };
              
            setEnableButton();
        }

        function setEnableButton() {

            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = vm.data.objTongHopTon.TonKhoId == 0 ? true : vm.data.showButtonSave;
                }

                //// Co quyen Xoa
                //if (vm.data.listQuyenTacVu.indexOf("D") > 0 && vm.data.objTongHopTon.MaLoaiBaoCao == 'BL_KN') {
                //    vm.data.showButtonXoa = true;
                //}

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.objTongHopTon.TonKhoId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        function insert(obj) {

            KhoTonKhoService.insert(obj).then(function (result) {
                console.log(result);
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {
                console.log(error);
                if (error.data.error) {
                    alert(error.data.error.message);
                } else {
                    alert(error.message);
                }
            });
        }

        function save() {

            vm.status.isLoading = true;

            var obj = InvalidateData();

            if (obj == null)
                return;

            if (obj.TonKhoId && obj.TonKhoId > 0) {
                insert(obj);
            }

            vm.status.isLoading = false;
        }

        function convertddmmyyyyToDate(date) {
            var from = date.split("/");
            var f = new Date(from[2], from[1] - 1, from[0]);
            return f;
        }

        function InvalidateData() {
            var obj = vm.data.objTongHopTon;

            vm.status.isInValidMaHangHoa = utility.checkInValid(obj.MaHangHoa, 'isEmpty');
            if (vm.status.isInValidMaHangHoa) {
                $("#txtMaHangHoa").focus();
                return null;
            }

            vm.status.isInValidTenHangHoa = utility.checkInValid(obj.TenHangHoa, 'isEmpty');
            if (vm.status.isInValidTenHangHoa) {
                $("#txtTenHangHoa").focus();
                return null;
            }

            vm.status.isInValidMaHangHoa = utility.checkInValid(obj.MaHangHoa, 'isEmpty');
            if (vm.status.isInValidMaHangHoa) {
                $("#txtMaHangHoa").focus();
                return null;
            }

            vm.status.isInValidDonViTinh = utility.checkInValid(obj.DonViTinh, 'isEmpty');
            if (vm.status.isInValidDonViTinh) {
                $("#txtDonViTinh").focus();
                return null;
            }

            vm.status.isInValidTonDau = utility.checkInValid(obj.TonDau, 'isEmpty');
            if (vm.status.isInValidTonDau) {
                $("#txtTonDau").focus();
                return null;
            }

            vm.status.isInValidGiaNhap = utility.checkInValid(obj.GiaMua, 'isEmpty');
            if (vm.status.isInValidGiaNhap) {
                $("#txtGiaMua").focus();
                return null;
            }

            return obj;
        }

        function resetStatus() {
            //set condition of has-error
            vm.status.isInValidMaHangHoa = false;
            vm.status.isInValidTenHangHoa = false;
            vm.status.isInValidDonViTinh = false;
            vm.status.isInValidLoHang = false,
            vm.status.isInValidTonDau = false;
            vm.status.isInValidGiaNhap = false;
            //
        }

        function closeEdit() {
            resetStatus();
            $scope.$emit(controllerId + '.action.closeEdit');
        }

        function keyPress(value, fromId, ToId, event) {

        }

    }
})();
