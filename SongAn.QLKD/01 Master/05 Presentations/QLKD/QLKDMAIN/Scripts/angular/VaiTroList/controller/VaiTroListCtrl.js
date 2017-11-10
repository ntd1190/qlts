(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'vaiTroList',
            url: '/vaitro/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: vaiTroListCtrl
        });
    });

    function vaiTroListCtrl($stateParams, SETTING, $scope, $rootScope, VaiTroService, $window, utility, ExcelExport, $timeout, $http, $q) {
        var vm = this;

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
                    $("#txtMa").focus();
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
            isInValidMa: false,
            isInValidTen: false,
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
            print: print,
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
            apDung: apDung,
            save: save,
            keyPress: keyPress,
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
            config = config || {};

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
            }

            initEventListener();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'vaitro/showView?viewName=list';
        }

        function setEnableButton() {
            vm.data.showButtonNew = false;
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                    vm.data.showButtonSave = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoaChon = true;
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = true;
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
            css += 'table, td, th {border: 1px solid #ddd; text-align: left; } ';
            css += 'table { border-collapse: collapse; width: 100%;}';
            css += ' th, td { padding: 15px;}';
            css += '</style>';
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /> ' + css + '</head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        };

        function initEventListener() {
            $('#popupThemNguoiDung').on('hidden.bs.collapse', function () {
                VaiTroId = 0;
            });
            $('#popupThemNguoiDung').on('shown.bs.collapse', function () {
                $("#txtMa").focus();
            });
        }

        function activate() {
            $('#popupThemNguoiDung').on('hidden.bs.collapse', function () {
                $rootScope.VaiTroId = 0;
                $scope.$digest();
            });
            find('');
        }

        function apDung() {
            var selectedListVaiTro = new Array();
            for (var i = 0; i < vm.data.dsVaiTro.length; i++) {
                if (vm.data.dsVaiTro[i].isSelected) {
                    selectedListVaiTro.push(vm.data.dsVaiTro[i]);
                }
            }
            emitApDung(selectedListVaiTro);
        }

        function emitApDung(data) {
            $rootScope.$broadcast(controllerId + '.action.ap-dung', data);
        }

        function edit(id) {
            $rootScope.VaiTroId = id;
        }

        function add() {
            $rootScope.VaiTroId = 0;
        }

        function resetEdit(id) {
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;

            getById(id);
        };

        function closeEdit() {
            vm.status.isInValidMa = false;
            vm.status.isInValidTen = false;

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

        function save(obj) {

            vm.status.isInValidMa = utility.checkInValid(obj.MaVaiTro, 'isCode');
            if (vm.status.isInValidMa) {
                $window.document.getElementById('txtMa').focus();
                alert("Mã người dùng: gồm các chữ cái và chữ số")
                return;
            }

            vm.status.isInValidTen = utility.checkInValid(obj.TenVaiTro, 'isEmpty');
            if (vm.status.isInValidTen) {
                $window.document.getElementById('txtTen').focus();
                return;
            }
            //end check

            if (obj.VaiTroId != null && obj.VaiTroId != undefined && obj.VaiTroId && obj.VaiTroId != '') {
                update(obj);
            }
            else {
                insert(obj);
            }
        }

        function insert(obj) {
            VaiTroService.insert(obj).then(function (result) {
                if (result.data) {
                    vm.data.objVaiTro = result.data;
                    find('');
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
                    find('');
                }
                closeEdit();
            });
        }

        function remove(id) {
            if (confirm('Bạn có muốn xóa?')) {
                VaiTroService.remove(id).then(function (result) {
                    if (result.data) {
                        find('');
                        vm.data.dsVaiTro = {};
                        closeEdit();
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
        //-------------------------------------------------------------------------------------------------

        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMa') {
                    vm.status.isInValidMa = utility.checkInValid(value, 'isCode');
                    if (!vm.status.isInValidMa) {
                        //set focus for the next input
                        $window.document.getElementById(ToId).focus();
                    }
                }
                else if (fromId == 'txtTen') {
                    vm.status.isInValidTen = utility.checkInValid(value, 'isEmpty');
                    if (!vm.status.isInValidTen) {
                        //set focus for the next input
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }
    }
})(); 