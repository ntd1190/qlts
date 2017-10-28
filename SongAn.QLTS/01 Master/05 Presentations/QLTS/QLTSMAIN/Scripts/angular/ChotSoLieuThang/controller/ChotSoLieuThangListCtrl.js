(function () {
    'use strict';
    angular.module('app').controller('ChotSoLieuThangListCtrl', function ($rootScope, $scope, utility, ChotSoLieuThangService) {
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
        vm.controllerId = 'ChotSoLieuThangListCtrl';

        vm.data = {};
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};

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
            vm.data.nam = d.getFullYear().toString();
            vm.data.thang = moment().format('MM');
        }

        /* ACTION FUNCTION */
        vm.action = {};

        vm.action.ChotThang = function () {
            var thangNam = vm.data.thang + vm.data.nam.substr(vm.data.nam.length - 2);
            //alert(thangNam);

            //return;
            utility.addloadding($('body'));
            var data = {};
            data.ThangNam = thangNam;
            data.CoSoId = vm.data.userInfo.CoSoId || 0;
            data.LoginId = vm.data.userInfo.NhanVienId || 0;

            ChotSoLieuThangService.insert(data)
                .then(function success(result) {
                    utility.removeloadding();
                    if (parseInt(result.data.data[0]["ID"]) < 0) {
                        if (parseInt(result.data.data[0]["ID"]) == -1)
                            utility.AlertError("Tháng " + vm.data.thang + " năm " + vm.data.nam + " đã chốt !");
                        else if (parseInt(result.data.data[0]["ID"]) == -2 || parseInt(result.data.data[0]["ID"]) == -3)
                            utility.AlertError("Tháng không hợp lệ!");
                    }
                    else
                        utility.AlertSuccess("Chốt số liệu tháng thành công!");

                }, function error(result) {
                    console.log(result);
                    utility.removeloadding();
                    if (result.status === 400) {
                        alert(result.data.error.message);
                    } else {
                        utility.AlertError('Không thể chốt!');
                    }
                });
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