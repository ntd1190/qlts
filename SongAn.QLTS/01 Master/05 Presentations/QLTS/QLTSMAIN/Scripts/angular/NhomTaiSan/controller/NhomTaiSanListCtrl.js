(function () {
    'use strict';

    angular.module("app")
        .controller("NhomTaiSanListCtrl", controller)

    function controller($rootScope, $scope, NhomTaiSanService) {
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
                    $rootScope.$broadcast('NhomTaiSanEditCtrl.NhomId', 0);
                    $rootScope.$broadcast('NhomTaiSanEditCtrl.onInitView', 0);
                    $('#NhomTaiSanEditPopup').collapse('show');
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
            NhomTaiSanList: [],
            NhomTaiSanListDisplay: [],
            NhomTaiSanSelected: [],
            isLoading: false,
            searchString: ''
        };

        vm.action = {
            alert: alert,
            edit: edit,
            add: add,            
            apDung: apDung,
            getPage: getPage,
            deleteSelected: deleteSelected,
        };


        activate();
        vm.onInitView = onInitView;
        function activate() {
            eventAutoReload();
        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
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
        function eventAutoReload() {
            $scope.$on('sa.qltsmain.NhomTaiSan.NhomTaiSan.reload', function (event) {
                getPage(_tableState);
            });
        }

        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var NhomTaiSanSelected = new Array();

            for (var i = 0; i < vm.data.NhomTaiSanListDisplay.length; i++) {
                var NhomTaiSan = vm.data.NhomTaiSanListDisplay[i];
                if (NhomTaiSan.isSelected) {
                    NhomTaiSanSelected.push(NhomTaiSan.NhomId);
                }
            }
            var ids = NhomTaiSanSelected.join(',');

            NhomTaiSanService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                alert('Xóa thành công!')
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
            var sortName = tableState.sort.predicate || 'NhomId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var CoSoId = vm.data.userInfo.CoSoId;
            var NhanVienId = vm.data.userInfo.NhanVienId;
            NhomTaiSanService.getPage(draw, start, number, searchString, sortName, sortDir, CoSoId, NhanVienId).then(function (success) {
                if (success.data.data) {
                    vm.data.NhomTaiSanListDisplay = success.data.data;
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
            $rootScope.NhomId = 0;
            $('#NhomTaiSanEditPopup').collapse('show');
            $("#txtMa").focus();
            $rootScope.isOpenPopup = true;
        }
     
        function edit(id) {
            $rootScope.$broadcast('NhomTaiSanEditCtrl.NhomId', id);
            $('#NhomTaiSanEditPopup').collapse('show');
            $("#txtMa").focus();
            $rootScope.isOpenPopup = true;
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function apDung() {
            var selectedList = new Array();
            var NhomTaiSanListDisplay = vm.data.NhomTaiSanListDisplay;
            for (var i = 0; i < NhomTaiSanListDisplay.length; i++) {
                if (NhomTaiSanListDisplay[i].isSelected) {
                    selectedList.push(NhomTaiSanListDisplay[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit('NhomTaiSanListPopup.action.ap-dung', selectedList);
        }

    }
})();