(function () {
    'use strict';

    var module = angular.module('app');
    module.controller('KhoPhieuXuatEditCtrl', function ($scope, KhoPhieuXuatService, $q, utility, $timeout) {

        /*** PRIVATE ***/

        var userInfo, khoPhieuXuatId, isEdit, linkUrl;

        /*** VIEW MODEL ***/

        var vm = this;
        vm.view = {};
        vm.config = {
            functionCode: 'CN0046'
        };
        vm.error = {};
        vm.data = {};
        vm.data.listChiTiet = [];
        vm.data.KhoPhieuXuat = {
            Loai: 'CK',
            NgayXuat: moment().format('DD/MM/YYYY'),
            ThangNam: moment().format('MMYY')
        };
        vm.data.LoaiPhieuXuat = [
            { MaLoai: 'CK', TenLoai: 'Xuất chuyển kho' }
        ]

        /*** INIT FUNCTION ***/

        activate();
        function activate() { };

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};
            khoPhieuXuatId = config.khoPhieuXuatId || 0;
            vm.view.Title = khoPhieuXuatId > 0 ? 'Thay đổi' : 'Thêm';
            isEdit = khoPhieuXuatId > 0 ? true : false;
            linkUrl = config.linkUrl || '';

            if (isEdit == false) {
                vm.action.addChiTiet();
            } else {
                loadData();
            }
        };

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                if (checkQuyenUI('N') || checkQuyenUI('M')) {
                    vm.action.addChiTiet();
                    var index = vm.data.listNguyenGia.length - 1;
                    $timeout(function () {
                        $('[data-name="listChiTiet_TaiSanId' + index + '"] input').focus();
                    }, 0);
                }
            },
            F3: function (name, code) { },
            F8: function (name, code) {
                if (checkQuyenUI('N') || checkQuyenUI('M')) {
                    vm.action.save();
                }
            },
            DELETE: function (name, code) {
                if (checkQuyenUI('N') || checkQuyenUI('M')) {
                    vm.action.removeChiTiet(vm.data.listChiTiet.length - 1);
                }
            }
        };
        $scope.$watch('ctrl.data.KhoPhieuXuat.NgayXuat', function (newValue, OldValue) {
            if (angular.isUndefined(newValue)) {
                vm.data.KhoPhieuXuat.ThangNam = ''; return;
            }
            if (newValue == OldValue) { return; }
            vm.data.KhoPhieuXuat.ThangNam = moment(newValue, 'DD/MM/YYYY').format('MMYY');
            console.log(vm.data.KhoPhieuXuat.ThangNam);
        })

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.checkQuyenTacVu = checkQuyenUI;
        vm.action.keyPressKhoPhieuXuat = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInputPhieuXuat($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.keyPressChiTiet = function (event, index) {
            if (event.keyCode != 13) { return; }

            if (vm.data.listChiTiet && (vm.data.listChiTiet.length - 1) == index) {
                vm.action.addChiTiet();
            }
            $timeout(function () {
                $('[data-name="' + $(event.target).data('next') + '"] input').focus();
                $('[data-name="' + $(event.target).data('next') + '"]').focus();
            }, 0);
        }
        vm.action.goBack = function () {
            if (!document.referrer || document.referrer.toUpper().indexOf('/KHOPHIEUXUAT/') > 0) {
                window.location = linkUrl + 'KhoPhieuXuat/list/';
                return;
            }
            window.history.back();
        };
        vm.action.checkSoLuongChiTiet = function (item) {
            if (angular.isUndefined(item.SoLuongTon)) { item.SoLuong = 0; }
            if (item.SoLuong > item.SoLuongTon) {
                item.SoLuong = item.SoLuongTon;
            }
            if (item.SoLuong < 1) {
                item.SoLuong = 1;
            }
        }
        vm.action.In = function () {
            $('#reportmodal').find('iframe').attr('src', '../../../QLTSMAIN/CrystalReport/ReportPage.aspx?name=rptKhoPhieuNhapById&data=' + phieuKhoPhieuNhapId);
            $('#reportmodal').modal('show');
        };
        vm.action.getDataTaiSan = function (data, chitiet,index) {
            chitiet.MaTaiSan = data.MaTaiSan;
            chitiet.DonViTinh = data.DonViTinh;
            chitiet.DonGia = data.DonGia;
            chitiet.SoLuongTon = data.SoLuong;
            chitiet.HanDung = data.HanDung;
            chitiet.GiaMua = data.GiaMua;
            chitiet.GiaBan = data.GiaBan;
            chitiet.LoSanXuat = data.LoSanXuat;
            chitiet.NguonNganSachId = data.NguonNganSachId;
            chitiet.TenNguonNganSach = data.TenNguonNganSach;
            chitiet.NhaCungCapId = data.NhaCungCapId;
            chitiet.TenNhaCungCap = data.TenNhaCungCap;
        }
        vm.action.save = function () {
            utility.addloadding($('body'));

            if (checkQuyenUI('N')) {
                insert().then(function (success) {
                    $timeout(function () {
                        window.location = linkUrl + 'KhoPhieuXuat/edit/' + vm.data.KhoPhieuXuat.KhoPhieuXuatId;
                    }, 2000);
                    utility.AlertSuccess("Thêm phiếu xuất thành công");
                    utility.removeloadding();
                }, function (error) {
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message.split('|')[2]);
                    } else {
                        utility.AlertError('Không thể thêm phiếu xuất');
                    }
                    utility.removeloadding();
                });
            }

            if (checkQuyenUI('M')) {
                update().then(function (success) {
                    loadData();
                    utility.AlertSuccess("Thay đổi thông tin phiếu xuất thành công");
                    utility.removeloadding();
                }, function (error) {
                    if (error.status === 400) {
                        utility.AlertError(error.data.error.message.split('|')[2]);
                    } else {
                        utility.AlertError('Không thể thay đổi thông tin phiếu xuất');
                    }
                    utility.removeloadding();
                });
            }
        }
        vm.action.removePhieuKhoPhieuXuat = function () {
            if (checkQuyenUI('D') == false) { return; }
            if (confirm('Bạn có muốn xóa phiếu xuất ?')) {
                utility.addloadding($('body'));
                remove().then(function (success) {
                    $timeout(function () {
                        window.location = linkUrl + 'KhoPhieuXuat/list/';
                    }, 1000);
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
        vm.action.addChiTiet = function () {
            vm.data.listChiTiet.push({});
        }
        vm.action.removeChiTiet = function (index) {
            vm.data.listChiTiet.splice(index, 1);
        }
        /*** BIZ FUNCTION ***/

        function checkQuyenUI(quyen) {
            var listQuyenTacVu;
            // kiểm tra danh sách quyền khác null
            if (userInfo && userInfo.DsQuyenTacVu) {
                var listQuyenTacVu = userInfo.DsQuyenTacVu.split(',');
            } else { return false; }

            if (!listQuyenTacVu || listQuyenTacVu.length < 1) { return false; }

            if (isEdit == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return listQuyenTacVu.indexOf(quyen) >= 0;
        }

        function loadData() {
            getById(khoPhieuXuatId).then(function () {
                if (!vm.data.KhoPhieuXuat.KhoPhieuXuatId) {
                    $timeout(function () {
                        window.location = linkUrl + 'KhoPhieuXuat/list/';
                    }, 0);
                }
            });
            getChiTietById(khoPhieuXuatId);
        }
        function checkInputPhieuXuat(inputName) {
            console.log('checkInputPhieuXuat:', inputName);
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'KhoPhieuXuat';
            var prop_name = '';
            var error_name = '';

            prop_name = 'SoPhieu';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'NgayXuat';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }
            prop_name = 'KhoXuatId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] > 0) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            if (first_error_name) {
                $('[data-name="' + first_error_name + '"] input').focus();
                $('[data-name="' + first_error_name + '"]').focus();
            }

            return !has_error;
        }

        /*** API FUNCTION ***/

        function prepareKhoPhieuXuat(phieu) {
            phieu.NgayXuat = moment(phieu.NgayXuat, 'DD/MM/YYYY').format('YYYY-MM-DD');
            phieu.NgayTao = moment();
            console.log(phieu);
            return phieu;
        }

        function fixKhoPhieuXuat(phieu) {
            phieu.NgayXuat = moment(phieu.NgayXuat, 'YYYY-MM-DD').format('DD/MM/YYYY');
            phieu.ThangNam = moment(phieu.NgayXuat, 'DD/MM/YYYY').format('MMYY');
            return phieu;
        }
        function insert() {
            var deferred = $q.defer();

            var data = {};
            data.KhoPhieuXuat = angular.toJson(prepareKhoPhieuXuat(angular.copy(vm.data.KhoPhieuXuat)));
            data.chiTiet = angular.toJson(vm.data.listChiTiet);
            data.CoSo_Id = userInfo.CoSoId;
            data.NhanVien_Id = userInfo.NhanVienId;

            KhoPhieuXuatService.insert(data).then(function (success) {
                console.log('KhoPhieuXuatService.insert', success);
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.KhoPhieuXuat = success.data.data[0];
                    fixKhoPhieuXuat(vm.data.KhoPhieuXuat);
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function update() {
            var deferred = $q.defer();

            var data = {};
            data.KhoPhieuXuat = angular.toJson(prepareKhoPhieuXuat(angular.copy(vm.data.KhoPhieuXuat)));
            data.chiTiet = angular.toJson(vm.data.listChiTiet);
            data.CoSo_Id = userInfo.CoSoId;
            data.NhanVien_Id = userInfo.NhanVienId;

            KhoPhieuXuatService.update(data).then(function (success) {
                console.log('KhoPhieuXuatService.insert', success);
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.KhoPhieuXuat = success.data.data[0];
                    fixKhoPhieuXuat(vm.data.KhoPhieuXuat);
                }
                return deferred.resolve(success);
            }, function (error) {
                console.log(error);
                return deferred.reject(error);
            });
            return deferred.promise;
        }
        function remove() {
            var deferred = $q.defer();

            var data = {};
            data.KhoPhieuXuatId = vm.data.KhoPhieuXuat.KhoPhieuXuatId;
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
        function getById(id) {
            var deferred = $q.defer();

            var data = {};
            data.KhoPhieuXuatId = id;
            data.CoSo_Id = userInfo.CoSoId;
            data.NhanVien_Id = userInfo.NhanVienId;

            KhoPhieuXuatService.getById(data).then(function (success) {
                console.log('KhoPhieuXuatService.getById', success);
                if (success.data.data && success.data.data.length > 0) {
                    vm.data.KhoPhieuXuat = success.data.data[0];
                    fixKhoPhieuXuat(vm.data.KhoPhieuXuat);
                } else {
                    vm.data.KhoPhieuXuat = {};
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