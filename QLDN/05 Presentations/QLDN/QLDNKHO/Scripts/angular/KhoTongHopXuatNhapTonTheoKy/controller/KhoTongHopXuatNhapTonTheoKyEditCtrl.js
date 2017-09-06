(function () {
    'use strict';

    angular
        .module('app')
        .controller('TongHopXuatNhapTonTheoKyEditCtrl', TongHopXuatNhapTonTheoKyEditCtrl);

    TongHopXuatNhapTonTheoKyEditCtrl.$inject = ['$rootScope', '$scope', 'TongHopXuatNhapTonTheoKyService', 'utility', '$window'];
    function TongHopXuatNhapTonTheoKyEditCtrl($rootScope, $scope, TongHopXuatNhapTonTheoKyService, utility, $window) {
        var controllerId = 'TongHopXuatNhapTonTheoKyEditCtrl';
        var vm = this;
        var userInfo;

        vm.data = {
            listLoaiBaoCao: [],
            listQuyenTacVu: [],

            objTongHopKy: {

            },
            listKhoHang: [],
            listKy: [],

            KhoSelected: {},
            KySelected: {},

            NhanVienId: 0,
            error: {},
            showButtonXoa: false,
            showButtonSave: false,
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidThoiGianPhatSinh: false,
            isInValidThangNam: false,
            isInValidTenKy: false,
            isInValidGhiChu: false,
            isInValidKyTruoc: false
        };

        vm.action = {
            save: save,
            deleteOne: deleteOne,
            refresh: refresh,
            closeEdit: closeEdit,
            keyPress: keyPress,
            clearListKhoHang: clearListKhoHang,
            clearListKy: clearListKy
            
        };

        vm.onInitView = onInitView;
        activate();

        function activate() {
        }

        function onInitView(config) {
            if (config && config.controllerId) {
                controllerId = config.controllerId;
            }

            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');

                vm.data.nhanVienId = config.userInfo.NhanVienId ? config.userInfo.NhanVienId : '0';
            }

            initEventListener();
        }

        function initEventListener() {
            $scope.$on(controllerId + '.data.listKhoHang', function (event, data) {
                if (data && data.listKhoHang && data.listKhoHang.length > 0) {
                    vm.data.KhoSelected.KhoXem = data.listKhoHang[0].KhoHangId;
                    vm.data.KhoSelected.TenKhoXem = data.listKhoHang[0].TenKho;
                }
            });

            $scope.$on(controllerId + '.data.listKy', function (event, data) {
                if (data && data.listKy && data.listKy.length > 0) {
                    vm.data.KySelected.KyXem = data.listKy[0].KyId;
                    vm.data.KySelected.TenKyXem = data.listKy[0].Ten;
                    vm.data.KySelected.KhoHangId = data.listKy[0].KhoHangId;
                    vm.data.KySelected.NgayBatDau = data.listKy[0].NgayBatDau;
                    vm.data.KySelected.NgayKetThuc = data.listKy[0].NgayKetThuc;
                    vm.data.KySelected.LoaiBaoCao = data.listKy[0].LoaiBaoCao;
                }
            });

            $scope.$on(controllerId + '.action.xemKy', function (event, data) {
                vm.data.objTongHopKy.KyId = data;
                refresh();
            });
            //F8
            $scope.$on(controllerId + '.action.callSave', function (event, data) {
                if (vm.data.showButtonSave == true) {
                    vm.action.save();
                }
            });
        }


        function refresh() {
            if (vm.data.objTongHopKy.KyId && vm.data.objTongHopKy.KyId > 0) {
                TongHopXuatNhapTonTheoKyService.getById(vm.data.objTongHopKy.KyId).then(function (result) {

                    vm.data.objTongHopKy.KyId = result.data.data[0].KyId;
                    vm.data.objTongHopKy.NgayBatDau = utility.convertDateFormat(result.data.data[0].NgayBatDau, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objTongHopKy.NgayKetThuc = utility.convertDateFormat(result.data.data[0].NgayKetThuc, "YYYY-MM-DD", "DD/MM/YYYY");
                    vm.data.objTongHopKy.ThangNam = utility.convertDateFormat(result.data.data[0].ThangNam, "YYYY-MM-DD", "MM/YYYY");
                    vm.data.objTongHopKy.Ten = result.data.data[0].Ten;
                    vm.data.objTongHopKy.LoaiBaoCao = result.data.data[0].LoaiBaoCao;
                    vm.data.objTongHopKy.GhiChu = result.data.data[0].GhiChu;
                    vm.data.objTongHopKy.MaTrangThai = result.data.data[0].MaTrangThai;
                    vm.data.KhoSelected.KhoXem = result.data.data[0].KhoHangId;
                    vm.data.KhoSelected.TenKhoXem = result.data.data[0].TenKho;
                    vm.data.KySelected.KyXem = result.data.data[0].KyTruoc;
                    vm.data.KySelected.TenKyXem = result.data.data[0].TenKyTruoc;
                    if (vm.data.objTongHopKy.MaTrangThai == "BCK_HT") {
                        vm.data.showButtonSave = false;
                    } else {
                        vm.data.showButtonSave = true;
                    }
                })
            } else {
                vm.data.objTongHopKy = {
                    KyId: 0,
                    KyTruoc: 0,
                    KhoHangId: 0,
                    LoaiBaoCao: 'THANG',
                    NgayBatDau: '01' + moment().format("/MM/YYYY"),
                    NgayKetThuc: moment(moment()).endOf('month').format("DD/MM/YYYY"),
                    ThangNam: moment().format("MM/YYYY"),
                    Ten: '',
                    GhiChu: '',
                    NguoiTao: '0',
                    MaTrangThai: 'BCK_KN'
                };
                clearListKhoHang();
                clearListKy();
            }
            setEnableButton();
        }

        function setEnableButton() {

            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = vm.data.objTongHopKy.KyId == 0 ? true : vm.data.showButtonSave;
                }

                //// Co quyen Xoa
                //if (vm.data.listQuyenTacVu.indexOf("D") > 0 && vm.data.objTongHopKy.MaLoaiBaoCao == 'BL_KN') {
                //    vm.data.showButtonXoa = true;
                //}

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = vm.data.objTongHopKy.KyId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }


        function insert(obj) {
            obj.KyTruoc = vm.data.KySelected.KyXem;
            obj.KhoHangId = vm.data.KhoSelected.KhoXem;
            obj.NguoiTao = vm.data.nhanVienId;

            TongHopXuatNhapTonTheoKyService.insert(obj).then(function (result) {
                console.log(result);
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {
                console.log(error);
                if (error.data.error) {
                    alert(error.data.error.message);
                } else {
                    alert(error.message);
                }
            });
        }


        function update(obj) {
            obj.KyTruoc = vm.data.KySelected.KyXem;
            obj.KhoHangId = vm.data.KhoSelected.KhoXem;
            obj.NguoiTao = vm.data.nhanVienId;

            TongHopXuatNhapTonTheoKyService.update(obj).then(function (result) {
                resetStatus();
                $scope.$emit(controllerId + '.action.save');
            }, function (error) {
                console.log(error);
                if (error.data.error) {
                    alert(error.data.error.message);
                } else {
                    alert(error.message);
                }
            });
        }

        function deleteOne(list) {


        }

        function save() {
            
            vm.status.isLoading = true;

            var obj = InvalidateData();

            if (obj == null)
                return;

            if (obj.KyId && obj.KyId > 0) {
                update(obj);
            }
            else {
                var obj1 = InvalidateDataKyTruoc();
                var _thongbao = _thongBao(obj1)
                if (obj1 == 4) {
                    alert(_thongbao);
                }
                else if (obj1 > 0) {
                    alert(_thongbao);
                    return;
                }
                insert(obj);
            }

            vm.status.isLoading = false;
            clearListKhoHang();
            clearListKy();
        }

        function convertddmmyyyyToDate(date) {
            var from = date.split("/");
            var f = new Date(from[2], from[1] - 1, from[0]);
            return f;
        }
        function _thongBao(index) {
            if (index == 1) {
                return "Chọn kỳ trước không hợp lệ";
            }
            else if (index == 2) {
                return "Chọn kỳ trước không hợp lệ";
            }
            else if (index == 3) {
                return "Chọn kỳ trước không hợp lệ";
            }
            else if (index == 4) {
                return "Nếu không chọn kỳ trước để khai báo đầu kỳ.Thì số lượng cuối kỳ có thể bị âm.";
            }
            else {
                return "Không xác định";
            }
        }

        function InvalidateDataKyTruoc() {
            
            var obj = vm.data.objTongHopKy;
            var flag_check = true;
            var index = 0;
            // check kho
            var kho = vm.data.KhoSelected.KhoXem;
            var khoTruoc = vm.data.KySelected.KhoHangId;
            if (kho != khoTruoc) {
                flag_check = false;
                index = 1;
            }

            var date_hientai = convertddmmyyyyToDate(obj.NgayBatDau);

            if (vm.data.KySelected.KhoHangId == 0 && vm.data.KySelected.NgayKetThuc == "" && vm.data.KySelected.LoaiBaoCao == "") {
                index = 4;
            }
            else {
                // check ngay
                var date_kytruoc = convertddmmyyyyToDate(utility.convertDateFormat(vm.data.KySelected.NgayKetThuc, "YYYY-MM-DD", "DD/MM/YYYY"));
                if (!(date_hientai >= date_kytruoc)) {
                    flag_check = false;
                    index = 2;
                }
                // check trang thai
                var LoaiBaoCao = convertLoaiBaoCao(obj.LoaiBaoCao);
                var LoaiBaoCao_truoc = vm.data.KySelected.LoaiBaoCao;
                if (LoaiBaoCao != LoaiBaoCao_truoc) {
                    flag_check = false;
                    index = 3;
                }
            }
            
            var _getDate = new Date();
            if ((date_hientai > _getDate)) {
                flag_check = false;
                index = 2;
            }
            //check ky lon hon ngay hien tai
            if (!flag_check) {
                clearListKy();
                return index;
            }
            return index;
        }

        function convertLoaiBaoCao(_type) {
            if (_type == "THANG") {
                return 1;
            } else if (_type == "QUY") {
                return 2;
            } else if (_type == "NAM") {
                return 3;
            }
            else {
                return 0;
            }
        }

        function InvalidateData() {
            var obj = vm.data.objTongHopKy;

            //vm.status.isInValidThangNam = utility.checkInValid(obj.ThangNam, 'isEmpty');
            //if (!utility.checkInValid(obj.ThangNam, 'isEmpty')) {
            //    obj.ThangNam = "01/" + obj.ThangNam;

            //    if (!moment(obj.ThangNam, "DD/MM/YYYY", true).isValid()) {
            //        vm.status.isInValidThangNam = true;
            //    }
            //}
            //if (vm.status.isInValidThangNam) {
            //    $("#thangnamedit").focus();
            //    return null;
            //}

            vm.status.isInValidThoiGianPhatSinh = utility.checkInValid(obj.NgayBatDau, 'isEmpty');
            if (vm.status.isInValidThoiGianPhatSinh) {
                $("#tungayedit").focus();
                return null;
            }

            vm.status.isInValidThoiGianPhatSinh = utility.checkInValid(obj.NgayKetThuc, 'isEmpty');
            var datefrom = moment(obj.NgayBatDau);
            var dateto = moment(obj.NgayKetThuc);
            if (dateto < datefrom) {
                alert("Không thể chọn thời gian phát sinh từ ngày lớn hơn đến ngày!");
                vm.status.isInValidThoiGianPhatSinh = true;
            }
            if (vm.status.isInValidThoiGianPhatSinh) {
                $("#denngayedit").focus();
                return null;
            }

            vm.status.isInValidTenKy = utility.checkInValid(obj.Ten, 'isEmpty');
            if (vm.status.isInValidTenKy) {
                $("#txtTenKy").focus();
                return null;
            }

            obj.strNgayBatDau = obj.NgayBatDau;

            obj.strNgayKetThuc = obj.NgayKetThuc;

            obj.strThangNam = obj.NgayBatDau;

            obj._khoId = vm.data.KhoSelected.KhoXem;

            obj._loaiBaoCao = convertLoaiBaoCao(obj.LoaiBaoCao);

            return obj;
        }

        function resetStatus() {
            //set condition of has-error
            vm.status.isInValidThoiGianPhatSinh = false;
            vm.status.isInValidThangNam = false;
            vm.status.isInValidTenKy = false;
            vm.status.isInValidGhiChu = false;
            //
        }

        function clearListKhoHang() {
            utility.clearArray(vm.data.listKhoHang);
            vm.data.KhoSelected.KhoXem = 0;
            vm.data.KhoSelected.TenKhoXem = '';
        }
        function clearListKy() {
            utility.clearArray(vm.data.listKy);
            vm.data.KySelected.KyXem = 0;
            vm.data.KySelected.TenKyXem = '';
            vm.data.KySelected.KhoHangId = 0;
            vm.data.KySelected.NgayBatDau = '';
            vm.data.KySelected.NgayKetThuc = '';
            vm.data.KySelected.LoaiBaoCao = '';
        }

        function closeEdit() {
            resetStatus();
            $scope.$emit(controllerId + '.action.closeEdit');
        }

        function keyPress(value, fromId, ToId, event) {

        }

    }
})();
