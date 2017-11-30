(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'baoCaoDoanhThuList',
            url: '/baocaodoanhthu/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: baoCaoDoanhThuListCtrl
        });
    });

    function baoCaoDoanhThuListCtrl($stateParams, SETTING, $scope, BaoCaoDoanhThuService, utility, $q, $window) {
        var userInfo, _tableState;
        var BaoCaoDoanhThuId = 0;

        $scope.isOpenPopupTimKiem = false;

        var vm = this;

        vm.status = {};
        vm.status.openTuyChonCotPopup = false;
        vm.data = {};
        vm.data.listBaoCaoDoanhThu = [];
        vm.data.objBaoCaoDoanhThu = {};
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.searchString = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.linkUrl = '';
        vm.data.listCot = [
            { MaCot: 'MaNhanVien', TenCot: 'Mã NV', HienThiYN: true, DoRong: 90 },
            { MaCot: 'TenNhanVien', TenCot: 'Tên NV', HienThiYN: true, DoRong: 90 },
            { MaCot: 'SoHopDong', TenCot: 'Số hợp đồng', HienThiYN: true, DoRong: 90 },
            { MaCot: 'TenLoaiHopDong', TenCot: 'Loại hợp đồng', HienThiYN: true, DoRong: 90 },
            { MaCot: 'SoTien', TenCot: 'Trị giá hợp đồng', HienThiYN: true, DoRong: 90 },
            { MaCot: 'ThoiGian', TenCot: 'Thời gian', HienThiYN: true, DoRong: 90 },
            { MaCot: 'GhiChu', TenCot: 'Ghi chú', HienThiYN: true, DoRong: 90 },
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
            return SETTING.HOME_URL + 'BaoCaoDoanhThu/showView?viewName=list';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    
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
            
        };
        vm.action.In = function () {
            var searchString = vm.data.searchString;
            var searchLoaiHopDongId = vm.data.searchLoaiHopDongId || 0;
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;
            var userId = vm.data.userInfo.UserId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;

            var data = searchString + '|' + searchLoaiHopDongId + '|' + tuNgay + '|' + denNgay + '|' + userId + '|' + NhanVienId;

            $('#reportmodal').find('iframe').attr('src', '../../../QLKDMAIN/CrystalReport/ReportPage.aspx?name=rptBaoCaoDoanhThu&data=' + data);
            $('#reportmodal').modal('show');
        };
        vm.action.XuatExcel = function () {
            var searchString = vm.data.searchString;
            var searchLoaiHopDongId = vm.data.searchLoaiHopDongId || 0;
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;
            var userId = vm.data.userInfo.UserId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;

            var data = searchString + '|' + searchLoaiHopDongId + '|' + tuNgay + '|' + denNgay + '|' + userId + '|' + NhanVienId;

            $('#reportmodal').find('iframe').attr('src', '../../../QLKDMAIN/CrystalReport/ReportPage.aspx?name=rptBaoCaoDoanhThu&export=1&data=' + data);
            
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
            var sortName = tableState.sort.predicate || 'NgayHopDong';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var searchLoaiHopDongId = vm.data.searchLoaiHopDongId || 0;
            var tuNgay = vm.data.startDate;
            var denNgay = vm.data.endDate;

            var fields = "";
            BaoCaoDoanhThuService.getPage(draw, start, number, searchString, searchLoaiHopDongId, tuNgay, denNgay, sortName, sortDir, fields, vm.data.userInfo.UserId, vm.data.userInfo.NhanVienId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        vm.data.listBaoCaoDoanhThu = success.data.data;
                       
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


    }
})();