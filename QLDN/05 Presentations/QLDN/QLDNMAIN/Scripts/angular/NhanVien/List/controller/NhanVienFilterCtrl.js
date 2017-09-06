(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienFilterCtrl', NhanVienFilterCtrl);


    function NhanVienFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'NhanVienFilterCtrl';

        var vm = this;

        vm.title = 'NhanVienFilterCtrl';

        vm.data = {
            searchString: '',
            ngayTuyenDungFrom: '',
            ngayTuyenDungTo: '',
            listNhanVien: [],
            listPhongBan: [],
            listDuAn: [],
            listChucVu: [],
            dangLamViec: true,
        };

        vm.action = {
            clearListNhanVien: clearListNhanVien,
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
            vm.data.listNhanVien = [];
            vm.data.listPhongBan = [];
            vm.data.listDuAn = [];
            vm.data.listChucVu = [];
        }

        function search() {
            var data = {
                searchString: utility.clone(vm.data.searchString),
                ngayTuyenDungFrom: utility.clone(vm.data.ngayTuyenDungFrom),
                ngayTuyenDungTo: utility.clone(vm.data.ngayTuyenDungTo),
                listNhanVien: vm.data.listNhanVien,
                listPhongBan: utility.clone(vm.data.listPhongBan),
                listDuAn: utility.clone(vm.data.listDuAn),
                listChucVu: utility.clone(vm.data.listChucVu),
                dangLamViec: utility.clone(vm.data.dangLamViec),
            };
            console.log(data);
            $rootScope.$broadcast(controllerId + '.action.filters', data);
        }

        /* NHÂN VIÊN */
        function clearListNhanVien() {
            utility.clearArray(vm.data.listNhanVien);
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
            $scope.$on(controllerId + '.data.listNhanVien', function (event, data) {
                vm.data.listNhanVien = data;
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
