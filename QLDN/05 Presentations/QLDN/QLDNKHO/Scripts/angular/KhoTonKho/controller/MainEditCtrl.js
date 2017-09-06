(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('MainEditCtrl', function ($scope, $rootScope) {
        /*** PRIVATE ***/

        var vm = this;
        $rootScope.isOpenPopup = false;

        /*** VIEW MODEL ***/

        vm.controllerId = {
            KhoTonKhoEditCtrl: 'KhoTonKhoEditCtrl',
            KhoTonKhoSaveCtrl: 'KhoTonKhoSaveCtrl'
        };

        /*** HOT-KEY ***/
        vm.keys = {
            ESC: function (name, code) {
                //alert("Nghi Phep List ESC");
                if ($rootScope.isOpenPopup) {
                    $('#KhoTonKhoSavePopup').collapse("hide");
                    $rootScope.isOpenPopup = false;
                }
            },
            F3: function (name, code) {
                console.log('main.F3');

            },
            //press F2 -> open popup
            F2: function (name, code) {
                if (!$rootScope.isOpenPopup) {

                    // phai check quyen New
                    $rootScope.$broadcast(vm.controllerId.KhoTonKhoEditCtrl + '.action.callOpenAddPopup', 0);

                }
            },
            //press F8 -> search
            F8: function (name, code) {
                $rootScope.$broadcast(vm.controllerId.KhoTonKhoSaveCtrl + '.action.callSave', 0);

            },
            //press ESC -> close popup
            ESC: function (name, code) {
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            }
        };

        /*** INIT FUNCTION ***/
        activate();

        function activate() {
            KhoTonKhoEditCtrlEvent();
            catchAddHangHoaTonDauListEvent();
            catchSaveHangHoaTonDauPopupEvent();
            catchCloseSavePopupEvent();
        }

        // nhận cấu hình từ giao diện
        function onInitView(config) {

        }

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        function KhoTonKhoEditCtrlEvent() {
        }

        function catchAddHangHoaTonDauListEvent() {
            $scope.$on(vm.controllerId.KhoTonKhoEditCtrl + '.action.addHangHoaTonDau', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoTonKhoSaveCtrl + '.action.addHangHoaTonDau', data);
                $rootScope.isOpenPopup = true;
                $('#KhoTonKhoSavePopup').collapse('show');
            });
        }

        function catchSaveHangHoaTonDauPopupEvent() {
            $scope.$on(vm.controllerId.KhoTonKhoSaveCtrl + '.action.save', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoTonKhoEditCtrl + '.action.getPage');
                $rootScope.isOpenPopup = false;
                $('#KhoTonKhoSavePopup').collapse('hide');
            });

        }

        function catchCloseSavePopupEvent() {
            $scope.$on(vm.controllerId.KhoTonKhoSaveCtrl + '.action.closeEdit', function (event, data) {
                $rootScope.isOpenPopup = false;
            });

        }

    });
})();
