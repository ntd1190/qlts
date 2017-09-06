/*****************************************************************************
1. Create Date : 2017.05.04
2. Creator     : Nguyen Thanh Binh
3. Description : javascript chức năng phiếu công tác
4. History     : 2017.05.03(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app').controller('PhieuCongTacFilterCtrl', controller);

    function controller($scope, utility, PhieuCongTacService) {
        var vm = this;

        vm.controllerId = 'PhieuCongTacFilterCtrl';
        vm.status = {
        }

        vm.data = {
            trangThaiAll: false,
            listTrangThai: [
                { MaTrangThai: 'PCT_DY', TrangThai: 'Duyệt' },
                { MaTrangThai: 'PCT_DD', TrangThai: 'Đợi' },
                { MaTrangThai: 'PCT_TC', TrangThai: 'Từ chối' },
            ],
            listNguoiDuyet: [],
            startDate: '',
            endDate: '',
        };

        vm.action = {
            search: search,
            checkAll: checkAll,
            autoCheckAll: autoCheckAll,
            thietLapLai: reset,
            clearNguoiDuyet: clearNguoiDuyet,
        };

        activate();

        function activate() {
            reset();
        }

        vm.onInitView = function (config) {
            console.log(config);
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        }
        /* check/uncheck tất cả trạng thái */
        function checkAll() {
            for (var i = 0; i < vm.data.listTrangThai.length; i++) {
                vm.data.listTrangThai[i].isSelected = vm.data.trangThaiAll;
            }
        }

        /* tự động check/unckeck vm.data.trangThaiAll */
        function autoCheckAll() {
            for (var i = 0; i < vm.data.listTrangThai.length; i++) {
                if (!vm.data.listTrangThai[i].isSelected) {
                    return false;
                }
            }
            return true;
        }
        function clearNguoiDuyet() {
            delete vm.data.listNguoiDuyet;
            vm.data.listNguoiDuyet = [];
        }
        function getListTrangThai() {
            //PhieuCongTacService.getListTrangThai('PhieuCongTac').then(function (success) {
            //    console.log(success);
            //}, function (error) {
            //    console.log(error);
            //});
        }
        function search() {
            var inputSearch = {
                listTrangThai: getSelected(vm.data.listTrangThai),
                listNguoiDuyet: utility.clone(vm.data.listNguoiDuyet),
                startDate: vm.data.startDate,
                endDate: vm.data.endDate,
            };
            $scope.$emit(vm.controllerId + '.action.search', inputSearch);
        }

        function reset() {
            clearNguoiDuyet();

            getListTrangThai();

            vm.data.startDate = moment().startOf('month').format('DD/MM/YYYY');
            vm.data.endDate = moment().endOf('month').format('DD/MM/YYYY');

            for (var i = 0 ; i < vm.data.listTrangThai.length; i++) {
                vm.data.listTrangThai[i].isSelected = false;
            }
        }
        /*************************
         * event
         */
        function initEventListener() {
            $scope.$on(vm.controllerId + '.nguoiDuyetList', function (e, v) {
                delete vm.data.listNguoiDuyet;
                vm.data.listNguoiDuyet = v || [];
            });

            $scope.$on(vm.controllerId + '.action.callSearch', function (e, v) {
                search();
            });

        }

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

    }
})();