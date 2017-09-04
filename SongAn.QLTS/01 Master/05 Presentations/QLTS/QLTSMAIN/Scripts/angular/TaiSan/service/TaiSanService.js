(function () {
    'use strict';
    var module = angular.module('app');

    module.service('TaiSanService', function ($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/TaiSan/',
            insert: 'InsertTaiSan',
            update: 'UpdateTaiSan',
            getById: 'GetTaiSanById',
            getListNguyenGiaByTaiSanId: 'getListNguyenGiaByTaiSanId',
            GetCombobox: 'GetListcbxTaiSanByCriteria',
        }
        var service = {};
        service.insert = function (data) {
            var url = api.url + api.insert;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        service.update = function (data) {
            var url = api.url + api.update;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.getById = function (data) {
            var url = api.url + api.getById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.getListNguyenGiaByTaiSanId = function (data) {
            var url = api.url + api.getListNguyenGiaByTaiSanId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.getCombobox = function (CoSoId, NhanVienId, Search) {
            var url = api.url + api.GetCombobox;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    Search: Search,
                    CoSoId: CoSoId,
                    NhanVienId: NhanVienId
                })
            }

            return $http(req);
        }

        return service;
    });

})();