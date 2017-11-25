(function () {
    'use strict';

    var module = angular.module('app');

    module.factory('HopDongService', function ($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'Api.QLKD/KDHopDong/';

        api.insert = 'InsertHopDong';
        api.delete = 'DeleteHopDong';
        api.update = 'UpdateHopDong';
        api.getPageDetail = 'GetListChiTietByCriteria';
        api.getById = 'GetById';
        api.getPage = 'GetListByCriteria';
        api.cbxGetPage = 'cbxGetListByCriteria';

        var service = {};

        service.cbxGetPage = function (data) {
            var url = api.url + api.cbxGetPage;

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
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.getPage = function (data) {
            var url = api.url + api.getPage;

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
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    phieuHopDong: data.listHopDong,
                    listChiTiet: data.listChiTiet,
                    NHANVIEN_ID: data.NHANVIEN_ID,
                    USER_ID: data.USER_ID
                })
               
            }

            return $http(req);
        };
        service.delete = function (data) {
            var url = api.url + api.delete;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.insert = function (data) {
            var url = api.url + api.insert;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    phieuHopDong: data.listHopDong,
                    listChiTiet: data.listChiTiet,
                    NHANVIEN_ID: data.NHANVIEN_ID,
                    USER_ID: data.USER_ID
                })
            }

            return $http(req);
        };
        service.getPageDetail = function(id) {
            var url = api.url + api.getPageDetail;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ HopDongId: id })
            }
            return $http(req);
        };
        return service;
    });
})();