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
            KhoLoaiHangHoaList: 'KhoLoaiHangHoaListCtrl',
            KhoLoaiHangHoaEditPopup: 'KhoLoaiHangHoaEditPopup',
        }

        //HOT-KEY       
        vm.keys = {

            //press F2 -> open popup
            F2: function (name, code) {
                if ($('#' + vm.controllerId.KhoLoaiHangHoaEditPopup + '.fade.in')[0]) {
                } else {
                    $scope.$broadcast(vm.controllerId.KhoLoaiHangHoaEditPopup + '.edit', 0);
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if ($('#' + vm.controllerId.KhoLoaiHangHoaEditPopup + '.fade.in')[0]) {
                } else {
                    console.log(vm.controllerId.KhoLoaiHangHoaList + '.reload');
                    $scope.$broadcast(vm.controllerId.KhoLoaiHangHoaList + '.reload');
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if ($('#' + vm.controllerId.KhoLoaiHangHoaEditPopup + '.fade.in')[0]) {
                    console.log(vm.controllerId.KhoLoaiHangHoaEditPopup + '.save');
                    $scope.$broadcast(vm.controllerId.KhoLoaiHangHoaEditPopup + '.save');
                } else { }
            },

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
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },
        };

        /*************************
         * INIT FUNCTION
         */

        vm.onInitView = function (config) {
            KhoLoaiHangHoaListEventListener();
            KhoLoaiHangHoaEditPopupEventListener();
        }

        function KhoLoaiHangHoaListEventListener() {
            $scope.$on(vm.controllerId.KhoLoaiHangHoaList + '.edit', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoLoaiHangHoaEditPopup + '.edit', v);
            });
        }

        function KhoLoaiHangHoaEditPopupEventListener() {
            $scope.$on(vm.controllerId.KhoLoaiHangHoaEditPopup + '.create', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoLoaiHangHoaEditPopup + '.create', v);
            });
            $scope.$on(vm.controllerId.KhoLoaiHangHoaEditPopup + '.apDung', function (e, v) {
                $scope.$broadcast(vm.controllerId.KhoLoaiHangHoaList + '.reload', v);
            });
        }

    }
})();