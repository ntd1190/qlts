(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoHangHoaFilterCtrl', KhoHangHoaFilterCtrl)
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

    function KhoHangHoaFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoHangHoaFilterCtrl';

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
        vm.title = 'KhoHangHoaFilterCtrl';

        vm.data = {
            TuKhoa:'',
            listKhachHang: [],
            listKhoNhomHangHoa: [],
            listKhoLoaiHangHoa: [],
            listKhoHangSanXuat: [],
            listKhoNuocSanXuat: [],
            listKhoHangHoa: [],
            searchString: ''
        };

        vm.action = {
            clearListKhachHang: clearListKhachHang,
            ClearlistKhoNhomHangHoa: ClearlistKhoNhomHangHoa,
            ClearlistKhoLoaiHangHoa: ClearlistKhoLoaiHangHoa,
            ClearlistKhoHangSanXuat: ClearlistKhoHangSanXuat,
            ClearlistKhoNuocSanXuat: ClearlistKhoNuocSanXuat,
            ClearlistKhoHangHoa: ClearlistKhoHangHoa,
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
            vm.data.listKhoNhomHangHoa = [];
            vm.data.listKhoLoaiHangHoa = [];
            vm.data.listKhoHangSanXuat = [];
            vm.data.listKhoNuocSanXuat = [];
            vm.data.listKhoHangHoa = [];
            vm.data.searchString = '';

        }

        function search() {
            var HangHoaId = joinStr(vm.data.listKhoHangHoa, "HangHoaId");
            var NhomHangHoaId = joinStr(vm.data.listKhoNhomHangHoa, "NhomHangHoaId");
            var LoaiHangHoaId = joinStr(vm.data.listKhoLoaiHangHoa, "LoaiHangHoaId");
            var HangSanXuatId = joinStr(vm.data.listKhoHangSanXuat, "HangSanXuatId");
            var NuocSanXuatId = joinStr(vm.data.listKhoNuocSanXuat, "NuocSanXuatId");
            var KhachHangId = joinStr(vm.data.listKhachHang, "KhachHangId");
            /////////////
            vm.data.searchString = vm.data.TuKhoa + '|' + HangHoaId + '|' + NhomHangHoaId + '|' + LoaiHangHoaId + '|' + HangSanXuatId + '|' + NuocSanXuatId + '|' + KhachHangId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }
        function ClearlistKhoNhomHangHoa() {
            utility.clearArray(vm.data.listKhoNhomHangHoa);
        }
        function ClearlistKhoLoaiHangHoa() {
            utility.clearArray(vm.data.listKhoLoaiHangHoa);
        }
        function ClearlistKhoHangSanXuat() {
            utility.clearArray(vm.data.listKhoHangSanXuat);
        }
        function ClearlistKhoNuocSanXuat() {
            utility.clearArray(vm.data.listKhoNuocSanXuat);
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
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });
            $scope.$on(controllerId + '.data.listKhoNhomHangHoa', function (event, data) {
                vm.data.listKhoNhomHangHoa = data;
            });
            $scope.$on(controllerId + '.data.listKhoLoaiHangHoa', function (event, data) {
                vm.data.listKhoLoaiHangHoa = data;
            });
            $scope.$on(controllerId + '.data.listKhoHangSanXuat', function (event, data) {
                vm.data.listKhoHangSanXuat = data;
            });
            $scope.$on(controllerId + '.data.listKhoNuocSanXuat', function (event, data) {
                vm.data.listKhoNuocSanXuat = data;
            });
            $scope.$on(controllerId + '.data.listKhoHangHoa', function (event, data) {
                vm.data.listKhoHangHoa = data;
            });
        }
    }
})();
