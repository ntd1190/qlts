(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('MainCtrl', function controller($scope) {
        /*** PRIVATE ***/

        var vm = this;

        /*** VIEW MODEL ***/

        vm.controllerId = {
            ChiNhanhList: 'ChiNhanhListCtrl',
            ChiNhanhEditPopup: 'ChiNhanhEditPopup',
            ChiNhanhListPopup: 'ChiNhanhListPopup'
        }

        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                //alert("ESC");
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
                    $scope.$broadcast($(ele_highest).attr('id') + '.action.ESC');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },

            //press F2 -> open popup
            F2: function (name, code) {
                $scope.$broadcast(vm.controllerId.ChiNhanhEditPopup + '.action.F2');
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if ($('#' + vm.controllerId.ChiNhanhEditPopup + '.fade.in')[0]) {
                } else {
                    $scope.$broadcast(vm.controllerId.ChiNhanhList + '.reload');
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if ($('#' + vm.controllerId.ChiNhanhEditPopup + '.fade.in')[0]) {
                    $scope.$broadcast(vm.controllerId.ChiNhanhEditPopup + '.action.F8');
                }
            },
            //ESC: function (name, code) {
            //    var eles = $('.ui-draggable.collapse.fade.in');
            //    if (eles.get().length > 0) {
            //        $(eles.get(0)).collapse('hide');
            //    }
            //}
        };

        /*************************
         * INIT FUNCTION
         */

        vm.onInitView = function (config) {
            ChiNhanhListEvent();
            ChiNhanhListPopupEvent();
            ChiNhanhEditPopupEvent();
        }

        function ChiNhanhListEvent() {
            $scope.$on(vm.controllerId.ChiNhanhList + '.edit', function (e, v) {
                $scope.$broadcast(vm.controllerId.ChiNhanhEditPopup + '.edit', v);
            });
        }

        function ChiNhanhListPopupEvent() {
            $scope.$on(vm.controllerId.ChiNhanhListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.ChiNhanhEditPopup + '.data.listChiNhanh', v);
                $('#' + vm.controllerId.ChiNhanhListPopup).collapse('hide');
            });
        }

        function ChiNhanhEditPopupEvent() {
            $scope.$on(vm.controllerId.ChiNhanhEditPopup + '.action.apDung', function (e, v) {
                $scope.$broadcast(vm.controllerId.ChiNhanhList + '.reload', v);
                $('#' + vm.controllerId.ChiNhanhEditPopup).collapse('hide');
            });
            $scope.$on(vm.controllerId.ChiNhanhEditPopup + '.action.getListChiNhanh', function (e, v) {
                $('#' + vm.controllerId.ChiNhanhListPopup).collapse('show');
                $scope.$broadcast(vm.controllerId.ChiNhanhListPopup + '.action.reload', v);
            });
      }

    });
})();