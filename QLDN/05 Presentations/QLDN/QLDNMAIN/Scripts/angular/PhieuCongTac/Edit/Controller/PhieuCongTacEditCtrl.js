(function () {
    'use strict';

    angular.module('app')
        .controller('PhieuCongTacEditCtrl', controller);

    function controller($scope, $rootScope, utility, PhieuCongTacService) {
        var listQuyenTacVu;
        var userInfo;
        var phieuCongTacId = 0;
        var editUrl = '';
        var vm = this;
        vm.controllerId = 'PhieuCongTacEditCtrl';

        vm.status = {
            isLoadingMaster: false,
            isLoadingDetail: false,
            errorMessage: '',
            infoMessage: '',
            isEdit: false,
            isSelectedAll: false,
            errNoiDung: '',
            errNhanVienId: '',
            errNgayDi: '',
            errNgayVe: '',
            errSoNgay: '',
        };
        vm.data = {
            phieuCongTac: {
                SoNgay: 1,
                NgayDi: moment().format('DD/MM/YYYY'),
                NgayVe: moment().format('DD/MM/YYYY'),
                ThanhToan: 0,
            },
            listChiTiet: [],
            yeuCauThanhToan: 0,
            thanhToan: 0,
        };

        vm.action = {
            checkQuyenTacVu: checkQuyenTacVu,
            checkModifyPhieuCongTac: checkModifyPhieuCongTac,
            convertDateFormat: utility.convertDateFormat,
            savePhieuCongTac: savePhieuCongTac,
            clearNhanVien: clearNhanVien,
            updateChiTiet: updateChiTiet,
            addChiTiet: addChiTiet,
            checkAll: checkAll,
            autoCheckAll: autoCheckAll,
            xoaChiTiet: xoaChiTiet,
            getListLuocSu: GetListLuocSu,
        };

        activate();

        function activate() { }

        /****************************************
         * INIT FUNCTION
         */
        vm.onInitView = function (config) {
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                userInfo = config.userInfo;
            }

            if (config && config.phieuCongTacId) {
                phieuCongTacId = config.phieuCongTacId;
                getPhieuCongTacById(phieuCongTacId);
                getChiTietByPhieuCongTacId(phieuCongTacId);
                vm.status.isEdit = true;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.editUrl) {
                editUrl = config.editUrl;
            }

            initEventListener();
        }

        /************************************************
         * ACTION FUNCTION
         */

        function savePhieuCongTac() {
            if (validPhieuCongTac() == false) { }
            else if (vm.status.isEdit) {
                updatePhieuCongTac();
            } else {
                insertPhieuCongTac();
            }
        }

        function clearNhanVien() {
            vm.data.phieuCongTac.NhanVienId = 0;
            vm.data.phieuCongTac.TenNhanVien = '';
        }

        function xoaChiTiet() {
            message('', '');

            if (checkModifyPhieuCongTac() == false) {
                alert('Không thể xóa phiếu đã duyệt.');
                return;
            }

            if (vm.data.listChiTiet) {
                var countSelect = 0;

                for (var i = 0; i < vm.data.listChiTiet.length; i++) {
                    if (vm.data.listChiTiet[i].isSelected) {
                        countSelect = countSelect + 1;
                    }

                    if (vm.data.listChiTiet[i].MaTrangThai == 'PCTCT_DY' || vm.data.listChiTiet[i].MaTrangThai == 'PCTCT_TC') {
                        alert('Không thể xóa chi tiết đã duyệt.');
                        return;
                    }
                }

                if (countSelect == 0) {
                    alert('Vui lòng chọn trong danh sách.');
                    return;
                }

                xoaListChiTiet();
            } else {
                alert('Vui lòng chọn trong danh sách.');
            }
        }
        /****************************************************
         * BROADCAST / EMIT / ON FUNCTION
         */
        /* đăng ký các sự kiện */
        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.getNhanVien', function (e, v) {
                if (v && v.length) {
                    vm.data.phieuCongTac.TenNhanVien = v[0].Ho + ' ' + v[0].Ten;
                    vm.data.phieuCongTac.NhanVienId = v[0].NhanVienId;

                }
            });
            $scope.$on(vm.controllerId + '.action.getNguoiDuyet', function (e, v) {
                if (v && v.length) {
                    vm.data.phieuCongTac.TenNguoiDuyet = v[0].Ho + ' ' + v[0].Ten;
                    vm.data.phieuCongTac.NguoiDuyet = v[0].NhanVienId;

                }
            });

            $scope.$on(vm.controllerId + '.action.reloadChiTiet', function (e, v) {
                getChiTietByPhieuCongTacId(phieuCongTacId);
            });

            $scope.$on(vm.controllerId + '.action.F2', function (e, v) {
                if (vm.action.checkQuyenTacVu('M') && vm.action.checkModifyPhieuCongTac() && vm.data.phieuCongTac.PhieuCongTacId > 0) {
                    addChiTiet();
                }
            });
            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                if (vm.action.checkQuyenTacVu('M') && vm.action.checkModifyPhieuCongTac()) {
                    savePhieuCongTac();
                }
            });
        }

        function updateChiTiet(objChiTiet) {
            $scope.$emit(vm.controllerId + '.action.updateChiTiet', utility.clone(objChiTiet));
        }

        function addChiTiet() {
            if (phieuCongTacId) {
                $scope.$emit(vm.controllerId + '.action.addChiTiet', phieuCongTacId);
            } else {
                alert('Phải tạo phiếu trước khi thêm chi tiết.');
            }
        }
        /**************************************************
         * BIZ FUNCTION
         */

        /* tự đông check / uncheck checkAll */
        function autoCheckAll() {
            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                return false;
            }

            for (var i = 0; i < vm.data.listChiTiet.length; i++) {
                if (vm.data.listChiTiet[i].isSelected) {
                } else {
                    vm.status.isSelectedAll = false;
                    return vm.status.isSelectedAll;
                }
            }
            vm.status.isSelectedAll = true;

            return vm.status.isSelectedAll;
        }

        /* checkAll / uncheckAll */
        function checkAll() {
            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                return false;
            }

            vm.status.isSelectedAll = !vm.status.isSelectedAll;

            for (var i = 0; i < vm.data.listChiTiet.length; i++) {
                vm.data.listChiTiet[i].isSelected = vm.status.isSelectedAll;
            }
            return vm.status.isSelectedAll;
        }

        function tinhSoNgay() {
            var soNgay = 0;
            return soNgay;
        }

        function validNgayDi_NgayVe() {
            var _ngayDi = moment(vm.data.phieuCongTac.NgayDi, 'DD/MM/YYYY');
            var _ngayVe = moment(vm.data.phieuCongTac.NgayVe, 'DD/MM/YYYY');
            if (_ngayDi > _ngayVe) {
                return false;
            }
            else if (_ngayDi.format('MM') != _ngayVe.format('MM')) {
                return false;
            }
            return true;
        }

        /* kiểm tra xem phiếu công tác có cho phép thay đổi thông tin ko */
        function checkModifyPhieuCongTac() {
            if (vm.data.phieuCongTac) {
                if (vm.data.phieuCongTac.MaTrangThai == 'PCT_DY' || vm.data.phieuCongTac.MaTrangThai == 'PCT_TC') {
                    return false;
                }
                else { return true; }
            }

            return false;
        }

        function validPhieuCongTac() {
            message('', '');

            vm.status.errNoiDung = '';
            if (!vm.data.phieuCongTac.NoiDung) {
                vm.status.errNoiDung = 'chưa nhập tiêu đề';
                return false;
            }

            vm.status.errNhanVienId = '';
            if (!vm.data.phieuCongTac.NhanVienId) {
                vm.status.errNhanVienId = 'chưa chọn nhân viên';
                return false;
            }

            vm.status.errNgayDi = '';
            if (!vm.data.phieuCongTac.NgayDi) {
                vm.status.errNgayDi = 'chưa nhập ngày đi';
                return false;
            }

            vm.status.errNgayVe = '';
            if (!vm.data.phieuCongTac.NgayVe) {
                vm.status.errNgayVe = 'chưa nhập ngày về';
                return false;
            }

            vm.status.errNgayVe = '';
            if (!validNgayDi_NgayVe()) {
                vm.status.errNgayVe = 'ngày đi phải trước ngày về và cùng trong 1 tháng';
                alert(vm.status.errNgayVe);
                return false;
            }

            vm.status.errSoNgay = '';
            if (vm.data.phieuCongTac.SoNgay < 1) {
                vm.status.errSoNgay = 'chưa nhập số ngày';
                return false;
            }
            return true;
        }

        /* kiểm tra quyền tác vụ */
        function checkQuyenTacVu(quyen) {
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /* tính tổng yêu cầu thanh toán, thanh toán */
        function tinhTong() {
            var thanhToan = 0;
            var yeuCauThanhToan = 0;

            if (vm.data.listChiTiet) {
                for (var i = 0; i < vm.data.listChiTiet.length; i++) {
                    var thanhTien = vm.data.listChiTiet[i].SoLuong * vm.data.listChiTiet[i].DonGia;
                    yeuCauThanhToan += thanhTien;

                    if (vm.data.listChiTiet[i].MaTrangThai == 'PCTCT_DY') {
                        thanhToan += thanhTien;
                    }
                }
            }

            vm.data.thanhToan = thanhToan;
            vm.data.yeuCauThanhToan = yeuCauThanhToan;
        }

        /* sửa lỗi dữ liệu để hiện lên giao diện */
        function fixPhieuCongTacInfo() {
            if (vm.data.phieuCongTac) {
                vm.data.phieuCongTac.ThanhToan = vm.data.phieuCongTac.ThanhToan || 0;
                vm.data.phieuCongTac.NgayDi = utility.convertDateFormat(vm.data.phieuCongTac.NgayDi, 'YYYY-MM-DD', 'DD/MM/YYYY');
                vm.data.phieuCongTac.NgayVe = utility.convertDateFormat(vm.data.phieuCongTac.NgayVe, 'YYYY-MM-DD', 'DD/MM/YYYY');
            }
        }

        /*************************************************
         * FUNCTION CALL API
         */

        function xoaListChiTiet() {
            /* nếu danh sách không có dữ liêu thì thoát ra, không làm */
            if (vm.data.listChiTiet && vm.data.listChiTiet.length > 0) { } else { return; }

            if (confirm('Bạn có muốn xóa hay không ?') == false) { return; }

            vm.status.isLoading = true;
            var listSelected = [];

            for (var i = 0; i < vm.data.listChiTiet.length; i++) {
                if (vm.data.listChiTiet[i].isSelected) {
                    listSelected.push(vm.data.listChiTiet[i]);
                }
            }

            /* nếu không có dòng nào đc chọn thì thoát ra */
            if (listSelected.length > 0) { } else { return; }

            PhieuCongTacService.xoaListChiTiet(listSelected).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    if (success.data.data.length > 0) {
                        getChiTietByPhieuCongTacId(phieuCongTacId);
                    } else {
                        alert('Không tìm thấy phiếu công tác.');
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }

        /* lấy thông tin phiếu công tác */
        function getPhieuCongTacById(ids) {

            var data = { phieuCongTacIds: ids };

            PhieuCongTacService.getById(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    delete vm.data.phieuCongTac;
                    if (success.data.data.length > 0) {
                        vm.data.phieuCongTac = success.data.data[0];
                        fixPhieuCongTacInfo();

                    } else {
                        alert('Không tìm thấy phiếu công tác.');
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }

        /* lấy danh sách phiếu công tác chi tiết */
        function getChiTietByPhieuCongTacId(id) {
            var data = { phieuCongTacId: id };

            PhieuCongTacService.getChiTietById(data).then(function (success) {
                console.log(success);
                if (success.data && success.data.data) {
                    delete vm.data.listChiTiet;
                    if (success.data.data) {
                        vm.data.listChiTiet = success.data.data;

                    }
                    tinhTong();
                    duyetPhieu();
                }
            }, function (error) {
                console.log(error);
            });
        }

        function insertPhieuCongTac() {
            var data = {
                tieuDe: vm.data.phieuCongTac.NoiDung,
                ngayDi: utility.convertDateFormat(vm.data.phieuCongTac.NgayDi, 'DD/MM/YYYY', 'YYYY-MM-DD'),
                ngayVe: utility.convertDateFormat(vm.data.phieuCongTac.NgayVe, 'DD/MM/YYYY', 'YYYY-MM-DD'),
                nhanVienId: vm.data.phieuCongTac.NhanVienId,
                soNgay: vm.data.phieuCongTac.SoNgay,
                loginId: userInfo.NhanVienId,
            };

            PhieuCongTacService.insert(data).then(function (result) {
                // SUCCESS
                console.log(result);
                if (result && result.data && result.data.data) {
                    if (result.data.data.PhieuCongTacId > 0) {
                        alert('Lưu phiếu công tác thành công.');

                        /* lưu thành công chuyển sang trang edit */
                        window.location.href = editUrl + result.data.data.PhieuCongTacId;
                    }
                }

            }, function (result) {
                // ERROR
                console.log(result);
                if (result.status == 400) {
                    vm.status.errorMessage = result.data.error.message;
                }
            });
        }

        function GetListLuocSu(id) {
            vm.data.isLoading = true;

            var draw = 1;
            var start = 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = 10;  // Number of entries showed per page.
            var sortName = 'LuocSuId';
            var sortDir = 'desc';
            var searchString = id + "|PhieuCongTac";
            var fields = "ngay,sukien, HoTen";
            PhieuCongTacService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                console.log(success);
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

        function duyetPhieu()//Tan lam duyet phieu khi load
        {
            var TTPhieuCongTac = vm.data.phieuCongTac.MaTrangThai.substring(vm.data.phieuCongTac.MaTrangThai.length - 2, vm.data.phieuCongTac.MaTrangThai.length);
            if (TTPhieuCongTac == "DD") {
                var ChiTietDD = "";
                var ChiTietDY = "";
                var ChiTietTC = "";
                for (var i = 0; i < vm.data.listChiTiet.length; i++) {
                    var pheduyet = vm.data.listChiTiet[i];
                    if (pheduyet.MaTrangThai.substring(pheduyet.MaTrangThai.length - 2, pheduyet.MaTrangThai.length) == "DD") ChiTietDD = "DD";
                    if (pheduyet.MaTrangThai.substring(pheduyet.MaTrangThai.length - 2, pheduyet.MaTrangThai.length) == "DY") ChiTietDY = "DY";
                    if (pheduyet.MaTrangThai.substring(pheduyet.MaTrangThai.length - 2, pheduyet.MaTrangThai.length) == "TC") ChiTietTC = "TC";
                }
                if (ChiTietDD == "" && ChiTietDY == "DY") $rootScope.$broadcast('PhieuCongTacDuyetCtrl.action.UpdatePhieuCongTac', vm.data.phieuCongTac.PhieuCongTacId, ChiTietDY, vm.data.thanhToan);
                if (ChiTietDD == "" && ChiTietDY == "" && ChiTietTC == "TC") $rootScope.$broadcast('PhieuCongTacDuyetCtrl.action.UpdatePhieuCongTac', vm.data.phieuCongTac.PhieuCongTacId, ChiTietTC, "0");
            }
        }
        function updatePhieuCongTac() {
            var data = {
                tieuDe: vm.data.phieuCongTac.NoiDung,
                ngayDi: utility.convertDateFormat(vm.data.phieuCongTac.NgayDi, 'DD/MM/YYYY', 'YYYY-MM-DD'),
                ngayVe: utility.convertDateFormat(vm.data.phieuCongTac.NgayVe, 'DD/MM/YYYY', 'YYYY-MM-DD'),
                nhanVienId: vm.data.phieuCongTac.NhanVienId,
                soNgay: vm.data.phieuCongTac.SoNgay,
                phieuCongTacId: vm.data.phieuCongTac.PhieuCongTacId,
                ctrVersion: vm.data.phieuCongTac.CtrVersion,
                loginId: userInfo.NhanVienId,
            };

            PhieuCongTacService.update(data).then(function (result) {
                // SUCCESS
                console.log(result);
                if (result && result.data && result.data.data) {
                    if (result.data.data.PhieuCongTacId > 0) {
                        alert('Lưu phiếu công tác thành công.');
                        getPhieuCongTacById(result.data.data.PhieuCongTacId);
                    }
                }

            }, function (result) {
                // ERROR
                console.log(result);
                if (result.status == 400) {
                    message('error', result.data.error.message);
                }
            });
        }
        /**************************************************
         * HELPERS FUNCTION
         */
        function message(type, message) {
            vm.status.infoMessage = '';
            vm.status.errorMessage = '';

            switch (type) {
                case 'info':
                    vm.status.infoMessage = message;
                    break;
                case 'error':
                    vm.status.errorMessage = message;
                    break;
                default:
                    break;
            }
        }
    }
})();