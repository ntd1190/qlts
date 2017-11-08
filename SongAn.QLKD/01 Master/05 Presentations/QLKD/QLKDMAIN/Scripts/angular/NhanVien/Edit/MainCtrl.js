(function () {
    'use strict';

    angular.module('app')
        .controller('MainCtrl', controller)

    function controller($scope, NhanVienService, utility) {

        /*** PRIVATE ***/

        var debug = true;
        var linkUrl;
        var userInfo;
        var listQuyenTacVu;
        var vm = this;

        /*** VIEW MODEL ***/

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
            },

            //press F2 -> open popup
            F2: function (name, code) {
                console.log('F2');
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                console.log('F3');
            },

            //press F8 -> search
            F8: function (name, code) {
                console.log('F8');
            },
        };
        //end HOT-KEY

        vm.onInitView = onInitView;

        vm.controllerId = {
            /* thông tin nhân viên */
            ThongTinNhanVienEdit: 'ThongTinNhanVienEdit',
            PhongBanListPopup: 'PhongBanListPopup',
            ChucVuNhanVienListPopup: 'ChucVuNhanVienListPopup',
            ChiNhanhListPopup: 'ChiNhanhListPopup',

            /* quá trình công tác */
            QuaTrinhCongTacList: 'QuaTrinhCongTacList',
            ChucVuListPopup: 'ChucVuListPopup',
            QuaTrinhCongTacEditPopup: 'QuaTrinhCongTacEditPopup',

            /* Bảo hiểm xã hội */
            BaoHiemXaHoiEdit: 'BaoHiemXaHoiEdit',

            /* quản lý hợp đồng */
            QuanLyHopDongList: 'QuanLyHopDongList',
            QuanLyHopDongEditPopup: 'QuanLyHopDongEditPopup',

            /* Công việc trước đây */
            CongViecTruocDayList: 'CongViecTruocDayList',
            CongViecTruocDayEditPopup: 'CongViecTruocDayEditPopup',

            /* trình độ học vấn */
            HocVanList: 'HocVanList',
            HocVanEditPopup: 'HocVanEditPopup',

            /* Lịch sử bản thân */
            LichSuBanThanList: 'LichSuBanThanList',
            LichSuBanThanEditPopup: 'LichSuBanThanEditPopup',

            /* Quan hệ gia đình */
            QuanHeGiaDinhList: 'QuanHeGiaDinhList',
            QuanHeGiaDinhEditPopup: 'QuanHeGiaDinhEditPopup',
        };

        vm.data = {
            nhanVienId: 0
        };

        vm.action = {
            checkQuyenTacVu: checkQuyenTacVu,
        }

        /*** INIT FUNCTION ***/

        function onInitView(config) {
            console.log(config);
            /* lấy danh sách quyền tác vụ */
            if (config && config.userInfo) {
                userInfo = config.userInfo;
                listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            }
            if (config && config.nhanVienId > 0) {
                var nhanVienId = config.nhanVienId;
                getNhanVienById(nhanVienId);
            } else {
                vm.data.nhanVienId = 0;
            }
            if (config && config.url) {
                linkUrl = config.url;
            }
            initEventListener();
        }

        function initEventListener() {
            ThongTinNhanVienEditEvent();
            phongBanListPopupEvent();
            ChucVuNhanVienListPopupEvent()
            ChiNhanhListPopupEvent();

            QuaTrinhCongtacListEvent();
            ChucVuListPopupEvent();
            QuaTrinhCongTacEditPopupEvent();

            QuanLyHopDongListEvent();
            QuanLyHopDongEditPopupEvent();

            CongViecTruocDayListEvent();
            CongViecTruocDayEditPopupEvent();

            HocVanListEvent();
            HocVanEditPopupEvent();

            LichSuBanThanListEvent();
            LichSuBanThanEditPopupEvent();

            QuanHeGiaDinhListEvent();
            QuanHeGiaDinhEditPopupEvent();
        };

        /*** BROADCAST / EMIT / ON FUNCTION ***/

        /*  QUAN HỆ GIA ĐÌNH */
        function QuanHeGiaDinhListEvent() {
            $scope.$on(vm.controllerId.QuanHeGiaDinhList + '.action.edit', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuanHeGiaDinhEditPopup + '.action.edit', v);
                $('#' + vm.controllerId.QuanHeGiaDinhEditPopup).collapse('show');
            });
            $scope.$on(vm.controllerId.QuanHeGiaDinhList + '.action.create', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuanHeGiaDinhEditPopup + '.action.create', v);
                $('#' + vm.controllerId.QuanHeGiaDinhEditPopup).collapse('show');
            });
        }
        function QuanHeGiaDinhEditPopupEvent() {
            $scope.$on(vm.controllerId.QuanHeGiaDinhEditPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuanHeGiaDinhList + '.action.refresh', v);
                $('#' + vm.controllerId.QuanHeGiaDinhEditPopup).collapse('hide');
            });
        }

        /* LỊCH SỬ BẢN THÂN */
        function LichSuBanThanListEvent() {
            $scope.$on(vm.controllerId.LichSuBanThanList + '.action.edit', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.LichSuBanThanEditPopup + '.action.edit', v);
                $('#' + vm.controllerId.LichSuBanThanEditPopup).collapse('show');
            });
            $scope.$on(vm.controllerId.LichSuBanThanList + '.action.create', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.LichSuBanThanEditPopup + '.action.create', v);
                $('#' + vm.controllerId.LichSuBanThanEditPopup).collapse('show');
            });
        }
        function LichSuBanThanEditPopupEvent() {
            $scope.$on(vm.controllerId.LichSuBanThanEditPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.LichSuBanThanList + '.action.refresh', v);
                $('#' + vm.controllerId.LichSuBanThanEditPopup).collapse('hide');
            });
        }

        /* TRÌNH ĐỘ HỌC VẤN */
        function HocVanListEvent() {
            $scope.$on(vm.controllerId.HocVanList + '.action.edit', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.HocVanEditPopup + '.action.edit', v);
                $('#' + vm.controllerId.HocVanEditPopup).collapse('show');
            });
            $scope.$on(vm.controllerId.HocVanList + '.action.create', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.HocVanEditPopup + '.action.create', v);
                $('#' + vm.controllerId.HocVanEditPopup).collapse('show');
            });
        }
        function HocVanEditPopupEvent() {
            $scope.$on(vm.controllerId.HocVanEditPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.HocVanList + '.action.refresh', v);
                $('#' + vm.controllerId.HocVanEditPopup).collapse('hide');
            });
        }

        /* CÔNG VIỆC TRƯỚC ĐÂY */
        function CongViecTruocDayListEvent() {
            $scope.$on(vm.controllerId.CongViecTruocDayList + '.action.edit', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.CongViecTruocDayEditPopup + '.action.edit', v);
                $('#' + vm.controllerId.CongViecTruocDayEditPopup).collapse('show');
            });
            $scope.$on(vm.controllerId.CongViecTruocDayList + '.action.create', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.CongViecTruocDayEditPopup + '.action.create', v);
                $('#' + vm.controllerId.CongViecTruocDayEditPopup).collapse('show');
            });
        }
        function CongViecTruocDayEditPopupEvent() {
            $scope.$on(vm.controllerId.CongViecTruocDayEditPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.CongViecTruocDayList + '.action.refresh', v);
                $('#' + vm.controllerId.CongViecTruocDayEditPopup).collapse('hide');
            });
        }

        /* QUẢN LÝ HỢP ĐỒNG */
        function QuanLyHopDongListEvent() {
            $scope.$on(vm.controllerId.QuanLyHopDongList + '.action.editHopDong', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuanLyHopDongEditPopup + '.action.editHopDong', v);
            });
        }

        function QuanLyHopDongEditPopupEvent() {
            $scope.$on(vm.controllerId.QuanLyHopDongEditPopup + '.action.ap-dung', function (e, v) {
                $scope.$broadcast(vm.controllerId.QuanLyHopDongList + '.action.reload', '');
            });
        }

        /* THÔNG TIN NHÂN VIÊN */
        function ThongTinNhanVienEditEvent() {
            $scope.$on(vm.controllerId.ThongTinNhanVienEdit + '.action.getListChiNhanh', function (e, v) {
                $('#' + vm.controllerId.ChiNhanhListPopup).collapse('show');
                $scope.$broadcast(vm.controllerId.ChiNhanhListPopup + '.action.reload', v);
            });
        }
        function ChiNhanhListPopupEvent() {
            $scope.$on(vm.controllerId.ChiNhanhListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.ThongTinNhanVienEdit + '.data.listChiNhanh', v);
                $('#' + vm.controllerId.ChiNhanhListPopup).collapse('hide');
            });
        }
        function phongBanListPopupEvent() {
            $scope.$on(vm.controllerId.PhongBanListPopup + '.action.ap-dung', function (e, v) {
                $scope.$broadcast(vm.controllerId.ThongTinNhanVienEdit + '.action.getPhongBan', v);
                $('#' + vm.controllerId.PhongBanListPopup).collapse('hide');
            });

            $(document).ready(function () {
                $('#' + vm.controllerId.PhongBanListPopup).on('show.bs.collapse', function () {
                    $scope.$broadcast('sa.QLKDmain.phongban.phongban.reload');
                });
            });
        }
        function ChucVuNhanVienListPopupEvent() {
            $scope.$on(vm.controllerId.ChucVuNhanVienListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.ThongTinNhanVienEdit + '.action.getChucVu', v);
                $('#' + vm.controllerId.ChucVuNhanVienListPopup).collapse('hide');
            });
        }

        /* QUÁ TRÌNH CÔNG TÁC */
        function QuaTrinhCongtacListEvent() {
            $scope.$on(vm.controllerId.QuaTrinhCongTacList + '.action.xemChiTiet', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuaTrinhCongTacEditPopup + '.action.editChiTiet', v);
                $('#' + vm.controllerId.QuaTrinhCongTacEditPopup).collapse('show');
            });
        }
        function QuaTrinhCongTacEditPopupEvent() {
            $scope.$on(vm.controllerId.QuaTrinhCongTacEditPopup + '.action.getChucVu', function (e, v) {
                console.log(v);
                $('#' + vm.controllerId.ChucVuListPopup).collapse('show');
            });

            $scope.$on(vm.controllerId.QuaTrinhCongTacEditPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuaTrinhCongTacList + '.action.reload', v);
                $('#' + vm.controllerId.QuaTrinhCongTacEditPopup).collapse('hide');
            });
        }
        function ChucVuListPopupEvent() {
            $scope.$on(vm.controllerId.ChucVuListPopup + '.action.ap-dung', function (e, v) {
                console.log(v);
                $scope.$broadcast(vm.controllerId.QuaTrinhCongTacEditPopup + '.action.getChucVu', v);
                $('#' + vm.controllerId.ChucVuListPopup).collapse('hide');
            });
        }

        /*** BIZ FUNCTION ***/

        /* kiểm tra quyền tác vụ */
        function checkQuyenTacVu(quyen) {
            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        /************************************
         * API FUNCTION
         */

        function getNhanVienById(nhanVienId) {
            NhanVienService
                .getById(nhanVienId)
                .then(function (result) {
                    console.log(result);
                    if (result.data && result.data.data)
                        vm.data.nhanVienId = result.data.data.NhanVienId;
                }, function (result) {
                    console.log(result);
                    vm.data.nhanVienId = 0;
                });
        }

        /*** HELPERS FUNCTION ***/
    }
})();