(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoaiNghiPhepListCtrl', LoaiNghiPhepListCtrl);

    function LoaiNghiPhepListCtrl($rootScope, $scope, LoaiNghiPhepService) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'LoaiNghiPhepListCtrl';
        var _tableState;

        var error = {
            code: 0
        };


        var inputSearch = {
            searchString: '',
           
        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            error: error,
            listLoaiNghiPhep: [],
            inputSearch: inputSearch,
        };

        vm.action = {
            getLoaiNghiPhepInfo: getLoaiNghiPhepInfo,
            getPage: getPage,
            apDung: apDung
        };

        vm.onInitView = onInitView;

        activate();
        function activate() { }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }
            initEventListener();
        }

        /* ===========================
         * FUNCTION
         */

        function getFilter(data) {

            if (data && data.searchString) {
                inputSearch.searchString = data.searchString;
            }

            console.log(inputSearch);
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
            var sortName = tableState.sort.predicate || '';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = inputSearch.searchString;
            var fields = '';
    

            LoaiNghiPhepService.getFilter(draw, start, number, searchString, sortName, sortDir, fields

                ).then(function (success) {
                    
                    console.log(success);

                if (success.data.metaData.draw == draw && success.data.data) {
                    clearArray(vm.data.listLoaiNghiPhep);
                    while (success.data.data.length) {
                        vm.data.listLoaiNghiPhep.push(success.data.data.shift());
                    }
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                }
                vm.data.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.data.error.message = error.data.error.message;
                vm.data.isLoading = false;
            });
        }

        function strJoin(arrayObj, propertyName, joinChar) {
            var arrayProperty = new Array();
            for (var i = 0; i < arrayObj.length; i++) {
                arrayProperty.push(arrayObj[i][propertyName]);
            }
            return arrayProperty.join(joinChar);
        }

        function fillData(data,listNameInData, inputSearchList) {

            clearArray(inputSearchList);

            if (data && data[listNameInData]) {
                while (data[listNameInData].length) {
                    inputSearchList.push(data[listNameInData].shift());
                }
            }
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

        function apDung() {
            var sourceList = vm.data.listLoaiNghiPhep;
            var selectedList = new Array();
            for (var i = 0; i < sourceList.length; i++) {
                if (sourceList[i].isSelected) {
                    selectedList.push(sourceList[i]);
                }
            }
            emitApDung(selectedList);
        }

        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                getFilter(data);
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getLoaiNghiPhepInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }

        function emitApDung(data) {
            $scope.$emit(controllerId + '.action.ap-dung', data);
        }

        function getLoaiNghiPhepInfo(ma) { // ma = PHEPNAM|THAISAN
            var list = [];

            if (!ma) { return list; }

            var _ma = (ma + '').split('|');

            if (_ma && _ma.length) {
            } else return list;


            LoaiNghiPhepService.GetByMaLoaiNghiPhep(_ma[0]
                ).then(function (success) {
                    if (success.data.data) {
                        while (success.data.data.length) {
                            list.push(success.data.data.shift());
                        }
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });

            return list;
        }

        /* =====================================
         * Utility
         */
        function clearArray(array) {
            while (array.length) {
                array.pop();
            }
        }
    }
})();
