(function () {
    'use strict';

    angular
        .module('app')
        .controller('NghiPhepListCtrl', NghiPhepListCtrl);


    function NghiPhepListCtrl($rootScope, $scope, NghiPhepService,$window,TuyChonCotService,utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'NghiPhepListCtrl';
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
            UserLoginId:'',
            isLoading: false,
            error: error,
            UserLoginId: '',
            listNghiPhep: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'TieuDe', TenCot: 'Tiêu đề', DoRong: '150px', chon: true },
                { MaCot: 'TuNgay', TenCot: 'Từ ngày', DoRong: '80px', chon: true },
                { MaCot: 'DenNgay', TenCot: 'Đến ngày', DoRong: '80px', chon: true },
                { MaCot: 'SoNgay', TenCot: 'Số ngày', DoRong: '70px', chon: true },
                { MaCot: 'TenLoaiPhep', TenCot: 'Loại phép', DoRong: '120px', chon: true },
                { MaCot: 'HoTenNV_BanGiao', TenCot: 'Bàn giao cho', DoRong: '150px', chon: true },
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
            getPage: getPage,
            add: addNghiPhep,
            xemNghiPhep: xemNghiPhep,
            apDung: apDung,
            deleteSelected: deleteSelected,
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
                TuyChonCotService.getAll('FL0002').then(function (success) {
                    if (success.data && success.data.data) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
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

        function addNghiPhep() {
            $scope.$emit(controllerId + '.action.xemNghiPhep', 0);
        }

        function xemNghiPhep(id) {
            $scope.$emit(controllerId + '.action.xemNghiPhep', id);
        }
        function xoaNhanVien() {

        }

        function deleteSelected() {

            var msg = "";
            var listSelected = new Array();

            for (var i = 0; i < vm.data.listNghiPhep.length; i++) {
                var nghiphep = vm.data.listNghiPhep[i];
                if (nghiphep.isSelected) {
                    listSelected.push(nghiphep);
                }
            }
                
            msg = 'Bạn có muốn xóa các mục đã chọn không?';

            if (listSelected.length > 0) {

                //hoivp add more:
                for (var i = 0; i < listSelected.length; i++) {
                    //if (vm.data.UserLoginId != listSelected[i].NguoiTao) {
                    //    alert('Bạn không có quyền xóa hay sửa!');
                    //    return;
                    //}
                    if (listSelected[i].MaTrangThai != 'NP_DD') {
                        alert('Phiếu đã duyệt không được xóa hay sửa!');
                        return;
                    }
                }
                // end hoi vp

                if (!confirm(msg)) { return; }
                NghiPhepService.removeList(listSelected).then(function (success) {
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

            fillData(data, "listLoaiNghiPhep", inputSearch.listLoaiNghiPhep);
            fillData(data, "listNguoiDuyet", inputSearch.listNguoiDuyet);
            fillData(data, "listTrangThai", inputSearch.listTrangThai);

            if (data && data.searchString) {
                inputSearch.searchString = data.searchString;
            }

            if (data && data.ngayTu) {
                inputSearch.ngayTu = data.ngayTu;
            }
            else {
                inputSearch.ngayTu = '';
            }

            if (data && data.ngayDen) {
                inputSearch.ngayDen = data.ngayDen;
            }
            else {
                inputSearch.ngayDen = '';
            }



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

            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || '';

            var sortDir = '';
            if(sortName != '')
                sortDir =  'desc';

            var searchString = inputSearch.searchString;
            var fields = '';

            var MaForm = 'FL0002';

            var MaLoaiNghiPhep = strJoin(inputSearch.listLoaiNghiPhep, 'MaLoaiNghiPhep', '|');
            MaLoaiNghiPhep = MaLoaiNghiPhep || '';

            var NguoiDuyetIds = strJoin(inputSearch.listNguoiDuyet, 'NhanVienId', '|');
            NguoiDuyetIds = NguoiDuyetIds || '';

            var MaTrangThai = strJoin(inputSearch.listTrangThai, 'MaTrangThai', '|');
            MaTrangThai = MaTrangThai || '';

            var NgayBatDau = inputSearch.ngayTu != ''? moment(inputSearch.ngayTu, 'DD/MM/YYYY', true).format('YYYYMMDD'):'';
            
            var NgayKetThuc = inputSearch.ngayDen !=''?moment(inputSearch.ngayDen, 'DD/MM/YYYY', true).format('YYYYMMDD'):'';
            
            debugger
            NghiPhepService.getFilter(draw, start, number, searchString, sortName, sortDir, fields
                , MaForm
                , MaLoaiNghiPhep
                , NguoiDuyetIds
                , MaTrangThai
                , NgayBatDau
                , NgayKetThuc
                ,vm.data.UserLoginId

                ).then(function (success) {
                    //console.log(success);

                if (success.data.metaData.draw == draw && success.data.data) {
                    loadCotList();
                    clearArray(vm.data.listNghiPhep);
                    while (success.data.data.length) {
                        vm.data.listNghiPhep.push(success.data.data.shift());
                    }
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
                }
                vm.data.isLoading = false;
            }, function (error) {
                //console.log(error);
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
            var selectedListNghiPhep = new Array();
            for (var i = 0; i < vm.data.listNghiPhep.length; i++) {
                if (vm.data.listNghiPhep[i].isSelected) {
                    selectedListNghiPhep.push(vm.data.listNghiPhep[i]);
                }
            }
            emitApDung(selectedListNghiPhep);
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
        function clearArray(array) {
            while (array.length) {
                array.pop();
            }
        }
    }
})();
