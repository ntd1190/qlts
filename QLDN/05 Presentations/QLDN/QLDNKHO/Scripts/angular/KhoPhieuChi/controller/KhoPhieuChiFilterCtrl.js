(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoPhieuChiFilterCtrl', KhoPhieuChiFilterCtrl)
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

    function KhoPhieuChiFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'KhoPhieuChiFilterCtrl';

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
        vm.title = 'KhoPhieuChiFilterCtrl';

        vm.data = {
            listKhachHang: [],
            listNguoiNhan: [],
            HinhThuc: {
                tatCa: true,
                chuyenKhoan: false,
                tienMat: false
            },
            searchString: ''
        };

        vm.action = {
            clearListKhachHang: clearListKhachHang,
            ClearlistNguoiNhan: ClearlistNguoiNhan,
            reset: reset,
            checkHinhThuc: checkHinhThuc,
            checkHinhThucTatCa: checkHinhThucTatCa,
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
            vm.data.listNguoiNhan = [];
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
            var NguoiNhanId = joinStr(vm.data.listNguoiNhan, "NhanVienId");
            var KhachHangId = joinStr(vm.data.listKhachHang, "KhachHangId");
            /////////////
            var hinhthuc = "";
            if (vm.data.HinhThuc.chuyenKhoan) hinhthuc = hinhthuc + "'Y',";
            if (vm.data.HinhThuc.tienMat) hinhthuc = hinhthuc + "'N',";
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + KhachHangId + '|' + hinhthuc + '|' + NguoiNhanId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }
        function checkHinhThucTatCa(status) {
            vm.data.listHinhThuc = [];

            if (status) {
                vm.data.HinhThuc.tatCa = true;
            }

            if (vm.data.HinhThuc.tatCa == true) {
                vm.data.HinhThuc.chuyenKhoan = false;
                vm.data.HinhThuc.tienMat = false;

            }
            else {
                vm.data.HinhThuc.chuyenKhoan = true;
            }
        }

        function checkHinhThuc() {

            if (vm.data.HinhThuc.chuyenKhoan != true
                && vm.data.HinhThuc.tienMat != true) {

                vm.data.HinhThuc.tatCa = true;
            }
            else {
                vm.data.HinhThuc.tatCa = false;
            }
        }
        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }
        function ClearlistNguoiNhan() {
            utility.clearArray(vm.data.listNguoiNhan);
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
            $scope.$on(controllerId + '.data.listNguoiNhan', function (event, data) {
                vm.data.listNguoiNhan = data;
            });

        }
    }
})();
