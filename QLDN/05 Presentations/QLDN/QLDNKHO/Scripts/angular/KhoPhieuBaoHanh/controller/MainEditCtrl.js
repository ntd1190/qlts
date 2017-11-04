/*****************************************************************************
1. Create Date : 2017.07.27
2. Creator     : Nguyen Thanh Binh
3. Description : 
4. History     : 2017.07.27 (Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');

    module.controller('MainCtrl', function ($scope, utility) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;
        var isEdit;
        var linkUrl = '';

        /*** VIEW MODEL ***/

        vm.ctrl = {
            TrangThaiTiepNhanListPopup: 'TrangThaiTiepNhanListPopup',
            phieuBaoHanhEdit: 'phieuBaoHanhEdit',
            ThongTinDienThoaiCtrl: 'ThongTinDienThoaiPopup',

            phieuBaoHanhChiTietEdit: 'phieuBaoHanhChiTietEdit',
            TrangThaiThietBiListPopup: 'TrangThaiThietBiListPopup',
            ThietBiListPopup: 'ThietBiListPopup',
            ThietBiThayTheListPopup: 'ThietBiThayTheListPopup',

            KhoHangHoaListPopup: 'KhoHangHoaListPopup',
        }

        //HOT-KEY
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                console.log('ESC');
                var list = utility.getListPopup(true);
                console.log(list);
                if (list.length >= 1) {
                    $(list[0]).collapse('hide');
                }
                if (list.length >= 2) {
                    $(list[1]).find('input[autofocus]').focus();
                }
                if (list.length <= 1) {
                    $('#' + vm.ctrl.phieuBaoHanhEdit + ' input[autofocus]:first-child').focus();
                }
            },

            //press F2 -> open popup
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('M') == false) { return; }

                var list = utility.getListPopup(true);
                if (list.length >= 1) {
                    console.log(list[0].id + '.action.F2');
                    $scope.$broadcast(list[0].id + '.action.F2', '');
                } else {
                    $('#' + vm.ctrl.phieuBaoHanhChiTietEdit).collapse('show');
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                console.log('F3');
                if (checkQuyenUI('M') == false) { return; }
                var list = utility.getListPopup(true);
                if (list.length >= 1) {
                    console.log(list[0].id);
                    $scope.$broadcast(list[0].id + '.action.F3', '');
                } else {
                    $scope.$broadcast(vm.ctrl.phieuBaoHanhEdit + '.action.F3', '');
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                console.log('F8');
                var list = utility.getListPopup(true);
                if (list.length >= 1) {
                    console.log(list[0].id);
                    $scope.$broadcast(list[0].id + '.action.F8', '');
                } else {
                    $scope.$broadcast(vm.ctrl.phieuBaoHanhEdit + '.action.F8', '');
                }
            },
        };
        //end HOT-KEY

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            isEdit = config.isEdit || false;
            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }
            if (config && config.linkUrl) {
                linkUrl = config.linkUrl;
            }
            
        }

        activate();

        function activate() {
            // phiếu bảo hành
            PhieuBaoHanhEditEvent();
            TrangThaiTiepNhanListPopupEvent();
            ThongTinDienThoaiCtrlEvent();

            // chi tiết phiếu bảo hành
            phieuBaoHanhChiTietEditEvent();
            TrangThaiThietBiListPopupEvent();
            ThietBiListPopupEvent();
            ThietBiThayTheListPopupEvent();
        };

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;

        /*** BIZ FUNCTION ***/

        // kiểm tra quyền ẩn/hiện nút trên giao diện
        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (isEdit) { // trường hợp thêm mới
                if (quyen == 'N') { return false; }
            } else { // trường hợp update
                if (quyen != 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }



        /*** EMIT / BROADCAST / ON / EVENT FUNCTION ***/

        function PhieuBaoHanhEditEvent() {
            $scope.$on(vm.ctrl.phieuBaoHanhEdit + '.action.getListTrangThaiTiepNhan', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhEdit + '.action.getListTrangThaiTiepNhan');
                $('#' + vm.ctrl.TrangThaiTiepNhanListPopup).collapse('show');
            });
            $scope.$on(vm.ctrl.phieuBaoHanhEdit + '.action.createChiTiet', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhEdit + '.action.createChiTiet');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.edit', data);
                $('#' + vm.ctrl.phieuBaoHanhChiTietEdit).collapse('show');
            });
            $scope.$on(vm.ctrl.phieuBaoHanhEdit + '.action.editChiTiet', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhEdit + '.action.editChiTiet');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.edit', data);
                $('#' + vm.ctrl.phieuBaoHanhChiTietEdit).collapse('show');
            });
            $scope.$on(vm.ctrl.phieuBaoHanhEdit + '.action.getKhachHang', function (event, data) {
                console.log('hoivp: ');
                console.log(data);
                $scope.$broadcast(vm.ctrl.ThongTinDienThoaiCtrl + '.action.getFilter', data);
                //$('#' + vm.ctrl.ThongTinDienThoaiCtrl).collapse('show');
            });
        }
        function TrangThaiTiepNhanListPopupEvent() {
            $scope.$on(vm.ctrl.TrangThaiTiepNhanListPopup + '.action.ap-dung', function (event, data) {
                console.log(data);
                $('#' + vm.ctrl.TrangThaiTiepNhanListPopup).collapse('hide');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhEdit + '.data.ListTrangThaiTiepNhan', data);
            });
        }
        function ThongTinDienThoaiCtrlEvent() {
            $scope.$on(vm.ctrl.ThongTinDienThoaiCtrl + '.action.ap-dung', function (event, data) {
                console.log(data);
                $('#' + vm.ctrl.ThongTinDienThoaiCtrl).collapse('hide');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhEdit + '.data.listKhachHang', data);
            });
        }

        function phieuBaoHanhChiTietEditEvent() {
            $scope.$on(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.getTrangThaiThietBi', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.getTrangThaiThietBi');
                $('#' + vm.ctrl.TrangThaiThietBiListPopup).collapse('show');
            });
            $scope.$on(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.getThietBiThayThe', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.getThietBiThayThe');
                $('#' + vm.ctrl.ThietBiThayTheListPopup).collapse('show');
                $scope.$broadcast(vm.ctrl.ThietBiThayTheListPopup + '.action.refresh', '');
            });
            $scope.$on(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.getThietBi', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.getThietBi');
                $('#' + vm.ctrl.ThietBiListPopup).collapse('show');
                $scope.$broadcast(vm.ctrl.ThietBiListPopup + '.action.refresh', '');
            });
            $scope.$on(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.ap-dung', function (event, data) {
                console.log(vm.ctrl.phieuBaoHanhChiTietEdit + '.action.ap-dung');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhEdit + '.data.PhieuBaoHanhChiTiet', data);
                $('#' + vm.ctrl.phieuBaoHanhChiTietEdit).collapse('hide');
            });
        }
        function TrangThaiThietBiListPopupEvent() {
            $scope.$on(vm.ctrl.TrangThaiThietBiListPopup + '.action.ap-dung', function (event, data) {
                console.log(data);
                $('#' + vm.ctrl.TrangThaiThietBiListPopup).collapse('hide');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhChiTietEdit + '.data.TrangThaiThietBi', data);
            });
        }
        function ThietBiListPopupEvent() {
            $scope.$on(vm.ctrl.ThietBiListPopup + '.action.ap-dung', function (event, data) {
                console.log(data);
                var _data = {
                    listHangHoa: data
                }
                $('#' + vm.ctrl.ThietBiListPopup).collapse('hide');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhChiTietEdit + '.data.listThietBi', _data);
            });
        }



        function ThietBiThayTheListPopupEvent() {
            $scope.$on(vm.ctrl.ThietBiThayTheListPopup + '.action.ap-dung', function (event, data) {
                console.log(data);
                var _data = {
                    listHangHoa: data
                }
                $('#' + vm.ctrl.ThietBiThayTheListPopup).collapse('hide');
                $scope.$broadcast(vm.ctrl.phieuBaoHanhChiTietEdit + '.data.listThietBiThayThe', _data);
            });
        }
    });

    module.controller('ThongTinDienThoaiCtrl', function ($scope, utility, ThongTinDienThoaiService) {

        /*** PRIVATE ***/

        var vm = this;
        var userInfo;

        /*** VIEW MODEL ***/

        vm.controllerId = 'ThongTinDienThoaiCtrl';
        vm.title = 'Danh sách khách hàng';
        vm.status = {};
        vm.status.isLoading = false;
        vm.status.isSelectOne = true;

        vm.filter = {};

        vm.data = {};
        vm.data.listKhachHang = [];
        vm.data.listCot = [
            { MaCot: 'TenKhachHang', TenCot: 'Tên khách hàng', HienThiYN: true, DoRong: '' },
            { MaCot: 'DienThoai', TenCot: 'Điện thoại', HienThiYN: true, DoRong: '200' },
            { MaCot: 'MaHangHoa', TenCot: 'Mã sản phẩm', HienThiYN: true, DoRong: '200' },
            { MaCot: 'TenHangHoa', TenCot: 'Tên sản phẩm', HienThiYN: true, DoRong: '200' },
            { MaCot: 'SoPhieu', TenCot: 'Phiếu xuất', HienThiYN: true, DoRong: '200' },
            { MaCot: 'Series', TenCot: 'Số sê-ri', HienThiYN: true, DoRong: '200' },
            { MaCot: 'NgayXuat', TenCot: 'Ngày xuất', HienThiYN: true, DoRong: '200' },
            { MaCot: 'ThoiGianBaoHanh', TenCot: 'Thời gian BH', HienThiYN: true, DoRong: '200' },
        ];

        /*** INIT FUNCTION ***/

        vm.onInitView = function (config) {
            console.log(config);
            if (!config) { return; }

            if (config && config.userInfo) {
                userInfo = config.userInfo;
            }

            if (config && config.controllerId) {
                vm.controllerId = config.controllerId;
            }
            if (config && config.title) {
                vm.title = config.title;
            }
            initEventListener();
        }

        /*** EMIT / BROADCAST / ON EVENT FUNCTION ***/

        function initEventListener() {
            $scope.$on(vm.controllerId + '.action.getFilter', function (event, data) {
                console.log(data);
                getFilter(data);
                vm.action.getPage();
            });
        }

        function emitApdung(data) {
            $scope.$emit(vm.controllerId + '.action.ap-dung', data);
        }

        /*** ACTION FUNCTION ***/

        vm.action = {};
        vm.action.getPage = function () {
            getThongTinByDienThoai();
        }

        vm.action.apDung = function () {
            if (vm.status.isLoading) { return; }
            var data = {};
            data.listKhachHang = utility.clone(getListSelected(vm.data.listKhachHang));
            emitApdung(data)
        }
        vm.action.selectedItem = function (item) {
            var data = {};
            data.listKhachHang = [];
            data.listKhachHang.push(utility.clone(item));
            emitApdung(data)
        }

        /*** BIZ FUNCTION ***/

        function getFilter(filter) {
            debugger
            vm.filter.DienThoai = filter.DienThoai;
            vm.filter.LoaiBaoHanh = filter.LoaiBaoHanh;
        }
        function getListSelected(list) {
            var _listSelected = [];

            for (var i = 0; i < list.length; i++) {
                if (list[i].isSelected == true) {
                    _listSelected.push(list[i]);
                }
            }
            return _listSelected;
        }

        /*** CALL API FUNCTION ***/

        function getThongTinByDienThoai() {
            vm.status.isLoading = true;

            var data = {
                DienThoai: vm.filter.DienThoai,
                LoaiBaoHanh: vm.filter.LoaiBaoHanh,
                loginId: userInfo.NhanVienId
            }
            ThongTinDienThoaiService.getThongTinByDienThoai(data).then(function (success) {
                console.log(success);
                vm.status.isLoading = false;
                delete vm.data.listKhachHang;
                if (success.data && success.data.data && success.data.data.length > 0) {
                    vm.data.listKhachHang = success.data.data;
                    $('#' + vm.controllerId).collapse('show');
                } else {
                    vm.data.listKhachHang = [];
                }
            }, function (error) {
                console.log(error);
                vm.status.isLoading = false;
            });

        }
    });

    module.factory('ThongTinDienThoaiService', function ($http, API_BASE, utility) {
        var api = {
            url: API_BASE + 'api.qlkho/khophieubaohanh/',
            GetThongTinByDienThoai: 'GetThongTinByDienThoai',
        }
        var service = {};
        service.getThongTinByDienThoai = function (data) {
            var url = api.url + api.GetThongTinByDienThoai;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        return service;
    });
})();