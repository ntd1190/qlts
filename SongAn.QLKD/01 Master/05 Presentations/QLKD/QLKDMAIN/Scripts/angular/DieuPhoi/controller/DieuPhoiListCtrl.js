(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'dieuPhoiList',
            url: '/dieuphoi/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: dieuPhoiListCtrl
        });
    });

    function dieuPhoiListCtrl($stateParams, SETTING, $scope, DieuPhoiService, utility, $q, $window) {
        var userInfo, _tableState;
        var DieuPhoiId = 0;

        $scope.isOpenPopupTimKiem = false;

        var vm = this;

        vm.status = {};
        vm.status.openTuyChonCotPopup = false;
        vm.data = {};
        vm.data.listDieuPhoi = [];
        vm.data.DieuPhoiChiTietListDisplay = [];
        vm.data.objDieuPhoi = {};
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.TongSo = 0;
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.linkUrl = '';
        vm.data.listCot = [
            { MaCot: 'DieuPhoiId', TenCot: 'ID', HienThiYN: true, DoRong: 25 },
            { MaCot: 'SoDonHang', TenCot: 'Đơn hàng', HienThiYN: true, DoRong: 90 },
            { MaCot: 'NgayDieuPhoi', TenCot: 'Ngày điều phối', HienThiYN: true, DoRong: 90 },
            { MaCot: 'TenNhanVienDieuPhoi', TenCot: 'Người điều phối', HienThiYN: true, DoRong: 150 },
            { MaCot: 'TenNguoiTao', TenCot: 'Người tạo', HienThiYN: true, DoRong: 90 },
            { MaCot: 'NgayTao', TenCot: 'Ngày tạo', HienThiYN: true, DoRong: 90 },
        ];

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            console.log(config);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            setEnableButton();

            vm.status.isOpenPopup = false;

            initEventListener();
        };

        activate();

        function activate() {
            vm.data.startDate = moment().format("01/01/YYYY");
            vm.data.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'DieuPhoi/showView?viewName=list';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    window.location.href = vm.data.linkUrl + '#!/DieuPhoi/edit/0';
                }
            },
            F3: function (name, code) {
                console.log('F3');
                if (!$scope.isOpenPopupTimKiem) {
                    $('#SearchCollapse').collapse('show');
                    $scope.isOpenPopupTimKiem = true;
                    $('#txtsearch').focus();
                } else {
                    $('#SearchCollapse').collapse('hide');
                    $scope.isOpenPopupTimKiem = false;
                }
            },
            F8: function (name, code) {
                console.log('F8');
                _tableState.pagination.start = 0;
                getPage(_tableState);
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            }
        };

        function initEventListener() {

        }

        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonDuyet = true;
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
        /* ACTION FUNCTION */

        vm.action = {
            getPageDetail: getPageDetail,
            deleteSelected: deleteSelected,
        };
        vm.action.getListCot = function (data) {

            vm.data.listCot = data;
        }
        vm.action.checkCot = function (cot) {
            return cot.HienThiYN;
        };
        vm.action.getPage = function (tableState) {
            getPage(tableState);
        };
        vm.action.reset = function () {
            vm.data.startDate = moment().format("01/01/YYYY");
            vm.data.endDate = moment().daysInMonth() + moment().format("/MM/YYYY");
            vm.data.searchString = '';
        };

        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var DieuPhoiSelected = new Array();

            for (var i = 0; i < vm.data.listDieuPhoi.length; i++) {
                var DieuPhoi = vm.data.listDieuPhoi[i];
                if (DieuPhoi.isSelected) {
                    DieuPhoiSelected.push(DieuPhoi.DieuPhoiId);
                }
            }
            var ids = DieuPhoiSelected.join(',');

            DieuPhoiService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPage(_tableState);
                utility.AlertSuccess('Xóa thành công!');
            }, function (error) {
                vm.data.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });

        }

        /* BIZ FUNCTION */

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
            var sortName = tableState.sort.predicate || 'DieuPhoiId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var searchKhachHangId = vm.data.searchKhachHangId || 0;
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;

            var fields = "";
            DieuPhoiService.getPage(draw, start, number, searchString, searchKhachHangId, tuNgay, denNgay, sortName, sortDir, fields, vm.data.userInfo.UserId, vm.data.userInfo.NhanVienId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        vm.data.listDieuPhoi = success.data.data;
                        vm.data.DieuPhoiChiTietListDisplay = [];
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

        function getPageDetail(DieuPhoiId) {
            $('tr').removeClass('info');
            $('#row_' + DieuPhoiId).addClass('info');
            if (DieuPhoiId && DieuPhoiId > 0) {
                DieuPhoiService.getPageDetail(DieuPhoiId).then(function (success) {
                    if (success.data.data) {
                        $('#bgloadding').remove();
                        vm.data.DieuPhoiChiTietListDisplay = success.data.data;
                        vm.data.TongSo = success.data.data.length;
                    }
                    vm.data.isLoading = false;
                }, function (error) {
                    vm.data.isLoading = false;
                    if (error.data.error != null) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.data.Message);
                    }
                    $('#bgloadding').remove();
                });
            }
        }

    }
})();