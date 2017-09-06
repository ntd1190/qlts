(function () {
    'use strict';
    angular.module('app').controller('KhoPhieuNhapFilterCtrl', function ($scope, utility) {
        /* PRIVATE */

        var vm = this;

        /* VIEW MODEL */
        vm.controllerId = 'KhoPhieuNhapFilterCtrl';
        vm.status = {};
        vm.status.isSelectedAll = true;

        vm.data = {};
        vm.data.listKhachHang = [];
        vm.data.listKhoHang = [];
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.listTrangThai = [
            { MaTrangThai: 'KPN_KN', TrangThai: 'Kiểm nghiệm' },
            { MaTrangThai: 'KPN_LSC', TrangThai: 'Lưu sổ cái' },
        ];

        vm.onInitView = function (config) {
            console.log('onInitView');
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        }

        /* ACTION FUNCTION */
        vm.action = {};
        vm.action.clearListKhachHang = function () {
            delete vm.data.listKhachHang;
            setInitValue();
        };
        vm.action.clearListKhoHang = function () {
            delete vm.data.listKhoHang;
            setInitValue();
        };
        vm.action.search = function () {
            emitSearch();
        };
        vm.action.selectAll = function () {
            vm.status.isSelectedAll = !vm.status.isSelectedAll;

            if (vm.status.isSelectedAll == false) {
                vm.data.listTrangThai[0].isSelected = true;
            } else {
                for (var i = 0; i < vm.data.listTrangThai.length; i++) {
                    vm.data.listTrangThai[i].isSelected = false;
                }
            }
            return vm.status.isSelectedAll;
        };
        vm.action.autoSelectAll = function () {
            for (var i = 0; i < vm.data.listTrangThai.length; i++) {
                if (vm.data.listTrangThai[i].isSelected) {
                    vm.status.isSelectedAll = false;
                    return vm.status.isSelectedAll;
                }
            }
            vm.status.isSelectedAll = true;
            return vm.status.isSelectedAll;
        };
        /* BROADCAST / EMIT / ON FUNCTION */
        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.listKhachHang', function (e, v) {
                console.log(v);
                if (v && v.listKhachHang) {
                    getListKhachHang(v.listKhachHang);
                }
            });
            $scope.$on(vm.controllerId + '.data.listKhoHang', function (e, v) {
                console.log(v);
                if (v && v.listKhoHang) {
                    getListKhoHang(v.listKhoHang);
                }
            });
            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                vm.action.search();
            });
        }

        function emitSearch() {
            setInitValue();
            var data = getDataFilter();
            console.log(data);
            $scope.$emit(vm.controllerId + '.data.filter', data);
        }

        /* BIZ FUNCTION */
        function setInitValue() {
            if (!!vm.data.listKhachHang == false) {
                vm.data.listKhachHang = [];
            }
            if (!!vm.data.listKhoHang == false) {
                vm.data.listKhoHang = [];
            }
        }
        function getDataFilter() {
            var data = {};
            data.listKhachHang = utility.clone(vm.data.listKhachHang);
            data.listKhoHang = utility.clone(vm.data.listKhoHang);
            data.startDate = vm.data.startDate;
            data.endDate = vm.data.endDate;

            data.listTrangThai = [];
            for (var i = 0; i < vm.data.listTrangThai.length; i++) {
                if (vm.data.listTrangThai[i].isSelected)
                    data.listTrangThai.push(utility.clone(vm.data.listTrangThai[i]));
            }
            return data;
        }

        // thêm vào danh sách các item chưa có
        function getListKhachHang(list) {
            setInitValue();
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var isExist = false;
                    for (var j = 0; j < vm.data.listKhachHang.length; j++) {
                        if (vm.data.listKhachHang[j].KhachHangId == list[i].KhachHangId) {
                            isExist = true;
                            break;
                        }
                    }
                    if (isExist == false) {
                        vm.data.listKhachHang.push(list[i]);
                    }
                }
            }
        }
        // thêm vào danh sách các item chưa có
        function getListKhoHang(list) {
            setInitValue();
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var isExist = false;
                    for (var j = 0; j < vm.data.listKhoHang.length; j++) {
                        if (vm.data.listKhoHang[j].KhoHangId == list[i].KhoHangId) {
                            isExist = true;
                            break;
                        }
                    }
                    if (isExist == false) {
                        vm.data.listKhoHang.push(list[i]);
                    }
                }
            }
        }
    });
})();