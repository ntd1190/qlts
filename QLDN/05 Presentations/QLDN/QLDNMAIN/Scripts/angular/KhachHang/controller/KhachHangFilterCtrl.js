(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhachHangFilterCtrl', KhachHangFilterCtrl)
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

    function KhachHangFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhachHangFilterCtrl';

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
        vm.title = 'KhachHangFilterCtrl';

        vm.data = {
            listKhachHang: [],
            listTinh: [],
            
          

            trangThai : {
                tatCa : true,
                khNCC: false,
                khachHang: false,
            },

            searchString: ''
        };

        vm.action = {
            clearListKhachHang: clearListKhachHang,
            clearListTinh: clearListTinh,
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
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
            vm.data.listKhachHang = [];
            vm.data.listTinh = [];
            vm.data.searchString = '';
            $('#tungay').val('') ;
            $('#denngay').val('');
            checkTrangThaiTatCa(true);
        }

        function checkTrangThaiTatCa(status) {
            vm.data.listTrangThai = [];

            if (status) {
                vm.data.trangThai.tatCa = true;
            }

            if (vm.data.trangThai.tatCa == true)
            {
                vm.data.trangThai.khNCC = false;
                vm.data.trangThai.khachHang = false;
            }
            else {
                vm.data.trangThai.khNCC = true;
            }
        }

        function checkTrangThai() {

            if (vm.data.trangThai.khNCC != true
                && vm.data.trangThai.khachHang != true) {

                vm.data.trangThai.tatCa = true;
            }
            else {
                vm.data.trangThai.tatCa = false;
            }
        }

        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            var loai = "";
            if (vm.data.trangThai.khNCC) loai = loai + "1,";
            if (vm.data.trangThai.khachHang) loai = loai + "2,";
            var KhachHangId = joinStr(vm.data.listKhachHang, "KhachHangId");
            var TinhThanhPhoId = joinStr(vm.data.listTinh, "TinhThanhPhoId");
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + KhachHangId + '|' + TinhThanhPhoId + '|' + loai;

            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }

        function clearListTinh() {
            utility.clearArray(vm.data.listTinh);
        }
        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join(',');
            result = result || '';

            return result;
        }
        function initEventListener() {
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });

            $scope.$on(controllerId + '.data.listTinh', function (event, data) {
                vm.data.listTinh = data;
            });

            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
