/*****************************************************************************
1. Create Date : 2017.07.26
2. Creator     : Nguyen Thanh Binh
3. Description : phiếu bảo hành filter
4. History     : 2017.07.26 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('PhieuBaoHanhFilterCtrl', function ($scope, utility) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;

        /*** VIEW MODEL ***/

        vm.controllerId = 'PhieuBaoHanhFilterCtrl';
        vm.status = {};
        vm.status.isSelectedAll = true;

        vm.data = {};
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.listTrangThai = [
            { MaTrangThai: 'Y', TrangThai: 'Cty' },
            { MaTrangThai: 'N', TrangThai: 'Ngoài cty' },
        ];

        /*** INIT FUNCTION ***/

        activate();
        function activate() {
            reset();
        }

        vm.onInitView = function (config) {
            console.log(config);
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            initEventListener();
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.search = function () {
            emitSearch();
        };
        vm.action.thietLapLai = function () {
            reset();
        }

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.search', function (e, v) {
                console.log(vm.controllerId + '.action.search');
                vm.action.search();
            });
        }
        function emitSearch() {
            var inputSearch = {
                Series: vm.data.Series,
                DienThoai: vm.data.DienThoai,
                ThongTinKhachHang: vm.data.ThongTinKhachHang,
                SanPhamCty: vm.data.SanPhamCty,
                startDate: vm.data.startDate,
                endDate: vm.data.endDate,
            };
            $scope.$emit(vm.controllerId + '.data.filter', inputSearch);
        }
        /*** BIZ FUNCTION ***/

        function getSelected(array) {
            var listSelected = [];

            if (array && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].isSelected) {
                        listSelected.push(utility.clone(array[i]));
                    }
                }
            }

            return listSelected;
        }

        function reset() {
            vm.data.startDate = moment().format('DD/MM/YYYY');
            vm.data.endDate = moment().format('DD/MM/YYYY');
            vm.data.Series = '';
            vm.data.DienThoai = '';
            vm.data.ThongTinKhachHang = '';
            vm.data.SanPhamCty = '';
        }
    });
})();