(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoTheKhoService', KhoTheKhoService);

    function KhoTheKhoService($http, API_BASE) { 
        var api = {
            url: API_BASE + 'Api.QLKho/KhoTheKho/',
            GetPage: 'GetListKhoTheKhoByProjection',
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