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
        }

        var service = {
            getPage: getPage,
            GetComboboxByPhongBanId: GetComboboxByPhongBanId,

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


    }
})();