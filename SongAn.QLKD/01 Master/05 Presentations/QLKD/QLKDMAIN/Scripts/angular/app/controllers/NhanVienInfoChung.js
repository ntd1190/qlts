(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienInfoChung', NhanVienInfoChung);

    function NhanVienInfoChung($scope, NhanVienService, PhongBanService) {
        var vm = this;
        vm.title = 'NhanVienInfoChung';
        vm.action = getParameterByName('action', window.location.href);
        vm.ma = getParameterByName('ma', window.location.href);
        vm.NhanVien_Chung = {};
        vm.dsPhongBan = PhongBanService.getAll();
        vm.dsPhongBanSearch = PhongBanService.getSelected();

        vm.actSaveNhanVien_Chung = function () {
            saveView();
            if (checkInput() == false) { return; };
            if (vm.action === 'edit') {
                NhanVienService.update(vm.NhanVien_Chung, function (tx, result) {
                    $scope.$digest();
                    alert('Lưu thành công');
                });
            }
            if (vm.action !== 'edit') {
                NhanVienService.add(vm.NhanVien_Chung, function (tx, result) {
                    $scope.$digest();
                    alert('Thêm thành công');
                });
            }
            window.location.href = 'Index?view=nhanvien-them&ma=' + vm.NhanVien_Chung.Ma + '&action=edit';
        };

        vm.actCheckMaNhanVien = function (ma) {
            NhanVienService.getById(ma, function (tx, result) {
                if (result.rows.length > 0) {
                    alert('Mã nhân viên đã tồn tại');
                } else {
                    alert('Có thể sử dụng');
                }
            });
        }
        activate();

        function activate() {
            angular.element('#txtBirth').on("changeDate", function () {
                vm.NhanVien_Chung.NgaySinh = $(".date").val();
            });

            if (vm.action === 'edit') {
                if (!vm.ma) {
                    window.location.href = 'Index?view=nhanvien-them';
                }

                NhanVienService.getById(vm.ma, function (tx, result) {
                    if (result.rows.length > 0) {
                        vm.NhanVien_Chung = result.rows.item(0);
                        loadView();
                        $scope.$digest();
                    } else {
                        window.location.href = 'Index?view=nhanvien-them';
                    }
                });
            }
        }

        function checkInput() {
            if (!vm.NhanVien_Chung.Ma) {
                alert('Chưa nhập mã nhân viên');
                return false;
            }
            if (!vm.NhanVien_Chung.Ten) {
                alert('Chưa nhập tên nhân viên');
                return false;
            }
            if (!vm.NhanVien_Chung.PhongBan) {
                alert('Chưa chọn phòng ban');
                return false;
            }

            return true;
        }

        function loadView() {
            // lấy tên phòng ban của nhân viên gắn vào dsPhongBanSearch

            var phongban = vm.dsPhongBan.find(function (pb) {
                return pb.Ten == vm.NhanVien_Chung.PhongBan;
            })

            if (phongban) {
                vm.dsPhongBanSearch.push(phongban);
            }
        }

        function saveView() {
            // lấy thông tin phòng ban gán vào nhân viên
            if (vm.dsPhongBanSearch.length > 0) {
                vm.NhanVien_Chung.PhongBan = vm.dsPhongBanSearch[0].Ten;
            }
        }
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})();
