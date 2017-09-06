(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoXuatNhapTonFilterCtrl', KhoXuatNhapTonFilterCtrl);


    function KhoXuatNhapTonFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoXuatNhapTonFilterCtrl';

        var vm = this;

        vm.title = 'KhoXuatNhapTonFilterCtrl';

        vm.data = {

            ngayTu: moment().format("01/MM/YYYY"),
            ngayDen: moment().daysInMonth() + moment().format("/MM/YYYY"),
            listKhoKhoHang: [],
            searchString: ''
        };

        vm.action = {
            clearListKhoKhoHang: clearListKhoKhoHang,
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
            vm.data.ngayTu = moment().format("01/MM/YYYY"),
            vm.data.ngayDen = moment().daysInMonth() + moment().format("/MM/YYYY");
            clearListKhoKhoHang();
        }

        function clearListKhoKhoHang() {
            utility.clearArray(vm.data.listKhoKhoHang);
        }
        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    list.push(array[i][property]);
                }

                result = list.join(',');
            } else result = result || '';

            return result;
        }
        function search() {

            var datefrom = moment(vm.data.ngayTu);
            var dateto = moment(vm.data.ngayDen);
            if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }

            var KhoHangId = joinStr(vm.data.listKhoKhoHang, "KhoHangId");

            var data = {
                ngayTu: vm.data.ngayTu,
                ngayDen: vm.data.ngayDen,
                khoHangId : KhoHangId,
                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            //F8
            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });

            $scope.$on(controllerId + '.data.listKhoHang', function (event, data) {
                vm.data.listKhoKhoHang = data.listKhoHang;
            });

        }
    }
})();
