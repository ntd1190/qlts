(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'danhGiaDoanhThuList',
            url: '/danhgiadoanhthu/list',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: danhGiaDoanhThuListCtrl
        });
    });

    module.filter('sumOfValue', function () {
        return function (data, key) {

            if (angular.isUndefined(data) && angular.isUndefined(key))
                return 0;
            var sum = 0;

            angular.forEach(data, function (v, k) {
                sum = sum + parseFloat(v[key]);
            });
            return sum.toFixed(2);
        }
    });

    function danhGiaDoanhThuListCtrl($stateParams, SETTING, $scope, DanhGiaDoanhThuService, utility, $q, $window) {
        var userInfo, _tableState;
        var DanhGiaDoanhThuId = 0;

        $scope.isOpenPopupTimKiem = false;

        var vm = this;

        vm.status = {};
        vm.status.openTuyChonCotPopup = false;
        vm.data = {};
        vm.data.listDanhGiaDoanhThu = [];
        vm.data.objDanhGiaDoanhThu = {};
        vm.data.startDate = '';
        vm.data.endDate = '';
        vm.data.searchString = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.linkUrl = '';
        vm.data.listCot = [
            { MaCot: 'MaNhanVien', TenCot: 'Mã NV', HienThiYN: true, DoRong: 90 },
            { MaCot: 'TenNhanVien', TenCot: 'Tên NV', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu01', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per01', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu02', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per02', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu03', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per03', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu04', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per04', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu05', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per05', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu06', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per06', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu07', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per07', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu08', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per08', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu09', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per09', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu10', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per10', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu11', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per11', TenCot: '%', HienThiYN: true, DoRong: 90 },
            { MaCot: 'DoanhThu12', TenCot: 'DT', HienThiYN: true, DoRong: 90 },
            { MaCot: 'Per12', TenCot: '%', HienThiYN: true, DoRong: 90 },
          
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
            var d = new Date();
            vm.data.Nam = d.getFullYear().toString();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'DanhGiaDoanhThu/showView?viewName=list';
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
            var nam = vm.data.Nam;
            var nhanVienKDId = vm.data.NhanVienKDId || 0;
            var userId = vm.data.userInfo.UserId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;

            var data = nam + '|' + nhanVienKDId + '|' + userId + '|' + NhanVienId;

            $('#reportmodal').find('iframe').attr('src', '../../../QLKDMAIN/CrystalReport/ReportPage.aspx?name=rptDanhGiaDoanhThu&data=' + data);
            $('#reportmodal').modal('show');
        };
        vm.action.XuatExcel = function () {
            var nam = vm.data.Nam;
            var nhanVienKDId = vm.data.NhanVienKDId || 0;
            var userId = vm.data.userInfo.UserId || 0;
            var NhanVienId = vm.data.userInfo.NhanVienId || 0;

            var data = nam + '|' + nhanVienKDId + '|' + userId + '|' + NhanVienId;

            $('#reportmodal').find('iframe').attr('src', '../../../QLKDMAIN/CrystalReport/ReportPage.aspx?name=rptDanhGiaDoanhThu&export=1&data=' + data);

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
            
            var Nam = vm.data.Nam;
            var NhanVienKDId = vm.data.NhanVienKDId;

            var fields = "";
            DanhGiaDoanhThuService.getPage(Nam, NhanVienKDId, vm.data.userInfo.UserId, vm.data.userInfo.NhanVienId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        vm.data.listDanhGiaDoanhThu = success.data.data;
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