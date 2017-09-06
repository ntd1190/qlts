(function () {
    'use strict';

    angular
        .module('app')
        .controller('NghiPhepEditCtrl', NghiPhepEditCtrl);


    function NghiPhepEditCtrl($rootScope, $scope, NghiPhepService,utility,$window) {
        var controllerId = 'NghiPhepEditCtrl';
        var vm = this;

        vm.data = {
            UserLoginId:'',
            NghiPhepId: 0,
            listLoaiNghiPhep: [],
            listNguoiBanGiao: [],
            listNguoiYeuCau: [],
            listQuyenTacVu: [],

            objNghiPhep: {
                NhanVienIds: '',
            },
            error: {},
            showButtonXoa: false,
            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidSoNgay: false,
            isInValidTieuDe: false,
            isInValidLyDo: false,
            isInValidLoaiNghiPhep:false,
            isInValidNguoiYeuCau:false
        };

        vm.action = {
            clearListLoaiNghiPhep: clearListLoaiNghiPhep,
            clearListNguoiBanGiao: clearListNguoiBanGiao,
            clearListNguoiYeuCau: clearListNguoiYeuCau,
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
            $scope.$on(controllerId + '.action.xemNghiPhep', function (event, data) {
                vm.data.objNghiPhep.NghiPhepId = data;
                setEnableButton();
                    refresh();
            });

            $scope.$on(controllerId + '.data.listLoaiNghiPhep', function (event, data) {

                vm.data.listLoaiNghiPhep = data;
            });

            $scope.$on(controllerId + '.data.listNguoiBanGiao', function (event, data) {

                vm.data.listNguoiBanGiao = data;
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
            vm.action.clearListLoaiNghiPhep();
            vm.action.clearListNguoiBanGiao();
            vm.action.clearListNguoiYeuCau();

            if (vm.data.objNghiPhep.NghiPhepId && vm.data.objNghiPhep.NghiPhepId > 0) {
                NghiPhepService.getById(vm.data.objNghiPhep.NghiPhepId).then(function (result) {
                    vm.data.objNghiPhep = result.data.data;

                    vm.data.objNghiPhep.TuNgay = convertDateFormat(vm.data.objNghiPhep.TuNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objNghiPhep.DenNgay = convertDateFormat(vm.data.objNghiPhep.DenNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objNghiPhep.NgayTao = convertDateFormat(vm.data.objNghiPhep.NgayTao, "YYYY-MM-DD", "DD/MM/YYYY");

                    vm.data.objNghiPhep.LoaiNgay = vm.data.objNghiPhep.LoaiNgay.toString();
                    //vm.data.listNguoiBanGiao = result.data.data.NguoiBanGiao;
                    $scope.$emit(controllerId + '.action.getInfoLoaiNghiPhep', result.data.data.MaLoaiNghiPhep);
                    $scope.$emit(controllerId + '.action.getInfoBanGiao', result.data.data.NguoiBanGiao);
                    $scope.$emit(controllerId + '.action.getInfoYeuCau', result.data.data.NhanVienId);
                })
            } else {
                vm.data.objNghiPhep = {
                    NghiPhepId: 0,
                    LoaiNgay: '1',
                    TuNgay: moment().add(1, 'day').format("DD") + moment().format("/MM/YYYY"),
                    DenNgay: moment().add(1, 'day').format("DD") + moment().format("/MM/YYYY"),
                    SoNgay: 1,
                    TieuDe: '',
                    MaTrangThai: 'NP_DD',
                    MaLoaiNghiPhep: 'PHEPNAM',
                    NguoiBanGiao: '0',
                    NhanVienId:'0',
                    NguoiTao: '1'
                };
            }
        }

        function convertDateFormat(strDate, formatInput, formatOutput) {
            var result = moment(strDate, formatInput).format(formatOutput);
            result = result == 'Invalid date' ? '' : result;
            return result;
        }

        /* Loai Nghi Phep */
        function clearListLoaiNghiPhep() {
            utility.clearArray(vm.data.listLoaiNghiPhep);
        }

        /* Người yêu cầu */
        function clearListNguoiYeuCau() {
            utility.clearArray(vm.data.listNguoiYeuCau);
        }

        /* Người bàn giao */
        function clearListNguoiBanGiao() {
            utility.clearArray(vm.data.listNguoiBanGiao);
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
                    vm.data.showButtonSave = vm.data.objNghiPhep.NghiPhepId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.objNghiPhep.NghiPhepId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        // Kiểm lỗi và chuẩn bị kiểu data trước khi Insert, Update
        function prepareData()
        {
            var obj = utility.clone(vm.data.objNghiPhep);

            var datefrom = $('#tungayedit').datetimepicker('getValue');
            var dateto = $('#denngayedit').datetimepicker('getValue');

            if (obj.TuNgay == '' || obj.TuNgay == '' || datefrom == null || dateto==null) {
                alert("Thời gian nghỉ phép không được rỗng!");
                return null;
            }
          
            if (dateto < datefrom ) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return null;
            }

            vm.status.isInValidSoNgay = utility.checkInValid(obj.SoNgay, 'isNumber');
            if (vm.status.isInValidSoNgay) {
                $("#txtSoNgay").focus();
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

            obj.MaLoaiNghiPhep = null;
            if (vm.data.listLoaiNghiPhep.length > 0) {
                obj.MaLoaiNghiPhep = vm.data.listLoaiNghiPhep[0]["MaLoaiNghiPhep"];
            }
            else {
                vm.status.isInValidLoaiNghiPhep = true;
                $("#searchLoaiNghiPhep").focus();
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

            obj.strTuNgay = obj.TuNgay;

            obj.strDenNgay = obj.DenNgay;

            obj.TuNgay = convertDateFormat(obj.TuNgay, "DD/MM/YYYY", "YYYY-MM-DD");

            obj.DenNgay = convertDateFormat(obj.DenNgay, "DD/MM/YYYY", "YYYY-MM-DD");

            obj.NguoiBanGiao = null;

            obj.NguoiTao = vm.data.UserLoginId;

            if (vm.data.listNguoiBanGiao.length > 0)
                obj.NguoiBanGiao = vm.data.listNguoiBanGiao[0]["NhanVienId"];

            return obj;
        }

        // Thêm mới
        function insert(obj) {

            NghiPhepService.insert(obj).then(function (result) {
                //alert("Thêm mới thành công");
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {
                //console.log(error);
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        // Cập nhật
        function update(obj) {

            //if (vm.data.UserLoginId != vm.data.objNghiPhep.NguoiTao) {
            //    alert('Bạn không có quyền xóa hay sửa!');
            //    return;
            //}
            if (vm.data.objNghiPhep.MaTrangThai != 'NP_DD') {
                alert('Phiếu đã duyệt không được xóa hay sửa!');
                return;
            }

            NghiPhepService.update(obj).then(function (result) {
                //alert("Cập nhật thành công");
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {
                //console.log(error);
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        // Xóa
        function deleteOne(list) {

            if (vm.data.objNghiPhep.MaTrangThai != 'NP_DD') {
                alert('Phiếu đã duyệt không được xóa hay sửa!');
                return;
            }

            vm.data.isLoading = true;
            var msg = "";
            var listSelected = new Array();

            if (list) {
                listSelected.push({
                    NP_ID: list.NghiPhepId,
                    CTRVERSION: list.CtrVersion,
                });
            }

            msg = 'Bạn có muốn xóa không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }
                NghiPhepService.removeList(listSelected).then(function (success) {
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


            if (obj.NghiPhepId && obj.NghiPhepId > 0) {
                update(obj);
            }
            else {
                insert(obj);
            }

            vm.status.isLoading = false;
        }

        function resetStatus() {
            //set condition of has-error
            vm.status.isInValidSoNgay = false;
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidLyDo = false;
            vm.status.isInValidNguoiYeuCau = false;
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
            var searchString = id + "|NghiPhep";
            var fields = "ngay,sukien, HoTen";
            NghiPhepService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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
