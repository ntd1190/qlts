(function () {
    'use strict';

    angular
        .module('app')
        .factory('TinhHuyenTramService', TinhHuyenTramService);

    function TinhHuyenTramService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/TinhHuyenTram/',
            getPageTinh: 'GetListTinhByProjection',
            getPageHuyen: 'GetListHuyenByProjection',
            getPagePhuongXa: 'GetListPhuongXaByProjection',

        }
        var service = {
            getPageTinh: getPageTinh,
            getPageHuyen: getPageHuyen,
            getPagePhuongXa: getPagePhuongXa,
        };
        return service;
        function getPageTinh(draw, start, length, searchString, sortName, sortDir, fields) {
            var url = api.url + api.getPageTinh;

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
                })
            }

            return $http(req);
        }
        function getPageHuyen(draw, start, length, searchString, sortName, sortDir, fields,maTinh) {
            var url = api.url + api.getPageHuyen;

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
                    maTinh: maTinh,
                })
            }

            return $http(req);
        }
        function getPagePhuongXa(draw, start, length, searchString, sortName, sortDir, fields,maHuyen) {
            var url = api.url + api.getPagePhuongXa;

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
                    maHuyen: maHuyen,
                })
            }

            return $http(req);
        }
    }
})();