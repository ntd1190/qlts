(function () {
    'use strict';

    angular
        .module('app')
        .controller('CongViecFilterCtrl', CongViecFilterCtrl)
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

    function CongViecFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'CongViecFilterCtrl';

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
        vm.title = 'CongViecFilterCtrl';

        vm.data = {
            listDuAn: [],
            listNguoiXuLy: [],
            listPhongBan: [],
            trangThai: {
                tatCa: true,
                batDau: false,
                dangxuLy: false,
                daxuLy: false,
                chuaxuLy: false,
                ketThuc: false,
            },
            searchString: ''
        };

        vm.action = {
            clearListDuAn: clearListDuAn,
            ClearlistNguoiXuLy: ClearlistNguoiXuLy,
            ClearlistPhongBan: ClearlistPhongBan,
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
        }

        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }

        function reset() {
            vm.data.listDuAn = [];
            vm.data.listNguoiXuLy = [];
            vm.data.listPhongban = [];
            vm.data.searchString = '';
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val( moment().daysInMonth() + moment().format("/MM/YYYY"));
            $('#tungayketthuc').val('');
            $('#denngayketthuc').val('');
            checkTrangThaiTatCa(true);
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
            var tinhtrang = "";
            if (vm.data.trangThai.batDau) tinhtrang = tinhtrang + "'CV_BD',";
            if (vm.data.trangThai.dangxuLy) tinhtrang = tinhtrang + "'CV_DXL',";
            if (vm.data.trangThai.daxuLy) tinhtrang = tinhtrang + "'CV_XL',";
            if (vm.data.trangThai.chuaxuLy) tinhtrang = tinhtrang + "'CV_CXL',";
            if (vm.data.trangThai.ketThuc) tinhtrang = tinhtrang + "'CV_KT',";
            ////////////
            var DuAnId = joinStr(vm.data.listDuAn, "DuAnId");
            var NguoiXuLyId = joinStr(vm.data.listNguoiXuLy, "NhanVienId");
            var PhongBanId = joinStr(vm.data.listPhongban, "PhongBanId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + DuAnId +'|' + NguoiXuLyId +  '|' + tinhtrang + '|' + PhongBanId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
        }

        function clearListDuAn() {
            utility.clearArray(vm.data.listDuAn);
        }
        function ClearlistNguoiXuLy() {
            utility.clearArray(vm.data.listNguoiXuLy);
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
            $scope.$on(controllerId + '.data.listDuAn', function (event, data) {
                vm.data.listDuAn = data;
            });
            $scope.$on(controllerId + '.data.listNguoiXuLySearch', function (event, data) {
                vm.data.listNguoiXuLy = data;
            });
            $scope.$on(controllerId + '.data.listPhongBanListPopupSearch', function (event, data) {
                vm.data.listPhongban = data;
            });

        }
    }
})();
