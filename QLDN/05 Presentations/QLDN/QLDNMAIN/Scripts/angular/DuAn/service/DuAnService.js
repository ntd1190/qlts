(function () {
    'use strict';

    angular
        .module('app')
        .factory('DuAnService', DuAnService);

    function DuAnService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLNS/DuAn/',
            insert: 'InsertDuAn',
            update: 'UpdateDuAn',
            GetList: 'GetListDuAn',
            GetPage: 'GetListDuAnByProjection',
            GetPagePop: 'GetListPopDuAnByProjection',
            GetById: 'GetDuAnById',
            GetListBySearchString: 'GetListDuAnBySearchString',
            getList: 'getList',
            getListCount: 'getListCount',
            getListProjection: 'getListProjection',
            remove: 'DeleteDuAn',
            removeList: 'UpdateXoaListDuAn',
        }

        var service = {
            getList: getList,
            getPage: getPage,
            getPagePop: getPagePop,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            getListLuocSu: getListLuocSu,
        };

        return service;

        function removeList(data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                data: { duAn: angular.toJson(data) }
            }

            return $http(req);
        }

        function getPage(draw, start, length, search, sortName, sortDir, fields,UserLoginId,searchString) {
            var url = api.url + api.GetPage;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    search: search,
                    sortName: sortName,
                    sortDir: sortDir,
                    fields: fields,
                    LoginId: UserLoginId,
                    searchstring:searchString
                })
            }

            return $http(req);
        }

        function getPagePop(draw, start, length,  sortName, sortDir, fields, searchString) {
            var url = api.url + api.GetPagePop;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    draw: draw,
                    start: start,
                    length: length,
                    sortName: sortName,
                    sortDir: sortDir,
                    fields: fields,
                    searchstring: searchString
                })
            }

            return $http(req);
        }
        function insert(obj) {
            console.log(obj)
            if (!obj) {
                return null;
            };
            console.log(obj)
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

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ DuAnId: id })
            }
            return $http(req);
        };

        function getList() {
            var url = api.url + api.GetListBySearchString;

            var req = {
                url: url,
                method: 'GET'
            }

            return $http(req);
        }
        function getListLuocSu(draw, start, length, searchString, sortName, sortDir, fields) {
            var url = API_BASE + 'api.QLNS/LuocSu/GetListLuocSuByCriteria';
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
    }
})();