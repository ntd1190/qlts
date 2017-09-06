(function () {
    'use strict';

    angular
        .module('app')
        .controller('TamUngListCtrl', controller)
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

                        // Invoke the handler and digest
                        scope.$apply(function () {
                            keyDown.callback(keyDown.name, event.keyCode);
                        })
                    }
                });
            }
        }
    };
    //end HOT-KEY
    function controller($rootScope, $scope,utility, TamUngService, $window) {
        var controllerId = 'TamUngListCtrl';
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
                if (!$rootScope.isOpenPopup && vm.data.showButtonNew) {
                    $('#popupThongTinTamUng').collapse('show');
                    $("#btnXoaId").hide();
                    $("#btnH").hide();
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

            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    search();
                }


            }
        };
        //end HOT-KEY
        var _tableState = {};
        vm.data = {
            UserLoginId:'',
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            TamUngList: [],
            listNhanVienSearch: [],
            TamUngListDisplay: [],
            TamUngSelected: [],
            isLoading: false,
            searchString: '',
            tinhTrang: {
                tatCa: true,
                choDuyet: false,
                dongy: false,
                tuChoi: false,
            },

        };
        vm.action = {
            search: search,
            alert: alert,
            edit: edit,
            add: add,
            getPage: getPage,
            deleteSelected: deleteSelected,
            GetListLuocSu: GetListLuocSu,
            clearListNhanVien: clearListNhanVien,
            reset: reset,
            checkTinhTrang: checkTinhTrang,
            checkTinhTrangTatCa: checkTinhTrangTatCa,
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            eventAutoReload();
            checkTinhTrangTatCa(true);
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
        }
        function eventAutoReload() {
            $scope.$on('sa.qldnmain.tamung.tamung.reload', function (event) {
                getPage(_tableState);
            });
            $scope.$on(controllerId + '.data.listNhanVienSearch', function (event, data) {
                vm.data.listNhanVienSearch = data;
            });

        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
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
        function checkTinhTrangTatCa(status) {

            if (status) {
                vm.data.tinhTrang.tatCa = true;
            }

            if (vm.data.tinhTrang.tatCa == true) {
                vm.data.tinhTrang.choDuyet = false;
                vm.data.tinhTrang.dongY = false;
                vm.data.tinhTrang.tuChoi = false;
            }
            else {
                vm.data.tinhTrang.choDuyet = true;
            }
        }
        function checkTinhTrang() {

            if (vm.data.tinhTrang.choDuyet != true
                && vm.data.tinhTrang.dongY != true
                && vm.data.tinhTrang.tuChoi != true){

                vm.data.tinhTrang.tatCa = true;
            }
            else {
                vm.data.tinhTrang.tatCa = false;
            }
        }
        function clearListNhanVien() {
            vm.data.listNhanVienSearch = [];
        }
        function reset() {
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
            vm.data.listNhanVienSearch = [];
            checkTinhTrangTatCa(true);
        }
        function deleteSelected(data) {
          
            vm.data.isLoading = true;
            var msg = "";
            var tamungSelected = new Array();
            var ids = "";
            if (data) {
                tamungSelected.push(data);
                msg = 'Bạn có muốn xóa không?';
            }
            else {
                for (var i = 0; i < vm.data.TamUngListDisplay.length; i++) {
                    var tamung = vm.data.TamUngListDisplay[i];
                    if (tamung.isSelected) {
                        tamungSelected.push(tamung);

                    }
                }
                ids = tamungSelected.join(',');
                msg = 'Bạn có muốn xóa các mục đã chọn không?';
            }
            if (tamungSelected.length > 0) {
                
                for (var i = 0; i < tamungSelected.length; i++) {
                    var matrang = tamungSelected[i];
                    if (vm.data.UserLoginId != matrang.NguoiTao)
                    {
                        alert('Bạn không có quyền xóa hay sửa!');
                        return;
                    }
                    if (matrang.MaTrangThai != 'TU_DD') {
                        alert('Phiếu đã duyệt không được xóa hay sửa!');
                        return;
                    }
                }
                if (!confirm(msg)) { return; }
                TamUngService.removeList(tamungSelected).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!');
                    $('#popupThongTinTamUng').collapse('hide');
                }, function (error) {
                    vm.data.isLoading = false;
                    alert('Bạn không thể xóa!')
                });

            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }

        }
        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            var tinhtrang = "";
            if (vm.data.tinhTrang.choDuyet) tinhtrang = tinhtrang + "'TU_DD',";
            if (vm.data.tinhTrang.dongY) tinhtrang = tinhtrang + "'TU_DY',";
            if (vm.data.tinhTrang.tuChoi) tinhtrang = tinhtrang + "'TU_TC',";
            var NhanVienId = joinStr(vm.data.listNhanVienSearch, "NhanVienId");
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + tinhtrang + '|' + NhanVienId;
            getPage();
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
            var sortName = tableState.sort.predicate || 'TamUngId';
            var sortDir = 'desc';
            var searchString = vm.data.searchString;
            var fields = "*";
            TamUngService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId).then(function (success) {
                if (success.data.data) {
                    vm.data.TamUngListDisplay = success.data.data;
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
        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join(',');
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
        function add() {
            $rootScope.IsSelectAll = false;
            $rootScope.isOpenPopup = true;
            $('#popupThongTinTamUng').collapse('show');
            $("#btnXoaId").hide();
            $("#btnH").hide();
        }
        function edit(data) {
            $rootScope.IsSelectAll = true;
            $rootScope.$broadcast('TamUngEditCtrl.TamUngId', utility.clone(data));
            $('#popupThongTinTamUng').collapse('show');
            $("#btnXoaId").show();
            $("#btnH").show();

        }
        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function GetListLuocSu(idTamUng, tableState) {
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
            var sortName = tableState.sort.predicate || 'LuocSuId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = idTamUng + "|TamUng";
            var fields = "ngay,sukien, HoTen";
            TamUngService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data.length > 0) {
                    var msg = "";
                    $.each(success.data.data, function (i, item) {
                        var date = new Date(item.ngay);
                        msg = msg + "Ngày: " + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ", Họ tên: " + item.HoTen + ", Sự kiện: " + item.sukien + "\n";
                    });
                    alert(msg);
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

    }
})();