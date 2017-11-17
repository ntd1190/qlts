(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'nguoiDungList',
            url: '/nguoidung/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: nguoiDungListCtrl
        });
    });

    function nguoiDungListCtrl($stateParams, SETTING, $scope, NguoiDungService, utility, $q, $window) {
        var userInfo, _tableState;
        var NguoiDungId = 0;

        var vm = this;

        vm.status = {};
        vm.status.openTuyChonCotPopup = false;
        vm.inputSearch = {};
        vm.data = {};
        vm.data.listNguoiDung = [];
        vm.data.objNguoiDung = {
            MaTrangThai: 'CV_BD',
            VaiTroId: 1,
            NhanVienId: 6
        };
        vm.data.listCot = [
            { MaCot: 'MaNguoiDung', TenCot: 'Mã', HienThiYN: true, DoRong: 0 },
            { MaCot: 'HoTen', TenCot: 'Họ tên', HienThiYN: true, DoRong: 0 },
            { MaCot: 'Email', TenCot: 'Email', HienThiYN: true, DoRong: 0 },
        ];
        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            console.log(config);
            config = config || {};
            userInfo = config.userInfo || {};

            vm.status.isOpenPopup = false;

            initEventListener();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'nguoidung/showView?viewName=list';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {
                    $('#NguoiDungEditPopup').collapse('show');
                }
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.status.isOpenPopup && checkQuyenUI('N')) {
                    vm.action.save();
                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            }
        };

        function initEventListener() {
            $('#NguoiDungEditPopup').on('hidden.bs.collapse', function () {
                vm.status.isOpenPopup = false;
                NguoiDungId = 0;
            });
            $('#NguoiDungEditPopup').on('shown.bs.collapse', function () {
                $("#txtMaNguoiDung").focus();
                vm.status.isEdit = NguoiDungId != 0;
                vm.status.isOpenPopup = true;
            });
        }

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.deleteSelected = deleteSelected;

        vm.action.getListCot = function (data) {
            console.log('vm.action.getListCot.data', data);
            vm.data.listCot = data;
        }

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (NguoiDungId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }
        };

        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.search = function () {
            _tableState.pagination.start = 0;
            getPage(_tableState);
        }

        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listNguoiDung);
        };
        vm.action.xemNguoiDung = function (id) {
            NguoiDungId = id || 0;
            if (NguoiDungId == 0) {
                delete vm.data.objNguoiDung;
                vm.data.objNguoiDung = {
                    MaTrangThai: 'CV_BD',
                    VaiTroId: 1,
                    NhanVienId: 6
                };
            } else {
                getById(NguoiDungId);
            }

            $('#NguoiDungEditPopup').collapse('show');
        }
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listNguoiDung, !vm.status.isSelectedAll);
        };

        vm.action.checkCot = function (cot) {
            return cot.HienThiYN;
        };
        vm.action.save = function () {
            if (checkQuyenUI('N') == false && checkQuyenUI('M') == false) { return; }

            if (vm.status.isEdit) {
                update();
            } else {
                insert();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaNguoiDung') {
                    vm.status.isInValidMaNguoiDung = utility.checkInValid(vm.data.objNguoiDung.MaNguoiDung, 'isEmpty');
                    if (!vm.status.isInValidMaNguoiDung) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtTenNguoiDung') {
                    vm.status.isInValidTenNguoiDung = utility.checkInValid(vm.data.objNguoiDung.HoTen, 'isEmpty');
                    if (!vm.status.isInValidTenNguoiDung) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtEmail') {
                    vm.status.isInValidEmail = utility.checkInValid(vm.data.objNguoiDung.Email, 'isEmpty');
                    if (!vm.status.isInValidEmail) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }

        /* BIZ FUNCTION */

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

        function getPage(tableState) {
            vm.data.isLoading = true;
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
            var sortName = tableState.sort.predicate || 'A.NguoiDungId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.inputSearch.search;
            var fields = "";
            NguoiDungService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.UserLoginId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        vm.data.listNguoiDung = success.data.data;
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

        function deleteSelected(id) {
            vm.data.isLoading = true;
            var msg = "";
            var nguoidungSelected = new Array();
            var ids = "";
            if (id != '' && id != null) {
                ids = id;
                msg = 'Bạn có muốn xóa không?';
            }
            else {
                for (var i = 0; i < vm.data.listNguoiDung.length; i++) {
                    var nguoidung = vm.data.listNguoiDung[i];
                    if (nguoidung.isSelected) {
                        nguoidungSelected.push(nguoidung.NguoiDungId);
                    }
                }
                ids = nguoidungSelected.join(',');
                msg = 'Bạn có muốn xóa các mục đã chọn không?';
            }
            if (ids != "") {
                if (!confirm(msg)) { return; }
                NguoiDungService.removeList(ids).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    alert('Xóa thành công!');
                    $('#popupThongTinNguoiDung').collapse('hide');
                }, function (error) {
                    vm.data.isLoading = false;
                    alert('Khen thưởng không thể xóa!')
                });
            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }

        }

        function insert() {
            var deferred = $q.defer();

            vm.status.isInValidMaNguoiDung = utility.checkInValid(vm.data.objNguoiDung.MaNguoiDung, 'isEmpty');
            if (vm.status.isInValidMaNguoiDung) {
                $window.document.getElementById('txtMaNguoiDung').focus();
                return;
            }
            vm.status.isInValidTenNguoiDung = utility.checkInValid(vm.data.objNguoiDung.HoTen, 'isEmpty');
            if (vm.status.isInValidTenNguoiDung) {
                $window.document.getElementById('txtTenNguoiDung').focus();
                return;
            }

            //vm.status.isInValidVaiTro = utility.checkInValid(vm.data.listVaiTro.length > 0 ? vm.data.listVaiTro[0].VaiTroId : '', 'isEmpty');
            //if (vm.status.isInValidVaiTro) {
            //    $window.document.getElementById('popVaiTro').focus();
            //    return;
            //}
            vm.status.isInValidEmail = utility.checkInValid(vm.data.objNguoiDung.Email, 'Email');
            if (vm.status.isInValidEmail) {
                $window.document.getElementById('txtEmail').focus();
                return;
            }
            vm.status.isInValidPassword = utility.checkInValid(vm.data.objNguoiDung.PasswordHash, 'isEmpty');
            if (vm.status.isInValidPassword) {
                $window.document.getElementById('txtPassword').focus();
                return;
            }

            vm.data.objNguoiDung.NguoiTao = userInfo.NhanVienId;

            NguoiDungService.insert(vm.data.objNguoiDung).then(function (success) {
                console.log('NguoiDungService.insert', success);
                if (success.data.data) {
                    NguoiDungId = success.data.data.NguoiDungId;
                }
                utility.AlertSuccess('Thêm thành công');

                $('#NguoiDungEditPopup').collapse('hide');
                _tableState.pagination.start = 0;
                getPage();

                return deferred.resolve(success);
            }, function (error) {
                console.log(error)
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                return deferred.reject(error);
            });
            return deferred.promise;
        }

        function update() {
            var deferred = $q.defer();

            vm.status.isInValidMaNguoiDung = utility.checkInValid(vm.data.objNguoiDung.MaNguoiDung, 'isEmpty');
            if (vm.status.isInValidMaNguoiDung) {
                $window.document.getElementById('txtMaNguoiDung').focus();
                return;
            }
            vm.status.isInValidTenNguoiDung = utility.checkInValid(vm.data.objNguoiDung.HoTen, 'isEmpty');
            if (vm.status.isInValidTenNguoiDung) {
                $window.document.getElementById('txtTenNguoiDung').focus();
                return;
            }

            //vm.status.isInValidVaiTro = utility.checkInValid(vm.data.listVaiTro.length > 0 ? vm.data.listVaiTro[0].VaiTroId : '', 'isEmpty');
            //if (vm.status.isInValidVaiTro) {
            //    $window.document.getElementById('popVaiTro').focus();
            //    return;
            //}

            NguoiDungService.update(vm.data.objNguoiDung).then(function (success) {
                console.log('NguoiDungService.update', success)
                utility.AlertSuccess('Cập nhật thành công');

                $('#NguoiDungEditPopup').collapse('hide');
                _tableState.pagination.start = 0;
                getPage();

                return deferred.resolve(success);
            }, function (error) {
                console.log(error)
                return deferred.reject(error);
            });

            return deferred.promise;
        }

        function getById(id) {
            var deferred = $q.defer();

            NguoiDungService.getById(id).then(function (success) {
                console.log(`NguoiDungService.getById.${id}`, success);
                vm.data.objNguoiDung = success.data.data[0];
                return deferred.resolve(success);
            }, function (error) {
                console.log(`NguoiDungService.getById.${id}`, error);
            });
            return deferred.promise;
        }
    }
})();