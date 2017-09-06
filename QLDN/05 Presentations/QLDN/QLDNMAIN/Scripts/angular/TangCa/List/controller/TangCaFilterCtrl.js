(function () {
    'use strict';

    angular
        .module('app')
        .controller('TangCaFilterCtrl', TangCaFilterCtrl);


    function TangCaFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'TangCaFilterCtrl';

        var vm = this;

        vm.title = 'TangCaFilterCtrl';
        debugger;
        vm.data = {
            listNguoiDuyet: [],
            
            ngayTu: moment().format("01/MM/YYYY"),
            ngayDen: moment().daysInMonth() + moment().format("/MM/YYYY"),
            
            loaiTangCa: {
                tatCa: true,
                l150: false,
                l200: false,
                l300: false
            },

            trangThai : {
                tatCa : true,
                doiDuyet: false,
                dongY: false,
                tuChoi: false
            },

            searchString: ''
        };

        vm.action = {
            clearListNguoiDuyet: clearListNguoiDuyet,
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
            checkLoaiTangCa: checkLoaiTangCa,
            checkLoaiTangCaTatCa: checkLoaiTangCaTatCa,
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
            vm.data.listNguoiDuyet = [];
            vm.data.searchString = '';
            vm.data.ngayTu = moment().format("01/MM/YYYY");
            vm.data.ngayDen = moment().daysInMonth() + moment().format("/MM/YYYY");
            checkTrangThaiTatCa(true);
            checkLoaiTangCaTatCa(true);
        }

        // Xu ly check box trang thai
        function checkTrangThaiTatCa(status) {
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
        // end Xu ly check box trang thai

        // Xu ly check box Loai Tang Ca
        function checkLoaiTangCaTatCa(status) {
            if (status) {
                vm.data.loaiTangCa.tatCa = true;
            }

            if (vm.data.loaiTangCa.tatCa == true) {
                vm.data.loaiTangCa.l150 = false;
                vm.data.loaiTangCa.l200 = false;
                vm.data.loaiTangCa.l300 = false;
            }
            else {
                vm.data.trangThai.l150 = true;
            }
        }

        function checkLoaiTangCa() {

            if (vm.data.loaiTangCa.l150 != true
                && vm.data.loaiTangCa.l200 != true
                && vm.data.loaiTangCa.l300 != true) {

                vm.data.loaiTangCa.tatCa = true;
            }
            else {
                vm.data.loaiTangCa.tatCa = false;
            }
        }
        // end Xu ly check box Loai Tang Ca

        function search() {

            var datefrom = moment(vm.data.ngayTu);
            var dateto = moment(vm.data.ngayDen);
            if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }

            var listTrangThai = new Array();

            if (vm.data.trangThai.tatCa == true) {
                listTrangThai.push({ MaTrangThai: "ALL" });
            }
            else {
                if (vm.data.trangThai.doiDuyet) listTrangThai.push({ MaTrangThai: "TC_DD" });
                if (vm.data.trangThai.dongY) listTrangThai.push({ MaTrangThai: "TC_DY" });
                if (vm.data.trangThai.tuChoi) listTrangThai.push({ MaTrangThai: "TC_TC" });
            }

            var listLoaiTangCa = new Array();

            if (vm.data.loaiTangCa.tatCa == true) {
                listLoaiTangCa.push({ Loai: "ALL" });
            }
            else {
                if (vm.data.loaiTangCa.l150) listLoaiTangCa.push({ Loai: "l150" });
                if (vm.data.loaiTangCa.l200) listLoaiTangCa.push({ Loai: "l200" });
                if (vm.data.loaiTangCa.l300) listLoaiTangCa.push({ Loai: "l300" });
            }

            var data = {
                listNguoiDuyet: utility.clone(vm.data.listNguoiDuyet),
                listTrangThai: listTrangThai,
                listLoaiTangCa: listLoaiTangCa,
                ngayTu: vm.data.ngayTu,
                ngayDen: vm.data.ngayDen,

                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);
        }

        /* Người duyệt */
        function clearListNguoiDuyet() {
            utility.clearArray(vm.data.listNguoiDuyet);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            $scope.$on(controllerId + '.data.listNguoiDuyet', function (event, data) {
                vm.data.listNguoiDuyet = data;
            });

            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
