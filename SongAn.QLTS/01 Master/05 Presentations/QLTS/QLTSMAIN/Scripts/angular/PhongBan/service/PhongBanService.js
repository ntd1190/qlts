(function () {
    'use strict';

    angular
        .module('app')
        .factory('PhongBanService', PhongBanService);

    function PhongBanService($http, API_BASE) {
    var api = {
        url: API_BASE+'Api.QLTS/phongban/',
        insert: 'InsertPhongBan',
        update: 'UpdatePhongBan',
        GetList: 'GetListPhongBan',
        GetPage: 'GetListPhongBanByProjection',
        GetCombobox: 'GetListcbxPhongBanByProjection',
        GetComboboxById: 'GetListcbxPhongBanById',
        GetById: 'GetPhongBanById',
        GetListBySearchString: 'GetListPhongBanBySearchString',
        getList: 'getList',
        getListCount: 'getListCount',
        getListProjection: 'getListProjection',
        remove: 'DeletePhongBan',
        removeList: 'DeleteListPhongBan',
    }

    var service = {
        getCombobox: getCombobox,
        getComboboxById: getComboboxById,
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
        function getCombobox(CoSoId, NhanVienId, Search, FunctionCode) {
            var url = api.url + api.GetCombobox;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
        function getComboboxById(CoSoId, NhanVienId, Search,PhongBanId,functionCode) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId,
                    functionCode: functionCode,
                    PhongBanId: PhongBanId
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
                data: $.param({ phongbanid: id })
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