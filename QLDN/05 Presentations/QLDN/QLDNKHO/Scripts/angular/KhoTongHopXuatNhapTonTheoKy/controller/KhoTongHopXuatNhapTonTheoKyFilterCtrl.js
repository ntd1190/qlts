(function () {
    'use strict';

    angular
        .module('app')
        .controller('TongHopXuatNhapTonTheoKyFilterCtrl', TongHopXuatNhapTonTheoKyFilterCtrl);


    function TongHopXuatNhapTonTheoKyFilterCtrl($rootScope, $scope, utility) {
        /* jshint validthis:true */
        var controllerId = 'TongHopXuatNhapTonTheoKyFilterCtrl';

        var vm = this;

        vm.title = 'TongHopXuatNhapTonTheoKyFilterCtrl';

        vm.data = {

            ngayTu: '01/01/' + moment().format('YYYY'),
            ngayDen: '31/12/' + moment().format('YYYY'),

            LoaiBaoCao: {
                tatCa: true,
                hangThang: false,
                hangQuy: false,
                hangNam: false
            },
            MaTrangThai: {
                kiemNghiem: true,
                hoanThanh: false
            },
            searchString: ''
        };

        vm.action = {
            checkLoaiBaoCao: checkLoaiBaoCao,
            checkLoaiBaoCaoTatCa: checkLoaiBaoCaoTatCa,
            reset: reset,
            search: search
        }
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
            }

            initEventListener();
        }

        function reset() {
            vm.data.searchString = '';
            vm.data.ngayTu = '01/01/' + moment().format('YYYY'),
            vm.data.ngayDen = '31/12/' + moment().format('YYYY'),
            checkLoaiBaoCaoTatCa(true);
        }

        function checkLoaiBaoCaoTatCa(status) {
            if (status) {
                vm.data.LoaiBaoCao.tatCa = true;
            }

            if (vm.data.LoaiBaoCao.tatCa == true) {
                vm.data.LoaiBaoCao.hangThang = false;
                vm.data.LoaiBaoCao.hangQuy = false;
                vm.data.LoaiBaoCao.hangNam = false;
            }
            else {
                vm.data.LoaiBaoCao.hangThang = true;
            }
        }

        function checkLoaiBaoCao(a) {

            if (vm.data.LoaiBaoCao.hangThang != true
                && vm.data.LoaiBaoCao.hangQuy != true
                && vm.data.LoaiBaoCao.hangNam != true) {

                vm.data.LoaiBaoCao.tatCa = true;
            }
            else {
                vm.data.LoaiBaoCao.tatCa = false;
            }
            if (!vm.data.LoaiBaoCao.tatCa) {
                if (a == 't') {
                    if (vm.data.LoaiBaoCao.hangThang) {
                        vm.data.LoaiBaoCao.hangQuy = false;
                        vm.data.LoaiBaoCao.hangNam = false;
                    }
                    else {
                        vm.data.LoaiBaoCao.hangQuy = true;
                    }
                } else if (a == 'q') {
                    if (vm.data.LoaiBaoCao.hangQuy) {
                        vm.data.LoaiBaoCao.hangThang = false;
                        vm.data.LoaiBaoCao.hangNam = false;
                    } else {
                        vm.data.LoaiBaoCao.hangNam = true;
                    }
                } else if (a == 'n') {
                    if (vm.data.LoaiBaoCao.hangNam) {
                        vm.data.LoaiBaoCao.hangThang = false;
                        vm.data.LoaiBaoCao.hangQuy = false;
                    } else {
                        vm.data.LoaiBaoCao.hangThang = true;
                    }
                }
            }
        }

        function search() {

            var datefrom = moment(vm.data.ngayTu);
            var dateto = moment(vm.data.ngayDen);
            if (dateto < datefrom) {
                alert("Không thể tìm từ ngày lớn hơn đến ngày!");
                return;
            }

            var listLoaiBaoCao = new Array();

            if (vm.data.LoaiBaoCao.tatCa == true) {
                listLoaiBaoCao.push({ LoaiBaoCao: "ALL" });
            }
            else {
                if (vm.data.LoaiBaoCao.hangThang) listLoaiBaoCao.push({ LoaiBaoCao: "THANG" });
                if (vm.data.LoaiBaoCao.hangQuy) listLoaiBaoCao.push({ LoaiBaoCao: "QUY" });
                if (vm.data.LoaiBaoCao.hangNam) listLoaiBaoCao.push({ LoaiBaoCao: "NAM" });
            }

            var data = {
                listLoaiBaoCao: listLoaiBaoCao,
                ngayTu: vm.data.ngayTu,
                ngayDen: vm.data.ngayDen,

                searchString: vm.data.searchString
            };
            $scope.$emit(controllerId + '.action.filters', data);
        }

        /* EVENT LISTENER */
        function initEventListener() {
            //F8
            $scope.$on(controllerId + '.action.callSearch', function (event, data) {
                vm.action.search();
            });
        }
    }
})();
