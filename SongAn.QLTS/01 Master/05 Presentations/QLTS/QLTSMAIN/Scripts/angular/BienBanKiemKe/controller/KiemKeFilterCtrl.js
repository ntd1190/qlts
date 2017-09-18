(function () {
    'use strict';
    angular.module('app').controller('BienBanKiemKeFilterCtrl', function ($rootScope, $scope, utility) {
        /* PRIVATE */

        var vm = this;
        //HOT-KEY       
        vm.keys = {

            //press F8 -> search
            F8: function (name, code) {
                emitSearch();
            }
        };
        //end HOT-KEY
        /* VIEW MODEL */
        vm.controllerId = 'BienBanKiemKeFilterCtrl';

        vm.data = {};
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.soChungTu = '';

        vm.onInitView = function (config) {

            //if (config && config.userInfo) {
            //    vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            //    vm.data.userInfo = config.userInfo;
            //    setEnableButton();
            //}

            initEventListener();
        }
        activate();

        function activate() {
            vm.data.startDate = moment().format("01/MM/YYYY");
            vm.data.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
        }
        /* ACTION FUNCTION */
        vm.action = {};


        vm.action.search = function () {
            emitSearch();
        };

        vm.action.reset = function () {
            vm.data.startDate = moment().format("01/MM/YYYY");
            vm.data.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
            vm.data.soChungTu = '';
        };

        /* BROADCAST / EMIT / ON FUNCTION */
        function initEventListener() {


            $scope.$on(vm.controllerId + '.action.F8', function (e, v) {
                vm.action.search();
            });
        }

        function emitSearch() {
            setInitValue();
            var data = getDataFilter();
            console.log(data);
            //$scope.$emit(vm.controllerId + '.data.filter', data);
            $rootScope.$broadcast('BienBanKiemKeListCtrl.action.get-filter', data);
        }

        /* BIZ FUNCTION */
        function setInitValue() {

        }

        function getDataFilter() {

            var data = {};

            data.startDate = vm.data.startDate;
            data.endDate = vm.data.endDate;
            data.soChungTu = vm.data.soChungTu;
            return data;
        }

        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    list.push(array[i][property]);
                }

                result = list.join(',');
            } else result = result || '';

            return result;
        }

    }).directive("keyboard", keyboard);        //HOT-KEY;

    //HOT-KEY
    function keyboard($document, keyCodes) {
        return {
            link: function (scope, element, attrs) {

                var keysToHandle = scope.$eval(attrs.keyboard);
                var keyHandlers = {};

                // Registers key handlers
                angular.forEach(keysToHandle, function (callback, keyName) {
                    var keyCode = keyCodes[keyName];
                    keyHandlers[keyCode] = { callback: callback, name: keyName };
                });

                // Bind to document keydown event
                $document.on("keydown", function (event) {

                    var keyDown = keyHandlers[event.keyCode];

                    // Handler is registered
                    if (keyDown) {
                        event.preventDefault();

                        //// Invoke the handler and digest
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY
})();