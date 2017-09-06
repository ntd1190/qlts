(function () {
    'use strict';
    angular.module('app').controller('KhoDuyetPhieuFilterCtrl', function ($scope, utility) {
        /* PRIVATE */

        var vm = this;

        /* VIEW MODEL */
        vm.controllerId = 'KhoDuyetPhieuFilterCtrl';
        vm.status = {};
        vm.status.isSelectedAll = true;

        vm.data = {};
        vm.data.listKhoHang = [];
        vm.data.startDate = moment().format("01/MM/YYYY");
        vm.data.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
        vm.data.listTrangThai = [
            { MaTrangThai: 'KN', TrangThai: 'Kiểm nghiệm' },
            { MaTrangThai: 'LSC', TrangThai: 'Lưu sổ cái' },
        ];
        vm.data.listLoaiPhieuDisplay= [
                { Id: "1", Ma: 'KPN', Ten: 'Phiếu nhập' },
                { Id: "2", Ma: 'KPX', Ten: 'Phiếu Xuất' },
                { Id: "3", Ma: 'KPC', Ten: 'Phiếu chuyển kho' },
      
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
        vm.action = {

        };
        activate();

        function activate() {
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
        }
        vm.action.clearListKhoHang = function () {
            delete vm.data.listKhoHang;
            setInitValue();
        };
        vm.action.search = function () {
            emitSearch();
           
        };
        vm.action.reset = function () {
            delete vm.data.listKhoHang;
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
            vm.data.startDate = moment().format("01/MM/YYYY");
            vm.data.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
            vm.data.listTrangThai = [
                { MaTrangThai: 'KPC_KN', TrangThai: 'Kiểm nghiệm' },
                { MaTrangThai: 'KPC_LSC', TrangThai: 'Lưu sổ cái' },
            ];
            vm.data.listLoaiPhieu = [];
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

        vm.action.apDung = function () {
            var selectedListLoaiPhieu = new Array();
            for (var i = 0; i < vm.data.listLoaiPhieuDisplay.length; i++) {
                if (vm.data.listLoaiPhieuDisplay[i].isSelected) {
                    selectedListLoaiPhieu.push(vm.data.listLoaiPhieuDisplay[i]);
                }
            }
            vm.data.listLoaiPhieu = selectedListLoaiPhieu;
            $('#LoaiPhieuListPopup').collapse('hide');
        }
        vm.action.ClearlistLoaiPhieu = function() {
            vm.data.listLoaiPhieu = [];
        }
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
            var LoaiPhieu = joinStr(vm.data.listLoaiPhieu, "Id");
            var MaTrangThai = joinStr(listTrangThai, 'MaTrangThai');
            vm.data.searchString = startDate + '|' + endDate + '|' + LoaiPhieu + '|' + KhoHangId + '|' + MaTrangThai;
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