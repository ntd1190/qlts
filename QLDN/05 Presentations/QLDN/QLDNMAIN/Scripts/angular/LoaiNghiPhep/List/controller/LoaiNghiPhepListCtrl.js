(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoaiNghiPhepListCtrl', LoaiNghiPhepListCtrl);


    function LoaiNghiPhepListCtrl($rootScope, $scope, LoaiNghiPhepService, $window, utility) {
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
            ngayTu: '',
            ngayDen: '',
            listLoaiNghiPhep: [],
            listTrangThai: [],
            listNguoiDuyet: [],

        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            error: error,
            listLoaiNghiPhep: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'MaLoaiNghiPhep', TenCot: 'Mã loại nghỉ phép', DoRong: '150px', chon: true },
                { MaCot: 'TenLoaiPhep', TenCot: 'Loại nghỉ phép', DoRong: '200px', chon: true },
                { MaCot: 'SoNgay', TenCot: 'Số ngày nghỉ', DoRong: '150px', chon: true },
                { MaCot: 'GhiChu', TenCot: 'Ghi chú', DoRong: 'auto', chon: true }
            ],
            showList: false,
            useCotListDb: false,
            inputSearch: inputSearch,

            showButtonNew: false,
            showButtonXoaChon: false,
            showButtonTimKiem: false,
        };

        vm.action = {
            checkInValid: utility.checkInValid,
            getPage: getPage,
            add: addLoaiNghiPhep,
            view: viewLoaiNghiPhep,      
            deleteSelected: deleteSelected
        };

        vm.onInitView = onInitView;

        activate();
        function activate() { }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                setEnableButton();
            }

            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }

        /* ===========================
         * FUNCTION
         */

        function loadCotList() {

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

        function addLoaiNghiPhep() {
            $scope.$emit(controllerId + '.action.xemLoaiNghiPhep', 0);
        }

        function viewLoaiNghiPhep(id) {
            $scope.$emit(controllerId + '.action.xemLoaiNghiPhep', id);
        }
      
        function deleteSelected() {
            
            var msg = "";
            var listSelected = new Array();

            for (var i = 0; i < vm.data.listLoaiNghiPhep.length; i++) {
                var loainghiphep = vm.data.listLoaiNghiPhep[i];
                if (loainghiphep.isSelected) {
                    listSelected.push(loainghiphep);
                }
            }

            msg = 'Bạn có muốn xóa các mục đã chọn không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }
                LoaiNghiPhepService.removeList(listSelected).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!');
                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error != null) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.data.Message);
                    }
                });
            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }

        }

        function search(data) {
            getFilter(data);
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        function getFilter(data) {
            inputSearch.searchString = data.searchString == undefined ? '' : data.searchString;
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

            var sortDir = '';
            if (sortName != '')
                sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            var searchString = inputSearch.searchString;
            var fields = '';            

            LoaiNghiPhepService.getFilter(draw, start, number, searchString, sortName, sortDir, fields
                ).then(function (success) {

                    if (success.data.metaData.draw == draw && success.data.data) {                                                
                        clearArray(vm.data.listLoaiNghiPhep);
                        while (success.data.data.length) {
                            vm.data.listLoaiNghiPhep.push(success.data.data.shift());
                        }
                        tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                    }
                    vm.data.isLoading = false;
                }, function (error) {

                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });


        }

        //function strJoin(arrayObj, propertyName, joinChar) {
        //    var arrayProperty = new Array();
        //    for (var i = 0; i < arrayObj.length; i++) {
        //        arrayProperty.push(arrayObj[i][propertyName]);
        //    }
        //    return arrayProperty.join(joinChar);
        //}

        function fillData(data, listNameInData, inputSearchList) {

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



       


        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            
            $scope.$on(controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
            
                search(data);
            });

            $scope.$on(controllerId + '.action.callOpenAddPopup', function (event, data) {
                if (vm.data.showButtonNew) {
                    vm.action.add(data);
                    $rootScope.isOpenPopup = true;
                }
            });
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
