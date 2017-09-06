(function () {
    'use strict';

    angular
        .module('app')
        .controller('BangLuongFilterCtrl', BangLuongFilterCtrl);


    function BangLuongFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'BangLuongFilterCtrl';

        var vm = this;

        vm.title = 'BangLuongFilterCtrl';

        vm.data = {
           
            ngayTu: '01/01/' + moment().format('YYYY'),
            ngayDen: '31/12/' + moment().format('YYYY'),

            tanSuat: {
                tatCa: true,
                hangThang: false,
                hangQuy: false,
                hangNam: false
            },

            trangThai : {
                tatCa : true,
                kiemNghiem: false,
                hoanThien: false,
            },

            searchString: ''
        };

        vm.action = {
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
            checkTanSuat: checkTanSuat,
            checkTanSuatTatCa: checkTanSuatTatCa,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
        }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }

            initEventListener();
        }

        function reset() {
            vm.data.searchString = '';
            vm.data.ngayTu = '01/01/' + moment().format('YYYY'),
            vm.data.ngayDen = '31/12/' + moment().format('YYYY'),
            checkTanSuatTatCa(true);
        }

        // Xu ly check box trang thai
        function checkTrangThaiTatCa(status) {
            if (status) {
                vm.data.trangThai.tatCa = true;
            }

            if (vm.data.trangThai.tatCa == true)
            {
                vm.data.trangThai.kiemNghiem = false;
                vm.data.trangThai.hoanThien = false;
            }
            else {
                vm.data.trangThai.kiemNghiem = true;
            }
        }

        function checkTrangThai() {

            if (vm.data.trangThai.kiemNghiem != true
                && vm.data.trangThai.hoanThien != true) {

                vm.data.trangThai.tatCa = true;
            }
            else {
                vm.data.trangThai.tatCa = false;
            }
        }
        // end Xu ly check box trang thai

        // Xu ly check box
        function checkTanSuatTatCa(status) {
            if (status) {
                vm.data.tanSuat.tatCa = true;
            }

            if (vm.data.tanSuat.tatCa == true) {
                vm.data.tanSuat.hangThang = false;
                vm.data.tanSuat.hangQuy = false;
                vm.data.tanSuat.hangNam = false;
            }
            else {
                vm.data.tanSuat.hangThang = true;
            }
        }

        function checkTanSuat() {

            if (vm.data.tanSuat.hangThang != true
                && vm.data.tanSuat.hangQuy != true
                && vm.data.tanSuat.hangNam != true) {

                vm.data.tanSuat.tatCa = true;
            }
            else {
                vm.data.tanSuat.tatCa = false;
            }
        }
        // end Xu ly check box 

        function search() {

            var datefrom = moment(vm.data.ngayTu);
            var dateto = moment(vm.data.ngayDen);
            if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }

            var listTanSuat = new Array();

            if (vm.data.tanSuat.tatCa == true) {
                listTanSuat.push({ TanSuat: "ALL" });
            }
            else {
                if (vm.data.tanSuat.hangThang) listTanSuat.push({ TanSuat: "THANG" });
                if (vm.data.tanSuat.hangQuy) listTanSuat.push({ TanSuat: "QUY" });
                if (vm.data.tanSuat.hangNam) listTanSuat.push({ TanSuat: "NAM" });
            }

            var data = {
                listTanSuat: listTanSuat,
                ngayTu: vm.data.ngayTu,
                ngayDen: vm.data.ngayDen,

                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
