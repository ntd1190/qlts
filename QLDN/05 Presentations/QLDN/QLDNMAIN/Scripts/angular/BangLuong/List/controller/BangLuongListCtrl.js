(function () {
    'use strict';

    angular
        .module('app')
        .controller('BangLuongListCtrl', BangLuongListCtrl);


    function BangLuongListCtrl($rootScope, $scope, BangLuongService,$window,$location,utility) {
        /* =======================================
         * PRIVATE
         */
        var controllerId = 'BangLuongListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            ngayTu: '01/01/' + moment().format('YYYY'),
            ngayDen: '31/12/' + moment().format('YYYY'),
            listTanSuat: [],
        };

        var vm = this;

        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            isLoading: false,
            showList: false,
            error: error,
            listBangLuong: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'TenBangLuong', TenCot: 'Tên bảng lương', DoRong: '150px', HienThiYN: true },
                { MaCot: 'TanSuatTraLuong', TenCot: 'Tần suất', DoRong: '70px', HienThiYN: true },
                { MaCot: 'ThoiGianPhatSinh', TenCot: 'Thời gian phát sinh', DoRong: '140px', HienThiYN: true },
                { MaCot: 'SoNguoi', TenCot: 'Số người', DoRong: '70px', HienThiYN: true },
                { MaCot: 'TinhToan', TenCot: 'Tính toán', DoRong: '70px', HienThiYN: true },
                { MaCot: 'NgayTraLuong', TenCot: 'Ngày trả', DoRong: '80px', HienThiYN: true },
                { MaCot: 'TrangThai', TenCot: 'Trạng thái', DoRong: '80px', HienThiYN: true },
                { MaCot: 'Xoa', TenCot: 'Xóa', DoRong: '50px', HienThiYN: true },
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
            add: addBangLuong,
            xemBangLuong: xemBangLuong,
            apDung: apDung,
            deleteOne: deleteOne,
            callTinhToan: callTinhToan,
            updateTrangThaiBangLuong: updateTrangThaiBangLuong,
            convertDateFormat: utility.convertDateFormat,
            isNumber: utility.isNumber,
            PopupCenter: PopupCenter,
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

        function callTinhToan(item) {
            if (item) {
                var param = '?BangLuongId=' + item.ID;
                if (item.MaTrangThai == 'BL_KN') {
                    param += '&cal=true';
                    param += '&CtrVersion=' + item.CTRVERSION;
                }
                //$location.protocol() + "://" + $location.host() + ":" + $location.port()
                var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/QLDNMAIN/BangLuongCaNhan/ReportTheoBangLuong';
                url += param;

                PopupCenter(url, 'Tính toán bảng lương', '1024', '800');
            }
        }

        function doiTrangThai(item) {
            if (item) {
                var param = '?BangLuongId=' + item.ID;
                if (item.MaTrangThai == 'BL_KN') {
                    param += '&cal=true';
                    param += '&CtrVersion=' + item.CTRVERSION;
                }
                //$location.protocol() + "://" + $location.host() + ":" + $location.port()
                var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + '/QLDNMAIN/BangLuongCaNhan/ReportTheoBangLuong';
                url += param;

                PopupCenter(url, 'Tính toán bảng lương', '1024', '800');
            }
        }

        function updateTrangThaiBangLuong(item) {
            if (item) {
                if (!confirm("Bạn có muốn cập nhật Trạng Thái bảng lương?")) { return; }

                vm.data.isLoading = true;

                var data = {};

                // chuẩn bị tham số 
                data.BangLuongId = item.ID;
                data.CtrVersion = item.CTRVERSION;
                data.TrangThai = item.MaTrangThai == 'BL_HT' ? 'BL_KN' : 'BL_HT';

                // end chuẩn bị tham số 

                // gọi api
                BangLuongService.updateTrangThai(data)

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

        function addBangLuong() {
            $scope.$emit(controllerId + '.action.xemBangLuong', 0);
        }

        function xemBangLuong(id) {
            $scope.$emit(controllerId + '.action.xemBangLuong', id);
        }

        // Xóa
        function deleteOne(list) {

            vm.data.isLoading = true;
            var msg = "";
            var listSelected = new Array();

            if (list) {
                listSelected.push({
                    ID: list.ID,
                    CTRVERSION: list.CTRVERSION,
                });
            }

            msg = 'Bạn có muốn xóa không?';

            if (listSelected.length > 0) {
                if (!confirm(msg)) { return; }
                BangLuongService.removeList(listSelected).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    
                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.message);
                    }
                });
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

            inputSearch.listTanSuat = (data && data.listTanSuat) ? data.listTanSuat : [];

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

            // cấu hình
            data.fields = '';
            data.MaForm = '';

            // filter
            data.searchString = inputSearch.searchString;
            data.TanSuatTraLuong = utility.joinStr(inputSearch.listTanSuat, 'TanSuat');
            data.TanSuatTraLuong = data.TanSuatTraLuong || '';
            data.NgayBatDau = inputSearch.ngayTu != '' ? utility.convertDateFormat(inputSearch.ngayTu, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.NgayKetThuc = inputSearch.ngayDen != '' ? utility.convertDateFormat(inputSearch.ngayDen, 'DD/MM/YYYY', 'YYYYMMDD') : '';
            data.XoaYN = 'N';
            // end chuẩn bị tham số 

            // gọi api
            BangLuongService.getFilter(data)

                .then(function (success) {
                    console.log(success);

                    if (success.data.metaData.draw == data.draw && success.data.data) {
                    utility.clearArray(vm.data.listBangLuong);
                    while (success.data.data.length) {
                        vm.data.listBangLuong.push(success.data.data.shift());
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

        function apDung() {
            var selectedListBangLuong = new Array();
            for (var i = 0; i < vm.data.listBangLuong.length; i++) {
                if (vm.data.listBangLuong[i].isSelected) {
                    selectedListBangLuong.push(vm.data.listBangLuong[i]);
                }
            }
            emitApDung(selectedListBangLuong);
        }

        function PopupCenter(url, title, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = $window.screenLeft != undefined ? $window.screenLeft : screen.left;
            var dualScreenTop = $window.screenTop != undefined ? $window.screenTop : screen.top;

            var width = $window.innerWidth ? $window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = $window.innerHeight ? $window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;

            var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=no";

            var newWindow = $window.open(url, title, strWindowFeatures+', width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if ($window.focus) {
                newWindow.focus();
            }
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

            $scope.$on(controllerId + '.action.callTinhToan', function (event, data) {
                callTinhToan(data);
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
