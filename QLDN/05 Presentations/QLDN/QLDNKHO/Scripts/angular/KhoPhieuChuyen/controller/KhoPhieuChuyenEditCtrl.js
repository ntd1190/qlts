/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Ngoc Tan
3. Description : khophieuchuyen/edit
4. History     : 2017.06.15 (Nguyen Ngoc Tan) - tạo mới
                 2017.07.10 (Nguyen Thanh Binh) bổ sung upload file
*****************************************************************************/
(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('KhoPhieuChuyenEditCtrl', function ($scope, KhoPhieuChuyenService, utility, $window, Upload) {
        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;
        var linkUrl = '';
        var isEdit = 0;
        var phieuChuyenId = 0;

        /*** VIEW MODEL ***/

        vm.controllerId = 'KhoPhieuChuyenEditCtrl';
        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isInValidSoPhieu = false;
        vm.status.isInValidNoiDung = false;
        vm.status.isInValidKhoNhap = false;
        vm.status.isInValidKhoXuat = false;
        vm.status.isInValidNgayXuat = false;
        vm.status.isInValidNgayNhap = false;

        vm.data = {};
        vm.data.phieuChuyen = {};
        vm.data.listChiTiet = [];
        vm.data.fullDateString = '';

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
            if (config && config.phieuChuyenId) {
                phieuChuyenId = config.phieuChuyenId;
                getPhieuChuyenById(phieuChuyenId);
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
                vm.data.phieuChuyen.NguoiTao = config.userInfo.NhanVienId;
            }

            initEventListener();
        };


        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.save = function () {
            if (vm.data.phieuChuyen.MaTrangThai == 'KPC_LSC') {
                alert('Phiếu đã Lưu sổ cái, bạn không thể Xóa hay Sửa');
                return;
            }
            if (vm.status.isLoading) { return; }
            vm.status.isInValidSoPhieu = utility.checkInValid(vm.data.phieuChuyen.SoPhieu, 'isEmpty');
            if (vm.status.isInValidSoPhieu) {
                return;
            }
            vm.status.isInValidNoiDung = utility.checkInValid(vm.data.phieuChuyen.NoiDung, 'isEmpty');
            if (vm.status.isInValidNoiDung) {
                $('#txtNoiDung').focus();
                return;
            }
            vm.status.isInValidKhoXuat = utility.checkInValid(vm.data.phieuChuyen.KhoXuat, 'isEmpty');
            if (vm.status.isInValidKhoXuat) {
                return;
            }
            vm.status.isInValidKhoNhap = utility.checkInValid(vm.data.phieuChuyen.KhoNhap, 'isEmpty');
            if (vm.status.isInValidKhoNhap) {
                return;
            }
            if (vm.data.phieuChuyen.KhoXuat == vm.data.phieuChuyen.KhoNhap) {
                alert('Kho nhập và Kho xuất không được trùng.');
                return;
            }
            vm.status.isInValidNgayXuat = utility.checkInValid(vm.data.phieuChuyen.NgayXuat, 'isEmpty');
            if (vm.status.isInValidNgayXuat) {
                $('#txtNgayXuat').focus();
                return;
            }
            vm.status.isInValidNgayNhap = utility.checkInValid(vm.data.phieuChuyen.NgayNhap, 'isEmpty');
            if (vm.status.isInValidNgayNhap) {
                $('#txtNgayNhap').focus();
                return;
            }
            if (moment(vm.data.phieuChuyen.NgayXuat, "DD/MM/YYYY") > moment(vm.data.phieuChuyen.NgayNhap, "DD/MM/YYYY")) {
                alert('Ngày nhập phải sau hoặc bằng Ngày xuất.');
                return;
            }

            // 2017.07.10 (Nguyen Thanh Binh)
            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.phieuChuyen.Hinh) {
                    vm.data.phieuChuyen.Hinh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.phieuChuyen.Hinh = vm.data.phieuChuyen.Hinh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }

            if (phieuChuyenId > 0 && checkQuyenUI('M')) {
                updatePhieuChuyen();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        };
        vm.action.removeChiTiet = function (item) {
            if (vm.status.isLoading) { return; }
            removeListItem(vm.data.listChiTiet, item, 'PhieuChuyenChiTietId');
        };
        vm.action.removePhieuChuyen = function () {
            if (vm.status.isLoading) { return; }

            if (checkQuyenUI('D') === false) {
                alert('Bạn không có quyền xóa phiếu chuyển');
                return;
            }
            if (vm.data.phieuChuyen.MaTrangThai == 'KPC_LSC') {
                alert('Phiếu đã khóa, bạn không thể Xóa hay Sửa');
                return;
            }
            // TODO xác nhận action
            if (confirm('Bạn có muốn xóa phiếu chuyển ?')) {
                removePhieuChuyen();
            }
        }
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.getSoPhieu = function () {
            if (vm.status.isLoading) { return; }
            getSoPhieuAuto();
        }
        vm.getPhieuChuyenId = function () {
            return phieuChuyenId || 0;
        }
        vm.action.luuSoCai = function () {
            if (vm.status.isLoading) { return; }
            if (checkQuyenUI('L') === false) {
                alert('Bạn không có quyền khóa phiếu');
                return;
            }
            if (vm.data.phieuChuyen.MaTrangThai == 'KPC_LSC') {
                alert('Phiếu này đã được khóa phiếu.');
                return;
            }
            if (confirm('Bạn thật sự muốn khóa phiếu?')) {
                luuSoCai(phieuChuyenId);
            }
        };
        vm.action.GetListLuocSu = function (phieuChuyenId, tableState) {
            vm.data.isLoading = true;


            var draw = 1;
            var start = 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = 10;  // Number of entries showed per page.
            var sortName = 'LuocSuId';
            var sortDir = 'asc';
            var searchString = phieuChuyenId + "|KhoPhieuChuyen";
            var fields = "ngay,sukien, HoTen";
            KhoPhieuChuyenService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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

        };
        vm.action.goBack = function () {
            window.history.back();
        };
        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNKHO/CrystalReport/ReportPage.aspx?name=rptPhieuChuyen&data=' + vm.data.phieuChuyen.PhieuChuyenId);
            $('#reportmodal').modal('show');
        };
        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            // nhận thông tin hàng hóa
            $scope.$on(vm.controllerId + '.data.listHangHoa', function (e, v) {

                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listHangHoa && v.listHangHoa.length > 0) {
                    getListChiTietPopup(v.listHangHoa);
                }
                console.log(vm.data.listChiTiet);
            });
            // nhận thông tin khách hàng
            $scope.$on(vm.controllerId + '.data.listKhoHangXuat', function (e, v) {
                console.log(v);
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listKhoHangXuat && v.listKhoHangXuat.length > 0) {
                    vm.data.phieuChuyen.KhoXuat = v.listKhoHangXuat[0].KhoHangId;
                    vm.data.phieuChuyen.TenKhoXuat = v.listKhoHangXuat[0].TenKho;
                }
            });
            // nhận thông tin kho hàng
            $scope.$on(vm.controllerId + '.data.listKhoHang', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listKhoHang && v.listKhoHang.length > 0) {
                    vm.data.phieuChuyen.KhoNhap = v.listKhoHang[0].KhoHangId;
                    vm.data.phieuChuyen.TenKhoNhap = v.listKhoHang[0].TenKho;
                }
            });
            // nhận thông tin tài khoản có
            $scope.$on(vm.controllerId + '.data.listTaiKhoanCo', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanCo && v.listTaiKhoanCo.length > 0) {
                    vm.data.phieuChuyen.TaiKhoanXuat = v.listTaiKhoanCo[0].TaiKhoanId;
                    vm.data.phieuChuyen.TenTaiKhoanXuat = v.listTaiKhoanCo[0].MaTaiKhoan;
                }
            });
            // nhận thông tin tài khoản nợ
            $scope.$on(vm.controllerId + '.data.listTaiKhoanNo', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.listTaiKhoanNo && v.listTaiKhoanNo.length > 0) {
                    vm.data.phieuChuyen.TaiKhoanNhap = v.listTaiKhoanNo[0].TaiKhoanId;
                    vm.data.phieuChuyen.TenTaiKhoanNhap = v.listTaiKhoanNo[0].MaTaiKhoan;
                }
            });
            // nhận thông tin người giao
            $scope.$on(vm.controllerId + '.data.listNguoiGiao', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.length > 0) {
                    vm.data.phieuChuyen.NguoiGiaoHang = v[0].NhanVienId;
                    vm.data.phieuChuyen.TenNguoiGiaoHang = v[0].Ho + ' ' + v[0].Ten;
                }
            });
            // nhận thông tin người nhận
            $scope.$on(vm.controllerId + '.data.listNguoiNhan', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                if (v && v.length > 0) {
                    vm.data.phieuChuyen.NguoiNhanHang = v[0].NhanVienId;
                    vm.data.phieuChuyen.TenNguoiNhanHang = v[0].Ho + ' ' + v[0].Ten;
                }
            });
            // nhận sự kiện F8
            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }
                console.log('F8');
                vm.action.save();
            });

        }

        /*** BIZ FUNCTION ***/

        function reset() {
            vm.data.phieuChuyen.ThueVAT = 0;
            vm.data.phieuChuyen.ChiPhi = 0;
        }

        // Lưu sổ cái
        function luuSoCai(phieuId) {

            vm.status.isLoading = true;
            var phieuchuyen = utility.clone(vm.data.phieuChuyen);
            var data = {};
            data.KhoXuatId = vm.data.phieuChuyen.KhoXuat;
            data.KhoNhapId = vm.data.phieuChuyen.KhoNhap;
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            data.phieuChuyen = angular.toJson(phieuchuyen);
            data.NgayXuat = phieuchuyen.NgayXuat;

            KhoPhieuChuyenService.luuSoCai(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    alert(result.data.data);
                    console.log(result);

                    getPhieuChuyenById(phieuId);
                }, function error(result) {
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể khóa phiếu');
                    }
                    console.log(result);
                });

            //KhoPhieuChuyenService.update(data)
            //    .then(function success(result) {
            //        KhoPhieuChuyenService.luuSoCai(data)
            //            .then(function success(result) {
            //                vm.status.isLoading = false;
            //                alert(result.data.data);
            //                console.log(result);

            //                getPhieuChuyenById(phieuId);
            //            }, function error(result) {
            //                vm.status.isLoading = false;
            //                if (result.status === 400) {
            //                    alert(result.data.error.message);
            //                } else {
            //                    alert('Không thể lưu sổ cái');
            //                }
            //                console.log(result);
            //            });
            //    }, function error(result) {
            //        console.log(result);
            //        vm.status.isLoading = false;
            //        alert('Không thể lưu sổ cái');
            //    });

        };

        // chuẩn bị dữ liệu gửi api
        function preparePhieuChuyen(phieuchuyen) {
            phieuchuyen.NgayNhap = utility.convertDateFormat(phieuchuyen.NgayNhap, 'DD/MM/YYYY', 'YYYY-MM-DD');
            phieuchuyen.NgayXuat = utility.convertDateFormat(phieuchuyen.NgayXuat, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }

        // fixed dữ liệu sau khi nhận từ api
        function fixPhieuChuyen(phieuchuyen) {
            phieuchuyen.NgayNhap = utility.convertDateFormat(phieuchuyen.NgayNhap, 'YYYY-MM-DD', 'DD/MM/YYYY');
            phieuchuyen.NgayXuat = utility.convertDateFormat(phieuchuyen.NgayXuat, 'YYYY-MM-DD', 'DD/MM/YYYY');

            vm.data.fullDateString = fullDateString(moment().format(phieuchuyen.NgayTao), 'YYYY-MM-DD');
        }

        // lấy thông tin hàng hóa từ popup hàng hóa thêm vào chi tiết phiếu chuyển
        function getListChiTietPopup(list) {
            for (var i = 0; i < list.length; i++) {

                // TODO kiểm tra nếu đã có hàng hóa trong danh sách thì không thêm chi tiết

                //var exist = false;
                //for (var j = 0; j < vm.data.listChiTiet.length; j++) {
                //    if (list[i].HangHoaId === vm.data.listChiTiet[j].HangHoaId) {
                //        exist = true;
                //    }
                //}
                //if (exist) { return; }

                // TODO Thêm vào danh sách chi tiết
                var chitiet = {};
                chitiet.PhieuNhapChiTietId = 0;
                chitiet.SoLuong = 1;
                chitiet.DonGia = 0;
                chitiet.HangHoaId = list[i].HangHoaId;
                chitiet.DonGia = list[i].DonGiaNhap;
                chitiet.MaHangHoa = list[i].MaHangHoa;
                chitiet.TenHangHoa = list[i].TenHangHoa;
                chitiet.DonViTinh = list[i].DonViTinh;
                chitiet.LoHang = list[i].LoHang;
                vm.data.listChiTiet.unshift(chitiet);
            }
        }

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            // kiểm tra lưu sổ cái
            if (vm.data.phieuChuyen && vm.data.phieuChuyen.MaTrangThai === 'KPC_LSC') { return false; }

            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            if (phieuChuyenId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
                return listQuyenTacVu.indexOf(quyen) >= 0;
            }
        }
        /*** API FUNCTION ***/

        // 2017.07.10 (Nguyen Thanh Binh)
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.file);

                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.phieuChuyen.Hinh).then(function success(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    vm.data.hinh = result.data.data;
                    $('input[type="file"]').val('');
                    resolve(result);
                }, function error(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    reject(result);
                });
            });
        };

        // thêm phiếu chuyển vào database
        function insert() {
            vm.status.isLoading = true;

            var phieuchuyen = utility.clone(vm.data.phieuChuyen);
            var data = {};
            data.phieuChuyen = angular.toJson(phieuchuyen);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuChuyenService.insert(data)
                .then(function success(result) {
                    vm.status.isLoading = false;

                    alert('Thêm phiếu chuyển thành công');

                    upload().then(function (updateResult) {
                        console.log(updateResult);
                        window.location = linkUrl + 'edit/' + result.data.data.PhieuChuyenId;
                    }, function (result) {
                        console.log(result);
                        alert('Không thể upload file.');
                    });
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể thêm phiếu chuyển.');
                    }
                });
        }

        // load thông tin phiếu chuyển từ database
        function getPhieuChuyenById(id) {
            vm.status.isLoading = true;
            var data = {
                phieuChuyenIds: id,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };
            KhoPhieuChuyenService.getById(data)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuChuyen;
                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuChuyen = result.data.data[0];
                        vm.data.fullDateString = fullDateString(moment().format(vm.data.phieuChuyen.NgayTao), 'YYYY-MM-DD');
                        getListChiTietByPhieuChuyenId(vm.data.phieuChuyen.PhieuChuyenId);
                    } else if (isEdit === 1) {
                        window.location = linkUrl + 'list';
                    }
                    vm.status.isLoading = false;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });

        }

        // lấy danh sách chi tiết của phiếu chuyển kho
        function getListChiTietByPhieuChuyenId(id) {
            vm.status.isLoading = true;
            var data = { phieuChuyenId: id, loginId: userInfo ? userInfo.NhanVienId : 0 };
            KhoPhieuChuyenService.getListChiTietByPhieuChuyenId(data).then(function success(result) {
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

        // cập nhật phiếu chuyển với danh sách chi tiết phiếu chuyển
        function updatePhieuChuyen() {
            vm.status.isLoading = true;
            var phieuchuyen = utility.clone(vm.data.phieuChuyen);
            var data = {};
            data.phieuChuyen = angular.toJson(phieuchuyen);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            KhoPhieuChuyenService.update(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    console.log(result);
                    upload().then(function (result) {
                        console.log(result);
                    }, function (result) {
                        console.log(result);
                        alert('Không thể upload file.');
                    });

                    getPhieuChuyenById(phieuChuyenId);
                    alert('Cập nhật phiếu chuyển thành công');
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        alert('Không thể thêm phiếu chuyển.');
                    }
                });
        }

        function removePhieuChuyen() {

            vm.status.isLoading = true;

            var list = [];
            vm.data.phieuChuyen.KPC_CTRVERSION = vm.data.phieuChuyen.CtrVersion;
            list.push(vm.data.phieuChuyen);

            var data = {
                listPhieuChuyen: list,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };

            KhoPhieuChuyenService.removeList(data).then(function success(result) {
                vm.status.isLoading = false;
                console.log(result);
                alert('Xóa phiếu chuyển thành công.');
                window.location = linkUrl + 'list';
            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                  alert('Không thể xóa phiếu chuyển.');
                }
            });
        }

        function getSoPhieuAuto() {
            vm.status.isLoading = true;
            var data = {};
            data.loaiPhieu = 'PhieuChuyen';
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            KhoPhieuChuyenService.getSoPhieuAuto(data)
                .then(function success(result) {
                    vm.status.isLoading = false;
                    console.log(result);
                    vm.data.phieuChuyen.SoPhieu = result.data.data.SoPhieu;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });
        }

        /*** HELPERS ***/

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