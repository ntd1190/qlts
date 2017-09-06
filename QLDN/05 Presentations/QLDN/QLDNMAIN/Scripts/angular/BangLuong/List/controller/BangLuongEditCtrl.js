(function () {
    'use strict';

    angular
        .module('app')
        .controller('BangLuongEditCtrl', BangLuongEditCtrl);


    function BangLuongEditCtrl($rootScope, $scope, BangLuongService,utility,$window) {
        var controllerId = 'BangLuongEditCtrl';
        var vm = this;

        vm.data = {
            listTanSuat: [],
            listQuyenTacVu: [],

            objBangLuong: {

            },

            nhanVienId: '0',
            error: {},
            showButtonXoa: false,
            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidThoiGianPhatSinh: false,
            isInValidNgayTraLuong: false,
            isInValidThangNam: false,
            isInValidTenBangLuong: false,
            isInValidSoNguoi: false,
            isInValidSoNgay: false,
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

                vm.data.nhanVienId = config.userInfo.NhanVienId ? config.userInfo.NhanVienId : '0';
            }

            initEventListener();
        }

        function initEventListener() {
            $scope.$on(controllerId + '.action.xemBangLuong', function (event, data) {
                vm.data.objBangLuong.BangLuongId = data;
                refresh();
                
            });


            $scope.$on(controllerId + '.action.callSave', function (event, data) {
                if (vm.data.showButtonSave == true) {
                    vm.action.save();
                }
            });
        }

        function refresh() {
            if (vm.data.objBangLuong.BangLuongId && vm.data.objBangLuong.BangLuongId > 0) {
                BangLuongService.getById(vm.data.objBangLuong.BangLuongId).then(function (result) {
                    vm.data.objBangLuong = result.data.data;

                    vm.data.objBangLuong.NgayTraLuong = utility.convertDateFormat(vm.data.objBangLuong.NgayTraLuong, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objBangLuong.NgayBatDau = utility.convertDateFormat(vm.data.objBangLuong.NgayBatDau, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objBangLuong.NgayKetThuc = utility.convertDateFormat(vm.data.objBangLuong.NgayKetThuc, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objBangLuong.ThangNam = utility.convertDateFormat(vm.data.objBangLuong.ThangNam, "YYYY-MM-DD", "MM/YYYY");

                    setEnableButton();
                })
            } else {
                vm.data.objBangLuong = {
                    BangLuongId: 0,
                    TanSuatTraLuong: 'THANG',
                    NgayBatDau: '01' + moment().format("/MM/YYYY"),
                    NgayKetThuc: moment(moment()).endOf('month').format("DD/MM/YYYY"),
                    NgayTraLuong: '10' + moment().add(1,'month').format("/MM/YYYY"),
                    ThangNam: moment().format("MM/YYYY"),
                    SoNgay: 24,
                    SoNguoi: 0,
                    TenBangLuong: '',
                    MaTrangThai: 'BL_KN',
                    NguoiTao: vm.data.nhanVienId ? vm.data.nhanVienId :'0' ,
                };

                countNhanVienCanTinhLuong();

                setEnableButton();
            }
        }

        function setEnableButton() {

            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = vm.data.objBangLuong.BangLuongId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0 && vm.data.objBangLuong.MaTrangThai == 'BL_KN') {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.objBangLuong.BangLuongId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        // Kiểm lỗi và chuẩn bị kiểu data trước khi Insert, Update
        function prepareData()
        {
            var obj = utility.clone(vm.data.objBangLuong);

            vm.status.isInValidThangNam = utility.checkInValid(obj.ThangNam, 'isEmpty');
            if (!utility.checkInValid(obj.ThangNam, 'isEmpty')) {
                obj.ThangNam = "01/" + obj.ThangNam;

                if (!moment(obj.ThangNam, "DD/MM/YYYY", true).isValid()) {
                    vm.status.isInValidThangNam = true;
                }
            }
            if (vm.status.isInValidThangNam) {
                $("#thangnamedit").focus();
                return null;
            }

            vm.status.isInValidThoiGianPhatSinh = utility.checkInValid(obj.NgayBatDau, 'isEmpty');
            if (vm.status.isInValidThoiGianPhatSinh) {
                $("#tungayedit").focus();
                return null;
            }

            vm.status.isInValidThoiGianPhatSinh = utility.checkInValid(obj.NgayKetThuc, 'isEmpty');
            var datefrom = moment(obj.NgayBatDau);
            var dateto = moment(obj.NgayKetThuc);
            if (dateto < datefrom) {
                alert("Không thể chọn thời gian phát sinh từ ngày lớn hơn đến ngày!");
                vm.status.isInValidThoiGianPhatSinh = true;
            }
            if (vm.status.isInValidThoiGianPhatSinh) {
                $("#denngayedit").focus();
                return null;
            }
          
            vm.status.isInValidNgayTraLuong = utility.checkInValid(obj.NgayTraLuong, 'isEmpty');
            if (vm.status.isInValidNgayTraLuong) {
                $("#ngaytraluongedit").focus();
                return null;
            }

            vm.status.isInValidTenBangLuong = utility.checkInValid(obj.TenBangLuong, 'isEmpty');
            if (vm.status.isInValidTenBangLuong) {
                $("#txtTenBangLuong").focus();
                return null;
            }

            vm.status.isInValidSoNguoi = utility.checkInValid(obj.SoNguoi, 'isNumber');
            if (vm.status.isInValidSoNguoi) {
                $("#txtSoNguoi").focus();
                return null;
            }

            vm.status.isInValidSoNgay = utility.checkInValid(obj.SoNgay, 'isEmpty');
            if (vm.status.isInValidSoNgay) {
                $("#txtSoNgay").focus();
                return null;
            }        

            obj.strNgayBatDau = obj.NgayBatDau;

            obj.strNgayKetThuc = obj.NgayKetThuc;

            obj.strNgayTraLuong = obj.NgayTraLuong;

            obj.strThangNam = obj.ThangNam;

            return obj;
        }

        // Thêm mới
        function insert(obj) {

            BangLuongService.insert(obj).then(function (result) {
                //alert("Thêm mới thành công");
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

        // Cập nhật
        function update(obj) {

            BangLuongService.update(obj).then(function (result) {
                //alert("Cập nhật thành công");
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

        // Xóa
        function deleteOne(list) {

            vm.data.isLoading = true;
            var msg = "";
            var listSelected = new Array();

            if (list) {
                listSelected.push({
                    ID: list.BangLuongId,
                    CTRVERSION: list.CtrVersion,
                });
            }

            msg = 'Bạn có muốn xóa không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }
                BangLuongService.removeList(listSelected).then(function (success) {
                    vm.data.isLoading = false;
                    alert('Xóa thành công!');
                    resetStatus();
                    $scope.$emit(controllerId + '.action.save');
                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.message);
                    }
                });
            }
        }

        function save() {

            vm.status.isLoading = true;

            var obj = prepareData();

            if (obj == null)
                return;


            if (obj.BangLuongId && obj.BangLuongId > 0) {
                update(obj);
            }
            else {
                insert(obj);
            }

            vm.status.isLoading = false;
        }

        // Đếm nhân viên cần tính lương
        function countNhanVienCanTinhLuong() {
            BangLuongService.countNhanVienCanTinhLuong().then(function (result) {
                
                vm.data.objBangLuong.SoNguoi = result.data.data;
            }, function (error) {
                console.log(error);
                if (error.data.error) {
                    alert(error.data.error.message);
                } else {
                    alert(error.message);
                }
            });
        }

        function resetStatus() {
            //set condition of has-error
            vm.status.isInValidThoiGianPhatSinh = false;
            vm.status.isInValidNgayTraLuong = false;
            vm.status.isInValidThangNam = false;
            vm.status.isInValidTenBangLuong = false;
            vm.status.isInValidSoNguoi = false;
            vm.status.isInValidSoNgay = false;
            //
        }

        function closeEdit() {
            resetStatus();
            $scope.$emit(controllerId + '.action.closeEdit');
        }

        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            //if (event.keyCode == '13') {
            //    //set condition of has-error
            //    if (fromId == 'txtNgay') {
            //        vm.status.isInValidNgay = utility.checkInValid(vm.data.objKhenThuongCaNhan.Ngay, 'isEmpty');
            //        if (!vm.status.isInValidNgay) {
            //            $window.document.getElementById(ToId).focus();
            //        }
            //    }
            //    else if (fromId == 'txtNhanVien') {
            //        var NhanVienId = joinStr($rootScope.NhanVien, "NhanVienId");
            //        vm.status.isInValidNhanVien = utility.checkInValid(NhanVienId, 'isEmpty');
            //        if (!vm.status.isInValidNhanVien) {
            //            $window.document.getElementById(ToId).focus();
            //        }
            //    } else if (fromId == 'txtMucHuong') {
            //        vm.status.isInValidTien = utility.checkInValid(vm.data.objKhenThuongCaNhan.Tien, 'isEmpty');
            //        if (!vm.status.isInValidTien) {
            //            $window.document.getElementById(ToId).focus();
            //        }
            //    } else if (fromId == 'txtBangKhen') {
            //        vm.status.isInValidHinhThuc = utility.checkInValid(vm.data.objKhenThuongCaNhan.HinhThuc, 'isEmpty');
            //        if (!vm.status.isInValidHinhThuc) {
            //            $window.document.getElementById(ToId).focus();
            //        }
            //    } else {
            //        $window.document.getElementById(ToId).focus();
            //    }
            //}
        }

       function GetListLuocSu(id) {
            vm.data.isLoading = true;

            var draw = 1;
            var start = 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = 10;  // Number of entries showed per page.
            var sortName = 'LuocSuId';
            var sortDir = 'desc';
            var searchString = id + "|BangLuong";
            var fields = "ngay,sukien, HoTen";
            BangLuongService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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
