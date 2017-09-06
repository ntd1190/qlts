(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('QuanHeGiaDinhListCtrl', function ($scope, utility, QuanHeGiaDinhService) {

        /*** PRIVATE ***/

        var service = QuanHeGiaDinhService;
        var vm = this;
        var nhanVienId = 0;
        var userInfo;

        /*** VIEW MODEL ***/

        vm.title = 'Trình độ học vấn';
        vm.controllerId = 'QuanHeGiaDinhListCtrl';
        vm.status = {};
        vm.error = {};

        vm.data = {};
        vm.data.list = [];

        /*** INIT FUNCTION ***/

        activate();
        function activate() { }

        vm.onInitView = function (config) {
            console.log(config);
            if (config === undefined) { return; }
            nhanVienId = config.nhanVienId || nhanVienId;
            userInfo = config.userInfo || userInfo;
            vm.controllerId = config.controllerId || vm.controllerId;
            initEventListener();
            getPage(nhanVienId);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        vm.action.edit = function (row) {
            var data = { QuanHeGiaDinh: row };
            emitEdit(data);
        }
        vm.action.create = function () {
            var data = { NhanVienId: nhanVienId };
            emitCreate(data);
        }

        /*** BROADCAST / EMIT / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.refresh', function (e, v) {
                refresh();
            });

        }

        function emitEdit(data) {
            console.log(vm.controllerId + '.action.edit');
            $scope.$emit(vm.controllerId + '.action.edit', data);
        }
        function emitCreate(data) {
            console.log(vm.controllerId + '.action.create');
            $scope.$emit(vm.controllerId + '.action.create', data);
        }

        /*** BIZ FUNCTION ***/

        /* kiểm tra quyền tác vụ */
        function checkQuyenUI(quyen) {
            var lisQuyenTacVu;

            // kiểm tra danh sách quyền # null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var lisQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            return lisQuyenTacVu.indexOf(quyen) >= 0;
        }

        function refresh() {
            getPage(nhanVienId);
        }

        /*** API FUNCTION ***/

        function getPage(nhanVienId) {
            vm.status.isLoading = true;

            var data = {};
            data.nhanVienId = nhanVienId;
            data.sortName = 'QHGD.NgaySinh';
            data.sortDir = 'ASC';

            service.getPage(data).then(function (result) {
                console.log(result);
                delete vm.data.list;
                if (result && result.data && result.data.data) {
                    vm.data.list = result.data.data;
                } else {
                    vm.data.list = [];
                }
                vm.status.isLoading = false;
            }, function (result) {
                console.log(result);
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);
                }
                vm.status.isLoading = false;
            });
        }

        /*** HELPER FUNCTION ***/

    });
})();