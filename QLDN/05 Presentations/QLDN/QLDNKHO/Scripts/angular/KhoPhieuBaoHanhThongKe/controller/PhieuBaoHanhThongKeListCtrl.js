(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhieuBaoHanhThongKeListCtrl', PhieuBaoHanhThongKeListCtrl)
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
    function PhieuBaoHanhThongKeListCtrl($rootScope, $scope, PhieuBaoHanhThongKeService, TuyChonCotService, utility) {
        /* =======================================
         * PRIVATE
         */
        var vm = this;
        $rootScope.isOpenPopup = false;
        $rootScope.IsSelectAll = false;
        //HOT-KEY       
        vm.keys = {

            //press ESC -> close popup
            ESC: function (name, code) {
                //alert("ESC");
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },
            //press F2 -> open popup
            F2: function (name, code) {

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
        var controllerId = 'PhieuBaoHanhThongKeListCtrl';
        var _tableState;

        var error = {
            code: 0
        };




        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            tableParams: [],
            HoTenNV: "",
            Ngay: "",
            TongTre: 0,
            TongSom: 0,
            TongPhep: 0,
            TongKhongPhep: 0,
            TongCongTac: 0,
            Tong: 0,
            TuNgay: '',
            DenNgay: '',
            CountCol: 1,
            showButtonNew: false,
            showButtonXoaChon: false,
            isLoading: false,
            showList: false,
            useCotListDb: true,
            UserLoginId: '',
            error: error,
            listPhieuBaoHanhThongKe: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'NhanVienID', TenCot: 'ID', HienThiYN: false, DoRong: 100 },
                { MaCot: 'NhanVien', TenCot: 'Nhân viên xử lý', HienThiYN: true, DoRong: 100 },

                { MaCot: 'MoiTiepNhan', TenCot: 'Mới tiếp nhận', HienThiYN: true, DoRong: 70 },
                { MaCot: 'DangXuLy', TenCot: 'Đang xử lý', HienThiYN: true, DoRong: 70 },

                { MaCot: 'CHoLinhKien', TenCot: 'Chờ linh kiện', HienThiYN: true, DoRong: 60 },
                { MaCot: 'DoiTra', TenCot: 'Đợi khách hàng <br> nhận thiết bị', HienThiYN: true, DoRong: 60 },
                { MaCot: 'KetThuc', TenCot: 'Kết thúc', HienThiYN: true, DoRong: 100 }
            ],
        };


        vm.action = {
            getPage: getPage,
            search: search,
            apDung: apDung,         
            checkInValid: utility.checkInValid
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() {
            //loadCotList();

        }

        function search() {
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
                //loadCotList();

            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
                vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' +'' + '|' + '|';
                //vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + vm.data.UserLoginId + '|' + '|';
                getPage()
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
                //case 'CtrVersion': return false;
                //case 'ChamCongId': return false;
                //case 'MaTrangThai': return false;
                //case 'Ho': return false;
                //default: return true;
            }
        }

        function loadCotList() {
            if (vm.data.useCotListDb) {
                TuyChonCotService.getAll('FL0010').then(function (success) {
                    if (success.data && success.data.data.length > 0) {
                        vm.data.listCot = success.data.data;
                        vm.data.CountCol = 1;
                        for (var i = 0; i < vm.data.listCot.length; i++) {
                            if (vm.data.listCot[i].HienThiYN)
                                vm.data.CountCol = vm.data.CountCol + 1;

                        }
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
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'b.NhanVienId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = "";

            PhieuBaoHanhThongKeService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId).then(function (success) {
                if (success.data.data) {
                    if (success.data.data.length > 0) {
                        vm.data.listPhieuBaoHanhThongKe = success.data.data;
                        vm.data.TuNgay = utility.convertDateFormat(success.data.data[0].TuNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                        vm.data.DenNgay = utility.convertDateFormat(success.data.data[0].DenNgay, "YYYY-MM-DD", "DD/MM/YYYY");
                    }
                    else
                    {
                        var be_y = new Date(new Date().getFullYear(), 0, 1);
                        var be_e = new Date(new Date().getFullYear(), 11, 31);
                        //alert(be_y.getFullYear() + "/" + (be_y.getMonth() + 1) + "/" + be_y.getDate());
                        vm.data.listPhieuBaoHanhThongKe = [];
                        vm.data.TuNgay = "";
                        vm.data.DenNgay = "";
                    }

                 
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
            //loadCotList();
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
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.get-filters', function (event, data) {
                vm.data.searchString = data;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getChamCongInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }

        function apDung() {
            var selectedlistPhepNam = new Array();
            for (var i = 0; i < vm.data.listPhieuBaoHanhThongKe.length; i++) {
                if (vm.data.listPhieuBaoHanhThongKe[i].isSelected) {
                    selectedlistPhieuBaoHanhThongKe.push(vm.data.listPhieuBaoHanhThongKe[i]);
                }
            }
            emitApDung(selectedlistPhepNam);
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

    $(document).ready(function () {
        $('#NhanVienListPopupSearch').on('shown.bs.collapse', function (e) {
            $('#nvSearchString').focus();
            //alert('#' + e.currentTarget.id);
        })
       
    });
    
})();
