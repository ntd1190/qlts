﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('BillService', BillService);

    function BillService($http, API_BASE) {
        var api = {
            url: API_BASE + 'Api.QLTS/Bill/',
            insert: 'InsertBill',
            update: 'UpdateBillById',
            GetPage: 'GetListBillByProjection',
            //GetPageDetail: 'GetListBillChiTietByBillId',
            GetById: 'GetBillById',
            removeList: 'DeleteBillById',
        }

        var service = {
            getPage: getPage,
            //getPageDetail: getPageDetail,
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

                    phieuBill: obj.Bill,
                    userId: obj.UserId
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
                    BillId: obj.BillId,
                    phieuBill: obj.Bill,
                    userId: obj.UserId
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
                data: $.param({ Billid: id })
            }
            return $http(req);
        };

        //function getPageDetail(id) {
        //    var url = api.url + api.GetPageDetail;
        //    var req = {
        //        url: url,
        //        method: 'POST',
        //        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        //        data: $.param({ Billid: id })
        //    }
        //    return $http(req);
        //};


    }
})();