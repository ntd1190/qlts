(function () {
    'use strict';
    angular.module('app').controller('BaoCaoCongKhaiListCtrl', function ($rootScope, $scope, utility, $timeout) {
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
        vm.controllerId = 'BaoCaoCongKhaiListCtrl';

        vm.data = {};
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.condition = '1';

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

            vm.data.startDate = moment().format('DD/MM/YYYY');
            vm.data.endDate = moment().format('DD/MM/YYYY');
            vm.data.condition = "1";
            vm.data.quy = "1";
            vm.data.bieuIn = "1";
            vm.data.nam = d.getFullYear().toString();
            
            $timeout(function () {
                vm.data.condition = '3';
                vm.action.getValCondition();
            }, 10);
        }

        /* ACTION FUNCTION */
        vm.action = {};

        vm.action.getValCondition = function () {
            var d = new Date();

            if (vm.data.condition == "1") {
                $('.quy').css('display', 'none');
                $('.nam').css('display', 'none');
            } else if (vm.data.condition == "2") {
                $('.quy').css('display', 'block');
                $('.nam').css('display', 'none');
                vm.data.startDate = '01/01/' + d.getFullYear().toString();
                vm.data.endDate = '31/03/' + d.getFullYear().toString();
            } else {
                $('.quy').css('display', 'none');
                $('.nam').css('display', 'block');
                vm.data.startDate = '01/01/' + d.getFullYear().toString();
                vm.data.endDate = '31/12/' + d.getFullYear().toString();
            }
        };

        vm.action.getValQuy = function () {
            var d = new Date();

            if (vm.data.quy == "1") {
                vm.data.startDate = '01/01/' + d.getFullYear().toString();
                vm.data.endDate = '31/03/' + d.getFullYear().toString();
            } else if (vm.data.quy == "2") {
                vm.data.startDate = '01/04/' + d.getFullYear().toString();
                vm.data.endDate = '30/06/' + d.getFullYear().toString();
            }
            else if (vm.data.quy == "3") {
                vm.data.startDate = '01/07/' + d.getFullYear().toString();
                vm.data.endDate = '30/09/' + d.getFullYear().toString();
            }
            else {
                vm.data.startDate = '01/10/' + d.getFullYear().toString();
                vm.data.endDate = '31/12/' + d.getFullYear().toString();
            }
        };

        vm.action.getValNam = function () {

            vm.data.startDate = '01/01/' + vm.data.nam;
            vm.data.endDate = '31/12/' + vm.data.nam;
        };

        vm.action.In = function () {
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;
            var bieuIn = vm.data.bieuIn;
            var CoSoId = vm.data.userInfo.CoSoId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;

            var data = bieuIn + '|' + tuNgay + '|' + denNgay + '|' + CoSoId + '|' + NhanVienId;


            if (bieuIn.toString() == "1") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptKeHoachMuaSamTSNNBieu01&data=' + data);
            } else if (bieuIn.toString() == "2") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptKetQuaMuaSamTSNNBieu02&data=' + data);
            } else if (bieuIn.toString() == "3") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptCongKhaiNhaDatBieu03&data=' + data);
            } else if (bieuIn.toString() == "4") {
                
            } else if (bieuIn.toString() == "5") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptChoThueTSNNBieu05&data=' + data);
            } else if (bieuIn.toString() == "6") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptTinhHinhXuLyTSBieu06&data=' + data);
            }

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
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptKeHoachMuaSamTSNNBieu01&export=1&data=' + data);
            }
            else if (bieuIn.toString() == "2") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptKetQuaMuaSamTSNNBieu02&export=1&data=' + data);
            }
            else if (bieuIn.toString() == "3") {
                
            }
            else if (bieuIn.toString() == "4") {
                
            }
            else if (bieuIn.toString() == "5") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptChoThueTSNNBieu05&export=1&data=' + data);
            }
            else if (bieuIn.toString() == "6") {
                $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptTinhHinhXuLyTSBieu06&export=1&data=' + data);
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