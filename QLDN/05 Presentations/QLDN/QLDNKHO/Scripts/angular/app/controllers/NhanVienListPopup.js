(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienListPopupCtrl', NhanVienListPopupCtrl);


    function NhanVienListPopupCtrl($scope, NhanVienService, utility) {
        var vm = this;
        var tblSelected = NhanVienService.getSelected();

        vm.dsNhanVien = [];
        vm.dsSelected = [];

        vm.actSearch = search;
        vm.selectNhanVien = selectNhanVien;
        vm.checkNhanVienSearch = checkNhanVienSearch;
        vm.apdung = apdung;
        vm.close = close;

        activate();

        function activate() {
        }

        function apdung () {
            utility.clearArray(tblSelected);
            while (vm.dsSelected.length) { tblSelected.push(vm.dsSelected.pop()); }
            reset();
        };

        function close  () { reset(); };

        function search() {
            loadTblNhanVien(function () {
                var ds = vm.dsNhanVien.filter(function (nhanvien) {
                    return nhanvien.Ma.match(vm.txtSearch) || nhanvien.Ten.match(vm.txtSearch);
                });

                utility.clearArray(vm.dsNhanVien);
                while (ds.length) { vm.dsNhanVien.push(ds.pop()); };

            });
        };

        function reset() {
            utility.clearArray(vm.dsNhanVien);
            utility.clearArray(vm.dsSelected);
        }

        function selectNhanVien(ma) {
            var nhanvien = vm.dsSelected.find(function (nhanvien) { return nhanvien.Ma === ma; })

            if (nhanvien !== undefined) {
                vm.dsSelected = vm.dsSelected.filter(function (obj) {
                    return obj.Ma !== nhanvien.Ma;
                });
                return;
            }

            var nhanvien = vm.dsNhanVien.find(function (nhanvien) { return nhanvien.Ma === ma; })

            if (nhanvien === undefined) { return; }

            vm.dsSelected.push(nhanvien);
        };

        function checkNhanVienSearch(ma) {
            return vm.dsSelected.some(function (obj) {
                return obj.Ma === ma
            });
        };

        function loadTblNhanVien(callback) {
            NhanVienService.loadData(function (tx, result) {
                if (result.rows.length == 0) { return; }

                utility.clearArray(vm.dsNhanVien);

                for (var i = 0; i < result.rows.length; i++) {
                    vm.dsNhanVien.push(result.rows.item(i));
                }
                callback();
                $scope.$digest();
            });
        }
    }
})();
