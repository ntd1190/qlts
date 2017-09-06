(function () {
    'use strict';

    angular
        .module('app')
        .controller('TuyChonCotListCtrl', TuyChonCotListCtrl);

    function TuyChonCotListCtrl($rootScope, $scope, TuyChonCotService) {
        /* =======================================
         * PRIVATE
         */
        var _tableState;


        var vm = this;
        vm.controllerId = 'TuyChonCotCtrl';
        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            listCot: [],
            inputSearch: {
                MaForm: ''
            },
        };

        vm.action = {
            getPage: getPage,
            apDung: apDung,
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * setup
         */
        function activate() { }

        function onInitView(config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (config && config.MaForm) {
                vm.data.inputSearch.MaForm = config.MaForm;
            }

            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }

        /**
         * action
         */
        function saveList() {
            vm.data.isLoading = true;
            vm.data.showList = true;

            if (!vm.data.listCot || vm.data.listCot.length < 1) { return; }

            var listSelected = [];

            for (var i = 0; i < vm.data.listCot.length; i++) {
                vm.data.listCot[i].HienThiYN = vm.data.listCot[i].isSelected;
                listSelected.push(vm.data.listCot[i]);
            }

            if (listSelected && listSelected.length > 0) {
                TuyChonCotService.saveListCot(listSelected).then(function (result) {
                    vm.data.isLoading = false;
                    getPage(_tableState);
                }, function (error) {
                    vm.data.isLoading = false;
                });
            }
        }

        function getAll() {
            vm.data.isLoading = true;
            vm.data.showList = true;

            TuyChonCotService.getAll(vm.data.inputSearch.MaForm)
                .then(function (success) {
                    if (success.data.data) {
                        vm.data.listCot = success.data.data;
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.isLoading = false;
                });
        }

        function getPage(tableState) {
            vm.data.isLoading = true;
            vm.data.showList = true;

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

            TuyChonCotService.getPage(draw, start, number, vm.data.inputSearch.MaForm).then(function (success) {
                console.log(success);
                if (success.data.metaData.draw == draw && success.data.data) {
                    vm.data.listCot = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                }
                vm.data.isLoading = false;
            }, function (error) {
                console.log(error);
                vm.data.isLoading = false;
            });
        }

        function apDung() {
            saveList();
            // kiểm tra hoàn tất tiến trình lưu dữ liệu mới emit
            var timer = setInterval(function () {
                if (vm.data.isLoading == false) {
                    console.log('setInterval');
                    clearInterval(timer);
                    $scope.$emit(vm.controllerId + '.action.ap-dung');
                }
            }, 100);
        }

        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.refresh', function (event, data) {
                getAll();
            });
        }
        /* =====================================
         * Utility / Helpers
         */
        function clearArray(array) {
            while (array.length) {
                array.pop(initTableState());
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

    }
})();
