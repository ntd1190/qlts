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
            KhoKiemKeFilter: 'KhoKiemKeFilterCtrl',
            KhoKiemKeList: 'KhoKiemKeListCtrl',
            KhoKiemKeEdit: 'KhoKiemKeEditCtrl',
            KhoHangListPopup: 'KhoHangListPopup',


            KhoHangListPopupEdit: 'KhoHangListPopupEdit',



        }

        vm.onInitView = function (config) {
            catchTuyChonCotPopupEvent();
            catchKhoHangPopupSearchEvent();
            catchKhoKiemKeFilterEvent();

            catchKhoHangEditPopupSearchEvent();
        }

        activate();

        function activate() {
        }

        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
                $rootScope.$broadcast('KhoKiemKeListCtrl.action.refresh');
            });
            
            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
        function catchKhoHangPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoKiemKeFilter + '.data.listKhoHang', data);
                $('#KhoHangListPopup').collapse('hide');
            });
        }

        function catchKhoKiemKeFilterEvent() {
            $scope.$on(vm.controllerId.KhoKiemKeFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoKiemKeList + '.action.get-filters', data);
            });

        }

        function catchKhoHangEditPopupSearchEvent() {
            $scope.$on(vm.controllerId.KhoHangListPopupEdit + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoKiemKeEdit + '.data.listKhoHang', data);
                $('#KhoHangListPopupEdit').collapse('hide');
            });
            $('#KhoHangListPopupEdit').on('shown.bs.collapse', function () {
                $("#txtsearchString").focus();
            });
        }


    }
})();
