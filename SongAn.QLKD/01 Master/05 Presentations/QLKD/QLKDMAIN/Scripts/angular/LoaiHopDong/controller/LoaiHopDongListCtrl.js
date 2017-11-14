(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'LoaiHopDongList',
            url: '/LoaiHopDong/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: LoaiHopDongListCtrl
        });
    });

    function LoaiHopDongListCtrl($stateParams, SETTING, $q, utility, LoaiHopDongService) {
        var userInfo, _tableState;
        var LoaiHopDongId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };

        vm.error = {};
        vm.data = {};
        vm.inputSearch = {};

        vm.data.listCot = [
            { MaCot: 'MaLoaiHopDong', TenCot: 'Mã', HienThiYN: true, DoRong: 75 },
            { MaCot: 'TenLoaiHopDong', TenCot: 'Tên', HienThiYN: true, DoRong: 200 },
            { MaCot: 'GhiChu', TenCot: 'Địa chỉ', HienThiYN: true, DoRong: 0 },
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
            return SETTING.HOME_URL + 'LoaiHopDong/showView?viewName=list';
        }

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (vm.action.checkQuyenTacVu('N')) {
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
            $(document).ready(function () { // #LoaiHopDongEditPopup
                $('#LoaiHopDongEditPopup').on('hidden.bs.collapse', function () {
                    vm.status.isOpenPopup = false;
                    resetPopup();
                    $("#LoaiHopDongList input[autofocus]").focus();
                });
                $('#LoaiHopDongEditPopup').on('shown.bs.collapse', function () {
                    vm.status.isOpenPopup = true;
                    $("#LoaiHopDongEditPopup input[autofocus]").focus();
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
            LoaiHopDongId = id || 0;
            if (LoaiHopDongId > 0) {
                getById(LoaiHopDongId);
            }
            $('#LoaiHopDongEditPopup').collapse('show');
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (LoaiHopDongId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            if (vm.action.checkQuyenTacVuEdit('N') == false && vm.action.checkQuyenTacVuEdit('M') == false) { return; }
            if (checkInput() == false) { return; }

            if (LoaiHopDongId > 0) {
                update().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Cập nhật thành công');
                    $('#LoaiHopDongEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                insert().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Thêm thành công');
                    $('#LoaiHopDongEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }
        vm.action.deleteList = function () {
            var list = vm.data.listLoaiHopDong.filter(LoaiHopDong=>LoaiHopDong.isSelected == true);
            removeList(list).then(function (success) {
                vm.action.search();
                utility.AlertSuccess('Xóa thành công');
            }, function (error) {
                utility.AlertError(error);
            });
        }

        vm.action.delete = function () {
            var list = [{ LoaiHopDongId: LoaiHopDongId }];

            removeList(list).then(function (success) {
                vm.action.search();
                utility.AlertSuccess('Xóa thành công');
                $('#LoaiHopDongEditPopup').collapse('hide');
            }, function (error) {
                utility.AlertError(error);
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
            vm.status.isSelectedAll = utility.checkAll(vm.data.listLoaiHopDong, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listLoaiHopDong);
        };
        vm.action.refresh = function () {
            vm.action.edit(LoaiHopDongId);
        }
        /* BIZ FUNCTION */
        function resetPopup() {
            LoaiHopDongId = 0;
            delete vm.data.LoaiHopDong; vm.data.LoaiHopDong = {};
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
            var obj_name = 'LoaiHopDong';
            var prop_name = '';
            var error_name = '';

            prop_name = 'MaLoaiHopDong';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'TenLoaiHopDong';
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

            var data = vm.data.LoaiHopDong || {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            LoaiHopDongService.insert(data).then(function (success) {
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

            var data = vm.data.LoaiHopDong || {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            LoaiHopDongService.update(data).then(function (success) {
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

        function removeList(list) {
            var deferred = $q.defer();

            var data = {};

            data.LoaiHopDongIds = list.map(elem => elem.LoaiHopDongId).join("|");
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            LoaiHopDongService.delete(data).then(function (success) {
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

            var data = {};
            data.LoaiHopDongId = id || 0;
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            LoaiHopDongService.getById(data).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.LoaiHopDong = success.data.data[0];
                } else {
                    delete vm.data.LoaiHopDong; vm.data.LoaiHopDong = {};
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

            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || 'DB.LoaiHopDongId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.inputSearch.search || '';

            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            LoaiHopDongService.getPage(data).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.metaData.draw == _tableState.draw) {
                    vm.data.listLoaiHopDong = success.data.data;
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