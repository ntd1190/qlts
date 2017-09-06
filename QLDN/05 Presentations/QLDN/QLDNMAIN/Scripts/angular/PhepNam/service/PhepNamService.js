(function () {
    'use strict';

    angular
        .module('app')
        .factory('PhepNamService', PhepNamService);

    function PhepNamService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.Main/PhepNam/',
            GetPage: 'GetListPhepNamByProjection',
            GetListPhepNamByNhanVienId: 'GetListPhepNamByNhanVienId'
        }

        var service = {
            getPage: getPage,
            GetListPhepNamByNhanVienId: GetListPhepNamByNhanVienId,
        };

        return service;

        function getPage(draw, start, length, searchString, sortName, sortDir, fields, LoginId) {
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

        function GetListPhepNamByNhanVienId(data) {
            var url = api.url + api.GetListPhepNamByNhanVienId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        }

    }
})();