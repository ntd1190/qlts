(function () {
    'use strict';

    angular
        .module('app')
        .controller('KhoTonKhoEditCtrl', KhoTonKhoEditCtrl);

    KhoTonKhoEditCtrl.$inject = ['$rootScope', '$scope', 'KhoTonKhoService', 'utility', '$window'];
    function KhoTonKhoEditCtrl($rootScope, $scope, KhoTonKhoService, utility, $window) {
        var controllerId = 'KhoTonKhoEditCtrl';
        var _tableState;
        var vm = this;
        var userInfo;

        vm.data = {
            listQuyenTacVu: [],
            listKhoTonKhoChiTiet : [],
            objChiTietTon: {

            },
            NhanVienId: 0,
            TenKho: '',
            MaTrangThai: '',
            ThangNam: '',
            error: {},
            showButtonSave: false,
            showButtonNew: false
        };

        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false
        };

        vm.action = {
            update: update,
            keyPress: keyPress,
            updateTonDau : updateTonDau,
            add: addHangHoaTonDau,
            getPage : getPage,
            closeEdit: closeEdit
        };

        vm.action.goBack = function () {
            window.history.back();
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

            if (config && config.tonKhoId) {
                vm.data.objChiTietTon.TonKhoId = config.tonKhoId;
                //getPage(_tableState);
            }

            initEventListener();
        }

        function initEventListener() {
            $scope.$on(controllerId + '.action.getPage', function (event, data) {
                getPage(_tableState);
            });

            //F2 
            $scope.$on(controllerId + '.action.callOpenAddPopup', function (event, data) {
                if (vm.data.showButtonNew) {
                    vm.action.add();
                    $rootScope.isOpenPopup = true;
                }
            });
        }

        
        function addHangHoaTonDau() {
            $scope.$emit(controllerId + '.action.addHangHoaTonDau', vm.data.objChiTietTon.TonKhoId);
        }

        function closeEdit() {
            resetStatus();
            $scope.$emit(controllerId + '.action.closeEdit');
        }

        function setEnableButton() {

            vm.data.showButtonSave = false;
            vm.data.showButtonSaveAs = false;
            vm.data.showButtonNew = false;

            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    if (vm.data.MaTrangThai == 'TonKho_KN')
                        vm.data.showButtonNew = true;
                }

                //// Co quyen Xoa
                //if (vm.data.listQuyenTacVu.indexOf("D") > 0 && vm.data.objTongHopKy.MaLoaiBaoCao == 'BL_KN') {
                //    vm.data.showButtonXoa = true;
                //}

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    
                }

                if (vm.data.listQuyenTacVu.indexOf("L") > 0) {
                    vm.data.showButtonSave = true;
                    if (vm.data.MaTrangThai == 'TonKho_KN')
                        vm.data.showButtonSaveAs = true;
                }
            }
        }

        function updateTonDau(obj) {
            var data = {};
            data.TonKhoId = obj.TonKhoId;
            data.TonKhoChiTietId = obj.TonKhoChiTietId;
            data.TonDau = obj.TonDau;
            data.LoHang = obj.LoHang;
            data.GiaNhap = obj.GiaNhap;
            data.LoginId = vm.data.nhanVienId;

            if (vm.status.isLoading) { return; }

            if (vm.data.listQuyenTacVu.indexOf("L") <= 0) {
                alert('Bạn không có quyền lưu');
                return;
            }

            if (confirm('Bạn có muốn lưu không ?')) {

                KhoTonKhoService.updateTonDau(data).then(function (success) {
                    console.log(success);
                    if (success.data.data) {
                        if (success.data.data[0][""] == "OK")
                            alert("Cập nhật thành công!");
                        else
                            alert("Cập nhật thất bại!");
                    }
                }, function (error) {
                    if (error.data.error) {
                        alert(error.data.error.message);
                    } else {
                        alert(error.message);
                    }
                });
            }
        }

        function update(obj) {
            obj.KyTruoc = vm.data.KySelected.KyXem;
            obj.KhoHangId = vm.data.KhoSelected.KhoXem;
            obj.NguoiTao = vm.data.nhanVienId;

            KhoTonKhoService.update(obj).then(function (result) {
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


        function convertddmmyyyyToDate(date) {
            var from = date.split("/");
            var f = new Date(from[2], from[1] - 1, from[0]);
            return f;
        }
        

        function keyPress(value, fromId, ToId, event) {

        }

        function getPage(tableState) {
            vm.data.isLoading = true;

            if (tableState) {
                _tableState = tableState;
            }
            else if (_tableState) {
                tableState = _tableState;
            }
            else {
                tableState = initTableState(tableState);
                _tableState = tableState;
            }

            tableState.draw = tableState.draw + 1 || 1;

            var data = {};

            // chuẩn bị tham số 
            // phân trang
            data.draw = tableState.draw;
            data.start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            data.number = tableState.pagination.number || 10;  // Number of entries showed per page.
            data.sortName = tableState.sort.predicate || '';
            data.sortDir = '';
            if (data.sortName != '')
                data.sortDir = tableState.sort.reverse ? 'desc' : 'asc';

            // filter

            data.TonKhoId = vm.data.objChiTietTon.TonKhoId;
            // end chuẩn bị tham số 

            // gọi api
            KhoTonKhoService.GetListChiTietById(data)

                .then(function (success) {
                    console.log(success);

                    if (success.data.metaData.draw == data.draw && success.data.data) {
                        utility.clearArray(vm.data.listKhoTonKhoChiTiet);
                        var i = 1;
                        while (success.data.data.length) {
                            vm.data.listKhoTonKhoChiTiet.push(success.data.data.shift());
                            if (i == 1) {
                                vm.data.TenKho = vm.data.listKhoTonKhoChiTiet[0].TenKho;
                                vm.data.MaTrangThai = vm.data.listKhoTonKhoChiTiet[0].MaTrangThai;
                                vm.data.ThangNam = vm.data.listKhoTonKhoChiTiet[0].ThangNam;
                            }
                            i = 2;
                        }
                        tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / data.number);//set the number of pages so the pagination can update
                    }
                    setEnableButton();
                    vm.data.isLoading = false;
                }, function (error) {
                    console.log(error);
                    vm.data.error.message = error.data.error.message;
                    vm.data.isLoading = false;
                });
        }

        function initTableState(tableState) {
            tableState = tableState || {};

            tableState.draw = tableState.draw || 0;

            tableState.pagination = tableState.pagination || {};
            tableState.pagination.numberOfPages = tableState.pagination.numberOfPages || 0;
            tableState.pagination.start = tableState.pagination.start || 0;
            tableState.pagination.number = tableState.pagination.number || 10;

            tableState.sort = tableState.sort || {};
            tableState.sort.predicate = '';
            tableState.sort.reverse = false;

            return tableState;
        }

    }
})();
