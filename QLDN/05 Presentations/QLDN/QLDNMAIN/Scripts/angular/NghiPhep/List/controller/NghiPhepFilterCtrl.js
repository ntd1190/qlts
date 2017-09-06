(function () {
    'use strict';

    angular
        .module('app')
        .controller('NghiPhepFilterCtrl', NghiPhepFilterCtrl);


    function NghiPhepFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'NghiPhepFilterCtrl';

        var vm = this;

        vm.title = 'NghiPhepFilterCtrl';

        vm.data = {
            listLoaiNghiPhep: [],
            listNguoiDuyet: [],
            

            trangThai : {
                tatCa : true,
                doiDuyet: false,
                dongY: false,
                tuChoi: false
            },

            searchString: ''
        };

        vm.action = {
            clearListLoaiNghiPhep: clearListLoaiNghiPhep,
            clearListNguoiDuyet: clearListNguoiDuyet,
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
           
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.listLoaiNghiPhep = [];
            vm.data.listNguoiDuyet = [];
            vm.data.searchString = '';
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
            checkTrangThaiTatCa(true);
        }

        function checkTrangThaiTatCa(status) {
            vm.data.listTrangThai = [];

            if (status) {
                vm.data.trangThai.tatCa = true;
            }

            if (vm.data.trangThai.tatCa == true)
            {
                vm.data.trangThai.tuChoi = false;
                vm.data.trangThai.doiDuyet = false;
                vm.data.trangThai.dongY = false;
            }
            else {
                vm.data.trangThai.doiDuyet = true;
            }
        }

        function checkTrangThai() {

            if (vm.data.trangThai.tuChoi != true
                && vm.data.trangThai.doiDuyet != true
                && vm.data.trangThai.dongY != true) {

                vm.data.trangThai.tatCa = true;
            }
            else {
                vm.data.trangThai.tatCa = false;
            }
        }

        function search() {
           
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            var listTrangThai = new Array();

            if (vm.data.trangThai.tatCa == true) {
                listTrangThai.push({ MaTrangThai: "ALL" });
            }
            else {
                if (vm.data.trangThai.doiDuyet) listTrangThai.push({ MaTrangThai: "NP_DD" });
                if (vm.data.trangThai.dongY) listTrangThai.push({ MaTrangThai: "NP_DY" });
                if (vm.data.trangThai.tuChoi) listTrangThai.push({ MaTrangThai: "NP_TC" });
            }

            var data = {
                listLoaiNghiPhep: utility.clone(vm.data.listLoaiNghiPhep),
                listNguoiDuyet: utility.clone(vm.data.listNguoiDuyet),
                listTrangThai: listTrangThai,
                ngayTu:  $('#tungay').val(),
                ngayDen: $('#denngay').val(),

                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);
        }

        /* Loại Nghỉ phép */
        function clearListLoaiNghiPhep() {
            utility.clearArray(vm.data.listLoaiNghiPhep);
        }

        /* Người duyệt */
        function clearListNguoiDuyet() {
            utility.clearArray(vm.data.listNguoiDuyet);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.data.listLoaiNghiPhep', function (event, data) {
                vm.data.listLoaiNghiPhep = data;
            });

            $scope.$on(controllerId + '.data.listNguoiDuyet', function (event, data) {
                vm.data.listNguoiDuyet = data;
            });

            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
