(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoPhieuXuatService', KhoPhieuNhapService);

    function KhoPhieuNhapService($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'Api.QLTS/KhoPhieuXuatKhac/';

        api.insert = 'InsertKhoPhieuXuat';
        api.update = 'UpdateKhoPhieuXuat';
        api.delete = 'DeleteKhoPhieuXuat';
        api.getPage = 'GetListKhoPhieuXuatByCriteria';
        api.getById = 'GetKhoPhieuXuatById';
        api.getChiTietById = 'GetKhoPhieuXuatChiTietById';

        var service = {};

        service.insert = function (data) {
            return request(api.url + api.insert, data);
        }
        service.update = function (data) {
            return request(api.url + api.update, data);
        }
        service.delete = function (data) {
            return request(api.url + api.delete, data);
        }
        service.getPage = function (data) {
            return request(api.url + api.getPage, data);
        }
        service.getById = function (data) {
            return request(api.url + api.getById, data);
        }
        service.getChiTietById = function (data) {
            return request(api.url + api.getChiTietById, data);
        }

        function request(url, data) {
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        }
        return service;
    }
})();