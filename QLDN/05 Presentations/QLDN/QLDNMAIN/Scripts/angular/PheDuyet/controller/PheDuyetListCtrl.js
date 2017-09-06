(function () {
    'use strict';

    angular
        .module('app')
        .controller('PheDuyetListCtrl', PheDuyetListCtrl)
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
    function PheDuyetListCtrl($rootScope, $scope, PheDuyetService, TamUngService) {
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
        var controllerId = 'PheDuyetListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            listPheDuyet: [],
            dangLamViec: '',
        };



        /* ========================
         * VIEW MODEL
         */
        vm.data = {
            showButtonDuyet:false,
            isLoading: false,
            LoginId: '',
            NguoiDungId:'',
            error: error,
            listPheDuyet: [],
            listQuyenTacVu: [],

            inputSearch: inputSearch,
        };

        vm.action = {
            getPage: getPage,
            search: search,
            DongY: DongY,
            TuChoi: TuChoi,
            Xem: Xem
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() { }

        function search() {
            if (vm.data.showList) {
                getPage();
            } else {
                vm.data.showList = true;
            }
        }
        // nhận cấu hình từ giao diện
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.LoginId = config.userInfo.NhanVienId;
                vm.data.NguoiDungId = config.userInfo.UserId;
                setEnableButton();
            }
            initEventListener();
        }
        function setEnableButton() {
            debugger
            if (vm.data.listQuyenTacVu.length > 0) {
                vm.data.showButtonDuyet = false;
                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("A") > 0) {
                    vm.data.showButtonDuyet = true;
                }


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
            var sortName = tableState.sort.predicate || 'NgayTao';
            var sortDir = 'desc';
            var searchString = vm.data.searchString;
            var fields = "";
            PheDuyetService.getPage(draw, start, number, searchString, sortName, sortDir, fields,vm.data.LoginId).then(function (success) {
                if (success.data.data) {
                    vm.data.listPheDuyet = success.data.data;
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
        }
        function DongY() {

            updatePheDuyet("_DY", "Bạn có đồng ý duyệt hay không?")
        }
        function TuChoi() {
            updatePheDuyet("_TC", "Bạn có muốn từ chối duyệt hay không?")
        }

        function updatePheDuyet(trangThai, msg) {
            var table = "";
            var field = "";
            var where = "";
            var MaTrangThai = "";
            var MaTrangThaiCT = "";
            var NguoiDuyet = "";
            var PheDuyetId = "";
            for (var i = 0; i < vm.data.listPheDuyet.length; i++) {
                var pheduyet = vm.data.listPheDuyet[i];
                if (pheduyet.isSelected) {
                    if (pheduyet.MaTrangThai.substring(pheduyet.MaTrangThai.length - 2, pheduyet.MaTrangThai.length) != "DD") {
                        alert("Phiếu đã duyệt không được phép duyệt lại!");
                        return;
                    }
                    table = pheduyet.TableName;
                    MaTrangThai = "MaTrangThai = '" + pheduyet.MA + trangThai + "'";
                    MaTrangThaiCT = "MaTrangThai = '" + pheduyet.MA + "CT" + trangThai + "'";
                    NguoiDuyet = "NguoiDuyet = '" + vm.data.NguoiDungId + "'";
                    field = MaTrangThai + "," + NguoiDuyet;
                    if (pheduyet.SoTien != 0) field = field + ",ThanhToan = '" + pheduyet.SoTien + "'";
                    PheDuyetId = pheduyet.PheDuyetId;
                    where = pheduyet.TableName + "Id = '" + PheDuyetId + "'";;
                }
            }
            if (!confirm(msg)) { return; }
            PheDuyetService.Update(table, field, where);
            if (table == 'PhieuCongTac') PheDuyetService.Update(table + "ChiTiet", MaTrangThaiCT, table + "Id='" + PheDuyetId + "'");
            if (table == 'DeNghiThanhToan') PheDuyetService.Update(table + "ChiTiet", MaTrangThaiCT, table + "Id='" + PheDuyetId + "'");

            // 20170608 BINHNT fix lỗi load danh sách trước khi phê duyệt hoàn tất
            setTimeout(function () {
                console.log('setTimeout');
                getPage(_tableState);
            }, 500);
        }
        function Xem(loaiPhieu, PheDuyetId) {
            if (loaiPhieu == "TU") {
                TamUngService.getById(PheDuyetId).then(function (result) {
                    if (result.data.data.length > 0) {
                        $rootScope.$broadcast('TamUngEditCtrl.TamUngId', result.data.data[0]);
                        $('#popupThongTinTamUng').collapse('show');
                    }
                })
            }
            if (loaiPhieu == "NP") {
                $rootScope.$broadcast(controllerId + '.action.xemNghiPhep', PheDuyetId);
                $('#NghiPhepEditPopup').collapse('show');

            }
            if (loaiPhieu == "TC") {
                $rootScope.$broadcast(controllerId + '.action.xemTangCa', PheDuyetId);
                $('#TangCaEditPopup').collapse('show');

            }
            if (loaiPhieu == "PCT") {
                window.open("/QLDNMAIN/phieucongtac/Duyet/" + PheDuyetId);

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
                _tableState.pagination.start = 0;
                vm.data.searchString = data;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getPheDuyetInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
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
