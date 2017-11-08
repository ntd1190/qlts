(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChucVuFilterCtrl', ChucVuFilterCtrl);


    function ChucVuFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'ChucVuFilterCtrl';

        var vm = this;

        vm.title = 'ChucVuFilterCtrl';

        vm.data = {
            //listChucVu: [],
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
            //clearListChucVu: clearListChucVu,
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
            if (config && config.controllerId)
                controllerId = config.controllerId;
            initEventListener();
        }

        function search() {
            var data = {
                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);  // call to main
        }

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.data.listChucVu', function (event, data) {
                vm.data.listChucVu = data;
            });
         
            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
