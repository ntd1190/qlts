(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoXuatNhapTonFilterCtrl', KhoXuatNhapTonFilterCtrl);


    function KhoXuatNhapTonFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        debugger;
        var controllerId = 'KhoXuatNhapTonFilterCtrl';
        var vm = this;
        vm.title = 'KhoXuatNhapTonFilterCtrl';
        vm.data = {
            ngayTu: moment().format("01/MM/YYYY"),
            ngayDen: moment().daysInMonth() + moment().format("/MM/YYYY"),
            listKhoKhoHang: [],
            listKhoNhomHangHoa: [],
            searchString: ''
        };

        vm.action = {
            clearListKhoKhoHang: clearListKhoKhoHang,
            ClearlistKhoNhomHangHoa: ClearlistKhoNhomHangHoa,
            reset: reset,
            search: search,
            apDung: apDung
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
            ClearlistKhoNhomHangHoa();
        }

        function clearListKhoKhoHang() {
            utility.clearArray(vm.data.listKhoKhoHang);
        }
        function ClearlistKhoNhomHangHoa() {
            utility.clearArray(vm.data.listKhoNhomHangHoa);
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
            var NhomHangHoaId = joinStr(vm.data.listKhoNhomHangHoa, "NhomHangHoaId");

            var data = {
                ngayTu: vm.data.ngayTu,
                ngayDen: vm.data.ngayDen,
                khoHangId: KhoHangId,
                NhomHangHoaId:NhomHangHoaId,
                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            //F8
            debugger
            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });

            $scope.$on(controllerId + '.data.listKhoHang', function (event, data) {
                vm.data.listKhoKhoHang = data.listKhoHang;
            });

            $scope.$on(controllerId + '.data.listNhomHangHoa', function (event, data) {                
                //console.log(data);
                vm.data.listKhoNhomHangHoa = data;
            });
        }

        function apDung() {
            debugger
            var selectedListKhoHangHoa = new Array();
            for (var i = 0; i < vm.data.listKhoHangHoa.length; i++) {
                if (vm.data.listKhoHangHoa[i].isSelected) {
                    selectedListKhoHangHoa.push(vm.data.listKhoHangHoa[i]);
                }
            }
            emitApDung(selectedListKhoHangHoa);
        }
        function emitApDung(data) {
            debugger
            $scope.$emit(controllerId + '.action.ap-dung', data);
        }

    }
})();
