(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuaTrinhCongTacListCtrl', controller);

    function controller($scope, utility, QuaTrinhCongTacService) {

        /*********************************
         * PRIVATE
         */

        var debug = false;
        var isEdit = false;
        var nhanVienId = 0;
        var luongPhucap = 0;
        var vm = this;

        /******************************
         * VIEW MODEL
         */

        vm.onInitView = onInitView;
        vm.controllerId = 'QuaTrinhCongTacListCtrl';

        vm.status = {
            isLoading: '',
            infoMessage: '',
            errorMessage: '',
        };

        vm.data = {
            listQTCT: []
        };

        vm.action = {
            convertDateFormat: utility.convertDateFormat,
            editChiTiet: editChiTiet,
        }

        /***************************************
         * INIT FUNCTION
         */

        function onInitView(config) {
            if (config && config.nhanVienId > 0) {
                nhanVienId = config.nhanVienId;
                getListByNhanVienId(nhanVienId);
            } else {
                nhanVienId = 0;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            initEventListener();
        };

        (function activate() { })();

        /***************************************
         * ACTION FUNCTION
         */

        /***************************************
         * BROADCAST / EMIT / ON FUNCTION
         */

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                getListByNhanVienId(nhanVienId);
            });
        }

        function editChiTiet(chitiet) {
            var data = {
                nhanVienId: nhanVienId,
            };
            if (chitiet) {
                data.chiTiet = utility.clone(chitiet);
            } else {

            }

            $scope.$emit(vm.controllerId + '.action.xemChiTiet', data);
        }
        /*************************************
         * BIZ FUNCTION
         */

        /************************************
         * API FUNCTION
         */

        function getListByNhanVienId(nhanVienId) {
            vm.status.isLoading = true;
            message('info', 'Đang tải quá trình công tác ...');
            var data = { nhanVienId: nhanVienId };

            QuaTrinhCongTacService
                .getListByNhanVienId(data)
                .then(function (result) {
                    log(result);
                    message('', '');

                    if (result.data && result.data.data && result.data.data.length > 0) {
                        delete vm.data.listQTCT;
                        vm.data.listQTCT = result.data.data;
                    }
                    vm.status.isLoading = false;
                }, function (result) {
                    log(result);
                    message('error', 'Không thể tải quá trình công tác.');
                    vm.status.isLoading = false;
                });
        }

        /*************************************
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

        function log(msg) {
            if (debug) { console.log(msg); }
        }
    };
})();