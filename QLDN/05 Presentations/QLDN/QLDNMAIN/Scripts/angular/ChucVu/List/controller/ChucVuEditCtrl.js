(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChucVuEditCtrl', ChucVuEditCtrl);


    function ChucVuEditCtrl($rootScope, $scope, ChucVuService, utility, $window) {
        var controllerId = 'ChucVuEditCtrl';
        var vm = this;
        
        vm.data = {
            ChucVuId: 0,
            UserLoginId: 0,
            objChucVu: {
                ChucVuId: 0,
                UserLoginId: 0
            },
            error: {},
            showButtonXoa: false,
            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidSoNgay: false,
            isInValidTenLoaiPhep: false,
            isInValidMaChucVu: false
        };

        vm.action = {

            save: save,
            deleteOne: deleteOne,
            GetListLuocSu: GetListLuocSu,
            refresh: refresh,
            closeEdit: closeEdit,
            keyPress: keyPress
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
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }

            initEventListener();
        }

        function initEventListener() {
            $scope.$on(controllerId + '.action.xemChucVu', function (event, data) {                
                vm.data.objChucVu.ChucVuId = data;
                setEnableButton(); //set role of user login
                refresh(); //get info of the object by id
            });

            $scope.$on(controllerId + '.action.callSave', function (event, data) {
                if (vm.data.showButtonSave == true) {
                    vm.action.save();
                }
            });
        }

        function refresh() {

            if (vm.data.objChucVu.ChucVuId && vm.data.objChucVu.ChucVuId > 0) {                
                ChucVuService.getById(vm.data.objChucVu.ChucVuId, vm.data.UserLoginId).then(function (result) {
                    vm.data.objChucVu = result.data.data[0];                    
                })
            }
            else {
                vm.data.objChucVu = {
                    ChucVuId: 0,
                    MaChucVu: '',
                    TenLoaiPhep: '',
                    SoNgay: 1,
                    NguoiTao: '1'
                };
            }
        }

        function strJoin(arrayObj, propertyName, joinChar) {
            var arrayProperty = new Array();
            for (var i = 0; i < arrayObj.length; i++) {
                arrayProperty.push(arrayObj[i][propertyName]);
            }
            return arrayProperty.join(joinChar);
        }

        function setEnableButton() {

            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = vm.data.objChucVu.ChucVuId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.objChucVu.ChucVuId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        // Kiểm lỗi và chuẩn bị kiểu data trước khi Insert, Update
        function prepareData() {
            debugger;
            var obj = utility.clone(vm.data.objChucVu);

            vm.status.isInValidMaChucVu = utility.checkInValid(obj.MaChucVu, 'isEmpty');
            if (vm.status.isInValidMaChucVu) {
                $("#txtMaChucVu").focus();
                return null;
            }

            vm.status.isInValidTenChucVu = utility.checkInValid(obj.TenChucVu, 'isEmpty');
            if (vm.status.isInValidTenLoaiPhep) {
                $("#txtTenChucVu").focus();
                return null;
            }

            return obj;
        }

        // Thêm mới
        function insert(obj) {

            ChucVuService.insert(obj, vm.data.UserLoginId).then(function (result) {
                alert("Thêm mới thành công");
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {                
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        // Cập nhật
        function update(obj) {

            ChucVuService.update(obj, vm.data.UserLoginId).then(function (result) {
                alert("Cập nhật thành công");
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        // Xóa
        function deleteOne(list) {

            vm.data.isLoading = true;
            var msg = "";
            var listSelected = new Array();

            if (list) {
                listSelected.push({
                    ChucVuId: list.ChucVuId,
                    CTRVERSION: list.CtrVersion,
                });
            }

            msg = 'Bạn có muốn xóa không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }

                var data = {};
                data.listChucVu = listSelected;
                data.loginId = vm.data.UserLoginId;

                ChucVuService.removeList(data).then(function (success) {
                    vm.data.isLoading = false;
                    alert('Xóa thành công!');
                    resetStatus();
                    $scope.$emit(controllerId + '.action.save');
                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error != null) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.data.Message);
                    }
                });
            }
        }

        function save() {
            
            vm.status.isLoading = true;

            var obj = prepareData();

            if (obj == null)
                return;

            if (obj.ChucVuId && obj.ChucVuId > 0) {
                update(obj);
            }
            else {
                insert(obj);
            }

            vm.status.isLoading = false;
        }

        function resetStatus() {
            //set condition of has-error            
            vm.status.isInValidMaChucVu = false;
            vm.status.isInValidTenLoaiPhep = false;
            vm.status.isInValidSoNgay = false;
            //
        }

        function closeEdit() {
            
            resetStatus();
            $scope.$emit(controllerId + '.action.closeEdit');
        }

        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
               
                if (fromId == 'txtMaLoai') {
                    vm.status.isInValidMaChucVu = utility.checkInValid(value , 'isEmpty');
                    if (!vm.status.isInValidMaChucVu) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtTenLoai') {
                    vm.status.isInValidTenLoaiPhep = utility.checkInValid(value, 'isEmpty');
                    if (!vm.status.isInValidTenLoaiPhep) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtSoNgay') {
                    vm.status.isInValidSoNgay = utility.checkInValid(value, 'isNumber');
                    if (!vm.status.isInValidSoNgay) {
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        function GetListLuocSu(id) {
            vm.data.isLoading = true;

            var draw = 1;
            var start = 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = 10;  // Number of entries showed per page.
            var sortName = 'LuocSuId';
            var sortDir = 'desc';
            var searchString = id + "|ChucVu";
            var fields = "ngay,sukien, HoTen";
            ChucVuService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data.length > 0) {
                    var msg = "";
                    $.each(success.data.data, function (i, item) {
                        var date = new Date(item.ngay);
                        msg = msg + "Ngày: " + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ", Họ tên: " + item.HoTen + ", Sự kiện: " + item.sukien + "\n";
                    });
                    alert(msg);
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
            });
        }
    }
})();
