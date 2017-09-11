(function () {
    'use strict';

    angular
        .module('app')
        .factory('TheoDoiService', TheoDoiService);

    function TheoDoiService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/TheoDoi/',
            insert: 'InsertTheoDoi',
            update: 'UpdateTheoDoi',
            GetPage: 'GetListTheoDoiByProjection',
            GetById: 'GetTheoDoiById',
            removeList: 'DeleteListTheoDoi',
        }

        var service = {
            GetPage: GetPage,
            GetById: GetById,
            insert: insert,
            update: update,
            removeList: removeList,
        };

        return service;

        function removeList(ids) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ids: ids
                })
            }

            return $http(req);
        }

        function GetPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId) {
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
                    CoSoId: CoSoId,
                    TuNgay: '09/09/2017',
                    DenNgay: '09/09/2017',
                    NhanVienId: NhanVienId,
                })
            }

            return $http(req);
        }

        function insert(obj) {
            if (!obj) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }
            return $http(req);
        }
        
        function update(obj) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(obj)
            }
            return $http(req);
        }

        function GetById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ TheoDoiid: id })
            }
            return $http(req);
        };
    }
})();