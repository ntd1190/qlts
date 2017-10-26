(function () {
    'use strict';
    angular.module('app').controller('BaoCaoNhapXuatTonListCtrl', function ($rootScope, $scope, utility) {
        /* PRIVATE */

        var vm = this;
        //HOT-KEY       
        vm.keys = {

            //press F8 -> search
            F8: function (name, code) {
            }
        };
        //end HOT-KEY
        /* VIEW MODEL */
        vm.controllerId = 'BaoCaoNhapXuatTonListCtrl';

        vm.data = {};
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.startMonth = '';
        vm.data.endMonth = '';
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.nguon = '1';
        vm.data.KhoTaiSanId = 0;

        vm.onInitView = function (config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
                //setEnableButton();
            }
            initEventListener();
        }

        activate();

        function activate() {
            var d = new Date();

            vm.data.startMonth = moment().format('MM');
            vm.data.endMonth = moment().format('MM');
            vm.data.startDate = '01' + moment().format('/MM/YYYY');
            vm.data.endDate = new Date(d.getFullYear().toString(), vm.data.endMonth, 0).getDate() + moment().format('/MM/YYYY');
            vm.data.nguon = "1";
            vm.data.nam = d.getFullYear().toString();
        }

        /* ACTION FUNCTION */
        vm.action = {};

        vm.action.getValThang = function () {
            var d = new Date();

            vm.data.startDate = '01/' + vm.data.startMonth + '/' + vm.data.nam;
            vm.data.endDate = new Date(vm.data.nam, vm.data.endMonth, 0).getDate() + '/' + vm.data.endMonth + '/' + vm.data.nam;            
        };

        vm.action.getValNam = function () {

            vm.data.startDate = '01/' + vm.data.startMonth + '/' + vm.data.nam;
            vm.data.endDate = new Date(vm.data.nam, vm.data.endMonth, 0).getDate() + '/' + vm.data.endMonth + '/' + vm.data.nam;
        };

        vm.action.In = function () {
            var nguon = "";
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;
            var CoSoId = vm.data.userInfo.CoSoId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;
            var khoTaiSanId = vm.data.KhoTaiSanId || 0;

            var data = nguon + '|' + tuNgay + '|' + denNgay + '|' + CoSoId + '|' + NhanVienId + '|' + khoTaiSanId;

            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptNhapXuatTon&data=' + data);

            $('#reportmodal').modal('show');
        };

        vm.action.XuatExcel = function () {
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;
            var bieuIn = vm.data.bieuIn;
            var CoSoId = vm.data.userInfo.CoSoId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;

            var data = bieuIn + '|' + tuNgay + '|' + denNgay + '|' + CoSoId + '|' + NhanVienId;

            if (bieuIn.toString() == "1") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptNhapXuatTon&export=1&data=' + data);
            }
            
        };

        /* BROADCAST / EMIT / ON FUNCTION */
        function initEventListener() {

        }

        /* BIZ FUNCTION */
        function setInitValue() {

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