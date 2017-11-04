/*****************************************************************************
1. Create Date : 2017.06.29
2. Creator     : Nguyen Thanh Binh
3. Description : khophieuxuat/edit
4. History     : 2017.06.29 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('KhoPhieuXuatEditCtrl', function ($scope, KhoPhieuXuatService, utility, Upload, $timeout) {
        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;
        var linkUrl = '';
        var isEdit = 0;
        var phieuXuatId = 0;
        var isLuuSoCai = false;
        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoPhieuXuatEditCtrl';
        vm.getPhieuXuatId = function () {
            return phieuXuatId || 0;
        }
        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isUploading = false;

        vm.error = {};

        vm.data = {};
        vm.data.phieuXuat = {};
        vm.data.tienHang = 0;
        vm.data.listChiTiet = [];
        vm.data.listSeries = [];
        vm.data.fullDateString = '';
        vm.data.HangHoa=[]
        vm.data.listLoaiPhieuXuat = [
            { MaTrangThai: 'LPX_XUATBAN', TrangThai: 'Xuất bán' },
            { MaTrangThai: 'LPX_HUHONG', TrangThai: 'Hư hỏng' },
            { MaTrangThai: 'LPX_THANHLY', TrangThai: 'Thanh lý' },
        ];

        /*** INIT FUNCTION ***/

        // chạy khi controller được khởi tạo
        (function activate() {
            console.log('activate');
            reset();
        })();

        // nhận config từ view
        vm.onInitView = function (config) {
            vm.data.fullDateString = fullDateString(moment().format('DDMMYYYY'), 'DDMMYYYY');
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            if (config && config.isEdit) {
                isEdit = config.isEdit;
            }
            if (config && config.phieuXuatId) {
                phieuXuatId = config.phieuXuatId;
                getPhieuXuatById(phieuXuatId);
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            setDefaltLoaiPhieu()
            initEventListener();
        };

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.checkQuyenTacVu2 = checkQuyenUISauKhiLuuSC;

        vm.action.tinhThue = function () {
            $timeout(function () {
                vm.data.phieuXuat.TienThue = vm.data.tienHang * vm.data.phieuXuat.ThueVAT / 100;
            }, 0);
        }

        vm.action.getSoPhieu = function () {
            if (vm.status.isLoading) { return; }
            getSoPhieuAuto();
        }

        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            if (checkInputPhieuXuat() === false) { return; }

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length < 1) {
                alert('Phiếu chưa có chi tiết');
                return;
            }

            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.phieuXuat.Hinh) {
                    vm.data.phieuXuat.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.phieuXuat.Hinh = vm.data.phieuXuat.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }

            if (checkQuyenUI('M') || checkQuyenUI('A')) {
                updatePhieuXuat();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        };
        vm.action.removeChiTiet = function (item) {
            if (vm.status.isLoading) { return; }
            removeListItem(vm.data.listChiTiet, item, 'PhieuXuatChiTietId');
        };
        vm.action.removePhieuXuat = function () {
            if (vm.status.isLoading) { return; }

            if (checkQuyenUI('D') === false) {
                alert('Bạn không có quyền xóa phiếu xuất');
                return;
            }

            // TODO xác nhận action
            if (confirm('Bạn có muốn xóa phiếu xuất ?')) {
                removePhieuXuat();
            }
        }
        vm.action.emitKhoXuatId = function () {
            var khoid = vm.data.phieuXuat.KhoXuat;
            if (typeof khoid === 'undefined' || khoid === "" || khoid == 0) {
                alert("Bạn chưa chọn kho"); return;
            }
            $scope.$emit(vm.controllerId + '.data.khoxuatidPop', khoid);
        }
        vm.action.luuSoCai = function (KhoaMo) {
            debugger
            if (vm.status.isLoading) { return; }
            if (checkInputPhieuXuat() === false) { return; }

            if (compare(moment().format('DD/MM/YYYY'), vm.data.phieuXuat.strNgayXuat) == -1) {
                alert('Ngày xuất phải nhỏ hơn ngày hiện tại');
                return;
            }
            if (!vm.data.listChiTiet || vm.data.listChiTiet.length < 1) {
                alert('Phiếu chưa có chi tiết');
                return;
            }

            if (KhoaMo == 'Y') {
                if (checkQuyenUI('A') === false) {
                    alert('Bạn không có quyền mở khóa phiếu.');
                    return;
                }
            }
            else {
                if (checkQuyenUI('L') === false) {
                    alert('Bạn không có quyền khóa phiếu');
                    return;
                }
            }

            if (KhoaMo == 'Y') {
                if (confirm('Bạn thật sự muốn mở khóa phiếu?')) {
                    luuSoCai(phieuXuatId, KhoaMo);
                }
            }
            else {
                if (confirm('Bạn thật sự muốn khóa phiếu?')) {
                    luuSoCai(phieuXuatId, KhoaMo);
                }
            }
        };
        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputPhieuXuat($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.xemLuocSu = function () {
            GetListLuocSu(phieuXuatId);
        };
        vm.action.clearKhachHang = function () {
            vm.data.phieuXuat.KhachHangId = 0;
            vm.data.phieuXuat.TenKhachHang = '';
            vm.data.phieuXuat.DiaChi = '';
        }
        vm.action.clearThuKho = function () {
            vm.data.phieuXuat.ThuKho = 0;
            vm.data.phieuXuat.TenThuKho = '';
        }
        vm.action.clearNguoiGiaoHang = function () {
            vm.data.phieuXuat.NguoiGiaoHang = 0;
            vm.data.phieuXuat.TenNguoiGiaoHang = '';
        }
        vm.action.clearkhoXuat = function () {
            vm.data.phieuXuat.KhoXuat = 0;
            vm.data.phieuXuat.TenKhoXuat = '';
        }
        vm.action.goBack = function () {
            window.history.back();
        };

        vm.action.NhapSeries = function (hanghoa) {            
            vm.data.listSeries = [];
            var listSeriesnumber = [];
            var data = {};
            vm.data.HangHoa = hanghoa;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.SoPhieu = vm.data.phieuXuat.SoPhieu;
            data.HangHoaId = hanghoa.HangHoaId;
            KhoPhieuXuatService.GetSeries(data)
                .then(function success(result) {
                    listSeriesnumber = result.data.data;
                    for (var i = 0; i < hanghoa.SoLuong; i++) {
                        var chitiet = {};
                        chitiet.Series = listSeriesnumber.length > i ? listSeriesnumber[i].Series : '';
                        chitiet.SoPhieu = vm.data.phieuXuat.SoPhieu;
                        chitiet.HangHoaId = hanghoa.HangHoaId;
                        chitiet.MaHangHoa = hanghoa.MaHangHoa;
                        chitiet.TenHangHoa = hanghoa.TenHangHoa;
                        chitiet.DonViTinh = hanghoa.DonViTinh;
                        chitiet.DonGia = hanghoa.DonGia;
                        chitiet.ThoiGianBaoHanh = listSeriesnumber.length > i ? (listSeriesnumber[i].ThoiGianBaoHanh ? listSeriesnumber[i].ThoiGianBaoHanh : hanghoa.ThoiGianBaoHanh) : hanghoa.ThoiGianBaoHanh;
                        chitiet.error = false;
                        chitiet.Id = (listSeriesnumber.length > i ? listSeriesnumber[i].Id : 0);
                        chitiet.IsAuto = (listSeriesnumber.length > i ? listSeriesnumber[i].IsAuto : 'N');
                        vm.data.listSeries.push(chitiet);
                    }
                    //vm.data.listSeries = result.data.data;
                    vm.status.isLoading = false;

                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                    }
                    console.log(result);
                });
            $('#SerialHangHoaPop').collapse('show');
            $('#Series1').focus();
        }

        vm.action.changeSeries = function (index) {
            vm.data.listSeries[index].error = false;
            for (var i = 0; i < vm.data.listSeries.length; i++) {
                var item = vm.data.listSeries[i];
                if (vm.data.listSeries[index].Series != "" && index != i && item.Series == vm.data.listSeries[index].Series && vm.data.listSeries[i].error == false) {
                    vm.data.listSeries[index].error = true;
                    alert('Số series: ' + item.Series + ' đã tồn tại!');
                    return;
                }
            }
        }
        vm.action.LuuSerial = function () {            
            for (var i = 0; i < vm.data.listSeries.length; i++) {
                var item = vm.data.listSeries[i];
                if (vm.data.listSeries[i].error == true) {
                    alert('Số series: ' + item.Series + '  đã tồn tại!');
                    return;
                }
            }
            var data = {};
            data.loginId = userInfo ? userInfo.NhanVienId : 0;            
            data.listChiTiet = angular.toJson(vm.data.listSeries);
            KhoPhieuXuatService.LuuSerial(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    $('#SerialHangHoaPop').collapse('hide');
                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                    }
                    console.log(result);
                });
        }

        vm.action.CreateSeriesAuto = function () {            
            //vm.data.listSeries=[]
            var listSeriesnumber = [];
            var data = {};
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.SoPhieu = vm.data.phieuXuat.SoPhieu;
            data.HangHoaId = vm.data.HangHoa.HangHoaId;

            KhoPhieuXuatService.GetSeriesAuto(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    if (result.data.data.length > 0) {
                        vm.data.listSeries = [];
                        vm.data.listSeries = result.data.data;
                    }
                    else {
                        alert("Vui lòng nhấn nút Lưu, sau đó tạo số series tự động!");
                    }
                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                    }
                    console.log(result);
                });            
        }

        vm.action.DeleteSeries = function () {            
            var listSeriesnumber = [];
            var data = {};
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.SoPhieu = vm.data.phieuXuat.SoPhieu;
            data.HangHoaId = vm.data.HangHoa.HangHoaId;

            KhoPhieuXuatService.DeleteSeries(data)
                .then(function success(result) {             
                    vm.status.isLoading = false;                                        
                    $('#SerialHangHoaPop').collapse('hide');
                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                    }
                    console.log(result);
                });            
        }

        vm.action.In = function () {
            var LoginId = userInfo ? userInfo.NhanVienId : 0;
            if (vm.data.phieuXuat.PhieuXuatId == '' || vm.data.phieuXuat.PhieuXuatId == undefined)
                return;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuXuat&data=' + vm.data.phieuXuat.PhieuXuatId + '&LoginId=' + LoginId);
            $('#reportmodal').modal('show');
        };
        vm.action.InSeries = function () {
            var LoginId= userInfo ? userInfo.NhanVienId : 0;
            if (vm.data.phieuXuat.PhieuXuatId == '' || vm.data.phieuXuat.PhieuXuatId == undefined)
                return;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuXuatSeries&data=' + vm.data.phieuXuat.PhieuXuatId + '&LoginId=' + LoginId);
            $('#reportmodal').modal('show');
        };
        vm.action.InMaVach = function () {
            var LoginId = userInfo ? userInfo.NhanVienId : 0;
            if (vm.data.phieuXuat.PhieuXuatId == '' || vm.data.phieuXuat.PhieuXuatId == undefined)
                return;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptInMaVach2&data=' + vm.data.phieuXuat.PhieuXuatId+'&LoginId='+LoginId);
            $('#reportmodal').modal('show');
        };

        vm.action.updateSaukhiLuuSoCai = function (hanghoa) {
            var temp_listChiTiet = [];
            //temp_listChiTiet = vm.data.listChiTiet;

            var list_length = vm.data.listChiTiet.length;
            for (var i = 0; i < list_length; i++) {
                if (vm.data.listChiTiet[i].HangHoaId === hanghoa.HangHoaId) {
                    temp_listChiTiet.push(vm.data.listChiTiet[i]);
                }
            }

            if (vm.status.isLoading) { return; }
            if (checkInputPhieuXuat() === false) { return; }

            //if (checkQuyenUI('L') === false) {
            //    alert('Bạn không có quyền lưu');
            //    return;
            //}
            
            if (confirm('Bạn có muốn lưu không ?')) {
                updateSauKhiLuuSoCai(temp_listChiTiet);
            }
        };
        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            // nhận thông tin hàng hóa
            $scope.$on(vm.controllerId + '.data.listHangHoa', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listHangHoa && v.listHangHoa.length > 0) {
                    getListChiTietPopup(v.listHangHoa);
                }
                console.log(vm.data.listChiTiet);
            });
            // nhận thông tin khách hàng
            $scope.$on(vm.controllerId + '.data.listKhachHang', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listKhachHang && v.listKhachHang.length > 0) {
                    vm.data.phieuXuat.KhachHangId = v.listKhachHang[0].KhachHangId;
                    vm.data.phieuXuat.TenKhachHang = v.listKhachHang[0].TEN;
                    vm.data.phieuXuat.DiaChi = v.listKhachHang[0].DiaChi;
                }
            });
            // nhận thông tin kho hàng
            $scope.$on(vm.controllerId + '.data.listKhoHang', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listKhoHang && v.listKhoHang.length > 0) {
                    vm.data.phieuXuat.KhoXuat = v.listKhoHang[0].KhoHangId;
                    vm.data.phieuXuat.TenKhoXuat = v.listKhoHang[0].TenKho;
                }
            });
            // nhận thông tin tài khoản có
            $scope.$on(vm.controllerId + '.data.listTaiKhoanCo', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanCo && v.listTaiKhoanCo.length > 0) {
                    vm.data.phieuXuat.TaiKhoanCo = v.listTaiKhoanCo[0].TaiKhoanId;
                    vm.data.phieuXuat.MaTaiKhoanCo = v.listTaiKhoanCo[0].MaTaiKhoan;
                }
            });
            // nhận thông tin tài khoản nợ
            $scope.$on(vm.controllerId + '.data.listTaiKhoanNo', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanNo && v.listTaiKhoanNo.length > 0) {
                    vm.data.phieuXuat.TaiKhoanNo = v.listTaiKhoanNo[0].TaiKhoanId;
                    vm.data.phieuXuat.MaTaiKhoanNo = v.listTaiKhoanNo[0].MaTaiKhoan;
                }
            });
            // nhận thông tin tài khoản kho
            $scope.$on(vm.controllerId + '.data.listTaiKhoanKho', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanKho && v.listTaiKhoanKho.length > 0) {
                    vm.data.phieuXuat.TaiKhoanKho = v.listTaiKhoanKho[0].TaiKhoanId;
                    vm.data.phieuXuat.MaTaiKhoanKho = v.listTaiKhoanKho[0].MaTaiKhoan;
                }
            });
            // nhận thông tin tài khoản giá vốn
            $scope.$on(vm.controllerId + '.data.listTaiKhoanGiaVon', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanGiaVon && v.listTaiKhoanGiaVon.length > 0) {
                    vm.data.phieuXuat.TaiKhoanGiaVon = v.listTaiKhoanGiaVon[0].TaiKhoanId;
                    vm.data.phieuXuat.MaTaiKhoanGiaVon = v.listTaiKhoanGiaVon[0].MaTaiKhoan;
                }
            });
            // nhận thông tin thủ kho
            $scope.$on(vm.controllerId + '.data.listThuKho', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listThuKho && v.listThuKho.length > 0) {
                    vm.data.phieuXuat.ThuKho = v.listThuKho[0].NhanVienId;
                    vm.data.phieuXuat.TenThuKho = v.listThuKho[0].Ho + ' ' + v.listThuKho[0].Ten;
                }
            });
            // nhận thông tin người nhận hàng
            $scope.$on(vm.controllerId + '.data.listNguoiGiaoHang', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listNguoiGiaoHang && v.listNguoiGiaoHang.length > 0) {
                    vm.data.phieuXuat.NguoiGiaoHang = v.listNguoiGiaoHang[0].NhanVienId;
                    vm.data.phieuXuat.TenNguoiGiaoHang = v.listNguoiGiaoHang[0].Ho + ' ' + v.listNguoiGiaoHang[0].Ten;
                }
            });
            // nhận sự kiện F8
            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                vm.action.save();
            });
            // nhận sự kiện F2
            $scope.$on(vm.controllerId + '.action.F2', function (e, v) {
             
                vm.action.emitKhoXuatId();
            });
            $('#SerialHangHoaPop').on('shown.bs.collapse', function () {
                $('#Series1').focus();
            });

        }

        /*** BIZ FUNCTION ***/

        function checkInputPhieuXuat(inputName) {
            var has_error = false;
            if (!inputName || inputName === 'NguoiNhanHang') {
                vm.error.NguoiNhanHang = '';
                if (!vm.data.phieuXuat.NguoiNhanHang) {
                    vm.error.NguoiNhanHang = '.';
                    has_error = true;
                }
            }
            //if (!inputName || inputName === 'TenThuKho') {
            //    vm.error.TenThuKho = '';
            //    if (!vm.data.phieuXuat.ThuKho) {
            //        vm.error.TenThuKho = '.';
            //        has_error = true;
            //    }
            //}
            //if (!inputName || inputName === 'TenNguoiGiaoHang') {
            //    vm.error.TenNguoiGiaoHang = '';
            //    if (!vm.data.phieuXuat.NguoiGiaoHang) {
            //        vm.error.TenNguoiGiaoHang = '.';
            //        has_error = true;
            //    }
            //}
            if (!inputName || inputName === 'SoPhieu') {
                vm.error.SoPhieu = '';
                if (!vm.data.phieuXuat.SoPhieu) {
                    vm.error.SoPhieu = '.';
                    has_error = true;
                }
            }
            //if (!inputName || inputName === 'TenKhachHang') {
            //    vm.error.TenKhachHang = '';
            //    if (!vm.data.phieuXuat.TenKhachHang) {
            //        vm.error.TenKhachHang = '.';
            //        has_error = true;
            //    }
            //}
            /*
            if (!inputName || inputName === 'SoHoaDon') {
                vm.error.SoHoaDon = '';
                if (!vm.data.phieuXuat.SoHoaDon) {
                    vm.error.SoHoaDon = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'Seri') {
                vm.error.Seri = '';
                if (!vm.data.phieuXuat.Seri) {
                    vm.error.Seri = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'strNgayChungTu') {
                vm.error.strNgayChungTu = '';
                if (!vm.data.phieuXuat.strNgayChungTu) {
                    vm.error.strNgayChungTu = '.';
                    has_error = true;
                }
            }
            */
            if (!inputName || inputName === 'NoiDung') {
                vm.error.NoiDung = '';
                if (!vm.data.phieuXuat.NoiDung) {
                    vm.error.NoiDung = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'TenKhoXuat') {
                vm.error.TenKhoXuat = '';
                if (!vm.data.phieuXuat.TenKhoXuat) {
                    vm.error.TenKhoXuat = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'strNgayXuat') {
                vm.error.strNgayXuat = '';
                if (!vm.data.phieuXuat.strNgayXuat) {
                    vm.error.strNgayXuat = '.';
                    has_error = true;
                }
            }
            return !has_error;
        }

        function reset() {
            vm.data.phieuXuat.ThueVAT = 10;
            vm.data.phieuXuat.ChiPhi = 0;
        }

        // chuẩn bị dữ liệu gửi api
        function preparePhieuXuat(phieuxuat) {
            phieuxuat.strNgayChungTu = utility.convertDateFormat(phieuxuat.strNgayChungTu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            phieuxuat.strNgayThanhToan = utility.convertDateFormat(phieuxuat.strNgayThanhToan, 'DD/MM/YYYY', 'YYYY-MM-DD');
            phieuxuat.strNgayXuat = utility.convertDateFormat(phieuxuat.strNgayXuat, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }

        // fixed dữ liệu sau khi nhận từ api
        function fixPhieuXuat(phieuxuat) {
            phieuxuat.strNgayChungTu = utility.convertDateFormat(phieuxuat.NgayChungTu, 'YYYY-MM-DD', 'DD/MM/YYYY');
            phieuxuat.strNgayThanhToan = utility.convertDateFormat(phieuxuat.NgayThanhToan, 'YYYY-MM-DD', 'DD/MM/YYYY');
            phieuxuat.strNgayXuat = utility.convertDateFormat(phieuxuat.NgayXuat, 'YYYY-MM-DD', 'DD/MM/YYYY');

            vm.data.fullDateString = fullDateString(moment().format(phieuxuat.NgayTao), 'YYYY-MM-DD');
            setDefaltLoaiPhieu();
        }

        function setDefaltLoaiPhieu() {
            var defaultLoai = 'LPX_XUATBAN';
            if (phieuXuatId && vm.data.phieuXuat.LoaiPhieu) { return; }
            //for (var i = 0; i < vm.data.listLoaiPhieuXuat.length; i++) {
            //    if (vm.data.phieuXuat.LoaiPhieu == vm.data.listLoaiPhieuXuat[i].MaTrangThai) {
            //        return;
            //    }
            //}
            vm.data.phieuXuat.LoaiPhieu = defaultLoai;
        }

        // lấy thông tin hàng hóa từ popup hàng hóa thêm vào chi tiết phiếu xuất
        function getListChiTietPopup(list) {
            for (var i = 0; i < list.length; i++) {                 

                // TODO Thêm vào danh sách chi tiết
                var chitiet = {};
                chitiet.PhieuXuatChiTietId = 0;
                chitiet.SoLuong = 1;
                chitiet.DonGia = 0;

                chitiet.HangHoaId = list[i].HangHoaId;
                chitiet.MaHangHoa = list[i].MaHangHoa;
                chitiet.TenHangHoa = list[i].TenHangHoa;
                chitiet.DonViTinh = list[i].DonViTinh;
                chitiet.ThoiGianBaoHanh = list[i].ThoiGianBaoHanh || 0;
                chitiet.GiaNhap = list[i].DonGiaNhap || 0;
                chitiet.LoHang = list[i].LoHang || '';
                vm.data.listChiTiet.unshift(chitiet);
            }
        }

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            // kiểm tra lưu sổ cái
            if (vm.data.phieuXuat && vm.data.phieuXuat.MaTrangThai === 'KPX_LSC') {
                if (quyen != 'A') { // A: quyền được lưu mặc dù phiếu đã khóa
                    return false;
                }
            }

            if (phieuXuatId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            }
        }
        function checkQuyenUISauKhiLuuSC(quyen) {

            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            // kiểm tra lưu sổ cái
            if (vm.data.phieuXuat && vm.data.phieuXuat.MaTrangThai === 'KPX_LSC') {
                if (listQuyenTacVu.indexOf(quyen) >= 0)
                    return true;
                else
                    return false;
            } else
            {
                return false;
            }

            if (phieuXuatId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            }
        }


        /*** API FUNCTION ***/

        // upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.file);
                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.phieuXuat.Hinh).then(function success(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    vm.data.hinh = result.data.data;
                    $('input[type="file"]').val('');
                    resolve();
                }, function error(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    reject('Upload.filesUpload');
                });
            });
        };

        // Lưu sổ cái
        function luuSoCai(phieuId, KhoaMo) {
            debugger
            vm.status.isLoading = true;
            var data = {};
            data.phieuXuatId = phieuId;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.khoaMo = KhoaMo;
            KhoPhieuXuatService.luuSoCai(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    alert('Khóa phiếu thành công');
                    console.log(result);

                    getPhieuXuatById(phieuId);
                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể khóa phiếu');
                    }
                    getPhieuXuatById(phieuId);
                    console.log(result);
                });
        };

        function getSoPhieuAuto() {
            vm.status.isLoading = true;
            var data = {};
            data.loaiPhieu = 'PhieuXuat';
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            KhoPhieuXuatService.getSoPhieuAuto(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    console.log(result);
                    vm.data.phieuXuat.SoPhieu = result.data.data.SoPhieu;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });
        }
        // thêm phiếu xuất vào database
        function insert() {
            vm.status.isLoading = true;

            var phieunhap = utility.clone(vm.data.phieuXuat);
            preparePhieuXuat(phieunhap);
            var data = {};
            data.phieuXuat = angular.toJson(phieunhap);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            KhoPhieuXuatService.insert(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);

                upload().then(function () {
                    window.location = linkUrl + 'khophieuxuat/edit/' + result.data.data.PhieuXuatId;
                }, function () {
                    alert('Không thể upload file.');
                });

                alert('Thêm phiếu xuất thành công.');
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                    alert('Không thể thêm phiếu xuất.');
                }
            });
        }

        // load thông tin phiếu xuất từ database
        function getPhieuXuatById(id) {
            vm.status.isLoading = true;
            var data = {
                phieuXuatIds: id,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };
            KhoPhieuXuatService.getById(data)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuXuat;
                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuXuat = result.data.data[0];
                        fixPhieuXuat(vm.data.phieuXuat);
                        getListChiTietByPhieuXuatId(vm.data.phieuXuat.PhieuXuatId);
                    } else if (isEdit === 1) {
                        window.location = linkUrl + 'khophieuxuat/list';
                    }
                    vm.status.isLoading = false;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });

        }

        // lấy danh sách chi tiết của phiếu xuất kho
        function getListChiTietByPhieuXuatId(id) {
            vm.status.isLoading = true;
            var data = { phieuXuatId: id, loginId: userInfo ? userInfo.NhanVienId : 0 };
            KhoPhieuXuatService.getListChiTietByPhieuXuatId(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);
                if (result.data && result.data.data) {
                    vm.data.listChiTiet = result.data.data;
                }
            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
            });
        }

        // cập nhật phiếu xuất với danh sách chi tiết phiếu xuất
        function updatePhieuXuat() {
            vm.status.isLoading = true;
            var phieuxuat = utility.clone(vm.data.phieuXuat);
            preparePhieuXuat(phieuxuat);
            var data = {};
            data.phieuXuat = angular.toJson(phieuxuat);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuXuatService.update(data)
                .then(function success(result) {
                    debugger;
                    if (isLuuSoCai) {
                        isLuuSoCai = false;
                        //luuSoCai(phieuXuatId) //???
                        return;
                    }

                    vm.status.isLoading = false;
                    console.log(result);

                    upload().then(function () {
                    }, function () {
                        alert('Không thể upload file');
                    });

                    getPhieuXuatById(phieuXuatId);
                    alert('Cập nhật phiếu xuất thành công.');
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể cập nhật phiếu xuất.');
                    }
                });
        }

        // cập nhật sau khi luu sổ cái
        function updateSauKhiLuuSoCai(listChiTiet) {
            vm.status.isLoading = true;
            var phieuxuat = utility.clone(vm.data.phieuXuat);
            preparePhieuXuat(phieuxuat);
            var data = {};
            data.PhieuXuat = angular.toJson(phieuxuat);
            data.listChiTiet = angular.toJson(listChiTiet);
            data.LoginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuXuatService.UpdateSauLuuSoCai(data)
                .then(function success(result) {

                    vm.status.isLoading = false;
                    console.log(result);

                    alert('Cập nhật phiếu xuất thành công.');
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể cập nhật phiếu xuất.');
                    }
                });
        }

        function removePhieuXuat() {
            vm.status.isLoading = true;

            var list = [];
            list.push({
                KPX_ID: vm.data.phieuXuat.PhieuXuatId,
                KPX_CTRVERSION: vm.data.phieuXuat.CtrVersion
            });

            var data = {
                listPhieuXuat: list,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };

            KhoPhieuXuatService.removeList(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);
                alert('Xóa phiếu xuất thành công.');
                window.location = linkUrl + 'khophieuxuat/list';
            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
                alert('Không thể xóa phiếu xuất.');
            });
        }

        function GetListLuocSu(id) {
            vm.data.isLoading = true;
            var tableState = utility.initTableState();

            tableState.draw = tableState.draw + 1 || 1;
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'LuocSuId';
            var sortDir = tableState.sort.reverse ? 'asc' : 'desc';
            var searchString = id + "|KhoPhieuXuat";
            var fields = "ngay,sukien, HoTen";
            KhoPhieuXuatService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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

        /*** HELPERS ***/
        function compare(dateTimeA, dateTimeB) {
            var momentA = moment(dateTimeA, "DD/MM/YYYY");
            var momentB = moment(dateTimeB, "DD/MM/YYYY");
            if (momentA > momentB) return 1;
            else if (momentA < momentB) return -1;
            else return 0;
        }

        function fullDateString(strDate, strFormat) {
            var date = moment(strDate, strFormat);
            return 'ngày ' + date.format('DD') + ' tháng ' + date.format('MM') + ' năm ' + date.format('YYYY');
        }

        function removeListItem(list, item, prop) {
            var list_length = list.length;
            for (var i = 0; i < list_length; i++) {
                if (list[i][prop] === item[prop]) {
                    list.splice(i, 1);
                    break;
                }
            }

            return list;
        }

    });
    app.filter('sumOfValue', function () {
        return function (data, key) {
            if (angular.isUndefined(data) || angular.isUndefined(key))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + parseFloat(value[key]);
            });
            return sum;
        };
    });
    app.filter('totalSumPriceQty', function () {
        return function (data, key1, key2) {
            if (angular.isUndefined(data) || angular.isUndefined(key1) || angular.isUndefined(key2))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + parseFloat(value[key1]) * parseFloat(value[key2]);
            });
            return sum;
        };
    });
})();