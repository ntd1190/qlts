(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoCongNoNCCFilterCtrl', KhoCongNoNCCFilterCtrl)
        .directive("keyboard", keyboard);        //HOT-KEY

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

                        // Invoke the handler and digest
                        scope.$apply(function () {
                            keyDown.callback(keyDown.name, event.keyCode);
                        })
                    }
                });
            }
        }
    };

    function KhoCongNoNCCFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoCongNoNCCFilterCtrl';

        var vm = this;
        //HOT-KEY       
        vm.keys = {
            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    search();
                }
            }
        };
        //end HOT-KEY
        vm.title = 'KhoCongNoNCCFilterCtrl';

        vm.data = {
            listKhachHang: [],
            searchString: '',
            KhachHangId:''
        };

        vm.action = {
            clearListKhachHang: clearListKhachHang,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
        }

        function onInitView(config) {
            if (config && config.KhachHangId) {
                vm.data.KhachHangId = config.KhachHangId;
            }
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }
            initEventListener();
        }

        function reset() {
            vm.data.listKhachHang = [];
            vm.data.searchString = '';
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
        }

        function search() {
            
            var KhachHangId = joinStr(vm.data.listKhachHang, "KhachHangId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + (KhachHangId?KhachHangId:vm.data.KhachHangId) + '|'
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
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
        function initEventListener() {
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });
           
        }
    }
})();
