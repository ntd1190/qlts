(function () {
    'use strict';

    var module = angular.module('app');

    module.controller('HomeCtrl', function (HomeService, $q) {

        var userInfo,linkUrl;

        var vm = this;
        vm.data = {};
        vm.action = {};

        /* INIT FUNCTION */

        activate();
        function activate() { }

        vm.onInitView = function (config ) {
            config = config || {};
            userInfo = config.userInfo || {};
            linkUrl = config.linkUrl || '';
            loadData();
        }

        /* BIZ FUNCTION */

        function loadData() {
            getThongKeTaiSan();
            getListThongBao();
        }

        /* API FUNCTION */

        function getThongKeTaiSan() {
            var deferred = $q.defer();

            var data = {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.COSO_ID = userInfo.CoSoId;

            HomeService.getThongKeTaiSan(data)
                .then(function (success) {
                    console.log(success);
                    if (success.data.data && success.data.data.length > 0) {
                        vm.data.ThongKeTaiSan = success.data.data[0];
                    }
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(success);
                });

            return deferred.promise;
        }

        function fixedThongBao(listThongBao) {

            for (var index in listThongBao) {
                if (listThongBao[index].Loai == 'MuaSam') {
                    listThongBao[index].icon = 'fa-shopping-cart';
                    listThongBao[index].link = linkUrl + 'duyetmua/list';
                } else if (listThongBao[index].Loai == 'BaoCao') {
                    listThongBao[index].icon = 'fa-file';
                    listThongBao[index].link = linkUrl + 'duyetbaocao/list';
                } else if (listThongBao[index].Loai == 'DeNghi') {
                    listThongBao[index].icon = 'fa-laptop';
                    listThongBao[index].link = linkUrl + 'duyetcap/list';
                }
            }
            return listThongBao;
        }

        function getListThongBao() {
            var data = {};
            data.NHANVIEN_ID = userInfo.NhanVienId;
            data.COSO_ID = userInfo.CoSoId;
            HomeService.getListThongBao(data)
                .then(function (success) {
                    console.log(success);
                    vm.data.listThongBao = fixedThongBao(success.data.data);
                });
        }
    });
})();