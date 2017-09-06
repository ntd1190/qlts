(function () {
    'use strict';

    angular
        .module('app')
        .controller('IssueFilterCtrl', IssueFilterCtrl)
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
                        scope.$apply(function () {
                            keyDown.callback(keyDown.name, event.keyCode);
                        })
                    }
                });
            }
        }
    };

    function IssueFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'IssueFilterCtrl';

        var vm = this;
        //HOT-KEY       
        vm.keys = {
            //press F8 -> search
            F8: function (name, code) {
                if (!$rootScope.isOpenPopup) {
                    search();
                }
            }
        };
        //end HOT-KEY
        vm.title = 'IssueFilterCtrl';

        vm.data = {
            listKhachHang: [],
            listNguoiXuLy: [],
            listNguoiTao: [],
            listPhongBan: [],
            trangThai: {
                tatCa: true,
                batDau: false,
                dangxuLy: false,
                daxuLy: false,
                chuaxuLy: false,
                ketThuc: false,
            },
            Loai: {
                tatCa: true,
                phamMem: false,
                nguoiDung: false,
                Khac: false,
            },

            searchString: ''
        };

        vm.action = {
            clearListKhachHang: clearListKhachHang,
            ClearlistNguoiXuLy: ClearlistNguoiXuLy,
            ClearlistNguoiTao: ClearlistNguoiTao,
            ClearlistPhongBan: ClearlistPhongBan,
            checkLoai: checkLoai,
            checkLoaiTatCa: checkLoaiTatCa,
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            $('#tungay').val(moment().format("DD/MM/YYYY"));
            $('#denngay').val(moment().format("DD/MM/YYYY"));
            console.log(moment().format("dd/MM/YYYY"))
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.listKhachHang = [];
            vm.data.listNguoiXuLy = [];
            vm.data.listNguoiTao = [];
            vm.data.listPhongBan = [];
            vm.data.searchString = '';
            
            $('#tungay').val(moment().format("DD/MM/YYYY"));
            $('#denngay').val(moment().format("DD/MM/YYYY"));
            $('#tungayketthuc').val('');
            $('#denngayketthuc').val('');
            checkTrangThaiTatCa(true);
            checkLoaiTatCa(true);
        }
        function checkLoaiTatCa(status) {
            if (status) {
                vm.data.Loai.tatCa = true;
            }

            if (vm.data.Loai.tatCa == true) {
                vm.data.Loai.phamMem = false;
                vm.data.Loai.nguoiDung = false;
                vm.data.Loai.Khac = false;
            }
            else {
                vm.data.Loai.phamMem = true;
            }
        }
        function checkLoai() {

            if (vm.data.Loai.phamMem != true
                && vm.data.Loai.nguoiDung != true
                && vm.data.Loai.Khac != true) {

                vm.data.Loai.tatCa = true;
            }
            else {
                vm.data.Loai.tatCa = false;
            }
        }
        function checkTrangThaiTatCa(status) {
            vm.data.listTrangThai = [];

            if (status) {
                vm.data.trangThai.tatCa = true;
            }

            if (vm.data.trangThai.tatCa == true) {
                vm.data.trangThai.batDau = false;
                vm.data.trangThai.dangxuLy = false;
                vm.data.trangThai.daxuLy = false;
                vm.data.trangThai.chuaxuLy = false;
                vm.data.trangThai.ketThuc = false;
            }
            else {
                vm.data.trangThai.batDau = true;
            }
        }

        function checkTrangThai() {

            if (vm.data.trangThai.batDau != true
                && vm.data.trangThai.dangxuLy != true
                && vm.data.trangThai.daxuLy != true
                && vm.data.trangThai.chuaxuLy != true
                && vm.data.trangThai.ketThuc != true) {

                vm.data.trangThai.tatCa = true;
            }
            else {
                vm.data.trangThai.tatCa = false;
            }
        }

        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            /////////
            var dateendfrom = $('#tungayketthuc').datetimepicker('getValue');
            var dateendto = $('#denngayketthuc').datetimepicker('getValue');
            if (dateendfrom != null && dateendto != null) if (dateendto < dateendfrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            //////////
            var loai = "";
            if (vm.data.Loai.phamMem) loai = loai + "1,";
            if (vm.data.Loai.nguoiDung) loai = loai + "2,";
            if (vm.data.Loai.Khac) loai = loai + "3,";
            //////////
            var tinhtrang = "";
            if (vm.data.trangThai.batDau) tinhtrang = tinhtrang + "1,";
            if (vm.data.trangThai.dangxuLy) tinhtrang = tinhtrang + "2,";
            if (vm.data.trangThai.daxuLy) tinhtrang = tinhtrang + "3,";
            if (vm.data.trangThai.chuaxuLy) tinhtrang = tinhtrang + "4,";
            if (vm.data.trangThai.ketThuc) tinhtrang = tinhtrang + "5,";
            ////////////
            var KhachHangId = joinStr(vm.data.listKhachHang, "KhachHangId");
            var NguoiXuLyId = joinStr(vm.data.listNguoiXuLy, "NhanVienId");
            var NguoiTaoId = joinStr(vm.data.listNguoiTao, "NhanVienId");
            var PhongBanId = joinStr(vm.data.listPhongban, "PhongBanId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + KhachHangId + '|' + loai + '|' + $('#tungayketthuc').val() + '|' + $('#denngayketthuc').val() + '|' + NguoiXuLyId + '|' + NguoiTaoId + '|' + tinhtrang + '|' + PhongBanId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListKhachHang() {
            utility.clearArray(vm.data.listKhachHang);
        }
        function ClearlistNguoiXuLy() {
            utility.clearArray(vm.data.listNguoiXuLy);
        }
        function ClearlistNguoiTao() {
            utility.clearArray(vm.data.listNguoiTao);
        }
        function ClearlistPhongBan() {
            utility.clearArray(vm.data.listPhongban);
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
        function initEventListener() {
            $scope.$on(controllerId + '.data.listKhachHang', function (event, data) {
                vm.data.listKhachHang = data;
            });
            $scope.$on(controllerId + '.data.listNguoiXuLySearch', function (event, data) {
                vm.data.listNguoiXuLy = data;
            });
            $scope.$on(controllerId + '.data.listNguoiTaoSearch', function (event, data) {
                vm.data.listNguoiTao = data;
            });
            $scope.$on(controllerId + '.data.listPhongBanListPopupSearch', function (event, data) {
                vm.data.listPhongban = data;
            });

        }
    }
})();
