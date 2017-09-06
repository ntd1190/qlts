/*****************************************************************************
1. Create Date : 2017.06.15
2. Creator     : Nguyen Ngoc Tan
3. Description : khophieuchuyen/list
4. History     : 2017.06.15 (Nguyen Ngoc Tan) - tạo mới
*****************************************************************************/
(function () {
    'use strict';
    angular.module('app').controller('KhoDuyetPhieuListCtrl', function ($scope, KhoDuyetPhieuService, utility, TuyChonCotService) {
        /* PRIVATE */

        var vm = this;
        var _tableState;
        var userInfo;
        var linkUrl;
        /* VIEW MODEL */
        vm.controllerId = 'KhoDuyetPhieuListCtrl';
        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectedAll = false;

        vm.filter = {};
        vm.filter.listKhoHang = [];
        vm.filter.listTrangThai = [];
        vm.filter.startDate = moment().format("01/MM/YYYY");
        vm.filter.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
       
        vm.data = {};
        vm.data.listDuyetPhieu = [];
        vm.data.showList= false;
        vm.data.useCotListDb = true;
        vm.data.searchString = moment().format("01/MM/YYYY") + '|' + moment().daysInMonth() + moment().format("/MM/YYYY") + '|||';
        /*** INIT FUNCTION ***/

        (function activate() {
        })();

        vm.onInitView = function (config) {
            console.log(config);
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            initEventListener();
        }

        /*** ACTION FUNCTION ***/
        vm.action = {};
        vm.action.getPage = getPage;
        vm.action.checkQuyenTacVu = checkQuyenUI;
      
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listDuyetPhieu);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listDuyetPhieu, !vm.status.isSelectedAll);
        };

        /*** BROADCAST / EMIT / ON FUNCTION ***/
        function initEventListener() {
            $scope.$on(vm.controllerId + '.data.filter', function (e, v) {
                vm.data.searchString = v;
            });
            $scope.$on(vm.controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });
            $scope.$on(vm.controllerId + '.action.reload', function (e, v) {
                reload();
            });
            $scope.$on(vm.controllerId + '.action.F2', function (e, v) {
                console.log(checkQuyenUI('N'));
                if (checkQuyenUI('N')) {
                    window.location.href = linkUrl + 'create';
                }
            });
        }

        /*** BIZ FUNCTION ***/

        /* tự đông check / uncheck checkAll */
        function autoCheckAll(list) {
            if (!list || list.length == 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                if (list[i].isSelected) {
                } else {
                    return false;
                }
            }

            return true;
        }

        /* checkAll / uncheckAll */
        function checkAll(list, isSelected) {
            if (!list || list.length == 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                list[i].isSelected = isSelected;
            }
            return isSelected;
        }

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            if (userInfo && userInfo.DsQuyenTacVu) {
                return userInfo.DsQuyenTacVu.split(',').indexOf(quyen) >= 0;
            }
            return false;
        }

        // kiểm tra quyền dùng cho code, có thông báo
        function checkQuyenAction(quyen) {

            return false;
        }

        function reload() {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }




        // load thông tin vào vm.filter

        // load danh sách có phân trang
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
            tableState.draw = tableState.draw + 1 || 1;
            debugger
            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.data.searchString;
           
            KhoDuyetPhieuService.getPage(data).then(function success(result) {
                vm.status.isLoading = false;
                if (result && result.data && result.data.data) {
                    delete vm.data.listDuyetPhieu;
                    vm.data.listDuyetPhieu = result.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(result.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }

            }, function error(result) {
                vm.status.isLoading = false;
                console.log(result);
            });
        };
    });
})();