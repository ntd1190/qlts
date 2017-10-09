(function () {
    'use strict';

    angular.module('app')
        .controller('LapBaoCaoEditCtrl', controller)

    function controller($rootScope, $scope, LapBaoCaoService, $window, utility) {
        var LapBaoCaoId = 0;

        var vm = this;

        vm.status = {
            isLoading: false,
            isInValidTuNgay: false,
            isInValidDenNgay: false
        };

        vm.data = {
            UserLoginId: '',
            CoSoId: '',
            ListDMBaoCao:[],
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objLapBaoCao:{},
            isEdit: false
        };
        //HOT-KEY       
        vm.keys = {
            F8: function (name, code) {
                if ($rootScope.isOpenPopup && vm.data.showButtonSave) {
                    save();
                }
            }
        };
        //HOT-KEY
        vm.action = {
            save: save,
            refresh: refresh,
            close: close,
            keyPress: keyPress,
            GetListDMBaoCao: GetListDMBaoCao
        };


        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                vm.data.CoSoId = ctrlId.userInfo.CoSoId;
                seDenNgayableButton();
            }
        }
        function seDenNgayableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = LapBaoCaoId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = LapBaoCaoId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#LapBaoCaoEditPopup').on('hidden.bs.collapse', function () {
                LapBaoCaoId = 0;
                GetListDMBaoCao();
                $rootScope.isOpenPopup = false;
            });

            $('#LapBaoCaoEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                GetListDMBaoCao();
                $window.document.getElementById('cbxKyLap').focus();
                $rootScope.isOpenPopup = true;
               
            });

            $scope.$on('LapBaoCaoEditCtrl.LapBaoCaoId', function (event, data) {
                LapBaoCaoId = data;
                refresh();
                seDenNgayableButton();
            });
        }

        function save() {
            if (vm.data.objLapBaoCao.LapBaoCaoId > 0) {
                edit();
            } else {
                add();
            }
        }
        function AlertSuccess() {
            var dom = '<div class="top-alert"><div class="alert alert-success alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-ok"></i> Lưu thành công !<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>';
            var jdom = $(dom);
            jdom.hide();
            $("body").append(jdom);
            jdom.fadeIn();
            setTimeout(function () {
                jdom.fadeOut(function () {
                    jdom.remove();
                });
            }, 2000);
          
        }
        function AlertError() {
            var dom = '<div class="top-alert"><div class="alert alert-warning alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-question-sign"></i> Lỗi không thể lưu !<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>';
            var jdom = $(dom);
            jdom.hide();
            $("body").append(jdom);
            jdom.fadeIn();
            setTimeout(function () {
                jdom.fadeOut(function () {
                    jdom.remove();
                });
            }, 2000);
        }
        function edit() {
            vm.status.isInValidTuNgay = utility.checkInValid(vm.data.objLapBaoCao.TuNgay, 'isEmpty');
            if (vm.status.isInValidTuNgay) {
                $("#txtTuNgay").focus();
                return;
            }
            vm.status.isInValidDenNgay = utility.checkInValid(vm.data.objLapBaoCao.DenNgay, 'isEmpty');
            if (vm.status.isInValidDenNgay) {
                $("#txtDenNgay").focus();
                return;
            }
            var ListDMBaoCaoSelected = new Array();

            for (var i = 0; i < vm.data.ListDMBaoCao.length; i++) {
                var LapBaoCao = vm.data.ListDMBaoCao[i];
                if (LapBaoCao.isSelected) {
                    ListDMBaoCaoSelected.push(LapBaoCao);
                }
            }
            vm.data.objLapBaoCao.CoSoId = vm.data.CoSoId;
            var objLapBaoCao = utility.clone(vm.data.objLapBaoCao);
            var data = {};
            data.LapBaoCao = angular.toJson(objLapBaoCao);
            data.BaoCao = angular.toJson(ListDMBaoCaoSelected);
            data.NguoiTao = vm.data.UserLoginId;;
            vm.status.isLoading = true;
            LapBaoCaoService.update(data).then(function (success) {
                if (success.data.data) {
                    vm.data.objLapBaoCao = success.data.data;
                    $rootScope.$broadcast('sa.qltsmain.LapBaoCao.LapBaoCao.reload');
                    AlertSuccess();
                }
               
            }, function (error) {
                AlertError();
            });
             vm.status.isLoading = false;
                $('#LapBaoCaoEditPopup').collapse('hide');
               
        }
        function GetListDMBaoCao() {
            LapBaoCaoService.GetListBaoCao(vm.data.CoSoId, vm.data.UserLoginId).then(function (success) {
                    if (success.data.data) {
                        $('#bgloadding').remove();
                        vm.data.ListDMBaoCao = success.data.data;
                        getById(LapBaoCaoId);
                    }
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
        function add() {
            vm.status.isInValidTuNgay = utility.checkInValid(vm.data.objLapBaoCao.TuNgay, 'isEmpty');
            if (vm.status.isInValidTuNgay) {
                $("#txtTuNgay").focus();
                return; 
            }
            vm.status.isInValidDenNgay = utility.checkInValid(vm.data.objLapBaoCao.DenNgay, 'isEmpty');
            if (vm.status.isInValidDenNgay) {
                $("#txtDenNgay").focus();
                return;
            }
            var ListDMBaoCaoSelected = new Array();

            for (var i = 0; i < vm.data.ListDMBaoCao.length; i++) {
                var LapBaoCao = vm.data.ListDMBaoCao[i];
                if (LapBaoCao.isSelected) {
                    ListDMBaoCaoSelected.push(LapBaoCao);
                }
            }


            vm.data.objLapBaoCao.CoSoId = vm.data.CoSoId;
            var objLapBaoCao = utility.clone(vm.data.objLapBaoCao);
            var data = {};
            data.LapBaoCao = angular.toJson(objLapBaoCao);
            data.BaoCao = angular.toJson(ListDMBaoCaoSelected);
            data.NguoiTao = vm.data.UserLoginId;;
            LapBaoCaoService.insert(data).then(function (success) {
                if (success.data.result) {
                    LapBaoCaoId = success.data.LapBaoCaoId;
                }
                vm.status.isLoading = false;
                $('#LapBaoCaoEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.LapBaoCao.LapBaoCao.reload');
                AlertSuccess();
            }, function (error) {
                if (error.data.error) {
                    AlertError();
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {
              
            $("#cbxKyLap").focus();
            getById(LapBaoCaoId);
            vm.status.isInValidTuNgay = false;
            vm.status.isInValidDenNgay = false;
        }

        function keyboard($document, keyCodes) {
            return {
                link: function (scope, element, attrs) {

                    var keysToHandle = scope.$eval(attrs.keyboard);
                    var keyHandlers = {};

                    // Registers key handlers
                    angular.forEach(keysToHandle, function (callback, keyName) {
                        var keyCode = keyCodes[keyName];
                        keyHandlers[keyCode] = { callback: callback, name: keyName };
                    });

                    // Bind to document keydown event
                    $document.on("keydown", function (event) {

                        var keyDown = keyHandlers[event.keyCode];

                        // Handler is registered
                        if (keyDown) {
                            event.preventDefault();

                            // Invoke the handler and digest
                            scope.$apply(function () {
                                keyDown.callback(keyDown.name, event.keyCode);
                            })
                        }
                    });
                }
            }
        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtTuNgay')
                {
                    vm.status.isInValidTuNgay = utility.checkInValid(vm.data.objLapBaoCao.TuNgay, 'isCode');
                    if (vm.status.isInValidTuNgay) {
                        $("#txtTuNgay").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtDenNgay')
                {
                    vm.status.isInValidDenNgay = utility.checkInValid(vm.data.objLapBaoCao.DenNgay, 'isEmpty');
                    if (vm.status.isInValidDenNgay) {
                        $("#txtDenNgay").focus();
                    } else $("#" + ToId).focus();
                }
                else $("#" + ToId).focus();
                

            }
        }
        function close() {
            $('#LapBaoCaoEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
            vm.status.isInValidTuNgay = false;
            vm.status.isInValidDenNgay = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                LapBaoCaoService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objLapBaoCao = success.data.data[0];
                        getBaoCaoById(id);
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objLapBaoCao = { KyBaoCao: '1', TuNgay: moment().format("01/01/YYYY"), DenNgay: moment().format("31/12/YYYY") };
            }
        }
        function getBaoCaoById(id) {

            LapBaoCaoService.GetPageDetail(id)
                .then(function success(result) {

                    if (result.data && result.data.data && result.data.data.length) {
                        for (var i = 0; i < vm.data.ListDMBaoCao.length; i++) {
                            for (var j = 0; j < result.data.data.length; j++)
                            {
                                if ( vm.data.ListDMBaoCao[i].BaoCaoId == result.data.data[j].BaoCaoId) {
                                    vm.data.ListDMBaoCao[i].isSelected = true;
                                }
                            }
                            console.log(vm.data.ListDMBaoCao);
                        }
                        
                    }
                }, function error(result) {
                    console.log(result);
                });
            
        }
       
     
    }
})();