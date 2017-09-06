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
                
            },

            //press F2 -> open popup
            F2: function (name, code) {
                if (!$rootScope.isOpenPopup) {

                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    if (!$rootScope.isOpenSearchPanel) {
                        $('#panelTimkiemCollapse').collapse("show");
                        $rootScope.isOpenSearchPanel = true;
                    }
                    else {
                        $('#panelTimkiemCollapse').collapse("hide");
                        $rootScope.isOpenSearchPanel = false;
                    }
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    if ($rootScope.isOpenSearchPanel) {
                        $rootScope.$broadcast(vm.controllerId.KhoXuatNhapTonFilter + '.action.callSearch', 0);
                    }
                }
                else {
                    $rootScope.$broadcast(vm.controllerId.KhoXuatNhapTonEditCtrl + '.action.callSave', 0);
                }
            }
        };
        //end HOT-KEY

        vm.data = {};

        vm.action = {

        };

        vm.controllerId = {
            KhoXuatNhapTonFilter: 'KhoXuatNhapTonFilterCtrl',
            KhoXuatNhapTonList: 'KhoXuatNhapTonListCtrl',
            KhoKhoHangListPopup: 'KhoKhoHangListPopup'

        }

        vm.onInitView = function (config) {
            if (config && config.userInfo) {
                $http.defaults.headers.post.Authorization = 'Bearer ' + config.userInfo.ApiToken;
                //console.log("Main CTRL" + config.userInfo);
            }
            KhoKhoHangListPopupEvent();
        }

        activate();

        function activate() {
            catchKyFilterEvent();
        }

        function KhoKhoHangListPopupEvent() {
            $scope.$on(vm.controllerId.KhoKhoHangListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.KhoXuatNhapTonFilter + '.data.listKhoHang', v);
                $('#' + vm.controllerId.KhoKhoHangListPopup).collapse('hide');
            });
        }

        function catchKyFilterEvent() {
            $scope.$on(vm.controllerId.KhoXuatNhapTonFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.KhoXuatNhapTonList + '.action.get-filters', data);
            });

        }

    }
})();
