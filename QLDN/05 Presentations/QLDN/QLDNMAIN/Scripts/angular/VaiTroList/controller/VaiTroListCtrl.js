(function () {
    'use strict';

    angular.module('app')
           .controller('VaiTroListCtrl', VaiTroListCtrl)
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
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY

    function VaiTroListCtrl($scope, $rootScope, VaiTroService, $window, utility, ExcelExport, $timeout, $http) {
        var vm = this;
        var controllerId = 'VaiTroListCtrl';
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                if ($rootScope.isOpenPopup) {
                    $('#popupThemNguoiDung').collapse("hide");
                    $rootScope.isOpenPopup = false;
                }
            },

            //press F2 -> open popup
            F2: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    $('#popupThemNguoiDung').collapse("show");
                    $rootScope.isOpenPopup = true;
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {                    
                    find($scope.search);                    
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    $rootScope.isOpenPopup = true;
                }
            }
        };
        //end HOT-KEY

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            keyCode: null
        };

        vm.data = {
            dsVaiTro: [],
            objVaiTro: {}
        };

        vm.action = {
            UserLoginId: '',
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            excel: excel,
            print:print,
            add: add,
            resetEdit: resetEdit,
            update: update,
            getAll: getAll,
            find: find,
            getById: getById,
            insert: insert,
            remove: remove,
            closeEdit: closeEdit,
            edit: edit,
            apDung: apDung
        };

        $scope.$watch('VaiTroId', function () {
            getById($rootScope.VaiTroId);
        });

        $rootScope.$on('vaitroctrl.list.refresh', function (event) {
            find($scope.search);
        });

        activate();
        vm.onInitView = onInitView;
        function onInitView(config) {
            debugger
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
            }
        }
        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoaChon = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {

                }
            }
        }
        function excel(tableId) {            
            var exportHref = ExcelExport.tableToExcel(tableId, 'VaiTro');
            $timeout(function () { location.href = exportHref; }, 100); 
        }

        function print(printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            var css = '<style>';
            css+='table, td, th {border: 1px solid #ddd; text-align: left; } ';
            css += 'table { border-collapse: collapse; width: 100%;}';
            css += ' th, td { padding: 15px;}';
            css+='</style>';
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /> ' + css +'</head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        };

    

        function activate() {
            $('#popupThemNguoiDung').on('hidden.bs.collapse', function () {
                $rootScope.VaiTroId = 0;
                $scope.$digest();
            });
            find('');
        }
        function apDung() {
            debugger
            var selectedListVaiTro = new Array();
            for (var i = 0; i < vm.data.dsVaiTro.length; i++) {
                if (vm.data.dsVaiTro[i].isSelected) {
                    selectedListVaiTro.push(vm.data.dsVaiTro[i]);
                }
            }
            emitApDung(selectedListVaiTro);
        }
        function emitApDung(data) {
            debugger
            $rootScope.$broadcast(controllerId+'.action.ap-dung', data);
        }

        function edit(id) {
            $rootScope.VaiTroId = id;
        }

        function add() {
            $rootScope.VaiTroId = 0;
        }

        function resetEdit(id) {
            getById(id);
        };

        function closeEdit() {
            $('#popupThemNguoiDung').collapse("hide");
        }

        function getById(id) {
            vm.status.isLoadingEdit = true;

            vm.data.objVaiTro = {};

            if (id && id > 0) {
                VaiTroService.getById(id).then(function (result) {
                    if (result.data) {
                        vm.data.objVaiTro = result.data;
                    } else {
                        vm.data.objVaiTro = {};
                    }
                    vm.status.isLoadingEdit = false;
                }, function (error) { vm.status.isLoadingEdit = false; });
            } else {
                vm.status.isLoadingEdit = false;
            }
        }

        function insert(obj) {
            VaiTroService.insert(obj).then(function (result) {
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                    $rootScope.$emit('vaitroctrl.list.refresh');
                }
                closeEdit();
            }, function (error) {
                if (error.data) {
                    alert(error.data.Message);
                }
            });
        }

        function update(obj) {
            VaiTroService.update(obj).then(function (result) {
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                    $rootScope.$emit('vaitroctrl.list.refresh');
                }
                closeEdit();
            });
        }

        function remove(id) {
            if (confirm('Bạn có muốn xóa?')) {
                VaiTroService.remove(id).then(function (result) {
                    if (result.data) {
                        find($scope.search);
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        }

        function getAll() {
            VaiTroService.getAll().then(function (result) {
                if (result.data)
                    vm.data.dsVaiTro = result.data;
            });
        }

        function find(text) {

            vm.status.isLoadingList = true;
            VaiTroService.findAll(text).then(function (result) {
                if (result.data) {
                    vm.data.dsVaiTro = result.data;
                }
                vm.status.isLoadingList = false;
            }, function (error) {
                console.log(error);
            });
        }
    }
})();