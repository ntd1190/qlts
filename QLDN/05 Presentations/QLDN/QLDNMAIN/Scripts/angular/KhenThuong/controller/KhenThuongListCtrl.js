(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhenThuongListCtrl', controller)
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
    function controller($rootScope, $scope, KhenThuongService, $window) {
        var vm = this;
        $rootScope.isOpenPopup = false;
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
                    $rootScope.$broadcast('KhenThuongEditCtrl.KhenThuongId', 0);
                    $rootScope.$broadcast('KhenThuongEditCtrl.onInitView', 0);
                    $('#popupThongTinKhenThuong').collapse('show');
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
            UserLoginId: '',
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            KhenThuongList: [],
            KhenThuongListDisplay: [],
            KhenThuongSelected: [],
            isLoading: false,
            searchString: '',
            hinhThuc: {
                tatCa: true,
                tienThuong: false,
                bangKhen: false,
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
            reset: reset,
            checkHinhThuc: checkHinhThuc,
            checkHinhThucTatCa: checkHinhThucTatCa,
        };
        activate();
        vm.onInitView = onInitView;
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
        function activate() {
            eventAutoReload();
            checkHinhThucTatCa(true);
        }
        function eventAutoReload() {
            $scope.$on('sa.qldnmain.khenthuong.khenthuong.reload', function (event) {
                getPage(_tableState);
            });

        }
        function reset() {
            $('#tungay').val("");
            $('#denngay').val("");
            checkHinhThucTatCa(true);
        }
        function checkHinhThucTatCa(status) {

            if (status) {
                vm.data.hinhThuc.tatCa = true;
            }

            if (vm.data.hinhThuc.tatCa == true) {
                vm.data.hinhThuc.tienThuong = false;
                vm.data.hinhThuc.bangKhen = false;
            }
            else {
                vm.data.hinhThuc.tienThuong = true;
            }
        }
        function checkHinhThuc() {

            if (vm.data.hinhThuc.tienThuong != true
                && vm.data.hinhThuc.bangKhen != true) {

                vm.data.hinhThuc.tatCa = true;
            }
            else {
                vm.data.hinhThuc.tatCa = false;
            }
        }
        function deleteSelected(id) {
            vm.data.isLoading = true;
            var khenThuongSelected = new Array();
            var ids = "";
            var msg = "";
            if (id != '' && id != null) {
                ids = id;
                msg = 'Bạn có muốn xóa không?';
            }
            else {
                for (var i = 0; i < vm.data.KhenThuongListDisplay.length; i++) {
                    var khenthuong = vm.data.KhenThuongListDisplay[i];
                    if (khenthuong.isSelected) {
                        khenThuongSelected.push(khenthuong.KhenThuongId);
                    }
                }
                ids = khenThuongSelected.join(',');
                msg = 'Bạn có muốn xóa các mục đã chọn không?';
            }
            if (ids != "") {
                if (!confirm(msg)) { return; }
                KhenThuongService.removeList(ids).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!');
                    $('#popupThongTinKhenThuong').collapse('hide');
                }, function (error) {
                    vm.data.isLoading = false;
                    alert('Khen thưởng không thể xóa!')
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
            var hinhthuc = "";
            if (vm.data.hinhThuc.tienThuong) hinhthuc = hinhthuc + "1,";
            if (vm.data.hinhThuc.bangKhen) hinhthuc = hinhthuc + "2,";
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + hinhthuc;
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
            var sortName = tableState.sort.predicate || 'KhenThuongId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = "KhenThuongId,Ngay,ho +' ' +ten as HoTen,Tien,HinhThuc,LyDo";
            KhenThuongService.getPage(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    vm.data.KhenThuongListDisplay = success.data.data;
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
            $rootScope.isOpenPopup = true;
            $rootScope.$broadcast('KhenThuongEditCtrl.KhenThuongId', 0);
            $rootScope.$broadcast('KhenThuongEditCtrl.onInitView', 0);
            $('#popupThongTinKhenThuong').collapse('show');
            $("#btnXoaId").hide();
            $("#btnH").hide();
        }

        function edit(id) {
            $rootScope.$broadcast('KhenThuongEditCtrl.KhenThuongId', id);
            $('#popupThongTinKhenThuong').collapse('show');
            $("#btnXoaId").show();
            $("#btnH").show();

        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function GetListLuocSu(idKhenThuong, tableState) {
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
            var searchString = idKhenThuong + "|KhenThuong";
            var fields = "ngay,sukien, HoTen";
            KhenThuongService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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