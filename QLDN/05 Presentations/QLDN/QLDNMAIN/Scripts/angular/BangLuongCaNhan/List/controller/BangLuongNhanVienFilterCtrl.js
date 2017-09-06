(function () {
    'use strict';

    angular
        .module('app')
        .controller('BangLuongNhanVienFilterCtrl', BangLuongNhanVienFilterCtrl);


    function BangLuongNhanVienFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'BangLuongNhanVienFilterCtrl';

        var vm = this;

        vm.title = 'BangLuongNhanVienFilterCtrl';

        vm.data = {
            searchString: '',
            ngayTuyenDungFrom: '',
            ngayTuyenDungTo: '',
            listBangLuongNhanVien: [],
            listPhongBan: [],
            listDuAn: [],
            listChucVu: [],
            dangLamViec: true,
        };

        vm.action = {
            clearListBangLuongNhanVien: clearListBangLuongNhanVien,
            clearListPhongBan: clearListPhongBan,
            clearListDuAn: clearListDuAn,
            clearListChucVu: clearListChucVu,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.dangLamViec = true;
            vm.data.searchString = '';
            vm.data.ngayTuyenDungFrom = '';
            vm.data.ngayTuyenDungTo = '';
            vm.data.listBangLuongNhanVien = [];
            vm.data.listPhongBan = [];
            vm.data.listDuAn = [];
            vm.data.listChucVu = [];
        }

        function search() {
            debugger
            var data = {
                searchString: utility.clone(vm.data.searchString),
                ngayTuyenDungFrom: utility.clone(vm.data.ngayTuyenDungFrom),
                ngayTuyenDungTo: utility.clone(vm.data.ngayTuyenDungTo),
                listBangLuongNhanVien: vm.data.listBangLuongNhanVien,
                listPhongBan: utility.clone(vm.data.listPhongBan),
                dangLamViec: utility.clone(vm.data.dangLamViec),
            };
            console.log(data);
            $rootScope.$broadcast(controllerId + '.action.filters', data);
        }

        /* NHÂN VIÊN */
        function clearListBangLuongNhanVien() {
            utility.clearArray(vm.data.listBangLuongNhanVien);
        }

        /* PHÒNG BAN */
        function clearListPhongBan() {
            utility.clearArray(vm.data.listPhongBan);
        }

        function clearListDuAn() {
            utility.clearArray(vm.data.listDuAn);
        }

        function clearListChucVu() {
            utility.clearArray(vm.data.listChucVu);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.data.listBangLuongNhanVien', function (event, data) {
                vm.data.listBangLuongNhanVien = data;
            });

            $scope.$on(controllerId + '.data.listPhongBan', function (event, data) {
                vm.data.listPhongBan = data;
            });

            $scope.$on(controllerId + '.data.listDuAn', function (event, data) {
                vm.data.listDuAn = data;
            });

            $scope.$on(controllerId + '.data.listChucVu', function (event, data) {
                vm.data.listChucVu = data;
            });

            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                search()
            });
        }
    }
})();
