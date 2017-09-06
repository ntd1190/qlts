/*****************************************************************************
1. Create Date : 2017.05.25
2. Creator     : Nguyen Thanh Binh
3. Description : javascript quản lý hợp đồng
4. History     : 2017.05.25 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    angular.module('app')
        .controller('QuanLyHopDongListCtrl', controller);
    function controller($scope, QuanLyHopDongService, utility) {
        /*********************************
         * PRIVATE
         */

        var vm = this;
        var userInfo;
        var nhanVienId = 0;
        var listQuyenTacVu = [];
        var _tableState;
        var caller;

        /************************************
         * VIEW MODEL
         */

        vm.controllerId = 'QuanLyHopDongListCtrl';

        vm.status = {
            isLoading: false,
        };

        vm.data = {
            listHopDong: [],
        };

        /***************************************************
         * INIT FUNCTION
         */

        (function activate() {
        })();

        vm.onInitView = function (config) {
            console.log(config);
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                userInfo = config.userInfo;
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }

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
        }

        /**************************************************
         * EMIT / BROADCAST / ON EVENT FUNCTION
         */

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                getListByNhanVienId(nhanVienId);
            });
        }

        /*******************************************************
         * ACTION FUNCTION
         */

        vm.action = {
            convertDateFormat: utility.convertDateFormat,

            editHopDong: function (hopdong) {

                var data = {
                    nhanVienId : nhanVienId
                };

                if (hopdong) {
                    data.hopdong = utility.clone(hopdong);
                }

                $scope.$emit(vm.controllerId + '.action.editHopDong', data);
                console.log(data);
            },

        };

        /*******************************************
         * BIZ FUNCTION
         */

        /******************************************
         * CALL API FUNCTION
         */

        function getListByNhanVienId(id) {
            vm.status.isLoading = true;
            var data = { nhanVienId: nhanVienId };

            QuanLyHopDongService
                .getListByNhanVienId(data)
                .then(function (result) {
                    console.log(result);

                    if (result.data && result.data.data) {
                        delete vm.data.listHopDong;
                        vm.data.listHopDong = result.data.data;
                    }
                    vm.status.isLoading = false;
                }, function (result) {
                    console.log(result);
                    vm.status.isLoading = false;
                });
        }

        /******************************************
         * HELPERS FUNCTION
         */
    };
})();