(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'FileHopDongList',
            url: '/FileHopDong/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: FileHopDongListCtrl
        });
    });

    function FileHopDongListCtrl($stateParams, SETTING, $q, utility, FileHopDongService, Upload) {
        var userInfo, _tableState;
        var FileHopDongId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };

        vm.error = {};
        vm.data = {};
        vm.inputSearch = {};

        vm.data.listCot = [
            { MaCot: 'SoHopDong', TenCot: 'Số hợp đồng', HienThiYN: true, DoRong: 75 },
            { MaCot: 'TenHopDong', TenCot: 'Tên hợp đồng', HienThiYN: true, DoRong: 300 },
            { MaCot: 'NgayHopDong', TenCot: 'Ngày hợp đồng', HienThiYN: true, DoRong: 200 },
            { MaCot: 'SoTien', TenCot: 'Tổng tiền', HienThiYN: true, DoRong: 100 },
            { MaCot: 'DaLam', TenCot: 'Đã làm', HienThiYN: true, DoRong: 100 },
            { MaCot: 'NguoiLam', TenCot: 'Người làm', HienThiYN: true, DoRong: 200 },
            { MaCot: 'DaChuyen', TenCot: 'Đã chuyển', HienThiYN: true, DoRong: 100 },
            { MaCot: 'NguoiChuyen', TenCot: 'Người chuyển', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayChuyen', TenCot: 'Ngày chuyển', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NguoiNhan', TenCot: 'Người nhận', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayNhan', TenCot: 'Ngày nhận', HienThiYN: true, DoRong: 200 },
            { MaCot: 'FileCung', TenCot: 'File cứng', HienThiYN: true, DoRong: 100 },
            { MaCot: 'FileMem', TenCot: 'File mềm', HienThiYN: true, DoRong: 100 },
            { MaCot: 'GhiChu', TenCot: 'Ghi chú', HienThiYN: true, DoRong: 100 },
        ];

        /* INIT / EVENT FUNCTION */

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};

            initEventListener();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'FileHopDong/showView?viewName=list';
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
            $(document).ready(function () { // #FileHopDongEditPopup
                $('#FileHopDongEditPopup').on('hidden.bs.collapse', function () {
                    vm.status.isOpenPopup = false;
                    resetPopup();
                    $("#FileHopDongList input[autofocus]").focus();
                });
                $('#FileHopDongEditPopup').on('shown.bs.collapse', function () {
                    vm.status.isOpenPopup = true;
                    $("#FileHopDongEditPopup input[autofocus]").focus();
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
            vm.status.isSelectedAll = false;
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        vm.action.edit = function (id) {
            resetPopup();
            FileHopDongId = id || 0;
            if (FileHopDongId > 0) {
                getById(FileHopDongId);
            }
            else {
                resetPopup();
            }
            $('#FileHopDongEditPopup').collapse('show');
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (FileHopDongId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            if (vm.action.checkQuyenTacVuEdit('N') == false && vm.action.checkQuyenTacVuEdit('M') == false) { return; }
            if (checkInput() == false) { return; }
            if (!CompareDate(vm.data.FileHopDong.NgayChuyen, vm.data.FileHopDong.NgayNhan)) {
                utility.AlertError('Ngày nhận hàng không hợp lệ!');
                return;
            }
            if (vm.data.FileHopDong.fileC && vm.data.FileHopDong.fileC.length > 0) {
                if (vm.data.FileHopDong.FileCung) {
                    vm.data.FileHopDong.FileCung = vm.data.FileHopDong.FileCung.split('.')[0] + '.' + utility.getFileExt(vm.data.FileHopDong.fileC[0].name);
                } else {
                    vm.data.FileHopDong.FileCung = 'FC' + moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.FileHopDong.fileC[0].name);
                }
            }
            if (vm.data.FileHopDong.fileM && vm.data.FileHopDong.fileM.length > 0) {
                if (vm.data.FileHopDong.FileMem) {
                    vm.data.FileHopDong.FileMem = vm.data.FileHopDong.FileMem.split('.')[0] + '.' + utility.getFileExt(vm.data.FileHopDong.fileM[0].name);
                } else {
                    vm.data.FileHopDong.FileMem = 'FM' + moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.FileHopDong.fileM[0].name);
                }
            }
            if (FileHopDongId > 0) {
                $q.all([update(), UploadFile()]).then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Cập nhật thành công');
                    $('#FileHopDongEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                $q.all([insert(), UploadFile()]).then(function (success) {
                    vm.action.search();
                    utility.AlertSuccess('Thêm thành công');
                    $('#FileHopDongEditPopup').collapse('hide');
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }
        vm.action.deleteList = function () {
            if (vm.action.checkQuyenTacVu('D') == false) { return; }

            if (confirm('Bạn có muốn xóa thông tin ?') == false) { return; }

            var list = vm.data.listFileHopDong.filter(FileHopDong=>FileHopDong.isSelected == true);
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
            if (vm.action.checkQuyenTacVuEdit('D') == false) { return; }

            if (confirm('Bạn có muốn xóa thông tin ?') == false) { return; }

            var list = [{ FileHopDongId: FileHopDongId }];

            removeList(list).then(function (success) {
                vm.action.search();
                utility.AlertSuccess('Xóa thành công');
                $('#FileHopDongEditPopup').collapse('hide');
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
            vm.status.isSelectedAll = utility.checkAll(vm.data.listFileHopDong, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listFileHopDong);
        };
        vm.action.refresh = function () {
            vm.action.edit(FileHopDongId);
        }
        /* BIZ FUNCTION */
        function CompareDate(dateOne, dateTwo) {
            if (dateOne === "" || dateTwo === "")
                return false;
            var strOne = dateOne.split("/");
            var strTwo = dateTwo.split("/");
            dateOne = new Date(strOne[2], strOne[1], strOne[0]);
            dateTwo = new Date(strTwo[2], strTwo[1], strTwo[0]);

            if (dateOne > dateTwo) {
                return false;
            } else {
                return true;
            }
        }
        function resetPopup() {
            FileHopDongId = 0;
            delete vm.data.FileHopDong; vm.data.FileHopDong = {};
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
            var obj_name = 'FileHopDong';
            var prop_name = '';
            var error_name = '';

            prop_name = 'HopDongId';
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
        function UploadFile() {
            console.log('UploadFile');
            var deferred = $q.defer();
            //File Cung
            if (angular.isUndefined(vm.data.FileHopDong.fileC) || vm.data.FileHopDong.fileC.length == 0) {
                return deferred.resolve('');
            }
            Upload.filesUpload(vm.data.FileHopDong.fileC, vm.data.FileHopDong.FileCung, 'FileHopDong/').then(function (success) {
                console.log('Upload.filesUpload.success', success);
                vm.data.FileHopDong.FileCung = success.data.data;
                $('input[type=file]').val('');
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            ////File Mem
            if (angular.isUndefined(vm.data.FileHopDong.fileM) || vm.data.FileHopDong.fileM.length == 0) {
                return deferred.resolve('');
            }
            Upload.filesUpload(vm.data.FileHopDong.fileM, vm.data.FileHopDong.FileMem, 'FileHopDong/').then(function (success) {
                console.log('Upload.filesUpload.success', success);
                vm.data.FileHopDong.FileMem = success.data.data;
                $('input[type=file]').val('');
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function insert() {
            var deferred = $q.defer();

            var data = vm.data.FileHopDong || {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            FileHopDongService.insert(data).then(function (success) {
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
            debugger
            var data = vm.data.FileHopDong || {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            FileHopDongService.update(data).then(function (success) {
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

            data.FileHopDongIds = list.map(elem => elem.FileHopDongId).join("|");
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            FileHopDongService.delete(data).then(function (success) {
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
            data.FileHopDongId = id || 0;
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            FileHopDongService.getById(data).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.FileHopDong = success.data.data[0];
                } else {
                    delete vm.data.FileHopDong; vm.data.FileHopDong = {};
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
            data.sortName = tableState.sort.predicate || 'DL.FileHopDongId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.inputSearch.search || '';

            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            FileHopDongService.getPage(data).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.metaData.draw == _tableState.draw) {
                    vm.data.listFileHopDong = success.data.data;
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