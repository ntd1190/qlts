(function () {
    'use strict';

    angular
        .module('app')
        .controller('TuyChonCotCtrl', TuyChonCotCtrl);


    function TuyChonCotCtrl($rootScope, $scope, TuyChonCotService, utility) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'TuyChonCotCtrl';

        //vm.dsTuyChon = [
        //  { ma_cot: 'Ma', ten_cot: 'Mã NV',chon: true},
        //  { ma_cot: 'Ten', ten_cot: 'Tên NV', chon: true },
        //  { ma_cot: 'PhongBan', ten_cot: 'Phòng ban', chon: false },
        //];

        var tblTuyChonCot = TuyChonCotService.getAll();
        vm.dsTuyChon = utility.clone(tblTuyChonCot);
        vm.dsSelected = [];

        vm.doiTrangThaiChon = function (index) {
            vm.dsTuyChon[index]['chon'] = !vm.dsTuyChon[index]['chon'];
        }

        vm.apdung = function () {
            for (var i = 0; i < vm.dsTuyChon.length; i++) {
                for (var i = 0; i < tblTuyChonCot.length; i++) {
                    if (tblTuyChonCot[i].ma_cot == vm.dsTuyChon[i].ma_cot) {
                        tblTuyChonCot[i].chon = vm.dsTuyChon[i].chon;
                    }
                }
            }
        }

        activate();

        function activate() { }

        function saveTuyChon() {
            for (var i = 0; i < vm.dsTuyChon.length; i++) {
                tblTuyChonCot[i].chon = vm.dsTuyChon[i].chon;
            }
        }
    }
})();
