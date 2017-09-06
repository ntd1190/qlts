(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChamCongListCtrl', ChamCongListCtrl)
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
    function ChamCongListCtrl($rootScope, $scope, ChamCongService, TuyChonCotService) {
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
                    $rootScope.$broadcast('ChamCongEditCtrl.ChamCongId', 0);
                    $rootScope.$broadcast('ChamCongEditCtrl.onInitView', 0);
                    $('#popupThongTinChamCong').collapse('show');
                    $("#btnXoaId").hide();
                    $("#btnH").hide();
                    $("#txtMaChamCong").focus();
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
        var controllerId = 'ChamCongListCtrl';
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
            TongCongTac:0,
            Tong:0,
            CountCol: 1,
            showButtonNew: false,
            showButtonXoaChon: false,
            isLoading: false,
            showList: false,
            useCotListDb: true,
            UserLoginId: '',
            error: error,
            listChamCong: [],
            listQuyenTacVu: [],
            listCot: [
                { MaCot: 'ChamCongId', TenCot: 'ID', HienThiYN: false, DoRong: 100 },
                { MaCot: 'NgayTao', TenCot: 'Ngày tiếp nhận', HienThiYN: true, DoRong: 100 },
                { MaCot: 'TieuDe', TenCot: 'Tiêu đề', HienThiYN: true, DoRong: 10 },
                { MaCot: 'LoaiChamCong', TenCot: 'Loại ChamCong', HienThiYN: true, DoRong: 10 },
            ],
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
        function activate() {
            loadCotList();
           
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
                loadCotList();
                
            }
            if (config && config.showList) {
                vm.data.showList = config.showList;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
                vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + vm.data.UserLoginId + '|';
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
                case 'CtrVersion': return false;
                case 'ChamCongId': return false;
                case 'MaTrangThai': return false;
                case 'Ho': return false;
                default: return true;
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
            var sortName = tableState.sort.predicate || 'A.ChamCongId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = "";

            ChamCongService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId).then(function (success) {
                if (success.data.data) {
                    vm.data.listChamCong = success.data.data;
                    var NhanVienId = "";
                    var appen = "";
                    var k = 1;
                    if (vm.data.listChamCong.length > 0) {
                        for (var i = 0; i < vm.data.listChamCong.length; i++) {

                            var chamcong = vm.data.listChamCong[i];
                            if (NhanVienId != chamcong.NhanVienId) {

                                if (NhanVienId != "") {
                                    appen = appen + "<tfoot>";
                                    appen = appen + " <tr>";
                                    appen = appen + " <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Tổng</td>";
                                    appen = appen + " <td class='text-primary text-center'>" + vm.data.TongTre + "</td>";
                                    appen = appen + " <td class='text-primary text-center'>" + vm.data.TongSom + "</td>";
                                    appen = appen + " </tr>";
                                    appen = appen + "<tr>";
                                    appen = appen + " <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Nghỉ có phép</td>";
                                    appen = appen + "  <td class='text-primary text-center' colspan='2'>" + vm.data.TongPhep + "</td>";
                                    appen = appen + "</tr>";
                                    appen = appen + " <tr>";
                                    appen = appen + "  <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Nghỉ không phép</td>";
                                    appen = appen + " <td class='text-primary text-center' colspan='2'>" + vm.data.TongKhongPhep + "</td>";
                                    appen = appen + " </tr>";
                                    appen = appen + " <tr>";
                                    appen = appen + "  <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Công tác</td>";
                                    appen = appen + " <td class='text-primary text-center' colspan='2'>" + vm.data.TongCongTac + "</td>";
                                    appen = appen + " </tr>";
                                    appen = appen + " <tr>";
                                    appen = appen + "  <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Số ngày chấm công</td>";
                                    appen = appen + " <td class='text-primary text-center' colspan='2'>" +  vm.data.Tong + "</td>";
                                    appen = appen + " </tr>";
                                    appen = appen + " </tfoot>";
                                    appen = appen + "</table>";
                                }
                                k = 1;
                                vm.data.TongTre = 0;
                                vm.data.TongSom = 0;
                                vm.data.TongPhep = 0;
                                vm.data.TongCongTac = 0;
                                vm.data.TongKhongPhep = 0;
                                vm.data.Tong = 0;
                                appen = appen + "<div class='panel-body'>";
                                appen = appen + "<h4><i class='ng-binding'>" + chamcong.NhanVien + "</i><i class='ng-binding' style='float:right'>" + vm.data.searchString.split('|')[0] + "~" + vm.data.searchString.split('|')[1] + "</i></h4>";
                                appen = appen + "</div>"
                                appen = appen + "<table class='table table-bordered table-condensed table-responsive table-hover'>";
                                appen = appen + "<thead class='bg-default text-primary'>";
                                appen = appen + "<tr>";
                                appen = appen + "<th class='text-center' style='width: 50px;'>#</th>";
                                for (var j = 0; j < vm.data.listCot.length; j++) {
                                    if (vm.data.listCot[j].HienThiYN) {
                                        appen = appen + "<th class='text-center'>" + vm.data.listCot[j].TenCot + "</th>";
                                    }
                                }
                                appen = appen + "<th class='text-center' style='width: 100px;'>Đi trễ</th>";
                                appen = appen + "<th class='text-center' style='width: 100px;'>Về sớm</th>";
                                appen = appen + "</tr>";
                                appen = appen + "</thead>";
                                appen = appen + "<tbody>";
                                appen = appen + "<tr>";
                                appen = appen + "<td class='text-center'>" + k + "</td>";
                                for (var j = 0; j < vm.data.listCot.length; j++) {
                                    var cot = vm.data.listCot[j].MaCot;
                                    if (vm.data.listCot[j].HienThiYN) {
                                        appen = appen + "<td class='text-center'>" + chamcong[cot] + "</td>";
                                    }
                                }
                                appen = appen + "<td class='text-center'>" + (chamcong.DiTre == '1' ? 'trễ' : '') + "</td>";
                                appen = appen + "<td class='text-center'>" + (chamcong.VeSom == '1' ? 'sớm' : '') + "</td>";
                                appen = appen + "</tr>";
                                vm.data.TongTre = vm.data.TongTre + parseInt(chamcong.DiTre);
                                vm.data.TongSom = vm.data.TongSom + parseInt(chamcong.VeSom);
                                vm.data.TongPhep = vm.data.TongPhep + parseInt(chamcong.NghiPhep);
                                vm.data.TongKhongPhep = vm.data.TongKhongPhep + parseInt(chamcong.NghiKhongPhep)
                                vm.data.TongCongTac = vm.data.TongCongTac + parseInt(chamcong.CongTac)
                                vm.data.Tong = vm.data.Tong + parseInt(chamcong.Tong)
                            }
                            else {
                                appen = appen + "<tr>";
                                appen = appen + "<td class='text-center'>" + ++k + "</td>";
                                for (var j = 0; j < vm.data.listCot.length; j++) {
                                    var cot = vm.data.listCot[j].MaCot;
                                    if (vm.data.listCot[j].HienThiYN) {
                                        appen = appen + "<td class='text-center'>" + chamcong[cot] + "</td>";
                                    }
                                }
                                appen = appen + "<td class='text-center'>" + (chamcong.DiTre == '1' ? 'trễ' : '') + "</td>";
                                appen = appen + "<td class='text-center'>" + (chamcong.VeSom == '1' ? 'sớm' : '') + "</td>";
                                appen = appen + "</tr>";
                                vm.data.TongTre = vm.data.TongTre + parseInt(chamcong.DiTre);
                                vm.data.TongSom = vm.data.TongSom + parseInt(chamcong.VeSom);
                                vm.data.TongPhep = vm.data.TongPhep + parseInt(chamcong.NghiPhep);
                                vm.data.TongKhongPhep = vm.data.TongKhongPhep + parseInt(chamcong.NghiKhongPhep)
                                vm.data.TongCongTac = vm.data.TongCongTac + parseInt(chamcong.CongTac)
                                vm.data.Tong = vm.data.Tong + parseInt(chamcong.Tong)
                            }
                            NhanVienId = chamcong.NhanVienId


                        }
                        appen = appen + "<tfoot>";
                        appen = appen + " <tr>";
                        appen = appen + " <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Tổng</td>";
                        appen = appen + " <td class='text-primary text-center'>" + vm.data.TongTre + "</td>";
                        appen = appen + " <td class='text-primary text-center'>" + vm.data.TongSom + "</td>";
                        appen = appen + " </tr>";
                        appen = appen + "<tr>";
                        appen = appen + " <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Nghỉ có phép</td>";
                        appen = appen + "  <td class='text-primary text-center' colspan='2'>" + vm.data.TongPhep + "</td>";
                        appen = appen + "</tr>";
                        appen = appen + " <tr>";
                        appen = appen + "  <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Nghỉ không phép</td>";
                        appen = appen + " <td class='text-primary text-center' colspan='2'>" + vm.data.TongKhongPhep + "</td>";
                        appen = appen + " </tr>";
                        appen = appen + " <tr>";
                        appen = appen + "  <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Công tác</td>";
                        appen = appen + " <td class='text-primary text-center' colspan='2'>" + vm.data.TongCongTac + "</td>";
                        appen = appen + " </tr>";
                        appen = appen + " <tr>";
                        appen = appen + "  <td class='text-primary text-center'  colspan='" + vm.data.CountCol + "'>Số ngày chấm công</td>";
                        appen = appen + " <td class='text-primary text-center' colspan='2'>" + vm.data.Tong + "</td>";
                        appen = appen + " </tr>";
                        appen = appen + " </tfoot>";
                        appen = appen + "</table>";
                       
                    }
                    $("#ListTables").html(appen);
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
                getPage(_tableState);
            });

            $scope.$on(controllerId + '.action.getInfo', function (event, data) {
                var list = getChamCongInfo(data);
                $scope.$emit(controllerId + '.data.listInfo', list);
            });
        }

        function apDung() {
            var selectedListChamCong = new Array();
            for (var i = 0; i < vm.data.listChamCong.length; i++) {
                if (vm.data.listChamCong[i].isSelected) {
                    selectedListChamCong.push(vm.data.listChamCong[i]);
                }
            }
            emitApDung(selectedListChamCong);
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
