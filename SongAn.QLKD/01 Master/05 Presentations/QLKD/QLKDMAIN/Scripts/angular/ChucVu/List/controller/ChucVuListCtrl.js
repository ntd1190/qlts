(function () {
    'use strict';
    angular
        .module('app')
        .controller('ChucVuListCtrl', ChucVuListCtrl);


    function ChucVuListCtrl($rootScope, $scope, ChucVuService, $window, utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'ChucVuListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            ngayTu: '',
            ngayDen: '',
            listChucVu: [],
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
            UserLoginId: 0,
            listChucVu: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'MaChucVu', TenCot: 'Mã chức vụ', DoRong: '100px', chon: true },
                { MaCot: 'TenChucVu', TenCot: 'Chức vụ', DoRong: '200px', chon: true },
                { MaCot: 'GhiChu', TenCot: 'Ghi chú', DoRong: '200px', chon: true },
                { MaCot: 'NguoiTao', TenCot: 'Người tạo', DoRong: '100px', chon: true },
                { MaCot: 'NgayTao', TenCot: 'Ngày tạo', DoRong: '100px', chon: true }
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
            add: addChucVu,
            view: viewChucVu,
            convertDateFormat: utility.convertDateFormat,
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
                vm.data.UserLoginId = config.userInfo.NhanVienId;
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

        function addChucVu() {
            $scope.$emit(controllerId + '.action.xemChucVu', 0);
        }

        function viewChucVu(id) {
            $scope.$emit(controllerId + '.action.xemChucVu', id);
        }

        function deleteSelected() {
            var msg = "";
            var listSelected = new Array();

            for (var i = 0; i < vm.data.listChucVu.length; i++) {
                var ChucVu = vm.data.listChucVu[i];
                if (ChucVu.isSelected) {
                    listSelected.push(ChucVu);
                }
            }

            msg = 'Bạn có muốn xóa các mục đã chọn không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }

                var data = {};
                data.listChucVu = listSelected;
                data.loginId = vm.data.UserLoginId;
                ChucVuService.removeList(data).then(function (success) {
                    console.log(success);
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!');
                }, function (error) {
                    console.log(error);
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
            var fields = 'CV.*,NV.Ho,NV.Ten';

            ChucVuService.getFilter(draw, start, number, searchString, sortName, sortDir, fields
                ).then(function (success) {
                    console.log(success);
                    if (success.data.metaData.draw == draw && success.data.data) {
                        delete vm.data.listChucVu;
                        vm.data.listChucVu = success.data.data;

                        tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });


        }

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
