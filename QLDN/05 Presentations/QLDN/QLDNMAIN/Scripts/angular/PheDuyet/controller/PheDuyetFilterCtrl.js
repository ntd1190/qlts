(function () {
    'use strict';

    angular
        .module('app')
        .controller('PheDuyetFilterCtrl', PheDuyetFilterCtrl)
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

    function PheDuyetFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'PheDuyetFilterCtrl';

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
        vm.title = 'PheDuyetFilterCtrl';

        vm.data = {
            listLoaiPhieuDisplay: [
                { Id:"1" , Ma: 'PCT', Ten: 'Phiếu công tác' },
                { Id:"2", Ma: 'PDNTT', Ten: 'Phiếu đề nghị thanh toán' },
                { Id:"3", Ma: 'TU', Ten: 'Phiếu tạm ứng' },
                { Id:"4", Ma: 'TC', Ten: 'Phiếu tăng ca' },
                { Id:"5", Ma: 'NP', Ten: 'Phiếu nghỉ phép' }
            ],
            listLoaiPhieu:[],
            listNguoiTao: [],
            listPhongBan: [],
            trangThai: {
                tatCa: true,
                doiDuyet: false,
                dongY: false,
                tuChoi: false,

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

            ClearlistNguoiTao: ClearlistNguoiTao,
            ClearlistPhongBan: ClearlistPhongBan,
            checkTrangThai: checkTrangThai,
            checkTrangThaiTatCa: checkTrangThaiTatCa,
            reset: reset,
            search: search,
            apDung: apDung,
            ClearlistLoaiPhieu: ClearlistLoaiPhieu
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val(moment().daysInMonth() + moment().format("/MM/YYYY"));
            var a = vm.data.listLoaiPhieuDisplay;
        }
        function onInitView(ctrlId) {
            controllerId = ctrlId || controllerId;
            initEventListener();
        }
        function reset() {
            vm.data.listNguoiTao = [];
            vm.data.listPhongban = [];
            vm.data.searchString = '';
            vm.data.listLoaiPhieu = [];
            $('#tungay').val(moment().format("01/MM/YYYY"));
            $('#denngay').val( moment().daysInMonth() + moment().format("/MM/YYYY"));
            checkTrangThaiTatCa(true);
        }
        function checkTrangThaiTatCa(status) {
            vm.data.listTrangThai = [];

            if (status) {
                vm.data.trangThai.tatCa = true;
            }

            if (vm.data.trangThai.tatCa == true) {
                vm.data.trangThai.doiDuyet = false;
                vm.data.trangThai.dongY = false;
                vm.data.trangThai.tuChoi = false;
      
            }
            else {
                vm.data.trangThai.batDau = true;
            }
        }
        function checkTrangThai() {

            if (vm.data.trangThai.doiDuyet != true
                && vm.data.trangThai.dongY != true
                && vm.data.trangThai.tuChoi != true) {

                vm.data.trangThai.tatCa = true;
            }
            else {
                vm.data.trangThai.tatCa = false;
            }
        }
        function apDung() {
            var selectedListLoaiPhieu = new Array();
            for (var i = 0; i < vm.data.listLoaiPhieuDisplay.length; i++) {
                if (vm.data.listLoaiPhieuDisplay[i].isSelected) {
                    selectedListLoaiPhieu.push(vm.data.listLoaiPhieuDisplay[i]);
                }
            }
            vm.data.listLoaiPhieu = selectedListLoaiPhieu;
            $('#LoaiPhieuListPopup').collapse('hide');
        }
        function ClearlistLoaiPhieu()
        {
            vm.data.listLoaiPhieu = [];
        }
        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            //////////
            var tinhtrang = "";
            if (vm.data.trangThai.doiDuyet) tinhtrang = tinhtrang + "'PCT_DD','PDNTT_DD','TU_DD','TC_DD','NP_DD',";
            if (vm.data.trangThai.dongY) tinhtrang = tinhtrang + "'PCT_DY','PDNTT_DY','TU_DY','TC_DY','NP_DY',";
            if (vm.data.trangThai.tuChoi) tinhtrang = tinhtrang + "'PCT_TC','PDNTT_TC','TU_TC','TC_TC','NP_TC',";

            ////////////
            var LoaiPhieu = joinStr(vm.data.listLoaiPhieu, "Id");
            var NguoiTaoId = joinStr(vm.data.listNguoiTao, "NhanVienId");
            var PhongBanId = joinStr(vm.data.listPhongban, "PhongBanId");
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + tinhtrang + '|' + LoaiPhieu + '|' + NguoiTaoId + '|' + PhongBanId;
            /////////////
            $scope.$emit(controllerId + '.action.filters', vm.data.searchString);
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
            $scope.$on(controllerId + '.data.listNguoiTaoSearch', function (event, data) {
                vm.data.listNguoiTao = data;
            });
            $scope.$on(controllerId + '.data.listPhongBanListPopupSearch', function (event, data) {
                vm.data.listPhongban = data;
            });

        }
    }
})();
