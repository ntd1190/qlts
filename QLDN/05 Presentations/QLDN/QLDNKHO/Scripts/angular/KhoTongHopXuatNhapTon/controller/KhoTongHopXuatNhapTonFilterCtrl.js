(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('TongHopXuatNhapTonFilterCtrl', function ($scope, utility) {
        /*** PRIVATE ***/

        var vm = this;

        // HOT-KEY
        vm.keys = {
            //press F8 -> search
            F8: function (name, code) {
                search();
            }
        };

        vm.controllerId = 'TongHopXuatNhapTonFilterCtrl';

        vm.title = 'TongHopXuatNhapTonFilterCtrl';

        vm.data = {
            listKhoHang: [],
            listHangHoa: [],
            startDate: '',
            endDate: '',
            chiTietKho: false,
        };

        /** BROADCAST / EMIT / ON FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.F8', function (event, data) {
                console.log(data);
                vm.action.search();
            });
            $scope.$on(vm.controllerId + '.data.listKhoHang', function (event, data) {
                console.log(data);
                vm.data.listKhoHang = data.listKhoHang;
            });
            $scope.$on(vm.controllerId + '.data.listHangHoa', function (event, data) {
                console.log(data);
                vm.data.listHangHoa = data;
            });

        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.clearListKhoHang = function () {
            delete vm.data.listKhoHang;
            vm.data.listKhoHang = [];
        };

        vm.action.ClearlistHangHoa = function () {
            delete vm.data.listHangHoa;
            vm.data.listHangHoa = [];
        };

        vm.action.search = function () {
            var data = {};
            data.listHangHoa = utility.clone(vm.data.listHangHoa);
            data.listKhoHang = utility.clone(vm.data.listKhoHang);
            data.startDate = vm.data.startDate;
            data.endDate = vm.data.endDate;
            data.chiTietKho = vm.data.chiTietKho;
            $scope.$emit(vm.controllerId + '.action.search', data);
        };

        vm.action.reset = function () {
            delete vm.data.listKhoHang;
            vm.data.listKhoHang = [];

            delete vm.data.listHangHoa;
            vm.data.listHangHoa = [];

            vm.data.startDate = moment().startOf('month').format("DD/MM/YYYY");
            vm.data.endDate = moment().endOf('month').format("DD/MM/YYYY");
            vm.data.chiTietKho = false;
        };

        vm.action.openHangHoaPopup = function () {
            $scope.$emit(vm.controllerId + '.action.openHangHoaPopup', '');
        };
        vm.action.openKhoHangPopup = function () {
            $scope.$emit(vm.controllerId + '.action.openKhoHangPopup', '');
        };

        /*** BIZ FUNCTION ***/

        /*** INIT FUNCTION ***/

        (function activate() {
            vm.action.reset();
        })();

        vm.onInitView = function (config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        }

    });
})();
