(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'khachHangEdit',
            url: '/khachhang/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: khachHangEditCtrl
        });
    });

    function khachHangEditCtrl($stateParams, SETTING, $scope, KhachHangService, utility, $q, $window, $timeout, Upload) {
        var userInfo, _tableState;
        var KhachHangId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.objKhachHang = {};
        vm.data.KhachHangId = 0;
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};

        vm.validate = {
            MaKhachHang: false,
            TenKhachHang: false,
            NhomKhachHangId: false,
            GioiTinh: false,
            NgaySinh: false,
            TinhThanhPhoId: false,
            QuanHuyenId: false,
            PhuongXaId: false
        }

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            //console.log(config,$stateParams.id);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            KhachHangId = $stateParams.id;
            vm.data.KhachHangId = $stateParams.id;
            vm.status.isOpenPopup = false;

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            initEventListener();
            setEnableButton();

            if (KhachHangId.length > 0) {
                if (parseInt(KhachHangId) > 0) {
                    getKhachHangById(KhachHangId);
                }
                else if (parseInt(KhachHangId) === 0) {
                    vm.data.objKhachHang.NgaySinh = moment().format('DD/MM/YYYY');
                    vm.data.objKhachHang.NgayThanhLap = moment().format('DD/MM/YYYY');
                    vm.data.objKhachHang.GioiTinh = $("#cbxGioiTinh option:first").val();
                    vm.data.objKhachHang.HinhAnh = "avatar.jpg";
                }
            }

            $("#txtMaKhachHang").focus();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'KhachHang/showView?viewName=edit';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (checkQuyenUI('N')) {

                }
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.status.isOpenPopup && checkQuyenUI('N')) {

                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
            }
        };

        function initEventListener() {

        }

        /* ACTION FUNCTION */

        vm.action = {
            deleteSelected: deleteSelected,
        };
        vm.action.goBack = function () {
            window.history.back();
        };
        vm.action.resetNhomKhachHangId = function (data) {
            vm.data.objKhachHang.NhomKhachHangId = data.NhomKhachHangId;
        }
        vm.action.resetTinhThanhPho = function (data) {
            vm.data.objKhachHang.QuanHuyenId = 0;
            vm.data.objKhachHang.PhuongXaId = 0;
        }
        vm.action.resetQuanHuyen = function (data) {
            if (data.isSelected) {
                vm.data.objKhachHang.PhuongXaId = 0;
            }
        }
        vm.action.resetPhuongXa = function (data) {
        }

        vm.action.save = function (data) {
            var obj = InvalidateDataKhachHang();

            if (obj == null)
                return;

            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.objKhachHang.HinhAnh) {
                    vm.data.objKhachHang.HinhAnh = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.objKhachHang.HinhAnh = vm.data.objKhachHang.HinhAnh.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }

            if (vm.data.objKhachHang.KhachHangId > 0) {
                edit();
            } else {
                resetValidate();
                add();
            }
        }

        function add() {

            vm.status.isLoading = true;
            vm.data.objKhachHang.NguoiTao = vm.data.userInfo.NhanVienId;
            var KhachHang = utility.clone(vm.data.objKhachHang);
            var data = {};
            data.KhachHang = angular.toJson(KhachHang);
            data.UserId = vm.data.userInfo.UserId;

            KhachHangService.insert(data).then(function (success) {
                if (success.data.data) {
                    KhachHangId = success.data.data[0].KhachHangIdI;
                    utility.AlertSuccess('Thêm thành công!');
                    upload().then(function () {

                    }, function () {
                        utility.AlertSuccess('Không thể upload file.');
                    });

                    $timeout(function () {
                        window.location = vm.data.linkUrl + '#!/khachhang/edit/' + KhachHangId;
                    }, 2000);
                }
                vm.status.isLoading = false;
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function edit() {

            vm.status.isLoading = true;
            vm.data.objKhachHang.NguoiTao = vm.data.userInfo.NhanVienId;
            var KhachHang = utility.clone(vm.data.objKhachHang);
            var data = {};
            data.KhachHang = angular.toJson(KhachHang);
            data.UserId = vm.data.userInfo.UserId;

            KhachHangService.update(data).then(function (success) {
                if (success.data.data) {
                    vm.data.objKhachHang = success.data.data[0];
                    utility.AlertSuccess('Cập nhật thành công!');
                    upload().then(function () {

                    }, function () {
                        utility.AlertSuccess('Không thể upload file.');
                    });

                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;

        }

        function deleteSelected() {
            if (KhachHangId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var KhachHangListSelected = new Array();

            KhachHangListSelected.push(KhachHangId);

            var ids = KhachHangListSelected.join(',');
            if (ids.length > 0) {
                KhachHangService.removeList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (KhachHangListSelected.length > parseInt(success.data.data)) {
                            var sl = KhachHangListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');
                           
                        }
                        else {
                            utility.AlertError('Không thể xóa!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + '#!/khachhang/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }

        }

        vm.action.refresh = function () {
            if (KhachHangId.length > 0) {
                if (parseInt(KhachHangId) == 0) {
                    delete vm.data.objKhachHang;
                    vm.data.objKhachHang = {};
                    vm.data.objKhachHang.NgaySinh = moment().format('DD/MM/YYYY');
                    vm.data.objKhachHang.NgayThanhLap = moment().format('DD/MM/YYYY');
                    vm.data.objKhachHang.GioiTinh = $("#cbxGioiTinh option:first").val();

                    $("#txtMaKhachHang").focus();
                }
            }
        }

        vm.action.keyPressKhachHang = function (value, fromId, ToId, event) {

            var obj = vm.data.objKhachHang;
            if (event.keyCode == '13') {
                if (fromId == 'txtMaKhachHang') {
                    vm.validate.MaKhachHang = utility.checkInValid(obj.MaKhachHang, 'isEmpty');
                    if (vm.validate.MaKhachHang) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtTenKhachHang') {
                    vm.validate.TenKhachHang = utility.checkInValid(obj.TenKhachHang, 'isEmpty');
                    if (vm.validate.TenKhachHang) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).find('input').focus();
                }
                else if (fromId == 'txtNgaySinh') {
                    vm.validate.NgaySinh = utility.checkInValid(obj.NgaySinh, 'isEmpty');
                    if (vm.validate.NgaySinh) {
                        $("#" + fromId).focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtEmail') {
                    $("#" + ToId + " input").focus();
                }
                else if (fromId == 'txtKhac') {
                    window.location.href = vm.data.linkUrl + '#!/khachhang/edit/' + KhachHangId + '#profile';
                    var lk = '#!/khachhang/edit/' + KhachHangId + '#profile';
                    $('a[href="' + lk + '"]').tab('show');
                    $("#txtNguoiPhuTrach").focus();
                }
                else $("#" + ToId).focus();
            }
        }

        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = KhachHangId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = KhachHangId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataKhachHang() {

            var obj = vm.data.objKhachHang;

            vm.validate.MaKhachHang = utility.checkInValid(obj.MaKhachHang, 'isEmpty');
            if (vm.validate.MaKhachHang) {
                $("#txtMaKhachHang").focus();
                return null;
            }

            vm.validate.TenKhachHang = utility.checkInValid(obj.TenKhachHang, 'isEmpty');
            if (vm.validate.TenKhachHang) {
                $("#txtTenKhachHang").focus();
                return null;
            }
            vm.validate.NhomKhachHangId = utility.checkInValid(obj.NhomKhachHangId, 'isEmpty');
            if (vm.validate.NhomKhachHangId) {
                $("#cbxNhomKhachHang input").focus();
                return null;
            }
            vm.validate.GioiTinh = utility.checkInValid(obj.GioiTinh, 'isEmpty');
            if (vm.validate.GioiTinh) {
                $("#cbxGioiTinh input").focus();
                return null;
            }
            vm.validate.NgaySinh = utility.checkInValid(obj.NgaySinh, 'isEmpty');
            if (vm.validate.NgaySinh) {
                $("#txtNgaySinh").focus();
                return null;
            }
            vm.validate.TinhThanhPhoId = utility.checkInValid(obj.TinhThanhPhoId, 'isEmpty');
            if (vm.validate.TinhThanhPhoId) {
                $("#cbxTinhThanhPho input").focus();
                return null;
            }
            vm.validate.QuanHuyenId = utility.checkInValid(obj.QuanHuyenId, 'isEmpty');
            if (vm.validate.QuanHuyenId) {
                $("#cbxQuanHuyen input").focus();
                return null;
            }
            vm.validate.PhuongXaId = utility.checkInValid(obj.PhuongXaId, 'isEmpty');
            if (vm.validate.PhuongXaId) {
                $("#cbxPhuongXa input").focus();
                return null;
            }


            return 1;
        }

        function resetValidate() {
            vm.validate.MaKhachHang = false;
            vm.validate.TenKhachHang = false;
            vm.validate.NhomKhachHangId = false;
            vm.validate.GioiTinh = false;
            vm.validate.NgaySinh = false;
            vm.validate.TinhThanhPhoId = false;
            vm.validate.QuanHuyenId = false;
            vm.validate.PhuongXaId = false;
        }

        $scope.changeImage = function (ele) {
            
            var photofile = ele.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    //vm.data.objKhachHang.HinhAnh = e.target.result;
                    vm.data.objKhachHang.HinhAnh = "";
                });
            };
            reader.readAsDataURL(photofile);
        }

        // upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.file);
                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.objKhachHang.HinhAnh, 'KhachHang/').then(function success(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    vm.data.objKhachHang.HinhAnh = result.data.data + '?t=' + moment().format('hhMMss');
                    $('input[type="file"]').val('');
                    resolve();
                }, function error(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    reject('Upload.filesUpload');
                });
            });
        };

        /* API FUNCTION */
        function getKhachHangById(id) {

            KhachHangService.getById(id)
                .then(function success(result) {

                    delete vm.data.objKhachHang;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.objKhachHang = result.data.data[0];
                    }
                    
                }, function error(result) {
                    console.log(result);
                });
        }
    }
})();