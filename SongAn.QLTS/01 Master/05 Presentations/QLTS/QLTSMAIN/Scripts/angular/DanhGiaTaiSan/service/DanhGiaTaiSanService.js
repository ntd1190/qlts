(function () {
    'use strict';
    var module = angular.module('app');

    module.service('DanhGiaTaiSanService', function ($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/DanhGia/',
            insert: 'InsertDanhGia',

            update: 'UpdateDanhGia',
            getById: 'GetListDanhGiaByCriteria',
            getPage: 'GetListDanhGiaByCriteria',
            removeList: 'DeleteListTaiSan',
            getListNguyenGiaByDanhGia: 'GetListNguyenGiaByDanhGia',
            getListNguyenGiaByTaiSanId: 'getListNguyenGiaByTaiSanId',
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
        service.removeList = function (data) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
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
        service.getPage = function (data) {
            var url = api.url + api.getPage;

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

        service.getListNguyenGiaByDanhGia = function (data) {
            var url = api.url + api.getListNguyenGiaByDanhGia;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };

        return service;
    });

})();