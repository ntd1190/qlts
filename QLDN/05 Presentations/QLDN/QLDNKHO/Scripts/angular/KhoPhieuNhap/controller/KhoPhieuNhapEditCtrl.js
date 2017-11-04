/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Thanh Binh
3. Description : khophieunhap/edit
4. History     : 2017.06.15 (Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('KhoPhieuNhapEditCtrl', function ($scope, KhoPhieuNhapService, utility, Upload, $timeout) {
        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;
        var linkUrl = '';
        var isEdit = 0;
        var phieuNhapId = 0;
        var isLuuSoCai = false;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoPhieuNhapEditCtrl';
        vm.getPhieuNhapId = function () {
            return phieuNhapId || 0;
        }
        vm.status = {};
        vm.status.isLoading = false;

        vm.error = {};

        vm.data = {};
        vm.data.listLoaiPhieuNhap = [
            { MaTrangThai: 'LPN_NHAPMOI', TrangThai: 'Nhập mới' },
            { MaTrangThai: 'LPN_HOANTRA', TrangThai: 'Hoàn trả' },
        ];

        vm.data.phieuNhap = {};
        vm.data.listChiTiet = [];
        vm.data.fullDateString = '';
        vm.data.tienHang = 0;
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
            if (config && config.phieuNhapId) {
                phieuNhapId = config.phieuNhapId;
                getPhieuNhapById(phieuNhapId);
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            setDefaltLoaiPhieu();
            initEventListener();
        };

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.tinhThue = function () {
            $timeout(function () {
                vm.data.phieuNhap.TienThue = vm.data.tienHang * vm.data.phieuNhap.ThueVAT / 100;
            }, 0);
        }

        vm.action.getSoPhieu = function () {
            if (vm.status.isLoading) { return; }
            getSoPhieuAuto();
        }

        vm.action.save = function () {
            if (vm.status.isLoading) { return; }
            console.log(checkInputPhieuNhap() === false);
            if (checkInputPhieuNhap() === false) { return; }

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length < 1) {
                alert('Phiếu chưa có chi tiết');
                return;
            }

            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.phieuNhap.Hinh) {
                    vm.data.phieuNhap.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.phieuNhap.Hinh = vm.data.phieuNhap.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }
            debugger
            if (phieuNhapId > 0 && checkQuyenUI('M')) { ////if (phieuNhapId > 0 && (checkQuyenUI('M') || checkQuyenUI('A')) ) {            
                updatePhieuNhap();
            } else if (checkQuyenUI('N'))  {
                insert();
            }
        };
        vm.action.removeChiTiet = function (item) {
            if (vm.status.isLoading) { return; }
            removeListItem(vm.data.listChiTiet, item, 'PhieuNhapChiTietId');
        };
        vm.action.removePhieuNhap = function () {
            if (vm.status.isLoading) { return; }

            if (checkQuyenUI('D') === false) {
                alert('Bạn không có quyền xóa phiếu nhập');
                return;
            }

            // TODO xác nhận action
            if (confirm('Bạn có muốn xóa phiếu nhập ?')) {
                removePhieuNhap();
            }
        }

        vm.action.luuSoCai = function (KhoaMo) {
            debugger;
            if (vm.status.isLoading) { return; }
            if (checkInputPhieuNhap() === false) { return; }

            if (compare(moment().format('DD/MM/YYYY'), vm.data.phieuNhap.strNgayNhap) == -1) {
                alert('Ngày nhập phải lớn hơn ngày hiện tại');
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
                    alert('Bạn không có quyền khóa phiếu.');
                    return;
                }
            }

            if (KhoaMo == 'Y') {
                if (confirm('Bạn thật sự muốn mở khóa phiếu?')) {
                    luuSoCai(phieuNhapId, KhoaMo);
                }
            } else {
                if (confirm('Bạn thật sự muốn khóa phiếu?')) {
                    luuSoCai(phieuNhapId, KhoaMo);
                }
            }
        };

     
        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputPhieuNhap($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.xemLuocSu = function () {
            GetListLuocSu(phieuNhapId);
        };
        vm.action.clearKhachHang = function () {
            vm.data.phieuNhap.KhachHangId = 0;
            vm.data.phieuNhap.TenKhachHang = '';
            vm.data.phieuNhap.DiaChi = '';
        }
        vm.action.clearThuKho = function () {
            vm.data.phieuNhap.ThuKho = 0;
            vm.data.phieuNhap.TenThuKho = '';
        }
        vm.action.clearNguoiNhanHang = function () {
            vm.data.phieuNhap.NguoiNhanHang = 0;
            vm.data.phieuNhap.TenNguoiNhanHang = '';
        }
        vm.action.clearkhoNhap = function () {
            vm.data.phieuNhap.KhoXuat = 0;
            vm.data.phieuNhap.TenKhoXuat = '';
        }
        vm.action.goBack = function () {
            window.history.back();
        };
        vm.action.emitKhoNhapId = function () {
            var khoid = vm.data.phieuNhap.KhoNhap;
            if (typeof khoid === 'undefined' || khoid === "" || khoid == 0) {
                alert("Bạn chưa chọn kho nhập"); return;
            }
            $scope.$emit(vm.controllerId + '.data.khonhapidPop', khoid);
        }
        vm.action.In = function () {
            if (vm.data.phieuNhap.PhieuNhapId == '' || vm.data.phieuNhap.PhieuNhapId == undefined)
                return;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuNhap&data=' + vm.data.phieuNhap.PhieuNhapId);
            $('#reportmodal').modal('show');
        };

        vm.action.InSeries = function () {
            if (vm.data.phieuNhap.PhieuNhapId == '' || vm.data.phieuNhap.PhieuNhapId == undefined)
                return;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuNhapSeries&data=' + vm.data.phieuNhap.PhieuNhapId);
            $('#reportmodal').modal('show');
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
                    vm.data.phieuNhap.KhachHangId = v.listKhachHang[0].KhachHangId;
                    vm.data.phieuNhap.TenKhachHang = v.listKhachHang[0].TEN;
                    vm.data.phieuNhap.DiaChi = v.listKhachHang[0].DiaChi;
                }
            });
            // nhận thông tin kho hàng
            $scope.$on(vm.controllerId + '.data.listKhoHang', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listKhoHang && v.listKhoHang.length > 0) {
                    vm.data.phieuNhap.KhoNhap = v.listKhoHang[0].KhoHangId;
                    vm.data.phieuNhap.TenKhoNhap = v.listKhoHang[0].TenKho;
                }
            });
            // nhận thông tin tài khoản có
            $scope.$on(vm.controllerId + '.data.listTaiKhoanCo', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanCo && v.listTaiKhoanCo.length > 0) {
                    vm.data.phieuNhap.TaiKhoanCo = v.listTaiKhoanCo[0].TaiKhoanId;
                    vm.data.phieuNhap.MaTaiKhoanCo = v.listTaiKhoanCo[0].MaTaiKhoan;
                }
            });
            // nhận thông tin tài khoản nợ
            $scope.$on(vm.controllerId + '.data.listTaiKhoanNo', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanNo && v.listTaiKhoanNo.length > 0) {
                    vm.data.phieuNhap.TaiKhoanNo = v.listTaiKhoanNo[0].TaiKhoanId;
                    vm.data.phieuNhap.MaTaiKhoanNo = v.listTaiKhoanNo[0].MaTaiKhoan;
                }
            });
            // nhận thông tin thủ kho
            $scope.$on(vm.controllerId + '.data.listThuKho', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listThuKho && v.listThuKho.length > 0) {
                    vm.data.phieuNhap.ThuKho = v.listThuKho[0].NhanVienId;
                    vm.data.phieuNhap.TenThuKho = v.listThuKho[0].Ho + ' ' + v.listThuKho[0].Ten;
                }
            });
            // nhận thông tin người nhận hàng
            $scope.$on(vm.controllerId + '.data.listNguoiNhanHang', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listNguoiNhanHang && v.listNguoiNhanHang.length > 0) {
                    vm.data.phieuNhap.NguoiNhanHang = v.listNguoiNhanHang[0].NhanVienId;
                    vm.data.phieuNhap.TenNguoiNhanHang = v.listNguoiNhanHang[0].Ho + ' ' + v.listNguoiNhanHang[0].Ten;
                }
            });
            // nhận sự kiện F8
            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                vm.action.save();
            });
            //nhan f2
            $scope.$on(vm.controllerId + '.action.F2', function (e, v) {
                vm.action.emitKhoNhapId();
            });
            //$scope.$watch('ctrl.data.tienHang+ctrl.data.phieuNhap.ThueVAT', function () {
            //    vm.action.tinhThue();
            //});
        }

        /*** BIZ FUNCTION ***/

        function checkInputPhieuNhap(inputName) {
            var has_error = false;
            if (!inputName || inputName === 'NguoiGiaoHang') {
                vm.error.NguoiGiaoHang = '';
                if (!vm.data.phieuNhap.NguoiGiaoHang) {
                    vm.error.NguoiGiaoHang = '.';
                    has_error = true;
                }
            }
            //if (!inputName || inputName === 'TenThuKho') {
            //    vm.error.TenThuKho = '';
            //    if (!vm.data.phieuNhap.ThuKho) {
            //        vm.error.TenThuKho = '.';
            //        has_error = true;
            //    }
            //}
            //if (!inputName || inputName === 'TenNguoiNhanHang') {
            //    vm.error.TenNguoiNhanHang = '';
            //    if (!vm.data.phieuNhap.NguoiNhanHang) {
            //        vm.error.TenNguoiNhanHang = '.';
            //        has_error = true;
            //    }
            //}
            if (!inputName || inputName === 'SoPhieu') {
                vm.error.SoPhieu = '';
                if (!vm.data.phieuNhap.SoPhieu) {
                    vm.error.SoPhieu = '.';
                    has_error = true;
                }
            }
            //if (!inputName || inputName === 'TenKhachHang') {
            //    vm.error.TenKhachHang = '';
            //    if (!vm.data.phieuNhap.TenKhachHang) {
            //        vm.error.TenKhachHang = '.';
            //        has_error = true;
            //    }
            //}
            /*
            if (!inputName || inputName === 'SoHoaDon') {
                vm.error.SoHoaDon = '';
                if (!vm.data.phieuNhap.SoHoaDon) {
                    vm.error.SoHoaDon = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'Seri') {
                vm.error.Seri = '';
                if (!vm.data.phieuNhap.Seri) {
                    vm.error.Seri = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'strNgayChungTu') {
                vm.error.strNgayChungTu = '';
                if (!vm.data.phieuNhap.strNgayChungTu) {
                    vm.error.strNgayChungTu = '.';
                    has_error = true;
                }
            }
            */
            if (!inputName || inputName === 'NoiDung') {
                vm.error.NoiDung = '';
                if (!vm.data.phieuNhap.NoiDung) {
                    vm.error.NoiDung = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'TenKhoNhap') {
                vm.error.TenKhoNhap = '';
                if (!vm.data.phieuNhap.TenKhoNhap) {
                    vm.error.TenKhoNhap = '.';
                    has_error = true;
                }
            }
            if (!inputName || inputName === 'strNgayNhap') {
                vm.error.strNgayNhap = '';
                if (!vm.data.phieuNhap.strNgayNhap) {
                    vm.error.strNgayNhap = '.';
                    has_error = true;
                }
            }

            return !has_error;
        }

        function reset() {
            vm.data.phieuNhap.ThueVAT = 10;
            vm.data.phieuNhap.ChiPhi = 0;
        }

        // chuẩn bị dữ liệu gửi api
        function preparePhieuNhap(phieunhap) {
            phieunhap.strNgayChungTu = utility.convertDateFormat(phieunhap.strNgayChungTu, 'DD/MM/YYYY', 'YYYY-MM-DD');
            phieunhap.strNgayThanhToan = utility.convertDateFormat(phieunhap.strNgayThanhToan, 'DD/MM/YYYY', 'YYYY-MM-DD');
            phieunhap.strNgayNhap = utility.convertDateFormat(phieunhap.strNgayNhap, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }

        // fixed dữ liệu sau khi nhận từ api
        function fixPhieuNhap(phieunhap) {
            phieunhap.strNgayChungTu = utility.convertDateFormat(phieunhap.NgayChungTu, 'YYYY-MM-DD', 'DD/MM/YYYY');
            phieunhap.strNgayThanhToan = utility.convertDateFormat(phieunhap.NgayThanhToan, 'YYYY-MM-DD', 'DD/MM/YYYY');
            phieunhap.strNgayNhap = utility.convertDateFormat(phieunhap.NgayNhap, 'YYYY-MM-DD', 'DD/MM/YYYY');

            vm.data.fullDateString = fullDateString(moment().format(phieunhap.NgayTao), 'YYYY-MM-DD');
            setDefaltLoaiPhieu();
        }

        function setDefaltLoaiPhieu() {
            var defaultLoai = 'LPN_NHAPMOI';
            if (phieuNhapId && vm.data.phieuNhap.LoaiPhieu) { return; }
            vm.data.phieuNhap.LoaiPhieu = defaultLoai;
        }

        // lấy thông tin hàng hóa từ popup hàng hóa thêm vào chi tiết phiếu nhập
        function getListChiTietPopup(list) {
            for (var i = 0; i < list.length; i++) {
                // TODO kiểm tra nếu đã có hàng hóa trong danh sách thì không thêm chi tiết
                // TODO Thêm vào danh sách chi tiết
                var chitiet = {};
                chitiet.PhieuNhapChiTietId = 0;
                chitiet.LoHang = '';
                chitiet.SoLuong = 1;
                chitiet.DonGia = 0;

                chitiet.HangHoaId = list[i].HangHoaId;
                chitiet.MaHangHoa = list[i].MaHangHoa;
                chitiet.TenHangHoa = list[i].TenHangHoa;
                chitiet.DonViTinh = list[i].DonViTinh;
                chitiet.ThoiGianBaoHanh = list[i].ThoiGianBaoHanh;
                vm.data.listChiTiet.unshift(chitiet);
            }
        }

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {                       

            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else {
                return false;
            }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) {
                return false;
            }

            // kiểm tra lưu sổ cái
            if (vm.data.phieuNhap && vm.data.phieuNhap.MaTrangThai === 'KPN_LSC') {
                if (quyen != 'A') { // A: quyền được lưu mặc dù phiếu đã khóa
                    return false;
                }
            }

            if (phieuNhapId == 0) { // trường hợp thêm mới
                if (quyen != 'N') {
                    return false; 
                }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            } 
            else { // trường hợp update
                if (quyen == 'N') { 
                    return false; 
                }
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

                Upload.filesUpload(vm.data.file, vm.data.phieuNhap.Hinh).then(function success(result) {
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
            debugger;
            vm.status.isLoading = true;            
            var data = {};
            data.phieuNhapId = phieuId;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.KhoaMo = KhoaMo;
            KhoPhieuNhapService.luuSoCai(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    alert('Khóa phiếu thành công');
                    console.log(result);

                    getPhieuNhapById(phieuId);
                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể khóa phiếu');
                    }
                    getPhieuNhapById(phieuId);
                    console.log(result);
                });
        };

        function getSoPhieuAuto() {
            vm.status.isLoading = true;
            var data = {};
            data.loaiPhieu = 'PhieuNhap';
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            KhoPhieuNhapService.getSoPhieuAuto(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    console.log(result);
                    vm.data.phieuNhap.SoPhieu = result.data.data.SoPhieu;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });
        }
        // thêm phiếu nhập vào database
        function insert() {
            vm.status.isLoading = true;
            
            var phieunhap = utility.clone(vm.data.phieuNhap);
            preparePhieuNhap(phieunhap);
            var data = {};
            data.phieuNhap = angular.toJson(phieunhap);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuNhapService.insert(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);

                alert('Thêm phiếu nhập thành công.');

                upload().then(function () {
                    window.location = linkUrl + 'edit/' + result.data.data.PhieuNhapId;
                }, function () {
                    alert('Không thể upload file.');
                });
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                    alert('Không thể thêm phiếu nhập.');
                }
            });
        }

        // load thông tin phiếu nhập từ database
        function getPhieuNhapById(id) {
            vm.status.isLoading = true;
            var data = {
                phieuNhapIds: id,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };
            KhoPhieuNhapService.getById(data)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuNhap;
                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuNhap = result.data.data[0];
                        fixPhieuNhap(vm.data.phieuNhap);
                        getListChiTietByPhieuNhapId(vm.data.phieuNhap.PhieuNhapId);
                    } else if (isEdit === 1) {
                        window.location = linkUrl + 'list';
                    }
                    vm.status.isLoading = false;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });

        }

        // lấy danh sách chi tiết của phiếu nhập kho
        function getListChiTietByPhieuNhapId(id) {
            debugger
            vm.status.isLoading = true;
            var data = { phieuNhapId: id, loginId: userInfo ? userInfo.NhanVienId : 0 };
            KhoPhieuNhapService.getListChiTietByPhieuNhapId(data).then(function success(result) {
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

        // cập nhật phiếu nhập với danh sách chi tiết phiếu nhập
        function updatePhieuNhap() {
            vm.status.isLoading = true;
            var phieunhap = utility.clone(vm.data.phieuNhap);
            preparePhieuNhap(phieunhap);
            var data = {};
            data.phieuNhap = angular.toJson(phieunhap);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuNhapService.update(data)
                .then(function success(result) {

                    vm.status.isLoading = false;
                    console.log(result);

                    upload().then(function () {
                    }, function () {
                        alert('Không thể upload file');
                    });

                    getPhieuNhapById(phieuNhapId);
                    alert('Cập nhật phiếu nhập thành công.');
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể cập nhật phiếu nhập.');
                    }
                });
        }

        function removePhieuNhap() {
            vm.status.isLoading = true;

            var list = [];
            list.push({
                KPN_ID: vm.data.phieuNhap.PhieuNhapId,
                KPN_CTRVERSION: vm.data.phieuNhap.CtrVersion
            });

            var data = {
                listPhieuNhap: list,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };

            KhoPhieuNhapService.removeList(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);
                alert('Xóa phiếu nhập thành công.');
                window.location = linkUrl + 'list';
            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                    alert('Không thể xóa phiếu nhập.');
                }
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
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = id + "|KhoPhieuNhap";
            var fields = "ngay,sukien, HoTen";
            KhoPhieuNhapService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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
        /*Series*/
        vm.action.NhapSeries = function (hanghoa) {
            debugger
            vm.data.listSeries = [];
            var listSeriesnumber = [];
            var data = {};
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.SoPhieu = vm.data.phieuNhap.SoPhieu;
            data.HangHoaId = hanghoa.HangHoaId;

          
            KhoPhieuNhapService.GetSeries(data)
                .then(function success(result) {
                    listSeriesnumber = result.data.data;
                    for (var i = 0; i < hanghoa.SoLuong; i++) {
                        var chitiet = {};
                        chitiet.Series = listSeriesnumber.length > i ? listSeriesnumber[i].Series : '';
                        chitiet.SoPhieu = vm.data.phieuNhap.SoPhieu;
                        chitiet.HangHoaId = hanghoa.HangHoaId;
                        chitiet.MaHangHoa = hanghoa.MaHangHoa;
                        chitiet.TenHangHoa = hanghoa.TenHangHoa;
                        chitiet.DonViTinh = hanghoa.DonViTinh;
                        chitiet.DonGia = hanghoa.DonGia;
                        chitiet.ThoiGianBaoHanh = listSeriesnumber.length > i ? (listSeriesnumber[i].ThoiGianBaoHanh ? listSeriesnumber[i].ThoiGianBaoHanh : hanghoa.ThoiGianBaoHanh) : hanghoa.ThoiGianBaoHanh;
                        chitiet.error = false;
                        vm.data.listSeries.push(chitiet);
                    }
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
                    alert('Series ' + item.Series + ' đã có. Vui lòng nhập series khác!');
                    return;
                }
            }
        }
        vm.action.LuuSerial = function () {
            for (var i = 0; i < vm.data.listSeries.length; i++) {
                var item = vm.data.listSeries[i];
                if (vm.data.listSeries[i].error == true) {
                    alert('Tồn tại series ' + item.Series + ' trùng nhau. Vui lòng kiểm tra lại!');
                    return;
                }
            }
            var data = {};
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            data.listChiTiet = angular.toJson(vm.data.listSeries);
            KhoPhieuNhapService.LuuSerial(data)
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
        /*end series*/

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