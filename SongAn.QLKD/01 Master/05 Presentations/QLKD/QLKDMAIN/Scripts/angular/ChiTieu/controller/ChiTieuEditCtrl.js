(function () {
    'use strict';

    var module = angular.module('app');

    module.config(function ($stateProvider) {
        $stateProvider.state({
            name: 'chiTieuEdit',
            url: '/chitieu/edit/{id}',
            template: '<div ng-include="ctrl.getTemplate()"></div>',
            controllerAs: 'ctrl',
            controller: chiTieuEditCtrl
        });
    });

    function chiTieuEditCtrl($stateParams, SETTING, $scope, ChiTieuService, utility, $q, $window, $timeout, Upload) {
        var userInfo, _tableState;
        var ChiTieuId = 0;

        var vm = this;

        vm.status = {};
        vm.data = {};
        vm.data.phieuChiTieu = {};
        vm.data.listChiTiet = [];
        vm.data.ChiTieuId = 0;
        vm.data.linkUrl = '';
        vm.data.listQuyenTacVu = [];
        vm.data.userInfo = {};
        vm.data.Tilte = 'Lập';

        vm.error = {
            Nam: false
        }

        /* INIT FUNCTION */

        vm.onInitView = function (config) {
            //console.log(config,$stateParams.id);
            config = config || {};

            vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
            vm.data.userInfo = config.userInfo || {};

            ChiTieuId = $stateParams.id;
            vm.data.ChiTieuId = $stateParams.id;
            vm.status.isOpenPopup = false;

            if (config && config.linkUrl) {
                vm.data.linkUrl = config.linkUrl;
            }

            initEventListener();
            setEnableButton();

            if (ChiTieuId.length > 0) {
                if (parseInt(ChiTieuId) > 0) {
                    getChiTieuById(ChiTieuId);
                    vm.data.Tilte = 'Điều chỉnh';
                }
                else if (parseInt(ChiTieuId) === 0) {
                    vm.data.phieuChiTieu.Nam = new Date().getFullYear();
                    CreateListChiTiet();
                }
            }

            $("#txtNam").focus();
        };

        vm.getTemplate = function () {
            return SETTING.HOME_URL + 'ChiTieu/showView?viewName=edit';
        }

        /*** EVENT FUNCTION ***/

        vm.keys = {
            F2: function (name, code) {
                console.log('F2');
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.action.add();
                }
            },
            F3: function (name, code) {
                console.log('F3');
            },
            F8: function (name, code) {
                console.log('F8');
                if (vm.data.listQuyenTacVu.indexOf("M") > 0 || vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.action.save();
                }
            },
            DELETE: function (name, code) {
                console.log('DELETE');
                var fc = function () {
                    vm.data.listChiTiet.splice(vm.data.listChiTiet.length - 1, 1);
                    $("#cbxNhanVien" + (vm.data.listChiTiet.length - 1).toString()).find("input").focus();
                }
                $timeout(fc, 6);
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

        vm.action.add = function () {
            CreateListChiTiet();
            var fc = function () {
                $("#cbxNhanVien" + (vm.data.listChiTiet.length - 1).toString()).find("input").focus();
            }
            $timeout(fc, 6);
        };

        vm.action.save = function () {
            var obj = InvalidateDataChiTieu();

            if (obj == null)
                return;

            if (InvalidateDataPhieuChiTieuChiTiet())
                return;

            if (vm.data.phieuChiTieu.ChiTieuId > 0) {
                resetValidate();
                edit();
            } else {
                resetValidate();
                add();
            }
        }

        function add() {

            vm.status.isLoading = true;
            vm.data.phieuChiTieu.NguoiTao = vm.data.userInfo.NhanVienId;
            var ChiTieu = utility.clone(vm.data.phieuChiTieu);
            var data = {};
            data.phieuChiTieu = angular.toJson(ChiTieu);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            ChiTieuService.insert(data).then(function (success) {
                if (success.data.data) {
                    ChiTieuId = success.data.data[0].ChiTieuIdI;
                    utility.AlertSuccess('Thêm thành công!');

                    $timeout(function () {
                        window.location = vm.data.linkUrl + '#!/ChiTieu/edit/' + ChiTieuId;
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
            vm.data.phieuChiTieu.NguoiTao = vm.data.userInfo.NhanVienId;
            var ChiTieu = utility.clone(vm.data.phieuChiTieu);
            var data = {};
            data.chiTieuId = ChiTieuId;
            data.phieuChiTieu = angular.toJson(ChiTieu);
            data.listChiTiet = angular.toJson(vm.data.listChiTiet);
            data.userId = vm.data.userInfo.UserId;

            ChiTieuService.update(data).then(function (success) {
                if (success.data.data) {

                    utility.AlertSuccess('Cập nhật thành công!');

                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;

        }

        function deleteSelected() {
            if (ChiTieuId <= 0) {
                alert("Phiếu này không tồn tại trong hệ thống!");
                return;
            }

            if (!confirm('Bạn có muốn xóa phiếu này?')) {
                return;
            }

            var ChiTieuListSelected = new Array();

            ChiTieuListSelected.push(ChiTieuId);

            var ids = ChiTieuListSelected.join(',');
            if (ids.length > 0) {
                ChiTieuService.removeList(ids).then(function (success) {

                    if (success.data.data > 0) {
                        if (ChiTieuListSelected.length > parseInt(success.data.data)) {
                            var sl = ChiTieuListSelected.length - parseInt(success.data.data);
                            utility.AlertSuccess(sl + ' phiếu được xóa thành công.');

                        }
                        else {
                            utility.AlertError('Không thể xóa!');
                        }
                    } else {
                        utility.AlertSuccess('Xóa thành công!');
                    }

                    $timeout(function () {
                        window.location.href = vm.data.linkUrl + '#!/ChiTieu/list';
                    }, 600);
                }, function (error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                });

            } else {
                utility.AlertError('Không tìm thấy phiếu để xóa!');
            }

        }

        vm.action.refresh = function () {
          
        }

        vm.action.keyPressChiTieu = function (value, fromId, ToId, event) {

            var obj = vm.data.phieuChiTieu;
            if (event.keyCode == '13') {
                if (fromId == 'txtNam') {
                    vm.error.Nam = utility.checkInValid(obj.Nam, 'isEmpty');
                    if (vm.error.Nam) {
                        $("#" + fromId).focus();
                    } else $("#cbxNhanVien0 input").focus();
                }
                
                else $("#" + ToId).focus();
            }
        }

        vm.action.keyPress = function (value, fromId, ToId, index, event) {
            if (event.keyCode == '13') {
                if (fromId == ('txtNgayCapNhat' + index)) {
                    if (vm.data.listChiTiet.length == index + 1) {
                        CreateListChiTiet();
                        var fc = function () {
                            $("#cbxNhanVien" + (parseInt(index) + 1).toString()).find("input").focus();
                        }
                        $timeout(fc, 6);
                    }
                    else {
                        $("#cbxNhanVien" + (parseInt(index) + 1).toString()).find("input").focus();
                    }
                }
                
                else $("#" + ToId).focus();
            }
        }

        

        function CreateListChiTiet() {
            var chitiet = {};
            chitiet.ChiTieuChiTietId = 0;
            chitiet.ChiTieuId = 0;
            chitiet.NhanVienId = 0;
            chitiet.Thang1 = 0;
            chitiet.Thang2 = 0;
            chitiet.Thang3 = 0;
            chitiet.Thang4 = 0;
            chitiet.Thang5 = 0;
            chitiet.Thang6 = 0;
            chitiet.Thang7 = 0;
            chitiet.Thang8 = 0;
            chitiet.Thang9 = 0;
            chitiet.Thang10 = 0;
            chitiet.Thang11 = 0;
            chitiet.Thang12 = 0;
            chitiet.NgayCapNhat = moment().format('DD/MM/YYYY');
            vm.data.listChiTiet.push(chitiet);

            $timeout(function () {
                jQuery("#txtNgayCapNhat" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                    mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                })
                

            }, 100);
        }

        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            vm.data.showButtonNew = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    //vm.data.showButtonSave = ChiTieuId > 0 ? true : vm.data.showButtonSave;
                    vm.data.showButtonSave = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true;
                }
            }
        }
        /* BIZ FUNCTION */

        function InvalidateDataChiTieu() {

            var obj = vm.data.phieuChiTieu;

            vm.error.Nam = utility.checkInValid(obj.Nam, 'isEmpty');
            if (vm.error.Nam) {
                $("#txtNam").focus();
                return null;
            }
            
            else {
                vm.error.NgayDuyet = false;
            }

            return 1;
        }

        function InvalidateDataPhieuChiTieuChiTiet() {
            var hasError = false;

            if (!vm.data.listChiTiet || vm.data.listChiTiet.length == 0) {
                utility.AlertError('Bạn chưa nhập thông tin chi tiết!');
                return true;
            }

            for (var index = 0; index < vm.data.listChiTiet.length; index++) {
                if (utility.checkInValid(vm.data.listChiTiet[index].NhanVienId, 'isEmpty')) {
                    hasError = true;
                    vm.data.listChiTiet[index].isError = true;
                    return hasError;
                }
                
                else if (utility.checkInValid(vm.data.listChiTiet[index].Thang1, 'isEmpty')) {
                    if (vm.data.listChiTiet[index].Thang1.toString() == '0') {

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

        function resetValidate() {

            vm.error.Nam = false;
        }


        /* API FUNCTION */
        function getChiTieuById(id) {

            ChiTieuService.getById(id)
                .then(function success(result) {

                    delete vm.data.phieuChiTieu;

                    if (result.data && result.data.data && result.data.data.length) {
                        vm.data.phieuChiTieu = result.data.data[0];
                        getChiTieuChiTietById(vm.data.phieuChiTieu.ChiTieuId);
                    }

                }, function error(result) {
                    console.log(result);
                });
        }

        function getChiTieuChiTietById(id) {

            ChiTieuService.getPageDetail(id)
                .then(function success(result) {
                    vm.data.listChiTiet = [];

                    if (result.data && result.data.data && result.data.data.length) {

                        vm.data.listChiTiet = result.data.data;

                        $timeout(function () {
                            jQuery("#txtNgayCapNhat" + (vm.data.listChiTiet.length - 1)).datetimepicker({
                                mask: '39/19/9999', format: 'd/m/Y', timepicker: false, scrollInput: false, startDate: '+1971/05/01'
                            })
                           
                        }, 100);
                    }
                }, function error(result) {
                    console.log(result);
                });
        }
    }
})();