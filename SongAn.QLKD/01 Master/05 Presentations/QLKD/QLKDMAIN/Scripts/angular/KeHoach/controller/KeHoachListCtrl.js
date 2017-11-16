(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'keHoachList',
            url: '/kehoach/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: keHoachListCtrl
        });
    });

    function keHoachListCtrl($stateParams, SETTING, $scope, KeHoachService, utility, $q, $window) {
        var userInfo, _tableState;
        var KeHoachId = 0;

        $scope.isOpenPopupTimKiem = false;

        var vm = this;

        vm.status = {};
        vm.status.openTuyChonCotPopup = false;
        vm.data = {};
        vm.data.listKeHoach = [];
        vm.data.KeHoachChiTietListDisplay = [];
        vm.data.objKeHoach = {};
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.linkUrl = '';
        vm.data.listCot = [
            { MaCot: 'SoPhieu', TenCot: 'Số phiếu', HienThiYN: true, DoRong: 0 },
            { MaCot: 'KyKeHoach', TenCot: 'Kế hoạch theo', HienThiYN: true, DoRong: 0 },
            { MaCot: 'Nam', TenCot: 'Năm', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenKhachHang', TenCot: 'Khách hàng', HienThiYN: true, DoRong: 0 },
            { MaCot: 'TenNguoiTao', TenCot: 'Người tạo', HienThiYN: true, DoRong: 0 },
            { MaCot: 'NgayTao', TenCot: 'Ngày tạo', HienThiYN: true, DoRong: 0 },
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

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'KeHoach/showView?viewName=list';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    window.location.href = vm.data.linkUrl + '#!/KeHoach/edit/0';
                }
            },
            F3: function (name, code) {
                console.log('F3');

            },
            F8: function (name, code) {
                console.log('F8');

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
        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var KeHoachSelected = new Array();

            for (var i = 0; i < vm.data.listKeHoach.length; i++) {
                var KeHoach = vm.data.listKeHoach[i];
                if (KeHoach.isSelected) {
                    KeHoachSelected.push(KeHoach.KeHoachId);
                }
            }
            var ids = KeHoachSelected.join(',');

            KeHoachService.removeList(ids).then(function (success) {
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
            var sortName = tableState.sort.predicate || 'KeHoachId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;

            var fields = "";
            KeHoachService.getPage(draw, start, number, searchString, sortName, sortDir, fields, vm.data.userInfo.UserId, vm.data.userInfo.NhanVienId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        vm.data.listKeHoach = success.data.data;
                        vm.data.KeHoachChiTietListDisplay = [];
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

        function getPageDetail(KeHoachId) {
            $('tr').removeClass('info');
            $('#row_' + KeHoachId).addClass('info');
            if (KeHoachId && KeHoachId > 0) {
                KeHoachService.getById(KeHoachId).then(function (success) {
                    if (success.data.data) {
                        $('#bgloadding').remove();
                        vm.data.KeHoachChiTietListDisplay = success.data.data;
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