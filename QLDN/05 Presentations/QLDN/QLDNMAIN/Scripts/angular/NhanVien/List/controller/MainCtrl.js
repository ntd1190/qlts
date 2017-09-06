(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl)
        .directive("keyboard", keyboard);        //HOT-KEY


    function MainCtrl($scope, $rootScope, $http) {
        var linkUrl = '';
        var vm = this;
        var listQuyenTacVu;
        vm.data = {};

        vm.controllerId = {
            NhanVienFilter: 'NhanVienFilterCtrl',
            NhanVienList: 'NhanVienListCtrl',
            NhanVienEditPopup: 'NhanVienEditPopupCtrl',
            NhanVienListPopup: 'NhanVienListPopupCtrl',
            PhongBanListPopup: 'PhongBanListPopup',
            DuAnListPopup: 'DuAnListPopup',
            ChucVuListPopup: 'ChucVuListPopup',
            TuyChonCotPopup: 'TuyChonCotPopup',
        }

        vm.action = {
            checkQuyenTacVu: checkQuyenTacVu,
        }

        vm.onInitView = function (config) {
            console.log(config);
            if (config && config.url) {
                linkUrl = config.url;
            }

            if (config && config.userInfo) {
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }


            catchNhanVienListEvent();
            catchNhanVienListPopupEvent();
            catchNhanVienEditEvent();
            catchNhanVienFilterEvent();
            catchPhongBanListPopupEvent();
            catchDuAnListEvent();
            catchChucVuListEvent();
            catchTuyChonCotPopupEvent();
        }

        activate();

        function activate() {
        }

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
                //alert("F2");
                if (checkQuyenTacVu('N')) {
                    window.location.href = linkUrl + 'create';
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                $('#panelTimkiemCollapse').collapse('toggle');
            },

            //press F8 -> search
            F8: function (name, code) {
                //alert("F8");
                $rootScope.$broadcast(vm.controllerId.NhanVienFilter + '.action.callSearch', 0);
            },
        };
        //end HOT-KEY

        // bắt các sự kiện của popup tùy chon cột
        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $scope.$on(vm.controllerId.TuyChonCotPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienList + '.action.refresh');
                $('#' + vm.controllerId.TuyChonCotPopup).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.TuyChonCotPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast(vm.controllerId.TuyChonCotPopup + '.action.refresh');
                });
            });

        }

        function catchNhanVienListEvent() {
            $scope.$on(vm.controllerId.NhanVienList + '.action.xemNhanVien', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienEditPopup + '.action.xemNhanVien', data);
                $('#ThongTinNhanVienPopup').collapse('show');
            });
        }

        function catchNhanVienListPopupEvent() {
            $scope.$on(vm.controllerId.NhanVienListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienFilter + '.data.listNhanVien', data);
                $('#NhanVienListPopup').collapse('hide');
            });

            $('#NhanVienListPopup').on('show.bs.collapse', function () {
                $scope.$broadcast(vm.controllerId.NhanVienListPopup + '.action.get-filters', { searchString: '' });
            });
        }

        function catchPhongBanListPopupEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienFilter + '.data.listPhongBan', data);
                $('#PhongBanListPopup').collapse('hide');
            });
        }

        function catchNhanVienFilterEvent() {
            $scope.$on(vm.controllerId.NhanVienFilter + '.action.filters', function (event, data) {
                $scope.$broadcast(vm.controllerId.NhanVienList + '.action.get-filters', data);
            });

        }

        function catchNhanVienEditEvent() {
            $scope.$on(vm.controllerId.NhanVienEditPopup + '.action.saveNhanVien', function (event) {
                $rootScope.$broadcast(vm.controllerId.NhanVienList + '.action.refresh');
                $('#ThongTinNhanVienPopup').collapse('hide');
            });
        }

        function catchDuAnListEvent() {
            $scope.$on(vm.controllerId.DuAnListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienFilter + '.data.listDuAn', data);
                $rootScope.$broadcast('sa.qldnmain.duan.list.reload');
                $('#DuAnListPopup').collapse('hide');
            });

        }
        function catchChucVuListEvent() {
            $scope.$on(vm.controllerId.ChucVuListPopup + '.action.ap-dung', function (event, data) {
                $rootScope.$broadcast(vm.controllerId.NhanVienFilter + '.data.listChucVu', data);
                $rootScope.$broadcast(vm.controllerId.ChucVuListPopup + '.action.reload');
                $('#ChucVuListPopup').collapse('hide');
            });

        }

        /* kiểm tra quyền tác vụ */
        function checkQuyenTacVu(quyen) {
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }
    }

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

})();
