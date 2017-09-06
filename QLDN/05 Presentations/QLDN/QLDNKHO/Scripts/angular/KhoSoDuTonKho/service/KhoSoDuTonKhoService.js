(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoSoDuTonKhoService', KhoSoDuTonKhoService);

    function KhoSoDuTonKhoService($http, API_BASE) { 
        var api = {
            url: API_BASE + 'api.QLNS/KhoSoDuTonKho/',
            GetPage: 'GetListKhoSoDuTonKhoByProjection',
        }

        var service = {
            getPage: getPage,
        };

        return service;
        function getPage(draw, start, length, searchString, sortName, sortDir, fields,LoginId) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    search: searchString,
                    sortName: sortName,
                    sortDir: sortDir,
                    fields: fields,
                    LoginId: LoginId
                })
            }

            return $http(req);
        }

        
    }
})();