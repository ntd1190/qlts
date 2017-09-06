(function () {
    'use strict';

    angular
        .module('app')
        .controller('BaoCaoCongViecFilterCtrl', BaoCaoCongViecFilterCtrl)
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

    function BaoCaoCongViecFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'BaoCaoCongViecFilterCtrl';

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
        vm.title = 'BaoCaoCongViecFilterCtrl';

        vm.data = {
            listNguoiXuLy: [],
            listPhongBan: [],
            searchString: '',
            UserLoginId: ''
        };

        vm.action = {
            ClearlistNguoiXuLy: ClearlistNguoiXuLy,
            ClearlistPhongBan: ClearlistPhongBan,
            reset: reset,
            search: search
        }
        vm.onInitView = onInitView;

        activate();

        function activate() {
            var days = 7; 
            var date = new Date();
            var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
            var day = last.getDate();
            var month = last.getMonth()+1;
            $('#tungay').val(moment().format(pad(day,2) + "/" + pad(month,2) + "/YYYY"));
            $('#denngay').val(moment().format("DD/MM/YYYY"));
        }
        function pad (str, max) {
             str = str.toString();
             return str.length < max ? pad("0" + str, max) : str;
        }
        function onInitView(config) {
            controllerId = config.ctrlId || controllerId;
            if (config.userInfo) {
                vm.data.UserLoginId = config.userInfo.NhanVienId;
            }
            initEventListener();
        }

        function reset() {
            vm.data.listNguoiXuLy = [];
            vm.data.listPhongban = [];
            vm.data.searchString = '';
            var days = 7;
            var date = new Date();
            var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
            var day = last.getDate();
            $('#tungay').val(moment().format(day + "/MM/YYYY"));
            $('#denngay').val( moment().format("DD/MM/YYYY"));
        }





        function search() {
            var datefrom = $('#tungay').datetimepicker('getValue');
            var dateto = $('#denngay').datetimepicker('getValue');
            if (datefrom != null && dateto != null) if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }
            ////////////
            var NguoiXuLyId = joinStr(vm.data.listNguoiXuLy, "NhanVienId");
            var PhongBanId = joinStr(vm.data.listPhongban, "PhongBanId");
            var LoginId = vm.data.UserLoginId;
            /////////////
            vm.data.searchString = $('#tungay').val() + '|' + $('#denngay').val() + '|' + NguoiXuLyId +  '|' + PhongBanId + '|' + LoginId;
            $('#reportmodal').find('iframe').attr('src', '../../../QLDNMAIN/CrystalReport/ReportPage.aspx?name=rptBaoCaoCongViec&data=' + vm.data.searchString);
            $('#reportmodal').modal('show');
            
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

            $scope.$on(controllerId + '.data.listNguoiXuLySearch', function (event, data) {
                vm.data.listNguoiXuLy = data;
            });
            $scope.$on(controllerId + '.data.listPhongBanListPopupSearch', function (event, data) {
                vm.data.listPhongban = data;
            });

        }
    }
})();
