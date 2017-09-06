(function () {
    'use strict';

    angular
        .module('app')
        .controller('DuAnFilterCtrl', DuAnFilterCtrl)
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

    function DuAnFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'DuAnFilterCtrl';

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
        vm.title = 'DuAnFilterCtrl';

        vm.data = {
            listNhanVien: [],
            listDuAn: [],
            trangThai: {
                tatCa: true,
                hoatDong: false,
                hoanThanh: false,
                Treo: false,
            },


            searchString: ''
        };

        vm.action = {
            clearListDuAn: clearListDuAn,
            ClearlistNhanVien: ClearlistNhanVien,
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
            vm.data.listDuAn = [];
            vm.data.listNhanVien = [];
            vm.data.searchString = '';
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val( moment().daysInMonth() + moment().format("/MM/YYYY"));
            checkTrangThaiTatCa(true);
        }
        function checkTrangThaiTatCa(status) {
            vm.data.listTrangThai = [];

            if (status) {
                vm.data.trangThai.tatCa = true;
            }

            if (vm.data.trangThai.tatCa == true) {
                vm.data.trangThai.hoatDong = false;
                vm.data.trangThai.hoanThanh = false;
                vm.data.trangThai.Treo = false;
            }
            else {
                vm.data.trangThai.batDau = true;
            }
        }
        function checkTrangThai() {
            if (vm.data.trangThai.hoatDong != true
                && vm.data.trangThai.hoanThanh != true
                && vm.data.trangThai.Treo != true) {

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
            //////////
            var tinhtrang = "";
            if (vm.data.trangThai.hoatDong) tinhtrang = tinhtrang + "'DA_HD',";
            if (vm.data.trangThai.hoanThanh) tinhtrang = tinhtrang + "'DA_HT',";
            if (vm.data.trangThai.Treo) tinhtrang = tinhtrang + "'DA_DT',";
            ////////////
            var DuAnId = joinStr(vm.data.listDuAn, "DuAnId");
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + DuAnId +  '|' + NhanVienId + '|'  + tinhtrang;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListDuAn() {
            utility.clearArray(vm.data.listDuAn);
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
            $scope.$on(controllerId + '.data.listDuAn', function (event, data) {
                vm.data.listDuAn = data;
            });
            $scope.$on(controllerId + '.data.listNhanVienSearch', function (event, data) {
                vm.data.listNhanVien = data;
            });


        }
    }
})();
