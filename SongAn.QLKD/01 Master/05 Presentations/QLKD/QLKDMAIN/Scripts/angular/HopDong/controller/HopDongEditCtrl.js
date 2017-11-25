(function () {
    'use strict';
    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'HopDongEdit',
            url: '/HopDong/Edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: HopDongEditCtrl
        });
    });

    function HopDongEditCtrl($stateParams, SETTING, $q, utility, HopDongService, $timeout) {
        var userInfo, linkUrl, _tableState;

        var HopDongId = 0;

        var vm = this;
      
        vm.status = {
            isOpenPopup: false
        };

        vm.error = {};
        vm.data = {};
        vm.data.listChiTiet = [];
        /* INIT / EVENT FUNCTION */

        vm.onInitView = function (config) {
            config = config || {};
            userInfo = config.userInfo || {};
            HopDongId = $stateParams.id || 0;
            linkUrl = config.linkUrl || '';
            vm.functionCode = config.functionCode || '';

            initEventListener();
            loadData();
        }

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'HopDong/showView?viewName=edit';
        }

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                vm.action.save();
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            },
            ESC: function (name, code) {
                console.log('ESC');
            },
        };

        function initEventListener() {

        }

        activate();
        function activate() { }

        /* ACTION FUNCTION */

        vm.action = {};
        vm.action.add = function () {
            CreateListChiTiet();
            var fc = function () {
                $("#txtMaHangHoa" + (vm.data.listChiTiet.length - 1).toString()).focus();
            }
            $timeout(fc, 6);
        };

        function loadData() {
            HopDongId = HopDongId || 0;
            if (HopDongId < 1) {
                delete vm.data.HopDong; vm.data.HopDong = { NgayHopDong: moment().format('DD/MM/YYYY'),NgayHoaDon: moment().format('DD/MM/YYYY'), Chi: 'N', };
                CreateListChiTiet();
                return;
            }
            getById(HopDongId).then(function (success) {
            }, function (error) {
                utility.AlertError(error);
            });
        }
        vm.action.getDataHangHoa = function (data, index) {

            vm.data.listChiTiet[index.$index].HangHoaId = data.HangHoaId;
            vm.data.listChiTiet[index.$index].MaHangHoa = data.MaHangHoa || vm.data.listChiTiet[index.$index].MaHangHoa;;
            vm.data.listChiTiet[index.$index].DonViTinh = data.DonViTinh;
            vm.data.listChiTiet[index.$index].DonGia = data.GiaBan;
        }
        vm.action.checkQuyenTacVu = function (quyen) {
            if (HopDongId == 0) { // trường hợp thêm mới
                if (quyen != 'N') { return false; }
            } else { // trường hợp update
                if (quyen == 'N') { return false; }
            }

            return checkQuyenUI(quyen);
        };
        vm.action.save = function () {
            console.log('vm.action.save', vm.data.HopDong);
            if (vm.action.checkQuyenTacVu('N') == false && vm.action.checkQuyenTacVu('M') == false) { return; }
            if (checkInput() == false) { return; }
            if (InvalidateDataChiTiet())
                return;
            if (HopDongId > 0) {
                update().then(function (success) {
                    utility.AlertSuccess('Cập nhật thành công');
                    loadData();
                }, function (error) {
                    utility.AlertError(error);
                });
            } else {
                insert().then(function (success) {
                    utility.AlertSuccess('Thêm thành công');
                    $timeout(function () {
                        window.location = `${linkUrl}#!/hopdong/edit/${success.data.data[0].HopDongId}`;
                    }, 1000);
                }, function (error) {
                    utility.AlertError(error);
                });
            }
        }

        vm.action.delete = function () {
            if (vm.action.checkQuyenTacVu('D') == false) { return; }

            if (confirm('Bạn có muốn xóa thông tin ?') == false) { return; }

            var list = [{ HopDongId: HopDongId }];

            removeList(list).then(function (success) {
                utility.AlertSuccess('Xóa thành công');
                $timeout(function () {
                    window.location = `${linkUrl}#!/hopdong/list`;
                }, 1000);
            }, function (error) {
                utility.AlertError(error);
            });
        }

        vm.action.keyPress = function (event) {
            if (event.keyCode != 13) { return; }
            if (checkInput($(event.target).data('name')) === false) {
                return;
            }
            $('[data-name="' + $(event.target).data('next') + '"] input').focus();
            $('[data-name="' + $(event.target).data('next') + '"]').focus();
        }
        vm.action.checkAll = function () {
            vm.status.isSelectedAll = utility.checkAll(vm.data.listHopDong, !vm.status.isSelectedAll);
        };
        vm.action.autoCheckAll = function () {
            vm.status.isSelectedAll = utility.autoCheckAll(vm.data.listHopDong);
        };

        vm.action.refresh = function () {
            loadData();
        }
        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI("N") > 0) {
                    vm.action.add();
                }
            },
            F8: function (name, code) {
                console.log('F8');
                if (checkQuyenUI("M") > 0 || checkQuyenUI("L") > 0) {
                    vm.action.save();
                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
                var fc = function () {
                    vm.data.listChiTiet.splice(vm.data.listChiTiet.length - 1, 1);
                    $("#txtMaHangHoa" + (vm.data.listChiTiet.length - 1).toString()).focus();
                }
                $timeout(fc, 6);
            }
        };
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

        function checkInput(inputName) {
            var has_error = false;
            var first_error_name = '';
            var obj_name = 'HopDong';
            var prop_name = '';
            var error_name = '';

            prop_name = 'SoHopDong';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'TenHopDong';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'NhanVienId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] < 1 || !vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'KhachHangId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] < 1 || !vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'NgayHopDong';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'SoTien';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] < 1 || !vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'SoHoaDon';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'NgayHoaDon';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (!vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'ThanhToan';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] < 0 || !vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'TyLe';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if ((vm.data[obj_name][prop_name] < 0 || vm.data[obj_name][prop_name] >= 100) || !vm.data[obj_name][prop_name]) {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'Chi';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] !== 'Y' && vm.data[obj_name][prop_name] !=='N') {
                    first_error_name = has_error ? first_error_name : error_name;
                    vm.error[error_name] = '.';
                    has_error = true;
                }
            }

            prop_name = 'DuLieuId';
            error_name = obj_name + '_' + prop_name;
            if (!inputName || inputName == (error_name)) {
                vm.error[error_name] = '';
                if (vm.data[obj_name][prop_name] < 1 || !vm.data[obj_name][prop_name]) {
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

        function prepareHopDong(objData) {
            objData.NgayHopDong = objData.NgayHopDong ? moment(objData.NgayHopDong, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            objData.NgayHoaDon = objData.NgayHoaDon ? moment(objData.NgayHoaDon, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            objData.NgayThanhLy = objData.NgayThanhLy ? moment(objData.NgayThanhLy, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            objData.NgayTao = objData.NgayTao ? moment(objData.NgayTao, 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
            objData.LoaiHopDong = objData.LoaiHopDong || '';
            return objData;
        }
        function fixedHopDong(objData) {
            objData.NgayHopDong = objData.NgayHopDong ? moment(objData.NgayHopDong, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
            objData.NgayHoaDon = objData.NgayHoaDon ? moment(objData.NgayHoaDon, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
            objData.NgayThanhLy = objData.NgayThanhLy ? moment(objData.NgayThanhLy, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
            objData.NgayTao = objData.NgayTao ? moment(objData.NgayTao, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
            return objData;
        }
        /* API FUNCTION */

        function insert() {
            var deferred = $q.defer();
            debugger;
            var HopDong = prepareHopDong(angular.copy(vm.data.HopDong || {}));
            var data = {};
            data.listHopDong = angular.toJson(HopDong);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;
            HopDongService.insert(data).then(function (success) {
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

        function update() {
            var deferred = $q.defer();
            var HopDong = prepareHopDong(angular.copy(vm.data.HopDong || {}));
            var data = {};
            data.listHopDong = angular.toJson(HopDong);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;
            HopDongService.update(data).then(function (success) {
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

        function getById(id) {
            var deferred = $q.defer();

            var data = {};
            data.HopDongId = id || 0;
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.USER_ID = userInfo.UserId;

            HopDongService.getById(data).then(function (success) {
                console.log(success);
                if (success.data.data && success.data.data.length == 1) {
                    vm.data.HopDong = success.data.data[0];
                    getHopDongChiTietById(vm.data.HopDong.HopDongId);
                } else {
                    delete vm.data.HopDong; vm.data.HopDong = {};
                }
                fixedHopDong(vm.data.HopDong);
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
        //Chi Tiet
        function CreateListChiTiet() {
            var chitiet = {};
            chitiet.HopDongChiTietId = 0;
            chitiet.HopDongId = 0;
            chitiet.HangHoaId = 0;
            chitiet.LoaiHangHoa = 0;
            chitiet.SoLuong = 0;
            chitiet.DonGia = 0;
            chitiet.DaTrienKhai = 0;
            chitiet.NguoiGiao = "";
            chitiet.NguoiNhan = "";
            chitiet.NgayThucHien = moment().format('DD/MM/YYYY');
            chitiet.NgayKetThuc = moment().format('DD/MM/YYYY');
            chitiet.GhiChu = "";
            vm.data.listChiTiet.push(chitiet);
        }
        function getHopDongChiTietById(id) {

            HopDongService.getPageDetail(id)
                .then(function success(result) {
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {

                        vm.data.listChiTiet = result.data.data;

                        $timeout(function () {
                            jQuery("#txtNgayThucHien" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                            jQuery("#txtNgayKetThuc" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                        }, 100);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }
        function InvalidateDataChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết!');
                return true;
            }
            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].HangHoaId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].LoaiHangHoa, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].SoLuong, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    utility.AlertError('Số lượng phải > 0 !');
                    return hasError;
                }
                else if (utility.checkInValid(vm.data.listChiTiet[index].DonGia, 'isEmpty')) {
                    if (vm.data.listChiTiet[index].DonGia.toString() == '0') {

                    }
                    else {
                        hasError = true;
                        vm.data.listChiTiet[index].isError = true;
                        return hasError;
                    }
                }
                else {
                    hasError = false;
                    vm.data.listChiTiet[index].isError = false;
                }
            }

            return hasError;
        }
    }

})();