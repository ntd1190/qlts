(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('KhoPhieuXuatListCtrl', function ($scope, $rootScope, KhoPhieuXuatService, $q, utility, $timeout, TuyChonCotService) {

        /*** PRIVATE ***/

        var userInfo, linkUrl, _tableState, phieuSelected;

        /*** VIEW MODEL ***/

        var vm = this;
        vm.view = {};
        vm.config = {
            functionCode: 'CN0046'
        };
        vm.status = {};
        vm.error = {};
        vm.data = {};
        vm.data.listChiTiet = [];
        vm.data.listKhoPhieuXuat = [];
        vm.data.listCotPhieuXuat = [
            { MaCot: 'SoPhieu', TenCot: 'Số phiếu', HienThiYN: true },
            { MaCot: 'NgayXuat', TenCot: 'Ngày xuất', HienThiYN: true },
            { MaCot: 'NguoiNhanHang', TenCot: 'Người nhận hàng', HienThiYN: true },
            { MaCot: 'NgayTao', TenCot: 'Ngày tạo', HienThiYN: true },
        ];
        vm.data.LoaiPhieuXuat = [
            { MaLoai: 'CK', TenLoai: 'Xuất chuyển kho' }
        ]
        vm.inputSearch = {};
        /*** INIT FUNCTION ***/

        activate();
        function activate() { };

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};
            linkUrl = config.linkUrl || '';

            catchTuyChonCotPopupEvent();
            eventAutoReload();
        };

        function eventAutoReload() {
            $scope.$on('KhoPhieuNhapListCtrl.action.get-filter', function (event, data) {
                vm.inputSearch.KhoTaiSanIds = data.khoTaiSanId;
                vm.inputSearch.startDate = data.startDate;
                vm.inputSearch.endDate = data.endDate;
                getPage(_tableState);
            });


        }

        function catchTuyChonCotPopupEvent() {
            // nhân sự kiện áp dụng
            $rootScope.$on('TuyChonCotPopup' + '.action.ap-dung', function (event, data) {
                $('#' + 'TuyChonCotPopup').collapse('hide');
                _tableState.pagination.start = 0;
                getPage(_tableState);
            });

            $(document).ready(function () {
                $('#' + 'TuyChonCotPopup').on('show.bs.collapse', function () {
                    $rootScope.$broadcast('TuyChonCotPopup' + '.action.refresh');
                });
            });
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                if (checkQuyenUI('N')) {
                    window.location = linkUrl + 'KhoPhieuXuat/edit/0';
                }
            },
            F3: function (name, code) { },
            F8: function (name, code) {
                vm.action.search();
            },
            DELETE: function (name, code) { }
        };

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.getPage = getPage;
        vm.action.search = function () { }
        vm.action.removePhieuXuat = function () {
            if (checkQuyenUI('D') == false) { return; }

            var phieu = {};
            for (var index in vm.data.listKhoPhieuXuat) {
                if (vm.data.listKhoPhieuXuat[index].isSelected) {
                    phieu = vm.data.listKhoPhieuXuat[index];
                    break;
                }
            }

            if (!phieu.isSelected) {
                utility.AlertError('Vui lòng chọn phiếu xuất');
                return;
            }

            if (confirm('Bạn có muốn xóa phiếu xuất ?')) {
                utility.addloadding($('body'));
                remove(phieu.KhoPhieuXuatId).then(function (success) {
                    loadData();
                    utility.AlertSuccess("Xóa phiếu xuất thành công");
                    utility.removeloadding();
                }, function (error) {
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message.split('|')[2]);
                    } else {
                        utility.AlertError('Không thể xóa phiếu xuất');
                    }
                    utility.removeloadding();
                });
            }
        };
        vm.action.xemChiTiet = function (phieu) {
            getChiTietById(phieu.KhoPhieuXuatId);
        }
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = autoCheckAll(vm.data.listKhoPhieuXuat);
        };
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = checkAll(vm.data.listKhoPhieuXuat, !vm.status.isSelectedAll);
        };

        vm.action.checkCot = function (cot) {
            if (!cot.HienThiYN || cot.HienThiYN == false) {
                return false;
            }
            return true;
        }

        /*** BIZ FUNCTION ***/

        /* tự đông check / uncheck checkAll */
        function autoCheckAll(list) {
            if (!list || list.length == 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                if (list[i].isSelected) {
                } else {
                    return false;
                }
            }

            return true;
        }

        /* checkAll / uncheckAll */
        function checkAll(list, isSelected) {
            if (!list || list.length == 0) {
                return false;
            }

            for (var i = 0; i < list.length; i++) {
                list[i].isSelected = isSelected;
            }
            return isSelected;
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

        function loadData() {
            getPage();
            delete vm.data.listChiTiet; vm.data.listChiTiet = [];
        }

        /*** API FUNCTION ***/

        function loadCotList() {
            if (1 === 1) {
                TuyChonCotService.getAll('FL0033', userInfo.UserId).then(function (success) {
                    console.log('TuyChonCotService.getAll', success);
                    if (success.data && success.data.data) {
                        vm.data.listCotPhieuXuat = success.data.data;
                    }
                }, function (error) { });
            }
        }

        function getPage(tableState) {
            vm.status.isSelectedAll = false;
            vm.status.isLoading = true;
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
            tableState.sort.reverse = tableState.sort.reverse === undefined ? true : tableState.sort.reverse;
            tableState.sort.predicate = tableState.sort.predicate === undefined ? 'KPX.KHoPhieuXuatId' : tableState.sort.predicate;

            // chuẩn bị tham số 
            var data = {};
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.length = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || 'MAXCNT';
            data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            data.search = vm.inputSearch.search;
            data.KhoTaiSanId = vm.inputSearch.KhoTaiSanIds;
            data.startDate = vm.inputSearch.startDate ? moment(vm.inputSearch.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            data.endDate = vm.inputSearch.endDate ? moment(vm.inputSearch.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';

            data.NhanVien_Id = userInfo ? userInfo.NhanVienId : 0;
            data.CoSo_Id = userInfo ? userInfo.CoSoId : 0;
            KhoPhieuXuatService.getPage(data).then(function (success) {
                vm.status.isLoading = false;
                console.log('KhoPhieuXuatService.getPage', success);
                delete vm.data.listChiTiet; vm.data.listChiTiet = [];
                if (success && success.data && success.data.data) {
                    delete vm.data.listKhoPhieuXuat;
                    vm.data.listKhoPhieuXuat = success.data.data;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / tableState.pagination.number);//set the number of pages so the pagination can update
                }
                loadCotList();
            }, function (error) {
                vm.status.isLoading = false;
                console.log(error);
            });
        };

        function remove(id) {
            var deferred = $q.defer();

            var data = {};
            data.KhoPhieuXuatId = id;
            data.CoSo_Id = userInfo.CoSoId;
            data.NhanVien_Id = userInfo.NhanVienId;

            KhoPhieuXuatService.delete(data).then(function (success) {
                console.log('KhoPhieuXuatService.delete', success);
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.KhoPhieuXuat = success.data.data[0];
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function getChiTietById(id) {
            var deferred = $q.defer();

            var data = {};
            data.KhoPhieuXuatId = id;
            data.CoSo_Id = userInfo.CoSoId;
            data.NhanVien_Id = userInfo.NhanVienId;

            KhoPhieuXuatService.getChiTietById(data).then(function (success) {
                console.log('KhoPhieuXuatService.getChiTietById', success);
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.listChiTiet = success.data.data;
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });

            return deferred.promise;
        }

        /*** HELPER FUNCTION ***/
    })
})();