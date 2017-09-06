(function () {
    'use strict';
    angular.module('app').controller('KhoPhieuChuyenFilterCtrl', function ($scope, utility) {
        /* PRIVATE */

        var vm = this;

        /* VIEW MODEL */
        vm.controllerId = 'KhoPhieuChuyenFilterCtrl';
        vm.status = {};
        vm.status.isSelectedAll = true;

        vm.data = {};
        vm.data.listKhoHang = [];
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.listTrangThai = [
            { MaTrangThai: 'KPC_KN', TrangThai: 'Kiểm nghiệm' },
            { MaTrangThai: 'KPC_LSC', TrangThai: 'Lưu sổ cái' },
        ];
        vm.data.searchString = '';
        vm.onInitView = function (config) {
            console.log('onInitView');
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        }

        /* ACTION FUNCTION */
        vm.action = {};

        vm.action.clearListKhoHang = function () {
            delete vm.data.listKhoHang;
            setInitValue();
        };
        vm.action.search = function () {
            emitSearch();
           
        };
        vm.action.reset = function () {
            delete vm.data.listKhoHang;
            vm.data.startDate = '';
            vm.data.endDate = '';
            vm.data.listTrangThai = [
                { MaTrangThai: 'KPC_KN', TrangThai: 'Kiểm nghiệm' },
                { MaTrangThai: 'KPC_LSC', TrangThai: 'Lưu sổ cái' },
            ];
            vm.status.isSelectedAll = true;
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
            debugger
            var KhoHangId = joinStr(vm.data.listKhoHang, 'KhoHangId');
            var startDate = vm.data.startDate;
            var endDate = vm.data.endDate;

            var listTrangThai = [];
            for (var i = 0; i < vm.data.listTrangThai.length; i++) {
                if (vm.data.listTrangThai[i].isSelected)
                    listTrangThai.push(utility.clone(vm.data.listTrangThai[i]));
            }
            var MaTrangThai = joinStr(listTrangThai, 'MaTrangThai');
            vm.data.searchString = startDate + '|' + endDate + '|' + KhoHangId + '|' + MaTrangThai;
            $scope.$emit(vm.controllerId + '.data.filter', vm.data.searchString);
        }

        /* BIZ FUNCTION */
        function setInitValue() {

            if (!!vm.data.listKhoHang == false) {
                vm.data.listKhoHang = [];
            }
        }


        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    list.push(array[i][property]);
                }

                result = list.join(',');
            } else result = result || '';

            return result;
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