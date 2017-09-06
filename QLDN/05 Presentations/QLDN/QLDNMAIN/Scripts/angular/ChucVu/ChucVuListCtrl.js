(function () {
    'use strict';

    angular.module("app")
        .controller("ChucVuListCtrl", controller);

    function controller($rootScope, $scope, ChucVuService) {
        var vm = this;
        var controllerId = 'ChucVuListCtrl';
        var _tableState = {};
        vm.data = {
            ChucVuListDisplay: [],
            isLoading: false,
            searchString: ''
        };

        vm.action = {
            getPage: getPage,
            apDung: apDung,
        };

        vm.onInitView = onInitView;
        activate();

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function activate() { }

        function initEventListener() {
            $scope.$on(controllerId + '.action.reload', function (event) {
                getPage(_tableState);
            });
        }

        function getPage(tableState) {
            vm.data.isLoading = true;

            /* khởi tạo và lưu trạng thái table */
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
            var sortName = tableState.sort.predicate || 'ChucVuId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = 'ChucVuId,MaChucVu,TenChucVu';

            ChucVuService.getPage(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.metaData.draw == draw && success.data.data) {
                    vm.data.ChucVuListDisplay = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                //if (error.data.error != null) {
                //    alert(error.data.error.message);
                //} else {
                //    alert(error.data.Message);

                //}
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

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }

        function apDung() {
            var selectedList = new Array();
            var ChucVuListDisplay = vm.data.ChucVuListDisplay;
            for (var i = 0; i < ChucVuListDisplay.length; i++) {
                if (ChucVuListDisplay[i].isSelected) {
                    selectedList.push(ChucVuListDisplay[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit(controllerId + '.action.ap-dung', selectedList);
            console.log(controllerId + '.action.ap-dung');
        }
    }
})();