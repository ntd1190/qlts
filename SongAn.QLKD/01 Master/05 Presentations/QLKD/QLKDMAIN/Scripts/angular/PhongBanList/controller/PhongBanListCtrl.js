(function () {
    'use strict';

    angular.module("app")
        .controller("PhongBanListCtrl", controller)

    function controller($rootScope, $scope, PhongBanService) {
        var vm = this;
        //HOT-KEY       
        vm.keys = {
          
            //press F2 -> open popup
            F2: function (name, code) {                
                if (!$rootScope.isOpenPopup && vm.data.showButtonNew) {
                    $rootScope.$broadcast('PhongBanEditCtrl.PhongBanId', 0);
                    $rootScope.$broadcast('PhongBanEditCtrl.onInitView', 0);
                    $('#PhongBanEditPopup').collapse('show');
                    $rootScope.isOpenPopup = true;
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
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
            UserLoginId: '',
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            PhongBanList: [],
            PhongBanListDisplay: [],
            PhongBanSelected: [],
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
        function eventAutoReload() {
            $scope.$on('sa.qldnmain.phongban.phongban.reload', function (event) {
                getPage(_tableState);
            });
        }

        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var phongBanSelected = new Array();

            for (var i = 0; i < vm.data.PhongBanListDisplay.length; i++) {
                var phongban = vm.data.PhongBanListDisplay[i];
                if (phongban.isSelected) {
                    phongBanSelected.push(phongban.PhongBanId);
                }
            }
            var ids = phongBanSelected.join(',');

            PhongBanService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                alert('Xóa thành công!')
            }, function (error) {
                vm.data.isLoading = false;
                alert('Phòng ban đã được sử dụng không thể xóa!')
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
            var start = /*tableState.pagination.start ||*/ 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = /*tableState.pagination.number ||*/ 10;  // Number of entries showed per page.
            var sortName = /*tableState.sort.predicate ||*/ 'PhongBanId';
            var sortDir = /*tableState.sort.reverse ? 'desc' :*/ 'asc';
            var searchString = vm.data.searchString;
            var fields = 'PhongBanId,MaPhongBan,TenPhongBan,GhiChu,HoTen,NgayTao';
            PhongBanService.getPage(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    vm.data.PhongBanListDisplay = success.data.data;
                   // tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);//set the number of pages so the pagination can update
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
            $rootScope.PhongBanId = 0;
            $('#PhongBanEditPopup').collapse('show');
            $("#txtMa").focus();
            $rootScope.isOpenPopup = true;
        }
     
        function edit(id) {
            $rootScope.$broadcast('PhongBanEditCtrl.phongBanId', id);
            $('#PhongBanEditPopup').collapse('show');
            $("#txtMa").focus();
            $rootScope.isOpenPopup = true;
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function apDung() {
            var selectedList = new Array();
            var PhongBanListDisplay = vm.data.PhongBanListDisplay;
            for (var i = 0; i < PhongBanListDisplay.length; i++) {
                if (PhongBanListDisplay[i].isSelected) {
                    selectedList.push(PhongBanListDisplay[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit('PhongBanListPopup.action.ap-dung', selectedList);
        }

    }
})();