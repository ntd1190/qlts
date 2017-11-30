(function () {
    'use strict';

    var module = angular.module('app');

    module.factory('FileHopDongService', function ($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'Api.QLKD/FileHopDong/';

        api.insert = 'InsertFileHopDong';
        api.delete = 'DeleteFileHopDong';
        api.update = 'UpdateFileHopDong';

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
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
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
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        return service;
    });
})();