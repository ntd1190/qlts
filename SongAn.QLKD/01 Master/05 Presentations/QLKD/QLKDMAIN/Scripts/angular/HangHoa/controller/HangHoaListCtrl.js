(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'hangHoaList',
            url: '/hanghoa/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: HangHoaListCtrl
        });
    });

    function HangHoaListCtrl($stateParams, SETTING,$scope, $q, utility, HangHoaService) {
        var userInfo, _tableState;

        var HangHoaId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };
        $scope.isOpenPopupTimKiem = false;
        vm.error = {};
        vm.data = {};
        vm.inputSearch = {};

        vm.data.listCot = [
            { MaCot: 'MaNhom', TenCot: 'Mã', HienThiYN: true, DoRong: 90 },
            { MaCot: 'TenNhom', TenCot: 'Tên', HienThiYN: true, DoRong: 300 },
            { MaCot: 'NgayTao', TenCot: 'Ngày tạo', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenNguoiTao', TenCot: 'Người tạo', HienThiYN: true, DoRong: 200 },
        ];

        /* INIT / EVENT FUNCTION */

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};

            initEventListener();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'HangHoa/showView?viewName=list';
        }

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {
                    vm.action.edit(0);
                }
            },
            F3: function (name, code) {
                console.log('F3');
                if (!$scope.isOpenPopupTimKiem) {
                    $('#SearchCollapse').collapse('show');
                    $scope.isOpenPopupTimKiem = true;
                } else {
                    $('#SearchCollapse').collapse('hide');
                    $scope.isOpenPopupTimKiem = false;
                }
               
            },
            F8: function (name, code) {
                console.log('F8');
                vm.action.search();
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            },
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
                } else {
                    $(document).find('input[autofocus]').focus();
                }
            },
        };

        function initEventListener() {
            $(document).ready(function () { // #DiaBanEditPopup
                $('#HangHoaEditPopup').on('hidden.bs.collapse', function () {
                    vm.status.isOpenPopup = false;
                    resetPopup();
                    $("#HangHoaList input[autofocus]").focus();
                });
                $('#HangHoaEditPopup').on('shown.bs.collapse', function () {
                    vm.status.isOpenPopup = true;
                    $("#HangHoaEditPopup input[autofocus]").focus();
                });
            });
        }


        activate();
        function activate() { }

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.getPage = function (tableState) {
            vm.status.isLoading = true;
            getPage(tableState).then(function (success) {
                vm.status.isSelectedAll = false;
                vm.status.isLoading = false;
            }, function (error) {
                vm.status.isLoading = false;
            });
        }
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }
        vm.action.getListCot = function (data) {

            vm.data.listCot = data;
        }
        vm.action.checkCot = function (cot) {
            return cot.HienThiYN;
        };
        vm.action.edit = function (id) {
            resetPopup();
            HangHoaId = id || 0;
            if (HangHoaId > 0) {
                getById(HangHoaId);
            }
            $('#HangHoaEditPopup').collapse('show');
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (HangHoaId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            if (vm.action.checkQuyenTacVuEdit('N') == false && vm.action.checkQuyenTacVuEdit('M') == false) { return; }
            if (checkInput() == false) { return; }

            if (HangHoaId > 0) {
                update().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Cập nhật thành công');
                    $('#HangHoaEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                insert().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Thêm thành công');
                    $('#HangHoaEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }

        
        vm.action.refresh = function () {
            vm.action.edit(HangHoaId);
        }
        vm.action.reset = function () {

            vm.data.searchString = '';
        };
        /* BIZ FUNCTION */
        function resetPopup() {
            HangHoaId = 0;
            delete vm.data.HangHoa; vm.data.HangHoa = {};
            delete vm.error; vm.error = {};
        }

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        

        /* API FUNCTION */

       

        

        function getById(id) {
            var deferred = $q.defer();

            HangHoaService.getById(id).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.HangHoa = success.data.data[0];
                } else {
                    delete vm.data.HangHoa;
                    vm.data.HangHoa = {};
                }
                return deferred.resolve(success);
            }, function (error) {
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });
            return deferred.promise;
        }

        function getPage(tableState) {
            var deferred = $q.defer();

            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = utility.initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;


            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'HangHoaId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString || '';
            var nhom = vm.data.searchNhomHangHoaId || '';
            var loai = vm.data.searchLoaiHangHoaId || '';
            var fields = "";
            searchString = searchString + '||' + nhom + '|99' + loai;

            HangHoaService.getPage(draw, start, number, searchString, sortName, sortDir, fields, userInfo.UserId, userInfo.NhanVienId).then(function (success) {
                //console.log(success);
                if (success.data.data) {
                    vm.data.listHangHoa = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / tableState.pagination.number);
                }
                return deferred.resolve(success);
            }, function (error) {
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });

            return deferred.promise;
        }
    }

})();