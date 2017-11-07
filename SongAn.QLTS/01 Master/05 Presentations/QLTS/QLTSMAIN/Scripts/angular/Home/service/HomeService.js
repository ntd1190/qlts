(function () {
    'use strict';

    var module = angular.module('app');

    module.factory('HomeService', function ($http, API_BASE) {
        var api = API_BASE + 'Api.QLTS/Home/';
        var service = {};

        service.getThongKeTaiSan = function (data) {

            var req = {
                url: `${api}ThongKeTaiSan`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.getListThongBao = function (data) {

            var req = {
                url: `${api}GetListThongBao`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        return service;
    });
})();