(function () {
    'use strict';

    angular
        .module('app')
        .controller('TangCaListCtrl', TangCaListCtrl);


    function TangCaListCtrl($rootScope, $scope, TangCaService,$window,TuyChonCotService,utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'TangCaListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            ngayTu: moment().format("01/MM/YYYY"),
            ngayDen: moment().daysInMonth() + moment().format("/MM/YYYY"),
            listLoaiTangCa: [],
            listTrangThai: [],
            listNguoiDuyet: [],
            
        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            UserLoginId :'',
            error: error,
            listTangCa: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'TieuDe', TenCot: 'Tiêu đề', DoRong: '150px', chon: true },
                { MaCot: 'SoGio', TenCot: 'Số giờ', DoRong: '70px', chon: true },
                { MaCot: 'Loai', TenCot: 'Loại', DoRong: '120px', chon: true },
                { MaCot: 'HoTenNV_Duyet', TenCot: 'Người duyệt', DoRong: '150px', chon: true },
                { MaCot: 'TrangThai', TenCot: 'Trạng thái', DoRong: 'auto', chon: true },
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
            add: addTangCa,
            xemTangCa: xemTangCa,
            apDung: apDung,
            deleteSelected: deleteSelected,
            convertDateFormat: utility.convertDateFormat,
            isNumber: utility.isNumber,
        };

        vm.onInitView = onInitView;

        activate();
        function activate() { }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.loadListCot) {
                vm.data.useCotListDb = config.loadListCot;
                loadCotList();
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
            if (vm.data.useCotListDb) {
                TuyChonCotService.getAll('FL0004').then(function (success) {
                    if (success.data && success.data.data) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
        }

        function setEnableButton() {
            debugger;
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

        function addTangCa() {
            $scope.$emit(controllerId + '.action.xemTangCa', 0);
        }

        function xemTangCa(id) {
            $scope.$emit(controllerId + '.action.xemTangCa', id);
        }

        function deleteSelected() {

            var msg = "";
            var listSelected = new Array();

            for (var i = 0; i < vm.data.listTangCa.length; i++) {
                var tangca = vm.data.listTangCa[i];
                if (tangca.isSelected) {
                    listSelected.push(tangca);
                }
            }
                
            msg = 'Bạn có muốn xóa các mục đã chọn không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }
                TangCaService.removeList(listSelected).then(function (success) {
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

        function initSearch() {
            if (vm.data.showList) {
                getPage();
            }
            else{
                vm.data.showList = true;
            }
        }

        function getFilter(data) {

            inputSearch.listLoaiTangCa = (data && data.listLoaiTangCa) ? data.listLoaiTangCa : [];
            inputSearch.listNguoiDuyet = (data && data.listNguoiDuyet) ? data.listNguoiDuyet : [];
            inputSearch.listTrangThai = (data && data.listTrangThai) ? data.listTrangThai : [];

            inputSearch.searchString = (data && data.searchString) ? data.searchString : '';

            inputSearch.ngayTu = (data && data.ngayTu) ? data.ngayTu : '';

            inputSearch.ngayDen = (data && data.ngayDen) ? data.ngayDen : '';

            //console.log(inputSearch);
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
                data.sortDir = 'desc' ;

            // cấu hình
            data.fields = '';
            data.MaForm = 'FL0004';

            // filter
            data.searchString = inputSearch.searchString;
            data.Loai = utility.joinStr(inputSearch.listLoaiTangCa, 'Loai');
            data.Loai = data.Loai || '';
            data.NguoiDuyetIds = utility.joinStr(inputSearch.listNguoiDuyet, 'NhanVienId');
            data.NguoiDuyetIds = data.NguoiDuyetIds || ''
            data.MaTrangThai = utility.joinStr(inputSearch.listTrangThai, 'MaTrangThai');
            data.MaTrangThai = data.MaTrangThai || '';
            data.NgayBatDau = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.NgayKetThuc = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.XoaYN = 'N';
            data.UserLoginId = vm.data.UserLoginId;
            // end chuẩn bị tham số 
            debugger
            // gọi api
            TangCaService.getFilter(data)

                .then(function (success) {
                    //console.log(success);

                    if (success.data.metaData.draw == data.draw && success.data.data) {
                    loadCotList();// load danh sách cột
                    utility.clearArray(vm.data.listTangCa);
                    while (success.data.data.length) {
                        vm.data.listTangCa.push(success.data.data.shift());
                    }
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / data.number);//set the number of pages so the pagination can update
                }
                vm.data.isLoading = false;
            }, function (error) {
                //console.log(error);
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

        function apDung() {
            var selectedListTangCa = new Array();
            for (var i = 0; i < vm.data.listTangCa.length; i++) {
                if (vm.data.listTangCa[i].isSelected) {
                    selectedListTangCa.push(vm.data.listTangCa[i]);
                }
            }
            emitApDung(selectedListTangCa);
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

        function emitApDung(data) {
            $scope.$emit(controllerId + '.action.ap-dung', data);
        }

        /* =====================================
         * Utility
         */
    }
})();
