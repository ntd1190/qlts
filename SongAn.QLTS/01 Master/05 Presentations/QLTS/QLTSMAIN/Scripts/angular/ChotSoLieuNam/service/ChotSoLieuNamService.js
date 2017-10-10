(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChotSoLieuNamService', ChotSoLieuNamService);

    function ChotSoLieuNamService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/ChotSoLieuNam/',
            insert: 'ChotSoLieuNam'
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
                    Nam: obj.Nam,
                    CoSoId: obj.CoSoId,
                    LoginId: obj.LoginId

                })
            }
            return $http(req);
        }
    }
})();