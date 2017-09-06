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
                    $rootScope.$broadcast(vm.controllerId.NghiPhepList + '.action.callOpenAddPopup', 0);
                    
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
                        $rootScope.$broadcast(vm.controllerId.NghiPhepFilter + '.action.callSearch', 0);
                    }
                }
                else {
                    // phai check quyen Modify
                    $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.action.callSave', 0);
                }
            }
        };
        //end HOT-KEY

        vm.data = {};

        vm.controllerId = {
            NghiPhepFilter: 'NghiPhepFilterCtrl',
            NghiPhepList: 'NghiPhepListCtrl',
            NghiPhepEditPopup: 'NghiPhepEditPopupCtrl',
            NhanVienListPopup: 'NhanVienListPopupCtrl',
            NhanVienListPopup2: 'NhanVienListPopup2Ctrl',
            NhanVienListPopup3: 'NhanVienListPopup3Ctrl',
            LoaiNghiPhepListPopup: 'LoaiNghiPhepListPopupCtrl',
            LoaiNghiPhepListPopup2: 'LoaiNghiPhepListPopup2Ctrl',
            TuyChonCotPopup: 'TuyChonCotPopup',

        }

        vm.onInitView = function (config) {
            if (config && config.userInfo) {
                $http.defaults.headers.post.Authorization = 'Bearer ' + config.userInfo.ApiToken;
                //console.log("Main CTRL" + config.userInfo);
            }
        }

        activate();

        function activate() {
            catchNghiPhepFilterEvent();
            catchNghiPhepListEvent();
            catchNhanVienListPopupEvent();
            catchNhanVienListPopup2Event();
            catchNhanVienListPopup3Event();
            catchLoaiNghiPhepListPopupEvent();
            catchLoaiNghiPhepListPopup2Event();
            catchNghiPhepEditPopupEvent();
            catchTuyChonCotPopupEvent();
        }

        function catchNghiPhepFilterEvent() {
            $scope.$on(vm.controllerId.NghiPhepFilter + '.action.filters', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepList + '.action.get-filters', data);
            });

        }

        function catchNghiPhepListEvent() {
            $scope.$on(vm.controllerId.NghiPhepList + '.action.xemNghiPhep', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.action.xemNghiPhep', data);
                $rootScope.isOpenPopup = true;
                $('#NghiPhepEditPopup').collapse('show');
            });
        }

        function catchNghiPhepEditPopupEvent() {
            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.save', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepList + '.action.refresh', data);
                $rootScope.isOpenPopup = false;
                $('#NghiPhepEditPopup').collapse('hide');
            });

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.closeEdit', function (event, data) {
                $rootScope.isOpenPopup = false;
                $('#NghiPhepEditPopup').collapse('hide');
            });

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.getInfoBanGiao', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienListPopup2 + '.action.getInfo', data);
            });

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.getInfoYeuCau', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienListPopup3 + '.action.getInfo', data);
            });

            $scope.$on(vm.controllerId.NghiPhepEditPopup + '.action.getInfoLoaiNghiPhep', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.LoaiNghiPhepListPopup2 + '.action.getInfo', data);
            });
        }

        function catchNhanVienListPopup2Event() {

            $scope.$on(vm.controllerId.NhanVienListPopup2 + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiBanGiao', data);
                $('#NhanVienListPopup2').collapse('hide');
            });

            $scope.$on(vm.controllerId.NhanVienListPopup2 + '.data.listInfo', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiBanGiao', data);
                //console.log('.data.listNguoiBanGiao');
                //console.log(data);
                $('#NhanVienListPopup2').collapse('hide');
            });


            $('#NhanVienListPopup2').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopup2 + '.action.get-filters', { searchString: '' });
            });
        }

        function catchNhanVienListPopup3Event() {

            $scope.$on(vm.controllerId.NhanVienListPopup3 + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiYeuCau', data);
                $('#NhanVienListPopup3').collapse('hide');
            });

            $scope.$on(vm.controllerId.NhanVienListPopup3 + '.data.listInfo', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listNguoiYeuCau', data);
                //console.log('.data.listNguoiYeuCau');
                //console.log(data);
                $('#NhanVienListPopup3').collapse('hide');
            });

            $('#NhanVienListPopup3').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopup3 + '.action.get-filters', { searchString: '' });
            });
        }

        function catchNhanVienListPopupEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepFilter + '.data.listNguoiDuyet', data);
                $('#NhanVienListPopup').collapse('hide');
            });

            $('#NhanVienListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopup + '.action.get-filters', { searchString: '' });
            });

        }

        function catchLoaiNghiPhepListPopup2Event() {
            $scope.$on(vm.controllerId.LoaiNghiPhepListPopup2 + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listLoaiNghiPhep', data);
                $('#LoaiNghiPhepListPopup2').collapse('hide');
            });

            $scope.$on(vm.controllerId.LoaiNghiPhepListPopup2 + '.data.listInfo', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepEditPopup + '.data.listLoaiNghiPhep', data);
                //console.log('.data.listLoaiNghiPhep');
                //console.log(data);
                $('#LoaiNghiPhepListPopup2').collapse('hide');
            });
        }

        function catchLoaiNghiPhepListPopupEvent() {
            $scope.$on(vm.controllerId.LoaiNghiPhepListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepFilter + '.data.listLoaiNghiPhep', data);
                $('#LoaiNghiPhepListPopup').collapse('hide');
            });
        }

        function catchTuyChonCotPopupEvent() {
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NghiPhepList + '.action.refresh', data);
                $('#TuyChonCotPopup').collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });
        }
    }
})();
