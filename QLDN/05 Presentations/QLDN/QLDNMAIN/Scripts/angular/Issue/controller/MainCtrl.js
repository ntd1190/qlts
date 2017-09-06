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
            IssueFilter: 'IssueFilterCtrl',
            IssueList: 'IssueListCtrl',
            IssueEdit: 'IssueEditCtrl',
            NguoiXuLyListPopupSearch: 'NguoiXuLyListPopupSearch',
            NguoiTaoListPopupSearch: 'NguoiTaoListPopupSearch',
            PhongBanListPopup: 'PhongBanListPopup',
            KhachHangListPopup: 'KhachHangListPopup',
            KhachHangListPopupEdit: 'KhachHangListPopupEdit',
            NguoiXuLyListPopupEdit: 'NguoiXuLyListPopupEdit'

        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchIssueListPopupEvent();
            catchIssueFilterEvent();
            catchKhachHangListPopupEvent();
            catchNguoiXuLyListPopupSearchEvent();
            catchNguoiTaoListPopupSearchEvent();
            catchPhongBanListPopupSearchEvent();
            catchKhachHangListPopupEditEvent();
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
                $rootScope.$broadcast('IssueListCtrl.action.refresh');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchKhachHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueFilter + '.data.listKhachHang', data);
                $('#KhachHangListPopup').collapse('hide');
            });
        }

        function catchNguoiXuLyListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiXuLyListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueFilter + '.data.listNguoiXuLySearch', data);
                $('#NguoiXuLyListPopupSearch').collapse('hide');
            });
            $('#NguoiXuLyListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiXuLyListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchNguoiTaoListPopupSearchEvent() {
            $scope.$on(vm.controllerId.NguoiTaoListPopupSearch + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueFilter + '.data.listNguoiTaoSearch', data);
                $('#NguoiTaoListPopupSearch').collapse('hide');
            });
            $('#NguoiTaoListPopupSearch').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiTaoListPopupSearch + '.action.get-filters', { searchString: '' });
            });
        }
        function catchPhongBanListPopupSearchEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueFilter + '.data.listPhongBanListPopupSearch', data);
                $('#PhongBanListPopup').collapse('hide');
            });
            $('#PhongBanListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.PhongBanListPopup + '.action.get-filters', { searchString: '' });
            });
        }

        function catchIssueListPopupEvent() {
            $scope.$on(vm.controllerId.IssueList + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueFilter + '.data.listIssue', data);
                $('#IssueListPopup').collapse('hide');
            });
        }
 
        function catchIssueFilterEvent() {
            $scope.$on(vm.controllerId.IssueFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueList + '.action.get-filters', data);
            });

        }
        function catchKhachHangListPopupEditEvent() {
            $scope.$on(vm.controllerId.KhachHangListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueEdit + '.data.listKhachHang', data);
                $('#KhachHangListPopupEdit').collapse('hide');
            });
            $('#KhachHangListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.KhachHangListPopupEdit + '.action.get-filters', '');
            });
        }
        function catchNguoiXuLyListPopupEditEvent() {
            $scope.$on(vm.controllerId.NguoiXuLyListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.IssueEdit + '.data.listNguoiXuLyEdit', data);
                $('#NguoiXuLyListPopupEdit').collapse('hide');
            });
            $('#NguoiXuLyListPopupEdit').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NguoiXuLyListPopupEdit + '.action.get-filters', { searchString: '' });
            });
            $(document).ready(function () {
                $('#' + vm.controllerId.NguoiXuLyListPopupEdit).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId.NguoiXuLyListPopupEdit + ' input[autofocus]').focus();
                });
            });
        }

    }
})();
