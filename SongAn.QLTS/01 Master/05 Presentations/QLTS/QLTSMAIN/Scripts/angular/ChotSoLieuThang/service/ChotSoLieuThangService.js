(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChotSoLieuThangService', ChotSoLieuThangService);

    function ChotSoLieuThangService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/ChotSoLieuThang/',
            insert: 'ChotSoLieuThang'
        }

        var service = {
            insert: insert
        };

        return service;

        function insert(obj) {
            if (!obj) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ThangNam: obj.ThangNam,
                    CoSoId: obj.CoSoId,
                    LoginId: obj.LoginId
                })
            }
            return $http(req);
        }
    }
})();