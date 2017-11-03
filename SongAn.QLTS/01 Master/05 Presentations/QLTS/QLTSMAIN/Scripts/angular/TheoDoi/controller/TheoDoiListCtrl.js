(function () {
    'use strict';

    angular.module("app")
        .controller("TheoDoiListCtrl", controller)
        .filter("sumOfValue", filter);

    function filter(){
        return function (data, key) {
            if (angular.isUndefined(data) || angular.isUndefined(key))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + parseInt(value[key], 10);
            });
            return sum;
        };
    }

    function controller($rootScope, $scope, TheoDoiService, TuyChonCotService, utility) {
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
                if (!$rootScope.isOpenPopup && vm.data.showButtonNew) {
                    var data = {};
                    data.taiSanId = 0;
                    data.phongBanId = 0;
                    data.nhanVienId = 0;

                    $rootScope.$broadcast('TheoDoiEditCtrl.TheoDoiId', data);
                    $('#TheoDoiEditPopup').collapse('show');
                    $("#txtMaTaiSan").focus();
                    $rootScope.isOpenPopup = true;
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    $("#txtsearch").focus();
                    getPage();
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    return;
                }
            }
        };
        //end HOT-KEY
        var _tableState = {};
        vm.data = {
            userInfo: {},
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            TheoDoiListDisplay: [],
            TheoDoiSelected: [],
            isLoading: false,
            searchString: '',
            listCot: []
        };

        vm.action = {
            alert: alert,
            edit: edit,
            add: add,
            getPage: getPage,
            deleteSelected: deleteSelected,
            loadCotList: loadCotList,
            checkCot: checkCot
        };


        activate();
        vm.onInitView = onInitView;
        function activate() {
            eventAutoReload();
            loadCotList();
        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
                setEnableButton();
                loadCotList();
            }
            catchTuyChonCotPopupEvent();
        }
        function loadCotList() {
            if (1 === 1) {
                TuyChonCotService.getAll('FL0022', vm.data.userInfo.UserId).then(function (success) {
                    if (success.data && success.data.data) {
                        vm.data.listCot = success.data.data;
                    }
                }, function (error) { });
            }
        }
        // kiểm tra ẩn hiện cột
        function checkCot(cot) {
            if (!cot.HienThiYN || cot.HienThiYN == false) {
                return false;
            }

            switch (cot.MaCot) {
                default: return true;
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
        function eventAutoReload() {
            $scope.$on('sa.qltsmain.TheoDoi.TheoDoi.reload', function (event) {
                getPage(_tableState);
            });
        }

        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $rootScope.$on('TuyChonCotPopup' + '.action.ap-dung', function (event, data) {
                $('#' + 'TuyChonCotPopup').collapse('hide');
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $(document).ready(function () {
                $('#' + 'TuyChonCotPopup').on('show.bs.collapse', function () {
                    $rootScope.$broadcast('TuyChonCotPopup' + '.action.refresh');
                });
            });
        }

        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var TheoDoiSelected = new Array();

            for (var i = 0; i < vm.data.TheoDoiListDisplay.length; i++) {
                var TheoDoi = vm.data.TheoDoiListDisplay[i];
                if (TheoDoi.isSelected) {
                    TheoDoiSelected.push(TheoDoi.TaiSanId + '_' + TheoDoi.PhongBanId + '_' + TheoDoi.NhanVienId + '_' + TheoDoi.Nam);
                }
            }
            var ids = TheoDoiSelected.join(',');

            TheoDoiService.removeList(ids).then(function (success) {

                if (success.data.data > 0) {
                    if (TheoDoiSelected.length > parseInt(success.data.data)) {
                        var sl = TheoDoiSelected.length - parseInt(success.data.data);
                        utility.AlertSuccess(sl + ' dòng được xóa thành công.');
                    }
                    else
                        utility.AlertError('Không thể xóa!');
                }
                else {
                    utility.AlertSuccess('Xóa thành công!');
                }

                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);

            }, function (error) {
                vm.data.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });

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
            var sortName = tableState.sort.predicate || 'TaiSanId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var CoSoId = vm.data.userInfo.CoSoId;
            var NhanVienId = vm.data.userInfo.NhanVienId;
            TheoDoiService.GetPage(draw, start, number, searchString, sortName, sortDir, CoSoId, NhanVienId).then(function (success) {
                if (success.data.data) {
                    vm.data.TheoDoiListDisplay = success.data.data;
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

            $('#TheoDoiEditPopup').collapse('show');
            $("#txtMaTaiSan").focus();
            $rootScope.isOpenPopup = true;
        }

        function edit(taiSanId, phongBanId, nhanVienId, nam) {
            var data = {};
            data.taiSanId = taiSanId;
            data.phongBanId = phongBanId;
            data.nhanVienId = nhanVienId;
            data.nam = nam;
            $rootScope.$broadcast('TheoDoiEditCtrl.TheoDoiId', data);
            $('#TheoDoiEditPopup').collapse('show');
            $("#txtMaTaiSan").focus();
            $rootScope.isOpenPopup = true;
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }


    }
})();