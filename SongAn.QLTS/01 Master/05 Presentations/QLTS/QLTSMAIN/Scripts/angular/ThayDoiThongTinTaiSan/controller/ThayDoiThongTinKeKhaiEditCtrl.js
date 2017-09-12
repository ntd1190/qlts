(function () {
    'use strict';
    var module = angular.module('app');

    module.controller('ThayDoiThongTinKeKhaiEditCtrl', function (TaiSanService, utility, $timeout, $scope, $q) {
        var vm = this, userInfo, isEdit = false, TaiSanId = 0, linkUrl = '';

        vm.error = {};

        vm.data = {};
        vm.data.number = 2;
    });
})();
