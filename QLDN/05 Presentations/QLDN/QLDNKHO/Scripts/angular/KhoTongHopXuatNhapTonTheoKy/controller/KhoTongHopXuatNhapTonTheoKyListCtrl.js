(function () {
    'use strict';

    angular
        .module('app')
        .controller('TongHopXuatNhapTonTheoKyListCtrl', TongHopXuatNhapTonTheoKyListCtrl);


    function TongHopXuatNhapTonTheoKyListCtrl($rootScope, $scope, TongHopXuatNhapTonTheoKyService, $window, $location, utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'TongHopXuatNhapTonTheoKyListCtrl';
        var _tableState;
        var userInfo;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            ngayTu: '01/01/' + moment().format('YYYY'),
            ngayDen: '31/12/' + moment().format('YYYY'),
            listLoaiBaoCao: [],
            listMaTrangThai: [],
        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            error: error,
            listTongHopXuatNhapTonTheoKy: [],
            listQuyenTacVu: [],
            LoginId : '',
            listCot: [
                { MaCot: 'Ten', TenCot: 'Tên', DoRong: '100px', HienThiYN: true },
                { MaCot: 'ThoiGianPhatSinh', TenCot: 'Thời gian phát sinh', DoRong: '120px', HienThiYN: true },
                { MaCot: 'TenKho', TenCot: 'Kho hàng', DoRong: '70px', HienThiYN: true },
                { MaCot: 'TenKyTruoc', TenCot: 'Kỳ trước', DoRong: '100px', HienThiYN: true },
                { MaCot: 'TenLoaiBaoCao', TenCot: 'Loại', DoRong: '70px', HienThiYN: true },
                { MaCot: 'Xem', TenCot: 'Xem', DoRong: '50px', HienThiYN: true },
                { MaCot: 'TinhToan', TenCot: 'Tính toán', DoRong: '70px', HienThiYN: true },
                { MaCot: 'XoaYN', TenCot: 'Xóa', DoRong: '50px', HienThiYN: true },
                { MaCot: 'TenMaTrangThai', TenCot: 'Trạng thái', DoRong: '70px', HienThiYN: true }
                , { MaCot: 'Import', TenCot: 'Tồn đầu kỳ', DoRong: '50px', HienThiYN: true }
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
            initSearch: initSearch,
            getPage: getPage,
            add: addKy,
            xemKy: xemKy,
            deleteOne : deleteOne
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

        function addKy() {
            $scope.$emit(controllerId + '.action.xemKy', 0);
        }

        function xemKy(id) {
            $scope.$emit(controllerId + '.action.xemKy', id);
        }

        function deleteOne(list) {

            vm.data.isLoading = true;
            var msg = "";
            var listSelected = new Array();

            if (list) {
                listSelected.push({
                    ID: list.KyId
                });
            }

            msg = 'Bạn có muốn xóa không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { vm.data.isLoading = false; return; }
                TongHopXuatNhapTonTheoKyService.removeList(listSelected).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);

                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error) {
                        alert(error.data.error.message + " result dưới store ko có gì select lên");
                    } else {
                        alert(error.message );
                    }
                });
            }
        }

        function getFilter(data) {

            inputSearch.listLoaiBaoCao = (data && data.listLoaiBaoCao) ? data.listLoaiBaoCao : [];

            inputSearch.searchString = (data && data.searchString) ? data.searchString : '';

            inputSearch.ngayTu = (data && data.ngayTu) ? data.ngayTu : '';

            inputSearch.ngayDen = (data && data.ngayDen) ? data.ngayDen : '';

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
            data.searchString = inputSearch.searchString;
            data.LoaiBaoCao = utility.joinStr(inputSearch.listLoaiBaoCao, 'LoaiBaoCao');
            data.LoaiBaoCao = data.LoaiBaoCao || '';
            if (data.LoaiBaoCao == "") data.LoaiBaoCao = 'THANG';
            data.TuNgay = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.DenNgay = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.XoaYN = 'N';
            data.LoginId = vm.data.LoginId;
            // end chuẩn bị tham số 

            // gọi api
            TongHopXuatNhapTonTheoKyService.getFilter(data)

                .then(function (success) {
                    console.log(success);

                    if (success.data.metaData.draw == data.draw && success.data.data) {
                        utility.clearArray(vm.data.listTongHopXuatNhapTonTheoKy);
                        while (success.data.data.length) {
                            vm.data.listTongHopXuatNhapTonTheoKy.push(success.data.data.shift());
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

            //F2 
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
    }
})();
