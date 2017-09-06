(function () {
    'use strict';

    var module = angular.module("app");

    module.controller("TrangThaiListPopupCtrl", function ($scope, TrangThaiPopupService, utility) {

        /*** PRIVATE ***/

        var vm = this;
        var _tableState;
        var userInfo;
        var chucNang;

        /*** VIEW MODEL ***/

        vm.controllerId = 'TrangThaiListPopupCtrl';
        vm.title = 'Danh sách trạng thái';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;
        vm.status.isSelectOne = true;

        vm.data = {};
        vm.data.searchString = '';
        vm.data.listTrangThai = [];
        vm.data.listCot = [
            { MaCot: 'MaTrangThai', TenCot: 'Mã', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TrangThai', TenCot: 'Tên', HienThiYN: true, DoRong: 0 },
        ];

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.apDung = function () {
            var data = {};
            data.listTrangThai = getSelectedList(vm.data.listTrangThai);
            emitApDung(data);
        };

        vm.action.search = function () {
            if (vm.status.showTable) {
                getPage();
            } else {
                vm.status.showTable = true;
            }
        };

        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listTrangThai);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listTrangThai, !vm.status.isSelectedAll);
        };

        vm.action.selectedItem = function (item) {
            var data = {};
            data.listTrangThai = [item];
            emitApDung(data);
        }

        /*** INIT FUNCTION ***/

        activate();
        function activate() { }
        vm.onInitView = function (config) {
            if (!config) { return; }

            vm.controllerId = config.controllerId || vm.controllerId;
            vm.title = config.title || vm.title;
            vm.status.showTable = config.showTable || false;
            vm.status.isSelectOne = config.isSelectOne || false;
            chucNang = config.chucNang || '';

            if (config.userInfo) {
                userInfo = config.userInfo;
            }
            refresh();
            initEventListener();
        };

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                getPage();
            });

            $scope.$on(vm.controllerId + '.action.ESC', function (e, v) {
                $('#' + vm.controllerId).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                    refresh();
                });
            });
        }

        function emitApDung(data) {
            $scope.$emit(vm.controllerId + '.action.ap-dung', data);
        }

        /*** BIZ FUNCTION ***/

        // lấy ra các item được chọn
        function getSelectedList(list) {
            var selectedList = [];

            for (var i = 0; i < list.length; i++) {
                if (list[i].isSelected) {
                    selectedList.push(utility.clone(list[i]));
                }
            }

            return selectedList;
        }

        /* tự đông check / uncheck checkAll */
        function autoCheckAll(list) {
            if (!list || list.length === 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                if (!list[i].isSelected) {
                    return false;
                }
            }

            return true;
        }

        /* checkAll / uncheckAll */
        function checkAll(list, isSelected) {
            if (!list || list.length === 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                list[i].isSelected = isSelected;
            }
            return isSelected;
        }
        function refresh() {
            getPage();
        }
        /*** CALL API FUNCTION ***/

        // load danh sách kho
        function getPage() {
            vm.status.isLoading = true;
            var data = {};

            data.chucNang = chucNang;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            TrangThaiPopupService.getPage(data).then(function (result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.data.data) {
                    delete vm.data.listTrangThai;
                    vm.data.listTrangThai = result.data.data;
                }
            }, function (result) {
                console.log(result);
                vm.status.isLoading = false;
                if (result.data.error !== null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);

                }
            });
        }
    });

    module.service('TrangThaiPopupService', function ($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'api.QLKHO/KhoTrangThai/';
        api.GetPage = 'GetListTrangThaiPopupByChucnang';

        return {
            getPage: function (data) {
                var url = api.url + api.GetPage;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                };

                return $http(req);
            }
        };
    });

})();