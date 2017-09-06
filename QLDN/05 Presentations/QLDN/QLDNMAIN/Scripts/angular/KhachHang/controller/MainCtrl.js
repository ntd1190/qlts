(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;
        vm.data = {};

        vm.controllerId = {
            TuyChonCotPopup: 'TuyChonCotPopup',
            KhachHangFilter: 'KhachHangFilterCtrl',
            KhachHangList: 'KhachHangListCtrl',
            KhachHangEdit: 'KhachHangEditCtrl',
            TinhListPopup: 'TinhListPopup',
            TinhListPopupEdit: 'TinhListPopupEdit',
            HuyenListPopupEdit: 'HuyenListPopupEdit',
            PhuongXaListPopupEdit: 'PhuongXaListPopupEdit'
        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchKhachHangListPopupEvent();
            catchTinhListPopupEvent();
            catchKhachHangFilterEvent();
            catchTinhListPopupEditEvent();
            catchHuyenListPopupEditEvent();
            catchPhuongXaListPopupEditEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('KhachHangListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }

        function catchKhachHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhachHangList + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhachHangFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }
 
        function catchTinhListPopupEvent() {
            $scope.$on(vm.controllerId.TinhListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhachHangFilter + '.data.listTinh', data);
                $('#TinhListPopup').collapse('hide');
            });
        }
        function catchKhachHangFilterEvent() {
            $scope.$on(vm.controllerId.KhachHangFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhachHangList + '.action.get-filters', data);
            });

        }

        function catchTinhListPopupEditEvent() {
            $scope.$on(vm.controllerId.TinhListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhachHangEdit + '.data.listTinhEdit', data);
                $('#TinhListPopupEdit').collapse('hide');
            });
        }
        function catchHuyenListPopupEditEvent() {
            $scope.$on(vm.controllerId.HuyenListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhachHangEdit + '.data.listHuyenEdit', data);
                $('#HuyenListPopupEdit').collapse('hide');
            });
        }
        function catchPhuongXaListPopupEditEvent() {
            $scope.$on(vm.controllerId.PhuongXaListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhachHangEdit + '.data.listPhuongXaEdit', data);
                $('#PhuongXaListPopupEdit').collapse('hide');

            });
        }
    }
})();
