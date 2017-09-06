(function () {
    'use strict';

    angular.module("app")
        .controller("NgayNghiListCtrl", NgayNghiList)

    function NgayNghiList($rootScope, $scope, NgayNghiService) {
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
                debugger
                if (!$rootScope.isOpenPopup && vm.data.showButtonNew) {
                   
                    $rootScope.$broadcast('NgayNghiEditCtrl.Ngay', 0);
                    $('#NgayNghiEditPopup').collapse('show');
                    $rootScope.isOpenPopup = true;
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    getPage();
                }                
            },

          
        };
        //end HOT-KEY
        var _tableState;
        vm.data = {
            UserLoginId: '',
            showButtonNew: false,
            showButtonXoaChon: false,
            listQuyenTacVu: [],
            NgayNghiList: [],
            NgayNghiListDisplay: [],
            NgayNghiSelected: [],
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
            $scope.$on('sa.qldnmain.ngaynghi.ngaynghi.reload', function (event) {
                getPage(_tableState);
            });
        }
        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }
            debugger
            vm.data.isLoading = true;

            var ngayNghiSelected = new Array();

            for (var i = 0; i < vm.data.NgayNghiListDisplay.length; i++) {
                var ngaynghi = vm.data.NgayNghiListDisplay[i];
                if (ngaynghi.isSelected) {
                    ngayNghiSelected.push(ngaynghi.Ngay);
                }
            }
            var ids = ngayNghiSelected.join(',');

            NgayNghiService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                alert('Xóa thành công!')
            }, function (error) {
                vm.data.isLoading = false;
                alert('Không thể xóa!')
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
            var sortName = /*tableState.sort.predicate ||*/ 'Ngay';
            var sortDir = /*tableState.sort.reverse ? 'desc' :*/ 'asc';
            var searchString = vm.data.searchString;
            var fields = 'a.Ngay,a.MoTa,a.NguoiTao,a.NgayTao,a.XoaYN';
            NgayNghiService.getPage(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    vm.data.NgayNghiListDisplay = success.data.data;
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
            $rootScope.Ngay = 0;
            $('#NgayNghiEditPopup').collapse('show');
            $rootScope.isOpenPopup = true;
        }
        function edit(id) {
            $rootScope.$broadcast('NgayNghiEditCtrl.ngayNghiId', id);
            $('#NgayNghiEditPopup').collapse('show');
            $rootScope.isOpenPopup = true;
        }
        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function apDung() {
            var selectedList = new Array();
            var NgayNghiListDisplay = vm.data.NgayNghiListDisplay;
            for (var i = 0; i < NgayNghiListDisplay.length; i++) {
                if (NgayNghiListDisplay[i].isSelected) {
                    selectedList.push(NgayNghiListDisplay[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit('NgayNghiListPopup.action.ap-dung', selectedList);
        }

    }
})();