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
            listNhanVien: [],
            listPhongBan: [],
        };

        vm.action = {
            clearListNhanVien: clearListNhanVien,
            clearListPhongBan: clearListPhongBan,
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

        function search() {
            var data = {
                listNhanVien: utility.clone(vm.data.listNhanVien),
                listPhongBan: utility.clone(vm.data.listPhongBan)
            };
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

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.data.listNhanVien', function (event, data) {
                vm.data.listNhanVien = data;
            });

            $scope.$on(controllerId + '.data.listPhongBan', function (event, data) {
                vm.data.listPhongBan = data;
            });
        }
    }
})();
