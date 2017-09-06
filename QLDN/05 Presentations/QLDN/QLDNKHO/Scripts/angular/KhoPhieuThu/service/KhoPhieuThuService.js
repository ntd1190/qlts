(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoPhieuThuService', KhoPhieuThuService);

    function KhoPhieuThuService($http, API_BASE) { 
        var api = {
            url: API_BASE + 'api.QLNS/KhoPhieuThu/',
            insert: 'InsertKhoPhieuThu',
            update: 'UpdateKhoPhieuThu',
            GetList: 'GetListKhoPhieuThu',
            GetPage: 'GetListKhoPhieuThuByProjection',
            GetById: 'GetKhoPhieuThuById',
            GetListBySearchString: 'GetListKhoPhieuThuBySearchString',
            getList: 'getList',
            getListCount: 'getListCount',
            getListProjection: 'getListProjection',
            remove: 'DeleteKhoPhieuThu',
            removeList: 'UpdateXoaListKhoPhieuThu',
            getThongTinByMa: 'GetThongTinKhoPhieuThuByMa',
            GetSoPhieuAuto: API_BASE + 'Api.QLKHO/KhoGetSoPhieuAuto/KhoGetSoPhieuAuto',
        }

        var service = {
            getList: getList,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
            getListLuocSu: getListLuocSu,
            getThongTinByMa: getThongTinByMa,
            getSoPhieuAuto: getSoPhieuAuto
        };

        return service;

        function removeList(data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                data: { congViec: angular.toJson(data) }
            }

            return $http(req);
        }

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
        function getSoPhieuAuto(data) {
            var url = api.GetSoPhieuAuto;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
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
                data: $.param({ KhoPhieuThuId: id })
            }
            return $http(req);
        };

        function getList (draw, start, length, searchString, sortName, sortDir, fields,LoginId) {
            var url = api.url + api.GetListBySearchString;

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
        function getListLuocSu(draw, start, length, searchString, sortName, sortDir, fields) {
            var url = API_BASE + 'Api.QLKho/KhoLuocSu/GetListKhoLuocSuByCriteria';
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
        function getThongTinByMa(MaPhieuThu) {
            var url = api.url + api.getThongTinByMa;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ MaPhieuThu:MaPhieuThu})
            }
            return $http(req);
        }
    }
})();