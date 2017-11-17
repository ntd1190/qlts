﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('KeHoachService', KeHoachService);

    function KeHoachService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/KeHoach/',
            insert: 'InsertKeHoach',
            update: 'UpdateKeHoachById',
            GetPage: 'GetListKeHoachByProjection',
            GetPageDetail: 'GetListKeHoachChiTietByKeHoachId',
            GetById: 'GetKeHoachById',
            removeList: 'DeleteKeHoachById',
        }

        var service = {
            getPage: getPage,
            getPageDetail:getPageDetail,
            getById: getById,
            insert: insert,
            update: update,
            removeList: removeList,
        };

        return service;

        function removeList(ids) {
            var url = api.url + api.removeList;

            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    ids: ids
                })
            }

            return $http(req);
        }

        function getPage(draw, start, length, searchString, sortName, sortDir, fields, UserId, NhanVienId) {
            var url = api.url + api.GetPage;

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
                    UserId: UserId,
                    NhanVienId: NhanVienId,
                })
            }

            return $http(req);
        }


        function insert(obj) {
            if (!obj) {
                return null;
            };

            var url = api.url + api.insert;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({

                    phieuKeHoach: obj.phieuKeHoach,
                    listChiTiet: obj.listChiTiet,
                    userId: obj.userId
                })
            }
            return $http(req);
        }

        function update(obj) {
            var url = api.url + api.update;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({
                    keHoachId: obj.keHoachId,
                    phieuKeHoach: obj.phieuKeHoach,
                    listChiTiet: obj.listChiTiet,
                    userId: obj.userId
                })
            }
            return $http(req);
        }

        function getById(id) {
            var url = api.url + api.GetById;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KeHoachid: id })
            }
            return $http(req);
        };

        function getPageDetail(id) {
            var url = api.url + api.GetPageDetail;
            var req = {
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: $.param({ KeHoachid: id })
            }
            return $http(req);
        };

        
    }
})();