(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'HopDongList',
            url: '/HopDong/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: HopDongListCtrl
        });
    });

    function HopDongListCtrl($stateParams, SETTING, $q, utility, HopDongService) {
        var userInfo, linkUrl, _tableState;

        var HopDongId = 0;

        var vm = this;

        vm.status = {
            isOpenPopup: false
        };

        vm.error = {};
        vm.data = {};
        vm.inputSearch = {};
        vm.data.listChiTiet = [];
        vm.data.listCot = [
            { MaCot: 'SoHopDong', TenCot: 'Số HĐ', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenHopDong', TenCot: 'Tên HĐ', HienThiYN: true, DoRong: 250 },
            { MaCot: 'NgayHopDong', TenCot: 'Ngày HĐ', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayThanhLy', TenCot: 'Ngày TL', HienThiYN: true, DoRong: 200 },
            { MaCot: 'SoTien', TenCot: 'Số tiền', HienThiYN: true, DoRong: 200 },
            { MaCot: 'SoHoaDon', TenCot: 'Số hóa đơn', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayHoaDon', TenCot: 'Ngày hóa đơn', HienThiYN: true, DoRong: 200 },
            { MaCot: 'ThanhToan', TenCot: 'Thanh toán', HienThiYN: true, DoRong: 200 },
            { MaCot: 'TyLe', TenCot: 'Tỷ lệ', HienThiYN: true, DoRong: 200 },
            { MaCot: 'Chi', TenCot: 'Chi', HienThiYN: true, DoRong: 200 },
            { MaCot: 'TenDuLieu', TenCot: 'Dữ liệu', HienThiYN: true, DoRong: 200 },
            { MaCot: 'TenNhanVien', TenCot: 'Tên NVKD', HienThiYN: true, DoRong: 200 },
            { MaCot: 'NgayTao', TenCot: 'Ngày tạo', HienThiYN: true, DoRong: 100 },
            { MaCot: 'TenNguoiTao', TenCot: 'Người tạo', HienThiYN: true, DoRong: 200 },
        ];

        /* INIT / EVENT FUNCTION */

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};
            linkUrl = config.linkUrl || '';

            initEventListener();
            vm.action.resetFilter();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'HopDong/showView?viewName=list';
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
                $('#panelTimkiemCollapse').collapse('toggle');
            },
            F8: function (name, code) {
                console.log('F8');
                vm.action.search();
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            },
            ESC: function (name, code) {
                console.log('ESC');
            },
        };

        function initEventListener() {
            $(document).ready(function () {
                $('#panelTimkiemCollapse').on('shown.bs.collapse', function () {
                    $('#panelTimkiemCollapse input[autofocus]').focus();
                })
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
        vm.action.getPageDetail = function (id) {
            $('tr').removeClass('info');
            $('#row_' + id).addClass('info');
            HopDongService.getPageDetail(id)
                .then(function success(result) {
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {

                        vm.data.listChiTiet = result.data.data;
                    }
                }, function error(result) {
                    console.log(result);
                });
        }
        vm.action.edit = function (id) {
            window.location = `${linkUrl}#!/hopdong/edit/${id}`;
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            return checkQuyenUI(quyen);
        }

        vm.action.getListCot = function (data) {
            vm.data.listCot = data;
        }
        vm.action.checkCot = function (cot) {
            return cot.HienThiYN;
        }
        vm.action.deleteList = function () {
            if (vm.action.checkQuyenTacVu('D') == false) { return; }

            if (confirm('Bạn có muốn xóa thông tin ?') == false) { return; }

            var list = vm.data.listHopDong.filter(HopDong=>HopDong.isSelected == true);
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

        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listHopDong, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listHopDong);
        };
        vm.action.resetFilter = function () {
            vm.inputSearch.search = '';
            vm.inputSearch.TrangThai = '';
            vm.inputSearch.LoaiHopDongId = '';
            vm.inputSearch.startDateHopDong = '';
            vm.inputSearch.endDateHopDong = '';
            vm.inputSearch.startDateHoaDon = '';
            vm.inputSearch.endDateHoaDon = '';

            $('#panelTimkiemCollapse input[autofocus]').focus();
        }
        vm.action.keyPress = function (event) {
            if (event.keyCode != 13) { return; }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
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

        function removeList(list) {
            var deferred = $q.defer();

            var data = {};

            data.HopDongIds = list.map(elem => elem.HopDongId).join("|");
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            HopDongService.delete(data).then(function (success) {
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
            data.sortName = tableState.sort.predicate || 'HD.HopDongId';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            data.search = vm.inputSearch.search || '';
            data.LoaiHopDongId = vm.inputSearch.LoaiHopDongId || '';
            data.TrangThai = vm.inputSearch.TrangThai || '';

            data.startDateHopDong = vm.inputSearch.startDateHopDong ? moment(vm.inputSearch.startDateHopDong, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            data.endDateHopDong = vm.inputSearch.endDateHopDong ? moment(vm.inputSearch.endDateHopDong, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            data.startDateHoaDon = vm.inputSearch.startDateHoaDon ? moment(vm.inputSearch.startDateHoaDon, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            data.endDateHoaDon = vm.inputSearch.endDateHoaDon ? moment(vm.inputSearch.endDateHoaDon, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';

            data.NHANVIEN_ID = userInfo.NhanVienId || 0;
            data.USER_ID = userInfo.UserId || 0;

            HopDongService.getPage(data).then(function (success) {
                console.log('HopDongService.getPage.success', success);
                if (success.data.data && success.data.metaData.draw == _tableState.draw) {
                    vm.data.listHopDong = success.data.data;
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