(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'NhomKinhDoanhList',
            url: '/NhomKinhDoanh/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: NhomKinhDoanhListCtrl
        });
    });

    function NhomKinhDoanhListCtrl($stateParams, SETTING, $q, utility, NhomKinhDoanhService) {
        var userInfo, _tableState;

        var NhomKinhDoanhId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };

        vm.error = {};
        vm.data = {};
        vm.data.searchString = "";

        vm.data.listCot = [
            { MaCot: 'MaNhomKinhDoanh', TenCot: 'Mã', HienThiYN: true, DoRong: 75 },
            { MaCot: 'TenNhomKinhDoanh', TenCot: 'Tên', HienThiYN: true, DoRong: 200 },
            { MaCot: 'TenQuanLy', TenCot: 'Quản Lý', HienThiYN: true, DoRong: 200 },
            { MaCot: 'SoluongNhanVien', TenCot: 'Số lượng nhân viên', HienThiYN: true, DoRong: 150 },
            { MaCot: 'NgayTao', TenCot: 'Ngày tạo', HienThiYN: true, DoRong: 100 },
            { MaCot: 'NguoiTao', TenCot: 'Người tạo', HienThiYN: true, DoRong: 200 },
        ];

        /* INIT / EVENT FUNCTION */

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};

            initEventListener();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'NhomKinhDoanh/showView?viewName=list';
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
            $(document).ready(function () { // #NhomKinhDoanhEditPopup
                $('#NhomKinhDoanhEditPopup').on('hidden.bs.collapse', function () {
                    vm.status.isOpenPopup = false;
                    resetPopup();
                    $("#NhomKinhDoanhList input[autofocus]").focus();
                });
                $('#NhomKinhDoanhEditPopup').on('shown.bs.collapse', function () {
                    vm.status.isOpenPopup = true;
                    $("#NhomKinhDoanhEditPopup input[autofocus]").focus();
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
            NhomKinhDoanhId = id || 0;
            if (NhomKinhDoanhId > 0) {
                getById(NhomKinhDoanhId);
            }
            $('#NhomKinhDoanhEditPopup').collapse('show');
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (NhomKinhDoanhId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            if (vm.action.checkQuyenTacVuEdit('N') == false && vm.action.checkQuyenTacVuEdit('M') == false) { return; }
            if (checkInput() == false) { return; }
            if (NhomKinhDoanhId > 0) {
                update().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Cập nhật thành công');
                    $('#NhomKinhDoanhEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                insert().then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Thêm thành công');
                    $('#NhomKinhDoanhEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }
        vm.action.deleteList = function () {
            var list = vm.data.listNhomKinhDoanh.filter(NhomKinhDoanh=>NhomKinhDoanh.isSelected == true);
            if (list.length == 0) {
                utility.AlertError("Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.");
                return;
            }
            removeList(list).then(function (success) {
                vm.action.search();
                utility.AlertSuccess('Xóa thành công');
            }, function (error) {
                utility.AlertError(error);
            });
        }

        vm.action.delete = function () {
            var list = [{ NhomKinhDoanhId: NhomKinhDoanhId }];

            removeList(list).then(function (success) {
                vm.action.search();
                utility.AlertSuccess('Xóa thành công');
                $('#NhomKinhDoanhEditPopup').collapse('hide');
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
            vm.status.isSelectedAll = utility.checkAll(vm.data.listNhomKinhDoanh, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listNhomKinhDoanh);
        };

        /* BIZ FUNCTION */
        function resetPopup() {
            NhomKinhDoanhId = 0;
            delete vm.data.NhomKinhDoanh; vm.data.NhomKinhDoanh = {};
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
            var obj_name = 'NhomKinhDoanh';
            var prop_name = '';
            var error_name = '';

            prop_name = 'MaNhomKinhDoanh';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'TenNhomKinhDoanh';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'QuanLy';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'SoLuongNhanVien';
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

            var data = vm.data.NhomKinhDoanh || {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            NhomKinhDoanhService.insert(data).then(function (success) {
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

            var data = vm.data.NhomKinhDoanh || {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            NhomKinhDoanhService.update(data).then(function (success) {
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
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }
            var deferred = $q.defer();

            var data = {};

            data.ids = list.map(elem => elem.NhomKinhDoanhId).join("|");
            if (data.ids != "") {
                NhomKinhDoanhService.delete(data).then(function (success) {
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
            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }
            return deferred.promise;
        }

        function getById(id) {
            var deferred = $q.defer();

            var data = {};
            data.NhomKinhDoanhId = id || 0;
            NhomKinhDoanhService.getById(data).then(function (success) {
                console.log(success);
                if (success.data.data) {
                    vm.data.NhomKinhDoanh = success.data.data;
                } else {
                    delete vm.data.NhomKinhDoanh; vm.data.NhomKinhDoanh = {};
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
            data.sortName = tableState.sort.predicate || 'DB.NhomKinhDoanhId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.data.searchString || '';
            data.NhanVienId = userInfo.NhanVienId;
            data.UserId = userInfo.UserId;

            NhomKinhDoanhService.getPage(data).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.metaData.draw == _tableState.draw) {
                    vm.data.listNhomKinhDoanh = success.data.data;
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