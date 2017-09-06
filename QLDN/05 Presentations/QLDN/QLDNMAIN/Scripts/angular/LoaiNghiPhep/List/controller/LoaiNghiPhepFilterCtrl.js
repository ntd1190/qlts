(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoaiNghiPhepFilterCtrl', LoaiNghiPhepFilterCtrl);


    function LoaiNghiPhepFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'LoaiNghiPhepFilterCtrl';

        var vm = this;

        vm.title = 'LoaiNghiPhepFilterCtrl';

        vm.data = {
            //listLoaiNghiPhep: [],
            //listNguoiDuyet: [],

            //ngayTu: moment().format("01/MM/YYYY"),
            //ngayDen: moment().daysInMonth() + moment().format("/MM/YYYY"),

            //trangThai: {
            //    tatCa: true,
            //    doiDuyet: false,
            //    dongY: false,
            //    tuChoi: false
            //},

            searchString: ''
        };

        vm.action = {
            //clearListLoaiNghiPhep: clearListLoaiNghiPhep,
            //clearListNguoiDuyet: clearListNguoiDuyet,
            //checkTrangThai: checkTrangThai,
            //checkTrangThaiTatCa: checkTrangThaiTatCa,
            //reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
        }

        function onInitView(config) {
            debugger;
            if (config && config.controllerId)
                controllerId = config.controllerId;
            initEventListener();
        }

        function search() {
            debugger;

            var data = {

                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);  // call to main
        }

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.data.listLoaiNghiPhep', function (event, data) {
                vm.data.listLoaiNghiPhep = data;
            });

            //$scope.$on(controllerId + '.data.listNguoiDuyet', function (event, data) {
            //    vm.data.listNguoiDuyet = data;
            //});

            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
