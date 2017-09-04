(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhongBanListCtrl', PhongBanListCtrl);


    function PhongBanListCtrl($rootScope, $scope, PhongBanService) {
        /* jshint validthis:true */
        var vm = this;
        var tblPhongBan = PhongBanService.getAll();
        var tblSelected = PhongBanService.getSelected();
        vm.title = 'PhongBanListCtrl';
        vm.dsPhongBan = [];
        vm.dsSelected = [];
        vm.txtSearch = '';

        vm.apdung = function () {
            clearArray(tblSelected);
            while (vm.dsSelected.length) { tblSelected.push(vm.dsSelected.pop()); }
            reset();
        };

        vm.close = function () { reset(); };

        vm.actSearch = function () {
            while (vm.dsSelected.length) { tblSelected.push(vm.dsSelected.pop()); }
            console.log(tblPhongBan);
            vm.dsPhongBan = tblPhongBan.filter(function (phongban) {
                return phongban.Ma.match(vm.txtSearch) || phongban.Ten.match(vm.txtSearch);
            });
        };

        vm.selectPhongBan = function (ma) {
            var phongban = vm.dsSelected.find(function (phongban) { return phongban.Ma === ma; })

            if (phongban !== undefined) {
                vm.dsSelected = vm.dsSelected.filter(function (obj) {
                    return obj.Ma !== phongban.Ma;
                });
                return;
            }

            var phongban = tblPhongBan.find(function (phongban) { return phongban.Ma === ma; })

            if (phongban === undefined) { return; }

            vm.dsSelected.push(phongban);
        };

        vm.selectOne = function (ma) {
            clearArray(vm.dsSelected);
            var phongban = vm.dsPhongBan.find(function (phongban) { return phongban.Ma === ma; })
            vm.dsSelected.push(phongban);
        };

        vm.checkPhongBanSearch = function (ma) {
            return vm.dsSelected.some(function (obj) {
                return obj.Ma === ma
            });
        };

        activate();

        function activate() { }

        function reset() {
            vm.txtSearch = '';
            clearArray(vm.dsPhongBan);
            clearArray(vm.dsSelected);
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
    }
})();
