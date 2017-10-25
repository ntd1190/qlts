(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoTonKhoService', KhoTonKhoService);

    function KhoTonKhoService($http, API_BASE) {
    var api = {
        url: API_BASE+'Api.QLTS/KhoTonKho/',
        insert: 'InsertKhoTonKho',
        update: 'UpdateKhoTonKho',
        GetList: 'GetListKhoTonKho',
        GetPage: 'GetListKhoTonKhoByProjection',
        getPageDetail: 'GetListKhoTonKhoChiTietByProjection',
        GetById: 'GetKhoTonKhoById',
        GetListBySearchString: 'GetListKhoTonKhoBySearchString',
        getList: 'getList',
        getListCount: 'getListCount',
        getListProjection: 'getListProjection',
        remove: 'DeleteKhoTonKho',
        removeList: 'DeleteListKhoTonKho',
        GetTaiSanById: 'GetKhoTaiSanById'
    }

    var service = {
        getPageDetail: getPageDetail,
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            gettaisanById: gettaisanById
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
        function getPageDetail(draw, start, length, searchString, sortName, sortDir, CoSoId, NhanVienId, KhoTaiSanId, ThangNam, KhoTonKhoId) {
            var url = api.url + api.getPageDetail;

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
                    KhoTaiSanId: KhoTaiSanId,
                    ThangNam: ThangNam,
                    KhoTonKhoId:KhoTonKhoId
                })
            }

            return $http(req);
        }
        function insert(data) {
            if (!data) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    KhoTonKho: data.KhoTonKho,
                })
            }
            return $http(req);
        }

        function update(obj) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data:obj
            }
            return $http(req);
        }

        function getById(id, thangnam, khotonkhoid, CoSoId) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KhoTaiSanId: id, ThangNam: thangnam, KhoTonKhoId: khotonkhoid, CoSoId: CoSoId })
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
        function gettaisanById(id) {
            var url = API_BASE+'Api.QLTS/KhoTaiSan/' + api.GetTaiSanById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KhoTaiSanid: id })
            }
            return $http(req);
        };
    }
})();