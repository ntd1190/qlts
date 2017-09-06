(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', controller);

    function controller($scope) {
        /*********************************
         * PRIVATE
         */

        var vm = this;

        /************************
         * VIEW MODEL
         */

        vm.controllerId = {
            KhoHangSanXuatList: 'KhoHangSanXuatListCtrl',
            KhoHangSanXuatEditPopup: 'KhoHangSanXuatEditPopup',
        }

        //HOT-KEY       
        vm.keys = {
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
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },
            //press F2 -> open popup
            F2: function (name, code) {
                if ($('#' + vm.controllerId.KhoHangSanXuatEditPopup + '.fade.in')[0]) {
                } else {
                    $scope.$broadcast(vm.controllerId.KhoHangSanXuatEditPopup + '.edit', 0);
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if ($('#' + vm.controllerId.KhoHangSanXuatEditPopup + '.fade.in')[0]) {
                } else {
                    console.log(vm.controllerId.KhoHangSanXuatList + '.reload');
                    $scope.$broadcast(vm.controllerId.KhoHangSanXuatList + '.reload');
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if ($('#' + vm.controllerId.KhoHangSanXuatEditPopup + '.fade.in')[0]) {
                    console.log(vm.controllerId.KhoHangSanXuatEditPopup + '.save');
                    $scope.$broadcast(vm.controllerId.KhoHangSanXuatEditPopup + '.save');
                } else { }
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
            KhoHangSanXuatListEventListener();
            KhoHangSanXuatEditPopupEventListener();
        }

        function KhoHangSanXuatListEventListener() {
            $scope.$on(vm.controllerId.KhoHangSanXuatList + '.edit', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoHangSanXuatEditPopup + '.edit', v);
            });
        }

        function KhoHangSanXuatEditPopupEventListener() {
            $scope.$on(vm.controllerId.KhoHangSanXuatEditPopup + '.create', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoHangSanXuatEditPopup + '.create', v);
            });
            $scope.$on(vm.controllerId.KhoHangSanXuatEditPopup + '.apDung', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoHangSanXuatList + '.reload', v);
            });
        }

    }
})();