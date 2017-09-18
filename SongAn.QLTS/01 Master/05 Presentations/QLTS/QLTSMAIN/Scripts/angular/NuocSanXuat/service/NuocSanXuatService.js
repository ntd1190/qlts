(function () {
    'use strict';

    angular
        .module('app')
        .factory('NuocSanXuatService', NuocSanXuatService);

    function NuocSanXuatService($http, API_BASE) {
    var api = {
        url: API_BASE+'Api.QLTS/NuocSanXuat/',
        insert: 'InsertNuocSanXuat',
        update: 'UpdateNuocSanXuat',
        GetList: 'GetListNuocSanXuat',
        GetPage: 'GetListNuocSanXuatByProjection',
        GetCombobox: 'GetListcbxNuocSanXuatByProjection',
        GetById: 'GetNuocSanXuatById',
        GetListBySearchString: 'GetListNuocSanXuatBySearchString',
        getList: 'getList',
        getListCount: 'getListCount',
        getListProjection: 'getListProjection',
        remove: 'DeleteNuocSanXuat',
        removeList: 'DeleteListNuocSanXuat',
    }

    var service = {
            getCombobox:getCombobox,
            getList: getList,
            getPage: getPage,
            getById: getById,
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

        function getPage(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId) {
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
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId,
                })
            }

            return $http(req);
        }
        function getCombobox(data) {
            var url = api.url + api.GetCombobox;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
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
                data: $.param({ NuocSanXuatid: id })
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