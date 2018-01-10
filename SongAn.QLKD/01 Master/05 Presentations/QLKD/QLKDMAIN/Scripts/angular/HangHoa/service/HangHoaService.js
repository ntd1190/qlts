(function () {
    'use strict';

    angular
        .module('app')
        .factory('HangHoaService', HangHoaService);

    function HangHoaService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/HangHoa/',
            GetComboboxById: 'GetListcbxHangHoaById',
            GetPage: 'GetListHangHoaByProjection',
            GetById: 'GetHangHoaById',
        }

        var service = {
            GetComboboxById: GetComboboxById,
            getPage: getPage,
            getById: getById,
        };

        return service;

        function GetComboboxById(UserId, NhanVienId, Search, HangHoaId, MaHangHoa, FunctionCode) {
            var url = api.url + api.GetComboboxById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    UserId: UserId,
                    HangHoaId: HangHoaId,
                    MaHangHoa:MaHangHoa,
                    NhanVienId: NhanVienId,
                    FunctionCode: FunctionCode
                })
            }

            return $http(req);
        }
        function getPage(draw, start, length, searchString, sortName, sortDir, fields, NhanVienId) {
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
                    //UserId: UserId,
                    NhanVienId: NhanVienId,
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
                data: $.param({ HangHoaId: id })
            }
            return $http(req);
        };

    }
})();