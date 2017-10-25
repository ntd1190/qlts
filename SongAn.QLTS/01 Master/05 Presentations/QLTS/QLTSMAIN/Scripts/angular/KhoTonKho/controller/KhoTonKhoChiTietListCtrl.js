(function () {
    'use strict';

    angular.module("app")
        .controller("KhoTonKhoChiTietListCtrl", controller)

    function controller($rootScope, $scope, KhoTonKhoService, $window, utility, $timeout) {
        var vm = this;
        //HOT-KEY       
        vm.keys = {
            //press ESC -> close popup
            ESC: function (name, code) {
                //alert("ESC");
                console.log('ESC');
                var index_highest = 0;
                var ele_highest;
                var ele_focus;
                var ele_current;
                // more effective to have a class for the div you want to search and 
                // pass that to your selector
                $('.panel.ui-draggable.fade.in').each(function () {
                    // always use a radix when using parseInt
                    var index_current = parseInt($(this).css("zIndex"), 10);
                    ele_current = $(this);
                    if (index_current > index_highest) {
                        index_highest = index_current;
                        ele_focus = ele_highest;
                        ele_highest = ele_current;
                    }
                });
                if (ele_highest) {
                    $(ele_highest).collapse('hide');
                    $(ele_focus).find('input[autofocus]').focus();
                }
            },
            //press F2 -> open popup
            F2: function (name, code) {
                if (vm.data.showButtonNew) {
                    add();
                }
            },

            //press F3 -> run Quick search
            F3: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    $("#txtsearch").focus();
                    getPageDetail();
                }
            },

            //press F8 -> search
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save();
                }
            }
        };
        //end HOT-KEY
        var _tableState = {};
        var KhoTonKhoId = 0;
        var KhoTaiSanId = 0;
        var ThangNam = 0;
        var KhoTonKhoChiTietId = 0;
        vm.data = {
            userInfo: {},
            showButtonNew: false,
            showButtonXoaChon: false,
            showButtonSave:false,
            listQuyenTacVu: [],
            KhoTonKhoList: [],
            KhoTonKhoListDisplay: [],
            KhoTonKhoSelected: [],
            isLoading: false,
            searchString: '',
            TenTaiSan: '',
            ThangNam: '',
            objKhoTonKho: {},
            UserLoginId: '',
            CoSoId: '',
        };

        vm.action = {
            edit: edit,
            add: add,
            getPageDetail: getPageDetail,
            deleteSelected: deleteSelected,
            keyPress: keyPress,
            getDataTaiSan: getDataTaiSan,
            save: save

        };
        vm.status = {
            isLoading: false,
            isInValidMaTaiSan: false,
            isInValidTenTaiSan: false,
            isInValidNguonNganSach: false,
            isInValidSoLuong: false,
            isInValidDonGia: false,
        };
        activate();
        vm.onInitView = onInitView;
        function activate() {
            eventAutoReload();
        }
        function onInitView(config) {
            if (config && config.userInfo) {
                vm.data.listQuyenTacVu = config.userInfo.DsQuyenTacVu.split(',');
                vm.data.userInfo = config.userInfo;
                vm.data.UserLoginId = config.userInfo.NhanVienId;
                vm.data.CoSoId = config.userInfo.CoSoId;
                setEnableButton();
            }
            if (config && config.Kho) {
                ThangNam = config.Kho.split('-')[0];
                KhoTaiSanId = config.Kho.split('-')[1];
                KhoTonKhoService.gettaisanById(KhoTaiSanId).then(function (success) {
                    if (success.data) {
                        vm.data.TenTaiSan = success.data.data.TenKhoTaiSan;
                    }
                });
                vm.data.ThangNam = 'Tháng ' + ThangNam.substring(0, 2) + ' năm 20' + ThangNam.substring(4, 2);
            }
        }
        function setEnableButton() {
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonNew = true;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoaChon = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = true;
                }

            }
        }
        function eventAutoReload() {
            $scope.$on('sa.qltsmain.KhoTonKho.KhoTonKho.reload', function (event) {
                getPageDetail(_tableState);
            });
        }

        function deleteSelected() {
            if (!confirm('Bạn có muốn xóa các mục đã chọn không?')) { return; }

            vm.data.isLoading = true;

            var KhoTonKhoSelected = new Array();

            for (var i = 0; i < vm.data.KhoTonKhoListDisplay.length; i++) {
                var KhoTonKho = vm.data.KhoTonKhoListDisplay[i];
                if (KhoTonKho.isSelected) {
                    KhoTonKhoSelected.push(KhoTonKho.KhoTonKhoId);
                }
            }
            var ids = KhoTonKhoSelected.join(',');

            KhoTonKhoService.removeList(ids).then(function (success) {
                vm.data.isLoading = false;
                _tableState.pagination.start = 0;
                getPageDetail(_tableState);
                alert('Xóa thành công!')
            }, function (error) {
                vm.data.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });

        }
        function addloadding(obj) {
            $(obj).append('<div id="bgloadding"><div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div></div>');
        }
        function removeloadding(obj) {
            $('#bgloadding').remove();
        }
        function getPageDetail(tableState) {
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
            addloadding($('body'));
            tableState.draw = tableState.draw + 1 || 1;
            var draw = tableState.draw;
            var start = tableState.pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
            var number = tableState.pagination.number || 10;  // Number of entries showed per page.
            var sortName = tableState.sort.predicate || 'KhoTonKhoId';
            var sortDir = tableState.sort.reverse ? 'desc' : 'asc';
            var searchString = vm.data.searchString;
            var CoSoId = vm.data.userInfo.CoSoId;
            var NhanVienId = vm.data.userInfo.NhanVienId;

            KhoTonKhoService.getPageDetail(draw, start, number, searchString, sortName, sortDir, CoSoId, NhanVienId, KhoTaiSanId, ThangNam, KhoTonKhoId).then(function (success) {
                if (success.data.data.length>0) {
                    vm.data.KhoTonKhoListDisplay = success.data.data;
                    KhoTonKhoId = vm.data.KhoTonKhoListDisplay[0].KhoTonKhoId || 0;
                    tableState.pagination.numberOfPages = Math.ceil(success.data.metaData.total / number);
                }
                $('#bgloadding').remove();
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
                if (error.data.error != null) {
                    alert(error.data.error.message);
                } else {
                    alert(error.data.Message);
                }
                $('#bgloadding').remove();
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

        function add() {
            delete vm.data.objKhoTonKho; vm.data.objKhoTonKho = { NhaCungCapId: 0, NguonNganSachId: 0 };
            KhoTonKhoChiTietId = 0;
            console.log(vm.data.objKhoTonKho);
            $('#KhoTonKhoEditPopup').collapse('show');
            $("#txtMaTaiSan").focus();
            $rootScope.isOpenPopup = true;
        }

        function edit(id) {
            $('#KhoTonKhoEditPopup').collapse('show');
            $("#txtMaTaiSan").focus();
            KhoTonKhoChiTietId = id;
            $rootScope.isOpenPopup = true;
        }

        function clearArray(array) {
            while (array.length) { array.pop(); }
        }
        // pop
        function save() {
            if (KhoTonKhoChiTietId > 0) {
                editChiTiet();
            } else {
                addChiTiet();
            }
        }
        function editChiTiet() {
            vm.status.isInValidMaTaiSan = utility.checkInValid(vm.data.objKhoTonKho.MaTaiSan, 'isCode');
            if (vm.status.isInValidMaTaiSan) {
                $("#txtMaTaiSan").focus();
                return;
            }
            vm.status.isInValidTenTaiSan = utility.checkInValid(vm.data.objKhoTonKho.TaiSanId, 'isEmpty');
            if (vm.status.isInValidTenTaiSan) {
                $("#txtTenTaiSan").find('input').focus();
                return;
            }
            vm.status.isInValidNguonNganSach = utility.checkInValid(vm.data.objKhoTonKho.NguonNganSachId, 'isEmpty');
            if (vm.status.isInValidNguonNganSach) {
                $("#cbxNguonNganSach").focus();
                return;
            }
            vm.status.isInValidSoLuong = utility.checkInValid(vm.data.objKhoTonKho.TonDau, 'isEmpty');
            if (vm.status.isInValidSoLuong) {
                $("#txtSoLuong").focus();
                return;
            }
            vm.status.isInValidDonGia = utility.checkInValid(vm.data.objKhoTonKho.DonGia, 'isEmpty');
            if (vm.status.isInValidDonGia) {
                $("#txtDonGia").focus();
                return;
            }
            vm.data.objKhoTonKho.NgungTheoDoi = vm.data.objKhoTonKho.NgungTheoDoi ? 1 : 0;
            vm.status.isLoading = true;
            KhoTonKhoService.update(vm.data.objKhoTonKho).then(function (success) {
                if (success.data.data) {
                    vm.data.objKhoTonKho = success.data.data;
                    $rootScope.$broadcast('sa.qltsmain.KhoTonKho.KhoTonKho.reload');
                }

            }, function (error) {
                vm.status.isLoading = false;
            });
            vm.status.isLoading = false;
            $('#KhoTonKhoEditPopup').collapse('hide');

        }
        function addChiTiet() {
            vm.status.isInValidMaTaiSan = utility.checkInValid(vm.data.objKhoTonKho.MaTaiSan, 'isCode');
            if (vm.status.isInValidMaTaiSan) {
                $("#txtMaTaiSan").focus();
                return;
            }
            vm.status.isInValidTenTaiSan = utility.checkInValid(vm.data.objKhoTonKho.TaiSanId, 'isEmpty');
            if (vm.status.isInValidTenTaiSan) {
                $("#txtTenTaiSan").focus();
                return;
            }
            vm.status.isInValidNguonNganSach = utility.checkInValid(vm.data.objKhoTonKho.NguonNganSachId, 'isEmpty');
            if (vm.status.isInValidNguonNganSach) {
                $("#cbxNguonNganSach").focus();
                return;
            }
            vm.status.isInValidSoLuong = utility.checkInValid(vm.data.objKhoTonKho.TonDau, 'isEmpty');
            if (vm.status.isInValidSoLuong) {
                $("#txtSoLuong").focus();
                return;
            }
            vm.status.isInValidDonGia = utility.checkInValid(vm.data.objKhoTonKho.DonGia, 'isEmpty');
            if (vm.status.isInValidDonGia) {
                $("#txtDonGia").focus();
                return;
            }
            vm.status.isLoading = true;
            vm.data.objKhoTonKho.CoSoId = vm.data.CoSoId;
            vm.data.objKhoTonKho.NguoiTao = vm.data.UserLoginId;
            vm.data.objKhoTonKho.NgungTheoDoi = vm.data.objKhoTonKho.NgungTheoDoi ? 1 : 0;
            vm.data.objKhoTonKho.KhoTonKhoId = KhoTonKhoId;
            vm.data.objKhoTonKho.KhoTaiSanId = KhoTaiSanId;
            vm.data.objKhoTonKho.ThangNam = ThangNam;
            var objKhoTonKho = utility.clone(vm.data.objKhoTonKho);
            var data = {};
            data.KhoTonKho = angular.toJson(objKhoTonKho);
            KhoTonKhoService.insert(data).then(function (success) {
                if (success.data.result) {
                    KhoTonKhoId = success.data.KhoTonKhoId;
                }
                vm.status.isLoading = false;
                $('#KhoTonKhoEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.KhoTonKho.KhoTonKho.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }
        function keyPress(value, fromId, ToId, event) {


            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtMaTaiSan') {
                    vm.status.isInValidMaTaiSan = utility.checkInValid(vm.data.objKhoTonKho.MaTaiSan, 'isCode');
                    if (vm.status.isInValidMaTaiSan) {
                        $("#txtMaTaiSan").focus();
                    } else {
                        vm.data.objKhoTonKho.TempMaTaiSan = value;
                        $timeout(function () {
                            if (vm.data.objKhoTonKho.TaiSanId > 0) {
                                $("#" + ToId).find('input').focus();
                            }
                        }, 100);
                    }
                }
                else if (fromId == 'txtTenTaiSan') {
                    vm.status.isInValidTenTaiSan = utility.checkInValid(vm.data.objKhoTonKho.TaiSanId, 'isEmpty');
                    if (vm.status.isInValidTenTaiSan) {
                        $("#txtTenTaiSan").focus();
                    } else $("#" + ToId).find('input').focus();
                }
                else if (fromId == 'cbxNguonNganSach') {
                    vm.status.isInValidNguonNganSach = utility.checkInValid(vm.data.objKhoTonKho.NguonNganSachId, 'isEmpty');
                    if (vm.status.isInValidNguonNganSach) {
                        $("#cbxNguonNganSach").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtSoLuong') {
                    vm.status.isInValidSoLuong = utility.checkInValid(vm.data.objKhoTonKho.SoLuong, 'isEmpty');
                    if (vm.status.isInValidSoLuong) {
                        $("#txtSoLuong").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtDonGia') {
                    vm.status.isInValidDonGia = utility.checkInValid(vm.data.objKhoTonKho.DonGia, 'isEmpty');
                    if (vm.status.isInValidDonGia) {
                        $("#txtDonGia").focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();


            }
        }
        function getDataTaiSan(data) {
            console.log(data);

            vm.data.objKhoTonKho.TaiSanId = data.TaiSanId;
            vm.data.objKhoTonKho.MaTaiSan = data.MaTaiSan;
        }
    }
})();