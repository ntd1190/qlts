(function () {
    'use strict';

    angular
        .module('app')
        .factory('NhomKhachHangService', NhomKhachHangService);

    function NhomKhachHangService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLKD/NhomKhachHang/',
            GetComboboxByPhongBanId: 'GetListcbxNhomKhachHangById',
            insert: 'InsertNhomKhachHang',
            update: 'UpdateNhomKhachHangById',
            GetPage: 'GetListNhomKhachHangByProjection',
            GetById: 'GetListNhomKhachHangById',
            removeList: 'DeleteNhomKhachHangById'
        }

        var service = {
            GetComboboxById: GetComboboxById,
            getPage: getPage,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, NhomKhachHangId, FunctionCode) {
            var url = api.url + api.GetComboboxByPhongBanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    NhomKhachHangId: NhomKhachHangId,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
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

        function getPage(draw, start, length, searchString, sortName, sortDir,fields, UserId, NhanVienId) {
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
                    UserId: UserId,
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
                data: $.param({
                    nhomKhachHang: obj.NhomKhachHang,
                    userId: obj.UserId,
                })
            }
            return $http(req);
        }

        function update(obj) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    nhomKhachHang: obj.NhomKhachHang,
                    userId: obj.UserId,
                })
            }
            return $http(req);
        }

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ NhomKhachHangId: id })
            }
            return $http(req);
        };
    }
})();