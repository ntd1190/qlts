(function () {
    'use strict';

    angular
        .module('app')
        .factory('KhoPhieuNhapService', KhoPhieuNhapService);

    function KhoPhieuNhapService($http, API_BASE) {
        var api = {
            url: API_BASE + 'api.QLKHO/KhoPhieuNhap/',
            // phiếu nhập
            insert: 'InsertKhoPhieuNhap',
            update: 'UpdateKhoPhieuNhap',
            removeList: 'UpdateXoaListKhoPhieuNhap',
            GetPage: 'GetListKhoPhieuNhapByCriteria',
            GetById: 'GetListKhoPhieuNhapById',
            LuuSoCai: 'LuuSoCai',
            GetSoPhieuAuto: API_BASE + 'Api.QLKHO/KhoGetSoPhieuAuto/KhoGetSoPhieuAuto',
            // chi tiết phiếu nhập
            GetListChiTietByPhieuNhapId: 'GetListChiTietByPhieuNhapId',
            LuuSerial: 'InsertKhoPhieuNhapSeries',
            GetSeries: 'GetListKhoPhieuNhapSeriesBySoPhieu',
        }

        return {
            // phiếu nhập
            insert: function (data) {
                var url = api.url + api.insert;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    data: data
                }
                return $http(req);
            },
            update: function (data) {
                var url = api.url + api.update;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    data: data
                }
                return $http(req);
            },
            removeList: function (data) {
                var url = api.url + api.removeList;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    data: { listPhieuNhap: angular.toJson(data.listPhieuNhap), loginId: data.loginId }
                }

                return $http(req);
            },
            getById: function (data) {
                var url = api.url + api.GetById;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }
                return $http(req);
            },
            getPage: function (data) {
                var url = api.url + api.GetPage;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            luuSoCai: function(data){
                var url = api.url + api.LuuSoCai;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            getSoPhieuAuto: function (data) {
                var url = api.GetSoPhieuAuto;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            // chi tiết
            getListChiTietByPhieuNhapId: function (data) {
                var url = api.url + api.GetListChiTietByPhieuNhapId;

                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }

                return $http(req);
            },
            // lược sử
            getListLuocSu: function (draw, start, length, searchString, sortName, sortDir, fields) {
                var url = API_BASE + 'api.QLNS/KhoLuocSu/GetListKhoLuocSuByCriteria';
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
                    })
                }

                return $http(req);
            },
            LuuSerial: function (data) {
                var url = api.url + api.LuuSerial;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    data: data
                }
                return $http(req);
            },
            GetSeries: function (data) {
                var url = api.url + api.GetSeries;
                var req = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    data: $.param(data)
                }
                return $http(req);
            },
        };
    }
})();