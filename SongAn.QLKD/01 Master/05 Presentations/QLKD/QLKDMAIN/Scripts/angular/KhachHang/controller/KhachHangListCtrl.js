(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'khachHangList',
            url: '/khachhang/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: khachHangListCtrl
        });
    });

    function khachHangListCtrl($stateParams, SETTING, $scope, KhachHangService, utility, $q, $window) {
        var userInfo, _tableState;
        var KhachHangId = 0;

        var vm = this;

        vm.status = {};
        vm.status.openTuyChonCotPopup = false;
        vm.data = {};
        vm.data.listKhachHang = [];
        vm.data.objKhachHang = {};
        vm.data.listCot = [];

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            console.log(config);
            config = config || {};
            userInfo = config.userInfo || {};

            vm.status.isOpenPopup = false;

            initEventListener();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'KhachHang/showView?viewName=list';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {
                   
                }
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.status.isOpenPopup && checkQuyenUI('N')) {
                    
                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            }
        };

        function initEventListener() {
           
        }

        /* ACTION FUNCTION */

        vm.action = {};
 

        /* BIZ FUNCTION */

        /* API FUNCTION */

    

      

      

    }
})();