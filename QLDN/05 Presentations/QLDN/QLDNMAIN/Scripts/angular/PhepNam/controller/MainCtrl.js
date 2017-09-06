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
            ChamCongFilter: 'PhepNamFilterCtrl',
            ChamCongList: 'PhepNamListCtrl',
            NhanVienListPopupSearch: 'NhanVienListPopupSearch',
            PhongBanListPopup: 'PhongBanListPopup',
            ChiNhanhListPopup: 'ChiNhanhListPopup'
        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchChamCongListPopupEvent();
            catchChamCongFilterEvent();
            catchPhongBanListPopupEvent();
            catchNhanVienListPopupSearchEvent();
            ChiNhanhListPopupEvent();
        }

        activate();

        function activate() {
        }

        
        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('ChamCongListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchPhongBanListPopupEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.ChamCongFilter + '.data.listPhongBan', data);
                $('#PhongBanListPopup').collapse('hide');
            });
        }
        function ChiNhanhListPopupEvent() {
            $scope.$on(vm.controllerId.ChiNhanhListPopup + '.action.ap-dung', function (event, data) {
                console.log(data);
                $rootScope.$broadcast(vm.controllerId.ChamCongFilter + '.data.listChiNhanh', data);
                $('#' + vm.controllerId.ChiNhanhListPopup).collapse('hide');
            });
        }
        function catchNhanVienListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopupSearch + '.action.ap-dung', function (event, data) {
                console.log(data);
                $rootScope.$broadcast(vm.controllerId.ChamCongFilter + '.data.listNhanVienSearch', data);
                $('#NhanVienListPopupSearch').collapse('hide');
            });
            $('#NhanVienListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchChamCongListPopupEvent() {
            $scope.$on(vm.controllerId.ChamCongList + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.ChamCongFilter + '.data.listChamCong', data);
                $('#ChamCongListPopup').collapse('hide');
            });
        }
        function catchChamCongFilterEvent() {
            $scope.$on(vm.controllerId.ChamCongFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.ChamCongList + '.action.get-filters', data);
            });

        }
    }
})();
