(function () {
    'use strict';

    angular
        .module('app')
        .controller('CongViecEditCtrl', CongViecEditCtrl)
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
    function CongViecEditCtrl($rootScope, $scope, CongViecService, utility, $window, $filter) {
        var controllerId = 'CongViecEditCtrl';
        var CongViecId = 0;
        var vm = this;
        vm.data = {
            objCongViec: {
                TienDo: 0,
                MaTrangThai: 'CV_BD',
            },
            error: {},
            listQuyenTacVu: [],
            listDuAn: [],
            listNhanVien: [],
            UserLoginId:'',
            showButtonXoa: false,
            showButtonSave: false,
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
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidTieuDe: false,
            isInValidNgayBatDau: false,
            isInValidNgayKetThuc: false,
            isInValidDuAn: false,
            isInValidNhanVien:false
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListDuAn: clearListDuAn,
            clearListNhanVien: clearListNhanVien
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinCongViec').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinCongViec').on('shown.bs.collapse', function () {
                $("#txtMa").focus();
                $rootScope.isOpenPopup = true;
            });
            initEventListener();
        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
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
                    vm.data.showButtonSave = CongViecId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = CongViecId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('CongViecListCtrl.action.xemCongViec', function (event, data) {
                CongViecId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listDuAn', function (event, data) {
                vm.data.listDuAn = data;
            });
            $scope.$on(controllerId + '.data.listNguoiXuLyEdit', function (event, data) {
                vm.data.listNhanVien = data;
            });
        }
        function clearListDuAn() {
            utility.clearArray(vm.data.listDuAn);
        }
        function clearListNhanVien() {
            utility.clearArray(vm.data.listNhanVien);
        }
        function refresh() {
            setEnableButton();
            if (CongViecId > 0) {
                CongViecService.getById(CongViecId).then(function (result) {
                    if (result.data.data.length>0)
                    {
                        vm.data.listDuAn = [];
                        vm.data.listNhanVien = [];
                        vm.data.objCongViec = result.data.data[0];
                        if (result.data.data[0].DuAnId != null) vm.data.listDuAn.push({ DuAnId: result.data.data[0].DuAnId, TenDuAn: result.data.data[0].TenDuAn });
                        if (result.data.data[0].NguoiXuLy > 0) vm.data.listNhanVien.push({ NhanVienId: result.data.data[0].NguoiXuLy, Ho: result.data.data[0].Ho, Ten: result.data.data[0].Ten });
                        $('#popupThongTinCongViec').collapse('show');
                      
                    }
                    else $rootScope.$broadcast('CongViecListCtrl.action.refresh');
                })
            } else {
                vm.data.listDuAn = [];
                vm.data.listNhanVien = [];
                vm.status.isInValidTieuDe = false;
                vm.status.isInValidNgayBatDau = false;
                vm.status.isInValidNgayKetThuc = false;
                vm.status.isInValidNhanVien = false;
                vm.status.isInValidDuAn = false;
                vm.data.objCongViec = {
                    TienDo: 0,
                    MaTrangThai: 'CV_BD',
                };
            }
        }
        function insert() {
            debugger
            vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objCongViec.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $window.document.getElementById('txtTieuDe').focus();
                return;
            }
            vm.status.isInValidNgayBatDau = utility.checkInValid(vm.data.objCongViec.NgayBatDau, 'isEmpty');
            if (vm.status.isInValidNgayBatDau) {
                $window.document.getElementById('txtNgayBatDau').focus();
                return;
            }
            vm.status.isInValidNgayKetThuc = utility.checkInValid(vm.data.objCongViec.NgayKetThuc, 'isEmpty');
            if (vm.status.isInValidNgayKetThuc) {
                $window.document.getElementById('txtNgayKetThuc').focus();
                return;
            }
            vm.status.isInValidDuAn = utility.checkInValid(vm.data.listDuAn.length > 0 ? vm.data.listDuAn[0].DuAnId : '', 'isEmpty');
            if (vm.status.isInValidDuAn) {
                $window.document.getElementById('popDuAn').focus();
                return;
            }
            vm.status.isInValidNhanVien = utility.checkInValid(vm.data.listNhanVien.length > 0 ? vm.data.listNhanVien[0].NhanVienId : '', 'isEmpty');
            if (vm.status.isInValidNhanVien) {
                $window.document.getElementById('popNhanVien').focus();
                return;
            }
            vm.data.objCongViec.NguoiTao = vm.data.UserLoginId;
            vm.data.objCongViec.DuAnId = joinStr(vm.data.listDuAn, 'DuAnId');
            vm.data.objCongViec.NguoiXuLy = joinStr(vm.data.listNhanVien, 'NhanVienId');
            CongViecService.insert(vm.data.objCongViec).then(function (success) {
                if (success.data.result) {
                    CongViecId = success.data.CongViecId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('CongViecListCtrl.action.refresh');
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

            vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objCongViec.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $window.document.getElementById('txtTieuDe').focus();
                return;
            }
            vm.status.isInValidNgayBatDau = utility.checkInValid(vm.data.objCongViec.NgayBatDau, 'isEmpty');
            if (vm.status.isInValidNgayBatDau) {
                $window.document.getElementById('txtNgayBatDau').focus();
                return;
            }
            vm.status.isInValidNgayKetThuc = utility.checkInValid(vm.data.objCongViec.NgayKetThuc, 'isEmpty');
            if (vm.status.isInValidNgayKetThuc) {
                $window.document.getElementById('txtNgayKetThuc').focus();
                return;
            }
            vm.status.isInValidDuAn = utility.checkInValid(vm.data.listDuAn.length > 0 ? vm.data.listDuAn[0].DuAnId : '', 'isEmpty');
            if (vm.status.isInValidDuAn) {
                $window.document.getElementById('popDuAn').focus();
                return;
            }
            vm.status.isInValidNhanVien = utility.checkInValid(vm.data.listNhanVien.length > 0 ? vm.data.listNhanVien[0].NhanVienId : '', 'isEmpty');
            if (vm.status.isInValidNhanVien) {
                $window.document.getElementById('popNhanVien').focus();
                return;
            }
            vm.data.objCongViec.NguoiTao = vm.data.UserLoginId;
            vm.data.objCongViec.DuAnId = joinStr(vm.data.listDuAn, 'DuAnId');
            vm.data.objCongViec.NguoiXuLy = joinStr(vm.data.listNhanVien, 'NhanVienId');
            vm.data.objCongViec.NgayBatDau = utility.convertDateFormat(vm.data.objCongViec.NgayBatDau, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objCongViec.NgayKetThuc = utility.convertDateFormat(vm.data.objCongViec.NgayKetThuc, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objCongViec.NgayThatSuBatDau = utility.convertDateFormat(vm.data.objCongViec.NgayThatSuBatDau, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objCongViec.NgayThatSuKetThuc = utility.convertDateFormat(vm.data.objCongViec.NgayThatSuKetThuc, 'DD/MM/YYYY', 'YYYY-MM-DD');
            CongViecService.update(vm.data.objCongViec).then(function (success) {
                closeEdit();
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('CongViecListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtTieuDe') {
                    vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objCongViec.TieuDe, 'isEmpty');
                    if (!vm.status.isInValidTieuDe) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNgayBatDau') {
                    vm.status.isInValidNgayBatDau = utility.checkInValid(vm.data.objCongViec.NgayBatDau, 'isEmpty');
                    if (!vm.status.isInValidNgayBatDau) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNgayKetThuc') {
                    vm.status.isInValidNgayKetThuc = utility.checkInValid(vm.data.objCongViec.NgayKetThuc, 'isEmpty');
                    if (!vm.status.isInValidNgayKetThuc) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }   
            }
        }
        function resetEdit(id) {
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidNgayBatDau = false;
            vm.status.isInValidNgayKetThuc = false;
            vm.status.isInValidNhanVien = false;
            vm.status.isInValidDuAn = false;
            refresh();
        };
        function closeEdit() {
            vm.data.listDuAn = [];
            vm.data.listNhanVien = [];
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidNgayBatDau = false;
            vm.status.isInValidNgayKetThuc = false;
            vm.status.isInValidNhanVien = false;
            vm.status.isInValidDuAn = false;
            vm.data.objCongViec = {
                TienDo: 0,
                MaTrangThai: 'CV_BD',
            };
            CongViecId=0;
            $('#popupThongTinCongViec').collapse('hide');
        }
        function save() {
            if (CongViecId > 0) {
                update();
            } else {
                insert();
            }
        }
    }
})();
