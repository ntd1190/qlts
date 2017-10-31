(function () {
    'use strict';

    angular.module('app')
        .controller('VaiTroEditCtrl', VaiTroEditCtrl)
        .directive("keyboard", keyboard); // HOT-KEY

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

                        //Invoke the handler and digest
                        scope.$apply(function () {
                            keyDown.callback(keyDown.name, event.keyCode);
                        })
                    }
                });
            }
        }
    };
    //end HOT-KEY

    function VaiTroEditCtrl($scope, $rootScope, VaiTroService, $window, utility) {
        var vm = this;

        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup) {
                    save(vm.data.objVaiTro);
                }
            }
        };
        //HOT-KEY
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidMa: false,
            isInValidTen: false
        };

        vm.data = {
            dsVaiTro: [],
            objVaiTro: {},
            UserLoginId: '',
            showButtonXoa: false,
            showButtonSave: false,
            showcboCoSo: false,
            listQuyenTacVu: [],
        };

        vm.action = {
            resetEdit: resetEdit,
            save: save,
            update: update,
            getAll: getAll,
            find: find,
            getById: getById,
            insert: insert,
            remove: remove,
            closeEdit: closeEdit,
            keyPress: keyPress
        };
        vm.action.SelectCoSo = function (data) {
            console.log('vm.action.SelectCoSo', vm.data.objVaiTro.CoSoId);
            vm.data.objVaiTro.CoSoId = data.CoSoId;
        }

        $rootScope.isOpenPopup = false;

        $scope.$watch('VaiTroId', function () {
            getById($rootScope.VaiTroId);
        });

        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                vm.userInfo = ctrlId.userInfo;
                setEnableButton();
            }
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = true;
                }
                if (vm.data.listQuyenTacVu.indexOf("VA") > 0) {
                    vm.data.showcboCoSo = true;
                }
            }
        }

        function activate() {
            //status of the popup is hidden
            $('#popupThemNguoiDung').on('hidden.bs.collapse', function () {
                $rootScope.VaiTroId = 0;
                vm.data.objVaiTro = {};
                $rootScope.isOpenPopup = false;
            });
            //status of the popup is shown
            $('#popupThemNguoiDung').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtMa').focus();
                $rootScope.isOpenPopup = true;
            });

        }



        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa') {
                    vm.status.isInValidMa = utility.checkInValid(value, 'isCode');
                    if (!vm.status.isInValidMa) {
                        //set focus for the next input
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtTen') {
                    vm.status.isInValidTen = utility.checkInValid(value, 'isEmpty');
                    if (!vm.status.isInValidTen) {
                        //set focus for the next input
                        $('#' + ToId + ' input').focus();
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        function resetEdit(id) {
            //set condition of has-error
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;
            //
            getById(id);
        };

        function closeEdit() {
            //set condition of has-error
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;
            //
            $rootScope.$emit('vaitroctrl.list.refresh');
            $('#popupThemNguoiDung').collapse("hide");
        }

        function getById(id) {
            vm.status.isLoadingEdit = true;

            vm.data.objVaiTro = {};

            if (id && id > 0) {
                VaiTroService.getById(id).then(function (result) {
                    console.log(result);
                    if (result.data) {
                        vm.data.objVaiTro = result.data;
                    } else {
                        vm.data.objVaiTro = {};
                    }
                    vm.status.isLoadingEdit = false;
                }, function (error) { vm.status.isLoadingEdit = false; });
            } else {
                vm.status.isLoadingEdit = false;
            }
        }

        function save(obj) {
            //check validate fields of fNguoiDung
            vm.status.isInValidMa = utility.checkInValid(obj.MaVaiTro, 'isCode');
            if (vm.status.isInValidMa) {
                $window.document.getElementById('txtMa').focus();
                alert("Mã người dùng: gồm các chữ cái và chữ số")
                return;
            }

            vm.status.isInValidTen = utility.checkInValid(obj.TenVaiTro, 'isEmpty');
            if (vm.status.isInValidTen) {
                $window.document.getElementById('txtTen').focus();
                return;
            }
            //end check

            if (vm.data.showcboCoSo == false) { obj.CoSoId = vm.userInfo.CoSoId }

            if (obj.VaiTroId != null && obj.VaiTroId != undefined && obj.VaiTroId && obj.VaiTroId != '') {
                update(obj);
            }
            else {
                insert(obj);
            }
        }

        function insert(obj) {

            VaiTroService.insert(obj).then(function (result) {
                console.log(result);
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                }
                closeEdit();
            }, function (error) {
                console.log(error);
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        function update(obj) {
            VaiTroService.update(obj).then(function (result) {
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                }
                closeEdit();
            });
        }

        function remove(id) {
            if (confirm('Bạn có muốn xóa?')) {
                VaiTroService.remove(id).then(function (result) {
                    if (result.data) {
                        closeEdit();
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        }

        function getAll() {
            VaiTroService.getList().then(function (result) {
                if (result.data)
                    vm.data.dsVaiTro = result.data;
            });
        }

        function find(text) {
            vm.status.isLoadingList = true;
            VaiTroService.GetListBySearchString(text).then(function (result) {
                console.log(result);
                if (result.data) {
                    vm.data.dsVaiTro = result.data;
                }
                vm.status.isLoadingList = false;
            }, function (error) {
                console.log(error);
            });
        }
    }


})();