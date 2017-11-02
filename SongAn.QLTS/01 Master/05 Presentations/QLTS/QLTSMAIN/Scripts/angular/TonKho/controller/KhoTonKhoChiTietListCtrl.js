(function () {
    'use strict';

    angular.module("app")
        .controller("KhoTonKhoChiTietListCtrl", controller)

    function controller($rootScope, $scope, KhoTonKhoService, $window, utility, $timeout) {
        var vm = this;
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
                if (vm.data.showButtonNew) {
                    add();
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    $("#txtsearch").focus();
                    getPageDetail();
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save();
                }
            }
        };
        //end HOT-KEY
        var _tableState = {};
        var KhoTaiSanId = 0;
        vm.data = {
            userInfo: {},
            showButtonNew: false,
            showButtonXoaChon: false,
            showButtonSave:false,
            listQuyenTacVu: [],
            KhoTonKhoList: [],
            KhoTonKhoListDisplay: [],
            KhoTonKhoSelected: [],
            isLoading: false,
            searchString: '',
            TenTaiSan: '',
            ThangNam: '',
            objThongTin: {},
            UserLoginId: '',
            CoSoId: '',
        };

        vm.action = {
            getPageTonKho: getPageTonKho,
            DongY: DongY
        };
        vm.status = {
            isLoading: false,
            isInValidMaTaiSan: false,
            isInValidTenTaiSan: false,
            isInValidNguonNganSach: false,
            isInValidSoLuong: false,
            isInValidDonGia: false,
        };
        activate();
        vm.onInitView = onInitView;
        vm.action.goBack = function () {
            window.history.back();
        };
        function activate() {
            eventAutoReload();
        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                vm.data.CoSoId = config.userInfo.CoSoId;
            }
            if (KhoTaiSanId == 0) $('#KhoTonKhoEditPopup').collapse('show');
        }

        function eventAutoReload() {
            $scope.$on('sa.qltsmain.KhoTonKho.KhoTonKho.reload', function (event) {
                getPageTonKho(_tableState);
            });
        }

        function getPageTonKho(tableState) {
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
            utility.addloadding($('body'));
            tableState.draw = tableState.draw + 1 || 1;
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'KhoTonKhoId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var CoSoId = vm.data.userInfo.CoSoId;
            var NhanVienId = vm.data.userInfo.NhanVienId;

            KhoTonKhoService.getPageTonKho(draw, start, number, searchString, sortName, sortDir, CoSoId, NhanVienId, KhoTaiSanId).then(function (success) {
                if (success.data.data.length>0) {
                    vm.data.KhoTonKhoListDisplay = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);
                }
                $('#bgloadding').remove();
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);
                }
                $('#bgloadding').remove();
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

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function DongY()
        {
            KhoTaiSanId = vm.data.objThongTin.KhoTaiSanId;
            getPageTonKho(_tableState);
            $('#KhoTonKhoEditPopup').collapse('hide');
        }


    }
})();