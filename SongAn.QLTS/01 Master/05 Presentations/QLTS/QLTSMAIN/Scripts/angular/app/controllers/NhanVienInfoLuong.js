(function () {
    'use strict';

    angular
        .module('app')
        .controller('NhanVienInfo_Luong', NhanVienInfo_Luong);

    function NhanVienInfo_Luong($scope, utility, LuongService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'NhanVienInfo_Luong';
        vm.MaNhanVien = '';
        
        vm.actSave = function () {

        }

        activate();

        function activate() {
            vm.MaNhanVien = $scope.MaNhanVien;

        }
    }
})();
