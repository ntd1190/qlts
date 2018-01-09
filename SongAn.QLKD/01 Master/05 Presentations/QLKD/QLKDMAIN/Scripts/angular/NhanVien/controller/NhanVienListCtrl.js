(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'NhanVienList',
            url: '/NhanVien/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: NhanVienListCtrl
        });
    });

    function NhanVienListCtrl($stateParams, SETTING, $scope, NhanVienService, utility, $q, $window) {
        var userInfo, _tableState;
        var NhanVienId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.listNhanVien = [];
        vm.data.NhanVienChiTietList = [];
        vm.data.objNhanVien = {};
        vm.data.listCot = [
            { MaCot: 'Ma', TenCot: 'Mã', HienThiYN: true, DoRong: 0 },
            { MaCot: 'HoTen', TenCot: 'Họ tên', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NgaySinh', TenCot: 'Ngày sinh', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenPhongBan', TenCot: 'Phòng ban', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NgayTuyenDung', TenCot: 'Ngày tuyển', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenChucVu', TenCot: 'Chức vụ', HienThiYN: true, DoRong: 0 },
            { MaCot: 'DienThoai', TenCot: 'Điện thoại', HienThiYN: true, DoRong: 0 },
            { MaCot: 'Detail', TenCot: 'Chi tiết', HienThiYN: true, DoRong: 0 },
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
            return SETTING.HOME_URL + 'NhanVien/showView?viewName=list';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {
                    $('#NhanVienEditPopup').collapse('show');
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
            $('#NhanVienEditPopup').on('hidden.bs.collapse', function () {
                vm.status.isOpenPopup = false;
                NhanVienId = 0;
            });
            $('#NhanVienEditPopup').on('shown.bs.collapse', function () {
                $("#txtMaNhanVien").focus();
                vm.status.isOpenPopup = true;
            });
        }

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.deleteSelected = deleteSelected;

        vm.action.checkQuyenTacVuEdit = function (quyen) {
            if (NhanVienId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }
        };

        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.GetChiTiet = function (id) {
            $('tr').removeClass('info');
            $('#row_' + id).addClass('info');
                var deferred = $q.defer();
                NhanVienService.GetChiTiet(id).then(function (success) {
                    vm.data.NhanVienChiTietList = success.data.data;
                    return deferred.resolve(success);
                }, function (error) {
                    console.log(`NhanVienService.getById.${id}`, error);
                });
                return deferred.promise;
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listNhanVien);
        };
        vm.action.xemNhanVien = function (id) {
            NhanVienId = id || 0;
            if (NhanVienId == 0) {
                delete vm.data.objNhanVien;
                vm.data.objNhanVien = {};
            } else {
                getById(NhanVienId);
            }

            $('#NhanVienEditPopup').collapse('show');
        }
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listNhanVien, !vm.status.isSelectedAll);
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
                $window.document.getElementById(ToId).focus();
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
            var sortName = tableState.sort.predicate || 'A.NhanVienId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var fields = "";
            NhanVienService.getPage(draw, start, number, searchString, sortName, sortDir, fields, userInfo.UserId, userInfo.NhanVienId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        vm.data.listNhanVien = success.data.data;
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
            var NhanVienSelected = new Array();
            var ids = "";
            if (id != '' && id != null) {
                ids = id;
                msg = 'Bạn có muốn xóa không?';
            }
            else {
                for (var i = 0; i < vm.data.listNhanVien.length; i++) {
                    var NhanVien = vm.data.listNhanVien[i];
                    if (NhanVien.isSelected) {
                        NhanVienSelected.push(NhanVien.NhanVienId);
                    }
                }
                ids = NhanVienSelected.join(',');
                msg = 'Bạn có muốn xóa các mục đã chọn không?';
            }
            if (ids != "") {
                if (!confirm(msg)) { return; }
                NhanVienService.removeList(ids).then(function (success) {
                    vm.data.isLoading = false;
                    _tableState.pagination.start = 0;
                    getPage(_tableState);
                    utility.AlertSuccess("Xóa thành công"); 
                    $('#popupThongTinNhanVien').collapse('hide');
                }, function (error) {
                    vm.data.isLoading = false;
                    alert('Không thể xóa!')
                });
            } else {
                alert('Vui lòng đánh dấu chọn vào ô trước khi tiếp tục.');
            }

        }

        function insert() {
            var deferred = $q.defer();

            vm.status.isInValidNhomKinhDoanh = utility.checkInValid(vm.data.objNhanVien.NhomKinhDoanhId, 'isEmpty');
            if (vm.status.isInValidNhomKinhDoanh) {
                $window.document.getElementById('cbxNhomKinhDoanh').find('input').focus();
                return;
            }
            vm.data.objNhanVien.NguoiTao = userInfo.NhanVienId;
            NhanVienService.insert(vm.data.objNhanVien).then(function (success) {
                console.log('NhanVienService.insert', success);
                if (success.data.data) {
                    NhanVienId = success.data.data.NhanVienId;
                }
                utility.AlertSuccess('Thêm thành công');

                $('#NhanVienEditPopup').collapse('hide');
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

            vm.status.isInValidNhomKinhDoanh = utility.checkInValid(vm.data.objNhanVien.NhomKinhDoanhId, 'isEmpty');
            if (vm.status.isInValidNhomKinhDoanh) {
                $('cbxNhomKinhDoanh').find('input').focus();
                return;
            }
            NhanVienService.update(vm.data.objNhanVien).then(function (success) {
                console.log('NhanVienService.update', success)
                utility.AlertSuccess('Cập nhật thành công');

                $('#NhanVienEditPopup').collapse('hide');
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

            NhanVienService.getById(id).then(function (success) {
                console.log(`NhanVienService.getById.${id}`, success);
                if (success.data.data.length > 0) {
                    vm.status.isEdit = true;
                    vm.data.objNhanVien = success.data.data[0];
                } else vm.status.isEdit = false;
                vm.data.objNhanVien.NhanVienId = id;
                return deferred.resolve(success);
            }, function (error) {
                console.log(`NhanVienService.getById.${id}`, error);
            });
            return deferred.promise;
        }
    }
})();