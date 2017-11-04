(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoTonKhoListCtrl', KhoTonKhoListCtrl);


    function KhoTonKhoListCtrl($rootScope, $scope, KhoTonKhoService, $window, $location, utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'KhoTonKhoListCtrl';
        var _tableState;
        var userInfo;

        var error = {
            code: 0
        };

        var inputSearch = {
            ngayTu: '01/01/' + moment().format('YYYY'),
            ngayDen: '31/12/' + moment().format('YYYY'),
            khoHangId: ''
        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            error: error,
            listKhoKhoHang: [],
            listKhoTonKho: [],
            listQuyenTacVu: [],
            LoginId: '',
            listCot: [
                { MaCot: 'TenKho', TenCot: 'Kho hàng', DoRong: '70px', HienThiYN: true },
                { MaCot: 'ThangNam', TenCot: 'Tháng Năm', DoRong: '70px', HienThiYN: true },
                { MaCot: 'Ten', TenCot: 'Tên', DoRong: '120px', HienThiYN: true },
                { MaCot: 'TenMaTrangThai', TenCot: 'Trạng thái', DoRong: '70px', HienThiYN: true }
            ],
            showList: false,
            useCotListDb: false
        };

        vm.action = {
            checkInValid: utility.checkInValid,
            initSearch: initSearch,
            getPage: getPage,
            updateTrangThai: updateTrangThai
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
                vm.data.LoginId = config.userInfo.NhanVienId;

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


        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                //// Co quyen them moi
                //if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                //    vm.data.showButtonNew = true;
                //}

                //// Co quyen Xoa
                //if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                //    vm.data.showButtonXoaChon = true;
                //}

                //// Co quyen Sua
                //if (vm.data.listQuyenTacVu.indexOf("M") > 0) {

                //}
            }
        }

        function search(data) {
            getFilter(data);

            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        function initSearch() {
            if (vm.data.showList) {
                getPage();
            }
            else {
                vm.data.showList = true;
            }
        }

        function updateTrangThai(item) {
            if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                if (item) {
                    if (!confirm("Bạn có muốn chốt kho ? ")) { return; }

                    vm.data.isLoading = true;

                    var data = {};

                    // chuẩn bị tham số 
                    if (item.MaTrangThai === 'TonKho_HT') {
                        alert("Kho này đã chốt");
                        return;
                    }
                    data.TonKhoId = item.TonKhoId;
                    data.LoginId = vm.data.LoginId;
                    // end chuẩn bị tham số 

                    // gọi api
                    KhoTonKhoService.updateTrangThai(data)

                        .then(function (success) {

                            if (success.data.data) {
                                getPage(_tableState);
                            }
                            vm.data.isLoading = false;
                        }, function (error) {
                            console.log(error);
                            vm.data.error.message = error.data.error.message;
                            vm.data.isLoading = false;
                        });
                }
            }
            else
            {
                alert("Bạn không có quyền chốt kho !!!");
            }
        }

        function getFilter(data) {

            inputSearch.ngayTu = (data && data.ngayTu) ? data.ngayTu : '';

            inputSearch.ngayDen = (data && data.ngayDen) ? data.ngayDen : '';

            inputSearch.khoHangId = (data && data.khoHangId) ? data.khoHangId : '';
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

            var data = {};

            // chuẩn bị tham số 
            // phân trang
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.number = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = '';
            if (data.sortName != '')
                data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            // filter

            data.TuNgay = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.DenNgay = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.KhoHangId = inputSearch.khoHangId != '' ? inputSearch.khoHangId : '';
            data.LoginId = vm.data.LoginId;
            // end chuẩn bị tham số 

            // gọi api
            KhoTonKhoService.getFilter(data)

                .then(function (success) {
                    console.log(success);

                    if (success.data.metaData.draw == data.draw && success.data.data) {
                        utility.clearArray(vm.data.listKhoTonKho);
                        while (success.data.data.length) {
                            vm.data.listKhoTonKho.push(success.data.data.shift());
                        }
                        tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / data.number);//set the number of pages so the pagination can update
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
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


        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                search(data);
            });
            $scope.$on(controllerId + '.action.getPage', function (event, data) {
                getPage(_tableState);
            });

            
        }

        /* =====================================
         * Utility
         */
    }
})();
