(function () {
    'use strict';

    angular
        .module('app')
        .factory('NhanVienService', NhanVienService);

    function NhanVienService($http, API_BASE) { 
        var api = {
            url: API_BASE + 'Api.QLKD/NhanVien/',
            GetPage: 'GetListNhanVienByProjection',
            GetComboboxByPhongBanId: 'GetListcbxNhanVienByPhongBanId',
            getById: 'GetNhanVienById',
            update: 'UpdateNhanVien',
            insert: 'InsertNhanVien',
            GetChiTiet :'GetListNhanVienChiTietByProjection'
        }

        var service = {
            getPage: getPage,
            GetComboboxByPhongBanId: GetComboboxByPhongBanId,
            getById: getById,
            update: update,
            insert:insert,
            GetChiTiet: GetChiTiet
        };

        return service;

        function GetComboboxByPhongBanId(UserId, NhanVienId, Search, PhongBanId, FunctionCode) {
            var url = api.url + api.GetComboboxByPhongBanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    NhanVienId: NhanVienId,
                    PhongBanId: PhongBanId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
        function getById(Id) {
            var url = api.url + api.getById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    NhanVienId: Id,
                })
            }

            return $http(req);
        }
        function GetChiTiet(Id) {
            var url = api.url + api.GetChiTiet;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    NhanVienId: Id,
                })
            }

            return $http(req);
        }
        function getPage(draw, start, length, searchString, sortName, sortDir, fields, UserId, NhanVienId) {
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
                    UserId: UserId,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }
        function update (data) {
            var url = api.url + api.update;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        function insert(data) {
            var url = api.url + api.insert;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
    }
})();