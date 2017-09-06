(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhachHangService', KhachHangService);

    function KhachHangService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKho/KhoKhachHang/',
            insert: 'InsertKhoKhachHang',
            update: 'UpdateKhoKhachHang',
            GetList: 'GetListKhoKhachHang',
            GetPage: 'GetListKhoKhachHangByProjection',
            GetById: 'GetKhoKhachHangById',
            GetListBySearchString: 'GetListKhoKhachHangBySearchString',
            getList: 'getList',
            getListCount: 'getListCount',
            getListProjection: 'getListProjection',
            remove: 'DeleteKhoKhachHang',
            removeList: 'DeleteListKhoKhachHang',
            removeListV2: 'UpdateXoaListKhoKhachHang',
        }

        var service = {
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeListV2,
            getListLuocSu: getListLuocSu,
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

        function removeListV2(data) {
            var url = api.url + api.removeListV2;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: { listKhachHang: angular.toJson(data.list), loginId: data.loginId }
            }

            return $http(req);
        }

        function getPage(draw, start, length, searchString, sortName, sortDir, fields) {
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
                data: $.param({ KhachHangId: id })
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