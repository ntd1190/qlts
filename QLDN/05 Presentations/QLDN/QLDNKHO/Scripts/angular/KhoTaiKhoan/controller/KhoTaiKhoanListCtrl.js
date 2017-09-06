(function () {
    'use strict';

    angular.module("app")
        .controller("KhoTaiKhoanListCtrl", controller)


    function controller($rootScope, $scope, KhoTaiKhoanService) {
        var vm = this;
        vm.controllerId = 'KhoTaiKhoanListCtrl';
        vm.title = 'Danh sách tài khoản';
        //HOT-KEY       
        vm.keys = {
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
                if (!$rootScope.isOpenPopup) {
                    $rootScope.$broadcast('KhoTaiKhoanEditCtrl.KhoTaiKhoanId', 0);
                    $rootScope.$broadcast('KhoTaiKhoanEditCtrl.onInitView', 0);
                    $('#KhoTaiKhoanEditPopup').collapse('show');
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
            KhoTaiKhoanList: [],
            KhoTaiKhoanListDisplay: [],
            KhoTaiKhoanSelected: [],
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
        }
        function onInitView(config) {
            if (!!config && !!config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.title) {
                vm.title = config.title;
            }
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                setEnableButton();
            }
            $(document).ready(function () {
                $('#' + vm.controllerId).on('shown.bs.collapse', function () {
                    $('#' + vm.controllerId + ' input[autofocus]').focus();
                });
            });
            eventAutoReload();
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
            $scope.$on(vm.controllerId+'.reload', function (event) {
                getPage(_tableState);
            });
        }

        function deleteSelected() {
          

            vm.data.isLoading = true;

            var KhoTaiKhoanSelected = new Array();

            for (var i = 0; i < vm.data.KhoTaiKhoanListDisplay.length; i++) {
                var KhoTaiKhoan = vm.data.KhoTaiKhoanListDisplay[i];
                if (KhoTaiKhoan.isSelected) {
                    KhoTaiKhoanSelected.push(KhoTaiKhoan.TaiKhoanId);
                }
            }
            var ids = KhoTaiKhoanSelected.join(',');
            if (ids != "") {
                if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }
                KhoTaiKhoanService.removeList(ids).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!')
                }, function (error) {
                    vm.data.isLoading = false;
                    alert('Không thể xóa!')
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
            var start = /*tableState.pagination.start ||*/ 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = /*tableState.pagination.number ||*/ 10;  // Number of entries showed per page.
            var sortName = /*tableState.sort.predicate ||*/ 'TaiKhoanId';
            var sortDir = /*tableState.sort.reverse ? 'desc' :*/ 'asc';
            var searchString = vm.data.searchString;
            var fields = 'a.TaiKhoanId,a.MaNhom,a.TenNhom,a.MoTa,a.NguoiTao,a.NgayTao,a.XoaYN';
            KhoTaiKhoanService.getPage(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    vm.data.KhoTaiKhoanListDisplay = success.data.data;
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
            $rootScope.KhoTaiKhoanId = 0;
            $('#KhoTaiKhoanEditPopup').collapse('show');
            $("#txtMa").focus();
            $rootScope.isOpenPopup = true;
        }
     
        function edit(id) {
            $rootScope.$broadcast('KhoTaiKhoanEditCtrl.KhoTaiKhoanId', id);
            $('#KhoTaiKhoanEditPopup').collapse('show');
            $("#txtMa").focus();
            $rootScope.isOpenPopup = true;
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        function apDung() {
            var selectedList = new Array();
            var KhoTaiKhoanListDisplay = vm.data.KhoTaiKhoanListDisplay;
            for (var i = 0; i < KhoTaiKhoanListDisplay.length; i++) {
                if (KhoTaiKhoanListDisplay[i].isSelected) {
                    selectedList.push(KhoTaiKhoanListDisplay[i]);
                }
            }
            console.log(selectedList);
            $scope.$emit( vm.controllerId+'.action.ap-dung', selectedList);
        }

    }
})();