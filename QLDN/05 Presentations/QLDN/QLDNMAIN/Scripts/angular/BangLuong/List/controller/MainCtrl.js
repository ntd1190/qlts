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
            //press ESC -> close popup
            ESC: function (name, code) {
                //alert("ESC");
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },

            //press F2 -> open popup
            F2: function (name, code) {
                //alert("Nghi Phep List F2");
                if (!$rootScope.isOpenPopup) {

                    // phai check quyen New
                    $rootScope.$broadcast(vm.controllerId.BangLuongList + '.action.callOpenAddPopup', 0);
                    
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                //alert("Nghi Phep List F3");
                if (!$rootScope.isOpenPopup) {
                    if (!$rootScope.isOpenSearchPanel)
                    {
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
                //alert("Nghi Phep List F8");
                if (!$rootScope.isOpenPopup) {
                    if ($rootScope.isOpenSearchPanel) {
                        $rootScope.$broadcast(vm.controllerId.BangLuongFilter + '.action.callSearch', 0);
                    }
                }
                else {
                    // phai check quyen Modify
                    $rootScope.$broadcast(vm.controllerId.BangLuongEditPopup + '.action.callSave', 0);
                }
            }
        };
        //end HOT-KEY

        vm.data = {};

        vm.action = {
            tinhToanToanBo: tinhToanToanBo,
        };

        vm.controllerId = {
            BangLuongFilter: 'BangLuongFilterCtrl',
            BangLuongList: 'BangLuongListCtrl',
            BangLuongEditPopup: 'BangLuongEditPopupCtrl',
            NhanVienListPopup: 'NhanVienListPopupCtrl',

        }

        vm.onInitView = function (config) {
            if (config && config.userInfo) {
                $http.defaults.headers.post.Authorization = 'Bearer ' + config.userInfo.ApiToken;
                //console.log("Main CTRL" + config.userInfo);
            }
        }

        activate();

        function activate() {
            catchBangLuongFilterEvent();
            catchBangLuongListEvent();
            catchBangLuongEditPopupEvent();
            catchNhanVienListPopupEvent();

        }

        function catchBangLuongFilterEvent() {
            $scope.$on(vm.controllerId.BangLuongFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BangLuongList + '.action.get-filters', data);
            });

        }

        function catchBangLuongListEvent() {
            $scope.$on(vm.controllerId.BangLuongList + '.action.xemBangLuong', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BangLuongEditPopup + '.action.xemBangLuong', data);
                $rootScope.isOpenPopup = true;
                $('#BangLuongEditPopup').collapse('show');
            });
        }

        function catchBangLuongEditPopupEvent() {
            $scope.$on(vm.controllerId.BangLuongEditPopup + '.action.save', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BangLuongList + '.action.refresh', data);
                $rootScope.isOpenPopup = false;
                $('#BangLuongEditPopup').collapse('hide');
            });

            $scope.$on(vm.controllerId.BangLuongEditPopup + '.action.closeEdit', function (event, data) {
                $rootScope.isOpenPopup = false;
                $('#BangLuongEditPopup').collapse('hide');
            });
        }

        function catchNhanVienListPopupEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BangLuongList + '.action.callTinhToan', data);
                $('#NhanVienListPopup').collapse('hide');
            });
        }

        function tinhToanToanBo() {
            $scope.$on(vm.controllerId.NhanVienListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.BangLuongList + '.action.callTinhToan', data);
                $('#NhanVienListPopup').collapse('hide');
            });
        }
    }
})();
