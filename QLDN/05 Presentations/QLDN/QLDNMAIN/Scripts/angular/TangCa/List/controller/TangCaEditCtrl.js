(function () {
    'use strict';

    angular
        .module('app')
        .controller('TangCaEditCtrl', TangCaEditCtrl);


    function TangCaEditCtrl($rootScope, $scope, TangCaService,utility,$window) {
        var controllerId = 'TangCaEditCtrl';
        var vm = this;

        vm.data = {
            listLoaiTangCa: [],
            listNguoiYeuCau: [],
            listQuyenTacVu: [],

            objTangCa: {

            },

            nhanVienId: '0',
            error: {},
            showButtonXoa: false,
            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidNgayTangCa: false,
            isInValidGioBatDau: false,
            isInValidGioKetThuc: false,
            isInValidSoGio: false,
            isInValidTieuDe: false,
            isInValidLyDo: false,
            isInValidLoaiTangCa:false,
            isInValidNguoiYeuCau:false
        };

        vm.action = {
            clearListNguoiYeuCau: clearListNguoiYeuCau,
            save: save,
            deleteOne: deleteOne,
            GetListLuocSu: GetListLuocSu,
            refresh: refresh,
            closeEdit: closeEdit,
            calculateSoGio: calculateSoGio,
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
            $scope.$on(controllerId + '.action.xemTangCa', function (event, data) {
                vm.data.objTangCa.TangCaId = data;
                setEnableButton();
                    refresh();
            });

            $scope.$on(controllerId + '.data.listNguoiYeuCau', function (event, data) {

                vm.data.listNguoiYeuCau = data;
            });

            $scope.$on(controllerId + '.action.callSave', function (event, data) {
                if (vm.data.showButtonSave == true) {
                    vm.action.save();
                }
            });
        }

        function refresh() {
            vm.action.clearListNguoiYeuCau();

            if (vm.data.objTangCa.TangCaId && vm.data.objTangCa.TangCaId > 0) {
                TangCaService.getById(vm.data.objTangCa.TangCaId).then(function (result) {
                    vm.data.objTangCa = result.data.data;

                    vm.data.objTangCa.NgayTangCa = utility.convertDateFormat(vm.data.objTangCa.NgayTangCa, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objTangCa.GioBatDau = utility.convertDateFormat(vm.data.objTangCa.GioBatDau, "YYYY-MM-DD HH:mm:ss", "HH:mm");
                    vm.data.objTangCa.GioKetThuc = utility.convertDateFormat(vm.data.objTangCa.GioKetThuc, "YYYY-MM-DD HH:mm:ss", "HH:mm");

                    vm.data.objTangCa.Loai = vm.data.objTangCa.Loai;

                    $scope.$emit(controllerId + '.action.getInfoYeuCau', result.data.data.NhanVienId);
                })
            } else {
                vm.data.objTangCa = {
                    TangCaId: 0,
                    Loai: 'l150',
                    NgayTangCa: '',
                    GioBatDau: '',
                    GioKetThuc: '',
                    SoGio: 0,
                    TieuDe: '',
                    MaTrangThai: 'TC_DD',
                    NhanVienId:'0',
                    NguoiTao: vm.data.nhanVienId ? vm.data.nhanVienId :'0' ,
                };
            }
        }

        /* Người yêu cầu */
        function clearListNguoiYeuCau() {
            utility.clearArray(vm.data.listNguoiYeuCau);
        }

        function setEnableButton() {

            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = vm.data.objTangCa.TangCaId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.objTangCa.TangCaId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        // Kiểm lỗi và chuẩn bị kiểu data trước khi Insert, Update
        function prepareData()
        {
            var obj = utility.clone(vm.data.objTangCa);

           //alert(calculateSoGio(timeFrom, timeTo));

            //if (obj.NgayTangCa == '') {
            //    alert("Ngày tăng ca không được rỗng!");
            //    return null;
            //}

            vm.status.isInValidNgayTangCa = utility.checkInValid(obj.NgayTangCa, 'isEmpty');
            if (vm.status.isInValidNgayTangCa) {
                $("#ngaytangcaedit").focus();
                return null;
            }
          
            vm.status.isInValidGioBatDau = utility.checkInValid(obj.GioBatDau, 'isEmpty');
            if (vm.status.isInValidGioBatDau) {
                $("#giobatdauedit").focus();
                return null;
            }

            vm.status.isInValidGioKetThuc = utility.checkInValid(obj.GioKetThuc, 'isEmpty');
            if (!checkSoGio()) {
                vm.status.isInValidGioKetThuc = true;
                alert("Giờ kết thúc phải lớn hơn giờ bắt đầu!");
            }
            if (vm.status.isInValidGioKetThuc) {
                $("#gioketthucedit").focus();
                return null;
            }


            vm.status.isInValidSoGio = utility.checkInValid(obj.SoGio, 'isNumber');
            if (!utility.checkInValid(obj.SoGio, 'isNumber')) {
                if (obj.SoGio > 24 || obj.SoGio < 0.5)
                    vm.status.isInValidSoGio = true;
            }
            if (vm.status.isInValidSoGio) {
                $("#txtSoGio").focus();
                return null;
            }

            vm.status.isInValidTieuDe = utility.checkInValid(obj.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $("#txtTieuDe").focus();
                return null;
            }

            vm.status.isInValidLyDo = utility.checkInValid(obj.LyDo, 'isEmpty');
            if (vm.status.isInValidLyDo) {
                $("#txtLyDo").focus();
                return null;
            }

            obj.NhanVienId = null;
            if (vm.data.listNguoiYeuCau.length > 0) {
                obj.NhanVienId = vm.data.listNguoiYeuCau[0]["NhanVienId"];
            }
            else {
                vm.status.isInValidNguoiYeuCau = true;
                $("#searchNguoiYeuCau").focus();
                return null;
            }            

            obj.strNgayTangCa = obj.NgayTangCa;

            obj.strGioBatDau = obj.GioBatDau;

            obj.strGioKetThuc = obj.GioKetThuc;

            obj.NgayTangCa = utility.convertDateFormat(obj.NgayTangCa, "DD/MM/YYYY", "YYYY-MM-DD");

            obj.strGioBatDau = obj.strNgayTangCa + ' ' + obj.strGioBatDau;

            obj.strGioKetThuc = obj.strNgayTangCa + ' ' + obj.strGioKetThuc;

            return obj;
        }

        // Thêm mới
        function insert(obj) {

            TangCaService.insert(obj).then(function (result) {
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

            TangCaService.update(obj).then(function (result) {
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
                    ID: list.TangCaId,
                    CTRVERSION: list.CtrVersion,
                });
            }

            msg = 'Bạn có muốn xóa không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }
                TangCaService.removeList(listSelected).then(function (success) {
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


            if (obj.TangCaId && obj.TangCaId > 0) {
                update(obj);
            }
            else {
                insert(obj);
            }

            vm.status.isLoading = false;
        }

        function resetStatus() {
            //set condition of has-error
            vm.status.isInValidSoGio = false;
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidLyDo = false;
            vm.status.isInValidNguoiYeuCau = false;
            //
        }

        function closeEdit() {
            resetStatus();
            $scope.$emit(controllerId + '.action.closeEdit');
        }


        function checkSoGio() {
            var gioBatDau = $('#giobatdauedit').datetimepicker('getValue');
            var gioKetThuc = $('#gioketthucedit').datetimepicker('getValue');

            var start = moment(gioBatDau);
            var end = moment(gioKetThuc);
            var duration = moment.duration(end.diff(start));
            var hours = duration.asHours();
            if (hours > 24 || hours < 0.5)
                return false;
            return true;
        }

        function calculateSoGio() {

            var gioBatDau = $('#giobatdauedit').datetimepicker('getValue');
            var gioKetThuc = $('#gioketthucedit').datetimepicker('getValue');

            var start =moment(moment().format("YYYY-MM-DD") + " " + moment(gioBatDau).format("HH:mm"));
            var end = moment(moment().format("YYYY-MM-DD") + " " + moment(gioKetThuc).format("HH:mm"));
            var duration = moment.duration(end.diff(start));
            var hours = duration.asHours();
            if (hours > 24 || hours < 0.5)
                hours = 0;

            vm.data.objTangCa.SoGio = hours;
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
            var searchString = id + "|TangCa";
            var fields = "ngay,sukien, HoTen";
            TangCaService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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
