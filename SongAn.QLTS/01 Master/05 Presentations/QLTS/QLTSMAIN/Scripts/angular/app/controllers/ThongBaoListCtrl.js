(function () {
    'use strict';
    angular.module('app').controller('ThongBaoListCtrl', function ($rootScope, $scope, utility, ThongBaoService) {
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
        vm.controllerId = 'ThongBaoListCtrl';

        vm.data = {};
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.TongSo = 0;
        vm.data.linkUrl = '';
        vm.data.ThongBaoListDisplay = [];
        vm.data.ThongBaoListDisplayTemp = [];

        vm.onInitView = function (config) {
            if (config && config.CoSoId) {
                vm.data.userInfo.CoSoId = config.CoSoId;
                vm.data.userInfo.UserId = config.UserId;
                vm.data.linkUrl = config.linkUrl;
            }
            initEventListener();
            getList();
        }

        activate();

        function activate() {
            
        }

        /* ACTION FUNCTION */
        vm.action = {};

        vm.action.update = function (data, loai) {
            
            ThongBaoService.update(data).then(function (success) {
                if (success.data.data) {
                    if (loai == 'DeNghi') {
                        window.location = vm.data.linkUrl + 'duyetcap/list';
                    }
                    else if (loai == 'BaoCao') {
                        window.location = vm.data.linkUrl + 'duyetbaocao/list';
                    }
                    else if (loai == 'MuaSam') {
                        window.location = vm.data.linkUrl + 'duyetmua/list';
                    }
                }
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);
                }
            });
        }

        function getList() {
          
            ThongBaoService.getList(vm.data.userInfo.CoSoId, vm.data.userInfo.UserId).then(function (success) {
                if (success.data.data) {
                    vm.data.ThongBaoListDisplayTemp = [];
                    vm.data.ThongBaoListDisplayTemp = angular.copy(success.data.data);
                    convertList(vm.data.ThongBaoListDisplayTemp);
                    vm.data.ThongBaoListDisplay = vm.data.ThongBaoListDisplayTemp;
                    vm.data.TongSo = vm.data.ThongBaoListDisplay.length;
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);
                }
                $('#bgloadding').remove();
            });
        }

        function convertList(temp) {
            
            for (var index = 0; index < vm.data.ThongBaoListDisplayTemp.length; index++) {
                vm.data.ThongBaoListDisplayTemp[index].TimeDiff = timeDifference(new Date(vm.data.ThongBaoListDisplayTemp[index].NgayHienTai), new Date(vm.data.ThongBaoListDisplayTemp[index].NgayTao));
            }
        }

        function timeDifference(current, previous) {

            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;

            var elapsed = current - previous;

            if (elapsed < msPerMinute) {
                //return Math.round(elapsed / 1000) + 'Vừa xong';
                return 'Vừa xong';
            }

            else if (elapsed < msPerHour) {
                return Math.round(elapsed / msPerMinute) + ' phút trước';
            }

            else if (elapsed < msPerDay) {
                return Math.round(elapsed / msPerHour) + ' giờ trước';
            }

            else if (elapsed < msPerMonth) {
                return '' + Math.round(elapsed / msPerDay) + ' ngày trước';
            }

            else if (elapsed < msPerYear) {
                return '' + Math.round(elapsed / msPerMonth) + ' tháng trước';
            }

            else {
                return '' + Math.round(elapsed / msPerYear) + ' năm trước';
            }
        }


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