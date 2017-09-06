/*****************************************************************************
1. Create Date : 2017.07.27
2. Creator     : Nguyen Thanh Binh
3. Description : 
4. History     : 2017.07.27 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('PhieuBaoHanhEditCtrl', function ($scope, utility, PhieuBaoHanhService) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;
        var phieuBaoHanhId = 0;
        var linkUrl;

        /*** VIEW MODEL ***/

        vm.controllerId = 'PhieuBaoHanhEditCtrl';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isLoadingChiTiet = false;
        vm.status.isSelectedAll = false;

        vm.error = {};

        vm.data = {};
        vm.data.phieuBaoHanh = {};
        vm.data.listChiTiet = [];

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            console.log(config);
            if (!config) { return; }

            phieuBaoHanhId = config.phieuBaoHanhId || 0;
            linkUrl = config.linkUrl || '';

            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (phieuBaoHanhId == 0 && checkQuyenUI('N') == false) {
                window.location.href = linkUrl + 'list';
            }
            refresh();
            initEventListener();
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.xoaChon = function () {
            console.log(vm.controllerId + '.action.xoaChon');

            if (vm.status.isLoading == true) { return; }
            if (checkQuyenUI('D') == false) { return; }

            var list = getListSelected();
            if (list.length == 0) {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục');
                return;
            }

            if (confirm('Bạn có muốn xóa phiếu bảo hành không?')) {
                deleteList(list);
            }
        };
        vm.action.save = function () {
            console.log(vm.controllerId + '.action.save');

            if (vm.status.isLoading) { return; }
            if (checkInput() === false) { return; }

            if (checkQuyenUI('M')) {
                update();
            } else if (checkQuyenUI('N')) {
                insert();
            }
        }
        vm.action.createChiTiet = function () {
            console.log(vm.controllerId + '.action.createChiTiet');

            if (vm.status.isLoading) { return; }
            if (checkQuyenUI('M') === false) { return; }

            var data = {
                PhieuBaoHanhId: phieuBaoHanhId,
                PhieuBaoHanhChiTietId: 0
            }
            $scope.$emit(vm.controllerId + '.action.createChiTiet', data);
        }
        vm.action.editChiTiet = function (item) {
            console.log(vm.controllerId + '.action.editChiTiet');

            if (vm.status.isLoading) { return; }
            if (checkQuyenUI('M') === false) { return; }

            var data = {
                PhieuBaoHanhId: phieuBaoHanhId,
                PhieuBaoHanhChiTietId: item.PhieuBaoHanhChiTietId,
            }
            $scope.$emit(vm.controllerId + '.action.editChiTiet', data);
        }
        vm.action.getListTrangThaiTiepNhan = function () {
            console.log(vm.controllerId + '.action.getListTrangThaiTiepNhan');

            if (vm.status.isLoading) { return; }
            if (checkQuyenUI('N') === false && checkQuyenUI('M') === false) { return; }

            $scope.$emit(vm.controllerId + '.action.getListTrangThaiTiepNhan');
        }
        vm.action.deleteChiTiet = function (item) {
            if (vm.status.isLoadingChiTiet) { return; }

            if (checkQuyenUI('M') && confirm('Bạn có muốn xóa chi tiết phiếu bảo hành không?')) {
                deleteChiTiet(item.PhieuBaoHanhChiTietId);
            }
        }
        vm.action.keyPressEnter = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.getThongTinBySeries = function () {
            getThongTinBySeries(vm.data.phieuBaoHanh.SeriesNo);
        }
        vm.action.getThongTinByDienThoai = function () {
            var data = {
                DienThoai: vm.data.phieuBaoHanh.DienThoai
            };
            $scope.$emit(vm.controllerId + '.action.getKhachHang', data);
        }
        vm.action.xemLuocSu = function () {
            GetListLuocSu(phieuBaoHanhId);
        };

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.ListTrangThaiTiepNhan', function (event, data) {
                console.log(data);
                vm.data.phieuBaoHanh.TrangThaiTiepNhan = data.listTrangThai[0].MaTrangThai;
                vm.data.phieuBaoHanh.TenTrangThaiTiepNhan = data.listTrangThai[0].TrangThai;
            });
            $scope.$on(vm.controllerId + '.data.PhieuBaoHanhChiTiet', function (event, data) {
                getListChiTiet(phieuBaoHanhId);
            });
            $scope.$on(vm.controllerId + '.data.listKhachHang', function (event, data) {
                if (data && data.listKhachHang && data.listKhachHang.length) {
                    vm.data.phieuBaoHanh.TenKhachHang = data.listKhachHang[0].TenKhachHang;
                    vm.data.phieuBaoHanh.DienThoai = data.listKhachHang[0].DienThoai;
                    vm.data.phieuBaoHanh.SeriesNo = data.listKhachHang[0].Series;
                    vm.data.phieuBaoHanh.NgayXuat = data.listKhachHang[0].NgayXuat;
                    vm.data.phieuBaoHanh.SoPhieu = data.listKhachHang[0].SoPhieu;
                    vm.data.phieuBaoHanh.TenThietBi = data.listKhachHang[0].TenHangHoa;
                    vm.data.phieuBaoHanh.ThoiGianBaoHanh = data.listKhachHang[0].ThoiGianBaoHanh;
                    vm.data.phieuBaoHanh.HangSanXuat = data.listKhachHang[0].TenHangSanXuat;
                }
            });
            $scope.$on(vm.controllerId + '.action.F2', function (event, data) {
                vm.action.editChiTiet();
            });
            $scope.$on(vm.controllerId + '.action.F8', function (event, data) {
                vm.action.save();
            });
        }

        /*** BIZ FUNCTION ***/

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            if (vm.data.phieuBaoHanh && vm.data.phieuBaoHanh.TrangThaiTiepNhan === 'PBH_KT' && quyen !== 'V') { return false; }
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (phieuBaoHanhId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';
            var name = '';

            name = 'SeriesNo';
            if (inputName === name) {
                vm.action.getThongTinBySeries();
            }

            name = 'TenKhachHang';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'DienThoai';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'TenThietBi';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'HangSanXuat';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'TrangThaiTiepNhan';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            name = 'NgayHen';
            if (!inputName || inputName === name) {
                vm.error[name] = '';
                if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
                    first_error_name = has_error ? first_error_name : name;
                    vm.error[name] = '.';
                    has_error = true;
                }
            }
            //name = 'ChuanDoan';
            //if (!inputName || inputName === name) {
            //    vm.error[name] = '';
            //    if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
            //        first_error_name = has_error ? first_error_name : name;
            //        vm.error[name] = '.';
            //        has_error = true;
            //    }
            //}
            //name = 'YeuCauKhachHang';
            //if (!inputName || inputName === name) {
            //    vm.error[name] = '';
            //    if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
            //        first_error_name = has_error ? first_error_name : name;
            //        vm.error[name] = '.';
            //        has_error = true;
            //    }
            //}
            //name = 'PhuKienKemTheo';
            //if (!inputName || inputName === name) {
            //    vm.error[name] = '';
            //    if (utility.checkInValid(vm.data.phieuBaoHanh[name], 'isEmpty')) {
            //        first_error_name = has_error ? first_error_name : name;
            //        vm.error[name] = '.';
            //        has_error = true;
            //    }
            //}

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        function refresh() {
            if (phieuBaoHanhId == 0) {
                vm.data.phieuBaoHanh.SanPhamCty = 'Y';
                vm.data.phieuBaoHanh.TrangThaiTiepNhan = 'PBH_TN';
            } else {
                getById(phieuBaoHanhId);
            }
        }
        function getListSelected() {
            var list = [];

            list.push(vm.data.phieuBaoHanh);
            return list;
        }

        /*** CALL API FUNCTION ***/

        // chuẩn bị dữ liệu gửi api
        function preparePhieuBaoHanh(obj) {
            obj.NgayHen = utility.convertDateFormat(obj.NgayHen, 'DD/MM/YYYY', 'YYYY-MM-DD');
        }

        // fixed dữ liệu sau khi nhận từ api
        function fixPhieuBaoHanh(obj) {
            obj.NgayHen = utility.convertDateFormat(obj.NgayHen, 'YYYY-MM-DD', 'DD/MM/YYYY');
        }

        function insert() {
            vm.status.isLoading = true;

            var phieuBaoHanh = utility.clone(vm.data.phieuBaoHanh);
            preparePhieuBaoHanh(phieuBaoHanh);
            var data = phieuBaoHanh;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            PhieuBaoHanhService.insert(data).then(function success(result) {
                console.log(result);
                vm.status.isLoading = false;
                alert('Thêm phiếu bảo hành thành công');
                window.location = linkUrl + 'edit/' + result.data.data[0].PhieuBaoHanhId;
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                    alert('Không thể thêm phiếu bảo hành');
                }
            });
        }
        function getById(id) {
            vm.status.isLoading = true;
            var data = {
                phieuBaoHanhId: id,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };
            PhieuBaoHanhService.getById(data)
                .then(function success(result) {
                    console.log(result);
                    delete vm.data.phieuBaoHanh;
                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuBaoHanh = result.data.data[0];
                        fixPhieuBaoHanh(vm.data.phieuBaoHanh);
                        getListChiTiet(id);
                    } else if (phieuBaoHanhId) {
                        window.location = linkUrl + 'list';
                    }
                    vm.status.isLoading = false;
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });

        }
        function update() {
            vm.status.isLoading = true;

            var phieuBaoHanh = utility.clone(vm.data.phieuBaoHanh);
            preparePhieuBaoHanh(phieuBaoHanh);
            var data = phieuBaoHanh;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;
            PhieuBaoHanhService.update(data).then(function success(result) {
                console.log(result);
                vm.status.isLoading = false;
                alert('Cập nhật phiếu bảo hành thành công');
                refresh();
            }, function error(result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                    alert('Không thể cập nhật phiếu bảo hành');
                }
            });
        }
        function deleteList(list) {
            vm.status.isLoading = true;

            var data = {
                list: list,
                loginId: userInfo.NhanVienId
            }
            PhieuBaoHanhService.xoaList(data).then(function (success) {
                console.log(success);
                vm.status.isLoading = false;
                alert('Xóa phiếu bảo hành thành công');
                window.location = linkUrl + 'list';
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
                if (result.status === 400) {
                    alert(result.data.error.message);
                } else {
                    alert('Không thể xóa phiếu bảo hành');
                }
            });
        }
        function getListChiTiet(id) {
            vm.status.isLoadingChiTiet = true;
            var data = {
                phieuBaoHanhId: id,
                loginId: userInfo ? userInfo.NhanVienId : 0
            };
            PhieuBaoHanhService.getListChiTietByPhieuBaoHanhId(data)
                .then(function success(result) {
                    console.log(result);
                    vm.status.isLoadingChiTiet = false;
                    delete vm.data.listChiTiet;
                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.listChiTiet = result.data.data;
                    }
                }, function error(result) {
                    console.log(result);
                    vm.status.isLoadingChiTiet = false;
                });
        }
        function deleteChiTiet(id) {
            vm.status.isLoadingChiTiet = true;

            var data = {
                PhieuBaoHanhChiTietId: id,
                loginId: userInfo.NhanVienId
            }
            PhieuBaoHanhService.deleteChiTiet(data).then(function (success) {
                console.log(success);
                vm.status.isLoadingChiTiet = false;
                if (success.data && success.data.data) {
                    alert('Xóa chi tiết bảo hành thành công');
                    getListChiTiet(phieuBaoHanhId);
                }
            }, function (error) {
                console.log(error);
                vm.status.isLoadingChiTiet = false;
                if (error.status === 400) {
                    alert(error.data.error.message);
                } else {
                    alert('Không thể xóa chi tiết phiếu bảo hành');
                }
            });
        }
        function getThongTinBySeries(series) {
            vm.status.isLoading = true;

            var data = {
                Series: series,
                loginId: userInfo.NhanVienId
            }
            PhieuBaoHanhService.getThongTinBySeries(data).then(function (success) {
                console.log(success);
                vm.status.isLoading = false;
                if (success.data && success.data.data && success.data.data.length > 0) {
                    vm.data.phieuBaoHanh.TenKhachHang = success.data.data[0].TenKhachHang;
                    vm.data.phieuBaoHanh.DienThoai = success.data.data[0].DienThoai;
                    vm.data.phieuBaoHanh.SeriesNo = success.data.data[0].Series;
                    vm.data.phieuBaoHanh.NgayXuat = success.data.data[0].NgayXuat;
                    vm.data.phieuBaoHanh.SoPhieu = success.data.data[0].SoPhieu;
                    vm.data.phieuBaoHanh.TenThietBi = success.data.data[0].TenHangHoa;
                    vm.data.phieuBaoHanh.ThoiGianBaoHanh = success.data.data[0].ThoiGianBaoHanh;
                    vm.data.phieuBaoHanh.HangSanXuat = success.data.data[0].TenHangSanXuat;
                } else {
                    vm.data.phieuBaoHanh.TenKhachHang = '';
                    vm.data.phieuBaoHanh.DienThoai = '';
                    vm.data.phieuBaoHanh.SeriesNo = '';
                    vm.data.phieuBaoHanh.NgayXuat = '';
                    vm.data.phieuBaoHanh.SoPhieu = '';
                    vm.data.phieuBaoHanh.TenThietBi = '';
                    vm.data.phieuBaoHanh.ThoiGianBaoHanh = '';
                    vm.data.phieuBaoHanh.HangSanXuat = '';
                }
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
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
            var searchString = id + "|KhoPhieuBaoHanh";
            var fields = "ngay,sukien, HoTen";
            PhieuBaoHanhService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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
    });
    module.filter('sumOfValue', function () {
        return function (data, key) {
            if (angular.isUndefined(data) || angular.isUndefined(key))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + parseFloat(+value[key]);
            });
            return sum;
        };
    });
})();