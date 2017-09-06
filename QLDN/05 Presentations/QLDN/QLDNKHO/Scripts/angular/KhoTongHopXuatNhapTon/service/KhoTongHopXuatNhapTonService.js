(function () {
    'use strict';

    var module = angular.module('app');
    module.factory('KhoTongHopXuatNhapTonService', function ($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKho/KhoTongHopXuatNhapTon/',
            GetPage: 'GetListTheKhoXuatNhapTonByCriteria',
        }

        var service = {
            getPage: getPage,
        };

        return service;
        function getPage(data) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        }


    });
})();