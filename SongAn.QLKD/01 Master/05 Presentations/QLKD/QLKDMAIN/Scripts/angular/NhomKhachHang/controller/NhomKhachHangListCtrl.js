(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'nhomKhachHangList',
            url: '/nhomkhachhang/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: NhomKhachHangListCtrl
        });
    });

    function NhomKhachHangListCtrl($stateParams, SETTING, $q, utility, NhomKhachHangService) {
        var userInfo, _tableState;

        var NhomKhachHangId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };

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
            return SETTING.HOME_URL + 'nhomkhachhang/showView?viewName=list';
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
                vm.action.search();
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.status.isOpenPopup
                    && (vm.action.checkQuyenTacVuEdit('N') || vm.action.checkQuyenTacVuEdit('M'))) {
                    vm.action.save();
                }
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
                $('#NhomKhachHangEditPopup').on('hidden.bs.collapse', function () {
                    vm.status.isOpenPopup = false;
                    resetPopup();
                    $("#NhomKhachHangList input[autofocus]").focus();
                });
                $('#NhomKhachHangEditPopup').on('shown.bs.collapse', function () {
                    vm.status.isOpenPopup = true;
                    $("#NhomKhachHangEditPopup input[autofocus]").focus();
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

        vm.action.edit = function (id) {
            resetPopup();
            NhomKhachHangId = id || 0;
            if (NhomKhachHangId > 0) {
                getById(NhomKhachHangId);
            }
            $('#NhomKhachHangEditPopup').collapse('show');
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (NhomKhachHangId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            if (vm.action.checkQuyenTacVuEdit('N') == false && vm.action.checkQuyenTacVuEdit('M') == false) { return; }
            if (checkInput() == false) { return; }

            if (NhomKhachHangId > 0) {
                update().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Cập nhật thành công');
                    $('#NhomKhachHangEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                insert().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Thêm thành công');
                    $('#NhomKhachHangEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }
        vm.action.deleteList = function () {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var NhomKhachHangSelected = new Array();

            for (var i = 0; i < vm.data.listNhomKhachHang.length; i++) {
                var NhomKhachHang = vm.data.listNhomKhachHang[i];
                if (NhomKhachHang.isSelected) {
                    NhomKhachHangSelected.push(NhomKhachHang.NhomKhachHangId);
                }
            }
            var ids = NhomKhachHangSelected.join(',');

            NhomKhachHangService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                utility.AlertSuccess('Xóa thành công!');
            }, function (error) {
                vm.data.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
        }

        vm.action.keyPress = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listNhomKhachHang, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listNhomKhachHang);
        };

        vm.action.refresh = function () {
            vm.action.edit(NhomKhachHangId);
        }

        /* BIZ FUNCTION */
        function resetPopup() {
            NhomKhachHangId = 0;
            delete vm.data.NhomKhachHang; vm.data.NhomKhachHang = {};
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

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'NhomKhachHang';
            var prop_name = '';
            var error_name = '';

            prop_name = 'MaNhom';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'TenNhom';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        /* API FUNCTION */

        function insert() {
            var deferred = $q.defer();

            vm.data.NhomKhachHang.NguoiTao = userInfo.NhanVienId;
            var NhomKhachHang = utility.clone(vm.data.NhomKhachHang);
            var data = {};
            data.NhomKhachHang = angular.toJson(NhomKhachHang);
            data.UserId = userInfo.UserId;

            NhomKhachHangService.insert(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });
            return deferred.promise;
        }

        function update() {
            var deferred = $q.defer();

            vm.data.NhomKhachHang.NguoiTao = userInfo.NhanVienId;
            var NhomKhachHang = utility.clone(vm.data.NhomKhachHang);
            var data = {};
            data.NhomKhachHang = angular.toJson(NhomKhachHang);
            data.UserId = userInfo.UserId;

            NhomKhachHangService.update(data).then(function (success) {
                console.log(success);
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                if (error.data.error != null) {
                    return deferred.reject(error.data.error.message);
                } else {
                    return deferred.reject(error.data.Message);
                }
            });
            return deferred.promise;
        }

        function getById(id) {
            var deferred = $q.defer();

            NhomKhachHangService.getById(id).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.NhomKhachHang = success.data.data[0];
                } else {
                    delete vm.data.NhomKhachHang;
                    vm.data.NhomKhachHang = {};
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
            var sortName = tableState.sort.predicate || 'NhomKhachHangId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.inputSearch.search || '';
            var fields = "";

            NhomKhachHangService.getPage(draw, start, number, searchString, sortName, sortDir, fields, userInfo.UserId, userInfo.NhanVienId).then(function (success) {
                //console.log(success);
                if (success.data.data) {
                    vm.data.listNhomKhachHang = success.data.data;
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