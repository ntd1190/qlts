(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl)
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
    //end HOT-KEY


    function MainCtrl($scope, $rootScope, $http) {

        var vm = this;

        $rootScope.isOpenPopup = false;
        $rootScope.isOpenSearchPanel = false;
        $rootScope.IsSelectAll = false;
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                $rootScope.$broadcast(vm.controllerId.ReportTheoBangLuong + '.action.closePopup', null);
                //alert("List ESC");
                //if ($rootScope.isOpenPopup) {
                //    $('#BangLuongEditPopup').collapse("hide");
                //    $rootScope.isOpenPopup = false;
                //}
            },
        };
        //end HOT-KEY

        vm.data = {};

        vm.controllerId = {
            ReportTheoBangLuong: 'ReportTheoBangLuongCtrl',
        }

        vm.onInitView = function (config) {
            if (config && config.userInfo) {
                $http.defaults.headers.post.Authorization = 'Bearer ' + config.userInfo.ApiToken;
                //console.log("Main CTRL" + config.userInfo);
            }
        }

        activate();

        function activate() {
            catchReportTheoBangLuongEvent();
        }

        function catchReportTheoBangLuongEvent() {
            $scope.$on(vm.controllerId.ReportTheoBangLuong + '.action.xemBangLuong', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BangLuongEditPopup + '.action.xemBangLuong', data);
                $rootScope.isOpenPopup = true;
                $('#BangLuongEditPopup').collapse('show');
            });
        }
    }
})();
