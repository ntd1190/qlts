(function () {
    'use strict';

    angular
        .module('app')
        .controller('CongViecListCtrl', CongViecListCtrl)
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
    function CongViecListCtrl($rootScope, $scope, CongViecService, TuyChonCotService) {
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

                if (!$rootScope.isOpenPopup && vm.data.showButtonNew) {
                    $rootScope.$broadcast('CongViecEditCtrl.CongViecId', 0);
                    $rootScope.$broadcast('CongViecEditCtrl.onInitView', 0);
                    $('#popupThongTinCongViec').collapse('show');
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
        var controllerId = 'CongViecListCtrl';
        var _tableState;

        var error = {
            code: 0
        };

        var inputSearch = {
            searchString: '',
            listCongViec: [],
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
            UserLoginId:'',
            error: error,
            listCongViec: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'CongViecId', TenCot: 'ID', HienThiYN: false, DoRong: 100 },
                { MaCot: 'NgayTao', TenCot: 'Ngày tiếp nhận', HienThiYN: true, DoRong: 100 },
                { MaCot: 'TieuDe', TenCot: 'Tiêu đề', HienThiYN: true, DoRong: 10 },
                { MaCot: 'LoaiCongViec', TenCot: 'Loại CongViec', HienThiYN: true, DoRong: 10 },
            ],
            inputSearch: inputSearch,
        };

        vm.action = {
            getPage: getPage,
            search: search,
            apDung: apDung,
            addCongViec: addCongViec,
            xemCongViec: xemCongViec,
            deleteSelected: deleteSelected,
            loadCotList: loadCotList,
            GetListLuocSu:GetListLuocSu,
            // for view
            checkCot: checkCot,
        };

        vm.onInitView = onInitView;

        activate();

        /* ===========================
         * FUNCTION
         */
        function activate() { loadCotList(); }

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
                loadCotList();
            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
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
                case 'CongViecId': return false;
                case 'MaTrangThai': return false;
                case 'Ho': return false;
                default: return true;
            }
        }
        function addCongViec() {
            $('#popupThongTinCongViec').collapse('show');
            $("#btnXoaId").hide();
            $("#btnH").hide();
            $("#txtTieuDe").focus();
          
        }

        function xemCongViec(id) {
            $rootScope.$broadcast(controllerId + '.action.xemCongViec', id);
            $("#btnXoaId").show();
            $("#btnH").show();
        }

        function xoaCongViec() {

        }

        function loadCotList() {
            if (vm.data.useCotListDb) {
                TuyChonCotService.getAll('FL0008').then(function (success) {
                    if (success.data && success.data.data.length>0) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
        }

        function deleteSelected(data) {

            vm.data.isLoading = true;
            var msg = "";
            var congviecSelected = new Array();
            var ids = "";
            if (data) {
                congviecSelected.push(data);
                msg = 'Bạn có muốn xóa không?';
            }
            else {
                for (var i = 0; i < vm.data.listCongViec.length; i++) {
                    var congviec = vm.data.listCongViec[i];
                    if (congviec.isSelected) {
                        congviecSelected.push(congviec);

                    }
                }
                ids = congviecSelected.join(',');
                msg = 'Bạn có muốn xóa các mục đã chọn không?';
            }
            if (congviecSelected.length > 0) {
                for (var i = 0; i < congviecSelected.length; i++) {
                    var congviec = congviecSelected[i];
                    if (congviec.NguoiTao != vm.data.UserLoginId) {
                        alert('Bạn không có quyền xóa!')
                        return;
                    }
                }
                if (!confirm(msg)) { return; }
                CongViecService.removeList(congviecSelected).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!');
                    $('#popupThongTinCongViec').collapse('hide');
                }, function (error) {
                    vm.data.isLoading = false;
                    alert('Bạn không thể xóa!')
                });

            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
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
            var sortName = tableState.sort.predicate || 'A.CongViecId';
            var sortDir =  'desc' ;
            var searchString = vm.data.searchString;
            var fields = "";
            CongViecService.getPage(draw, start, number, searchString, sortName, sortDir, fields,vm.data.UserLoginId).then(function (success) {
                if (success.data.data) {
                    vm.data.listCongViec = success.data.data;
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
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getCongViecInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }

        function apDung() {
            var selectedListCongViec = new Array();
            for (var i = 0; i < vm.data.listCongViec.length; i++) {
                if (vm.data.listCongViec[i].isSelected) {
                    selectedListCongViec.push(vm.data.listCongViec[i]);
                }
            }
            emitApDung(selectedListCongViec);
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
        function GetListLuocSu(idCongViec, tableState) {
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
            var searchString = idCongViec + "|CongViec";
            var fields = "ngay,sukien, HoTen";
            CongViecService.getListLuocSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
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
