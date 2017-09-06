(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienListCtrl', NhanVienListCtrl);

    function NhanVienListCtrl($rootScope, $scope, NhanVienService, TuyChonCotService) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'NhanVienListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            ngayTuyenDungFrom: '',
            ngayTuyenDungTo: '',
            listNhanVien: [],
            listPhongBan: [],
            listDuAn: [],
            listChucVu: [],
            dangLamViec: '',
        };

        //$rootScope.isSelectAll = false;
        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
           
            isLoading: false,
            showList: false,
            error: error,
            listNhanVien: [],
            listNhanVienPop: [],
            listNhanVienPop2: [],
            listCot: [
                { MaCot: 'Ma', TenCot: 'Mã NV', HienThiYN: true, DoRong: 100 },
                { MaCot: 'Ten', TenCot: 'Tên NV', HienThiYN: true, DoRong: 10 },
            ],
            inputSearch: inputSearch,
        };

        vm.action = {
            getPage: getPage,
            search: search,
            add: addNhanVien,
            xemNhanVien: xemNhanVien,
            apDung: apDung,
            apDung2: apDung2,
            reset: reset,
            deleteSelected: deleteSelected,
            loadCotList: loadCotList,
            clearListNhanVien:clearListNhanVien,
            convertDateFormat: convertDateFormat,
            OpenPopNhanVien: OpenPopNhanVien
        };

        vm.onInitView = onInitView;
                
        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() {
           
        
        }

        function reset() {
            vm.data.listNhanVienPop = [];
            $("#tungay").val("");
            $("#denngay").val("");
            $rootScope.$broadcast('KhenThuongCaNhanListCtrl.data.ClearHinhThuc', true);

        }
        function search() {
            if (vm.data.showList) {
                getPage();
            } else {
                vm.data.showList = true;
            }
        }
        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.loadListCot) {
                loadCotList();
            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            initEventListener();
        }
        function OpenPopNhanVien()
        {            
            if (vm.data.listNhanVienPop.length == 0) getPage(_tableState);

        }
        function addNhanVien() {
            $scope.$emit(controllerId + '.action.xemNhanVien', 0);
        }

        function xemNhanVien(id) {
            $scope.$emit(controllerId + '.action.xemNhanVien', id);
        }
        function xoaNhanVien() {

        }
        function loadCotList() {
            TuyChonCotService.getListCot('FM0001').then(function (success) {
                if (success.data && success.data.data) {
                    vm.data.listCot = success.data.data;
                }
            }, function (error) { });
        }
        function deleteSelected() {
            if (!confirm('Xóa các nhân viên đã chọn?')) { return; }

            vm.data.isLoading = true;

            var nhanVienSelected = new Array();

            for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                var nhanvien = vm.data.listNhanVien[i];
                if (nhanvien.isSelected) {
                    nhanVienSelected.push(nhanvien.NhanVienId);
                }
            }
            var ids = nhanVienSelected.join(',');

            NhanVienService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
            }, function (error) {
                vm.data.isLoading = false;
            });

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
            var fields = 'NV.NhanVienId,Ma,Ho,Ten,NgayTuyenDung,NV.CtrVersion,PB.PhongBanId,TenPhongBan,CV.ChucVuId,TenChucVu';
            var tuyenDungFrom = convertDateFormat(inputSearch.ngayTuyenDungFrom, 'DD/MM/YYYY', 'YYYYMMDD');
            var tuyenDungTo = convertDateFormat(inputSearch.ngayTuyenDungTo, 'DD/MM/YYYY', 'YYYYMMDD');
            var nhanVienIds = joinStr(inputSearch.listNhanVien, 'NhanVienId');
            var phongBanIds = joinStr(inputSearch.listPhongBan, 'PhongBanId');
            var duAnIds = joinStr(inputSearch.listDuAn, 'DuAnId');
            var chucVuIds = joinStr(inputSearch.listChucVu, 'ChucVuId');
            var dangLamViec = inputSearch.dangLamViec == '' ? true : inputSearch.dangLamViec;
            NhanVienService.getFilter(
                draw, start, number, searchString, 'FM0001', sortName, sortDir, fields, tuyenDungFrom, tuyenDungTo, nhanVienIds, phongBanIds, duAnIds, chucVuIds, dangLamViec
                ).then(function (success) {
                    if (success.data.metaData.draw == draw && success.data.data) {
                        vm.data.listNhanVien = [];
                        while (success.data.data.length) {
                            vm.data.listNhanVien.push(success.data.data.shift());
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

        function getFilter(data) {
            inputSearch.listNhanVien = (data && data.listNhanVien) ? data.listNhanVien : [];
            inputSearch.listPhongBan = (data && data.listPhongBan) ? data.listPhongBan : [];
            inputSearch.listDuAn = (data && data.listDuAn) ? data.listDuAn : [];
            inputSearch.listChucVu = (data && data.listChucVu) ? data.listChucVu : [];

            inputSearch.searchString = (data && data.searchString) ? data.searchString : '';
            inputSearch.ngayTuyenDungFrom = (data && data.ngayTuyenDungFrom) ? data.ngayTuyenDungFrom : '';
            inputSearch.ngayTuyenDungTo = (data && data.ngayTuyenDungTo) ? data.ngayTuyenDungTo : '';
            inputSearch.dangLamViec = (data && data.dangLamViec && data.dangLamViec != '') ? data.dangLamViec : true;

            console.log(inputSearch);
        }

        function apDung(id) {
            var selectedListNhanVien = new Array();
            if (id != "") {
                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    if (vm.data.listNhanVien[i].NhanVienId == id) {
                        selectedListNhanVien.push(vm.data.listNhanVien[i]);
                    }
                }
            }
            else {
                
                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    if (vm.data.listNhanVien[i].isSelected) {
                        selectedListNhanVien.push(vm.data.listNhanVien[i]);
                    }
                }
            }
        
            $rootScope.NhanVien=selectedListNhanVien;
            vm.data.listNhanVienPop = selectedListNhanVien;
            $('#NhanVienListPopup').collapse('hide');

        }
        function apDung2(id) {
        
            var selectedListNhanVien = new Array();
            if (id != "") {
                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    if (vm.data.listNhanVien[i].NhanVienId == id) {
                        selectedListNhanVien.push(vm.data.listNhanVien[i]);
                    }
                }
            }
            else {

                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    if (vm.data.listNhanVien[i].isSelected) {
                        selectedListNhanVien.push(vm.data.listNhanVien[i]);
                    }
                }
            }
            vm.data.listNhanVienPop2 = selectedListNhanVien;
            $rootScope.NhanVien2 = selectedListNhanVien;
            $('#popupNhanVienListmoi').collapse('hide');
            
        }
        function clearListNhanVien()
        {
            vm.data.listNhanVienPop = [];
            $rootScope.NhanVien = [];
            $rootScope.NhanVien2 = [];
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
            $scope.$on('NhanVienListCtrl.apDung', function (event, data) {
                var selectedListNhanVien = new Array();
                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    if (vm.data.listNhanVien[i].NhanVienId == data) {
                        selectedListNhanVien.push(vm.data.listNhanVien[i]);
                    }
                }
                $rootScope.NhanVien2 = selectedListNhanVien;
                vm.data.listNhanVienPop2 = selectedListNhanVien;
            });
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

        function convertDateFormat(strDate, formatInput, formatOutput) {
            var result = moment(strDate, formatInput).format(formatOutput);
            result = result == 'Invalid date' ? '' : result;
            return result;
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
