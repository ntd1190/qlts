(function () {
    'use strict';

    var module = angular.module('app');
        //.controller('ThongTinNhanVienEditCtrl', controller);

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'thongTinNhanVienEdit',
            url: '/nhanvien/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: thongTinNhanVienEdit
        });
    });

    function thongTinNhanVienEdit($stateParams, SETTING, $scope, utility, NhanVienEditService, $window, $q) {
        var vm = this;
        var nhanVienId = 0;
        var listQuyenTacVu = [];
        var linkUrl = '';

        vm.controllerId = 'ThongTinNhanVienEditCtrl';

        vm.data = {
            nhanVien: {},
            dangLamViec: true,
        };
        vm.status = {
            isLoading: false,
            isEdit: false,
            errorMessage: '',
            infoMessage: ''
        }
        vm.action = {

        }

        /***************************************************
         * INIT FUNCTION
         */

        vm.onInitView = function (config) {
            config = config || {};

            nhanVienId = $stateParams.id;
            listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            getThongTin(nhanVienId);
            initEventListener();
        };
        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'nhanvien/showView?viewName=edit';
        }
        vm.action.goBack = function () {
            window.history.back();
        };
        activate();
        function activate() { }

        /**************************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

        function initEventListener() {
            
        }

        /***************************
         * ACTION FUNCTION
         */

       

        /*******************************
         * BIZ FUNCTION
         */

        /* kiểm tra quyền tác vụ */
        function checkQuyenTacVu(quyen) {
            console.log(quyen + ':' + (listQuyenTacVu.indexOf(quyen) >= 0));
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        

        /*  xử lý dữ liệu trước khi gọi api */
        function prepareThongTinNhanVien() {
            vm.data.nhanVien.MaTrangThai = vm.data.dangLamViec ? 'NV_DL' : 'NV_NL';
        }

        /* xử lý dữ liệu sau khi gọi api */
        function fixThongTinNhanVien() {
            vm.data.nhanVien.NgaySinh = utility.convertDateFormat(vm.data.nhanVien.NgaySinh, 'YYYY-MM-DD', 'DD/MM/YYYY');
            vm.data.nhanVien.NgayCap = utility.convertDateFormat(vm.data.nhanVien.NgayCap, 'YYYY-MM-DD', 'DD/MM/YYYY');
            vm.data.nhanVien.NgayTuyenDung = utility.convertDateFormat(vm.data.nhanVien.NgayTuyenDung, 'YYYY-MM-DD', 'DD/MM/YYYY');

            vm.data.dangLamViec = vm.data.nhanVien.MaTrangThai == 'NV_DL';
        }

        /******************************
         * API FUNCTION
         */
      
        function getThongTin(id) {
            message('info', 'Đang tải thông tin nhân viên ...');

            NhanVienEditService.getThongTin(id).then(function (result) {
                message('', '');
                if (result.data && result.data.data && result.data.data.length) {
                    vm.data.nhanVien = result.data.data[0];
                    fixThongTinNhanVien();
                } else {
                    message('error', 'Không tìm thấy nhân viên');
                }
            }, function (result) {
                message('', '');
            });
        }



        /******************************
         * HELPERS FUNCTION
         */

        function message(type, message) {
            vm.status.infoMessage = '';
            vm.status.errorMessage = '';

            switch (type) {
                case 'info':
                    vm.status.infoMessage = message;
                    break;
                case 'error':
                    vm.status.errorMessage = message;
                    break;
                default:
                    break;
            }
        }
    }
})();