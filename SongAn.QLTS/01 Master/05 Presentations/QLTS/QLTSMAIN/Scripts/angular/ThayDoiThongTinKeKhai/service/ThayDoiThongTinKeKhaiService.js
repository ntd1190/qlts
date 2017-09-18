(function () {
    'use strict';
    var module = angular.module('app');

    module.service('ThayDoiThongTinKeKhaiService', function ($http, API_BASE) {
        var api = {};
        api.url = API_BASE + 'Api.QLTS/ThayDoiThongTin/';

        api.getPage = 'GetListThayDoiThongTinByCriteria';
        api.getById = 'GetThayDoiThongTinById';

        api.getTDTT_DatById = 'GetThayDoiThongTinDatById';
        api.getTDTT_NhaById = 'GetThayDoiThongTinNhaById';
        api.getTDTT_OtoById = 'GetThayDoiThongTinOtoById';
        api.getTDTT_500ById = 'GetThayDoiThongTin500ById';

        api.insertTDTT_Dat = 'InsertThayDoiThongTinDat';
        api.insertTDTT_Nha = 'InsertThayDoiThongTinNha';
        api.insertTDTT_Oto = 'InsertThayDoiThongTinOto';
        api.insertTDTT_500 = 'InsertThayDoiThongTin500';

        api.updateTDTT_Dat = 'UpdateThayDoiThongTinDat';
        api.updateTDTT_Nha = 'UpdateThayDoiThongTinNha';
        api.updateTDTT_Oto = 'UpdateThayDoiThongTinOto';
        api.updateTDTT_500 = 'UpdateThayDoiThongTin500';

        var service = {};

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
        
        service.getTDTT_DatById = function (data) {
            var url = api.url + api.getTDTT_DatById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.getTDTT_NhaById = function (data) {
            var url = api.url + api.getTDTT_NhaById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.getTDTT_OtoById = function (data) {
            var url = api.url + api.getTDTT_OtoById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.getTDTT_500ById = function (data) {
            var url = api.url + api.getTDTT_500ById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        service.insertTDTT_Dat = function (data) {
            var url = api.url + api.insertTDTT_Dat;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.insertTDTT_Nha = function (data) {
            var url = api.url + api.insertTDTT_Nha;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.insertTDTT_Oto = function (data) {
            var url = api.url + api.insertTDTT_Oto;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.insertTDTT_500 = function (data) {
            var url = api.url + api.insertTDTT_500;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };

        service.updateTDTT_Dat = function (data) {
            var url = api.url + api.updateTDTT_Dat;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.updateTDTT_Nha = function (data) {
            var url = api.url + api.updateTDTT_Nha;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.updateTDTT_Oto = function (data) {
            var url = api.url + api.updateTDTT_Oto;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: data
            }

            return $http(req);
        };
        service.updateTDTT_500 = function (data) {
            var url = api.url + api.updateTDTT_500;

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