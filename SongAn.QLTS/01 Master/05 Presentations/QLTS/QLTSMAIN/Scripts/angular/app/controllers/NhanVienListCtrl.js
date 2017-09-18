(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienListCtrl', NhanVienListCtrl);

    function NhanVienListCtrl($scope, NhanVienService, PhongBanService, TuyChonCotService, utility) {
        var vm = this;

        vm.Meta = TuyChonCotService.getAll();

        vm.dsNhanVien = [];
        vm.dsNhanVienSearch = NhanVienService.getSelected();
        vm.dsPhongBanSearch = PhongBanService.getSelected();

        vm.title = 'NhanVienResultCtrl';
        vm.checkedAll = true;
        vm.test = { message: 'hello' };

        vm.actThietLapLai = function () {
            console.log(vm.dsNhanVienSearch);
            console.log(vm.dsPhongBanSearch);
            reset();
        };
        vm.clearDsNhanVienSearch = function () { utility.clearArray(vm.dsNhanVienSearch); };
        vm.clearDsPhongBanSearch = function () { utility.clearArray(vm.dsPhongBanSearch); };
        vm.remove = function (ma) {
            if (confirm('Xóa nhân viên có mã là ' + ma + ' ?') == false) {
                return;
            }
            removeNhanVienTable(ma);
        };

        vm.actSearch = function () {
            loadNhanVienTable(function () {
                vm.dsNhanVien = vm.dsNhanVien.filter(function (item) {
                    var check = true;

                    if (vm.dsPhongBanSearch.length > 0) {
                        check = check && vm.dsPhongBanSearch.find(function (obj) {
                            return obj.Ten == item.PhongBan;
                        }) !== undefined;
                    }

                    if (vm.dsNhanVienSearch.length > 0) {
                        check = check && vm.dsNhanVienSearch.find(function (obj) {
                            return obj.Ma == item.Ma;
                        }) !== undefined;
                    }

                    return check;
                });
            });
        };

        activate();

        function activate() {
        }

        function reset() {
            utility.clearArray(vm.dsNhanVienSearch);
            utility.clearArray(vm.dsPhongBanSearch);
        }
        function removeNhanVienTable(ma) {
            NhanVienService.remove(ma, function (tx, result) {
                loadNhanVienTable(function () { });
            });
        }

        function loadNhanVienTable(callback) {
            NhanVienService.loadData(function (tx, result) {
                if (result.rows.length == 0) { return; }
                while (vm.dsNhanVien.length) { vm.dsNhanVien.pop() };
                for (var i = 0; i < result.rows.length; i++) {
                    vm.dsNhanVien.push(result.rows.item(i));
                }
                callback();
                $scope.$digest();
            });
        }
    }
})();
