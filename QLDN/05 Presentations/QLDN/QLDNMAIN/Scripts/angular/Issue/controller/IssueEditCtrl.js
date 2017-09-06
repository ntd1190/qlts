(function () {
    'use strict';

    angular
        .module('app')
        .controller('IssueEditCtrl', IssueEditCtrl)
        .directive("keyboard", keyboard);        //HOT-KEY

    //HOT-KEY
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
                        //scope.$apply(function () {
                        //    keyDown.callback(keyDown.name, event.keyCode);
                        //})
                    }
                });
            }
        }
    };
    //end HOT-KEY
    function IssueEditCtrl($rootScope, $scope, IssueService, utility, $window, $filter) {
        var controllerId = 'IssueEditCtrl';
        var IssueId = 0;
        var vm = this;
        vm.data = {
            objIssue: {
                NgayTao: $filter('date')(new Date(), 'dd/MM/yyyy HH:mm'),
                LoaiIssue: '1',
                MaTrangThai: '1',
            },
            error: {},
            listQuyenTacVu: [],
            listKhachHang: [],
            listKhachHangbyDiDong: [],
            listNhanVien: [],
            UserLoginId: '',
            Name: '',
            showButtonXoa: false,
            showButtonSave: false,
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
        vm.status = {
            isLoadingList: false,
            isLoadingEdit: false,
            isInValidNgayTao: false,
            isInValidKhachHang: false,
            isInValidNguoiLienHe: false,
            isInValidTieuDe: false,
            isInValidDiDong: false
        };
        vm.action = {
            save: save,
            refresh: refresh,
            keyPress: keyPress,
            closeEdit: closeEdit,
            clearListKhachHang: clearListKhachHang,
            clearListNhanVien: clearListNhanVien,
            SearchDiDong: SearchDiDong,
            apDung: apDung
        };
        vm.onInitView = onInitView;
        activate();
        function activate() {
            $('#popupThongTinIssue').on('hidden.bs.collapse', function () {
                $rootScope.isOpenPopup = false;
            });
            $('#popupThongTinIssue').on('shown.bs.collapse', function () {
                $("#txtDiDong").focus();
                $rootScope.isOpenPopup = true;
            });
            initEventListener();
        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
            if (ctrlId && ctrlId.userInfo) {
                vm.data.listQuyenTacVu = ctrlId.userInfo.DsQuyenTacVu.split(',');
                vm.data.UserLoginId = ctrlId.userInfo.NhanVienId;
                vm.data.Name = ctrlId.userInfo.Name;
                vm.data.listNhanVien.push({ NhanVienId: vm.data.UserLoginId, Ho: '', Ten: vm.data.Name });
                setEnableButton();
            }
        }
        function setEnableButton() {
            vm.data.showButtonXoa = false;
            vm.data.showButtonSave = false;
            if (vm.data.listQuyenTacVu.length > 0) {

                // Co quyen them moi
                if (vm.data.listQuyenTacVu.indexOf("N") > 0) {
                    vm.data.showButtonSave = IssueId == 0 ? true : vm.data.showButtonSave;
                }

                // Co quyen Xoa
                if (vm.data.listQuyenTacVu.indexOf("D") > 0) {
                    vm.data.showButtonXoa = true;
                }

                // Co quyen Sua
                if (vm.data.listQuyenTacVu.indexOf("M") > 0) {
                    vm.data.showButtonSave = IssueId > 0 ? true : vm.data.showButtonSave;
                }
            }
        }
        function initEventListener() {
            $scope.$on('IssueListCtrl.action.xemIssue', function (event, data) {
                IssueId = data;
                refresh();
                $("#txtDiDong").focus();
            });
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
                GetLichSuIssue(data[0].KhachHangId);
            });
            $scope.$on(controllerId + '.data.listNguoiXuLyEdit', function (event, data) {
                vm.data.listNhanVien = data;
            });
        }
        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }
        function clearListNhanVien() {
            utility.clearArray(vm.data.listNhanVien);
        }
        function refresh() {
            setEnableButton();
            if (IssueId > 0) {
                IssueService.getById(IssueId).then(function (result) {
                    if (result.data.data.length > 0) {
                        vm.data.listKhachHang = [];
                        vm.data.listNhanVien = [];
                        vm.data.objIssue = result.data.data[0];
                        vm.data.objIssue.LoaiIssue = result.data.data[0].LoaiIssue == 1 ? '1' : result.data.data[0].LoaiIssue == 2 ? '2' : '3';
                        vm.data.objIssue.MaTrangThai = result.data.data[0].MaTrangThai == 1 ? '1' : result.data.data[0].MaTrangThai == 2 ? '2' : result.data.data[0].MaTrangThai == 3 ? '3' : result.data.data[0].MaTrangThai == 4 ? '4' : '5';
                        if (result.data.data[0].KhachHangId != null) vm.data.listKhachHang.push({ KhachHangId: result.data.data[0].KhachHangId, TEN: result.data.data[0].KhachHang });
                        if (result.data.data[0].NguoiXuLy > 0) vm.data.listNhanVien.push({ NhanVienId: result.data.data[0].NguoiXuLy, Ho: result.data.data[0].Ho, Ten: result.data.data[0].Ten });
                        vm.data.objIssue.NgayTao = utility.convertDateFormat(vm.data.objIssue.NgayTao, 'YYYY-MM-DDTHH:mm', 'DD/MM/YYYY HH:mm')
                        vm.data.objIssue.NgayDeNghi = utility.convertDateFormat(vm.data.objIssue.NgayDeNghi, 'YYYY-MM-DDTHH:mm', 'DD/MM/YYYY HH:mm')
                        GetLichSuIssue(result.data.data[0].KhachHangId);
                        $('#popupThongTinIssue').collapse('show');
                    }
                    else $rootScope.$broadcast('IssueListCtrl.action.refresh');
                })
            } else {
                vm.data.listKhachHang = [];
                vm.data.listNhanVien = [];
                vm.data.listNhanVien.push({ NhanVienId: vm.data.UserLoginId, Ho: '', Ten: vm.data.Name });
                vm.status.isInValidNgayTao = false;
                vm.status.isInValidKhachHang = false;
                vm.status.isInValidNguoiLienHe = false;
                vm.status.isInValidTieuDe = false;
                vm.status.isInValidDiDong = false;
                vm.data.objIssue = {
                    NgayTao: $filter('date')(new Date(), 'dd/MM/yyyy HH:mm'),
                    LoaiIssue: '1',
                    MaTrangThai: '1',
                };
            }
        }
        function insert() {

            vm.status.isInValidNgayTao = utility.checkInValid(vm.data.objIssue.NgayTao, 'isEmpty');
            if (vm.status.isInValidNgayTao) {
                $window.document.getElementById('txtNgayTao').focus();
                return;
            }
            vm.status.isInValidKhachHang = utility.checkInValid(vm.data.listKhachHang.length > 0 ? vm.data.listKhachHang[0].KhachHangId : '', 'isEmpty');
            if (vm.status.isInValidKhachHang) {
                $window.document.getElementById('popKhachHang').focus();
                return;
            }
            vm.status.isInValidNguoiLienHe = utility.checkInValid(vm.data.objIssue.NguoiLienHe, 'isEmpty');
            if (vm.status.isInValidNguoiLienHe) {
                $window.document.getElementById('txtNguoiLienHe').focus();
                return;
            }
            vm.status.isInValidDiDong = utility.checkInValid(vm.data.objIssue.DiDong, 'isEmpty');
            if (vm.status.isInValidDiDong) {
                $window.document.getElementById('txtDiDong').focus();
                return;
            }

            vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objIssue.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $window.document.getElementById('txtTieuDe').focus();
                return;
            }
            vm.data.objIssue.NguoiTao = vm.data.UserLoginId;
            vm.data.objIssue.KhachHangId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            vm.data.objIssue.NguoiXuLy = joinStr(vm.data.listNhanVien, 'NhanVienId');
            IssueService.insert(vm.data.objIssue).then(function (success) {
                if (success.data.result) {
                    IssueId = success.data.IssueId;
                }
                vm.status.isLoading = false;
                $rootScope.isOpenPopup = false;
                closeEdit();
                $rootScope.$broadcast('IssueListCtrl.action.refresh');
            }, function (error) {
                console.log(error)
                if (error.data.error) {
                    alert(error.data.error.message);
                }
                vm.status.isLoading = false;
            });
        }
        function joinStr(array, property) {
            var result = '';

            var list = new Array();
            for (var i = 0; i < array.length; i++) {
                list.push(array[i][property]);
            }

            result = list.join('|');
            result = result || '';

            return result;
        }
        function update() {
            debugger
            vm.status.isInValidNgayTao = utility.checkInValid(vm.data.objIssue.NgayTao, 'isEmpty');
            if (vm.status.isInValidNgayTao) {
                $window.document.getElementById('txtNgayTao').focus();
                return;
            }
            vm.status.isInValidKhachHang = utility.checkInValid(vm.data.listKhachHang.length > 0 ? vm.data.listKhachHang[0].KhachHangId : '', 'isEmpty');
            if (vm.status.isInValidKhachHang) {
                $window.document.getElementById('popKhachHang').focus();
                return;
            }
            vm.status.isInValidNguoiLienHe = utility.checkInValid(vm.data.objIssue.NguoiLienHe, 'isEmpty');
            if (vm.status.isInValidNguoiLienHe) {
                $window.document.getElementById('txtNguoiLienHe').focus();
                return;
            }
            vm.status.isInValidDiDong = utility.checkInValid(vm.data.objIssue.DiDong, 'isEmpty');
            if (vm.status.isInValidDiDong) {
                $window.document.getElementById('txtDiDong').focus();
                return;
            }

            vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objIssue.TieuDe, 'isEmpty');
            if (vm.status.isInValidTieuDe) {
                $window.document.getElementById('txtTieuDe').focus();
                return;
            }
            vm.data.objIssue.NguoiTao = vm.data.UserLoginId;
            vm.data.objIssue.KhachHangId = joinStr(vm.data.listKhachHang, 'KhachHangId');
            vm.data.objIssue.NguoiXuLy = joinStr(vm.data.listNhanVien, 'NhanVienId');
            vm.data.objIssue.NgayTao = utility.convertDateFormat(vm.data.objIssue.NgayTao, 'DD/MM/YYYY HH:mm', 'YYYY-MM-DDTHH:mm');
            vm.data.objIssue.NgayDeNghi = utility.convertDateFormat(vm.data.objIssue.NgayDeNghi, 'DD/MM/YYYY HH:mm', 'YYYY-MM-DDTHH:mm');
            IssueService.update(vm.data.objIssue).then(function (success) {
                vm.data.objIssue = success.data.data;
                closeEdit();
                $rootScope.isOpenPopup = false;
                vm.status.isLoading = true;
                $rootScope.$broadcast('IssueListCtrl.action.refresh');
            }, function (error) {
                vm.status.isLoading = false;
            });

        }
        function keyPress(value, fromId, ToId, event) {
            //check Enter key is press
            if (event.keyCode == '13') {
                //set condition of has-error
                if (fromId == 'txtNgayTao') {
                    vm.status.isInValidNgayTao = utility.checkInValid(vm.data.objIssue.NgayTao, 'isEmpty');
                    if (!vm.status.isInValidNgayTao) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'popKhachHang') {
                    vm.status.isInValidKhachHang = utility.checkInValid(vm.data.listKhachHang.KhachHangId, 'isEmpty');
                    if (!vm.status.isInValidKhachHang) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtNguoiLienHe') {
                    vm.status.isInValidNguoiLienHe = utility.checkInValid(vm.data.objIssue.NguoiLienHe, 'isEmpty');
                    if (!vm.status.isInValidNguoiLienHe) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtDiDong') {
                    vm.status.isInValidDiDong = utility.checkInValid(vm.data.objIssue.DiDong, 'isEmpty');
                    if (!vm.status.isInValidDiDong) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else if (fromId == 'txtTieuDe') {
                    vm.status.isInValidTieuDe = utility.checkInValid(vm.data.objIssue.TieuDe, 'isEmpty');
                    if (!vm.status.isInValidTieuDe) {
                        $window.document.getElementById(ToId).focus();
                    }
                } else {
                    $window.document.getElementById(ToId).focus();
                }
            }
        }
        function resetEdit(id) {
            vm.status.isInValidNgayTao = false;
            vm.status.isInValidKhachHang = false;
            vm.status.isInValidNguoiLienHe = false;
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidDiDong = false;
            refresh();
        };
        function closeEdit() {
            vm.data.listKhachHang = [];
            vm.data.listNhanVien = [];
            vm.data.listNhanVien.push({ NhanVienId: vm.data.UserLoginId, Ho: '', Ten: vm.data.Name });
            vm.status.isInValidNgayTao = false;
            vm.status.isInValidKhachHang = false;
            vm.status.isInValidNguoiLienHe = false;
            vm.status.isInValidTieuDe = false;
            vm.status.isInValidDiDong = false;
            vm.data.objIssue = {
                NgayTao: $filter('date')(new Date(), 'dd/MM/yyyy HH:mm'),
                LoaiIssue: '1',
                MaTrangThai: '1',
            };
            IssueId = 0;
            $('#listLichSu').html('');
            $('#popupThongTinIssue').collapse('hide');
            
        }
        function save() {
            if (IssueId > 0) {
                update();
            } else {
                insert();
            }
        }
        function SearchDiDong() {
            vm.data.isLoading = true;
            var draw = 1;
            var start = 0;
            var number = 10;
            var sortName = 'a.NgayTao';
            var sortDir = 'desc';
            var searchString = vm.data.objIssue.DiDong;
            var fields = 'A.Ma,A.Ten,A.DiDong,A.DienThoai,A.Email';
            IssueService.getPageKhachHang(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    vm.data.listKhachHangbyDiDong = success.data.data;
                    if (vm.data.listKhachHangbyDiDong.length > 0)
                    { $('#KhachHangListByDiDong').collapse('show'); }
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;

            });

        }
        function apDung() {
            var selectedListKhachHang = new Array();
            for (var i = 0; i < vm.data.listKhachHangbyDiDong.length; i++) {
                if (vm.data.listKhachHangbyDiDong[i].isSelected) {
                    var item = vm.data.listKhachHangbyDiDong[i];
                    vm.data.listKhachHang = [{ MA: item.Ma, TEN: item.Ten, KhachHangId: item.KhachHangId }];
                    vm.data.objIssue.DienThoai = item.DienThoai;
                    vm.data.objIssue.Email = item.Email;
                    GetLichSuIssue(item.KhachHangId);
                }
            }
            $('#KhachHangListByDiDong').collapse('hide');
        }
        function GetLichSuIssue(KhachHangId) {
            vm.data.isLoading = true;
            var draw = 1;
            var start = 0;
            var number = 10;
            var sortName = 'a.IssueId';
            var sortDir = 'desc';
            var searchString = KhachHangId;
            var fields = '';
            IssueService.getPageLichSu(draw, start, number, searchString, sortName, sortDir, fields).then(function (success) {
                if (success.data.data) {
                    var listLichSuIssue = success.data.data;
                    var appen = "";
                    for (var i = 0; i < listLichSuIssue.length; i++) {
                        var item = listLichSuIssue[i];
                        appen = appen + "<li class='parent_li'>";
                        appen = appen + "<span class='badge badge-success' title='Collapse'><i class='fa fa-plus-circle'></i>&nbsp;";
                        appen = appen  + item.NgayTao + "-" + item.TieuDe ;
                        appen = appen + "</span>";
                        appen = appen + "<ul>";
                        appen = appen + "<li style='display: none;'>";
                        appen = appen + "<p class='badge' style='font-weight:unset!important'>" + "<i>Người lhệ:</i> " + item.NguoiLienHe + "</p>";
                        appen = appen + "</li>";
                        appen = appen + "<li style='display: none;'>";
                        appen = appen + "<p class='badge' style='font-weight:unset!important'>" + "<i>Di động:</i> " + item.DiDong + "</p>";
                        appen = appen + "</li>";
                        appen = appen + "<li style='display: none;'>";
                        appen = appen + "<p class='badge' style='font-weight:unset!important'>" + "<i>Người xlý:</i> " + item.NguoiXuLy + "</p>";
                        appen = appen + "</li>";
                        appen = appen + "<li style='display: none;'>";
                        appen = appen + "<p class='badge' style='font-weight:unset!important'>" + "<i>Mô tả:</i> " + item.MoTa + "</p>";
                        appen = appen + "</li>";
                        appen = appen + "<li style='display: none;'>";
                        appen = appen + "<p class='badge' style='font-weight:unset!important'>" + "<i>Trạng thái:</i> " + item.MaTrangThai + "</p>";
                        appen = appen + "</li>";
                        appen = appen + "</ul>";
                        appen = appen + "</li>";
                    }
                    $('#listLichSu').html(appen);
                    treeview();
                }
                vm.data.isLoading = false;
            }, function (error) {
                vm.data.isLoading = false;
            });
        }
        function treeview() {
            $(function () {
                $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse');
                $('.tree li.parent_li > span').on('click', function (e) {
                    var children = $(this).parent('li.parent_li').find(' > ul > li');
                    if (children.is(":visible")) {
                        children.hide('fast');
                        $(this).attr('title', 'Expand').find(' > i').addClass('fa-plus-circle').removeClass('fa-minus-circle');
                    } else {
                        children.show('fast');
                        $(this).attr('title', 'Collapse').find(' > i').addClass('fa-minus-circle').removeClass('fa-plus-circle');
                    }
                    e.stopPropagation();
                });
            });
        }
    }
})();
