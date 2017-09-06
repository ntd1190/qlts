(function () {
    'use strict';

    angular
        .module('app')
        .controller('DuAnEditCtrl', DuAnEditCtrl)
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
    function DuAnEditCtrl($rootScope, $scope, DuAnService, utility, $window, $filter) {
        var controllerId = 'DuAnEditCtrl';
        var DuAnId = 0;
        var vm = this;
        vm.data = {
            objDuAn: {
                MaTrangThai: 'DA_HD',
            },
            error: {},
            listQuyenTacVu: [],
            listQuanLy: [],
            listPhongBan: [],
            listNhanVien: [],
            UserLoginId:'',
            showButtonXoa: false,
            showButtonSave: false,
        };
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup

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
            isInValidTenDuAn: false,
            isInValidQuanLy: false,
            isInValidNgayBatDau: false,
            isInValidNgayKetThuc: false
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListPhongBan: clearListPhongBan,
            clearListQuanLy: clearListQuanLy,
            clearListNhanVien: clearListNhanVien
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinDuAn').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinDuAn').on('shown.bs.collapse', function () {
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
                    vm.data.showButtonSave = DuAnId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = DuAnId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('DuAnListCtrl.action.xemDuAn', function (event, data) {
                DuAnId = data;
                refresh();
            });
            $scope.$on(controllerId + '.data.listQuanLyEdit', function (event, data) {
                vm.data.listQuanLy = data;
            });
            $scope.$on(controllerId + '.data.listNhanVienEdit', function (event, data) {
                for(var i=0 ;i<data.length;i++ )
                {
                    var trungNV = false;
                    for(var j=0 ;j<vm.data.listNhanVien.length;j++ )
                    {
                        if(data[i].NhanVienId==vm.data.listNhanVien[j].NhanVienId)
                        {
                            trungNV = true;
                        }
                    }
                    if (!trungNV || vm.data.listNhanVien.length==0) {
                        vm.data.listNhanVien.push(data[i]);
                    }
                }
            });
            $scope.$on(controllerId + '.data.listPhongBannEdit', function (event, data) {
                vm.data.listPhongBan = data;
            });
        }
        function clearListPhongBan() {
            utility.clearArray(vm.data.listPhongBan);
        }
        function clearListQuanLy() {
            utility.clearArray(vm.data.listQuanLy);
        }
        function clearListNhanVien() {
            utility.clearArray(vm.data.listNhanVien);
        }
        function refresh() {
            setEnableButton();
            if (DuAnId > 0) {
                DuAnService.getById(DuAnId).then(function (result) {
                    debugger
                    if (result.data.data.length>0)
                    {
                        vm.data.listQuanLy = [];
                        vm.data.listPhongBan = [];
                        vm.data.listNhanVien = [];
                        vm.data.objDuAn = result.data.data[0];
                        if (result.data.data[0].QuanLy) vm.data.listQuanLy.push({ NhanVienId: result.data.data[0].QuanLy, Ho: result.data.data[0].Ho, Ho: result.data.data[0].Ten });
                        if (result.data.data[0].PhongBan) vm.data.listPhongBan.push({ PhongBanId: result.data.data[0].PhongBan, TenPhongBan: result.data.data[0].TenPhongBan });
                        if (result.data.data[0].NhanVienDa) {
                            var listNVID = result.data.data[0].NhanVienDa.split("|");
                            var listNVHO = result.data.data[0].HoDa.split("|");
                            var listNVTEN = result.data.data[0].TenDa.split("|");
                            for (var i = 0; i < listNVID.length; i++)
                            {
                                vm.data.listNhanVien.push({ NhanVienId: listNVID[i], Ho: listNVHO[i], Ten: listNVTEN[i] });
                            }
                        } 
                        vm.data.objDuAn.NgayBatDau = utility.convertDateFormat(vm.data.objDuAn.NgayBatDau, 'YYYY-MM-DD', 'DD/MM/YYYY');
                        vm.data.objDuAn.NgayThatSuBatDau = utility.convertDateFormat(vm.data.objDuAn.NgayThatSuBatDau, 'YYYY-MM-DD', 'DD/MM/YYYY');
                        vm.data.objDuAn.NgayKetThuc = utility.convertDateFormat(vm.data.objDuAn.NgayKetThuc, 'YYYY-MM-DD', 'DD/MM/YYYY');
                        vm.data.objDuAn.NgayThatSuKetThuc = utility.convertDateFormat(vm.data.objDuAn.NgayThatSuKetThuc, 'YYYY-MM-DD', 'DD/MM/YYYY')
                        $('#popupThongTinDuAn').collapse('show');
                    }
                    else $rootScope.$broadcast('DuAnListCtrl.action.refresh');
                })
            } else {
                vm.data.listQuanLy = [];
                vm.data.listPhongBan = [];
                vm.data.listNhanVien = [];
                vm.data.isInValidTenDuAn = false;
                vm.data.isInValidQuanLy = false;
                vm.data.isInValidNgayBatDau = false;
                vm.data.isInValidNgayKetThuc = false;
                vm.data.objDuAn = {
                    MaTrangThai: 'DA_HD',
                };

            }
        }
        function insert() {

            vm.status.isInValidTenDuAn = utility.checkInValid(vm.data.objDuAn.TenDuAn, 'isEmpty');
            if (vm.status.isInValidTenDuAn) {
                $window.document.getElementById('txtTenDuAn').focus();
                return;
            }
            vm.status.isInValidNgayBatDau = utility.checkInValid(vm.data.objDuAn.NgayBatDau, 'isEmpty');
            if (vm.status.isInValidNgayBatDau) {
                $window.document.getElementById('txtNgayBatDau').focus();
                return;
            }
            vm.status.isInValidNgayKetThuc = utility.checkInValid(vm.data.objDuAn.NgayKetThuc, 'isEmpty');
            if (vm.status.isInValidNgayKetThuc) {
                $window.document.getElementById('txtNgayKetThuc').focus();
                return;
            }
            vm.status.isInValidQuanLy = utility.checkInValid(vm.data.listQuanLy.length > 0 ? vm.data.listQuanLy[0].NhanVienId : '', 'isEmpty');
            if (vm.status.isInValidQuanLy) {
                $window.document.getElementById('popQuanLyDuAn').focus();
                return;
            }

            vm.data.objDuAn.NguoiTao = vm.data.UserLoginId;
            vm.data.objDuAn.QuanLy = joinStr(vm.data.listQuanLy, 'NhanVienId');
            vm.data.objDuAn.NhanVien = joinStr(vm.data.listNhanVien, 'NhanVienId');
            vm.data.objDuAn.PhongBan = joinStr(vm.data.listPhongBan, 'PhongBanId');
            DuAnService.insert(vm.data.objDuAn).then(function (success) {
                if (success.data.result) {
                    DuAnId = success.data.DuAnId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('DuAnListCtrl.action.refresh');
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
            vm.status.isInValidTenDuAn = utility.checkInValid(vm.data.objDuAn.TenDuAn, 'isEmpty');
            if (vm.status.isInValidTenDuAn) {
                $window.document.getElementById('txtTenDuAn').focus();
                return;
            }
            vm.status.isInValidNgayBatDau = utility.checkInValid(vm.data.objDuAn.NgayBatDau, 'isEmpty');
            if (vm.status.isInValidNgayBatDau) {
                $window.document.getElementById('txtNgayBatDau').focus();
                return;
            }
            vm.status.isInValidNgayKetThuc = utility.checkInValid(vm.data.objDuAn.NgayKetThuc, 'isEmpty');
            if (vm.status.isInValidNgayKetThuc) {
                $window.document.getElementById('txtNgayKetThuc').focus();
                return;
            }
            vm.status.isInValidQuanLy = utility.checkInValid(vm.data.listQuanLy.length > 0 ? vm.data.listQuanLy[0].NhanVienId : '', 'isEmpty');
            if (vm.status.isInValidQuanLy) {
                $window.document.getElementById('popQuanLyDuAn').focus();
                return;
            }
           
            vm.data.objDuAn.NguoiTao = vm.data.UserLoginId;
            vm.data.objDuAn.QuanLy = joinStr(vm.data.listQuanLy, 'NhanVienId');
            vm.data.objDuAn.NhanVien = joinStr(vm.data.listNhanVien, 'NhanVienId');
            vm.data.objDuAn.PhongBan = joinStr(vm.data.listPhongBan, 'PhongBanId');
            vm.data.objDuAn.NgayBatDau = utility.convertDateFormat(vm.data.objDuAn.NgayBatDau, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objDuAn.NgayKetThuc = utility.convertDateFormat(vm.data.objDuAn.NgayKetThuc, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objDuAn.NgayBatDauThatSu = utility.convertDateFormat(vm.data.objDuAn.NgayBatDauThatSu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            vm.data.objDuAn.NgayKetThucThatSu = utility.convertDateFormat(vm.data.objDuAn.NgayKetThucThatSu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            DuAnService.update(vm.data.objDuAn,vm.data.objDuAn.NhanVien).then(function (success) {
                vm.data.objDuAn = success.data.data;
                closeEdit();
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('DuAnListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtTenDuAn') {
                    vm.status.isInValidTenDuAn = utility.checkInValid(vm.data.objDuAn.TenDuAn, 'isEmpty');
                    if (!vm.status.isInValidTenDuAn) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNgayBatDau') {
                    vm.status.isInValidNgayBatDau = utility.checkInValid(vm.data.objDuAn.NgayBatDau, 'isEmpty');
                    if (!vm.status.isInValidNgayBatDau) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNgayKetThuc') {
                    vm.status.isInValidNgayKetThuc= utility.checkInValid(vm.data.objDuAn.NgayKetThuc, 'isEmpty');
                    if (!vm.status.isInValidNgayKetThuc) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }   
            }
        }
        function resetEdit(id) {
            vm.data.isInValidTenDuAn = false;
            vm.data.isInValidQuanLy = false;
            vm.data.isInValidNgayBatDau = false;
            vm.data.isInValidNgayKetThuc = false;
            refresh();
        };
        function closeEdit() {
            vm.data.isInValidTenDuAn = false;
            vm.data.isInValidQuanLy = false;
            vm.data.isInValidNgayBatDau = false;
            vm.data.isInValidNgayKetThuc = false;
            vm.data.listQuanLy = [];
            vm.data.listPhongBan = [];
            vm.data.listNhanVien = [];
            vm.data.objDuAn = {
                MaTrangThai: 'DA_HD',
            };
            DuAnId=0;
            $('#popupThongTinDuAn').collapse('hide');
        }
        function save() {
            if (DuAnId > 0) {
                update();
            } else {
                insert();
            }
        }
    }
})();
