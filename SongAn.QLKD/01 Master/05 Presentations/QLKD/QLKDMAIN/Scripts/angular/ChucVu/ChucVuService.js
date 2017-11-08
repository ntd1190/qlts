(function () {
    'use strict';


    angular
        .module('app')
        .factory('ChucVuService', ChucVuService);


    function ChucVuService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.qlns/chucvu/',
            GetPage: 'GetListChucVuByCriteria',
        }

        var service = {
            getPage: getPage,
        };

        return service;


        function getPage(draw, start, length, searchString, sortName, sortDir) {
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
                    sortDir: sortDir
                })
            }

            return $http(req);
        }
    }
})();