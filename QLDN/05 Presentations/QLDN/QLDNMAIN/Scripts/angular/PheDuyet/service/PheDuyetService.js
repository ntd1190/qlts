(function () {
    'use strict';

    angular
        .module('app')
        .factory('PheDuyetService', PheDuyetService);

    function PheDuyetService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/PheDuyet/',
            GetPage: 'GetListPheDuyetByProjection',
            Update: 'UpdatePheDuyetByProjection',
        }

        var service = {
            getPage: getPage,
            Update: Update
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
        function Update(table, field, where) {
            var url = api.url + api.Update;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    table: table,
                    field: field,
                    where: where
                })
            }

            return $http(req);
        }
    }
})();