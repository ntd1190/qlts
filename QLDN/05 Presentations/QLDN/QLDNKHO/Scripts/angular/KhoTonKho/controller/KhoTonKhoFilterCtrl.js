(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoTonKhoFilterCtrl', KhoTonKhoFilterCtrl);


    function KhoTonKhoFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoTonKhoFilterCtrl';

        var vm = this;

        vm.title = 'KhoTonKhoFilterCtrl';

        vm.data = {

            ngayTu: '01/01/' + moment().format('YYYY'),
            ngayDen: '31/12/' + moment().format('YYYY'),
            khoHangId: ''
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
            vm.data.ngayTu = '01/01/' + moment().format('YYYY'),
            vm.data.ngayDen = '31/12/' + moment().format('YYYY');
            vm.data.listKhoKhoHang = [];
        }

        function clearListKhoKhoHang() {
            utility.clearArray(vm.data.listKhoKhoHang);
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
                khoHangId : KhoHangId
            };

            $scope.$emit(controllerId + '.action.filters', data);
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

        /* EVENT LISTENER */
        function initEventListener() {
            //F8
            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });

            $scope.$on(controllerId + '.data.listKhoKhoHang', function (event, data) {
                vm.data.listKhoKhoHang = data.listKhoHang;
            });
        }
    }
})();
