(function () {
    'use strict';

    angular.module("app")
        .controller("ChucNangListCtrl", controller);

    function controller($rootScope, $scope, ChucNangService) {
        var vm = this;
        var _tableState = {};
        vm.data = {
            ChucNangList: [],
            ChucNangListDisplay: [],
            ChucNangSelected: [],
            isLoading: false,
            searchString: ''
        };

        vm.action = {
            alert: alert,
            edit: edit,
            add: add,
            getPage: getPage,
            deleteSelected: deleteSelected,
        };


        activate();

        function activate() {
            eventAutoReload();
        }

        function eventAutoReload() {
            $scope.$on('sa.qldnmain.chucnang.list.reload', function (event) {
                getPage(_tableState);
            });
        }

        function deleteSelected() {
            if (!confirm('Xóa các chức năng đã chọn ???')) { return; }

            vm.data.isLoading = true;

            var chucNangSelected = new Array();

            for (var i = 0; i < vm.data.ChucNangListDisplay.length; i++) {
                var chucnang = vm.data.ChucNangListDisplay[i];
                if (chucnang.isSelected) {
                    chucNangSelected.push(chucnang.ChucNangId);
                }
            }
            var ids = chucNangSelected.join(',');

            ChucNangService.removeList(ids).then(function (success) {
                console.log(success);
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
            }, function (error) {
                console.log(error);
                vm.data.isLoading = false;
            });

        }

        function getPage(tableState) {
            vm.data.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;

            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'ChucNangId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = 'ChucNangId,MaChucNang,TenChucNang,MoTa';
            ChucNangService.getPage(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                console.log(success);
                if (success.data.metaData.draw == draw && success.data.data) {
                    vm.data.ChucNangListDisplay = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                }
                vm.data.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
            });
        }

        function initTableState(tableState) {
            tableState = tableState || {};

            tableState.draw = tableState.draw || 0;

            tableState.pagination = tableState.pagination || {};
            tableState.pagination.numberOfPages = tableState.pagination.numberOfPages || 0;
            tableState.pagination.start = tableState.pagination.start || 0;
            tableState.pagination.number = tableState.pagination.number || 10;

            tableState.sort = tableState.sort || {};
            tableState.sort.predicate = '';
            tableState.sort.reverse = false;

            return tableState;
        }

        function add() {
            $rootScope.ChucNangId = 0;
            $('#ChucNangEditPopup').collapse('show');
        }

        function edit(id) {

            $rootScope.$broadcast('ChucNangEditCtrl.chucNangId', id);
            $('#ChucNangEditPopup').collapse('show');
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }

    }
})();