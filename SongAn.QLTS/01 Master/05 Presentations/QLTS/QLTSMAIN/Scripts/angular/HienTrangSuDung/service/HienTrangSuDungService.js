(function () {
    'use strict';

    angular
        .module('app')
        .factory('HienTrangSuDungService', HienTrangSuDungService);

    function HienTrangSuDungService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/HienTrangSuDung/',
            GetCombobox: 'GetListcbxHienTrangSuDungByCriteria',
            GetById: 'GetHienTrangSuDungById',
        }

        var service = {};
        service.getCombobox = function (data) {
            var url = api.url + api.GetCombobox;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        }
        service.getById = function (id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ HienTrangSuDungid: id })
            }
            return $http(req);
        };

        return service;
    }
})();