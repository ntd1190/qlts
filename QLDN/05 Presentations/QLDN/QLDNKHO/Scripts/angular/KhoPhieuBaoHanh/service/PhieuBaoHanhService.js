/*****************************************************************************
1. Create Date : 2017.07.26
2. Creator     : Nguyen Thanh Binh
3. Description : 
4. History     : 2017.07.26 (Nguyen Thanh Binh) - Tao moi
                 2017.07.31 (Nguyen Thanh Binh) - thêm api chi tiết
*****************************************************************************/
(function () {
    'use strict';

    var module = angular.module('app');
    module.factory('PhieuBaoHanhService', function ($http, API_BASE, $q, utility) {
        var api = {
            url: API_BASE + 'api.qlkho/khophieubaohanh/',
            insert: 'InsertKhoPhieuBaoHanh',
            GetById: 'GetListKhoPhieuBaoHanhById',
            update: 'UpdateKhoPhieuBaoHanh',
            xoaList: 'updateXoaListPhieuBaoHanh',
            getPage: 'GetListKhoPhieuBaoHanhByCriteria',

            insertChiTiet: 'insertChiTiet',
            getChiTietById: 'GetChiTietById',
            updateChiTiet: 'updateChiTiet',
            deleteChiTiet: 'deleteChiTiet',
            GetListChiTietByPhieuBaoHanhId: 'GetListChiTietByPhieuBaoHanhId',
            GetThongTinBySeries: 'GetThongTinBySeries',
            GetThongTinByDienThoai: 'GetThongTinByDienThoai',
        }
        var service = {};

        service.insert = function (data) {
            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.getById = function (data) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.update = function (data) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.xoaList = function (data) {
            var url = api.url + api.xoaList;
            var req = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: { listPhieuBaoHanh: angular.toJson(data.list), loginId: data.loginId }
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
        // chi tiết
        service.getListChiTietByPhieuBaoHanhId = function (data) {
            var url = api.url + api.GetListChiTietByPhieuBaoHanhId;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.insertChiTiet = function (data) {
            var url = api.url + api.insertChiTiet;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.getChiTietById = function (data) {
            var url = api.url + api.getChiTietById;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }

            return $http(req);
        };
        service.updateChiTiet = function (data) {
            var url = api.url + api.updateChiTiet;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.deleteChiTiet = function (data) {
            var url = api.url + api.deleteChiTiet;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.getThongTinBySeries = function (data) {
            var url = api.url + api.GetThongTinBySeries;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        service.getThongTinByDienThoai = function (data) {
            var url = api.url + api.GetThongTinByDienThoai;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param(data)
            }
            return $http(req);
        };
        // lược sử
        service.getListLuocSu = function (draw, start, length, searchString, sortName, sortDir, fields) {
            var url = API_BASE + 'api.QLKHO/KhoLuocSu/GetListKhoLuocSuByCriteria';
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
        };

        return service;
    });
})();