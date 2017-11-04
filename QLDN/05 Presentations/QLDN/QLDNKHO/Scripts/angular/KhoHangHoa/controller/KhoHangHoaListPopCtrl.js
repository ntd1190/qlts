(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoHangHoaListPopCtrl', KhoHangHoaListPopCtrl)
        .directive("keyboard", keyboard);        //HOT-KEY

    //HOT-KEY
    function keyboard($document, keyCodes) {
        return {
            link: function (scope, element, attrs) {

                var keysToHandle = scope.$eval(attrs.keyboard);
                var keyHandlers = {};

                // Registers key handlers
                angular.forEach(keysToHandle, function (callback, keyName) {
                    var keyCode = keyCodes[keyName];
                    keyHandlers[keyCode] = { callback: callback, name: keyName };
                });

                // Bind to document keydown event
                $document.on("keydown", function (event) {

                    var keyDown = keyHandlers[event.keyCode];

                    // Handler is registered
                    if (keyDown) {
                        event.preventDefault();

                        //// Invoke the handler and digest
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY
    function KhoHangHoaListPopCtrl($rootScope, $scope, KhoHangHoaService, TuyChonCotService) {
        /* =======================================
         * PRIVATE
         */
        var vm = this;
        $rootScope.isOpenPopup = false;
        $rootScope.IsSelectAll = false;
        //HOT-KEY       
        vm.keys = {


            //press F2 -> open popup
            F2: function (name, code) {

                if (!$rootScope.isOpenPopup) {
                    $rootScope.$broadcast('KhoHangHoaEditCtrl.KhoHangHoaId', 0);
                    $rootScope.$broadcast('KhoHangHoaEditCtrl.onInitView', 0);
                    $('#popupThongTinKhoHangHoa').collapse('show');
                    $("#btnXoaId").hide();
                    $("#btnH").hide();
                    $("#txtTieuDe").focus();
                    $rootScope.isOpenPopup = true;
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopupTimKiem) {
                    $('#panelTimkiemCollapse').collapse('show');
                    $rootScope.isOpenPopupTimKiem = true;
                } else {
                    $('#panelTimkiemCollapse').collapse('hide');
                    $rootScope.isOpenPopupTimKiem = false;
                }
            },

        };
        //end HOT-KEY
        var controllerId = 'KhoHangHoaListPopCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            listKhoHangHoa: [],
            dangLamViec: '',
        };



        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            showButtonNew: false,
            showButtonXoaChon: false,
            isLoading: false,
            showList: false,
            useCotListDb: true,
            UserLoginId: '',
            loai: '',
            leftjoinHH: '',
            listKhoHang: [],
            error: error,
            listKhoHangHoa: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'KhoHangHoaId', TenCot: 'ID', HienThiYN: false, DoRong: 100 },
                { MaCot: 'NgayTao', TenCot: 'Ngày tiếp nhận', HienThiYN: true, DoRong: 100 },
                { MaCot: 'TieuDe', TenCot: 'Tiêu đề', HienThiYN: true, DoRong: 10 },
                { MaCot: 'LoaiKhoHangHoa', TenCot: 'Loại KhoHangHoa', HienThiYN: true, DoRong: 10 },
            ],
            inputSearch: inputSearch,
            khoId : ''
        };

        vm.action = {
            getPage: getPage,
            search: search,
            apDung: apDung,
            loadCotList: loadCotList,
            // for view
            checkCot: checkCot,
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() { loadCotList(); getPageKho(); }

        function search() {
            _tableState.pagination.start = 0;
            if (vm.data.showList) {
                getPage();
            } else {
                vm.data.showList = true;
            }
        }
        // nhận cấu hình từ giao diện
        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.loadListCot) {
                vm.data.useCotListDb = config.loadListCot;
                loadCotList();
            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
            }
            if (config && config.loai) {
                vm.data.loai = config.loai;
            }
            if (config && config.leftjoinHH) {
                vm.data.leftjoinHH = config.leftjoinHH;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
            }
            initEventListener();
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
        // kiểm tra ẩn hiện cột
        function checkCot(cot) {
            if (!cot.HienThiYN || cot.HienThiYN == false) {
                return false;
            }

            switch (cot.MaCot) {
                case 'CtrVersion': return false;
                case 'KhoHangHoaId': return false;
                case 'MaTrangThai': return false;
                case 'Ho': return false;
                default: return true;
            }
        }

        function loadCotList() {
            if (vm.data.useCotListDb) {
                TuyChonCotService.getAll('FM0012').then(function (success) {
                    if (success.data && success.data.data.length > 0) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
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
            var start = vm.data.searchString ? 0 : (tableState.pagination.start || 0);     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'A.HangHoaId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = "";
            KhoHangHoaService.getList(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId,vm.data.loai,vm.data.khoId,vm.data.leftjoinHH).then(function (success) {
                if (success.data.data) {
                    vm.data.listKhoHangHoa = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);

                }
            });
            loadCotList();

        }
        vm.action.KhoFilter = function (item) {            
            return (vm.data.khoId == item.KhoHangId);
        }
        function getPageKho() {


            var data = {};
            data.draw = 1;
            data.start = 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.;
            data.length = 100;  // Number of entries showed per page.;
            data.sortName = 'KhoHangId';
            data.sortDir = 'asc';

            data.fields = '';
            data.search = vm.data.searchString;

            KhoHangHoaService.GetPageKho(data).then(function (result) {
                console.log(result);
                if (result.data.data) {
                    delete vm.data.listKhoHang;
                    vm.data.listKhoHang = result.data.data;
                }
            }, function (result) {
                console.log(result);
                if (result.data.error != null) {
                    alert(result.data.error.message);
                } else {
                    alert(result.data.Message);

                }
            });
        }
        function getTuyChonCotList(data) {
            if (data && angular.isArray(data)) {
                vm.data.listCot = data;
            }
        }


        /* =====================================
         * $broadcast / $emit / $on
         */
        function initEventListener() {
            $scope.$on(controllerId + '.action.refresh', function (event, data) {
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.data.getKhoXuat', function (event, data) {
                console.log(data + "_ bat kho bat kho _ ");
                vm.data.khoId = data;
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                _tableState.pagination.start = 0;
                vm.data.searchString = data;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getKhoHangHoaInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
            $(document).ready(function () {
                $('#' + controllerId).on('shown.bs.collapse', function () {
                    $('#' + controllerId + ' input[autofocus]').focus();
                });
            });
        }

        function apDung() {
            var selectedListKhoHangHoa = new Array();
            for (var i = 0; i < vm.data.listKhoHangHoa.length; i++) {
                if (vm.data.listKhoHangHoa[i].isSelected) {
                    selectedListKhoHangHoa.push(vm.data.listKhoHangHoa[i]);
                }
            }
            emitApDung(selectedListKhoHangHoa);
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
