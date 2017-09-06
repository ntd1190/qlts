(function () {
    'use strict';

    angular
        .module('app')
        .controller('DuAnListPopCtrl', DuAnListPopCtrl)


    
    function DuAnListPopCtrl($rootScope, $scope, DuAnService, TuyChonCotService) {
        /* =======================================
         * PRIVATE
         */
        var vm = this;
        $rootScope.isOpenPopup = false;
        $rootScope.IsSelectAll = false;
        var controllerId = 'DuAnListPopCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            searchString:'',
            listDuAn: [],
        
        };

        vm.action = {
            apDung:apDung,
            getPage: getPage,
            search: search,
          
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() {  }

        function search() {
            vm.data.search = "";
            getPage();
        }
        // nhận cấu hình từ giao diện
        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.loadListCot) {
                vm.data.useCotListDb = config.loadListCot;
                loadCotList();
            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }
       
        function reset() {
            vm.data.searchString="";
            getPage();
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
            var sortName = tableState.sort.predicate || 'A.DuAnId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var search = vm.data.search;
            var fields = "";
            debugger
            DuAnService.getPagePop(draw, start, number, sortName, sortDir, fields, searchString).then(function (success) {
                if (success.data.data) {
                    vm.data.listDuAn = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
            });
        }


       

       
        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
         
            $scope.$on(controllerId + '.action.refresh', function (event, data) {
                getPage(
);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                _tableState.pagination.start = 0;
                vm.data.search = data;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getDuAnInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }

        function apDung() {
            var selectedListDuAn = new Array();
            for (var i = 0; i < vm.data.listDuAn.length; i++) {
                if (vm.data.listDuAn[i].isSelected) {
                    selectedListDuAn.push(vm.data.listDuAn[i]);
                }
            }
            emitApDung(selectedListDuAn);
        }
        function emitApDung(data) {
            $scope.$emit(controllerId + '.action.ap-dung', data);
        }

        /* =====================================
         * Utility / Helpers
         */
        function clearArray(array) {
            while (array.length) {
                array.pop();
            }
        }



        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join('|');
            result = result || '';

            return result;
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
    }
})();
