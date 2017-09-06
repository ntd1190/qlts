(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoKiemKeFilterCtrl', KhoKiemKeFilterCtrl)
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

    function KhoKiemKeFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoKiemKeFilterCtrl';

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
        vm.title = 'KhoKiemKeFilterCtrl';

        vm.data = {
            listKhoHang: [],
            HinhThuc: {
                tatCa: true,
                chuyenKhoan: false,
                tienMat: false
            },
            searchString: ''
        };

        vm.action = {
            clearListKhoHang: clearListKhoHang,
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
            vm.data.listKhoHang = [];
            vm.data.listNguoiNop = [];
            $('#tungay').val('');
            $('#denngay').val('');
            checkHinhThucTatCa(true);

        }

        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            /////////
            var KhoHangId = joinStr(vm.data.listKhoHang, "KhoHangId");
            /////////////
            var hinhthuc = "";
            if (vm.data.HinhThuc.chuyenKhoan) hinhthuc = hinhthuc + "'Y',";
            if (vm.data.HinhThuc.tienMat) hinhthuc = hinhthuc + "'N',";
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + KhoHangId ;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListKhoHang() {
            utility.clearArray(vm.data.listKhoHang);
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
            $scope.$on(controllerId + '.data.listKhoHang', function (event, data) {
                vm.data.listKhoHang = data.listKhoHang;
            });
           

        }
    }
})();
