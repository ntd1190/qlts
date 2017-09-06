(function () {
    'use strict';

    angular
        .module('app')
        .controller('TamUngEditCtrl', TamUngEditCtrl)
        .directive("keyboard", keyboard);        //HOT-KEY

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

    function TamUngEditCtrl($rootScope, $scope, TamUngService, utility, $window, $filter) {
        var controllerId = 'TamUngEditCtrl';
        var TamUngId = 0;
        var vm = this;
        vm.data = {
            objTamUng: {
                HinhThuc: '1',
                MaTrangThai: '1',
                Ngay: $filter('date')(new Date(), 'dd/MM/yyyy'),
            },
            error: {},
            listNhanVien: [],
            listQuyenTacVu:[],
            showButtonXoa: false,
            showButtonSave: false,
            UserLoginId:''
        };
        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save(vm.data.objTamUng);
                }
            }
        };
        //HOT-KEY
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidNgay: false,
            isInValidTien: false,
            isInValidNhanVien: false,
            isInValidBangChu: false,
            isInValidLyDo: false,
        };

        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListNhanVien: clearListNhanVien
        };

        vm.onInitView = onInitView;
        activate();
        var tmpTamUngOject;
        function activate() {
            $('#popupThongTinTamUng').on('hidden.bs.collapse', function () {
                closeEdit();
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinTamUng').on('shown.bs.collapse', function () {
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('TamUngEditCtrl.TamUngId', function (event, data) {
                tmpTamUngOject = utility.clone(data);
                TamUngId = data.TamUngId;
                vm.data.listNhanVien = [];
                vm.data.listNhanVien.push({ NhanVienId: data.NhanVienId, Ho: data.Ho, Ten: data.Ten });
                vm.data.objTamUng = data;
                vm.data.objTamUng.Ngay = utility.convertDateFormat(vm.data.objTamUng.Ngay, 'YYYY-MM-DD', 'DD/MM/YYYY')
                tmpTamUngOject = utility.clone(data);
               
            });
            $scope.$on(controllerId + '.data.listNhanVien', function (event, data) {
                vm.data.listNhanVien = data;
                if (data.length != 0) {
                    vm.status.isInValidNhanVien = false;
                    $window.document.getElementById("txtTien").focus();
                }
            });

        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                setEnableButton();
            }
            initEventListener();
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = TamUngId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = TamUngId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on(controllerId + '.action.xemTamUng', function (event, data) {
                TamUngId = data;
                refresh();
            });
        }
        function clearListNhanVien() {
            vm.data.listNhanVien = [];

        }
        function refresh() {
            if (TamUngId>0){
            vm.data.objTamUng = utility.clone(tmpTamUngOject);
            vm.data.listNhanVien = [];
            vm.data.listNhanVien.push({ NhanVienId: tmpTamUngOject.NhanVienId, Ho: tmpTamUngOject.Ho, Ten: tmpTamUngOject.Ten });
        }
            else {
                vm.status.isInValidNgay = false;
                vm.status.isInValidTien = false;
                vm.status.isInValidNhanVien = false;
                vm.data.listNhanVien = [];
                vm.data.objTamUng = {
                    HinhThuc: '1',
                    MaTrangThai: '1',
                    Ngay: $filter('date')(new Date(), 'dd/MM/yyyy'),
                };
            }
        }
        function insert() {
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objTamUng.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $window.document.getElementById("txtNgay").focus();
                return;
            }
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            if (vm.status.isInValidNhanVien) {

                return;
            }
            vm.status.isInValidTien = utility.checkInValid(vm.data.objTamUng.Tien, 'isEmpty');
            if (vm.status.isInValidTien) {
                $window.document.getElementById("txtTien").focus();
                return;
            }
            vm.status.isInValidBangChu = utility.checkInValid(vm.data.objTamUng.BangChu, 'isEmpty');
            if (vm.status.isInValidBangChu) {
                $window.document.getElementById("txtBangChu").focus();
                return;
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objTamUng.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById("LyDo").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objTamUng.NguoiTao = vm.data.UserLoginId;
            vm.data.objTamUng.NhanVienIds = NhanVienId;
           
            TamUngService.insert(vm.data.objTamUng).then(function (success) {
                if (success.data.result) {
                    TamUngId = success.data.TamUngId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                $('#popupThongTinTamUng').collapse('hide');
                $rootScope.$broadcast('sa.qldnmain.tamung.tamung.reload');
            }, function (error) {
                console.log(error)
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }
        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join('|');
            result = result || '';

            return result;
        }
        function update() {

            if (vm.data.UserLoginId != vm.data.objTamUng.NguoiTao) {
                alert('Bạn không có quyền xóa hay sửa!');
                return;
            }
            if (vm.data.objTamUng.MaTrangThai != 'TU_DD') {
                alert('Phiếu đã duyệt không được xóa hay sửa!');
                return;
            }
            vm.status.isInValidNgay = utility.checkInValid(vm.data.objTamUng.Ngay, 'isEmpty');
            if (vm.status.isInValidNgay) {
                $("#txtTien").focus()
                $window.document.getElementById("txtNgay").focus();
                return;
            }
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            if (vm.status.isInValidNhanVien) {

                return;
            }
            vm.status.isInValidTien = utility.checkInValid(vm.data.objTamUng.Tien, 'isEmpty');
            if (vm.status.isInValidTien) {
                $window.document.getElementById("txtTien").focus();
                return;
            }   
            vm.status.isInValidBangChu = utility.checkInValid(vm.data.objTamUng.BangChu, 'isEmpty');
            if (vm.status.isInValidBangChu) {
                $window.document.getElementById("txtBangChu").focus();
                return;
            }
            vm.status.isInValidLyDo = utility.checkInValid(vm.data.objTamUng.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $window.document.getElementById("LyDo").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objTamUng.Ngay = utility.convertDateFormat(vm.data.objTamUng.Ngay, 'DD/MM/YYYY', 'YYYY-MM-DD')
            vm.data.objTamUng.NhanVienId = NhanVienId;
            TamUngService.update(vm.data.objTamUng).then(function (success) {
                vm.data.objTamUng = success.data.data;
                $('#popupThongTinTamUng').collapse('hide');
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('sa.qldnmain.tamung.tamung.reload');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgay') {
                    vm.status.isInValidNgay = utility.checkInValid(vm.data.objTamUng.Ngay, 'isEmpty');
                    if (!vm.status.isInValidNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNhanVien') {
                    var NhanVienId = joinStr($rootScope.NhanVien, "NhanVienId");
                    vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
                    if (!vm.status.isInValidNhanVien) {
                        $window.document.getElementById(ToId).focus();
                    }
                }  else if (fromId == 'txtTien') {
                    vm.status.isInValidTien = utility.checkInValid(vm.data.objTamUng.Tien, 'isEmpty');
                    if (!vm.status.isInValidTien) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtBangChu') {
                    vm.status.isInValidBangChu = utility.checkInValid(vm.data.objTamUng.BangChu, 'isEmpty');
                    if (!vm.status.isInValidBangChu) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtLyDo') {
                    vm.status.isInValidLyDo = utility.checkInValid(vm.data.objTamUng.LyDo, 'isEmpty');
                    if (!vm.status.isInValidLyDo) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }
        function resetEdit(id) {
            //set condition of has-error
            vm.status.isInValidNgay = false;
            vm.status.isInValid = false;
            vm.status.isInValidTien = false;
            vm.status.isInValidNhanVien = false;
            //
            getById(id);
        };
        function closeEdit() {

            //set condition of has-error
            vm.status.isInValidNgay = false;
            vm.status.isInValidTien = false;
            vm.status.isInValidNhanVien = false;
            // 
            vm.data.listNhanVien = [];
            vm.data.objTamUng = {
                HinhThuc: '1',
                MaTrangThai: '1',
                Ngay: $filter('date')(new Date(), 'dd/MM/yyyy'),
            };
            TamUngId = 0;
            $rootScope.isOpenPopup = false;
            $('#popupThongTinTamUng').collapse("hide");
        }
        function save() {
            if (TamUngId > 0 ) {
                update();
            } else {
                insert();
            }

        }

    }
})();
