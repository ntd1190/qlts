(function () {
    'use strict';

    angular.module("app")
        .service('KhoKhoHangListPopupService', service)
        .controller("KhoKhoHangListPopupCtrl", controller);

    function controller($scope, KhoKhoHangListPopupService, utility) {
        /*** PRIVATE ***/
        var vm = this;
        var _tableState;
        var listQuyenTacVu;
        var userInfo;

        /*** VIEW MODEL ***/
        vm.controllerId = 'KhoKhoHangListPopupCtrl';
        vm.title = 'Danh sách kho hàng';

        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;
        vm.status.showTable = false;
        vm.status.isSelectOne = true;

        vm.data = {};
        vm.data.searchString = '';
        vm.data.listKhoHang = [];

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.apDung = function () {
            var data = {};
            data.listKhoHang = getSelectedList(vm.data.listKhoHang);
            emitApDung(data);
        };

        vm.action.search = function () {
            if (vm.status.showTable) {
                getPage(_tableState);
                _tableState.pagination.start = 0;
            } else {
                vm.status.showTable = true;
            }
        };

        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listKhoHang);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listKhoHang, !vm.status.isSelectedAll);
        };



        /*** INIT FUNCTION ***/

        activate();
        function activate() { }
        vm.onInitView = function (config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (config && config.title) {
                vm.title = config.title;
            }
            if (config) {
                vm.status.showTable = config.showTable;
            }
            if (config) {
                vm.status.isSelectOne = config.isSelectOne;
            }

            initEventListener();
        };

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                getPage(_tableState);
            });

            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
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

        // load danh sách kho
        function getPage(tableState) {
            vm.status.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = utility.initTableState(tableState);
                _tableState = tableState;
            }

            var data = {};
            data.draw = tableState.draw + 1 || 1;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.;
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.;
            data.sortName = tableState.sort.predicate || 'KHO_ID';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.fields = '';
            data.search = vm.data.searchString;
            data.loginId = userInfo ? userInfo.NhanVienId : 0;

            KhoKhoHangListPopupService.getPage(data).then(function (result) {
                console.log(result);

                vm.status.isLoading = false;
                if (result.data.data) {
                    delete vm.data.listKhoHang;
                    vm.data.listKhoHang = result.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(result.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
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
    }

    function service($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'api.QLKho/KhoKhoHang/';
        api.GetPage = 'GetListKhoKhoHangPopupByCriteria';

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
    }
})();