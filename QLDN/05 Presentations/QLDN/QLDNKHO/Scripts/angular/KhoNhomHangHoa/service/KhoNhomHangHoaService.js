(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoNhomHangHoaService', KhoNhomHangHoaService);

    function KhoNhomHangHoaService($http, API_BASE) {
    var api = {
        url: API_BASE+'api.QLKho/KhoNhomHangHoa/',
        insert: 'InsertKhoNhomHangHoa',
        update: 'UpdateKhoNhomHangHoa',
        GetList: 'GetListKhoNhomHangHoa',
        GetPage: 'GetListKhoNhomHangHoaByProjection',
        GetById: 'GetKhoNhomHangHoaById',
        GetListBySearchString: 'GetListKhoNhomHangHoaBySearchString',
        getList: 'getList',
        getListCount: 'getListCount',
        getListProjection: 'getListProjection',
        remove: 'DeleteKhoNhomHangHoa',
        removeList: 'DeleteListKhoNhomHangHoa',
        removeListV2: 'UpdateXoaListKhoNhomHangHoa',
    }

        var service = {
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            removeListV2: removeListV2,
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

        // 2017.07.25 binhnt # update xóa dùng stored kiểm tra ràng buộc khóa ngoại
        function removeListV2(data) {
            var url = api.url + api.removeListV2;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                data: {
                    listNhomHangHoa: angular.toJson(data.listNhomHangHoa),
                    loginId: data.loginId
                }
            }

            return $http(req);
        }

        function getPage(draw, start, length, searchString, sortName, sortDir, fields) {
            var url =api.url + api.GetPage;

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

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KhoNhomHangHoaid: id })
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
    }
})();