(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoSoDuTonKhoFilterCtrl', KhoSoDuTonKhoFilterCtrl)
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

    function KhoSoDuTonKhoFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoSoDuTonKhoFilterCtrl';

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
        vm.title = 'KhoSoDuTonKhoFilterCtrl';

        vm.data = {
            listKhoKhoHang: [],
            listKhoHangHoa: [],
            searchString: ''
        };

        vm.action = {
            clearListKhoKhoHang: clearListKhoKhoHang,
            ClearlistKhoHangHoa: ClearlistKhoHangHoa,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            $('#denngay').val(moment().format('DD/MM/YYYY'));
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.listKhoKhoHang = [];
            vm.data.listKhoHangHoa = [];
            vm.data.searchString = '';
            $('#tungay').val('');
            $('#denngay').val(moment().format('DD/MM/YYYY'));
        }

        function search() {
            
            var HangHoaId = joinStr(vm.data.listKhoHangHoa, "HangHoaId");
            var KhoHangId = joinStr(vm.data.listKhoKhoHang, "KhoHangId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + KhoHangId + '|' + HangHoaId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
            $scope.$emit(controllerId + '.data.listKhoHang', vm.data.listKhoKhoHang);
        }

        function clearListKhoKhoHang() {
            utility.clearArray(vm.data.listKhoKhoHang);
        }
        function ClearlistKhoHangHoa() {
            utility.clearArray(vm.data.listKhoHangHoa);
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
            $scope.$on(controllerId + '.data.listKhoKhoHang', function (event, data) {
                vm.data.listKhoKhoHang = data.listKhoHang;
            });
            $scope.$on(controllerId + '.data.listKhoHangHoa', function (event, data) {
                vm.data.listKhoHangHoa = data;
            });
           
        }
    }
})();
