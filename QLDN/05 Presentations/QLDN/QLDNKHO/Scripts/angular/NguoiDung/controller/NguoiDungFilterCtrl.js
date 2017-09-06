(function () {
    'use strict';

    angular
        .module('app')
        .controller('NguoiDungFilterCtrl', NguoiDungFilterCtrl)
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

    function NguoiDungFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'NguoiDungFilterCtrl';

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
        vm.title = 'NguoiDungFilterCtrl';

        vm.data = {
            listVaiTro: [],
            listNhanVien: [],
            searchString: ''
        };

        vm.action = {
            clearListVaiTro: clearListVaiTro,
            ClearlistNhanVien: ClearlistNhanVien,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.listVaiTro = [];
            vm.data.listNhanVien = [];
            vm.data.searchString = '';
            
        }




        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            ////////////
            var VaiTroId = joinStr(vm.data.listVaiTro, "VaiTroId");
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + VaiTroId +'|' + NhanVienId ;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListVaiTro() {
            utility.clearArray(vm.data.listVaiTro);
        }
        function ClearlistNhanVien() {
            utility.clearArray(vm.data.listNhanVien);
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
            $scope.$on(controllerId + '.data.listVaiTro', function (event, data) {
                vm.data.listVaiTro = data;
            });
            $scope.$on(controllerId + '.data.listNhanVienSearch', function (event, data) {
                vm.data.listNhanVien = data;
            });

        }
    }
})();
