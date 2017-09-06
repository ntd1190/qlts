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
            CongViecFilter: 'CongViecFilterCtrl',
            BaoCaoCongViecFilter:'BaoCaoCongViecFilterCtrl',
            CongViecList: 'CongViecListCtrl',
            CongViecEdit: 'CongViecEditCtrl',
            NguoiXuLyListPopupSearch: 'NguoiXuLyListPopupSearch',
            PhongBanListPopup: 'PhongBanListPopup',
            DuAnListPopup: 'DuAnListPopup',
            DuAnListPopupEdit: 'DuAnListPopupEdit',
            NguoiXuLyListPopupEdit: 'NguoiXuLyListPopupEdit'

        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchCongViecListPopupEvent();
            catchCongViecFilterEvent();
            catchDuAnListPopupEvent();
            catchNguoiXuLyListPopupSearchEvent();
            catchPhongBanListPopupSearchEvent();
            catchDuAnListPopupEditEvent();
            catchNguoiXuLyListPopupEditEvent();
        }

        activate();

        function activate() {
        }

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('CongViecListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchDuAnListPopupEvent() {
            $scope.$on(vm.controllerId.DuAnListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.CongViecFilter + '.data.listDuAn', data);
                $('#DuAnListPopup').collapse('hide');
            });

        }

        function catchNguoiXuLyListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiXuLyListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.CongViecFilter + '.data.listNguoiXuLySearch', data);
                $('#NguoiXuLyListPopupSearch').collapse('hide');
            });
            $('#NguoiXuLyListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiXuLyListPopupSearch + '.action.get-filters', { searchString: '' });
            });

            $scope.$on(vm.controllerId.NguoiXuLyListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BaoCaoCongViecFilter + '.data.listNguoiXuLySearch', data);
                $('#NguoiXuLyListPopupSearch').collapse('hide');
            });
            $('#NguoiXuLyListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiXuLyListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchPhongBanListPopupSearchEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.CongViecFilter + '.data.listPhongBanListPopupSearch', data);
                $('#PhongBanListPopup').collapse('hide');
            });
            $('#PhongBanListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.PhongBanListPopup + '.action.get-filters', { searchString: '' });
            });
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BaoCaoCongViecFilter + '.data.listPhongBanListPopupSearch', data);
                $('#PhongBanListPopup').collapse('hide');
            });
            $('#PhongBanListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.PhongBanListPopup + '.action.get-filters', { searchString: '' });
            });
        }

        function catchCongViecListPopupEvent() {
            $scope.$on(vm.controllerId.CongViecList + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.CongViecFilter + '.data.listCongViec', data);
                $('#CongViecListPopup').collapse('hide');
            });
        }
 
        function catchCongViecFilterEvent() {
            $scope.$on(vm.controllerId.CongViecFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.CongViecList + '.action.get-filters', data);
            });

        }
        function catchDuAnListPopupEditEvent() {
            $scope.$on(vm.controllerId.DuAnListPopupEdit + '.action.ap-dung', function (event, data) {
              
                $rootScope.$broadcast(vm.controllerId.CongViecEdit + '.data.listDuAn', data);
                $('#DuAnListPopupEdit').collapse('hide');
            });
            $('#DuAnListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.DuAnListPopupEdit + '.action.get-filters', { searchString: '' });
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.DuAnListPopupEdit).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.DuAnListPopupEdit + '.action.reload');
                    $('#' + vm.controllerId.DuAnListPopupEdit + ' input[autofocus]').focus();
                });
            });
        }
        function catchNguoiXuLyListPopupEditEvent() {
            $scope.$on(vm.controllerId.NguoiXuLyListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.CongViecEdit + '.data.listNguoiXuLyEdit', data);
                $('#NguoiXuLyListPopupEdit').collapse('hide');
            });
            $('#NguoiXuLyListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiXuLyListPopupEdit + '.action.get-filters', { searchString: '' });
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.NguoiXuLyListPopupEdit).on('shown.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.NguoiXuLyListPopupEdit + '.action.reload');
                    $('#' + vm.controllerId.NguoiXuLyListPopupEdit + ' input[autofocus]').focus();
                });
            });
        }



    }
})();
