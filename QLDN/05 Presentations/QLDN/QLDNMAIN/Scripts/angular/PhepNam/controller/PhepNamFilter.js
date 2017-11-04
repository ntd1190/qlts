(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhepNamFilterCtrl', PhepNamFilterCtrl)
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

    function PhepNamFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'PhepNamFilterCtrl';

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
        vm.title = 'PhepNamFilterCtrl';

        vm.data = {
            listPhongBan: [],
            listNhanVien: [],
            listChiNhanh: [],
            searchString: ''
        };

        vm.action = {
            clearListPhongBan: clearListPhongBan,
            clearListChiNhanh: clearListChiNhanh,
            ClearlistNhanVien: ClearlistNhanVien,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            var d = new Date();
            var ddmmyy = '01/01/'+ d.getFullYear();                        
            $('#tungay').val(ddmmyy);
            //$('#tungay').val(moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY'));
            //$('#denngay').val(moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY'));
            $('#denngay').val(moment().format('DD/MM/YYYY'));
        }
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.listPhongBan = [];
            vm.data.listNhanVien = [];
            vm.data.listChiNhanh = [];
            vm.data.searchString = '';

            $('#tungay').val(moment().format('DD/MM/YYYY'));
            $('#denngay').val(moment().format('DD/MM/YYYY'));
        }




        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            ////////////
            var PhongBanId = joinStr(vm.data.listPhongBan, "PhongBanId");
            var NhanVienId = joinStr(vm.data.listNhanVien, "NhanVienId");
            var ChiNhanhId = joinStr(vm.data.listChiNhanh, "ChiNhanhId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + NhanVienId + '|' + PhongBanId + '|' + ChiNhanhId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListPhongBan() {
            utility.clearArray(vm.data.listPhongBan);
        }
        function clearListChiNhanh() {
            utility.clearArray(vm.data.listChiNhanh);
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
            $scope.$on(controllerId + '.data.listPhongBan', function (event, data) {
                vm.data.listPhongBan = data;
            });
            $scope.$on(controllerId + '.data.listNhanVienSearch', function (event, data) {
                vm.data.listNhanVien = data;
            });

            $scope.$on(controllerId + '.data.listChiNhanh', function (event, data) {
                vm.data.listChiNhanh = data.listChiNhanh;
            });

        }
    }
})();
