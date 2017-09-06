(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienListCtrl', NhanVienListCtrl);

    function NhanVienListCtrl($rootScope, $scope, NhanVienService) {
        /* =======================================
         * PRIVATE
         */
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

        var vm = this;
        vm.controllerId = 'NhanVienListCtrl';
        vm.title = 'Danh sách nhân viên';
        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            useCotListDb: false,
            selectMode: 'multiple',
            error: error,
            listNhanVien: [],
            listCot: [
                { MaCot: 'NhanVienId', TenCot: 'ID', HienThiYN: false, DoRong: 100 },
                { MaCot: 'Ma', TenCot: 'Mã NV', HienThiYN: true, DoRong: 100 },
                { MaCot: 'Ho', TenCot: 'Ho NV', HienThiYN: false, DoRong: 10 },
                { MaCot: 'Ten', TenCot: 'Tên NV', HienThiYN: true, DoRong: 10 },
            ],
            inputSearch: inputSearch,
        };

        vm.action = {
            close: close,
            getPage: getPage,
            search: search,
            add: addNhanVien,
            xemNhanVien: xemNhanVien,
            apDung: apDung,
            loadCotList: loadCotList,
            convertDateFormat: convertDateFormat,
            isNumber: isNumber,

            // for view
            checkCot: checkCot,
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() { }

        function search() {
            if (vm.data.showList) {
                _tableState.pagination.start = 0;
                getPage();
            } else {
                vm.data.showList = true;
            }
        }
        // nhận cấu hình từ giao diện
        function onInitView(config) {
            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }

            if (config && config.loadListCot) {
                vm.data.useCotListDb = config.loadListCot;
                loadCotList();
            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
            }

            if (config && config.title) {
                vm.title = config.title;
            }

            if (config) {
                vm.data.selectMode = config.isSelectOne ? '' : 'multiple';
            }

            initEventListener();
        }

        // kiểm tra ẩn hiện cột
        function checkCot(cot) {
            if (!cot.HienThiYN || cot.HienThiYN == false) {
                return false;
            }

            switch (cot.MaCot) {
                case 'CtrVersion': return false;
                case 'NhanVienId': return false;
                case 'MaTrangThai': return false;
                case 'Ho': return false;
                default: return true;
            }
        }
        function addNhanVien() {
            $scope.$emit(vm.controllerId + '.action.xemNhanVien', 0);
        }

        function xemNhanVien(id) {
            $scope.$emit(vm.controllerId + '.action.xemNhanVien', id);
        }

        function xoaNhanVien() {

        }

        function loadCotList() {
            //if (vm.data.useCotListDb) {
            //    TuyChonCotService.getAll('FM0001').then(function (success) {
            //        if (success.data && success.data.data) {
            //            vm.data.listCot = success.data.data;
            //        }
            //    }, function (error) { });
            //}
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

            loadCotList();// load danh sách cột

            // chuẩn bị tham số 
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || '';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = inputSearch.searchString;
            var maForm = 'FM0001';
            var fields = '';
            var tuyenDungFrom = convertDateFormat(inputSearch.ngayTuyenDungFrom, 'DD/MM/YYYY', 'YYYYMMDD');
            var tuyenDungTo = convertDateFormat(inputSearch.ngayTuyenDungTo, 'DD/MM/YYYY', 'YYYYMMDD');
            var nhanVienIds = joinStr(inputSearch.listNhanVien, 'NhanVienId');
            var phongBanIds = joinStr(inputSearch.listPhongBan, 'PhongBanId');
            var duAnIds = joinStr(inputSearch.listDuAn, 'DuAnId');
            var chucVuIds = joinStr(inputSearch.listChucVu, 'ChucVuId');
            var dangLamViec = inputSearch.dangLamViec == undefined ? '' : inputSearch.dangLamViec;
            // tạo input cho api
            var data = {
                // phân trang
                draw: draw, start: start, length: number, sortName: sortName, sortDir: sortDir,
                // cấu hình
                maForm: maForm, fields: fields,
                // filter
                searchString: searchString, tuyenDungFrom: tuyenDungFrom, tuyenDungTo: tuyenDungTo,
                nhanVienIds: nhanVienIds, phongBanIds: phongBanIds, duAnIds: duAnIds,
                chucVuIds: chucVuIds, dangLamViec: dangLamViec, Xoa: 'N'
            };

            // gọi api
            NhanVienService.getFilter(data).then(function (success) {
                console.log(success);
                if (success.data.metaData.draw == draw && success.data.data) {
                    delete vm.data.listNhanVien;
                    vm.data.listNhanVien = success.data.data;

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
            inputSearch.dangLamViec = data.dangLamViec == undefined ? '' : data.dangLamViec;

            console.log(inputSearch);
        }

        function getTuyChonCotList(data) {
            if (data && angular.isArray(data)) {
                vm.data.listCot = data;
            }
        }

        function apDung() {
            var selectedListNhanVien = new Array();
            if (vm.data.listNhanVien) {
                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    if (vm.data.listNhanVien[i].isSelected) {
                        selectedListNhanVien.push(vm.data.listNhanVien[i]);
                    }
                }
            }
            console.log(vm.controllerId + '.action.ap-dung');
            console.log(selectedListNhanVien);
            $scope.$emit(vm.controllerId + '.action.ap-dung', selectedListNhanVien);
            close();
        }

        function close() {
            delete vm.data.listNhanVien;
            $('#' + vm.controllerId).collapse('hide');
        }
        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.refresh', function (event, data) {
                getPage(_tableState);
            });

            $scope.$on(vm.controllerId + '.action.get-filters', function (event, data) {
                getFilter(data);
                getPage();
            });

            $scope.$on(vm.controllerId + '.action.getInfo', function (event, data) {
                var list = getNhanVienInfo(data);
                $scope.$emit(vm.controllerId + '.data.listInfo', list);
            });

            $scope.$on(vm.controllerId + '.action.test', function (event, data) {
                console.log(event);
                console.log(data);
            });
            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                    if (vm.data.showList) {
                        _tableState.pagination.start = 0;
                        getPage();
                    } 
                });
            });
            /* JQuery event setup */
            angular.element(document).ready(function () {
                angular.element('#' + vm.controllerId).on('hide.bs.collapse', function () {
                });
            });
        }

        function getNhanVienInfo(ids) { // ids = '1|2|3'
            var list = [];

            if (!ids) { return list; }

            var _ids = (ids + '').split('|');

            if (_ids && _ids.length) {
            } else return list;

            // tạo input cho api
            var data = {
                // phân trang
                draw: 0, start: 0, number: 100, sortName: '', sortDir: '',
                // cấu hình
                maForm: '', fields: 'NV.NhanVienId,NV.Ma,NV.Ho,NV.Ten',
                // filter
                searchString: '', tuyenDungFrom: '', tuyenDungTo: '',
                nhanVienIds: ids, phongBanIds: '', duAnIds: '',
                chucVuIds: '', dangLamViec: '', Xoa: 'N'
            };

            NhanVienService.getFilter(data
                ).then(function (success) {
                    if (success.data.data) {
                        vm.data.listNhanVien = [];
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

        function isNumber(value) {
            var check = /^\d+$/.test(value);
            return check;
        }
    }
})();
