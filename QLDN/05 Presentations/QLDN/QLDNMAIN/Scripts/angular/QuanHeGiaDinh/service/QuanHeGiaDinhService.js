(function () {
    'use strict';

    var module = angular.module('app');
    module.factory('QuanHeGiaDinhService', function ($http, API_BASE) {
        var api = {},
            service = {};
        api = {
            url: API_BASE + 'api.QLNS/QuanHeGiaDinh/',
            insert: 'InsertQuanHeGiaDinh',
            update: 'UpdateQuanHeGiaDinh',
            remove: 'DeleteQuanHeGiaDinh',
            getPage: 'getListQuanHeGiaDinhByCriteria',
            getById: 'getListQuanHeGiaDinhById',
        }

        service.insert = function (data) {
            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                data: $.param(data)
            }
            return $http(req);
        }
        service.getById = function (data) {
            var url = api.url + api.getById;
            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                data: $.param(data)
            }
            return $http(req);
        }
        service.update = function (data) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                data: $.param(data)
            }
            return $http(req);
        }
        service.remove = function (data) {
            var url = api.url + api.remove;
            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                data: $.param(data)
            }
            return $http(req);
        }
        service.getPage = function (data) {
            var url = api.url + api.getPage;
            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                data: $.param(data)
            }
            return $http(req);
        }
        return service;
    });
})();