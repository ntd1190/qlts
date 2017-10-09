(function () {
    'use strict';
    var module = angular.module('app');

    module.service('TraCuuTaiSanService', function ($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'Api.QLTS/TraCuuTaiSan/';

        api.GetListMenuCoSo = 'GetListMenuCoSoByNhanVienId';
        api.GetListTaiSanByCriteria = 'GetListTaiSanByCriteria';
        api.LuocSu = 'LuocSu';

        api.remove = 'DeleteThayDoiThongTin';

        var service = {};

        service.getListMenuCoSo = function (data) {
            var url = api.url + api.GetListMenuCoSo;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        service.getPageTaiSan = function (data) {
            var url = api.url + api.GetListTaiSanByCriteria;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        service.getLuocSu = function (data) {
            var url = api.url + api.LuocSu;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        return service;
    });

})();