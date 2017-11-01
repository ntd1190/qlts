(function () {
    'use strict';

    angular.module('app')
        .controller('HopDongEditCtrl', controller)

    function controller($rootScope, $scope, HopDongService, $window, Upload, utility) {
        var HopDongId = 0;

        var vm = this;


        vm.status = {
            isLoading: false,
        };

        vm.data = {
            UserLoginId: '',
            CoSoId: '',
            PhongBan: {},
            showButtonXoa: false,
            showButtonSave: false,
            listQuyenTacVu: [],
            objHopDong: {},
            isEdit: false,
            listBoPhan: [],
            file: ''
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
            keyPress: keyPress
        };

        vm.validate = {
            SoHopDong: false,
            NgayHopDong: false
        }
        vm.onInitView = onInitView;
        activate();
        function onInitView(ctrlId) {
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                vm.data.CoSoId = ctrlId.userInfo.CoSoId;
                setEnableButton();
            }
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = HopDongId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = HopDongId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function activate() {
            $('#HopDongEditPopup').on('hidden.bs.collapse', function () {
                HopDongId = 0;
                getById(HopDongId);
                $rootScope.isOpenPopup = false;

            });

            $('#HopDongEditPopup').on('shown.bs.collapse', function () {
                //set focus                
                $window.document.getElementById('txtSoHopDong').focus();
                vm.data.objHopDong.NgayHopDong = moment().format('DD/MM/YYYY');
                $rootScope.isOpenPopup = true;
            });

            $scope.$on('HopDongEditCtrl.HopDongId', function (event, data) {
                HopDongId = data;
                refresh();
                setEnableButton();
            });
        }

        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    list.push(array[i][property]);
                }

                result = list.join(',');
            } else result = result || '';

            return result;
        }

        function save() {

            if (vm.data.file && vm.data.file.length > 0) {
                if (!vm.data.objHopDong.FileDinhKem) {
                    vm.data.objHopDong.FileDinhKem = moment().format('YYYYMMDDhhmmssSSS') + '.' + utility.getFileExt(vm.data.file[0].name);
                } else {
                    vm.data.objHopDong.FileDinhKem = vm.data.objHopDong.FileDinhKem.split('.')[0] + '.' + utility.getFileExt(vm.data.file[0].name);
                }
            }

            if (vm.data.objHopDong.HopDongId > 0) {
                edit();
            } else {
                vm.validate.SoHopDong = false;
                vm.validate.NgayHopDong = false;
                add();
            }
        }

        function edit() {
            vm.validate.SoHopDong = utility.checkInValid(vm.data.objHopDong.SoHopDong, 'isEmpty');
            if (vm.status.SoHopDong) {
                $("#txtSoHopDong").focus();
                return;
            }
            vm.validate.NgayHopDong = utility.checkInValid(vm.data.objHopDong.NgayHopDong, 'isEmpty');
            if (vm.validate.NgayHopDong) {
                $("#txtNgayHopDong").focus();
                return;
            }
            

            vm.status.isLoading = true;
            vm.data.objHopDong.CoSoId = vm.data.CoSoId;
            vm.data.objHopDong.NguoiTao = vm.data.UserLoginId;
            var HopDong = utility.clone(vm.data.objHopDong);
            var data = {};
            data.hopDong = angular.toJson(HopDong);
            HopDongService.update(data).then(function (success) {
                if (success.data.data) {
                    vm.data.objHopDong = success.data.data[0];
                    utility.AlertSuccess('Cập nhật thành công!');

                    upload().then(function () {

                    }, function () {
                        utility.AlertSuccess('Không thể upload file.');
                    });

                    $rootScope.$broadcast('sa.qltsmain.HopDong.HopDong.reload');
                }

            }, function (error) {
                vm.status.isLoading = false;
                alert(error.data.error.code + " : " + error.data.error.message);
            });
            vm.status.isLoading = false;
            $('#HopDongEditPopup').collapse('hide');

        }

        function add() {
            vm.validate.SoHopDong = utility.checkInValid(vm.data.objHopDong.SoHopDong, 'isEmpty');
            if (vm.validate.SoHopDong) {
                $("#txtSoHopDong").focus();
                return;
            }
            
            vm.validate.NgayHopDong = utility.checkInValid(vm.data.objHopDong.NgayHopDong, 'isEmpty');
            if (vm.validate.NgayHopDong) {
                $("#txtNgayHopDong").focus();
                return;
            }

            vm.status.isLoading = true;
            vm.data.objHopDong.CoSoId = vm.data.CoSoId;
            vm.data.objHopDong.NguoiTao = vm.data.UserLoginId;
            var HopDong = utility.clone(vm.data.objHopDong);
            var data = {};
            data.hopDong = angular.toJson(HopDong);

            HopDongService.insert(data).then(function (success) {
                if (success.data.data) {
                    HopDongId = success.data.data[0].HopDongIdI;
                    utility.AlertSuccess('Thêm thành công!');

                    upload().then(function () {
                        
                    }, function () {
                        utility.AlertSuccess('Không thể upload file.');
                    });
                }
                vm.status.isLoading = false;
                $('#HopDongEditPopup').collapse('hide');
                $rootScope.$broadcast('sa.qltsmain.HopDong.HopDong.reload');
            }, function (error) {
                if (error.data.error) {
                    alert(error.data.error.code + " : " + error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }

        function refresh() {

            $("#txtSoHopDong").focus();
            getById(HopDongId);
            vm.validate.SoHopDong = false;
            vm.validate.NgayHopDong = false;
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
                if (fromId == 'txtSoHopDong') {
                    vm.validate.SoHopDong = utility.checkInValid(vm.data.objHopDong.SoHopDong, 'isEmpty');
                    if (vm.validate.SoHopDong) {
                        $("#txtSoHopDong").focus();
                    } else $("#" + ToId).focus();
                }
                else if (fromId == 'txtNgayHopDong') {
                    vm.validate.NgayHopDong = utility.checkInValid(vm.data.objHopDong.NgayHopDong, 'isEmpty');
                    if (vm.validate.NgayHopDong) {
                        $("#txtNgayHopDong").focus();
                    } else {
                        $("#" + ToId).find('input').focus();
                    }

                }
                else $("#" + ToId).focus();


            }
        }

        // upload hình
        function upload() {
            return new Promise(function (resolve, reject) {
                vm.status.isUploading = true;
                console.log(vm.data.file);
                if (!vm.data.file || vm.data.file.length === 0) { resolve(); }

                Upload.filesUpload(vm.data.file, vm.data.objHopDong.FileDinhKem).then(function success(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    vm.data.hinh = result.data.data;
                    $('input[type="file"]').val('');
                    resolve();
                }, function error(result) {
                    vm.status.isUploading = false;
                    console.log(result);
                    reject('Upload.filesUpload');
                });
            });
        };

        function close() {
            $('#HopDongEditPopup').collapse('hide');
            $rootScope.isOpenPopup = false;
        }
        function getById(id) {
            if (id > 0) {
                vm.status.isLoading = true;
                HopDongService.getById(id).then(function (success) {
                    if (success.data) {
                        vm.data.objHopDong = success.data.data[0];
                    }
                    vm.status.isLoading = false;
                });
            } else {
                vm.data.objHopDong = {};
                $rootScope.$broadcast('HopDongEditCtrl.action.clearData');
            }
        }

        function validate(hasError) {

            if (!vm.data.objHopDong.SoHopDong || vm.data.objHopDong.SoHopDong == '') {
                hasError = true;
                $("#txtSoHopDong").focus();
                vm.validate.SoHopDong = true;
                return hasError;
            }
            if (!vm.data.objHopDong.NgayHopDong || vm.data.objHopDong.NgayHopDong == '') {
                hasError = true;
                vm.validate.NgayHopDong = true;
                $("#txtNgayHopDong").focus();
                return hasError;
            }

            return hasError;
        }


    }
})();